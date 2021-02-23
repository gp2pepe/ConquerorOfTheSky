package com.ConquerorOfTheSky.base.modelo;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.OneToMany;
import javax.persistence.FetchType;

import java.util.List;

import javax.persistence.CascadeType;

@Entity
@Table(name="mapa")
public class Mapa {

    @Id
    @Column(name="id_mapa")
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long idMapa;
    private String nombre;
    private int tamanioX;
    private int tamanioY;

    public Mapa() {
    }

    public Mapa(String nombre, int tamanioX, int tamanioY) {
        this.nombre = nombre;
        this.tamanioX = tamanioX;
        this.tamanioY = tamanioY;
    }
    
    public Long getIdMapa() {
        return idMapa;
    }

    public void setIdMapa(Long idMapa) {
        this.idMapa = idMapa;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public int getTamanioX() {
        return tamanioX;
    }

    public void setTamanioX(int tamanioX) {
        this.tamanioX = tamanioX;
    }

    public int getTamanioY() {
        return tamanioY;
    }

    public void setTamanioY(int tamanioY) {
        this.tamanioY = tamanioY;
    }

}
