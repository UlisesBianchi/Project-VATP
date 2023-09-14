package com.example.VATP.controller;

import com.example.VATP.model.Categoria;
import com.example.VATP.model.ProductoDisponibilidad;
import com.example.VATP.model.Reserva;
import com.example.VATP.service.DisponibilidadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/disponibilidad")
public class DisponibilidadCOntroller {

    @Autowired
    private final DisponibilidadService disponibilidadService;

    public DisponibilidadCOntroller(DisponibilidadService disponibilidadService) {
        this.disponibilidadService = disponibilidadService;
    }


    @GetMapping
    public ResponseEntity<List<ProductoDisponibilidad>> obternerTodasReservas(){
        List<ProductoDisponibilidad> productoDisponibilidads = disponibilidadService.obtenerTodas();
        return ResponseEntity.ok(productoDisponibilidads);    }

    @GetMapping("/{id}")
    public ResponseEntity< ProductoDisponibilidad> obtenerReservaPorId(@PathVariable("id")Integer id){
        Optional<ProductoDisponibilidad> reservaBuscado=disponibilidadService.obtenerDisPorId(id);
        return reservaBuscado.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

}
