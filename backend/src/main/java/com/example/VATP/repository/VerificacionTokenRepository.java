package com.example.VATP.repository;

import com.example.VATP.model.User;
import com.example.VATP.model.VerificacionToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VerificacionTokenRepository extends JpaRepository <VerificacionToken,Integer>{

    VerificacionToken findByToken (String token);
    VerificacionToken findByUser (User user);


}
