package com.example.VATP.model;


import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "reservas")
public class Reserva {

    @Id
    @SequenceGenerator(name = "reserva_sequence",sequenceName = "reserva_sequence",allocationSize =1 )
    @GeneratedValue(strategy = GenerationType.SEQUENCE,generator = "reserva_sequence")
    private Integer id;
    @Column
    private LocalDate fecha;



    @OneToMany(mappedBy = "reservas")
    private List<Producto> productos;


    public Reserva(Integer id, LocalDate fecha, List<Producto> productos) {
        this.id = id;
        this.fecha = fecha;
        this.productos = productos;
    }

    public Reserva() {

    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public List<Producto> getProductos() {
        return productos;
    }

    public void setProductos(List<Producto> productos) {
        this.productos = productos;
    }

    public LocalDate getFecha() {
        return fecha;
    }

    public void setFecha(LocalDate fecha) {
        this.fecha = fecha;
    }


}