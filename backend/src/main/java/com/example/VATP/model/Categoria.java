package com.example.VATP.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "categorias")
public class Categoria {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String nombre;
    private String imagenUrl;



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

    public String getImagenUrl() {
        return imagenUrl;
    }

    public void setImagenUrl(String imagenUrl) {
        this.imagenUrl = imagenUrl;
    }


    // constructores


    public Categoria() {
    }

    public Categoria(Integer id, String nombre, String imagenUrl, List<Producto> productos) {
        this.id = id;
        this.nombre = nombre;
        this.imagenUrl = imagenUrl;
        this.productos = productos;
    }

    // relacion con producto
    @OneToMany(mappedBy = "categoria")
    @JsonIgnore
    private List<Producto> productos = new ArrayList<>();

    public List<Producto> getProductos() {
        return productos;
    }

    public void setProductos(List<Producto> productos) {
        this.productos = productos;
    }
}