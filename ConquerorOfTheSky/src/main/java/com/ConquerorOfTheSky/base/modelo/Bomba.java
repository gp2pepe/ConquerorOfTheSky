package com.ConquerorOfTheSky.base.modelo;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.google.gson.annotations.Expose;

@Entity
@Table(name="bomba")
public class Bomba {

    @Id
    @Column(name="id_bomba")
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long idBomba;
    @Expose
    private int radioImpacto; 
    @Expose
    private int danio;

    public Bomba() {
    }

    public Bomba( int radioImpacto, int danio) {
        this.radioImpacto = radioImpacto;
        this.danio = danio;
    }

    public Long getIdBomba() {
        return idBomba;
    }

    public void setIdBomba(Long idBomba) {
        this.idBomba = idBomba;
    }

    public int getRadioImpacto() {
        return radioImpacto;
    }

    public void setRadioImpacto(int radioImpacto) {
        this.radioImpacto = radioImpacto;
    }

    public int getDanio() {
        return danio;
    }

    public void setDanio(int danio) {
        this.danio = danio;
    }

    
    
}
