package com.example.VATP.model;


import com.fasterxml.jackson.annotation.JsonBackReference;
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


 // RELACION CON PRODUCTO
    @ManyToOne
    @JoinColumn(name = "productos")
   // ver
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
    public Reserva(Integer id, LocalDate fecha, Producto productos) {
        this.id = id;
        this.fecha = fecha;
        this.productos = productos;
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