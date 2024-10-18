package com.green.service;

import com.green.dao.CustomerRepository;
import com.green.dao.TransactionRepository;
import com.green.model.Customer;
import com.green.model.Transaction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class BankingService {
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

    public List<Transaction> getTransactionHistory(Long customerId) {
        Customer customer = customerRepository.findById(customerId).orElseThrow();
        return transactionRepository.findByCustomer(customer);
    }

    public Double checkBalance(Long customerId) {
        return customerRepository.findById(customerId).orElseThrow().getCurrentbalance();
    }
}