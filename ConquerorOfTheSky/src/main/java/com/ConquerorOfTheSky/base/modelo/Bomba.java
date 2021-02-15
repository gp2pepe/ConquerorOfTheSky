package com.ConquerorOfTheSky.base.modelo;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="bomba")
public class Bomba {

    @Id
    @Column(name="id_bomba")
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long idBomba;
    private int radioImpacto;
    private int danio;

    public Bomba() {
    }

    public Bomba(Long idBomba, int radioImpacto, int danio) {
        this.idBomba = idBomba;
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
