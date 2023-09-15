package com.example.VATP.service;


import com.example.VATP.model.Producto;
import com.example.VATP.model.ProductoDisponibilidad;
import com.example.VATP.model.Reserva;
import com.example.VATP.repository.ReservaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class ReservaServiceImpl implements ReservaService{


    @Autowired
    private ReservaRepository reservaRepository;
    @Autowired
    private ProductoService productoService;

    @Override
    public List<Reserva> obtenerReservasEnFecha(Producto producto, LocalDate fechaReserva) {
        // Return the list of reservations for the given Producto and fechaReserva
        return reservaRepository.findByProductosAndFechaReserva(producto, fechaReserva);
    }
    @Override
    public List<Reserva> buscarProductosPorFecha( LocalDate fechaReserva) {
        return reservaRepository.findByFechaReserva(fechaReserva);
    }
    @Override
    public List<Reserva> listarReserva() {return reservaRepository.findAll();}

    @Override
    public Optional<Reserva> buscarReserva(Integer id) {
        return Optional.empty();
    }


    @Override
    public Reserva guardarReserva(Reserva reserva) {
        Integer productoId = reserva.getProductos().getId();
        LocalDate fechaReserva = reserva.getFechaReserva();
        Reserva reservas = new Reserva();


        Optional<Producto> optionalProducto = productoService.obtenerPorId(productoId);

        if (optionalProducto.isPresent()) {
            Producto producto = optionalProducto.get();

            // Check if there's available stock for the selected date
            Optional<ProductoDisponibilidad> availability = productoService.getProductAvailability(producto, fechaReserva);
            if (availability.isPresent() && availability.get().getAvailableUnits() > 0) {
                // Decrement the available units for that date in the availability table
               // productoService.decrementAvailability(availability.get());
                productoService.decrementAvailability(availability.get());
                // Create a new Reserva instance and save it
                reservas.setProductos(producto);
                reservas.setFechaReserva(fechaReserva);

            }
        }

        return reservaRepository.save(reservas);
    }

    @Override
    public Reserva actualizarReserva(Reserva reserva) {
        return reservaRepository.save(reserva);
    }

    @Override
    public void eliminarReserva(Integer id) {
    }
}
