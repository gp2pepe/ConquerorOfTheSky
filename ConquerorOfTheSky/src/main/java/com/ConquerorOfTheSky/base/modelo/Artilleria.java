package com.ConquerorOfTheSky.base.modelo;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.google.gson.annotations.Expose;


@Entity
@Table(name="artilleria")
public class Artilleria {
    
    @Expose
    @Id
    @Column(name="id_artilleria")
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long idArtilleria;

    @Expose
    private int posicionX;
    
    @Expose
    private int posicionY;
    
    @Expose
    private int salud;
    
    @Expose    
    private int radioDisparo;

    @Expose
    private int danio;

	public Artilleria() {

	}

    public Artilleria( int posicionX, int posicionY, int salud, int radioDisparo, int danio) {
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

    @Override
    public String toString() {
        return "Artilleria [idArtilleria=" + idArtilleria + ", danio=" + danio + ", posicionX=" + posicionX
                + ", posicionY=" + posicionY + ", radioDisparo=" + radioDisparo + ", salud=" + salud + "]";
    }


    
    

}
