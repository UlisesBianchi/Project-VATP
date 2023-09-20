package com.example.VATP.model;


import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "reservas")
public class Reserva {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column
    private LocalDate fechaReserva;
    @ManyToOne
    @JoinColumn(name = "productos")
    @JsonBackReference
    private Producto productos;


    public Producto getProductos() {
        return productos;
    }

    public void setProductos(Producto productos) {
        this.productos = productos;
    }

    // CONSTRUCTORES

    public Reserva() {
    }
    public Reserva(Integer id,LocalDate fechaReserva, Producto productos) {
        this.id = id;
        this.fechaReserva = fechaReserva;
        this.productos = productos;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public LocalDate getFechaReserva() {
        return fechaReserva;
    }

    public void setFechaReserva(LocalDate fechaReserva) {
        this.fechaReserva = fechaReserva;
    }
}