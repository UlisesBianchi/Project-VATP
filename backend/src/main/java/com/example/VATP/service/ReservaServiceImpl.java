package com.example.VATP.service;


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


    @Override
    public List<Reserva> listarReserva() {return reservaRepository.findAll();}

    @Override
    public Optional<Reserva> buscarReserva(Integer id) {
        return Optional.empty();
    }



    @Override
    public Reserva guardarReserva(Reserva reserva) {return reservaRepository.save(reserva);}

    @Override
    public Reserva actualizarReserva(Reserva reserva) {
        return reservaRepository.save(reserva);
    }

    @Override
    public void eliminarReserva(Integer id) {
    }

    @Override
    public List<Reserva> buscarProductosPorFecha(LocalDate fecha) {
      return reservaRepository.findByfecha(fecha);
    }
}
