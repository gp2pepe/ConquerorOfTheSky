package com.ConquerorOfTheSky.base.logica;

import java.util.HashSet;
import java.util.LinkedList;
import java.util.List;
import java.util.Set;
import java.util.function.ToLongBiFunction;

import javax.websocket.Session;

import com.ConquerorOfTheSky.base.dao.AvionRepo;
import com.ConquerorOfTheSky.base.dao.PartidaRepo;
import com.ConquerorOfTheSky.base.modelo.Artilleria;
import com.ConquerorOfTheSky.base.modelo.Avion;
import com.ConquerorOfTheSky.base.modelo.Base;
import com.ConquerorOfTheSky.base.modelo.Campo;
import com.ConquerorOfTheSky.base.modelo.Equipo;
import com.ConquerorOfTheSky.base.modelo.Jugador;
import com.ConquerorOfTheSky.base.modelo.Mapa;
import com.ConquerorOfTheSky.base.modelo.Partida;
import com.ConquerorOfTheSky.base.modelo.Configuracion;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.socket.WebSocketSession;

public class Fachada implements IFachada{

    private static final Logger LOGGER = LoggerFactory.getLogger(Fachada.class);

    private static Fachada instancia;

    @Autowired
    private PartidaRepo partidaR;

    @Autowired
    private AvionRepo avionR;

    private List<Partida> partidas;
    
    public static Fachada getInstancia() throws InstantiationException, IllegalAccessException, ClassNotFoundException
    {
      if(instancia == null)
        instancia = new Fachada();
      return instancia;
    }

    public Fachada(){
      partidas = new LinkedList<>();
    }

    public Long crearPartida(String nick, WebSocketSession sesionUsu, boolean publica, String passwd, String bando){

        Configuracion conf = new Configuracion(   
          1, 200, 50, 200, 200,100, //Avion
          1920, 1080,               //Mapa
          200, 1080, 0,             //Campo
          100, 200, 100,            //Artilleria
          50, 500,                  //Bomba
          700, 100, 200,            //Torre
          400,                      //Deposito Explosivo
          100) ;                    //Campo Combustible

        List<Avion> aviones = new LinkedList<>();
        aviones.add(new Avion( "Avion", conf.getAvionSalud(),conf.getAvionDanio(),conf.getAvionVelocidad(), conf.getAvionCombustible(), "Alta", 0, 0));

        List<Jugador> jugadores = new LinkedList<>();
        jugadores.add(new Jugador(nick, sesionUsu, aviones));
        
        Set<Artilleria> artillerias = new HashSet<Artilleria>();
        artillerias.add(new Artilleria());

        List<Base> bases = new LinkedList<>();
        Base base1 = new Base();
        bases.add(base1);

        List<Campo> campos = new LinkedList<>();
        Campo campo1 = new Campo(Long.valueOf(0), conf.getCampoTamanioX(), conf.getCampoTamanioY(), conf.getCampoPosicion(), artillerias, base1);
        campos.add(campo1);

        Equipo nuevoEquipo = new Equipo(bando, jugadores,campo1);
        nuevoEquipo.setJugadores(jugadores);
        List<Equipo> equipos = new LinkedList<>();
        equipos.add(nuevoEquipo);

        Mapa nuevoMapa = new Mapa(Long.valueOf(0),"mapa1", 800, 400, campos);

        Partida partidaNueva = new Partida(publica, passwd, equipos, nuevoMapa);

        Long idpartida ;
        if(partidas.size()>0)
          idpartida = partidas.get(partidas.size()-1).getIdpartida() + 1;
        else
          idpartida = Long.valueOf(0);
        

        LOGGER.debug("Tamaño de la lista de partidas: " + partidas.size());
        partidaNueva.setIdpartida(idpartida);
        partidas.add(partidaNueva);

        return  partidaNueva.getIdpartida();
    }
    public String listarPartidas(Long idPartida){
      return "";
    }

    public void ingresarAPartida(Long idPartida, String nick, WebSocketSession sesionUsu, boolean publica, String passwd, String bando){
       
      Configuracion conf = new Configuracion(   
        1, 200, 50, 200, 200,100, //Avion
        1920, 1080,               //Mapa
        200, 1080, 0,             //Campo
        100, 200, 100,            //Artilleria
        50, 500,                  //Bomba
        700, 100, 200,            //Torre
        400,                      //Deposito Explosivo
        100) ;                    //Campo Combustible

      List<Avion> aviones = new LinkedList<>();
        aviones.add(new Avion( "Avion", 200,12,200, 400, "Alta", 0, 0));

        List<Jugador> jugadores = new LinkedList<>();
        jugadores.add(new Jugador(nick, sesionUsu, aviones));

        Set<Artilleria> artillerias = new HashSet<Artilleria>();
        artillerias.add(new Artilleria());
        
        Base base2 = new Base();

        Campo campo2 = new Campo(Long.valueOf(0), conf.getCampoTamanioX(), conf.getCampoTamanioY(), conf.getCampoPosicion(), artillerias, base2);

        Equipo equipo2 = new Equipo(bando, jugadores, campo2);
        equipo2.setJugadores(jugadores);

        for(Partida par: this.partidas ){
            if(par.getIdpartida()==idPartida){
                List<Equipo> equipos = par.getEquipos();
                equipos.add(equipo2);
                par.setEquipos(equipos);
            }
        }
        
    }


    public List<WebSocketSession> sincronizarPartida(Long idpartida){
      List<WebSocketSession> sessions = new LinkedList<>();
      for(Partida par: this.partidas ){
        if(par.getIdpartida()==idpartida){
          for(Equipo eq : par.getEquipos()){
            for(Jugador ju : eq.getJugadores()){
                sessions.add(ju.getSesionActual());
            }
          }
        }
      }
      return sessions;

    }


    public void guardarPArtida(){


    }

    public void recuperarPartida(){


    }

    public void terminarPartida(){


    }

}
