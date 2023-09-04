package com.example.VATP.model;


import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

//    colocar jsonignore en donde vaya y entenderlo
  // ver lo de filtro y lo de la reserva

@Entity
@Table(name = "productos")
public class Producto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column
    private String nombre;
    @Column
    private double precio;
    @Column
    private String descripcion;

    // constructores
    public Producto() {
    }

    public Producto(Integer id, String nombre, double precio, String descripcion, Categoria categoria, List<Reserva> reservas, List<ProductImage> images, List<CaracteristicasProducto> caracteristicasProductos) {
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
    }


    // relacion con categoria

    @ManyToOne
    @JoinColumn(name = "categoria_id")
     // SIN JSONIGNORE
    private Categoria categoria;

    public Categoria getCategoria() {
        return categoria;
    }

    public void setCategoria(Categoria categoria) {
        this.categoria = categoria;
    }

 public int  getCategoriaId(Categoria categoria){
        return categoria.getId();
 }

    // relacion con reservas




    @OneToMany(mappedBy = "productos")

    private List<Reserva> reservas ;

    public List<Reserva> getReservas() {
        return reservas;
    }
    public void setReservas(List<Reserva> reservas) {
        this.reservas = reservas;
    }

// METODO PARA CONTAR LAS RESERVAS




//relacion con imagenes

    @OneToMany(mappedBy = "producto", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ProductImage> images = new ArrayList<>();


    public void addImage(ProductImage image) {
        images.add(image);
        image.setProducto(this);
    }
    public void removeImage(ProductImage image) {
        images.remove(image);
        image.setProducto(null);
    }
    public List<ProductImage> getImages() {
        return images;
    }
    public void setImages(List<ProductImage> images) {
        this.images = images;
    }


    // relacion con caracteristicas

    @OneToMany(mappedBy = "producto", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<CaracteristicasProducto> caracteristicasProductos = new ArrayList<>();


    public void addCaracteristica(CaracteristicasProducto caracteristicaProductos) {
        caracteristicasProductos.add(caracteristicaProductos);
        caracteristicaProductos.setProducto(this);
    }
    public void removeCaracteristica(CaracteristicasProducto caracteristicaProductos) {
        caracteristicasProductos.remove(caracteristicaProductos);
        caracteristicaProductos.setProducto(null);
    }

    public List<CaracteristicasProducto> getCaracteristicasProductos() {
        return caracteristicasProductos;
    }

    public void setCaracteristicasProductos(List<CaracteristicasProducto> caracteristicasProductos) {
        this.caracteristicasProductos = caracteristicasProductos;
    }




}