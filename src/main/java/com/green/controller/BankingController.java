package com.green.controller;

import com.green.model.Customer;
import com.green.model.Transaction;
import com.green.service.BankingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/banking")
public class BankingController {

	@Autowired
	private BankingService bankingService;

	@PostMapping("/withdraw")
	public ResponseEntity<?> withdraw(@RequestParam Long customerId,@RequestParam Double amount){
		return bankingService.withdraw(customerId,amount);
	}

	@PostMapping("/deposit")
	public ResponseEntity<?> deposit(@RequestParam Long customerId,@RequestParam Double amount){
		return bankingService.deposit(customerId,amount);

	}

	@GetMapping("/history")
	public ResponseEntity<List<Transaction>> history(@RequestParam Long customerId){
		return ResponseEntity.ok(bankingService.getTransactionHistory(customerId));
	}

}
