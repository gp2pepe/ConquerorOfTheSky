package com.ConquerorOfTheSky.base.logica;

import java.util.LinkedList;
import java.util.List;
import java.util.function.ToLongBiFunction;

import javax.websocket.Session;

import com.ConquerorOfTheSky.base.dao.AvionRepo;
import com.ConquerorOfTheSky.base.dao.PartidaRepo;
import com.ConquerorOfTheSky.base.modelo.Avion;
import com.ConquerorOfTheSky.base.modelo.Equipo;
import com.ConquerorOfTheSky.base.modelo.Jugador;
import com.ConquerorOfTheSky.base.modelo.Mapa;
import com.ConquerorOfTheSky.base.modelo.Partida;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.socket.WebSocketSession;

class Fachada implements IFachada{

    @Autowired
    private PartidaRepo partidaR;

    @Autowired
    private AvionRepo avionR;

    private List<Partida> partidas;

    public Long crearPartida(String nick, Session sesionUsu, boolean publica, String passwd, String bando){

        List<Avion> aviones = new LinkedList<>();
        aviones.add(new Avion( "Avion", 200,12,200, 400, "Alta", 0, 0));

        List<Jugador> jugadores = new LinkedList<>();
        jugadores.add(new Jugador(nick, sesionUsu, aviones));
        
        Equipo nuevoEquipo = new Equipo(bando, jugadores);
        nuevoEquipo.setJugadores(jugadores);
        List<Equipo> equipos = new LinkedList<>();
        equipos.add(nuevoEquipo);

        Mapa nuevoMapa = new Mapa("mapa1", 800, 400);

        Partida partidaNueva = new Partida(publica, passwd, equipos, nuevoMapa);

        Long idpartida ;
        if(partidas.size()>0)
          idpartida = partidas.get(partidas.size()-1).getIdpartida() + 1;
        else
          idpartida = Long.valueOf(0);
        
        partidaNueva.setIdpartida(idpartida);
        partidas.add(partidaNueva);

        return  partidaNueva.getIdpartida();
    }
    public String listarPartidas(Long idPartida){
      return "";
    }

    public void ingresarAPartida(Long idPartida){

    }


    public List<WebSocketSession> sincronizarPartida(){
      List<WebSocketSession> sessions = null;
      return sessions;

    }


    public void guardarPArtida(){


    }

    public void recuperarPartida(){


    }
}
