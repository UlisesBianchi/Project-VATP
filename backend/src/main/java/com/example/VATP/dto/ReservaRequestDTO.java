package com.example.VATP.dto;

import java.time.LocalDate;

public class ReservaRequestDTO {
    private Integer productoId; // ID of the product being reserved
    private LocalDate fechaReserva;

    public Integer getProductoId() {
        return productoId;
    }

    public void setProductoId(Integer productoId) {
        this.productoId = productoId;
    }

    public LocalDate getFechaReserva() {
        return fechaReserva;
    }

    public void setFechaReserva(LocalDate fechaReserva) {
        this.fechaReserva = fechaReserva;
    }
}