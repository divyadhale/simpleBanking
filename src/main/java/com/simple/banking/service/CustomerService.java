package com.simple.banking.service;

import com.simple.banking.model.Customer;
import com.simple.banking.repository.CustomerRepository;
import jakarta.validation.ConstraintViolationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CustomerService {
    @Autowired
    private CustomerRepository customerRepository;

    //Customer Login
    public Customer authenticateUser(String email) {

        Optional<Customer> customer = customerRepository.findByEmailId(email);
        return customer.get();
    }

    public ResponseEntity<?> register(Customer customer) {
        //customer.setPassword(passwordEncoder.encode(password));
        //try {
            Customer user = customerRepository.save(customer);
            return ResponseEntity.ok(user);
//        } catch(ConstraintViolationException cex){
//            return ResponseEntity.badRequest().body("Constraint Violation "+cex.getConstraintViolations().toString());
//        } catch(Exception ex){
//            System.out.println("exception  "+ex.getCause());
//            return ResponseEntity.badRequest().body("error occured "+ex.getMessage());
//        }
    }

    public Optional<Customer> getCustomer(Long accountNumber){
        return customerRepository.findById(accountNumber);
    }

}
