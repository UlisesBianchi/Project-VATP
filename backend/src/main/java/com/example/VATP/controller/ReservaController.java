package com.example.VATP.controller;


import com.example.VATP.model.Reserva;
import com.example.VATP.service.ReservaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/reservas")
public class ReservaController {

    @Autowired
    private ReservaService reservaService;

    // registrar una reserva

    @PostMapping
    public ResponseEntity<Reserva>  registrarNuevaRerserva(@RequestBody Reserva reserva){
        Reserva savedReserva = reservaService.guardarReserva(reserva);
        return ResponseEntity.ok(savedReserva) ;
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


}