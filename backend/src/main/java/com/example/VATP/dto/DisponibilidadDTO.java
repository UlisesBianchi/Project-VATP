package com.example.VATP.dto;

import com.example.VATP.model.Producto;

import java.time.LocalDate;

public class DisponibilidadDTO {


    private LocalDate fechaDisponible;
    private Integer availableUnits;
    private Producto producto;

    public LocalDate getFechaDisponible() {
        return fechaDisponible;
    }

    public void setFechaDisponible(LocalDate fechaDisponible) {
        this.fechaDisponible = fechaDisponible;
    }

    public Integer getAvailableUnits() {
        return availableUnits;
    }

    public void setAvailableUnits(Integer stock) {
        this.availableUnits = stock;
    }

    public Producto getProducto() {
        return producto;
    }

    public void setProducto(Producto producto) {
        this.producto = producto;
    }
}
