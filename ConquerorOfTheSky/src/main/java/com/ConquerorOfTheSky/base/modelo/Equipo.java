package com.ConquerorOfTheSky.base.modelo;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table(name="equipo")
public class Equipo {
    
    @Id
    @Column(name="id_equipo")
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long idEquipo;

    private String bando;

    //Genera la relacion entre equipo y sus jugadores y los guarda en la tabla jugadores_equipo
    @OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinTable(name = "jugadores_equipo",
                joinColumns = {@JoinColumn(name = "id_equipo")},
                inverseJoinColumns = {@JoinColumn(name = "id_jugador")})
    private List<Jugador> jugadores;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "id_campo", referencedColumnName = "id_campo")
    private Campo campo;

    public Equipo() {
    }

    public Equipo(String bando, List<Jugador> jugadores, Campo campo) {
        this.bando = bando;
        this.jugadores = jugadores;
        this.campo = campo;
    }

    public Long getIdEquipo() {
        return idEquipo;
    }

    public void setIdEquipo(Long idEquipo) {
        this.idEquipo = idEquipo;
    }

    public String getBando() {
        return bando;
    }

    public void setBando(String bando) {
        this.bando = bando;
    }

    public List<Jugador> getJugadores() {
        return jugadores;
    }

    public void setJugadores(List<Jugador> jugadores) {
        this.jugadores = jugadores;
    }

    public Campo getCampo() {
        return campo;
    }

    public void setCampo(Campo campo) {
        this.campo = campo;
    }

    @Override
    public String toString() {
        return "Equipo [bando=" + bando + ", campo=" + campo + ", idEquipo=" + idEquipo + ", jugadores=" + jugadores
                + "]";
    }
    
    
}
