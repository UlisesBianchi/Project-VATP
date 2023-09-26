package com.example.VATP.service;

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
            helper.setSubject("Confirmacion de registro");

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
            helper.setSubject("Confirmacion de Reserva");

            String emailContent = generateReservaContent(user,producto,fechaReserva); // Generate email content here

            helper.setText(emailContent, true);

            javaMailSender.send(message);
        } catch (MessagingException e) {
            e.printStackTrace();
        }
    }

    private String generateEmailContent(String firstName) {
        String emailContent = "<html><body>";
        emailContent += "<p>Estimado/a " + firstName + ",</p>";
        emailContent += "<p>Gracias por registrarse en nuestra aplicación. Su cuenta ha sido creada con éxito.</p>";
        emailContent += "<p>Por favor, haga clic en el enlace de abajo para iniciar sesión:</p>";
        emailContent += "<a href='" + loginPageUrl + "'>Iniciar sesión</a>";
        emailContent += "<p>Si usted no creó una cuenta, por favor ignore este correo electrónico.</p>";
        emailContent += "<p>Atentamente,<br>El equipo de Viaje a tu paladar</p>";
        emailContent += "</body></html>";

        return emailContent;
    }

    private String generateReservaContent(String user, String producto, LocalDate fechaReserva) {
        String reservaContent = "<html><body>";
        reservaContent += "<p>Estimado/a " + user + ",</p>";
        reservaContent += "<p>Gracias por reservar un producto.</p>";
        reservaContent += "<p>Su producto, " + producto + ", ha sido reservado con éxito.</p>";
        reservaContent += "<p>para el día " + fechaReserva + ".</p>";
        reservaContent += "</body></html>";

        return reservaContent;
    }}
