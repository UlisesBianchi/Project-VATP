package com.example.VATP.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender javaMailSender;

    public void sendRegistrationConfirmationEmail(String toEmail) {
        SimpleMailMessage message = new SimpleMailMessage();

        message.setTo(toEmail);
        message.setSubject("Registration Confirmation");
        message.setText("Hello, You have been successfully registered.");

        javaMailSender.send(message);
    }
}
