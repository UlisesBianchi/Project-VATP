package com.example.VATP.controller;

import com.example.VATP.dto.DisponibilidadDTO;
import com.example.VATP.model.Producto;
import com.example.VATP.model.ProductoDisponibilidad;
import com.example.VATP.service.DisponibilidadService;
import com.example.VATP.service.ProductoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/disponibilidad")
public class DisponibilidadCOntroller {

    @Autowired
    private final DisponibilidadService disponibilidadService;
    @Autowired
    private final ProductoService productoService;

    public DisponibilidadCOntroller(DisponibilidadService disponibilidadService, ProductoService productoService) {
        this.disponibilidadService = disponibilidadService;
        this.productoService = productoService;
    }


    @GetMapping("/por-fechaStock/{fecha}")
    public ResponseEntity<List<DisponibilidadDTO>> listarDisponibilidadPorFechaStock(@PathVariable("fecha") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate fecha) {
        if (fecha != null) {
            List<ProductoDisponibilidad> disponibilidad = disponibilidadService.buscarProductosDisponiblesPorFecha(fecha);

            List<DisponibilidadDTO> resultados = new ArrayList<>();

            for (ProductoDisponibilidad productoDisponibilidad : disponibilidad) {
                LocalDate fechaDisponible = productoDisponibilidad.getDate();
                Producto producto = productoDisponibilidad.getProducto();
                Integer stock = productoDisponibilidad.getAvailableUnits();

                if (stock > 0) {
                    DisponibilidadDTO dto = new DisponibilidadDTO();
                    dto.setFechaDisponible(fechaDisponible);
                    dto.setProducto(producto);
                    dto.setStock(stock);
                    resultados.add(dto);
                }
            }

            return ResponseEntity.ok(resultados);
        } else {
            return ResponseEntity.ok(Collections.emptyList());
        }
    }

    @GetMapping("/por-fecha/{fecha}")
    public ResponseEntity<List<DisponibilidadDTO>> listarDisponibilidadPorFecha(@PathVariable("fecha") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate fecha) {
        if (fecha != null) {
            List<ProductoDisponibilidad> disponibilidad = disponibilidadService.buscarProductosDisponiblesPorFecha(fecha);

            List<DisponibilidadDTO> resultados = new ArrayList<>();

            for (ProductoDisponibilidad productoDisponibilidad : disponibilidad) {
                LocalDate fechaDisponible = productoDisponibilidad.getDate();
                Producto producto = productoDisponibilidad.getProducto();
                Integer stock = productoDisponibilidad.getAvailableUnits();

                DisponibilidadDTO dto = new DisponibilidadDTO();
                dto.setFechaDisponible(fechaDisponible);
                dto.setProducto(producto);
                dto.setStock(stock);
                resultados.add(dto);
            }

            return ResponseEntity.ok(resultados);
        } else {
            return ResponseEntity.ok(Collections.emptyList());
        }
    }

    @GetMapping
    public ResponseEntity<List<ProductoDisponibilidad>> obternerFecha(){
        //todos la disponibilidad del producto seleccionado en tal fecha
        List<ProductoDisponibilidad> productoDisponibilidads = disponibilidadService.obtenerTodas();
        return ResponseEntity.ok(productoDisponibilidads);    }


    @GetMapping("/por-fechaProducto/{fecha}")
    public ResponseEntity<List<DisponibilidadDTO>> listarProductoPorFecha(@PathVariable("fecha") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate fecha, @RequestParam("productoId") Integer productoId) {

        if (fecha != null) {
            Optional<Producto> producto = productoService.obtenerPorId(productoId);

            if (producto.isPresent()) {
                Optional<ProductoDisponibilidad> disponibilidad = disponibilidadService.buscarProductosDisponiblesPorFecha(fecha, producto.get());

                List<DisponibilidadDTO> disponibilidadDTOs = disponibilidad.stream()
                        .filter(disponibilidad1 -> disponibilidad1.getAvailableUnits() > 0)
                        .map(disponibilidad1 -> {
                            DisponibilidadDTO dto = new DisponibilidadDTO();
                            dto.setFechaDisponible(disponibilidad1.getDate());
                            dto.setProducto(producto.get());
                            dto.setStock(disponibilidad1.getAvailableUnits());
                            return dto;
                        })
                        .collect(Collectors.toList());

                if (!disponibilidadDTOs.isEmpty()) {
                    return ResponseEntity.ok(disponibilidadDTOs);
                }
            }
        }

        return ResponseEntity.ok(new ArrayList<>());
    }



}
