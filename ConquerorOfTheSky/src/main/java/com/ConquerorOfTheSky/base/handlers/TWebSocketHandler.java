package com.ConquerorOfTheSky.base.handlers;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CopyOnWriteArrayList;

import com.ConquerorOfTheSky.base.logica.Fachada;
import com.ConquerorOfTheSky.base.logica.IFachada;

import com.mysql.cj.Session;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.json.JsonParser;
import org.springframework.boot.json.JsonParserFactory;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;


public class TWebSocketHandler extends TextWebSocketHandler {

    private static final Logger LOGGER = LoggerFactory.getLogger(TWebSocketHandler.class);

    private final List<WebSocketSession> sessions = new CopyOnWriteArrayList<>();
    
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
        fachada = (IFachada) Fachada.getInstancia();
        super.handleTextMessage(session, message);
       

        JsonParser springParser = JsonParserFactory.getJsonParser();
        Map<String, Object> map = springParser.parseMap(message.getPayload());

        /*int i = 0;
        for (Map.Entry<String, Object> entry : map.entrySet()) {
                System.out.println(entry.getKey() + " = " + entry.getValue());
                i++;
        }*/

        String op = (String) map.get("operacion");
        if(op.equals(new String("iniciarPartida"))){

            LOGGER.debug("Llego un iniciarPartida: " + map.toString());
            Long idpartida = fachada.crearPartida((String) map.get("nick"),session, true, (String) map.get("passwd"),(String) map.get("bando"));            
            session.sendMessage(new TextMessage("{ \"operacion\":\"iniciarPartida\",\"idpartida\": \""+idpartida+"\" }"));


        }else if(op.equals(new String("ingresarAPartida"))){

            LOGGER.debug("Llego un ingresarAPartida: " + map.toString());
            String bando = fachada.ingresarAPartida(Long.valueOf(((String) map.get("idpartida"))), (String) map.get("nick"), session,(String) map.get("passwd"));
            session.sendMessage(new TextMessage("{ \"operacion\":\"ingresarAPartida\",\"bando\": \""+bando+"\" }"));

        }else if(op.equals(new String("sincronizarAvion"))){

            LOGGER.debug("Llego un sincronizarAvion: " + map.toString());
            List<WebSocketSession> listaSesiones = fachada.sincronizarPartida(Long.valueOf(((String) map.get("idpartida"))));
            listaSesiones.forEach(webSocketSession -> {
                try {
                    if(webSocketSession != session)
                        webSocketSession.sendMessage(message);
                } catch (IOException e) {
    
                    LOGGER.error("Error occurred.", e);
    
                }
    
            });

        }

    }


}