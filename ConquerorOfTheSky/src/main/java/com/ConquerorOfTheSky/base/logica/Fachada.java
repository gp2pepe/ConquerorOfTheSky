package com.ConquerorOfTheSky.base.logica;

import java.util.HashSet;
import java.util.LinkedList;
import java.util.List;
import java.util.Set;

import javax.transaction.Transactional;

import com.ConquerorOfTheSky.base.dao.ConfiguracionRepo;
import com.ConquerorOfTheSky.base.dao.PartidaRepo;
import com.ConquerorOfTheSky.base.modelo.Artilleria;
import com.ConquerorOfTheSky.base.modelo.Avion;
import com.ConquerorOfTheSky.base.modelo.Base;
import com.ConquerorOfTheSky.base.modelo.Campo;
import com.ConquerorOfTheSky.base.modelo.Equipo;
import com.ConquerorOfTheSky.base.modelo.Jugador;
import com.ConquerorOfTheSky.base.modelo.Mapa;
import com.ConquerorOfTheSky.base.modelo.Partida;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.ConquerorOfTheSky.base.modelo.Configuracion;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.WebSocketSession;

@Component("fachada")
public class Fachada implements IFachada{

    private static final Logger LOGGER = LoggerFactory.getLogger(Fachada.class);

    private static Fachada instancia;

    @Autowired
    private PartidaRepo partidaR;
    
    @Autowired
    private ConfiguracionRepo configuracionR;

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

    @Transactional
    public Long crearPartida(String nick, WebSocketSession sesionUsu, boolean publica, String passwd, String bando){

        Configuracion conf = configuracionR.getOne(1);
          
        List<Avion> aviones = new LinkedList<>();
        aviones.add(new Avion( "Avion", conf.getAvionSalud(),conf.getAvionDanio(),conf.getAvionVelocidad(), conf.getAvionCombustible(), "Alta", 0, 0));

        List<Jugador> jugadores = new LinkedList<>();
        jugadores.add(new Jugador(nick, sesionUsu, true, aviones));
        
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

        this.guardarPartida(idpartida);
        return  partidaNueva.getIdpartida();
    }

    @Transactional
    public String ingresarAPartida(Long idPartida, String nick, WebSocketSession sesionUsu, String passwd){
       
      Configuracion conf = configuracionR.getOne(1);

      List<Avion> aviones = new LinkedList<>();
        aviones.add(new Avion( "Avion", 200,12,200, 400, "Alta", 0, 0));

        List<Jugador> jugadores = new LinkedList<>();
        jugadores.add(new Jugador(nick, sesionUsu, false, aviones));

        Set<Artilleria> artillerias = new HashSet<Artilleria>();
        artillerias.add(new Artilleria());
        
        Base base2 = new Base();
        String bando = "Aleman";
        Campo campo2 = new Campo(Long.valueOf(0), conf.getCampoTamanioX(), conf.getCampoTamanioY(), conf.getCampoPosicion(), artillerias, base2);
        for(Partida par: this.partidas ){
          if(par.getIdpartida()==idPartida){
              List<Equipo> equipos = par.getEquipos();
              if(equipos.get(0).getBando().equals("Aleman"))
                bando = "Frances";

              Equipo equipo2 = new Equipo(bando, jugadores, campo2);
              equipo2.setJugadores(jugadores);
              equipos.add(equipo2);
              par.setEquipos(equipos);
          }
      }
      return bando;   
    }

    public String listarPartidas(){

      Gson gson = new GsonBuilder().excludeFieldsWithoutExposeAnnotation().create();
      JsonElement jsonElement = gson.toJsonTree(partidas);
      JsonObject innerObject = new JsonObject();
      innerObject.addProperty("operacion", "listarPartidas");
      innerObject.add("partidas", jsonElement);
      return gson.toJson(innerObject);

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


    public void guardarPartida(Long idPartida){
        
      for(Partida par: this.partidas ){
        if(par.getIdpartida()==idPartida){
          partidaR.saveAndFlush(par);
        }
      }

    }

    public void recuperarPartida(){


    }

    public void terminarPartida(){


    }

    public PartidaRepo getPartidaR() {
      return partidaR;
    }

    public void setPartidaR(PartidaRepo partidaR) {
      this.partidaR = partidaR;
    }

    public List<Partida> getPartidas() {
      return partidas;
    }

    public void setPartidas(List<Partida> partidas) {
      this.partidas = partidas;
    }

    

}
