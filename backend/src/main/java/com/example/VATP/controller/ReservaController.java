package com.example.VATP.controller;


import com.example.VATP.dto.ProductoRequestDTO;
import com.example.VATP.dto.ReservaRequestDTO;
import com.example.VATP.model.Producto;
import com.example.VATP.model.ProductoDisponibilidad;
import com.example.VATP.model.Reserva;
import com.example.VATP.service.ProductoService;
import com.example.VATP.service.ReservaService;
import org.springframework.beans.factory.annotation.Autowired;
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



    // crea una reserva y asigna un producto
    @PostMapping("/realizar")
    public ResponseEntity<String> realizarReserva(@RequestBody ReservaRequestDTO reservaRequestDTO) {
        Integer productoId = reservaRequestDTO.getProductoId();
        LocalDate fechaReserva = reservaRequestDTO.getFechaReserva();

        Optional<Producto> optionalProducto = productoService.obtenerPorId(productoId);

        if (optionalProducto.isPresent()) {
            Producto producto = optionalProducto.get();

            // Check if there's available stock for the selected date
            Optional<ProductoDisponibilidad> availability = productoService.getProductAvailability(producto, fechaReserva);

            if (availability.isPresent() && availability.get().getAvailableUnits() > 0) {
                // Decrement the available units for that date in the availability table
                productoService.decrementAvailability(availability.get());

                // Create a new Reserva instance and save it
                Reserva reserva = new Reserva();
                reserva.setProductos(producto);
                reserva.setFechaReserva(fechaReserva);
                reservaService.guardarReserva(reserva);

                return ResponseEntity.ok("Reserva exitosa");
            } else {
                return ResponseEntity.badRequest().body("No hay más disponibilidad en esta fecha");
            }
        }

        return ResponseEntity.notFound().build();
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