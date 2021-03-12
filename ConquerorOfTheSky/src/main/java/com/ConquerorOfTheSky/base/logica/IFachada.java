package com.ConquerorOfTheSky.base.logica;

import java.util.List;

import org.springframework.web.socket.WebSocketSession;

import com.ConquerorOfTheSky.base.excepciones.ErrorAlGuardarException;
import com.ConquerorOfTheSky.base.excepciones.PartidaLlenaException;
import com.ConquerorOfTheSky.base.excepciones.PartidaNoExisteException;
import com.ConquerorOfTheSky.base.excepciones.PasswordEquivocadaException;
import com.google.gson.JsonObject;

public interface IFachada {

    
    public String crearPartida(String nick, String modalidad, String nombre, WebSocketSession sesionUsu, boolean publica, String passwd, String bando);

    public String ingresarAPartida(Long idPartida, String nick, WebSocketSession sesionUsu, String passwd) throws PartidaLlenaException, PartidaNoExisteException, PasswordEquivocadaException;

    public String listarPartidas();
    
    public List<WebSocketSession>  sincronizarPartida(Long idpartida) throws PartidaNoExisteException;

    public String guardarPartida(Long idPartida, String passwd, JsonObject[] aviones, JsonObject basePotencias, JsonObject baseAliados, 
    JsonObject[] artPotencias, JsonObject[] artAliados )  throws PartidaNoExisteException, ErrorAlGuardarException;
    
    public String recuperarPartida(Long idPartida, WebSocketSession sesionUsu,  String passwd) throws PartidaNoExisteException;

    public void terminarPartida(Long idPartida) throws PartidaNoExisteException;

}
