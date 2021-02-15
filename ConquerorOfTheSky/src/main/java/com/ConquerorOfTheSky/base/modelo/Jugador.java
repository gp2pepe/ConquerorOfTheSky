package com.ConquerorOfTheSky.base.modelo;

import java.util.List;
import javax.websocket.Session;
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
import javax.persistence.Table;
import javax.persistence.Transient;


@Entity
@Table(name="jugador")
public class Jugador {

    @Id
    @Column(name="id_jugador")
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private long idJugador;
    
    private String nick;
    
    //Este campo no se guarda en la BD ya que no es necesario, la etiqueta Transient hace que no se guarde 
    @Transient
    private Session sesionActual;
    
    //Genera la relacion entre jugador y sus aviones y los guarda en la tabla aviones_jugador
    @OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinTable(name = "aviones_jugador",
                joinColumns = {@JoinColumn(name = "id_jugador")},
                inverseJoinColumns = {@JoinColumn(name = "id_avion")})
    private List<Avion> aviones;

    public Jugador() {
    }

    public Jugador(String nick, Session sesionActual, List<Avion> aviones) {
        this.nick = nick;
        this.sesionActual = sesionActual;
        this.aviones = aviones;
    }

    public long getIdJugador() {
        return idJugador;
    }

    public void setIdJugador(long idJugador) {
        this.idJugador = idJugador;
    }

    public String getNick() {
        return nick;
    }

    public void setNick(String nick) {
        this.nick = nick;
    }

    public Session getSesionActual() {
        return sesionActual;
    }

    public void setSesionActual(Session sesionActual) {
        this.sesionActual = sesionActual;
    }

    public List<Avion> getAviones() {
        return aviones;
    }

    public void setAviones(List<Avion> aviones) {
        this.aviones = aviones;
    }

    
    
    
}
