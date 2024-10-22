package com.simple.banking.repository;

import com.simple.banking.model.Customer;
import com.simple.banking.model.Transaction;
import com.simple.banking.model.TransactionOtp;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TransactionOtpRepository extends CrudRepository<TransactionOtp,Long> {
    Optional<TransactionOtp> findByCustomerId(Long customerId);
}
