package com.example.VATP.repository;

import com.example.VATP.model.Producto;
import com.example.VATP.model.ProductoDisponibilidad;
import com.example.VATP.model.Reserva;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface ProductoDisponibilidadRepository extends JpaRepository<ProductoDisponibilidad, Integer> {
    Optional<ProductoDisponibilidad> findByProductoAndDate(Producto producto, LocalDate date);

    List<ProductoDisponibilidad> findAllByDate(LocalDate date);

    List<ProductoDisponibilidad> findByProductoId(Integer id);

    List<ProductoDisponibilidad> findAvailableDatesWithStockByProducto(Producto producto);
}