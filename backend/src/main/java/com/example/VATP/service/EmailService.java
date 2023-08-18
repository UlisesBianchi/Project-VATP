package com.example.VATP.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;




@Service
public class EmailService {

    @Autowired
    private JavaMailSender javaMailSender;

    @Value("${app.loginPageUrl}")
    private String loginPageUrl;

    public void sendRegistrationConfirmationEmail(String toEmail, String firstName) {
        MimeMessage message = javaMailSender.createMimeMessage();
        MimeMessageHelper helper;

        try {
            helper = new MimeMessageHelper(message, true);
            helper.setTo(toEmail);
            helper.setSubject("Registration Confirmation");

            String emailContent = generateEmailContent(firstName); // Generate email content here

            helper.setText(emailContent, true);

            javaMailSender.send(message);
        } catch (MessagingException e) {
            e.printStackTrace();
        }
    }

    private String generateEmailContent(String firstName) {
        String emailContent = "<html><body>";
        emailContent += "<p>Dear " + firstName + ",</p>";
        emailContent += "<p>Thank you for registering with our app. Your account has been successfully created.</p>";
        emailContent += "<p>Please click the link below to log in:</p>";
        emailContent += "<a href='" + loginPageUrl + "'>Log In</a>";
        emailContent += "<p>If you did not create an account, please ignore this email.</p>";
        emailContent += "<p>Best regards,<br>Your App Team</p>";
        emailContent += "</body></html>";

        return emailContent;
    }
}