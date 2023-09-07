package com.example.VATP.repository;


import com.example.VATP.model.Producto;
import com.example.VATP.model.Reserva;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

public interface ReservaRepository extends JpaRepository<Reserva, Integer> {
    List<Reserva> findByProductosAndFechaReserva(Producto productos, LocalDate fechaReserva);
}