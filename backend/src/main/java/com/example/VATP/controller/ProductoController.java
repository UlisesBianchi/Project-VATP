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

    @PatchMapping("/{id}")
    public ResponseEntity<Producto> actualizarProducto(@PathVariable Integer id, @RequestBody ProductoRequestDTO productoRequestDTO) {
        Optional<Producto> existingProducto = productoService.obtenerPorId(id);

        if (existingProducto.isPresent()) {
            Producto productoToUpdate = existingProducto.get();

            // Apply partial updates from the DTO to the existing product
            if (productoRequestDTO.getNombre() != null) {
                productoToUpdate.setNombre(productoRequestDTO.getNombre());
            }

            // Directly update the precio field, as it cannot be null
            productoToUpdate.setPrecio(productoRequestDTO.getPrecio());

            if (productoRequestDTO.getDescripcion() != null) {
                productoToUpdate.setDescripcion(productoRequestDTO.getDescripcion());
            }

            if (productoRequestDTO.getImages() != null) {
                productoToUpdate.setImages(productoRequestDTO.getImages());
            }

            if (productoRequestDTO.getDescripcionCorta() != null) {
                productoToUpdate.setDescripcionCorta(productoRequestDTO.getDescripcionCorta());
            }


            if (productoRequestDTO.getCategoria() != null) {
                productoToUpdate.setCategoria(productoRequestDTO.getCategoria());
            }

            if (productoRequestDTO.getCaracteristicasProductos() != null) {
                productoToUpdate.setCaracteristicasProductos(productoRequestDTO.getCaracteristicasProductos());
            }

            // Now, update the product in your service
            Producto updatedProducto = productoService.actualizarProducto(id, productoToUpdate);

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
