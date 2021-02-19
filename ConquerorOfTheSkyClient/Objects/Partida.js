import { config } from '../lib/main.js';


class Partida {
    
    constructor() {

    }

    procesarMensaje(msg){
        if(msg.operacion == "iniciarPartida"){
            this.idpartida = msg.idpartida;
            console.log("Empece partida numero :" + msg.idpartida);
        }else if(msg.operacion == "ingresarAPartida"){            
            this.bando = 1;
        }else if(msg.operacion == "sincronizarAvion"){            
            if (msg.idavion ==1)
                this.avion_1.moverAvion(msg);
        }
    }
    
    iniciarPartida(){
        if (config.WebSocket.isConnected()) {        
            //(String nick, Session sesionUsu, boolean publica, String passwd, String bando)
            console.log("Voy a crear partida");
            config.WebSocket.ws.send(JSON.stringify({operacion:"iniciarPartida",nick:"pepe",publica:"true",passwd:"0",bando:"Aleman"}));
        //aca el backend registrara una nueva partida y la sesion del usuaria, ademas retornara la sesion del juego.
        }        
    }

    ingresarAPartida(){
        console.log("Voy a ingresar a partida existente");
        config.WebSocket.ws.send(JSON.stringify({operacion:"ingresarAPartida",idpartida:"0",nick:"Juan",passwd:"0"}));
    }

    sincronizarAvion(msg){
        if (config.WebSocket.isConnected()) {        
            config.WebSocket.ws.send(JSON.stringify({operacion:"sincronizarAvion",idpartida:this.idpartida,idavion:this.idavion,x: msg.x, y: msg.y}));
        }
    }

}

export default Partida ;