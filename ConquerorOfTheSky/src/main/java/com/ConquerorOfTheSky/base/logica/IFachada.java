package com.ConquerorOfTheSky.base.logica;

import java.util.List;

import org.springframework.web.socket.WebSocketSession;

public interface IFachada {

    
    public Long crearPartida(String nick, WebSocketSession sesionUsu, boolean publica, String passwd, String bando);

    public String ingresarAPartida(Long idPartida, String nick, WebSocketSession sesionUsu, String passwd);

    public String listarPartidas();
    
    public List<WebSocketSession>  sincronizarPartida(Long idpartida);

    public void guardarPartida(Long idPartida);

    public void recuperarPartida();

    public void terminarPartida();

}
