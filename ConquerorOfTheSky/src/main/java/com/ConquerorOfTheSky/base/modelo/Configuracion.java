package com.ConquerorOfTheSky.base.modelo;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="configuracion")
public class Configuracion {
    
    @Id
    @Column(name="id_configuracion")
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private int idConfiguracion;

    //Configuraciones Avion
    private int avionSalud;
    private int avionDanio;
    private int avionVelocidad;
    private int avionCombustible;
    private int avionRadioVision;

    //Configuraciones Mapa
    private int mapaTamanioX;
    private int mapaTamanioY;

    //Configuraciones Campo
    private int campoTamanioX;
    private int campoTamanioY;
    private int campoPosicion;

    //configuraciones Artilleria
    private int artilleriaSalud;
    private int artilleriaRadioDisparo;
    private int artilleriaDanio;

    //Configuraciones Bomba
    private int bombaRadioImpacto;
    private int bombaDanio;

    //Configuraciones Torre de control
    private int torreSalud;
    private int torreRadioDisparo;
    private int torreDanio;

    //Configuracion Deposito de Explosivos
    private int depositoExplosivosSalud;

    //Configuraciones Tanque de Combustible
    private int tanqueCombustibleSalud;

    public Configuracion() {
    }

    public Configuracion(int idConfiguracion, int avionSalud, int avionDanio, int avionVelocidad, int avionCombustible,
    int avionRadioVision, int mapaTamanioX, int mapaTamanioY, int campoTamanioX, int campoTamanioY,
    int campoPosicion, int artilleriaSalud, int artilleriaRadioDisparo, int artilleriaDanio,
    int bombaRadioImpacto, int bombaDanio, int torreSalud, int torreRadioDisparo, int torreDanio,
    int depositoExplosivosSalud, int tanqueCombustibleSalud) {
        this.idConfiguracion = idConfiguracion;
        this.avionSalud = avionSalud;
        this.avionDanio = avionDanio;
        this.avionVelocidad = avionVelocidad;
        this.avionCombustible = avionCombustible;
        this.avionRadioVision = avionRadioVision;
        this.mapaTamanioX = mapaTamanioX;
        this.mapaTamanioY = mapaTamanioY;
        this.campoTamanioX = campoTamanioX;
        this.campoTamanioY = campoTamanioY;
        this.campoPosicion = campoPosicion;
        this.artilleriaSalud = artilleriaSalud;
        this.artilleriaRadioDisparo = artilleriaRadioDisparo;
        this.artilleriaDanio = artilleriaDanio;
        this.bombaRadioImpacto = bombaRadioImpacto;
        this.bombaDanio = bombaDanio;
        this.torreSalud = torreSalud;
        this.torreRadioDisparo = torreRadioDisparo;
        this.torreDanio = torreDanio;
        this.depositoExplosivosSalud = depositoExplosivosSalud;
        this.tanqueCombustibleSalud = tanqueCombustibleSalud;
    }   

    public int getIdConfiguracion() {
        return idConfiguracion;
    }

    public void setIdConfiguracion(int idConfiguracion) {
        this.idConfiguracion = idConfiguracion;
    }

    public int getAvionSalud() {
        return avionSalud;
    }

    public void setAvionSalud(int avionSalud) {
        this.avionSalud = avionSalud;
    }

    public int getAvionDanio() {
        return avionDanio;
    }

    public void setAvionDanio(int avionDanio) {
        this.avionDanio = avionDanio;
    }

    public int getAvionVelocidad() {
        return avionVelocidad;
    }

    public void setAvionVelocidad(int avionVelocidad) {
        this.avionVelocidad = avionVelocidad;
    }

    public int getAvionCombustible() {
        return avionCombustible;
    }

    public void setAvionCombustible(int avionCombustible) {
        this.avionCombustible = avionCombustible;
    }

    public int getAvionRadioVision() {
        return avionRadioVision;
    }

    public void setAvionRadioVision(int avionRadioVision) {
        this.avionRadioVision = avionRadioVision;
    }

    public int getMapaTamanioX() {
        return mapaTamanioX;
    }

    public void setMapaTamanioX(int mapaTamanioX) {
        this.mapaTamanioX = mapaTamanioX;
    }

    public int getMapaTamanioY() {
        return mapaTamanioY;
    }

    public void setMapaTamanioY(int mapaTamanioY) {
        this.mapaTamanioY = mapaTamanioY;
    }

    public int getCampoTamanioX() {
        return campoTamanioX;
    }

    public void setCampoTamanioX(int campoTamanioX) {
        this.campoTamanioX = campoTamanioX;
    }

    public int getCampoTamanioY() {
        return campoTamanioY;
    }

    public void setCampoTamanioY(int campoTamanioY) {
        this.campoTamanioY = campoTamanioY;
    }

    public int getCampoPosicion() {
        return campoPosicion;
    }

    public void setCampoPosicion(int campoPosicion) {
        this.campoPosicion = campoPosicion;
    }

    public int getArtilleriaSalud() {
        return artilleriaSalud;
    }

    public void setArtilleriaSalud(int artilleriaSalud) {
        this.artilleriaSalud = artilleriaSalud;
    }

    public int getArtilleriaRadioDisparo() {
        return artilleriaRadioDisparo;
    }

    public void setArtilleriaRadioDisparo(int artilleriaRadioDisparo) {
        this.artilleriaRadioDisparo = artilleriaRadioDisparo;
    }

    public int getArtilleriaDanio() {
        return artilleriaDanio;
    }

    public void setArtilleriaDanio(int artilleriaDanio) {
        this.artilleriaDanio = artilleriaDanio;
    }

    public int getBombaRadioImpacto() {
        return bombaRadioImpacto;
    }

    public void setBombaRadioImpacto(int bombaRadioImpacto) {
        this.bombaRadioImpacto = bombaRadioImpacto;
    }

    public int getBombaDanio() {
        return bombaDanio;
    }

    public void setBombaDanio(int bombaDanio) {
        this.bombaDanio = bombaDanio;
    }

    public int getTorreSalud() {
        return torreSalud;
    }

    public void setTorreSalud(int torreSalud) {
        this.torreSalud = torreSalud;
    }

    public int getTorreRadioDisparo() {
        return torreRadioDisparo;
    }

    public void setTorreRadioDisparo(int torreRadioDisparo) {
        this.torreRadioDisparo = torreRadioDisparo;
    }

    public int getTorreDanio() {
        return torreDanio;
    }

    public void setTorreDanio(int torreDanio) {
        this.torreDanio = torreDanio;
    }

    public int getDepositoExplosivosSalud() {
        return depositoExplosivosSalud;
    }

    public void setDepositoExplosivosSalud(int depositoExplosivosSalud) {
        this.depositoExplosivosSalud = depositoExplosivosSalud;
    }

    public int getTanqueCombustibleSalud() {
        return tanqueCombustibleSalud;
    }

    public void setTanqueCombustibleSalud(int tanqueCombustibleSalud) {
        this.tanqueCombustibleSalud = tanqueCombustibleSalud;
    }


}