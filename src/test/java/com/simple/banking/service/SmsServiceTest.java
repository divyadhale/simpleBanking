package com.simple.banking.service;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.Spy;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.util.ReflectionTestUtils;

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;

@SpringBootTest
public class SmsServiceTest {
    @Spy
    @InjectMocks
    private SmsService smsService;



    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        // Set the private fields for testing
        ReflectionTestUtils.setField(smsService, "accountSid", "testAccountSid");
        ReflectionTestUtils.setField(smsService, "authToken", "testAuthToken");
        ReflectionTestUtils.setField(smsService, "fromPhoneNumber", "+1234567890");

        // Initialize Twilio
        Twilio.init("testAccountSid", "testAuthToken");
    }

    @Test
    public void testSendSms()
    {
        String to = "+0987654321";
        String messageBody = "Hello, this is a test message!";
        doNothing().when(smsService).sendSms(to, messageBody);
        assertDoesNotThrow(() -> smsService.sendSms(to, messageBody));
        verify(smsService, times(1)).sendSms(to, messageBody);
    }
}

