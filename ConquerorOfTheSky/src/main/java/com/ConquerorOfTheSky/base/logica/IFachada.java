package com.ConquerorOfTheSky.base.logica;

import java.util.List;

import javax.websocket.Session;

import org.springframework.web.socket.WebSocketSession;

public interface IFachada {

    
    public Long crearPartida(String nick, WebSocketSession sesionUsu, boolean publica, String passwd, String bando);

    public String listarPartidas(Long idPartida);

    public void ingresarAPartida(Long idPartida);
    
    public List<WebSocketSession>  sincronizarPartida(Long idpartida);

    public void guardarPArtida();

    public void recuperarPartida();


}
