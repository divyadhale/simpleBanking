package com.simple.banking.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.simple.banking.model.Customer;
import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
public class Transaction {

	@Id
	@GeneratedValue
	private int id;

	@ManyToOne
	@JsonIgnore
	private Customer customer;
	@Column(columnDefinition="Decimal(10,2) default '0.00'")
	private double withdraw;
	@Column(columnDefinition="Decimal(10,2) default '0.00'")
	private double deposit;
	@Column(columnDefinition="Decimal(10,2) default '0.00'")
	private double closingBalance;

	private LocalDateTime timestamp;

	private String transactionType;

	public String getTransactionType() {
		return transactionType;
	}

	public void setTransactionType(String transactionType) {
		this.transactionType = transactionType;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public double getWithdraw() {
		return withdraw;
	}

	public void setWithdraw(double withdraw) {
		this.withdraw = withdraw;
	}

	public double getDeposit() {
		return deposit;
	}

	public void setDeposit(double deposit) {
		this.deposit = deposit;
	}

	public double getClosingBalance() {
		return closingBalance;
	}

	public void setClosingBalance(double closingBalance) {
		this.closingBalance = closingBalance;
	}

	public LocalDateTime getTimestamp() {
		return timestamp;
	}

	public void setTimestamp(LocalDateTime timestamp) {
		this.timestamp = timestamp;
	}

	public Customer getCustomer() {
		return customer;
	}

	public void setCustomer(Customer customer) {
		this.customer = customer;
	}

	public Transaction() {
	}

	public Transaction(LocalDateTime timestamp, double closingBalance, double deposit, double withdraw, Customer customer, int id,String transactionType) {
		this.timestamp = timestamp;
		this.closingBalance = closingBalance;
		this.deposit = deposit;
		this.withdraw = withdraw;
		this.customer = customer;
		this.id = id;
		this.transactionType=transactionType;
	}
}
