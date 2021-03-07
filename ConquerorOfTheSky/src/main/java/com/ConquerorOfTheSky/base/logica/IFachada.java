package com.ConquerorOfTheSky.base.logica;

import java.util.List;

import org.springframework.web.socket.WebSocketSession;

import com.ConquerorOfTheSky.base.excepciones.PartidaLlenaException;
import com.ConquerorOfTheSky.base.excepciones.PartidaNoExisteException;

public interface IFachada {

    
    public String crearPartida(String nick, String modalidad, String nombre, WebSocketSession sesionUsu, boolean publica, String passwd, String bando);

    public String ingresarAPartida(Long idPartida, String nick, WebSocketSession sesionUsu, String passwd) throws PartidaLlenaException, PartidaNoExisteException;

    public String listarPartidas();
    
    public List<WebSocketSession>  sincronizarPartida(Long idpartida) throws PartidaNoExisteException;

    public void guardarPartida(Long idPartida) throws PartidaNoExisteException;

    public String recuperarPartida(Long idPartida) throws PartidaNoExisteException;

    public void terminarPartida(Long idPartida);

}
