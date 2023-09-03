package com.example.VATP.model;


import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;


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

        @ElementCollection(fetch = FetchType.EAGER)
        @CollectionTable(
                name = "producto_images",
                joinColumns = @JoinColumn(name = "producto_id")
        )
        @Column(name = "image_url")
        private List<String> images = new ArrayList<>();

        public List<String> getImages() {
            return images;
        }

        public void setImages(List<String> images) {
            this.images = images;
        }


    public void addImage(String imageUrl) {
        images.add(imageUrl);
    }

    public void removeImage(String imageUrl) {
        images.remove(imageUrl);
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


    @ManyToMany
    @JoinTable(
            name = "producto_detalle",
            joinColumns = @JoinColumn(name = "producto_id"),
            inverseJoinColumns = @JoinColumn(name = "detalle_id")
    )
    private List<Detalle> detalles = new ArrayList<>();

    public List<Detalle> getDetalles() {
        return detalles;
    }

    public void setDetalles(List<Detalle> detalles) {
        this.detalles = detalles;
    }

    public void addDetalle(Detalle detalle) {
        detalles.add(detalle);
        detalle.getProductos().add(this);
    }

    public void removeDetalle(Detalle detalle) {
        detalles.remove(detalle);
        detalle.getProductos().remove(this);
    }

    public Producto() {
    }

    public Producto(Integer id, String nombre, double precio, String descripcion, List<String> images, Categoria categoria, Reserva reservas, List<Detalle> detalles) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.descripcion = descripcion;
        this.images = images;
        this.categoria = categoria;
        this.reservas = reservas;
        this.detalles = detalles;
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