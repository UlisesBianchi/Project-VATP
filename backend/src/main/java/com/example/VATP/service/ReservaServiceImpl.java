package com.example.VATP.service;


import com.example.VATP.model.Producto;
import com.example.VATP.model.ProductoDisponibilidad;
import com.example.VATP.model.Reserva;
import com.example.VATP.model.User;
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

    @Autowired
    private UserService userService;

    @Autowired
    private EmailService emailService;


    @Override
    public List<Reserva> obtenerReservasPorProducto(Integer id) {
        return reservaRepository.findByProductosId(id);
    }

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
        Integer usuarioId =reserva.getUsuario().getId();
        Reserva reservas = new Reserva();

        Optional<User> optionalUser = userService.getUserById(usuarioId);
        Optional<Producto> optionalProducto = productoService.obtenerPorId(productoId);

        if (optionalProducto.isPresent() && optionalUser.isPresent()) {
            Producto producto = optionalProducto.get();
            User user = optionalUser.get();


            // Check if there's available stock for the selected date
            Optional<ProductoDisponibilidad> availability = productoService.getProductAvailability(producto, fechaReserva);

            if (availability.isPresent() && availability.get().getAvailableUnits() > 0) {
                // Decrement the available units for that date in the availability table
                productoService.decrementAvailability(availability.get());



                // Set the remaining fields in the Reserva object
                reservas.setUsuario(user);
                reservas.setProductos(producto);
                reservas.setFechaReserva(fechaReserva);

                emailService.sendReservaEmail(user.getEmail(), user.getFirstName(),producto.getNombre(),fechaReserva);
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
        reservaRepository.deleteById(id);
    }


}


