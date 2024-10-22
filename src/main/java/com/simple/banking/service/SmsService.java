package com.simple.banking.service;

import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Service;
import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;

@Service
public class SmsService {
    @Value("${twilio.account.sid}")
    private String accountSid;

    @Value("${twilio.auth.token}")
    private String authToken;

    @Value("${twilio.phone.number}")
    private String fromPhoneNumber;

    public SmsService() {

    }

    @PostConstruct
    public void initTwilio(){
        Twilio.init(accountSid, authToken);
    }

    public void sendSms(String to, String message) {
        Message.creator(new PhoneNumber(to), new PhoneNumber(fromPhoneNumber), message).create();
    }
}
