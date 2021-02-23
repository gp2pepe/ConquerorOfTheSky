package com.ConquerorOfTheSky.base.logica;

import java.util.HashSet;
import java.util.LinkedList;
import java.util.List;
import java.util.Random;
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
import com.ConquerorOfTheSky.base.modelo.TanqueDeCombustible;
import com.ConquerorOfTheSky.base.modelo.TorreDeControl;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.ConquerorOfTheSky.base.modelo.Configuracion;
import com.ConquerorOfTheSky.base.modelo.DepositoDeExplosivos;

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
    public Long crearPartida(String nick, String modalidad, String nombre, WebSocketSession sesionUsu, boolean publica, String passwd, String bando){

        Configuracion conf = configuracionR.getOne(1);
        
        //Equipo 1
        List<Avion> aviones = new LinkedList<>();
        aviones.add(new Avion( "Avion", conf.getAvionSalud(),conf.getAvionDanio(),conf.getAvionVelocidad(), conf.getAvionCombustible(), "Alta", 0, 0));
        aviones.add(new Avion( "Avion1", conf.getAvionSalud(),conf.getAvionDanio(),conf.getAvionVelocidad(), conf.getAvionCombustible(), "Alta", 0, 0));
        aviones.add(new Avion( "Avion2", conf.getAvionSalud(),conf.getAvionDanio(),conf.getAvionVelocidad(), conf.getAvionCombustible(), "Alta", 0, 0));
        aviones.add(new Avion( "Avion3", conf.getAvionSalud(),conf.getAvionDanio(),conf.getAvionVelocidad(), conf.getAvionCombustible(), "Alta", 0, 0));

        List<Jugador> jugadores = new LinkedList<>();
        jugadores.add(new Jugador(nick, sesionUsu, true, aviones));
        
        Set<Artilleria> artillerias = new HashSet<Artilleria>();
        
        artillerias.add(new Artilleria());
        int maxBaseXY = 800;
        int minBaseX = 550;
        int minBaseY = 160;
        int baseX = (int) (Math.random() * ((maxBaseXY - minBaseX) + 1)) + minBaseX;
        int baseY = (int) (Math.random() * ((maxBaseXY - minBaseY) + 1)) + minBaseY;

        DepositoDeExplosivos depositoExp = new DepositoDeExplosivos(conf.getDepositoExplosivosSalud());
        TorreDeControl torre = new TorreDeControl( conf.getTorreSalud(), conf.getTorreRadioDisparo(), conf.getTorreDanio());
        TanqueDeCombustible tanque = new TanqueDeCombustible(conf.getTanqueCombustibleSalud());

        List<Base> bases = new LinkedList<>();
        Base base1 = new Base(baseX,baseY,depositoExp,torre,tanque);
        bases.add(base1);

        Campo campo1 = new Campo(Long.valueOf(0), conf.getCampoTamanioX(), conf.getCampoTamanioY(), conf.getCampoPosicion(), artillerias, base1);
        Equipo equipo1 = new Equipo(bando, jugadores,campo1);
        //Fin equipo1


        //Equipo 2
        Set<Artilleria> artillerias2 = new HashSet<Artilleria>();
        artillerias2.add(new Artilleria());
        
        int maxBase2X = 1750;
        int minBase2X = 1500;
        int maxBase2Y = 800;
        int minBase2Y = 160;
        int base2X = (int) (Math.random() * ((maxBase2X - minBase2X) + 1)) + minBase2X;
        int base2Y = (int) (Math.random() * ((maxBase2Y - minBase2Y) + 1)) + minBase2Y;

        DepositoDeExplosivos depositoExp2 = new DepositoDeExplosivos(conf.getDepositoExplosivosSalud());
        TorreDeControl torre2 = new TorreDeControl( conf.getTorreSalud(), conf.getTorreRadioDisparo(), conf.getTorreDanio());
        TanqueDeCombustible tanque2 = new TanqueDeCombustible(conf.getTanqueCombustibleSalud());

        Base base2 = new Base(base2X,base2Y,depositoExp2,torre2,tanque2);
        Campo campo2 = new Campo(Long.valueOf(0), conf.getCampoTamanioX(), conf.getCampoTamanioY(), conf.getCampoPosicion(), artillerias2, base2);
        String bando2 = "Aleman";
        if(bando.equals("Aleman"))
          bando2 = "Frances";
        List<Jugador> jugadores2 = new LinkedList<>();
        Equipo equipo2 = new Equipo(bando2, jugadores2,campo2);
        // Fin equipo 2

        
        List<Equipo> equipos = new LinkedList<>();
        equipos.add(equipo1);
        equipos.add(equipo2);

        Mapa nuevoMapa = new Mapa("mapa", conf.getMapaTamanioX(), conf.getMapaTamanioY());

        Partida partidaNueva = new Partida(publica, modalidad, nombre, passwd, equipos, nuevoMapa);

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

      //Equipo 2
      List<Avion> aviones = new LinkedList<>();
      aviones.add(new Avion( "Avion4", conf.getAvionSalud(),conf.getAvionDanio(),conf.getAvionVelocidad(), conf.getAvionCombustible(), "Alta", 0, 0));
      aviones.add(new Avion( "Avion5", conf.getAvionSalud(),conf.getAvionDanio(),conf.getAvionVelocidad(), conf.getAvionCombustible(), "Alta", 0, 0));
      aviones.add(new Avion( "Avion6", conf.getAvionSalud(),conf.getAvionDanio(),conf.getAvionVelocidad(), conf.getAvionCombustible(), "Alta", 0, 0));
      aviones.add(new Avion( "Avion7", conf.getAvionSalud(),conf.getAvionDanio(),conf.getAvionVelocidad(), conf.getAvionCombustible(), "Alta", 0, 0));

      List<Jugador> jugadores = new LinkedList<>();
      jugadores.add(new Jugador(nick, sesionUsu, false, aviones));
      String bando2 ="";
      for(Partida par: this.partidas ){
        if(par.getIdpartida()==idPartida){
            List<Equipo> equipos = par.getEquipos();
            equipos.get(1).setJugadores(jugadores);
            bando2 =  equipos.get(1).getBando();
            par.setEquipos(equipos);
        }
      }
      return bando2;   
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

    public void recuperarPartida(Long idPartida){


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
