package com.example.VATP.controller;


import com.example.VATP.dto.ReservaDTO;
import com.example.VATP.model.Producto;
import com.example.VATP.model.Reserva;
import com.example.VATP.model.User;
import com.example.VATP.service.ProductoService;
import com.example.VATP.service.ReservaService;
import com.example.VATP.service.UserService;
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
@RequestMapping("/reservas")
public class ReservaController {

    @Autowired
    private final ReservaService reservaService;

    @Autowired
    private final UserService userService;


    @Autowired
    private final ProductoService productoService;

    public ReservaController(ReservaService reservaService, UserService userService, ProductoService productoService) {
        this.reservaService = reservaService;
        this.userService = userService;
        this.productoService = productoService;
    }


    // crea una reserva y asigna un producto
    @PostMapping("/realizar")
    public ResponseEntity<Reserva> realizarReserva(@RequestBody Reserva reserva) {
        // Check if the usuarioId field is set in the request
        if (reserva.getUsuarioId() != null) {
            // Retrieve the User object based on the usuarioId
            Optional<User> optionalUser = userService.getUserById(reserva.getUsuarioId());

            if (optionalUser.isPresent()) {
                User user = optionalUser.get();
                reserva.setUsuario(user);
            } else {
                // Handle the case where the specified user does not exist
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        }

        Reserva guardarReserva = reservaService.guardarReserva(reserva);
        return ResponseEntity.ok(guardarReserva);
    }

    @GetMapping("/por-fecha/{fecha}")
    public ResponseEntity<List<ReservaDTO>> listarProductosPorFecha(@PathVariable("fecha") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate fecha) {
        if (fecha != null) {
            List<Reserva> reservas = reservaService.buscarProductosPorFecha(fecha);

            List<ReservaDTO> resultados = new ArrayList<>();

            for (Reserva reserva : reservas) {
                LocalDate fechaReserva = reserva.getFechaReserva();
                Producto producto = reserva.getProductos();
                ReservaDTO dto = new ReservaDTO();
                dto.setFechaReserva(fechaReserva);
                dto.setProducto(producto);
                resultados.add(dto);
            }

            return ResponseEntity.ok(resultados);
        } else {
            return ResponseEntity.ok(Collections.emptyList());
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


}