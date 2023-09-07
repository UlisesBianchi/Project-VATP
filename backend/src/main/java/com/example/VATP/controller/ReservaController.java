package com.example.VATP.controller;


import com.example.VATP.model.Producto;
import com.example.VATP.model.Reserva;
import com.example.VATP.service.ProductoService;
import com.example.VATP.service.ReservaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/reservas")
public class ReservaController {

    @Autowired
    private ReservaService reservaService;

    @Autowired
    private ProductoService productoService;


    // registrar una reserva
/*
    @PostMapping
    public ResponseEntity<Reserva>  registrarNuevaRerserva(@RequestBody Reserva reserva){
        Reserva savedReserva = reservaService.guardarReserva(reserva);
        return ResponseEntity.ok(savedReserva) ;
    }

    @PostMapping
    public ResponseEntity<Reserva> registrarNuevaReservaConIdProducto(@RequestBody Reserva reserva) {
        Optional<Producto> productoBuscado = productoService.obtenerPorId(reserva.getProductos().getId());
        if (productoBuscado.isPresent()) {
            return ResponseEntity.ok(reservaService.guardarReserva(reserva));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }*/
/*
    @PostMapping
    public ResponseEntity<Reserva> registrarNuevaReservaConIdProducto(@RequestBody Reserva reservaRequest) {
        // Check if the provided product id exists
        Optional<Producto> productoBuscado = productoService.obtenerPorId(reservaRequest.getProductos().getId());
        if (productoBuscado.isPresent()) {
            reservaRequest.setProductos(productoBuscado.get()); // Associate the found Producto with the Reserva
            return ResponseEntity.ok(reservaService.guardarReserva(reservaRequest));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }*/

 // crea una reserva y asigna un producto
    @PostMapping
    public ResponseEntity<Reserva> registrarNuevaReservaConIdProducto(@RequestBody Reserva reservaRequest) {
        // Check if the provided product id exists
        Optional<Producto> productoBuscado = productoService.obtenerPorId(reservaRequest.getProductos().getId());
        if (productoBuscado.isPresent()) {
            Producto producto = productoBuscado.get();
            reservaRequest.setProductos(producto); // Asociar manualmente el producto con la reserva
            return ResponseEntity.ok(reservaService.guardarReserva(reservaRequest));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }











    // buscar todos las reservas

    @GetMapping
    public ResponseEntity<List<Reserva>> obternerTodasReservas(){
        return ResponseEntity.ok(reservaService.listarReserva()) ;
    }

    // buscar reservas por id

    @GetMapping("/{id}")
    public ResponseEntity< Reserva> obtenerReservaPorId(@PathVariable("id")Integer id){
        Optional<Reserva> reservaBuscado=reservaService.buscarReserva(id);
        return reservaBuscado.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }



// eliminar una reserva por id

    @DeleteMapping("/{id}")
    public void eliminarReserva(@PathVariable Integer id) {
        reservaService.eliminarReserva(id);
    }

// actualizar reserva

    @PutMapping("/{id}")
    public ResponseEntity<Reserva> actualizarReserva(@RequestBody Reserva reserva){

        Optional<Reserva> reservaBuscado=reservaService.buscarReserva(reserva.getId());
        if (reservaBuscado.isPresent() ){
            return ResponseEntity.ok(reservaService.actualizarReserva(reserva));
        }else{
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }



    // busar en el calendario

    @GetMapping("/por-fecha/{fecha}")
    public ResponseEntity<List<Reserva>> listarProductosPorFecha (@PathVariable("fecha") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate fecha) {

        if (fecha != null) {
            List<Reserva> reservaFiltradas = reservaService.buscarProductosPorFecha(fecha);
            return ResponseEntity.ok(reservaFiltradas);
        } else {
            return ResponseEntity.ok(reservaService.listarReserva());
        }
    }


}