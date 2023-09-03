package com.example.VATP.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "detalles")
public class Detalle {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column
    private String iconUrl;

    @ManyToMany(mappedBy = "detalles")
    @JsonIgnore
    private List<Producto> productos = new ArrayList<>();

    public Detalle() {
    }

    public Detalle(Integer id, String iconUrl, List<Producto> productos) {
        this.id = id;
        this.iconUrl = iconUrl;
        this.productos = productos;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getIconUrl() {
        return iconUrl;
    }

    public void setIconUrl(String iconUrl) {
        this.iconUrl = iconUrl;
    }

    public List<Producto> getProductos() {
        return productos;
    }

    public void setProductos(List<Producto> productos) {
        this.productos = productos;
    }
}