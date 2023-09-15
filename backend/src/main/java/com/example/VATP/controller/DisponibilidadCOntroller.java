package com.example.VATP.controller;

import com.example.VATP.dto.DisponibilidadDTO;
import com.example.VATP.dto.ReservaDTO;
import com.example.VATP.model.Categoria;
import com.example.VATP.model.Producto;
import com.example.VATP.model.ProductoDisponibilidad;
import com.example.VATP.model.Reserva;
import com.example.VATP.service.DisponibilidadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collections;
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


    @GetMapping("/{id}")
    public ResponseEntity< ProductoDisponibilidad> obtenerReservaPorId(@PathVariable("id")Integer id){
        Optional<ProductoDisponibilidad> reservaBuscado=disponibilidadService.obtenerDisPorId(id);
        return reservaBuscado.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

}
