package com.example.VATP.model;

import jakarta.persistence.*;

import java.sql.Timestamp;

@Entity
@Table(name="verificacion_token")
public class VerificacionToken {

    @Id
    @SequenceGenerator(name = "verificacion_sequence",sequenceName = "verificacion_sequence",allocationSize =1 )
    @GeneratedValue(strategy = GenerationType.SEQUENCE,generator = "verificacion_sequence")
    private Integer id;

    private String token;

    @Column(name = "expiry_date")
    private Timestamp expiryDate;

    @OneToOne(cascade = {CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH})
    @JoinColumn(name="user_id",  referencedColumnName = "id")
    private  User user;

    public VerificacionToken() {
    }

    public VerificacionToken(String token, User user) {
        this.token = token;
        this.user = user;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public Timestamp getExpiryDate() {
        return expiryDate;
    }

    public void setExpiryDate(Timestamp expiryDate) {
        this.expiryDate = expiryDate;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
