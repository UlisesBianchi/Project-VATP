package com.example.VATP.service;


import com.example.VATP.dto.UserDto;
import com.example.VATP.model.User;

import java.util.List;

public interface UserService {
    void saveUser(UserDto userDto);

    User findUserByEmail(String email);

    List<UserDto> findAllUsers();

    void grantAdminPrivileges(String userEmail);

}