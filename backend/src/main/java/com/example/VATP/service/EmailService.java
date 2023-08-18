package com.example.VATP.service;

import com.example.VATP.model.User;
import com.example.VATP.model.VerificacionToken;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;


@Service
public class EmailService {

    private final VerificacionTokenService verificacionTokenService;
    private final TemplateEngine templateEngine;
    private final JavaMailSender javaMailSender;

    @Autowired
    public EmailService(VerificacionTokenService verificacionTokenService,TemplateEngine templateEngine,
                                        JavaMailSender javaMailSender) {
        this.verificacionTokenService = verificacionTokenService;
        this.templateEngine = templateEngine;
        this.javaMailSender = javaMailSender;
    }

    public void sendHtmlMail (User user) throws MessagingException{
        VerificacionToken verificacionToken = verificacionTokenService.findByUser(user);
        // chek si el user tiene un token
        if(verificacionToken !=null){
            String token = verificacionToken.getToken();
            Context context = new Context();
            context.setVariable("title","Verificacio de Email");
            context.setVariable("link","http://localhost:8082/activation?token"+token);
            // crear un html tmplate y pasar la variable
            String body = templateEngine.process("verification",context);
            //enviar la verificacion email

            MimeMessage message = javaMailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message,true);
            helper.setTo(user.getEmail());
            helper.setSubject("email address verification");
            helper.setText(body,true);
            javaMailSender.send(message);



        }

    }


}
