package com.ConquerorOfTheSky.base.modelo;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.google.gson.annotations.Expose;

@Entity
@Table(name="torredecontrol")
public class TorreDeControl {

	@Id
    @Column(name="id_torre")
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long idTorre;
	@Expose
    private int salud;
	@Expose
    private int radioDisparo;
	@Expose
    private int danio;

    public TorreDeControl() {
	}

	public TorreDeControl(int salud, int radioDisparo, int danio) {
		this.salud = salud;
		this.radioDisparo = radioDisparo;
		this.danio = danio;
	}

	public Long getIdTorre() {
		return idTorre;
	}

	public void setIdTorre(Long idTorre) {
		this.idTorre = idTorre;
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
