import { config } from '../lib/main.js';


class Partida {
    
    constructor() {

    }

    procesarMensaje(msg){
        if(msg.operacion == "iniciarPartida"){
            this.idpartida = msg.partida.idPartida;
            this.Bando = msg.bando;
            console.log(msg.bando);
            console.log(msg);
            console.log("Empece partida numero : " + msg.partida.idPartida);
            console.log(msg.partida.idPartida);
        }else if(msg.operacion == "ingresarAPartida"){            
            console.log("Ingrese a partida numero: " + msg.partida.idPartida) ;
            this.idpartida = msg.partida.idPartida;
        }else if(msg.operacion == "sincronizarAvion"){         

            if (msg.idavion == 1)
                this.avion_1.moverAvion(msg);
            if (msg.idavion == 2)
                this.avion_2.moverAvion(msg);
            if (msg.idavion == 3)
                this.avion_3.moverAvion(msg);
            if (msg.idavion == 4)
                this.avion_4.moverAvion(msg);
            if (msg.idavion == 5)
                this.avion_1_Aliados.moverAvion(msg);
            if (msg.idavion == 6)
                this.avion_2_Aliados.moverAvion(msg);
            if (msg.idavion == 7)
                this.avion_2_Aliados.moverAvion(msg); 
            if (msg.idavion == 8)
                this.avion_1_Aliados.moverAvion(msg);   

        }else if(msg.operacion == "listarPartidas"){  
            console.log("Traje las partidas :" );          
            console.log(msg.partidas);
            console.log(msg);
            this.listaPartidas = msg.partidas;
        }
    }
    
    iniciarPartida(){
        if (config.WebSocket.isConnected()) {        
            config.WebSocket.ws.send(JSON.stringify({operacion:"iniciarPartida",nick:"pepe",modalidad:"1vs1",nombre:"PartidaDemo",publica:"true",passwd:"0",bando:"Aliado"}));
        //aca el backend registrara una nueva partida y la sesion del usuaria, ademas retornara la sesion del juego.
        }        
    }

    ingresarAPartida(idpartida){
        config.WebSocket.ws.send(JSON.stringify({operacion:"ingresarAPartida",idpartida:idpartida,nick:"Juan",passwd:"0"}));
    }

    sincronizarAvion(msg){
        if (config.WebSocket.isConnected()) {        
            config.WebSocket.ws.send(JSON.stringify({operacion:"sincronizarAvion",idpartida:this.idpartida,idavion:this.idavion,x: msg.x, y: msg.y}));
        }
    }

    listarPartidas(){
        config.WebSocket.ws.send(JSON.stringify({operacion:"listarPartidas"}));
        console.log("Ando por aca bro");
    }

}

export default Partida ;