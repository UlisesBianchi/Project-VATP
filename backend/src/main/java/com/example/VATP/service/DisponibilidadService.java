package com.example.VATP.service;

import com.example.VATP.dto.DisponibilidadDTO;
import com.example.VATP.model.Producto;
import com.example.VATP.model.ProductoDisponibilidad;
import com.example.VATP.repository.ProductoDisponibilidadRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

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

    public List<LocalDate> obtenerFechasDisponiblesParaProducto(Producto producto) {
        // Use the repository method to find available dates for the given product
        List<ProductoDisponibilidad> disponibilidades = productoDisponibilidadRepository.findByProductoId(producto.getId());

        // Extract the dates from the disponibilidades and return as a list of LocalDate
        return disponibilidades.stream()
                .map(ProductoDisponibilidad::getDate)
                .collect(Collectors.toList());
    }

    public List<DisponibilidadDTO> obtenerFechasConStockParaProducto(Producto producto) {
        // Use the repository method to find available dates with stock for the given product
        List<ProductoDisponibilidad> disponibilidades = productoDisponibilidadRepository.findAvailableDatesWithStockByProducto(producto);

        // Map the available dates with stock to DisponibilidadDTO objects
        return disponibilidades.stream()
                .map(disponibilidad -> {
                    DisponibilidadDTO dto = new DisponibilidadDTO();
                    dto.setFechaDisponible(disponibilidad.getDate());
                    dto.setProducto(producto);
                    dto.setAvailableUnits(disponibilidad.getAvailableUnits());
                    return dto;
                })
                .collect(Collectors.toList());
    }}