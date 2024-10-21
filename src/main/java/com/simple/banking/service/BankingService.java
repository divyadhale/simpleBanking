package com.simple.banking.service;


import com.simple.banking.model.Customer;
import com.simple.banking.model.Transaction;
import com.simple.banking.repository.CustomerRepository;
import com.simple.banking.repository.TransactionRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class BankingService {
    private static final Logger logger = LoggerFactory.getLogger(BankingService.class);

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private TransactionRepository transactionRepository;

    public ResponseEntity<?> deposit(Long customerId, Double amount) {
        try {
            Customer customer = customerRepository.findById(customerId).orElseThrow();


            Transaction transaction = new Transaction();
            transaction.setCustomer(customer);
            transaction.setDeposit(amount);
            transaction.setClosingBalance(customer.getCurrentbalance()+ amount);
            transaction.setTimestamp(LocalDateTime.now());
            transactionRepository.save(transaction);

            customer.setCurrentbalance(customer.getCurrentbalance() + amount);
            customerRepository.save(customer);
        } catch(Exception e){
            return ResponseEntity.badRequest().body("transaction failed");
        }
        return  ResponseEntity.ok().body("Deposit Success");
    }

    public ResponseEntity<?> withdraw(Long customerId, Double amount) {
        try {
            Customer customer = customerRepository.findById(customerId).orElseThrow();
            if (customer.getCurrentbalance() < amount) {
                return ResponseEntity.badRequest().body("Insufficient balance");
                //throw new RuntimeException("Insufficient balance");
            }
            Transaction transaction = new Transaction();
            transaction.setCustomer(customer);
            transaction.setWithdraw(amount);
            transaction.setClosingBalance(customer.getCurrentbalance() - amount);
            transaction.setTimestamp(LocalDateTime.now());
            transactionRepository.save(transaction);

            customer.setCurrentbalance(customer.getCurrentbalance() - amount);
            customerRepository.save(customer);
        } catch(Exception e){
            return  ResponseEntity.badRequest().body("transaction failed");
        }
        return  ResponseEntity.ok().body("Withdrawl Success");
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

    public Double checkBalance(Long customerId) {
        return customerRepository.findById(customerId).orElseThrow().getCurrentbalance();
    }
}