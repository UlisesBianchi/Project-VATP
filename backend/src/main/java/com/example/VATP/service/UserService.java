package com.example.VATP.service;


import com.example.VATP.dto.LoginDTO;
import com.example.VATP.dto.UserDto;
import com.example.VATP.model.User;
import com.example.VATP.utils.LoginMesage;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.List;

public interface UserService {
    void saveUser(UserDto userDto);

    User findUserByEmail(String email);

    LoginMesage loginUser(LoginDTO loginDTO);
    List<UserDto> findAllUsers();

    UserDetails loadUserByUsername(String email) throws UsernameNotFoundException;

    void grantAdminPrivileges(String userEmail);

}