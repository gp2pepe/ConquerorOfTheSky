package com.ConquerorOfTheSky.base.controladores;
 
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class WebSocketController {

    @RequestMapping("/websocket")
    public String getWebSocket() {

        return "ws-broadcast";

    }

}