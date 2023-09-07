package com.example.VATP.service;


import com.example.VATP.model.Producto;
import com.example.VATP.model.Reserva;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface ReservaService {


    List<Reserva> listarReserva();
    Optional<Reserva> buscarReserva(Integer id);
    Reserva guardarReserva(Reserva reserva);
    List<Reserva> obtenerReservasEnFecha(Producto producto, LocalDate fechaReserva);
    Reserva actualizarReserva(Reserva reserva);

    void  eliminarReserva(Integer id);



}