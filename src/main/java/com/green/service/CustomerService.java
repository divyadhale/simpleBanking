package com.green.service;

import com.green.dao.CustomerRepository;
import com.green.model.Customer;
import jakarta.validation.ConstraintViolationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class CustomerService {
    @Autowired
    private CustomerRepository customerRepository;

//    @Autowired
//    private PasswordEncoder passwordEncoder;

    public ResponseEntity<?> register(Customer customer) {
        //customer.setPassword(passwordEncoder.encode(password));
        try {
            Customer user = customerRepository.save(customer);
            return ResponseEntity.ok(user);
        } catch(ConstraintViolationException cex){
            return ResponseEntity.badRequest().body("Constraint Violation "+cex.getConstraintViolations().toString());
        } catch(Exception ex){
            System.out.println("exception  "+ex.getCause());
            return ResponseEntity.badRequest().body("error occured "+ex.getMessage());
        }
    }
}
