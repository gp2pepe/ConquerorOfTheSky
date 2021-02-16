package com.ConquerorOfTheSky.base.handlers;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

@Configuration
@EnableWebSocket
public class WebSocketConfig implements WebSocketConfigurer {

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry webSocketHandlerRegistry) {

        webSocketHandlerRegistry.addHandler(new TWebSocketHandler(), "/web-socket");
        webSocketHandlerRegistry.addHandler(new TWebSocketHandler(), "/web-socket").setAllowedOrigins("*");
    }

}