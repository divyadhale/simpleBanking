package com.simple.banking.model;

import lombok.AllArgsConstructor;
import lombok.Data;



public class ApiResponse {

    private String status;
    private int statusCode;
    private String message;
    private String accountNumber;

    public ApiResponse() {
        super();
    }

    public ApiResponse(String status, int statusCode, String message, String accountNumber) {
        super();
        this.status = status;
        this.statusCode = statusCode;
        this.message = message;
        this.accountNumber = accountNumber;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public int getStatusCode() {
        return statusCode;
    }

    public void setStatusCode(int statusCode) {
        this.statusCode = statusCode;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getAccountNumber() {
        return accountNumber;
    }

    public void setAccountNumber(String accountNumber) {
        this.accountNumber = accountNumber;
    }

}
