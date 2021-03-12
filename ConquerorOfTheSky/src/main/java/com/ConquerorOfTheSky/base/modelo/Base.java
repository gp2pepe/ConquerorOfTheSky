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
@Table(name="base")
public class Base {

    @Id
    @Column(name="id_base")
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Expose
    private Long idBase;
    @Expose
    private int posicionX;
    @Expose
    private int posicionY;

    @Expose
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "id_deposito", referencedColumnName = "id_deposito")
    private DepositoDeExplosivos depositoExplosivos;

    @Expose
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "id_torre", referencedColumnName = "id_torre")
    private TorreDeControl torreControl;

    @Expose
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "id_tanque", referencedColumnName = "id_tanque")
    private TanqueDeCombustible tanqueCombustible;

    public Base() {
    }

    public Base( int posicionX, int posicionY, DepositoDeExplosivos depositoExplosivos,
            TorreDeControl torreControl, TanqueDeCombustible tanqueCombustible) {
        this.posicionX = posicionX;
        this.posicionY = posicionY;
        this.depositoExplosivos = depositoExplosivos;
        this.torreControl = torreControl;
        this.tanqueCombustible = tanqueCombustible;
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

    public DepositoDeExplosivos getDepositoExplosivos() {
        return depositoExplosivos;
    }

    public void setDepositoExplosivos(DepositoDeExplosivos depositoExplosivos) {
        this.depositoExplosivos = depositoExplosivos;
    }

    public TorreDeControl getTorreControl() {
        return torreControl;
    }

    public void setTorreControl(TorreDeControl torreControl) {
        this.torreControl = torreControl;
    }

    public TanqueDeCombustible getTanqueCombustible() {
        return tanqueCombustible;
    }

    public void setTanqueCombustible(TanqueDeCombustible tanqueCombustible) {
        this.tanqueCombustible = tanqueCombustible;
    }
    
    
}
