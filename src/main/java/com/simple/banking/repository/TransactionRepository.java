package com.simple.banking.repository;

import com.simple.banking.model.Customer;
import com.simple.banking.model.Transaction;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TransactionRepository extends CrudRepository<Transaction,Integer> {
    List<Transaction> findByCustomer(Customer customer);
}
