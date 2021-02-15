package com.ConquerorOfTheSky.base.handlers;

import java.io.IOException;
import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

import com.ConquerorOfTheSky.base.logica.IFachada;
import com.mysql.cj.Session;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;


public class TWebSocketHandler extends TextWebSocketHandler {

    private static final Logger LOGGER = LoggerFactory.getLogger(TWebSocketHandler.class);

    private final List<WebSocketSession> sessions = new CopyOnWriteArrayList<>();
    
    @Autowired
    private static IFachada fachada;

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
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {

        super.handleTextMessage(session, message);
        sessions.forEach(webSocketSession -> {
            try {

                webSocketSession.sendMessage(message);

            } catch (IOException e) {

                LOGGER.error("Error occurred.", e);

            }

        });
        
        //fachada.sincronizarPartida( );


    }

    protected void enviaMensaje(List<WebSocketSession> destinatarios, TextMessage message){
        sessions.forEach(webSocketSession -> {
            try {

                webSocketSession.sendMessage(message);

            } catch (IOException e) {

                LOGGER.error("Error occurred.", e);

            }

        });

    }

}