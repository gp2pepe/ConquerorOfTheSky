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
import com.ConquerorOfTheSky.base.modelo.Bomba;
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

import com.ConquerorOfTheSky.base.excepciones.ErrorAlGuardarException;
import com.ConquerorOfTheSky.base.excepciones.PartidaLlenaException;
import com.ConquerorOfTheSky.base.excepciones.PartidaNoExisteException;
import com.ConquerorOfTheSky.base.excepciones.PasswordEquivocadaException;

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

        DepositoDeExplosivos depositoExp = new DepositoDeExplosivos(conf.getDepositoExplosivosSalud());
        TorreDeControl torre = new TorreDeControl( conf.getTorreSalud(), conf.getTorreRadioDisparo(), conf.getTorreDanio());
        TanqueDeCombustible tanque = new TanqueDeCombustible(conf.getTanqueCombustibleSalud());


        //Randomizo la posición de la base 1
        int baseX = (int) (Math.random() * (((posicionCampoX + conf.getCampoTamanioX() - conf.getBaseTamanioX() ) - posicionCampoX) + 1)) + posicionCampoX;
        int baseY = (int) (Math.random() * (((posicionCampoY + conf.getCampoTamanioY() - conf.getBaseTamanioY() ) - posicionCampoY) + 1)) + posicionCampoY;

        List<Base> bases = new LinkedList<>();
        Base base1 = new Base(baseX,baseY,depositoExp,torre,tanque);
        bases.add(base1);

        int yInicialAvionCampo;
        if ((baseY - (posicionCampoY + 50)) > 200)
          yInicialAvionCampo = posicionCampoY + 50 - 120;
        else
          yInicialAvionCampo = posicionCampoY + 50 + 120;
        
        List<Avion> aviones = new LinkedList<>();
        if(modalidad.equals("1vs1")){
          aviones.add(new Avion( "Avion", conf.getAvionSalud(),conf.getAvionDanio(),conf.getAvionVelocidad(), conf.getAvionCombustible(), "Inicial", posicionCampoX+50, yInicialAvionCampo));
          aviones.add(new Avion( "Avion1", conf.getAvionSalud(),conf.getAvionDanio(),conf.getAvionVelocidad(), conf.getAvionCombustible(), "Inicial", posicionCampoX+100, yInicialAvionCampo));
          aviones.add(new Avion( "Avion2", conf.getAvionSalud(),conf.getAvionDanio(),conf.getAvionVelocidad(), conf.getAvionCombustible(), "Inicial", posicionCampoX+150, yInicialAvionCampo));
          aviones.add(new Avion( "Avion3", conf.getAvionSalud(),conf.getAvionDanio(),conf.getAvionVelocidad(), conf.getAvionCombustible(), "Inicial", posicionCampoX+200, yInicialAvionCampo));
        }
        List<Jugador> jugadores = new LinkedList<>();
        jugadores.add(new Jugador(nick, sesionUsu, true, aviones));
        

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
          Artilleria art = new Artilleria(  posicionX, posicionY, conf.getArtilleriaSalud(),conf.getArtilleriaRadioDisparo(), conf.getArtilleriaDanio() );

          artillerias.add(art);
        }

        Campo campo1 = new Campo( posicionCampoX, posicionCampoY, artillerias, base1);
        Equipo equipo1 = new Equipo(bando, jugadores,campo1);

        //Fin equipo1


        //Equipo 2
        DepositoDeExplosivos depositoExp2 = new DepositoDeExplosivos(conf.getDepositoExplosivosSalud());
        TorreDeControl torre2 = new TorreDeControl( conf.getTorreSalud(), conf.getTorreRadioDisparo(), conf.getTorreDanio());
        TanqueDeCombustible tanque2 = new TanqueDeCombustible(conf.getTanqueCombustibleSalud());       

        //Randomizo la posición de la base 2
        int base2X = (int) (Math.random() * (((posicionCampo2X + conf.getCampoTamanioX() - conf.getBaseTamanioX() ) - posicionCampo2X) + 1)) + posicionCampo2X;
        int base2Y = (int) (Math.random() * (((posicionCampo2Y + conf.getCampoTamanioY() - conf.getBaseTamanioY() ) - posicionCampo2Y) + 1)) + posicionCampo2Y;

        Base base2 = new Base(base2X,base2Y,depositoExp2,torre2,tanque2);

        int yInicialAvionCampo2;
        if ((base2Y - (posicionCampo2Y + 50)) > 200)
          yInicialAvionCampo2 = posicionCampo2Y + 50 - 120;
        else
          yInicialAvionCampo2 = posicionCampo2Y + 50 + 120;

        List<Jugador> jugadores2 = new LinkedList<>();
        List<Avion> aviones2 = new LinkedList<>();
        if(modalidad.equals("1vs1")){
          aviones2.add(new Avion( "Avion4", conf.getAvionSalud(),conf.getAvionDanio(),conf.getAvionVelocidad(), conf.getAvionCombustible(), "Inicial", posicionCampo2X+50, yInicialAvionCampo2));
          aviones2.add(new Avion( "Avion5", conf.getAvionSalud(),conf.getAvionDanio(),conf.getAvionVelocidad(), conf.getAvionCombustible(), "Inicial", posicionCampo2X+100, yInicialAvionCampo2));
          aviones2.add(new Avion( "Avion6", conf.getAvionSalud(),conf.getAvionDanio(),conf.getAvionVelocidad(), conf.getAvionCombustible(), "Inicial", posicionCampo2X+150, yInicialAvionCampo2));
          aviones2.add(new Avion( "Avion7", conf.getAvionSalud(),conf.getAvionDanio(),conf.getAvionVelocidad(), conf.getAvionCombustible(), "Inicial", posicionCampo2X+200, yInicialAvionCampo2));
          jugadores2.add(new Jugador("", null, false, aviones2));

        }

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
          Artilleria art = new Artilleria( posicionX, posicionY, conf.getArtilleriaSalud(),conf.getArtilleriaRadioDisparo(), conf.getArtilleriaDanio() );
          artillerias2.add(art);
        }

        Campo campo2 = new Campo(posicionCampo2X, posicionCampo2Y, artillerias2, base2);
        String bando2 = "Potencias";
        if(bando.equals("Potencias"))
          bando2 = "Aliados";
        Equipo equipo2 = new Equipo(bando2, jugadores2,campo2);
        // Fin equipo 2

        
        List<Equipo> equipos = new LinkedList<>();
        equipos.add(equipo1);
        equipos.add(equipo2);

        Mapa nuevoMapa = new Mapa("mapa", conf.getMapaTamanioX(), conf.getMapaTamanioY());

        Partida partidaNueva = new Partida(publica, modalidad, nombre, passwd, equipos, nuevoMapa);

        Long idpartida ;
        synchronized(this) {
          idpartida = Long.valueOf(partidas.size());
          partidaNueva.setIdpartida(idpartida);
          partidas.add(partidaNueva);
        }

        LOGGER.debug("Tamaño de la lista de partidas: " + partidas.size());
        
        //Genero el JSon
        Gson gson = new GsonBuilder().excludeFieldsWithoutExposeAnnotation().create();
        JsonElement jsonElementConf = gson.toJsonTree(conf);
        JsonElement jsonElementPartida = gson.toJsonTree(partidaNueva);
        JsonElement jsonElementCampo = gson.toJsonTree(campo1);
        JsonElement jsonElementCampo2 = gson.toJsonTree(campo2);
        JsonElement jsonElementAviones = gson.toJsonTree(aviones);
        JsonElement jsonElementAviones2 = gson.toJsonTree(aviones2);

        JsonObject innerObject = new JsonObject();
        innerObject.addProperty("operacion", "iniciarPartida");
        innerObject.add("configuraciones", jsonElementConf);
        innerObject.add("partida", jsonElementPartida);
        innerObject.addProperty("bando", bando);
        innerObject.add("campo"+bando, jsonElementCampo);
        innerObject.add("campo"+bando2, jsonElementCampo2);
        innerObject.add("aviones"+bando, jsonElementAviones);
        innerObject.add("aviones"+bando2, jsonElementAviones2);

        return gson.toJson(innerObject);



    }

    @Transactional
    public String ingresarAPartida(Long idPartida, String nick, WebSocketSession sesionUsu, String passwd)
        throws PartidaLlenaException, PartidaNoExisteException, PasswordEquivocadaException {
       
      Configuracion conf = (Configuracion) Hibernate.unproxy(configuracionR.getOne(1));

      Partida partida = null;
      Campo campo  = null;
      Campo campoContrario = null;
      String bando = "";
      String bandoContrario = "";
      List<Avion> aviones= null; 
      List<Avion> aviones2= null; 

      int i = 0;
      boolean encontre = false;
      while(i<partidas.size() && encontre == false){
        partida = partidas.get(i);
        if(partida.getIdpartida().equals(idPartida)){
          if(partida.isPublica() || passwd.equals(partida.getPassword())){
            //Reviso si la partida esta llena
            int cantJug = 0;
            for(Equipo eq : partida.getEquipos())
              for(Jugador jug : eq.getJugadores())
                if(jug.getSesionActual()!=null)
                  cantJug++;

            if(partida.getModalidad().equals("1vs1") && cantJug==2){
              throw new PartidaLlenaException("ingresarAPartida","La partida esta llena");

            }else if(partida.getModalidad().equals("1vs1")){
              LOGGER.debug("Voy a armar la partida para Ingresar: " + idPartida);
              //Equipo 2
              List<Equipo> equipos = partida.getEquipos();
              List<Jugador> jugadores= equipos.get(1).getJugadores();
              jugadores.get(0).setNick(nick);
              jugadores.get(0).setSesionActual(sesionUsu);
              equipos.get(1).setJugadores(jugadores);
              partida.setEquipos(equipos);
              campo =  equipos.get(1).getCampo();
              bando = equipos.get(1).getBando();
              aviones = equipos.get(1).getJugadores().get(0).getAviones();

              campoContrario =  equipos.get(0).getCampo();
              bandoContrario =  equipos.get(0).getBando();
              aviones2 = equipos.get(0).getJugadores().get(0).getAviones();


            }
            encontre = true;
          }else{
            throw new PasswordEquivocadaException("ingresarAPartida", "La contraseña no es correcta");
          }
        }
        i++;
      }
      if(!encontre){
        //LOGGER.debug("estado partidas: " + partidas);
        throw new PartidaNoExisteException("recuperarPartida", "No existe la partida : " + idPartida);
      }

      //Genero el JSon
      Gson gson = new GsonBuilder().excludeFieldsWithoutExposeAnnotation().create();
      JsonElement jsonElementConf = gson.toJsonTree(conf);
      JsonElement jsonElementPartida = gson.toJsonTree(partida);
      JsonElement jsonElementCampo = gson.toJsonTree(campo);
      JsonElement jsonElementCampoContrario = gson.toJsonTree(campoContrario);
      JsonElement jsonElementAviones = gson.toJsonTree(aviones);
      JsonElement jsonElementAviones2 = gson.toJsonTree(aviones2);

      JsonObject innerObject = new JsonObject();
      innerObject.addProperty("operacion", "ingresarAPartida");
      innerObject.add("configuraciones", jsonElementConf);
      innerObject.add("partida", jsonElementPartida);
      innerObject.addProperty("bando", bando);
      innerObject.add("campo"+bando, jsonElementCampo);
      innerObject.add("campo"+bandoContrario, jsonElementCampoContrario);
      innerObject.add("aviones"+bando, jsonElementAviones);
      innerObject.add("aviones"+bandoContrario, jsonElementAviones2);
      LOGGER.debug("Devolvi la partida: " + innerObject);

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
            for(Jugador jug : eq.getJugadores())
              if(jug.getSesionActual()!=null)
                jugConectados++;

        innerObjectPartida.addProperty("jugConectados", jugConectados);
        innerObjectPartida.addProperty("nickDuenio", equipos.get(0).getJugadores().get(0).getNick());
        innerObjectPartida.addProperty("bandoDuenio", equipos.get(0).getBando());

        innerObjectLista.add(innerObjectPartida);
        
      }

      innerObject.add("partidas", innerObjectLista);
      innerObject.addProperty("operacion", "listarPartidas");

      return gson.toJson(innerObject);

    }

    public List<WebSocketSession> sincronizarPartida(Long idPartida) throws PartidaNoExisteException{
      List<WebSocketSession> sessions = new LinkedList<>();
      int i = 0;
      boolean encontre = false;
      while(i<partidas.size() && encontre == false){
        Partida par = partidas.get(i);
        if(par.getIdpartida().equals(idPartida)){
          for(Equipo eq : par.getEquipos()){
            for(Jugador ju : eq.getJugadores()){
                sessions.add(ju.getSesionActual());
            }
          }
          encontre = true;
        }
        i++;
      }
      if(!encontre){
        throw new PartidaNoExisteException("recuperarPartida", "La partida ya no esta disponible : " + idPartida);
      }
      return sessions;
    }

    @Transactional
    public String guardarPartida(Long idPartida, String passwd, JsonObject[] aviones, JsonObject basePotencias, JsonObject baseAliados, 
    JsonObject[] artPotencias, JsonObject[] artAliados ) throws PartidaNoExisteException, ErrorAlGuardarException{

      int i = 0;
      boolean encontre = false;
      Gson gson = new GsonBuilder().excludeFieldsWithoutExposeAnnotation().create();
      Configuracion conf = (Configuracion) Hibernate.unproxy(configuracionR.getOne(1));
      Partida par = null;
      try{
        while(i<partidas.size() && encontre == false){
          par = partidas.get(i);
          if(par.getIdpartida().equals(idPartida)){
            
            for(Equipo eq : par.getEquipos()){
              for(Jugador jug: eq.getJugadores()){
                int q = 0;
                int a = 0;
                Campo campo = eq.getCampo();
                Base base = campo.getBase();
                JsonObject dataBase = null;
                JsonObject[] dataArt = null;
                if(eq.getBando().equals("Aliados")){
                  q = 4;
                  dataBase = baseAliados; 
                  dataArt = artAliados; 
                }else{
                  dataBase = basePotencias;
                  dataArt = artPotencias;
                }
                for(Artilleria art : campo.getArtillerias()){
                  art.setSalud(dataArt[a].get("salud").getAsInt());
                  a++;
                }

                base.getTorreControl().setSalud(dataBase.get("vidaTorre").getAsInt());
                base.getTanqueCombustible().setSalud(dataBase.get("vidaTanqueCombustible").getAsInt());
                base.getDepositoExplosivos().setSalud(dataBase.get("vidaDepositoExplosivos").getAsInt());

                for(Avion av : jug.getAviones()){
                  av.setPosicionX( aviones[q].get("posicionX").getAsInt());
                  av.setPosicionY(aviones[q].get("posicionY").getAsInt());
                  av.setCombustible(aviones[q].get("combustible").getAsInt());
                  av.setAltitud(aviones[q].get("altitud").toString());
                  av.setSalud(aviones[q].get("salud").getAsInt());
                  if(aviones[q].get("bomba").getAsBoolean()){
                    av.setBomba(new Bomba(conf.getBombaRadioImpacto(),conf.getBombaDanio()));
                  }
                  q++;
                }                
              }
            }
            par.setPassword(passwd);
            par.setPublica(false);
            par = partidaR.saveAndFlush(par);
            encontre = true;
          }
          i++;
        }
      }catch(Exception e){
        throw new ErrorAlGuardarException("guardarPartida", "Hubo un error al guardar");
      }
      if(!encontre){
        throw new PartidaNoExisteException("guardarPartida", "La partida no esta disponible" );
      }
        //Genero el JSon
        JsonObject innerObject = new JsonObject();
        innerObject.addProperty("operacion", "guardarPartida");
        innerObject.addProperty("estado", "OK");
        innerObject.addProperty("nroPartida",  par.getIdParBD());
        LOGGER.debug("Guarde la partida: " +  par.getIdpartida());
        return gson.toJson(innerObject);
    }

    @Transactional
    public String recuperarPartida(Long idPartida, WebSocketSession sesionUsu, String passwd) throws PartidaNoExisteException {
      try{
        
        Configuracion conf = (Configuracion) Hibernate.unproxy(configuracionR.getOne(1));

        Partida partida = (Partida) Hibernate.unproxy(partidaR.getOne(idPartida));
        //Partida partida = new Partida(par.isPublica(), par.getModalidad(), par.getNombre(), par.getPassword(), par.getEquipos(), par.getMapa());
        if(partida.getPassword().equals(passwd)){
          partida.getEquipos().get(0).getJugadores().get(0).setSesionActual(sesionUsu);
          Long idpartida ;
          synchronized(this) {
            idpartida = Long.valueOf(partidas.size());
            partida.setIdpartida(idpartida);
            partidas.add(partida);
          }
          List<Avion> aviones = partida.getEquipos().get(0).getJugadores().get(0).getAviones();
          List<Avion> aviones2 = partida.getEquipos().get(1).getJugadores().get(0).getAviones();

          Gson gson = new GsonBuilder().excludeFieldsWithoutExposeAnnotation().create();
          JsonElement jsonElementConf = gson.toJsonTree(conf);
          JsonElement jsonElementPartida = gson.toJsonTree(partida);
          JsonElement jsonElementCampo = gson.toJsonTree(partida.getEquipos().get(0).getCampo());
          JsonElement jsonElementCampo2 = gson.toJsonTree(partida.getEquipos().get(1).getCampo());
          JsonElement jsonElementAviones = gson.toJsonTree(aviones);
          JsonElement jsonElementAviones2 = gson.toJsonTree(aviones2);

          String bando = partida.getEquipos().get(0).getBando();
          String bando2 = partida.getEquipos().get(1).getBando();

          JsonObject innerObject = new JsonObject();
          innerObject.addProperty("operacion", "recuperarPartida");
          innerObject.add("configuraciones", jsonElementConf);
          innerObject.add("partida", jsonElementPartida);
          innerObject.addProperty("bando", bando);
          innerObject.add("campo"+bando, jsonElementCampo);
          innerObject.add("campo"+bando2, jsonElementCampo2);
          innerObject.add("aviones"+bando, jsonElementAviones);
          innerObject.add("aviones"+bando2, jsonElementAviones2);

          return gson.toJson(innerObject);
        }else{
          throw new PartidaNoExisteException("recuperarPartida", "No existe una partida con esa contraseña");
        }

      }catch (Exception e){
        System.out.print(e);
        throw new PartidaNoExisteException("recuperarPartida", "No existe la partida ");
      }
    }

    public void terminarPartida(Long idPartida) throws PartidaNoExisteException{
      try{
        boolean encontre = false;
        int i = 0;
        while(i<partidas.size() && encontre == false){
          if(partidas.get(i).getIdpartida().equals(idPartida)){
            partidas.remove(i);
            encontre = true;
          }
          i++;
        }
        if(!encontre){
          throw new PartidaNoExisteException("terminarPartida", "No existe la partida" );
        }
      }catch (Exception e){
        System.out.print(e);
        throw new PartidaNoExisteException("terminarPartida", "Error al terminar la partida" );
      }

    }

    

}
