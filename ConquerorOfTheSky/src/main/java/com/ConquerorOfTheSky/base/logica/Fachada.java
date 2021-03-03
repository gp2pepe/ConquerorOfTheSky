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
import com.ConquerorOfTheSky.base.modelo.TanqueDeCombustible;
import com.ConquerorOfTheSky.base.modelo.TorreDeControl;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.ConquerorOfTheSky.base.modelo.Configuracion;
import com.ConquerorOfTheSky.base.modelo.DepositoDeExplosivos;

import org.hibernate.Hibernate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.WebSocketSession;

@Component("fachada")
public class Fachada implements IFachada{

    private static final Logger LOGGER = LoggerFactory.getLogger(Fachada.class);

    @Autowired
    private PartidaRepo partidaR;
    
    @Autowired
    private ConfiguracionRepo configuracionR;

    private List<Partida> partidas;

    public Fachada(){
      partidas = new LinkedList<>();
    }

    @Transactional
    public String crearPartida(String nick, String modalidad, String nombre, WebSocketSession sesionUsu, boolean publica, String passwd, String bando){

        Configuracion conf = (Configuracion) Hibernate.unproxy(configuracionR.getOne(1));
        
        int posicionCampoX = 0 , posicionCampoY = 0 ,posicionCampo2X = 0 , posicionCampo2Y = 0 ;
        //Randomizo las posiciones de los campos dependiendo del bando
        if(bando.equals("Potencias")){
          posicionCampoX = (int) (Math.random() * ((150) + 1)) ;
          posicionCampoY = (int) (Math.random() * ((600) + 1)) ;
          posicionCampo2X = (int) (Math.random() * (((conf.getMapaTamanioX()-conf.getCampoTamanioX()) - (conf.getMapaTamanioX()-conf.getCampoTamanioX()-150)) + 1)) + (conf.getMapaTamanioX()-conf.getCampoTamanioX()-150);
          posicionCampo2Y = (int) (Math.random() * ((600) + 1)) ;
        }else{
          posicionCampoX = (int) (Math.random() * (((conf.getMapaTamanioX()-conf.getCampoTamanioX()) - (conf.getMapaTamanioX()-conf.getCampoTamanioX()-150)) + 1)) + (conf.getMapaTamanioX()-conf.getCampoTamanioX()-150);
          posicionCampoY = (int) (Math.random() * ((600) + 1)) ;
          posicionCampo2X = (int) (Math.random() * ((150) + 1)) ;
          posicionCampo2Y = (int) (Math.random() * ((600) + 1)) ;
        }

        //Equipo 1
        List<Avion> aviones = new LinkedList<>();
        aviones.add(new Avion( "Avion", conf.getAvionSalud(),conf.getAvionDanio(),conf.getAvionVelocidad(), conf.getAvionCombustible(), "Baja", 0, 0));
        aviones.add(new Avion( "Avion1", conf.getAvionSalud(),conf.getAvionDanio(),conf.getAvionVelocidad(), conf.getAvionCombustible(), "Baja", 0, 0));
        aviones.add(new Avion( "Avion2", conf.getAvionSalud(),conf.getAvionDanio(),conf.getAvionVelocidad(), conf.getAvionCombustible(), "Baja", 0, 0));
        aviones.add(new Avion( "Avion3", conf.getAvionSalud(),conf.getAvionDanio(),conf.getAvionVelocidad(), conf.getAvionCombustible(), "Baja", 0, 0));

        List<Jugador> jugadores = new LinkedList<>();
        jugadores.add(new Jugador(nick, sesionUsu, true, aviones));
        
        DepositoDeExplosivos depositoExp = new DepositoDeExplosivos(conf.getDepositoExplosivosSalud());
        TorreDeControl torre = new TorreDeControl( conf.getTorreSalud(), conf.getTorreRadioDisparo(), conf.getTorreDanio());
        TanqueDeCombustible tanque = new TanqueDeCombustible(conf.getTanqueCombustibleSalud());


        //Randomizo la posición de la base 1
        int baseX = (int) (Math.random() * (((posicionCampoX + conf.getCampoTamanioX() - conf.getBaseTamanioX() ) - posicionCampoX) + 1)) + posicionCampoX;
        int baseY = (int) (Math.random() * (((posicionCampoY + conf.getCampoTamanioY() - conf.getBaseTamanioY() ) - posicionCampoY) + 1)) + posicionCampoY;

        List<Base> bases = new LinkedList<>();
        Base base1 = new Base(Long.valueOf(0),baseX,baseY,depositoExp,torre,tanque);
        bases.add(base1);

        //Seteo la artilleria para el campo 1
        Set<Artilleria> artillerias = new HashSet<Artilleria>();
        for(int i = 1; i< (conf.getArtilleriaCantidad()+1); i++){
          int posicionY = posicionCampoY + (conf.getCampoTamanioY()/conf.getArtilleriaCantidad()-5)*i;
          int posicionX = (int) (Math.random() * ((((posicionCampoX + conf.getCampoTamanioX())-20) - (posicionCampoX+20)) + 1)) + posicionCampoX+20;
          //Si coincide la posicionY con la posicion de la base
          if(posicionY>=baseY && posicionY<=(baseY+conf.getBaseTamanioY())){
            //Si coincide la posicionX con la posicion de la base
            if(posicionX>=baseX && posicionX<=(baseX+conf.getBaseTamanioX())){
              int random = (int) (Math.random() * (((2 - 1 )) + 1)) + 1;
              if(random==2)
                posicionX = (int) (Math.random() * (((baseX-20) - (posicionCampoX+20)) + 1)) + posicionCampoX+20;
              else
                posicionX = (int) (Math.random() * ((((baseX+conf.getBaseTamanioX())-20) - (baseX+conf.getBaseTamanioX())+20) + 1)) + (baseX+conf.getBaseTamanioX()+20);
            }
          }
          artillerias.add(new Artilleria( Long.valueOf(i), posicionX, posicionY, conf.getArtilleriaSalud(),conf.getArtilleriaRadioDisparo(), conf.getArtilleriaDanio() ));
        }

        Campo campo1 = new Campo(Long.valueOf(0), posicionCampoX, posicionCampoY, artillerias, base1);
        Equipo equipo1 = new Equipo(bando, jugadores,campo1);
        //Fin equipo1


        //Equipo 2
        DepositoDeExplosivos depositoExp2 = new DepositoDeExplosivos(conf.getDepositoExplosivosSalud());
        TorreDeControl torre2 = new TorreDeControl( conf.getTorreSalud(), conf.getTorreRadioDisparo(), conf.getTorreDanio());
        TanqueDeCombustible tanque2 = new TanqueDeCombustible(conf.getTanqueCombustibleSalud());       

        //Randomizo la posición de la base 2
        int base2X = (int) (Math.random() * (((posicionCampo2X + conf.getCampoTamanioX() - conf.getBaseTamanioX() ) - posicionCampo2X) + 1)) + posicionCampo2X;
        int base2Y = (int) (Math.random() * (((posicionCampo2Y + conf.getCampoTamanioY() - conf.getBaseTamanioY() ) - posicionCampo2Y) + 1)) + posicionCampo2Y;

        Base base2 = new Base(Long.valueOf(1),base2X,base2Y,depositoExp2,torre2,tanque2);

        //Seteo la artilleria para el campo 2
        Set<Artilleria> artillerias2 = new HashSet<Artilleria>();
        for(int i = 1; i< (conf.getArtilleriaCantidad()+1); i++){
          int posicionY = posicionCampo2Y + (conf.getCampoTamanioY()/conf.getArtilleriaCantidad()-5)*i;
          int posicionX = (int) (Math.random() * ((((posicionCampo2X + conf.getCampoTamanioX())-20) - (posicionCampo2X+20)) + 1)) + posicionCampo2X+20;
          //Si coincide la posicionY con la posicion de la base
          if(posicionY>=base2Y && posicionY<=(base2Y+conf.getBaseTamanioY())){
            //Si coincide la posicionX con la posicion de la base
            if(posicionX>=base2X && posicionX<=(base2X+conf.getBaseTamanioX())){
              int random = (int) (Math.random() * (((2 - 1 )) + 1)) + 1;
              if(random==2)
                posicionX = (int) (Math.random() * (((base2X-20) - (posicionCampo2X+20)) + 1)) + posicionCampo2X+20;
              else
                posicionX = (int) (Math.random() * ((((base2X+conf.getBaseTamanioX())-20) - (base2X+conf.getBaseTamanioX())+20) + 1)) + (base2X+conf.getBaseTamanioX()+20);
            }
          }
          artillerias2.add(new Artilleria( Long.valueOf(i), posicionX, posicionY, conf.getArtilleriaSalud(),conf.getArtilleriaRadioDisparo(), conf.getArtilleriaDanio() ));
        }

        Campo campo2 = new Campo(Long.valueOf(0), posicionCampo2X, posicionCampo2Y, artillerias2, base2);
        String bando2 = "Potencias";
        if(bando.equals("Potencias"))
          bando2 = "Aliados";
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

        //this.guardarPartida(idpartida);

        //Genero el JSon
        Gson gson = new GsonBuilder().excludeFieldsWithoutExposeAnnotation().create();
        JsonElement jsonElementConf = gson.toJsonTree(conf);
        JsonElement jsonElementPartida = gson.toJsonTree(partidaNueva);
        JsonElement jsonElementCampo = gson.toJsonTree(campo1);
        JsonElement jsonElementCampo2 = gson.toJsonTree(campo2);


        JsonObject innerObject = new JsonObject();
        innerObject.addProperty("operacion", "iniciarPartida");
        innerObject.add("configuraciones", jsonElementConf);
        innerObject.add("partida", jsonElementPartida);
        innerObject.addProperty("bando", bando);
        innerObject.add("campo"+bando, jsonElementCampo);
        innerObject.add("campo"+bando2, jsonElementCampo2);

        return gson.toJson(innerObject);

    }

    @Transactional
    public String ingresarAPartida(Long idPartida, String nick, WebSocketSession sesionUsu, String passwd){
       
      Configuracion conf = (Configuracion) Hibernate.unproxy(configuracionR.getOne(1));

      //Equipo 2
      List<Avion> aviones = new LinkedList<>();
      aviones.add(new Avion( "Avion4", conf.getAvionSalud(),conf.getAvionDanio(),conf.getAvionVelocidad(), conf.getAvionCombustible(), "Baja", 0, 0));
      aviones.add(new Avion( "Avion5", conf.getAvionSalud(),conf.getAvionDanio(),conf.getAvionVelocidad(), conf.getAvionCombustible(), "Baja", 0, 0));
      aviones.add(new Avion( "Avion6", conf.getAvionSalud(),conf.getAvionDanio(),conf.getAvionVelocidad(), conf.getAvionCombustible(), "Baja", 0, 0));
      aviones.add(new Avion( "Avion7", conf.getAvionSalud(),conf.getAvionDanio(),conf.getAvionVelocidad(), conf.getAvionCombustible(), "Baja", 0, 0));

      List<Jugador> jugadores = new LinkedList<>();
      jugadores.add(new Jugador(nick, sesionUsu, false, aviones));
      Partida partida = null;
      Campo campo  = null;
      Campo campoContrario = null;
      String bando = "";
      String bandoContrario = "";

      for(Partida par: this.partidas ){
        if(par.getIdpartida()==idPartida){
            List<Equipo> equipos = par.getEquipos();
            equipos.get(1).setJugadores(jugadores);
            par.setEquipos(equipos);
            partida = par;
            campo =  equipos.get(1).getCampo();
            bando = equipos.get(1).getBando();
            campoContrario =  equipos.get(0).getCampo();
            bandoContrario =  equipos.get(0).getBando();
        }
      }
      //Genero el JSon
      Gson gson = new GsonBuilder().excludeFieldsWithoutExposeAnnotation().create();
      JsonElement jsonElementConf = gson.toJsonTree(conf);
      JsonElement jsonElementPartida = gson.toJsonTree(partida);
      JsonElement jsonElementCampo = gson.toJsonTree(campo);
      JsonElement jsonElementCampoContrario = gson.toJsonTree(campoContrario);

      JsonObject innerObject = new JsonObject();
      innerObject.addProperty("operacion", "ingresarAPartida");
      innerObject.add("configuraciones", jsonElementConf);
      innerObject.add("partida", jsonElementPartida);
      innerObject.addProperty("bando", bando);
      innerObject.add("campo"+bando, jsonElementCampo);
      innerObject.add("campo"+bandoContrario, jsonElementCampoContrario);

      return gson.toJson(innerObject);
    }

    public String listarPartidas(){

      Gson gson = new GsonBuilder().excludeFieldsWithoutExposeAnnotation().create();
      JsonObject innerObject = new JsonObject();
      JsonArray innerObjectLista = new JsonArray();
      for(Partida par : this.partidas){
        JsonObject innerObjectPartida = new JsonObject();
        innerObjectPartida.addProperty("idPartida", par.getIdpartida());
        innerObjectPartida.addProperty("publica", par.isPublica());
        innerObjectPartida.addProperty("modalidad", par.getModalidad());
        innerObjectPartida.addProperty("nombre", par.getNombre());
        List<Equipo> equipos = par.getEquipos();
        int jugConectados = 0;
        for(Equipo eq : equipos)
          jugConectados += eq.getJugadores().size();

        innerObjectPartida.addProperty("jugConectados", jugConectados);
        innerObjectLista.add(innerObjectPartida);
      }

      innerObject.add("partidas", innerObjectLista);
      innerObject.addProperty("operacion", "listarPartidas");
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
      try{
        partidas.add(partidaR.getOne(idPartida));
      }catch (Exception e){

      }
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
