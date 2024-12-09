package com.simple.banking.model;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

import java.util.List;

@Entity
@SequenceGenerator(name = "port_gen", sequenceName = "port_gen",  initialValue = 1000000000)
public class Customer {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "port_gen")
    private Long accountNumber;

    private String firstName;
    private String lastName;

    @NotNull(message = "Contact Number is required.")
    @Pattern(regexp="(^$|[0-9]{10})",message = "Contact is invalid.")
    private String contact;
    @Email
    @NotNull(message = "Email is required.")
    @Column(unique = true)
    private String emailId;
    private String password;
    private String panNumber;
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

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getContact() {
        return contact;
    }

    public void setContact(String contact) {
        this.contact = contact;
    }

    public @Email @NotNull String getEmailId() {
        return emailId;
    }

    public void setEmailId(@Email @NotNull String emailId) {
        this.emailId = emailId;
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

    public Customer(String aadharNumber, Long accountNumber, String firstName, String lastName, String contact, String emailId, String password, String panNumber, String address, double currentbalance) {
        this.aadharNumber = aadharNumber;
        this.accountNumber = accountNumber;
        this.firstName = firstName;
        this.lastName = lastName;
        this.contact = contact;
        this.emailId = emailId;
        this.password = password;
        this.panNumber = panNumber;
        this.address = address;
        this.currentbalance = currentbalance;
    }
}
