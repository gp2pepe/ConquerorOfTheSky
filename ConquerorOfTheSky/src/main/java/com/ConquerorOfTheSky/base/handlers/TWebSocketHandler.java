package com.ConquerorOfTheSky.base.handlers;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CopyOnWriteArrayList;
import com.ConquerorOfTheSky.base.logica.IFachada;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonObject;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.json.JsonParser;
import org.springframework.boot.json.JsonParserFactory;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.ConquerorOfTheSky.base.excepciones.ErrorAlGuardarException;
import com.ConquerorOfTheSky.base.excepciones.JugadorDesconectadoException;
import com.ConquerorOfTheSky.base.excepciones.PartidaNoExisteException;


public class TWebSocketHandler extends TextWebSocketHandler {

    private static final Logger LOGGER = LoggerFactory.getLogger(TWebSocketHandler.class);

    private final List<WebSocketSession> sessions = new CopyOnWriteArrayList<>();
    
    private IFachada fachada;
    @Autowired
    public TWebSocketHandler(IFachada fachada){
        this.fachada = fachada;
    }

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {

        sessions.add(session);
        super.afterConnectionEstablished(session);

    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {

        sessions.remove(session);
        super.afterConnectionClosed(session, status);

    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) {

        try{
            super.handleTextMessage(session, message);
            Gson gson = new GsonBuilder().excludeFieldsWithoutExposeAnnotation().create();
            JsonParser springParser = JsonParserFactory.getJsonParser();
            Map<String, Object> map = springParser.parseMap(message.getPayload());

            String op = (String) map.get("operacion");
            //Proceso el mensaje de iniciarPartida y devuelvo datos de partida nueva
            if(op.equals(new String("iniciarPartida"))){
                try {
                    LOGGER.debug("Llego un iniciarPartida: " + map.toString());
                    String respuesta = fachada.crearPartida((String) map.get("nick"), (String) map.get("modalidad"), (String) map.get("nombre"),session, true, (String) map.get("passwd"),(String) map.get("bando"));            
                    session.sendMessage(new TextMessage(respuesta));
                } catch (Exception e) {
                    LOGGER.debug(e.toString());
                    try{
                        session.sendMessage(new TextMessage("{ \"operacion\":\"errorServidor\",\"metodo\": \"iniciarPartida\",\"mensaje\": \"Error al iniciar partida\"  }"));
                    } catch (IOException e1) {
                        LOGGER.debug("Se perdio conexión con el Jugador");

                    }
                }

            //Proceso el mensaje de ingresarAPartida y devuelvo datos de la partida al usuario
            }else if(op.equals(new String("ingresarAPartida"))){
                try{
                    LOGGER.debug("Llego un ingresarAPartida: " + map.toString());
                    String respuesta = fachada.ingresarAPartida(Long.valueOf(map.get("idpartida").toString()), map.get("nick").toString(), session, map.get("passwd").toString());
                    session.sendMessage(new TextMessage(respuesta));
                    //Mando mensaje al resto de que se conecto un jugador
                    List<WebSocketSession> listaSesiones = fachada.sincronizarPartida(Long.valueOf(map.get("idpartida").toString()));
                    listaSesiones.forEach(webSocketSession -> {
                        try {
                            if(webSocketSession != session){
                                if(webSocketSession.isOpen())
                                    webSocketSession.sendMessage(new TextMessage("{ \"operacion\":\"ingresoUnJugador\",\"idPartida\": " + map.get("idpartida").toString() + " }"));
                                else if(webSocketSession!=null)
                                    throw new JugadorDesconectadoException("sincronizar", "Se desconecto un jugador");
                            }

                        } catch (Exception e) {
                            LOGGER.debug(e.toString());
                            try {                            
                                LOGGER.debug("Se desconecto un jugador de una partida");
                                session.sendMessage(new TextMessage(gson.toJson(e)));
                            } catch (IOException e1) {
                                LOGGER.debug("Se perdio conexión con el Jugador");

                            }
                        }
                    });
                } catch (Exception e) {
                    LOGGER.debug(e.toString());
                    try { 
                        session.sendMessage(new TextMessage(gson.toJson(e)));
                    } catch (IOException e1) {
                        LOGGER.debug("Se perdio conexión con el Jugador");
                    }
                }

            //Reenvío los mensajes que envía el frontend a los usuarios de la partida
            }else if(op.equals(new String("sincronizar"))){

                try{
                    LOGGER.debug("Llego un sincronizar: " + map.toString());
                    List<WebSocketSession> listaSesiones = fachada.sincronizarPartida(Long.valueOf(map.get("idpartida").toString()));
                    listaSesiones.forEach(webSocketSession -> {
                        try {
                            if(webSocketSession != session){
                                if(webSocketSession.isOpen())
                                    webSocketSession.sendMessage(message);
                                else if(webSocketSession!=null)
                                    throw new JugadorDesconectadoException("sincronizar", "Se desconecto un jugador");
                            }

                        } catch (Exception e) {
                            LOGGER.debug(e.toString());
                            try {                            
                                LOGGER.debug("Se desconecto un jugador de una partida");
                                session.sendMessage(new TextMessage(gson.toJson(e)));
                            } catch (IOException e1) {
                                LOGGER.debug("Se perdio conexión con el Jugador");

                            }
                        }
                    });
                } catch (Exception e) {
                    LOGGER.error("Fallo sincronizar");
                    session.sendMessage(new TextMessage("{ \"operacion\":\"errorServidor\",\"metodo\": \"sincronizar\" }"));
                }

            //Proceso el mensaje de listarPartidas y devuelvo una lista con todas las partidas
            }else if(op.equals(new String("listarPartidas"))){
                try{
                    LOGGER.debug("Llego un sincronizarAvion: " + map.toString());
                    String respuesta = fachada.listarPartidas();
                    session.sendMessage(new TextMessage(respuesta));
                }catch(Exception e){
                    LOGGER.debug(e.toString());
                    try{
                        session.sendMessage(new TextMessage("{ \"operacion\":\"errorServidor\",\"metodo\": \"listarPartidas\",\"mensaje\": \"Hubo un error al buscar las partidas\" }"));
                    } catch (IOException e1) {
                        LOGGER.debug("Se perdio conexión con el Jugador");
                    }
                }
            //Proceso el guardar partida     
            }else if(op.equals(new String("guardarPartida"))){
                try{
                    LOGGER.debug("Llego un guardarPartida: " + map.toString());

                    JsonObject[] aviones = gson.fromJson(map.get("aviones").toString(), JsonObject[].class);
                    JsonObject basePotencias = gson.fromJson(map.get("basePotencias").toString(), JsonObject.class);
                    JsonObject baseAliados = gson.fromJson(map.get("baseAliados").toString(), JsonObject.class);
                    JsonObject[] artPotencias = gson.fromJson(map.get("artPotencias").toString(), JsonObject[].class);
                    JsonObject[] artAliados = gson.fromJson(map.get("artAliados").toString(), JsonObject[].class);

                    String respuesta = fachada.guardarPartida(Long.valueOf(map.get("idpartida").toString()), map.get("passwd").toString(), aviones, basePotencias, baseAliados, artPotencias, artAliados );
                    session.sendMessage(new TextMessage(respuesta));
                }catch(ErrorAlGuardarException | PartidaNoExisteException e){
                    try{
                        session.sendMessage(new TextMessage(gson.toJson(e)));
                    } catch (IOException e1) {
                        LOGGER.debug("Se perdio conexión con el Jugador");
                    }
                    LOGGER.debug(e.getMessage());

                }catch(Exception e){
                    try{
                        session.sendMessage(new TextMessage("{ \"operacion\":\"errorServidor\",\"metodo\": \"guardarPartida\",\"mensaje\": \"Hubo un error al guardar\" }"));
                    } catch (IOException e1) {
                        LOGGER.debug("Se perdio conexión con el Jugador");
                    }
                    LOGGER.debug(e.getMessage());
                }
            //Recupero una partida guardada
            }else if(op.equals(new String("recuperarPartida"))){
                try{
                    LOGGER.debug("Llego un recuperarPartida: " + map.toString());

                    String respuesta = fachada.recuperarPartida(Long.valueOf(map.get("idpartida").toString()),session,  map.get("passwd").toString() );
                    session.sendMessage(new TextMessage(respuesta));
                }catch(Exception e){
                    LOGGER.debug(e.getMessage());
                    try{
                        session.sendMessage(new TextMessage(gson.toJson(e)));
                        //session.sendMessage(new TextMessage("{ \"operacion\":\"errorServidor\",\"metodo\": \"recuperarPartida\",\"mensaje\": \"Hubo un error al recuperar la partida\" }"));
                    } catch (IOException e1) {
                        LOGGER.debug("Se perdio conexión con el Jugador");
                    }
                }

            //Termino una partida (la saco del listado)
            }else if(op.equals(new String("terminarPartida"))){
                try{
                    LOGGER.debug("Llego un terminarPartida: " + map.toString());
                    fachada.terminarPartida(Long.valueOf(map.get("idpartida").toString()));
                    session.sendMessage(new TextMessage("{ \"operacion\":\"terminarPartida\",\"mensaje\": \"OK\" }"));
                }catch(Exception e){
                    LOGGER.debug(e.getMessage());
                    try{
                        session.sendMessage(new TextMessage("{ \"operacion\":\"errorServidor\",\"metodo\": \"terminarPartida\",\"mensaje\": \"Hubo un error al terminar la partida\" }"));
                    } catch (IOException e1) {
                        LOGGER.debug("Se perdio conexión con el Jugador");
                    }
                }
            }
        }catch(Exception e){
            LOGGER.error("Fallo al procesar mensaje");

        }
    }

}