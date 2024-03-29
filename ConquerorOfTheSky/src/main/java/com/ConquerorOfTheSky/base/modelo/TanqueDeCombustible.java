package com.ConquerorOfTheSky.base.modelo;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.google.gson.annotations.Expose;


@Entity
@Table(name="tanquedecombustible")
public class TanqueDeCombustible {
  
    @Id
    @Column(name="id_tanque")
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long idTanque;
    
    @Expose
    private int salud;

    public TanqueDeCombustible() {
    }

    public TanqueDeCombustible( int salud) {
        this.salud = salud;
    }

    public Long getIdTanque() {
        return idTanque;
    }

    public void setIdTanque(Long idTanque) {
        this.idTanque = idTanque;
    }

    public int getSalud() {
        return salud;
    }

    public void setSalud(int salud) {
        this.salud = salud;
    }

    

}
