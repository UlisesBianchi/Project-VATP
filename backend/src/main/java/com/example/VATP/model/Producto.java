package com.example.VATP.model;


import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

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

    @Column
    private String descripcionCorta;



    // constructores
    public Producto() {
    }

    public Producto(Integer id, String nombre, double precio, String descripcion, String descripcionCorta, Categoria categoria, List<Reserva> reservas, List<String> images, List<CaracteristicasProducto> caracteristicasProductos) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.descripcion = descripcion;
        this.descripcionCorta = descripcionCorta;
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


    public String getDescripcionCorta() {
        return descripcionCorta;
    }

    public void setDescripcionCorta(String descripcionCorta) {
        this.descripcionCorta = descripcionCorta;
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


    // relacion con disponibilidad

    @OneToMany(mappedBy = "producto", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ProductoDisponibilidad> disponibilidades;








    // relacion con reservas


    @OneToMany(mappedBy = "productos", cascade = CascadeType.ALL, orphanRemoval = true)
    // @JsonIgnore
    @JsonManagedReference
    private List<Reserva> reservas ;

    public List<Reserva> getReservas() {
        return reservas;
    }
    public void setReservas(List<Reserva> reservas) {
        this.reservas = reservas;
    }

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

    @JsonManagedReference
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

