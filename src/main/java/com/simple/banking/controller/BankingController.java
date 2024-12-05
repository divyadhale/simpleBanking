package com.simple.banking.controller;

import com.simple.banking.model.*;
import com.simple.banking.service.BankingService;
import com.simple.banking.service.CustomerService;
import com.simple.banking.service.SmsService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/simple/banking")
public class  BankingController {

    @Autowired
    private CustomerService customerService;

    @Autowired
    private BankingService bankingService;

    @PostMapping("/register")
    public ResponseEntity<ApiResponse> register(@Validated @RequestBody Customer customer) {
        return customerService.register(customer);
    }

    //EditProfile
    @PutMapping("/editProfile")
    public ResponseEntity<ApiResponse> editProfile(@Validated @RequestBody Customer customer) {
        return customerService.editProfile(customer);
    }
    
    
    //Customer Login
    @PostMapping("/login")
    public ResponseEntity<ApiResponse> login(@RequestBody LoginRequestDTO loginRequestDTO) {
        Customer customerDetail;
        try{
            customerDetail = customerService.authenticateUser(loginRequestDTO.getEmail());
        }catch (Exception e){
            ApiResponse response = new ApiResponse("failure", HttpStatus.UNAUTHORIZED.value(), "Invalid Credentials : Please check you email and password.", "");
            return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
        }

        if (customerDetail.getPassword().equals(loginRequestDTO.getPassword())) {
            ApiResponse response = new ApiResponse("success", HttpStatus.OK.value(), "Login successful", customerDetail.getAccountNumber().toString());
            return new ResponseEntity<>(response, HttpStatus.OK);
        } else {
            ApiResponse response = new ApiResponse("failure", HttpStatus.UNAUTHORIZED.value(), "Invalid Credentials : Please check you email and password.", "");
           return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
        }
    }

    @PostMapping("/doTransaction")
    public ResponseEntity<?> doTransaction(@RequestBody TransactionDto transactionDto){
        return bankingService.doTransaction(transactionDto);
    }

    //Money Withdraw
    @PostMapping("/withdraw")
    public ResponseEntity<?> withdraw(@RequestParam Long customerId,@RequestParam Double amount){
        return bankingService.withdraw(customerId,amount);
    }

    @PostMapping("/deposit")
    public ResponseEntity<?> deposit(@RequestParam Long customerId,@RequestParam Double amount){
        return bankingService.deposit(customerId,amount);

    }

    @GetMapping("/history")
    public ResponseEntity<?> history(@RequestParam Long customerId){
        return bankingService.getTransactionHistory(customerId);
    }
    
    //GetProfile
    @GetMapping("/profile")
    public ResponseEntity<?> profile(@RequestParam Long customerId){
        return bankingService.getProfile(customerId);
    }

    //Balance Inquiry
    @GetMapping("/balance/{accountNumber}")
    public ResponseEntity<?> getBalance(@PathVariable Long accountNumber){
    	try {
    		Optional<Customer> customer = customerService.getCustomer(accountNumber);
       			if (customer.isPresent()) {
       				return ResponseEntity.ok(customer.get().getCurrentbalance());
       			} else {
       				return ResponseEntity.badRequest().body("User with account number : " + accountNumber + " not present");
       			}
    	}
       	catch (Exception ex){
       			return ResponseEntity.internalServerError().body("An error Occurred . Please try again");
       }
    }
}

