package com.example.VATP.dto;

import com.example.VATP.model.Categoria;

import java.time.LocalDate;
import java.util.List;

public class ProductoRequestDTO {

    private Integer id; // This field represents the product ID

    private String nombre;
    private double precio;
    private String descripcion;
    private List<String> images;

    private int stockDiario;
    private Categoria categoria; // Change to Categoria object

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

    public int getStockDiario() {
        return stockDiario;
    }

    public void setStockDiario(int stockDiario) {
        this.stockDiario = stockDiario;
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

    public List<String> getImages() {
        return images;
    }

    public void setImages(List<String> images) {
        this.images = images;
    }
}

