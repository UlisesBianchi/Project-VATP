package com.example.VATP.controller;

import com.example.VATP.dto.ProductoRequestDTO;
import com.example.VATP.model.*;
import com.example.VATP.service.DisponibilidadService;
import com.example.VATP.service.ProductoService;
import com.example.VATP.service.ReservaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@RestController
@RequestMapping("/productos")
public class ProductoController {
    @Autowired
    private ProductoService productoService;
    @Autowired
    private DisponibilidadService disponibilidadService;

    @Autowired
    private ReservaService reservaService;


    @PostMapping
    public ResponseEntity<Producto> guardarProducto(@RequestBody ProductoRequestDTO productoRequestDTO) {
        Producto savedProducto = productoService.guardarProducto(productoRequestDTO);
        return ResponseEntity.ok(savedProducto);
    }


    @GetMapping
    public ResponseEntity<List<Producto>> obtenerTodos() {
        List<Producto> productos = productoService.obtenerTodos();
        return ResponseEntity.ok(productos);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Producto> obtenerPorId(@PathVariable Integer id) {
        Optional<Producto> producto = productoService.obtenerPorId(id);
        return producto.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Producto> actualizarProducto(@PathVariable Integer id, @RequestBody ProductoRequestDTO productoRequestDTO) {
        Optional<Producto> existingProducto = productoService.obtenerPorId(id);
        if (existingProducto.isPresent()) {
            Producto updatedProducto = productoService.actualizarProducto(id, productoRequestDTO);
            return ResponseEntity.ok(updatedProducto);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/{id}/images")
    public ResponseEntity<List<String>> obtenerImagenesProducto(@PathVariable Integer id) {
        Optional<Producto> producto = productoService.obtenerPorId(id);
        if (producto.isPresent()) {
            List<String> images = producto.get().getImages();
            return ResponseEntity.ok(images);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
/*
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarProducto(@PathVariable Integer id) {

        List<ProductoDisponibilidad> productosConDisponibilidad = disponibilidadService.obtenerTodas();

        for (ProductoDisponibilidad productoDisponibles : productosConDisponibilidad) {
            Producto productoRelacionado = productoDisponibles.getProducto();

            if (productoRelacionado != null && Objects.equals(productoRelacionado.getId(), id)) {
                disponibilidadService.eliminarDisponibles(productoDisponibles.getId());
            }
        }

        productoService.eliminarProducto(id);

        return ResponseEntity.noContent().build();
    } */


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarProducto(@PathVariable Integer id) {
        // Eliminar reservas relacionadas al producto
        List<Reserva> reservasRelacionadas = reservaService.obtenerReservasPorProducto(id);
        for (Reserva reserva : reservasRelacionadas) {
            reservaService.eliminarReserva(reserva.getId());
        }

        // Eliminar disponibilidades relacionadas al producto
        List<ProductoDisponibilidad> disponibilidadesRelacionadas = disponibilidadService.obtenerDisponibilidadesPorProducto(id);
        for (ProductoDisponibilidad disponibilidad : disponibilidadesRelacionadas) {
            disponibilidadService.eliminarDisponibles(disponibilidad.getId());
        }

        // Finalmente, eliminar el producto
        productoService.eliminarProducto(id);

        return ResponseEntity.noContent().build();
    }



}
