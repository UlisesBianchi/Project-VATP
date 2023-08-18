package com.example.VATP.model;


import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.LinkedList;


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
    @Column
    private String imagenUrl;


    public String getImagenUrl() {
        return imagenUrl;
    }

    public void setImagenUrl(String imagenUrl) {
        this.imagenUrl = imagenUrl;
    }

    @ManyToOne
    @JoinColumn(name = "categoria_id")
    private Categoria categoria;

    @ManyToOne
    @JoinColumn(name = "reservas_id")
    private Reserva reservas;

    public Categoria getCategoria() {
        return categoria;
    }

    public void setCategoria(Categoria categoria) {
        this.categoria = categoria;
    }
    public Producto() {
    }


    public Producto(Integer id, String nombre, double precio, String descripcion, String imagenUrl, Categoria categoria, Reserva reservas) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.descripcion = descripcion;
        this.imagenUrl = imagenUrl;
        this.categoria = categoria;
        this.reservas = reservas;
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
    }}