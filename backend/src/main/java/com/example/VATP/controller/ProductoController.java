package com.example.VATP.controller;

import com.example.VATP.dto.ProductoRequestDTO;
import com.example.VATP.model.CaracteristicasProducto;
import com.example.VATP.model.Producto;
import com.example.VATP.service.ProductoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/productos")
public class ProductoController {
    @Autowired
    private ProductoService productoService;

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

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarProducto(@PathVariable Integer id) {
        productoService.eliminarProducto(id);
        return ResponseEntity.noContent().build();
    }
}
