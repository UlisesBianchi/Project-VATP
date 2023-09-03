package com.example.VATP.service;

import com.example.VATP.model.Detalle;
import com.example.VATP.repository.DetalleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DetalleService {

    private final DetalleRepository detalleRepository;

    @Autowired
    public DetalleService(DetalleRepository detalleRepository) {
        this.detalleRepository = detalleRepository;
    }

    public Detalle guardarDetalle(Detalle detalle) {
        return detalleRepository.save(detalle);
    }

    public Optional<Detalle> obtenerDetallePorId(Integer id) {
        return detalleRepository.findById(id);
    }

    public List<Detalle> obtenerTodosDetalles() {
        return detalleRepository.findAll();
    }

    public Detalle actualizarDetalle(Detalle detalle) {
        return detalleRepository.save(detalle);
    }

    public void eliminarDetalle(Integer id) {
        detalleRepository.deleteById(id);
    }
}