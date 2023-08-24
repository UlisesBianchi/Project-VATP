package com.example.VATP.model;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "productos")
public class Producto {
    @Id
    @SequenceGenerator(name = "producto_sequence",sequenceName = "producto_sequence",allocationSize =1 )
    @GeneratedValue(strategy = GenerationType.SEQUENCE,generator = "producto_sequence")
    private Integer id;
    @Column
    private String nombre;
    @Column
    private double precio;
    @Column
    private String descripcion;


    @ManyToOne
    @JoinColumn(name = "categoria_id")
    private Categoria categoria;

    @ManyToOne
    @JoinColumn(name = "reservas_id")
    private Reserva reservas;


    @Getter
    @OneToOne(cascade = CascadeType.ALL,fetch = FetchType.EAGER)       // tener en cuenta EAGER que trae a domicilio y con lazi no si lo booeo tambien borro domicilio
    @JoinColumn(name = "id_imagenes",referencedColumnName = "id")
    // @JsonIgnore
    private Imagenes imagenes;



    public Producto(Integer id, String nombre, double precio, String descripcion, Categoria categoria, Reserva reservas) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.descripcion = descripcion;
        this.categoria = categoria;
        this.reservas = reservas;
    }

    public Producto() {
    }

    public Categoria getCategoria() {
        return categoria;
    }

    public void setCategoria(Categoria categoria) {
        this.categoria = categoria;
    }


    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public double getPrecio() {
        return precio;
    }

    public void setPrecio(double precio) {
        this.precio = precio;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public void setImagenes(Imagenes imagenes) {
        this.imagenes = imagenes;
    }
}