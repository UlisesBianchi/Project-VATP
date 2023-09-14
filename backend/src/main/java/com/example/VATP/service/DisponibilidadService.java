package com.example.VATP.service;

import com.example.VATP.model.Categoria;
import com.example.VATP.model.ProductoDisponibilidad;
import com.example.VATP.repository.CategoriaRepository;
import com.example.VATP.repository.ProductoDisponibilidadRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DisponibilidadService {
    private final ProductoDisponibilidadRepository productoDisponibilidadRepository;

    @Autowired
    public DisponibilidadService(ProductoDisponibilidadRepository productoDisponibilidadRepository) {
        this.productoDisponibilidadRepository = productoDisponibilidadRepository;
    }
    public List<ProductoDisponibilidad> obtenerTodas() {
        return productoDisponibilidadRepository.findAll();
    }

    public Optional<ProductoDisponibilidad> obtenerDisPorId(Integer id) {
        return productoDisponibilidadRepository.findById(id);
    }

    public void eliminarDisponibles(Integer id) {
        productoDisponibilidadRepository.deleteById(id);
    }

}