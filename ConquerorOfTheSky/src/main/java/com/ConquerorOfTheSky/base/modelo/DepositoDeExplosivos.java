package com.ConquerorOfTheSky.base.modelo;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="depositodeexplosivos")
public class DepositoDeExplosivos {

    @Id
    @Column(name="id_deposito")
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long idDeposito;
    private int salud;

    public DepositoDeExplosivos() {
    }

    public DepositoDeExplosivos( int salud) {
        this.salud = salud;
    }

    public Long getIdDeposito() {
        return idDeposito;
    }

    public void setIdDeposito(Long idDeposito) {
        this.idDeposito = idDeposito;
    }

    public int getSalud() {
        return salud;
    }

    public void setSalud(int salud) {
        this.salud = salud;
    }

    
    
}
