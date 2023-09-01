package com.example.VATP.repository;

import com.example.VATP.model.Categoria;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


public interface CategoriaRepository extends JpaRepository<Categoria, Integer> {
}