package com.example.VATP.service;

import com.example.VATP.dto.UserDto;
import com.example.VATP.model.Role;
import com.example.VATP.model.User;
import com.example.VATP.repository.RoleRepository;
import com.example.VATP.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;



@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;

    private final VerificacionTokenService verificacionTokenService;
    private final EmailService emailService;


    public UserServiceImpl(UserRepository userRepository,
                           RoleRepository roleRepository,
                           VerificacionTokenService verificacionTokenService,
                           PasswordEncoder passwordEncoder,
                            EmailService emailService) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
        this.verificacionTokenService= verificacionTokenService;
        this.emailService = emailService;
    }

    @Override
    public User saveUser(UserDto userDto) {
        User user = new User();

        user.setEnable(false); // nose si va aqui
        user.setName(userDto.getFirstName() + " " + userDto.getLastName());
        user.setEmail(userDto.getEmail());
        user.setPassword(passwordEncoder.encode(userDto.getPassword()));

        // Ensure "ROLE_USER" and "ROLE_ADMIN" roles exist
        Role userRole = roleRepository.findByName("ROLE_USER");
        if (userRole == null) {
            userRole = new Role();
            userRole.setName("ROLE_USER");
            roleRepository.save(userRole);
        }

        Role adminRole = roleRepository.findByName("ROLE_ADMIN");
        if (adminRole == null) {
            adminRole = new Role();
            adminRole.setName("ROLE_ADMIN");
            roleRepository.save(adminRole);
        }


        // Assign user role
        user.setRoles(Arrays.asList(userRole));
        userRepository.save(user);
        // nose si va aqui  revisar

        Optional<User>saved = Optional.of(saveUser(userDto));
        saved.ifPresent( u -> {
            try {
                String token = UUID.randomUUID().toString();
                verificacionTokenService.save(saved.get(), token);
                // send verification email
                emailService.sendHtmlMail(u);
            } catch (Exception e) {
                e.printStackTrace();
            }
        });
        saved.get();
        return user;
    }


    public void grantAdminPrivileges(String userEmail) {
        User user = userRepository.findByEmail(userEmail);

        if (user != null) {
            Role adminRole = roleRepository.findByName("ROLE_ADMIN");
            Role userRole = roleRepository.findByName("ROLE_USER"); // Find ROLE_USER

            if (adminRole != null) {
                user.getRoles().remove(userRole); // Remove ROLE_USER if present
                user.getRoles().add(adminRole); // Add ROLE_ADMIN
                userRepository.save(user);
            }
        }
    }

    @Override
    public User findUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public List<UserDto> findAllUsers() {
        List<User> users = userRepository.findAll();
        return users.stream()
                .map((user) -> mapToUserDto(user))
                .collect(Collectors.toList());
    }

    private UserDto mapToUserDto(User user) {
        UserDto userDto = new UserDto();
        String[] str = user.getName().split(" ");
        userDto.setFirstName(str[0]);
        userDto.setLastName(str[1]);
        userDto.setEmail(user.getEmail());
        return userDto;
    }

}