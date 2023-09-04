package com.example.VATP.controller;

import com.example.VATP.model.Categoria;
import com.example.VATP.model.Producto;
import com.example.VATP.model.Reserva;
import com.example.VATP.service.CategoriaService;
import com.example.VATP.service.ProductoService;
import com.example.VATP.service.ReservaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/productos")
public class ProductoController {
    @Autowired
    private ProductoService productoService;

    @Autowired
    private CategoriaService categoriaService;

    @Autowired
    private ReservaService reservaService;

/*
    @PostMapping
    public ResponseEntity<Producto> guardarProducto(@RequestBody Producto producto) {
        Optional<Categoria> categoriaBuscada = categoriaService.obtenerCatPorId(producto.getCategoria().getId());
       if(categoriaBuscada.isPresent()){
           return ResponseEntity.ok(productoService.guardarProducto(producto));
       }else{
           return ResponseEntity.notFound().build();
       }
    }*/


    @PostMapping
    public ResponseEntity<Producto> guardarProducto(@RequestBody Producto producto) {
        Producto savedProducto = productoService.guardarProducto(producto);
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
    public ResponseEntity<Producto> actualizarProducto(@PathVariable Integer id, @RequestBody Producto producto) {
        Optional<Producto> existingProducto = productoService.obtenerPorId(id);
        if (existingProducto.isPresent()) {
            producto.setId(id);
            Producto updatedProducto = productoService.actualizarProducto(producto);
            return ResponseEntity.ok(updatedProducto);
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