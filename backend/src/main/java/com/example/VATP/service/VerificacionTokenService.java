
/*
package com.example.VATP.service;

import com.example.VATP.model.User;
import com.example.VATP.model.VerificacionToken;
import com.example.VATP.repository.VerificacionTokenRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.Calendar;

@Service
public class VerificacionTokenService {

    private  final VerificacionTokenRepository verificacionTokenRepository;

    @Autowired
    public VerificacionTokenService(VerificacionTokenRepository verificacionTokenRepository) {
        this.verificacionTokenRepository = verificacionTokenRepository;
    }

   @Transactional

    public VerificacionToken findByToken (String token){
        return verificacionTokenRepository.findBYToken(token);
    }

    public VerificacionToken findByUser (User user){
        return verificacionTokenRepository.findByUser(user);
    }

    public  void save (User user, String token){
        VerificacionToken verificacionToken= new VerificacionToken(token, user);
        // setea expiracion por 24 hs
        verificacionToken.setExpiryDate(calculateExpiryDate(24*60));
        verificacionTokenRepository.save(verificacionToken);
    }

    // calcular la expiracion

    private Timestamp calculateExpiryDate (int expiryTimeInMinutes){
        Calendar cal = Calendar.getInstance();
        cal.add(Calendar.MINUTE, expiryTimeInMinutes);
        return new Timestamp(cal.getTime().getTime());
    }

}
*/

package com.example.VATP.service;

import com.example.VATP.model.User;
import com.example.VATP.model.VerificacionToken;
import com.example.VATP.repository.VerificacionTokenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.util.Calendar;

@Service
public class VerificacionTokenService {

    private final VerificacionTokenRepository verificacionTokenRepository;

    @Autowired
    public VerificacionTokenService(VerificacionTokenRepository verificacionTokenRepository) {
        this.verificacionTokenRepository = verificacionTokenRepository;
    }

    @Transactional
    public VerificacionToken findByToken(String token) {
        return verificacionTokenRepository.findByToken(token);
    }

    public VerificacionToken findByUser(User user) {
        return verificacionTokenRepository.findByUser(user);
    }

    public void save(User user, String token) {
        VerificacionToken verificacionToken = new VerificacionToken(token, user);
        // Establecer expiración por 24 horas
        verificacionToken.setExpiryDate(calculateExpiryDate(24 * 60));
        verificacionTokenRepository.save(verificacionToken);
    }

    // Calcular la expiración

    private Timestamp calculateExpiryDate(int expiryTimeInMinutes) {
        Calendar cal = Calendar.getInstance();
        cal.add(Calendar.MINUTE, expiryTimeInMinutes);
        return new Timestamp(cal.getTime().getTime());
    }
}
