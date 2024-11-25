package com.simple.banking.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception{
        httpSecurity.sessionManagement(session -> session.maximumSessions(1)
                .expiredUrl("/api/simple/banking/session-expired")).authorizeRequests(auth ->
                auth.requestMatchers("/api/simple/banking/login", "/api/simple/banking/session-expired").permitAll()
                        .anyRequest().authenticated());
        return httpSecurity.build();
    }
}
