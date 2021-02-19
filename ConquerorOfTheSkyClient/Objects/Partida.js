import { config } from '../lib/main.js';


class Partida {
    
    constructor() {

    }

    procesarMensaje(msg){
        if(msg.operacion == "iniciarPartida"){
            this.idpartida = msg.idpartida;
        }else if(msg.operacion == "sincronizarAvion"){            
            if (msg.idavion ==1)
                this.avion_1.moverAvion(msg);
        }
    }
    
    iniciarPartida(){
        if (config.WebSocket.isConnected()) {        
            //(String nick, Session sesionUsu, boolean publica, String passwd, String bando)
            console.log("Voy a crear partida");
            config.WebSocket.ws.send(JSON.stringify({operacion:"iniciarPartida",nick:"pepe",publica:"true",passww:"0",bando:"Aleman"}));
        //aca el backend registrara una nueva partida y la sesion del usuaria, ademas retornara la sesion del juego.
        }        
    }

    sincronizarAvion(msg){
        if (config.WebSocket.isConnected()) {        
            config.WebSocket.ws.send(JSON.stringify({operacion:"sincronizarAvion",idpartida:this.idpartida,idavion:this.idavion,x: msg.x, y: msg.y}));
        }
    }

}

export default Partida ;