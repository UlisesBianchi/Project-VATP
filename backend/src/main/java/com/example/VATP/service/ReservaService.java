package com.example.VATP.service;


import com.example.VATP.model.Reserva;


import java.util.List;
import java.util.Optional;


public interface ReservaService {

    List<Reserva> listarReserva();
    Optional<Reserva> buscarReserva(Integer id);
    Reserva guardarReserva(Reserva reserva);
    Reserva actualizarReserva(Reserva reserva);

    void  eliminarReserva(Integer id);



}