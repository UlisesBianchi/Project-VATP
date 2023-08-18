package com.example.VATP.controller;


import com.example.VATP.dto.UserDto;
import com.example.VATP.model.User;
import com.example.VATP.model.VerificacionToken;
import com.example.VATP.service.UserService;
import com.example.VATP.service.VerificacionTokenService;
import jakarta.validation.Valid;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.sql.Timestamp;
import java.util.List;

@Controller
public class AuthController {

    private final UserService userService;
    private final VerificacionTokenService verificacionTokenService;
    private com.example.VATP.dto.UserDto UserDto; // VER LO DE USER DTO

    public AuthController(UserService userService,VerificacionTokenService verificacionTokenService) {
        this.userService = userService;
        this.verificacionTokenService = verificacionTokenService;
    }

    @GetMapping("index")
    public String home(){
        return "index";
    }

    @GetMapping("/login")
    public String loginForm() {
        return "login";
    }

    // handler method to handle user registration request
    @GetMapping("register")
    public String showRegistrationForm(Model model){
        UserDto user = new UserDto();
        model.addAttribute("user", user);
        return "register";
    }

    // handler method to handle register user form submit request
    @PostMapping("/register/save")
    public String registration(@Valid @ModelAttribute("user") UserDto user,
                               BindingResult result,
                               Model model){
        User existing = userService.findUserByEmail(user.getEmail());
        if (existing != null) {
            result.rejectValue("email", null, "There is already an account registered with that email");
        }
        if (result.hasErrors()) {
            model.addAttribute("user", user);
            return "register";
        }
        userService.saveUser(user);
        return "redirect:/register?success";
    }

    @GetMapping("/users")
    public String listRegisteredUsers(Model model){
        List<UserDto> users = userService.findAllUsers();
        model.addAttribute("users", users);
        return "users";
    }

    @GetMapping("/activation")
    public  String activacion (@RequestParam("token") String token, Model model ){
        // crea el html de activacion

        VerificacionToken verificacionToken = verificacionTokenService.findByToken(token);
        if(verificacionToken == null){
            model.addAttribute("message","Tu verificacion token es invalida");
        }else {
            User user = verificacionToken.getUser();
            // ver el Enable en user model
            if(!user.isEnabled()){
                // get the current timestamp

                Timestamp currentTimestamp= new Timestamp(System.currentTimeMillis());
                // check if the token is espired

                if( verificacionToken.getExpiryDate().before(currentTimestamp)){
                    model.addAttribute("message","tu verificacion token a expidrado");
                }else{
                    // si el token es valido
                    //activa el usuario
                    user.setEnable(true);
                    // update de user
                    userService.saveUser( UserDto);
                    model.addAttribute("message","your account is successfully activated");
                }

            }else {
                // the user account is already activate
                model.addAttribute("message","your account is already activated");
            }
        }
        // add '/ activation ' to securityConfig
        return "activation";

    }

}

