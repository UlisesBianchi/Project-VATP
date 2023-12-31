package com.example.VATP.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;



@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:5173/")
                .allowedOrigins("http://g6-frontend.s3-website-us-east-1.amazonaws.com")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "PATCH")
                .exposedHeaders("X-Total-Count");
    }
}