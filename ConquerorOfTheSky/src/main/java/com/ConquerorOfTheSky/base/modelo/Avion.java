package com.ConquerorOfTheSky.base.modelo;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.google.gson.annotations.Expose;

@Entity
@Table(name="avion")
public class Avion {
    
    @Id
    @Column(name="id_avion")
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private long idAvion;
    
    @Expose
    private String nombre;
    @Expose
    private int salud;
    @Expose
    private int danio;
    @Expose
    private int velocidad;
    @Expose
    private int combustible;
    @Expose
    private String altitud;
    @Expose
    private int posicionX;
    @Expose
    private int posicionY;

    @Expose
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "id_bomba", referencedColumnName = "id_bomba")
    private Bomba bomba;
    
    public Avion(){}
    
    public Avion(String nombre, int salud, int danio, int velocidad, int combustible, String altitud, int posicionX,
            int posicionY) {
        this.nombre = nombre;
        this.salud = salud;
        this.danio = danio;
        this.velocidad = velocidad;
        this.combustible = combustible;
        this.altitud = altitud;
        this.posicionX = posicionX;
        this.posicionY = posicionY;
    }

    public long getIdAvion() {
        return idAvion;
    }

    public void setIdAvion(long idAvion) {
        this.idAvion = idAvion;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public int getSalud() {
        return salud;
    }

    public void setSalud(int salud) {
        this.salud = salud;
    }

    public int getDanio() {
        return danio;
    }

    public void setDanio(int danio) {
        this.danio = danio;
    }

    public int getVelocidad() {
        return velocidad;
    }

    public void setVelocidad(int velocidad) {
        this.velocidad = velocidad;
    }

    public String getAltitud() {
        return altitud;
    }

    public void setAltitud(String altitud) {
        this.altitud = altitud;
    }

    public int getPosicionX() {
        return posicionX;
    }

    public void setPosicionX(int posicionX) {
        this.posicionX = posicionX;
    }

    public int getPosicionY() {
        return posicionY;
    }

    public void setPosicionY(int posicionY) {
        this.posicionY = posicionY;
    }

    public int getCombustible() {
        return combustible;
    }

    public void setCombustible(int combustible) {
        this.combustible = combustible;
    }

    public Bomba getBomba() {
        return bomba;
    }

    public void setBomba(Bomba bomba) {
        this.bomba = bomba;
    }

    
}
