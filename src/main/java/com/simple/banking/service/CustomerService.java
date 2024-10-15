package com.simple.banking.service;

import com.simple.banking.model.Customer;
import com.simple.banking.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
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


    //For withdraw
    public String withdraw(String accNumber, Double amount){
        Optional<Customer> customerDetails = customerRepository.findById(accNumber);
        if(customerDetails.isPresent()){
            Customer customer = customerDetails.get();
           if(customer.getCurrentBalance()>=amount){
               customer.setCurrentBalance(customer.getCurrentBalance()-amount);
               customerRepository.save(customer);
               return "Withdrawal successful! Current Balance is "+customer.getCurrentBalance();
           }else{
               return "Insufficient Balance";
           }
        }else{
            return "Account not found!";
        }
    }

    public String deposit(String accNumber, Double amount){
        Optional<Customer> customerDetails = customerRepository.findById(accNumber);
        if(customerDetails.isPresent()){
            Customer customer = customerDetails.get();
                customer.setCurrentBalance(customer.getCurrentBalance() + amount);
                customerRepository.save(customer);
                return "Deposit successful! Current Balance is "+customer.getCurrentBalance();
        }else{
            return "Account not found!";
        }
    }

    public Optional<Customer> getCustomer(String accountNumber){
        return customerRepository.findById(accountNumber);
    }

}
