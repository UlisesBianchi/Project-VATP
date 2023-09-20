package com.example.VATP.model;

import com.example.VATP.dto.ProductoRequestDTO;
import jakarta.persistence.*;

import java.time.LocalDate;


@Entity
@Table(name = "product_availability")
public class ProductoDisponibilidad {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Producto producto;

    @Column
    private LocalDate date;

    @Column
    private Integer availableUnits;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Producto getProducto() {
        return producto;
    }
    public ProductoDisponibilidad() {

    }
    public ProductoDisponibilidad(Integer id, Producto producto, LocalDate date, Integer availableUnits) {
        this.id = id;
        this.producto = producto;
        this.date = date;
        this.availableUnits = availableUnits;
    }

    public void setProducto(Producto producto) {
        this.producto = producto;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public Integer getAvailableUnits() {
        return availableUnits;
    }

    public void setAvailableUnits(Integer availableUnits) {
        this.availableUnits = availableUnits;
    }
}