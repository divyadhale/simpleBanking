package com.simple.banking.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
public class TransactionOtp {

	@Id
	@GeneratedValue
	private Long id;
	@Column(unique = true)
	private Long customerId;

	@Column(columnDefinition="Decimal(10,2) default '0.00'")
	private double withdraw;
	@Column(columnDefinition="Decimal(10,2) default '0.00'")
	private double deposit;
	@Column(columnDefinition="Decimal(10,2) default '0.00'")
	private double closingBalance;


	private String otp;

	private LocalDateTime timestamp;

	private String transactionType;

	public String getTransactionType() {
		return transactionType;
	}

	public void setTransactionType(String transactionType) {
		this.transactionType = transactionType;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
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

	public LocalDateTime getTimestamp() {
		return timestamp;
	}

	public void setTimestamp(LocalDateTime timestamp) {
		this.timestamp = timestamp;
	}

	public Long getCustomerId() {
		return customerId;
	}

	public void setCustomerId(Long customerId) {
		this.customerId = customerId;
	}

	public String getOtp() {
		return otp;
	}

	public void setOtp(String otp) {
		this.otp = otp;
	}

	public double getClosingBalance() {
		return closingBalance;
	}

	public void setClosingBalance(double closingBalance) {
		this.closingBalance = closingBalance;
	}

	public TransactionOtp() {
	}

	public TransactionOtp(LocalDateTime timestamp, String otp, double closingBalance, double deposit, double withdraw, Long customerId, Long id,String transactionType) {
		this.timestamp = timestamp;
		this.otp = otp;
		this.closingBalance = closingBalance;
		this.deposit = deposit;
		this.withdraw = withdraw;
		this.customerId = customerId;
		this.id = id;
		this.transactionType=transactionType;
	}
}
