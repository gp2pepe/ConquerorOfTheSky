import { config } from '../lib/main.js';


class Partida {
    
    constructor() {

    }

    procesarMensaje(msg){
        if(msg.operacion == "iniciarPartida"){
            this.idpartida = msg.idpartida;
            console.log("Empece partida numero :") + 
            console.log(msg.idpartida);
        }else if(msg.operacion == "ingresarAPartida"){            
            this.bando = msg.bando;
            console.log("Ingrese a partida en bando:") + 
            console.log(msg.bando);
        }else if(msg.operacion == "sincronizarAvion"){          
            if (msg.idavion == 1)
                this.avion_1.moverAvion(msg);
             if (msg.idavion == 2)
                this.avion_2.moverAvion(msg);
            if (msg.idavion == 3)
              this.avion_3.moverAvion(msg);
            if (msg.idavion == 4)
              this.avion_4.moverAvion(msg);
        }else if(msg.operacion == "listarPartidas"){  
            console.log("Traje las partidas :" );          
            console.log(msg.partidas);
        }
    }
    
    iniciarPartida(){
        if (config.WebSocket.isConnected()) {        
            config.WebSocket.ws.send(JSON.stringify({operacion:"iniciarPartida",nick:"pepe",publica:"true",passwd:"0",bando:"Aleman"}));
        //aca el backend registrara una nueva partida y la sesion del usuaria, ademas retornara la sesion del juego.
        }        
    }

    ingresarAPartida(){
        config.WebSocket.ws.send(JSON.stringify({operacion:"ingresarAPartida",idpartida:"0",nick:"Juan",passwd:"0"}));
    }

    sincronizarAvion(msg){
        if (config.WebSocket.isConnected()) {        
            config.WebSocket.ws.send(JSON.stringify({operacion:"sincronizarAvion",idpartida:this.idpartida,idavion:this.idavion,x: msg.x, y: msg.y}));
        }
    }

    listarPartidas(){
        config.WebSocket.ws.send(JSON.stringify({operacion:"listarPartidas"}));
    }

}

export default Partida ;