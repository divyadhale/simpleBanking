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
public class BankingController {

    @Autowired
    private CustomerService customerService;

    @Autowired
    private BankingService bankingService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@Validated @RequestBody Customer customer) {
        return customerService.register(customer);
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

    //Balance Inquiry
    @GetMapping("/balance/{accountNumber}")
    public ResponseEntity<String> getBalance(@PathVariable Long accountNumber){
       Optional<Customer> customer = customerService.getCustomer(accountNumber);
        return customer.map(value -> ResponseEntity.ok("Current Balance is : " + value.getCurrentbalance())).orElseGet(() -> ResponseEntity.status(404).body("Account Not Found"));
    }
}
