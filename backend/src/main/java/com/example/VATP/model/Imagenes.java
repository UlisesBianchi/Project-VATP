package com.example.VATP.model;


import jakarta.persistence.*;

@Entity
@Table(name = "imagenes")
public class Imagenes {

    @Id
    @SequenceGenerator(name = "imagenes_sequence",sequenceName = "imagenes_sequence",allocationSize =1 )
    @GeneratedValue(strategy = GenerationType.SEQUENCE,generator = "imagenes_sequence")

    private Integer id;

    @Column
    private String imagenUrl1;
    @Column
    private String imagenUrl2;
    @Column
    private String imagenUrl3;
    @Column
    private String imagenUrl4;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getImagenUrl1() {
        return imagenUrl1;
    }

    public void setImagenUrl1(String imagenUrl1) {
        this.imagenUrl1 = imagenUrl1;
    }

    public String getImagenUrl2() {
        return imagenUrl2;
    }

    public void setImagenUrl2(String imagenUrl2) {
        this.imagenUrl2 = imagenUrl2;
    }

    public String getImagenUrl3() {
        return imagenUrl3;
    }

    public void setImagenUrl3(String imagenUrl3) {
        this.imagenUrl3 = imagenUrl3;
    }

    public String getImagenUrl4() {
        return imagenUrl4;
    }

    public void setImagenUrl4(String imagenUrl4) {
        this.imagenUrl4 = imagenUrl4;
    }
}
