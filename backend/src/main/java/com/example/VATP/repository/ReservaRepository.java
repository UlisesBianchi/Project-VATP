package com.example.VATP.repository;


import com.example.VATP.model.Reserva;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


public interface ReservaRepository extends JpaRepository <Reserva, Integer>  {
}