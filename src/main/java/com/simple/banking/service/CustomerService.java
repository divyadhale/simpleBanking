package com.simple.banking.service;

import com.simple.banking.model.Customer;
import com.simple.banking.repository.CustomerRepository;
import jakarta.validation.ConstraintViolationException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CustomerService {
    private static final Logger logger = LoggerFactory.getLogger(CustomerService.class);

    @Autowired
    private CustomerRepository customerRepository;

    //Customer Login
    public Customer authenticateUser(String email) {

        Optional<Customer> customer = customerRepository.findByEmailId(email);
        return customer.get();
    }

    public ResponseEntity<?> register(Customer customer) {
        //customer.setPassword(passwordEncoder.encode(password));
        try {
            Customer user = customerRepository.save(customer);
            return ResponseEntity.ok(user);
        } catch(ConstraintViolationException cex){
            logger.error("Constraint Violation ",cex);
            return ResponseEntity.badRequest().body("Constraint Violation "+cex.getConstraintViolations().stream());
        } catch(Exception ex){
            logger.error("error occured ",ex);
            return ResponseEntity.badRequest().body("error occured "+ex.getMessage());
        }
    }

    public Optional<Customer> getCustomer(Long accountNumber){
        return customerRepository.findById(accountNumber);
    }

}
