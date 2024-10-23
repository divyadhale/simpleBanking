package com.simple.banking.model;

public class TransactionDto {

    private Long customerId;
    private String code;

    public Long getCustomerId() {
        return customerId;
    }

    public void setCustomerId(Long customerId) {
        this.customerId = customerId;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public TransactionDto() {
    }

    public TransactionDto(Long customerId, String code) {
        this.customerId = customerId;
        this.code = code;
    }
}
