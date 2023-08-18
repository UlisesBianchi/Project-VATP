package com.example.VATP.model;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "categorias")
public class Categoria {
    @Id
    @SequenceGenerator(name = "categoria_sequence",sequenceName = "categoria_sequence",allocationSize =1 )
    @GeneratedValue(strategy = GenerationType.SEQUENCE,generator = "categoria_sequence")
    private Integer id;

    private String nombre;


    private String imagenUrl;

    @OneToMany(mappedBy = "categoria")
    private List<Producto> productos;

    public Categoria() {

    }

    public Categoria(String nombre, String imagenUrl, List<Producto> productos) {
        this.nombre = nombre;
        this.imagenUrl = imagenUrl;
        this.productos = productos;
    }

    public String getImagenUrl() {
        return imagenUrl;
    }

    public void setImagenUrl(String imagenUrl) {
        this.imagenUrl = imagenUrl;
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
}