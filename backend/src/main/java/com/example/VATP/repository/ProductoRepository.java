package com.example.VATP.repository;

import com.example.VATP.model.Producto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


public interface ProductoRepository extends JpaRepository<Producto, Integer> {
}
