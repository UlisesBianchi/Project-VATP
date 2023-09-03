package com.example.VATP.model;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "reservas")
public class Reserva {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column
    private LocalDate fecha;



    @ManyToOne
    @JoinColumn(name = "productos")
  @JsonIgnore
    private Producto productos;


    public Producto getProductos() {
        return productos;
    }

    public void setProductos(Producto productos) {
        this.productos = productos;
    }


    public Reserva(Integer id, LocalDate fecha) {
        this.id = id;
        this.fecha = fecha;

    }

    public Reserva() {
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }


    public LocalDate getFecha() {
        return fecha;
    }

    public void setFecha(LocalDate fecha) {
        this.fecha = fecha;
    }


}