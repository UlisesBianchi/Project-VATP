package com.example.VATP.service;

import com.example.VATP.model.Producto;
import com.example.VATP.model.ProductoDisponibilidad;
import com.example.VATP.repository.ProductoDisponibilidadRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
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
    public List<ProductoDisponibilidad> buscarProductosDisponiblesPorFecha(LocalDate fechaReserva) {
        return productoDisponibilidadRepository.findAllByDate(fechaReserva);
    }

    public Optional<ProductoDisponibilidad> buscarProductosDisponiblesPorFecha(LocalDate fechaReserva, Producto producto) {
        return productoDisponibilidadRepository.findByProductoAndDate(producto,fechaReserva);
    }
    public Optional<ProductoDisponibilidad> obtenerDisPorId(Integer id) {
        return productoDisponibilidadRepository.findById(id);
    }

    public void eliminarDisponibles(Integer id) {
        productoDisponibilidadRepository.deleteById(id);
    }

    public List<ProductoDisponibilidad> obtenerDisponibilidadesPorProducto(Integer id) {
        return productoDisponibilidadRepository.findByProductoId(id);
    }

}