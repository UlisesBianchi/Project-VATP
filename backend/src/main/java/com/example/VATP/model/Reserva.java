package com.example.VATP.model;


import com.fasterxml.jackson.annotation.*;
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

    @ManyToOne
    @JoinColumn(name = "usuario_id")
    @JsonIgnoreProperties("usuario")
    private User usuario;

    // Additional field for usuarioId
    @Transient
    private Integer usuarioId;;

    public Integer getUsuarioId() {
        return usuarioId;
    }

    public void setUsuarioId(Integer usuarioId) {
        this.usuarioId = usuarioId;
    }

    // Getter and Setter for Usuario
    public User getUsuario() {
        return usuario;
    }

    public void setUsuario(User usuario) {
        this.usuario = usuario;
    }
    public Producto getProductos() {
        return productos;
    }

    public void setProductos(Producto productos) {
        this.productos = productos;
    }

    // CONSTRUCTORES

    public Reserva() {
    }
    public Reserva(Integer id, LocalDate fechaReserva, Producto productos, Integer usuarioId) {
        this.id = id;
        this.fechaReserva = fechaReserva;
        this.productos = productos;
        this.usuarioId = usuarioId;
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