package com.example.VATP.controller;

import com.example.VATP.dto.GrantAdminDto;
import com.example.VATP.model.User;
import com.example.VATP.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin")
public class AdminController {

    private final UserService userService;

    @Autowired
    public AdminController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/grant-admin")
    public ResponseEntity<String> grantAdminPrivileges(@RequestBody @Valid GrantAdminDto request, BindingResult result) {
        if (result.hasErrors()) {
            // Handle validation errors and return appropriate response
            return ResponseEntity.badRequest().body("Invalid request");
        }

        String userEmail = request.getUserEmail();
        User user = userService.findUserByEmail(userEmail);
        if (user == null) {
            return ResponseEntity.badRequest().body("User not found with this email");
        }

        userService.grantAdminPrivileges(userEmail);
        return ResponseEntity.ok("Admin privileges granted to user: " + userEmail);
    }}