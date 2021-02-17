import { config } from '../lib/main.js';


class Partida {
    
    constructor() {


    }
    procesarMensaje(msg){
        if(msg.operacion == "iniciarPartida"){
            this.idpartida = msg.idpartida;
        }else if(msg.operacion == "sincronizarAvion"){
            this.avion.moverAvion(msg);
        }
    }
    
    iniciarPartida(){
        if (config.WebSocket.isConnected()) {        
            //(String nick, Session sesionUsu, boolean publica, String passwd, String bando)
            console.log("Voy a crear partida");
            config.WebSocket.ws.send(JSON.stringify({operacion:"iniciarPartida",nick:"pepe",publica:"true",passww:"0",bando:"Aleman"}));
        }
        
    }

    sincronizarAvion(msg){
        if (config.WebSocket.isConnected()) {        
            config.WebSocket.ws.send(JSON.stringify({operacion:"sincronizarAvion",idpartida:this.idpartida,x: msg.x, y: msg.y}));
        }
    }

}

export default Partida ;