package com.example.VATP.service;

import com.example.VATP.dto.LoginDTO;
import com.example.VATP.dto.UserDto;
import com.example.VATP.model.Producto;
import com.example.VATP.model.Role;
import com.example.VATP.model.User;
import com.example.VATP.repository.ProductoRepository;
import com.example.VATP.repository.RoleRepository;
import com.example.VATP.repository.UserRepository;
import com.example.VATP.utils.LoginMesage;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {

    private UserRepository userRepository;
    private RoleRepository roleRepository;
    private PasswordEncoder passwordEncoder;

    private ProductoRepository productoRepository;

    private final EmailService emailService;

    public UserServiceImpl(UserRepository userRepository,
                           RoleRepository roleRepository,
                           PasswordEncoder passwordEncoder,
                           ProductoRepository productoRepository, EmailService emailService) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
        this.productoRepository = productoRepository;
        this.emailService = emailService;
    }

    @Override
    public void saveUser(UserDto userDto) {
        User user = new User();
        user.setFirstName(userDto.getFirstName());
        user.setLastName(userDto.getLastName());
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

        emailService.sendRegistrationConfirmationEmail(user.getEmail(), user.getFirstName());
    }
    @Override
    public LoginMesage loginUser(LoginDTO loginDTO) {
        User user1 = userRepository.findByEmail(loginDTO.getEmail());
        if (user1 != null) {
            String password = loginDTO.getPassword();
            String encodedPassword = user1.getPassword();
            boolean isPwdRight = passwordEncoder.matches(password, encodedPassword);
            if (isPwdRight) {
                if (loginDTO.getEmail().equals(user1.getEmail())) {
                    // Include user information in the response
                    return new LoginMesage("Login Success", true, user1);
                } else {
                    return new LoginMesage("Login Failed", false, null);
                }
            } else {
                return new LoginMesage("Password Not Match", false, null);
            }
        } else {
            return new LoginMesage("Email not exists", false, null);
        }
    }


    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email);

        if (user != null) {
            return new org.springframework.security.core.userdetails.User(
                    user.getEmail(),
                    user.getPassword(),
                    user.getRoles().stream()
                            .map(role -> new SimpleGrantedAuthority(role.getName()))
                            .collect(Collectors.toList())
            );
        } else {
            throw new UsernameNotFoundException("Invalid email or password.");
        }
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

    @Override
    public List<UserDto> findAllUsersWithRoles() {
        List<User> usersWithRoles = userRepository.findAll();
        return usersWithRoles.stream()
                .map(this::mapToUserDto)
                .collect(Collectors.toList());
    }

    private UserDto mapToUserDto(User user) {
        UserDto userDto = new UserDto();
        userDto.setId(user.getId());
        userDto.setFirstName(user.getFirstName());
        userDto.setLastName(user.getLastName());
        userDto.setEmail(user.getEmail());

        // Set the role ID
        if (!user.getRoles().isEmpty()) {
            userDto.setRoleId(user.getRoles().get(0).getId()); // Assuming a user has only one role
        }

        return userDto;
    }

    @Override
    public void agregarProductoAFavoritos(Integer userId, Integer productoId) {
        User user = userRepository.findById(userId).orElse(null);
        Producto producto = productoRepository.findById(productoId).orElse(null);

        if (user != null && producto != null) {
            List<Producto> favoritos = user.getFavoritos();
            favoritos.add(producto);
            userRepository.save(user);
        }
    }

    @Override
    public void eliminarProductoDeFavoritos(Integer userId, Integer productoId) {
        User user = userRepository.findById(userId).orElse(null);
        Producto producto = productoRepository.findById(productoId).orElse(null);

        if (user != null && producto != null) {
            List<Producto> favoritos = user.getFavoritos();
            favoritos.remove(producto);
            userRepository.save(user);
        }
    }
    @Override
    public Optional<User> getUserById(Integer userId) {
        return userRepository.findById(userId);
    }

}
