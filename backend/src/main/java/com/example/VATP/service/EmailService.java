package com.example.VATP.service;

import com.example.VATP.model.Producto;
import com.example.VATP.model.Reserva;
import com.example.VATP.model.User;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.time.LocalDate;


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

    public void sendReservaEmail(String toEmail, String user, String  producto, LocalDate fechaReserva) {
        MimeMessage message = javaMailSender.createMimeMessage();
        MimeMessageHelper helper;

        try {
            helper = new MimeMessageHelper(message, true);
            helper.setTo(toEmail);
            helper.setSubject("Reservation Confirmation");

            String emailContent = generateReservaContent(user,producto,fechaReserva); // Generate email content here

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


    private String generateReservaContent(String user, String producto, LocalDate fechaReserva) {
        String reservaContent = "<html><body>";
        reservaContent += "<p>Dear " + user + ",</p>";
        reservaContent += "<p>Thank you for reserving a product.</p>";
        reservaContent += "<p>Your product, " + producto + ", has been reserved successfully.</p>";
        reservaContent += "<p>for the day " + fechaReserva + ".</p>";
        reservaContent += "</body></html>";

        return reservaContent;
    }
}