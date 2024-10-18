package com.green.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

import java.util.List;

@Entity
@SequenceGenerator(name = "port_gen", sequenceName = "port_gen",  initialValue = 1000000000)
public class Customer {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO, generator = "port_gen")
	private Long accountNumber;

	private String name;

	@NotNull
	@Pattern(regexp="(^$|[0-9]{10})")
	private String contact;

	@Email
	@NotNull
	private String email;
	@NotNull
	private String password;

	@NotNull
	@Pattern(regexp="[A-Z]{5}[0-9]{4}[A-Z]{1}")
	private String panNumber;
	@NotNull
	@Pattern(regexp="(^$|[0-9]{12})")
	private String aadharNumber;
	private String address;
	@Column(columnDefinition="Decimal(10,2) default '0.00'")
	private double currentbalance;

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public Long getAccountNumber() {
		return accountNumber;
	}

	public void setAccountNumber(Long accountNumber) {
		this.accountNumber = accountNumber;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getContact() {
		return contact;
	}

	public void setContact(String contact) {
		this.contact = contact;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPanNumber() {
		return panNumber;
	}

	public void setPanNumber(String panNumber) {
		this.panNumber = panNumber;
	}

	public String getAadharNumber() {
		return aadharNumber;
	}

	public void setAadharNumber(String aadharNumber) {
		this.aadharNumber = aadharNumber;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public double getCurrentbalance() {
		return currentbalance;
	}

	public void setCurrentbalance(double currentbalance) {
		this.currentbalance = currentbalance;
	}

	public Customer() {
	}

	public Customer(String address, Long accountNumber, String name, String contact, String email, String password, String panNumber, String aadharNumber, double currentbalance) {
		this.address = address;
		this.accountNumber = accountNumber;
		this.name = name;
		this.contact = contact;
		this.email = email;
		this.password = password;
		this.panNumber = panNumber;
		this.aadharNumber = aadharNumber;
		this.currentbalance = currentbalance;
	}
}
