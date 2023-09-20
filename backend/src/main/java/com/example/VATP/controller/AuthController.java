package com.example.VATP.controller;

import com.example.VATP.dto.LoginDTO;
import com.example.VATP.dto.UserDto;
import com.example.VATP.model.User;
import com.example.VATP.service.EmailService;
import com.example.VATP.service.UserService;
import com.example.VATP.utils.LoginMesage;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@Controller
public class AuthController {
    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping({ "index" })
    public String home() {
        return "index";
    }

    @GetMapping({ "/api/login" })
    public String loginForm() {
        return "login";
    }

    @PostMapping("/api/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginDTO loginDTO) {
        LoginMesage loginResponse = userService.loginUser(loginDTO);
        return ResponseEntity.ok(loginResponse);
    }

    @GetMapping({ "register" })
    public String showRegistrationForm(Model model) {
        UserDto user = new UserDto();
        model.addAttribute("user", user);
        return "register";
    }

    @PostMapping({ "/register/save" })
    public String registration(@ModelAttribute("user") @Valid UserDto user, BindingResult result, Model model) {
        User existing = this.userService.findUserByEmail(user.getEmail());
        if (existing != null) {
            result.rejectValue("email", (String) null, "There is already an account registered with that email");
        }

        if (result.hasErrors()) {
            model.addAttribute("user", user);
            return "register";
        } else {
            this.userService.saveUser(user);
            return "redirect:/registrationok";
        }
    }

    @GetMapping({ "/registrationok" })
    public String registrationSuccess() {
        return "registrationok";
    }

    @GetMapping("/api/users")
    public ResponseEntity<List<UserDto>> listRegisteredUsersWithRoles() {
        List<UserDto> usersWithRoles = userService.findAllUsersWithRoles();
        return ResponseEntity.ok(usersWithRoles);
    }
    @PostMapping("/api/users/{userId}/favorites/{productId}")
    public ResponseEntity<String> agregarProductoAFavoritos(@PathVariable Integer userId, @PathVariable Integer productId) {
        try {
            userService.agregarProductoAFavoritos(userId, productId);
            return ResponseEntity.ok("Producto agregado a favoritos correctamente.");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error al agregar el producto a favoritos.");
        }
    }

    @DeleteMapping("/api/users/{userId}/favorites/{productId}")
    public ResponseEntity<String> eliminarProductoDeFavoritos(@PathVariable Integer userId, @PathVariable Integer productId) {
        try {
            userService.eliminarProductoDeFavoritos(userId, productId);
            return ResponseEntity.ok("Producto eliminado de favoritos correctamente.");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error al eliminar el producto de favoritos.");
        }
    }


}
