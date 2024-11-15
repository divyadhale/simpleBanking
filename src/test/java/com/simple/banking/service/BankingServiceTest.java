package com.simple.banking.service;

import com.simple.banking.model.Customer;
import com.simple.banking.model.Transaction;
import com.simple.banking.model.TransactionDto;
import com.simple.banking.model.TransactionOtp;
import com.simple.banking.repository.CustomerRepository;
import com.simple.banking.repository.TransactionOtpRepository;
import com.simple.banking.repository.TransactionRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.Spy;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@SpringBootTest
public class BankingServiceTest {

    @InjectMocks
    @Spy
    private BankingService bankingService;

    @BeforeEach
    void setUp()
    {
        MockitoAnnotations.openMocks(this);
    }
    @Mock
    private CustomerRepository customerRepository;

    @Mock
    private TransactionRepository transactionRepository;

    @Mock
    private TransactionOtpRepository transactionOtpRepository;

    @Mock
    private SmsService smsService;

    @Mock
    private JavaMailSender mailSender;

    @Test
    public void testDoTransactionSuccess() {
        TransactionDto transactionDto = new TransactionDto();
        transactionDto.setCustomerId(1L);
        transactionDto.setCode("123456");

        TransactionOtp transactionOtp = new TransactionOtp();
        transactionOtp.setCustomerId(1L);
        transactionOtp.setOtp("123456");
        transactionOtp.setTimestamp(LocalDateTime.now().minusSeconds(30)); // Not expired
        transactionOtp.setDeposit(1000.00);
        transactionOtp.setWithdraw(0.00);
        transactionOtp.setClosingBalance(5000.00);

        Customer customer = new Customer();
        customer.setCurrentbalance(4000.00);
        customer.setContact("9876543210");
        customer.setEmailId("john.doe@example.com");
        customer.setAccountNumber(1000000000L);

        when(transactionOtpRepository.findByCustomerId(1L)).thenReturn(Optional.of(transactionOtp));
        when(customerRepository.findById(1L)).thenReturn(Optional.of(customer));
        when(transactionRepository.save(any(Transaction.class))).thenReturn(new Transaction());
        when(customerRepository.save(any(Customer.class))).thenReturn(customer);

        ResponseEntity<?> response = bankingService.doTransaction(transactionDto);

        assertNotNull(response);
        assertEquals(200, response.getStatusCodeValue());
        assertEquals("Tranaction Success", response.getBody());

        verify(transactionOtpRepository, times(1)).findByCustomerId(1L);
        verify(transactionOtpRepository, times(1)).delete(transactionOtp);
        verify(customerRepository, times(1)).findById(1L);
        verify(transactionRepository, times(1)).save(any(Transaction.class));
        verify(customerRepository, times(1)).save(customer);
    }
    @Test
    public void testDoTransactionOtpExpired() {
        TransactionDto transactionDto = new TransactionDto();
        transactionDto.setCustomerId(1L);
        transactionDto.setCode("123456");

        TransactionOtp transactionOtp = new TransactionOtp();
        transactionOtp.setCustomerId(1L);
        transactionOtp.setOtp("123456");
        transactionOtp.setTimestamp(LocalDateTime.now().minusSeconds(90)); // Expired OTP

        when(transactionOtpRepository.findByCustomerId(1L)).thenReturn(Optional.of(transactionOtp));

        ResponseEntity<?> response = bankingService.doTransaction(transactionDto);

        assertNotNull(response);
        assertEquals(400, response.getStatusCodeValue());
        assertEquals("Otp Expired.Please try again", response.getBody());

        verify(transactionOtpRepository, times(1)).findByCustomerId(1L);
        verify(transactionOtpRepository, times(1)).delete(transactionOtp);
        verify(customerRepository, never()).findById(anyLong());
        verify(transactionRepository, never()).save(any(Transaction.class));
        verify(customerRepository, never()).save(any(Customer.class));
    }

    @Test
    public void testDoTransactionIncorrectOtp() {
        TransactionDto transactionDto = new TransactionDto();
        transactionDto.setCustomerId(1L);
        transactionDto.setCode("123456");

        TransactionOtp transactionOtp = new TransactionOtp();
        transactionOtp.setCustomerId(1L);
        transactionOtp.setOtp("654321"); // Incorrect OTP
        transactionOtp.setTimestamp(LocalDateTime.now().minusSeconds(30)); // Not expired

        when(transactionOtpRepository.findByCustomerId(1L)).thenReturn(Optional.of(transactionOtp));

        ResponseEntity<?> response = bankingService.doTransaction(transactionDto);

        assertNotNull(response);
        assertEquals(400, response.getStatusCodeValue());
        assertEquals("Incorrect OTP", response.getBody());

        verify(transactionOtpRepository, times(1)).findByCustomerId(1L);
        verify(transactionOtpRepository, never()).delete(transactionOtp);
        verify(customerRepository, never()).findById(anyLong());
        verify(transactionRepository, never()).save(any(Transaction.class));
        verify(customerRepository, never()).save(any(Customer.class));
    }
    @Test
    public void testDepositSuccess() {
        Long customerId = 1L;
        Double amount = 500.0;

        Customer customer = getCustomer();

        String verificationCode = "123456";
        TransactionOtp transactionOtp = new TransactionOtp();
        transactionOtp.setCustomerId(customerId);
        transactionOtp.setDeposit(amount);
        transactionOtp.setClosingBalance(customer.getCurrentbalance() + amount);
        transactionOtp.setTimestamp(LocalDateTime.now());
        transactionOtp.setOtp(verificationCode);

        when(customerRepository.findById(customerId)).thenReturn(Optional.of(customer));
        when(transactionOtpRepository.findByCustomerId(customerId)).thenReturn(Optional.of(transactionOtp));
        when(transactionOtpRepository.save(any(TransactionOtp.class))).thenReturn(transactionOtp);

        ResponseEntity<?> response = bankingService.deposit(customerId, amount);

        assertNotNull(response);
        assertEquals(200, response.getStatusCodeValue());
        assertTrue(response.getBody().toString().contains("Verification code sent"));

        verify(customerRepository, times(1)).findById(customerId);
        verify(transactionOtpRepository, times(2)).findByCustomerId(customerId); // Once for check and once for actual fetch
        verify(transactionOtpRepository, times(1)).save(any(TransactionOtp.class));
    }

    @Test
    public void testDepositCustomerNotFound() {
        Long customerId = 1L;
        Double amount = 500.0;
        when(customerRepository.findById(customerId)).thenReturn(Optional.empty());

        ResponseEntity<?> response = bankingService.deposit(customerId, amount);

        assertNotNull(response);
        assertEquals(400, response.getStatusCodeValue());
        assertEquals("transaction failed", response.getBody());

        verify(customerRepository, times(1)).findById(customerId);
        verify(transactionOtpRepository, never()).findByCustomerId(customerId);
        verify(transactionOtpRepository, never()).save(any(TransactionOtp.class));
    }

    @Test
    public void testDepositOtpNotSent() {
        Long customerId = 1L;
        Double amount = 500.0;

        Customer customer = getCustomer();

        String verificationCode = "123456";
        TransactionOtp transactionOtp = new TransactionOtp();
        transactionOtp.setCustomerId(customerId);
        transactionOtp.setDeposit(amount);
        transactionOtp.setClosingBalance(customer.getCurrentbalance() + amount);
        transactionOtp.setTimestamp(LocalDateTime.now());
        transactionOtp.setOtp(verificationCode);

        when(customerRepository.findById(customerId)).thenReturn(Optional.of(customer));
        when(transactionOtpRepository.findByCustomerId(customerId)).thenReturn(Optional.of(transactionOtp));
        when(transactionOtpRepository.save(any(TransactionOtp.class))).thenReturn(transactionOtp);

        doThrow(new RuntimeException("SMS Service unavailable")).when(bankingService).sendSMS(anyString(), anyString());
        doThrow(new RuntimeException("Mail Service unavailable")).when(bankingService).sendMail(anyString(), anyString(), anyString());

        ResponseEntity<?> response = bankingService.deposit(customerId, amount);

        assertNotNull(response);
        assertEquals(500, response.getStatusCodeValue());
        assertEquals("OTP not sent. Please try again", response.getBody());

        verify(customerRepository, times(1)).findById(customerId);
        verify(transactionOtpRepository, times(2)).findByCustomerId(customerId); // Once for check and once for actual fetch
        verify(transactionOtpRepository, times(1)).save(any(TransactionOtp.class));
    }
    @Test
    public void testWithdrawSuccess() {
        Long customerId = 1L;
        Double amount = 500.0;

        Customer customer = getCustomer();

        String verificationCode = "123456";
        TransactionOtp transactionOtp = new TransactionOtp();
        transactionOtp.setCustomerId(customerId);
        transactionOtp.setWithdraw(amount);
        transactionOtp.setClosingBalance(customer.getCurrentbalance() - amount);
        transactionOtp.setTimestamp(LocalDateTime.now());
        transactionOtp.setOtp(verificationCode);

        when(customerRepository.findById(customerId)).thenReturn(Optional.of(customer));
        when(transactionOtpRepository.findByCustomerId(customerId)).thenReturn(Optional.of(transactionOtp));
        when(transactionOtpRepository.save(any(TransactionOtp.class))).thenReturn(transactionOtp);

        doNothing().when(bankingService).sendSMS(anyString(), anyString());
        doNothing().when(bankingService ).sendMail(anyString(), anyString(), anyString());

        ResponseEntity<?> response = bankingService.withdraw(customerId, amount);

        assertNotNull(response);
        assertEquals(200, response.getStatusCodeValue());
        assertTrue(response.getBody().toString().contains("Verification code sent"));

        verify(customerRepository, times(1)).findById(customerId);
        verify(transactionOtpRepository, times(2)).findByCustomerId(customerId); // Once for check and once for actual fetch
        verify(transactionOtpRepository, times(1)).save(any(TransactionOtp.class));
    }

    @Test
    public void testWithdrawInsufficientBalance() {
        Long customerId = 1L;
        Double amount = 1500.0;
        Customer customer = new Customer();
        customer.setCurrentbalance(1000.0);
        when(customerRepository.findById(customerId)).thenReturn(Optional.of(customer));
        ResponseEntity<?> response = bankingService.withdraw(customerId, amount);
        assertNotNull(response);
        assertEquals(400, response.getStatusCodeValue());
        assertEquals("Insufficient balance", response.getBody());
        verify(customerRepository, times(1)).findById(customerId);
        verify(transactionOtpRepository, never()).findByCustomerId(customerId);
        verify(transactionOtpRepository, never()).save(any(TransactionOtp.class));
    }

    public void testWithdrawOtpNotSent() {
        Long customerId = 1L;
        Double amount = 500.0;

        Customer customer = getCustomer();
        String verificationCode = "123456";
        TransactionOtp transactionOtp = new TransactionOtp();
        transactionOtp.setCustomerId(customerId);
        transactionOtp.setWithdraw(amount);
        transactionOtp.setClosingBalance(customer.getCurrentbalance() - amount);
        transactionOtp.setTimestamp(LocalDateTime.now());
        transactionOtp.setOtp(verificationCode);

        when(customerRepository.findById(customerId)).thenReturn(Optional.of(customer));
        when(transactionOtpRepository.findByCustomerId(customerId)).thenReturn(Optional.of(transactionOtp));
        when(transactionOtpRepository.save(any(TransactionOtp.class))).thenReturn(transactionOtp);

        doThrow(new RuntimeException("SMS Service unavailable")).when(bankingService).sendSMS(anyString(), anyString());
        doThrow(new RuntimeException("Mail Service unavailable")).when(bankingService).sendMail(anyString(), anyString(), anyString());

        ResponseEntity<?> response = bankingService.withdraw(customerId, amount);

        assertNotNull(response);
        assertEquals(500, response.getStatusCodeValue()); // Expecting a 500 status code
        assertEquals("OTP not sent. Please try again", response.getBody());

        verify(customerRepository, times(1)).findById(customerId);
        verify(transactionOtpRepository, times(2)).findByCustomerId(customerId); // Once for check and once for actual fetch
        verify(transactionOtpRepository, times(1)).save(any(TransactionOtp.class));
    }
    @Test
    public void testGetTransactionHistorySuccess() {
        Long customerId = 1L;
        Customer customer = getCustomer();
        Transaction transaction = new Transaction();
        transaction.setCustomer(customer);
        List<Transaction> transactions = Collections.singletonList(transaction);
        when(customerRepository.findById(customerId)).thenReturn(Optional.of(customer));
        when(transactionRepository.findByCustomer(customer)).thenReturn(transactions);
        ResponseEntity<?> response = bankingService.getTransactionHistory(customerId);

        assertNotNull(response);
        assertEquals(200, response.getStatusCodeValue());
        assertEquals(transactions, response.getBody());

        verify(customerRepository, times(1)).findById(customerId);
        verify(transactionRepository, times(1)).findByCustomer(customer);
    }
    @Test
    public void testGetTransactionHistoryCustomerNotFound() {
        Long customerId = 1L;
        when(customerRepository.findById(customerId)).thenReturn(Optional.empty());

        ResponseEntity<?> response = bankingService.getTransactionHistory(customerId);
        assertNotNull(response);
        assertEquals(400, response.getStatusCodeValue());
        assertEquals("User with id " + customerId + " not present", response.getBody());

        verify(customerRepository, times(1)).findById(customerId);
        verify(transactionRepository, never()).findByCustomer(any(Customer.class));
    }

    @Test
    public void testGetTransactionHistoryException() {
        Long customerId = 1L;
        when(customerRepository.findById(customerId)).thenThrow(new RuntimeException("Database error"));

        ResponseEntity<?> response = bankingService.getTransactionHistory(customerId);

        assertNotNull(response);
        assertEquals(500, response.getStatusCodeValue());
        assertEquals("An error Occurred . Please try again", response.getBody());

        verify(customerRepository, times(1)).findById(customerId);
        verify(transactionRepository, never()).findByCustomer(any(Customer.class));
    }
    @Test
    public void testSendSMS()
    {
        String phoneNumber = "1234567890";
        String message = "This is a test message";
        doNothing().when(smsService).sendSms(anyString(), anyString());
        bankingService.sendSMS(phoneNumber, message);
       verify(smsService, times(1)).sendSms("+91" + phoneNumber, message);
    }
    @Test
    public void testSendMail() {
        String email = "test@example.com";
        String message = "This is a test message";
        String subject = "Test Subject";
        doNothing().when(mailSender).send(any(SimpleMailMessage.class));
        bankingService.sendMail(email, message, subject);
        verify(mailSender, times(1)).send(any(SimpleMailMessage.class));
    }
    @Test
    public void testCheckBalanceSuccess() {
        Long customerId = 1L;
        Double expectedBalance = 5000.0;

        Customer customer = new Customer();
        customer.setCurrentbalance(expectedBalance);
        when(customerRepository.findById(customerId)).thenReturn(Optional.of(customer));

        Double actualBalance = bankingService.checkBalance(customerId);
        assertNotNull(actualBalance);
        assertEquals(expectedBalance, actualBalance);

        verify(customerRepository, times(1)).findById(customerId);
    }

    @Test
    public void testCheckBalanceCustomerNotFound() {
        Long customerId = 1L;
        when(customerRepository.findById(customerId)).thenReturn(Optional.empty());
        assertThrows(NoSuchElementException.class, () -> {
            bankingService.checkBalance(customerId);
        });

        verify(customerRepository, times(1)).findById(customerId);
    }

    private static Customer getCustomer() {
        Customer customer = new Customer();
        customer.setCurrentbalance(1000.0);
        customer.setContact("+1234567890");
        customer.setEmailId("customer@example.com");
        return customer;
    }
}
