package com.ConquerorOfTheSky.base.handlers;

import com.ConquerorOfTheSky.base.logica.IFachada;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

@Configuration
@EnableWebSocket
public class WebSocketConfig implements WebSocketConfigurer {

    @Autowired
    private IFachada fachada;

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry webSocketHandlerRegistry) {

        //webSocketHandlerRegistry.addHandler(new TWebSocketHandler(), "/web-socket");
        webSocketHandlerRegistry.addHandler(new TWebSocketHandler(fachada), "/web-socket").setAllowedOrigins("*");
    }

}