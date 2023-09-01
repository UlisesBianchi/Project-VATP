package com.example.VATP.model;


import jakarta.persistence.*;
import lombok.Getter;

import java.util.ArrayList;
import java.util.List;

@Getter
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

    public Categoria getCategoria() {
        return categoria;
    }
    public void setCategoria(Categoria categoria) {
        this.categoria = categoria;
    }



    @ManyToOne
    @JoinColumn(name = "reservas_id")
    private Reserva reservas;

    public Reserva getReservas() {
        return reservas;
    }

    public void setReservas(Reserva reservas) {
        this.reservas = reservas;
    }



    @OneToMany(mappedBy = "producto", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ProductImage> images = new ArrayList<>();
    public List<ProductImage> getImages() {
        return images;
    }
    public void setImages(List<ProductImage> images) {
        this.images = images;
    }
    public void addImage(ProductImage image) {
        images.add(image);
        image.setProducto(this);
    }
    public void removeImage(ProductImage image) {
        images.remove(image);
        image.setProducto(null);
    }




    @OneToMany(mappedBy = "producto", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<CaracteristicasProducto> caracteristicasProductos = new ArrayList<>();
    public void setCaracteristicasProductos(List<CaracteristicasProducto> caracteristicasProductos) {
        this.caracteristicasProductos = caracteristicasProductos;
    }

    public List<CaracteristicasProducto> getCaracteristicasProductos() {
        return caracteristicasProductos;
    }

    public void addCaracteristica(CaracteristicasProducto caracteristicaProductos) {
        caracteristicasProductos.add(caracteristicaProductos);
        caracteristicaProductos.setProducto(this);
    }
    public void removeCaracteristica(CaracteristicasProducto caracteristicaProductos) {
        caracteristicasProductos.remove(caracteristicaProductos);
        caracteristicaProductos.setProducto(null);
    }



    public Producto() {
    }


    public Producto(Integer id, String nombre, double precio, String descripcion, Categoria categoria, Reserva reservas, List<ProductImage> images, List<CaracteristicasProducto> caracteristicasProductos) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.descripcion = descripcion;
        this.categoria = categoria;
        this.reservas = reservas;
        this.images = images;
        this.caracteristicasProductos = caracteristicasProductos;
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