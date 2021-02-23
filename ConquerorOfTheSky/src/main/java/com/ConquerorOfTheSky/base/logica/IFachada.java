package com.ConquerorOfTheSky.base.logica;

import java.util.List;

import org.springframework.web.socket.WebSocketSession;

public interface IFachada {

    
    public String crearPartida(String nick, String modalidad, String nombre, WebSocketSession sesionUsu, boolean publica, String passwd, String bando);

    public String ingresarAPartida(Long idPartida, String nick, WebSocketSession sesionUsu, String passwd);

    public String listarPartidas();
    
    public List<WebSocketSession>  sincronizarPartida(Long idpartida);

    public void guardarPartida(Long idPartida);

    public void recuperarPartida(Long idPartida);

    public void terminarPartida();

}
