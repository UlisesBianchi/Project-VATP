package com.example.VATP.repository;

import com.example.VATP.model.Producto;
import com.example.VATP.model.ProductoDisponibilidad;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDate;
import java.util.Optional;

public interface ProductoDisponibilidadRepository extends JpaRepository<ProductoDisponibilidad, Integer> {
    Optional<ProductoDisponibilidad> findByProductoAndDate(Producto producto, LocalDate date);
}