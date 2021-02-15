package com.ConquerorOfTheSky.base.modelo;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="base")
public class Base {

    @Id
    @Column(name="id_base")
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long idBase;
    private int posicionX;
    private int posicionY;

    public Base() {
    }

    public Base(Long idBase, int posicionX, int posicionY) {
        this.idBase = idBase;
        this.posicionX = posicionX;
        this.posicionY = posicionY;
    }

    public Long getIdBase() {
        return idBase;
    }

    public void setIdBase(Long idBase) {
        this.idBase = idBase;
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

    
    
}
