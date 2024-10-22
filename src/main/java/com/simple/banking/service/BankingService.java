package com.simple.banking.service;


import com.simple.banking.model.Customer;
import com.simple.banking.model.Transaction;
import com.simple.banking.model.TransactionDto;
import com.simple.banking.model.TransactionOtp;
import com.simple.banking.repository.CustomerRepository;
import com.simple.banking.repository.TransactionOtpRepository;
import com.simple.banking.repository.TransactionRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.Random;

@Service
public class BankingService {
    private static final Logger logger = LoggerFactory.getLogger(BankingService.class);

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private TransactionOtpRepository transactionOtpRepository;

    @Autowired
    private SmsService smsService;

    @Autowired
    private JavaMailSender mailSender;

    public ResponseEntity<?> doTransaction(TransactionDto transactionDto) {
        try {
            TransactionOtp transactionOtp = transactionOtpRepository.findByCustomerId(transactionDto.getCustomerId()).orElseThrow();
            if(LocalDateTime.now().isAfter(transactionOtp.getTimestamp().plusSeconds(60))){
                transactionOtpRepository.delete(transactionOtp);
                return ResponseEntity.badRequest().body("Otp Expired.Please try again");
            } else if (!transactionOtp.getOtp().equals(transactionDto.getCode())) {
                return ResponseEntity.badRequest().body("Incorrect OTP");
            }
            Customer customer = customerRepository.findById(transactionOtp.getCustomerId()).orElseThrow();

            Transaction transaction = new Transaction();
            transaction.setCustomer(customer);
            transaction.setDeposit(transactionOtp.getDeposit());
            transaction.setWithdraw(transactionOtp.getWithdraw());
            transaction.setClosingBalance(transactionOtp.getClosingBalance());
            transaction.setTimestamp(LocalDateTime.now());
            transactionRepository.save(transaction);

            customer.setCurrentbalance(transactionOtp.getClosingBalance());
            customerRepository.save(customer);
            transactionOtpRepository.delete(transactionOtp);
            try{
                String action = "";
                Double amount = 0.00;
                if(transaction.getDeposit()!=0.00){
                    action = "deposited to";
                    amount = transaction.getDeposit();
                } else if(transaction.getWithdraw()!=0.00){
                    action = "withdrawn from";
                    amount = transaction.getWithdraw();
                }
                sendSMS(customer.getContact(),"Rs."+amount+" "+action+" your account ending with "+customer.getAccountNumber().toString().substring(6)+" Current Account Balance is Rs."+customer.getCurrentbalance());
            } catch (Exception ex){

            }
        } catch(Exception e){
            return ResponseEntity.badRequest().body("transaction failed"+e);
        }
        return  ResponseEntity.ok().body("Tranaction Success");
    }

    public ResponseEntity<?> deposit(Long customerId, Double amount) {
        try {
            Customer customer = customerRepository.findById(customerId).orElseThrow();
            String verificationCode = String.valueOf(new Random().nextInt(999999));

            TransactionOtp transactionOtp = new TransactionOtp();
            if(transactionOtpRepository.findByCustomerId(customerId).isPresent()){
                transactionOtp = transactionOtpRepository.findByCustomerId(customerId).get();
            }
            transactionOtp.setCustomerId(customerId);
            transactionOtp.setDeposit(amount);
            transactionOtp.setClosingBalance(customer.getCurrentbalance()+ amount);
            transactionOtp.setTimestamp(LocalDateTime.now());
            transactionOtp.setOtp(verificationCode);
            transactionOtpRepository.save(transactionOtp);
            sendSMS(customer.getContact(),verificationCode+" is your OTP to transfer Rs."+amount);
            //sendMail(customer.getEmailId(), verificationCode+" is your OTP to transfer Rs."+amount);
            return ResponseEntity.ok("Verification code sent to " + customer.getContact());
        } catch(Exception e){
            return ResponseEntity.badRequest().body("transaction failed");
        }
    }

    public ResponseEntity<?> withdraw(Long customerId, Double amount) {
        try {
            Customer customer = customerRepository.findById(customerId).orElseThrow();
            if (customer.getCurrentbalance() < amount) {
                return ResponseEntity.badRequest().body("Insufficient balance");
                //throw new RuntimeException("Insufficient balance");
            }
            String verificationCode = String.valueOf(new Random().nextInt(999999));
            TransactionOtp transactionOtp = new TransactionOtp();
            if(transactionOtpRepository.findByCustomerId(customerId).isPresent()){
                transactionOtp = transactionOtpRepository.findByCustomerId(customerId).get();
            }
            transactionOtp.setCustomerId(customerId);
            transactionOtp.setWithdraw(amount);
            transactionOtp.setClosingBalance(customer.getCurrentbalance()+ amount);
            transactionOtp.setTimestamp(LocalDateTime.now());
            transactionOtp.setOtp(verificationCode);

            transactionOtpRepository.save(transactionOtp);
            sendSMS(customer.getContact(),verificationCode+" is your OTP to transfer Rs."+amount);
            return ResponseEntity.ok("Verification code sent to " + customer.getContact());
        } catch(Exception e){
            return  ResponseEntity.badRequest().body("transaction failed");
        }
    }

    public ResponseEntity<?> getTransactionHistory(Long customerId) {
        try {
            Optional<Customer> customer = customerRepository.findById(customerId);
            if (customer.isPresent()) {
                return ResponseEntity.ok(transactionRepository.findByCustomer(customer.get()));
            } else {
                return ResponseEntity.badRequest().body("User with id " + customerId + " not present");
            }
        }catch (Exception ex){
            return ResponseEntity.internalServerError().body("An error Occurred . Please try again");
        }
    }

    public void sendSMS(String phoneNumber, String message){

        // Send the SMS
        smsService.sendSms("+91"+phoneNumber,  message);
    }

    public void sendMail(String email, String message){

        // Send the mail
        SimpleMailMessage mailMessage = new SimpleMailMessage();
        mailMessage.setTo(email);
        mailMessage.setSubject("Green Banking OTP");
        mailMessage.setText(message);
        mailSender.send(mailMessage);

    }

    public Double checkBalance(Long customerId) {
        return customerRepository.findById(customerId).orElseThrow().getCurrentbalance();
    }
}