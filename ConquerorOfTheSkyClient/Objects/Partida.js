import { config } from '../lib/main.js';


class Partida {
    
    constructor() {


    }

    iniciarPartida(){
        if (config.WebSocket.isConnected()) {        
            //(String nick, Session sesionUsu, boolean publica, String passwd, String bando)
            console.log("Voy a crear partida");
            config.WebSocket.ws.send(JSON.stringify({operacion:"iniciarPartida",nick:"pepe",publica:1,passww:"0",bando:"Aleman"}));
        }
        
    }

    sincronizarAvion(msg){
        if (config.WebSocket.isConnected()) {        
            config.WebSocket.ws.send(JSON.stringify({operacion:"sincronizarAvion",x: msg.x, y: msg.y}));
        }
    }

}

export default Partida ;