package com.example.VATP.service;


import com.example.VATP.model.Producto;
import com.example.VATP.model.Reserva;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface ReservaService {


    List<Reserva> listarReserva();
    Optional<Reserva> buscarReserva(Integer id);

    List<Reserva> obtenerReservasEnFecha(Producto producto, LocalDate fechaReserva);
    List<Reserva> buscarProductosPorFecha( LocalDate fecha);

    Reserva guardarReserva(Reserva reserva);

    Reserva actualizarReserva(Reserva reserva);

    void  eliminarReserva(Integer id);



}