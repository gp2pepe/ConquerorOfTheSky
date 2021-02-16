package com.ConquerorOfTheSky.base.modelo;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;


@Entity
@Table(name="artilleria")
public class Artilleria {
    
    @Id
    @Column(name="id_artilleria")
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long idArtilleria;
    private int posicionX;
    private int posicionY;
    private int salud;
    private int radioDisparo;
    private int danio;

	public Artilleria() {

	}

    public Artilleria(Long idArtilleria, int posicionX, int posicionY, int salud, int radioDisparo, int danio) {
        this.idArtilleria = idArtilleria;
        this.posicionX = posicionX;
        this.posicionY = posicionY;
        this.salud = salud;
        this.radioDisparo = radioDisparo;
        this.danio = danio;
    }
    

    public Long getIdArtilleria() {
        return idArtilleria;
    }

    public void setIdArtilleria(Long idArtilleria) {
        this.idArtilleria = idArtilleria;
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

    public int getSalud() {
        return salud;
    }

    public void setSalud(int salud) {
        this.salud = salud;
    }

    public int getRadioDisparo() {
        return radioDisparo;
    }

    public void setRadioDisparo(int radioDisparo) {
        this.radioDisparo = radioDisparo;
    }

    public int getDanio() {
        return danio;
    }

    public void setDanio(int danio) {
        this.danio = danio;
    }


    
    

}
