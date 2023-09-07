package com.example.VATP.utils;

import com.example.VATP.model.User;

public class LoginMesage {
    private String message;
    private Boolean status;
    private User user;

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Boolean getStatus() {
        return status;
    }

    public void setStatus(Boolean status) {
        this.status = status;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public LoginMesage(String message, Boolean status, User user) {
        this.message = message;
        this.status = status;
        this.user = user;
    }
}
