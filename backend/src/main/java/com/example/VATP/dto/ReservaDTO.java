package com.example.VATP.dto;

import com.example.VATP.model.Producto;
import com.example.VATP.model.User;

import java.time.LocalDate;

public class ReservaDTO {

    private LocalDate fechaReserva;
    private Producto producto;

    private User usuario;

    public LocalDate getFechaReserva() {
        return fechaReserva;
    }

    public void setFechaReserva(LocalDate fechaReserva) {
        this.fechaReserva = fechaReserva;
    }

    public Producto getProducto() {
        return producto;
    }

    public void setProducto(Producto producto) {
        this.producto = producto;
    }

    public User getUsuario() {
        return usuario;
    }

    public void setUsuario(User usuario) {
        this.usuario = usuario;
    }
}
