package com.example.VATP.controller;

import com.example.VATP.dto.ProductoRequestDTO;
import com.example.VATP.model.Detalle;
import com.example.VATP.model.Producto;
import com.example.VATP.service.DetalleService;
import com.example.VATP.service.ProductoService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/detalles")
public class DetalleController {

    private final DetalleService detalleService;
    private final ProductoService productoService;

    @Autowired
    public DetalleController(DetalleService detalleService, ProductoService productoService) {
        this.detalleService = detalleService;
        this.productoService = productoService;
    }

    // ... Other methods ...

    @PostMapping("/productos/{id}/addDetalle/{detalleid}")
    public ResponseEntity<String> addDetalleToProducto(
            @PathVariable Integer id,
            @PathVariable Integer detalleid,
            @RequestBody ProductoRequestDTO productoRequestDTO) {
        // Retrieve the Producto and Detalle by their IDs
        Producto producto = productoService.obtenerPorId(id)
                .orElseThrow(() -> new EntityNotFoundException("Producto not found with ID: " + id));

        Detalle detalle = detalleService.obtenerDetallePorId(detalleid)
                .orElseThrow(() -> new EntityNotFoundException("Detalle not found with ID: " + detalleid));

        // Link the Detalle to the Producto
        producto.addDetalle(detalle);

        productoService.actualizarProducto(id, productoRequestDTO);

        return ResponseEntity.ok("Detalle linked to Producto successfully.");
    }}