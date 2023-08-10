package com.example.VATP.dto;

import jakarta.validation.constraints.Email;

public class GrantAdminDto {
    @Email
    private String userEmail;

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }
}
