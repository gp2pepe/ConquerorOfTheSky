package com.ConquerorOfTheSky.base.modelo;

import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinTable;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import com.google.gson.annotations.Expose;

@Entity
@Table(name="partida")
public class Partida {
    
    @Expose
    @Id
    @Column(name="id_partida")
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long idPartida;
    
    @Expose
    private boolean publica;

    @Expose
    private String modalidad;
    
    @Expose
    private String nombre;

    private String password;

    //Genera la relacion entre partida y sus equipos y los guarda en la tabla equipos_partida
    @OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinTable(name = "equipos_partida",
                joinColumns = {@JoinColumn(name = "id_partida")},
                inverseJoinColumns = {@JoinColumn(name = "id_equipo")})
    private List<Equipo> equipos;
    
    //Genera la relacion entre partida y su mapa mediante una foreign key en partida de nombre id_mapa
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "id_mapa", referencedColumnName = "id_mapa")
    private Mapa mapa;

    public Partida(){}

    public Partida(boolean publica, String modalidad, String nombre, String password, List<Equipo> equipos, Mapa mapa) {
        this.publica = publica;
        this.modalidad = modalidad;
        this.nombre = nombre;
        this.password = password;
        this.equipos = equipos;
        this.mapa = mapa;
    }

    public Long getIdpartida() {
        return idPartida;
    }

    public void setIdpartida(Long idpartida) {
        this.idPartida = idpartida;
    }

    public boolean isPublica() {
        return publica;
    }

    public void setPublica(boolean publica) {
        this.publica = publica;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public List<Equipo> getEquipos() {
        return equipos;
    }

    public void setEquipos(List<Equipo> equipos) {
        this.equipos = equipos;
    }

    public Mapa getMapa() {
        return mapa;
    }

    public void setMapa(Mapa mapa) {
        this.mapa = mapa;
    }

    public String getModalidad() {
        return modalidad;
    }

    public void setModalidad(String modalidad) {
        this.modalidad = modalidad;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    

    
}
