package com.simple.banking.service;

import com.simple.banking.model.ApiResponse;
import com.simple.banking.model.Customer;
import com.simple.banking.repository.CustomerRepository;
import jakarta.validation.ConstraintViolationException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
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

    public ResponseEntity<ApiResponse> register(Customer customer) {
        try {
            Customer user = customerRepository.save(customer);
            ApiResponse response = new ApiResponse("success", HttpStatus.OK.value(), "Registration successful", user.getAccountNumber().toString());
            return ResponseEntity.ok(response);
        } catch (DataIntegrityViolationException ex) {
            logger.error("Data Integrity Violation ", ex);
            ApiResponse response = new ApiResponse("error", HttpStatus.BAD_REQUEST.value(), "Email ID already exists. Please use a different email.", null);
            return ResponseEntity.badRequest().body(response);
        } catch (Exception ex) {
            logger.error("Error occurred ", ex);
            ApiResponse response = new ApiResponse("error", HttpStatus.BAD_REQUEST.value(), "An unexpected error occurred. Please try again later.", null);
            return ResponseEntity.badRequest().body(response);
        }
    }

    public Optional<Customer> getCustomer(Long accountNumber){
        return customerRepository.findById(accountNumber);
    }

    // EditProfile
	public ResponseEntity<ApiResponse> editProfile(Customer customer) {
		 try {
	      
		 Customer user = customerRepository.findById(customer.getAccountNumber()).orElseThrow();
		 	  
		      user.setFirstName(customer.getFirstName());
		      user.setLastName(customer.getLastName());
		      user.setAadharNumber(customer.getAadharNumber());
		      user.setAddress(customer.getAddress());
		      user.setPanNumber(customer.getPanNumber());
		      user.setEmailId(customer.getEmailId());
		      user.setContact(customer.getContact());
		     
		      
		 	  customerRepository.save(user);
	            ApiResponse response = new ApiResponse("success", HttpStatus.OK.value(), "Profile Update Successfully", user.getAccountNumber().toString());
	            return ResponseEntity.ok(response);
	        } catch (DataIntegrityViolationException ex) {
	            logger.error("Data Integrity Violation ", ex);
	            ApiResponse response = new ApiResponse("error", HttpStatus.BAD_REQUEST.value(), "Email ID already exists. Please use a different email.", null);
	            return ResponseEntity.badRequest().body(response);
	        } catch (Exception ex) {
	            logger.error("Error occurred ", ex);
	            ApiResponse response = new ApiResponse("error", HttpStatus.BAD_REQUEST.value(), "An unexpected error occurred. Please try again later.", null);
	            return ResponseEntity.badRequest().body(response);
	        }
	}

    
}
