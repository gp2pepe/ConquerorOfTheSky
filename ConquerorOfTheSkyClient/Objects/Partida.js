import { config } from '../lib/main.js';


class Partida {
    
    constructor() {
        this.tipoPartida = null;
        this.partidaCargada = false;
        this.listaCargada = false;

    }

    procesarMensaje(msg){
        if(msg.operacion == "iniciarPartida"){
            this.idpartida = msg.partida.idPartida;
            this.Bando = msg.bando;
            this.campoPotencias = msg.campoPotencias;
            this.campoAliados = msg.campoAliados;
            this.configuraciones = msg.configuraciones;
            this.partidaCargada = true;

        }else if(msg.operacion == "ingresarAPartida"){            
            console.log("Ingrese a partida numero: " + msg.partida.idPartida) ;
            this.idpartida = msg.partida.idPartida;
            this.Bando = msg.bando;
            this.campoPotencias = msg.campoPotencias;
            this.campoAliados = msg.campoAliados;
            this.configuraciones = msg.configuraciones;
            this.partidaCargada = true;

        }else if(msg.operacion == "sincronizar"){ 
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
                this.avion_3_Aliados.moverAvion(msg); 
            if (msg.idavion == 8)
                this.avion_4_Aliados.moverAvion(msg);   

        }else if(msg.operacion == "listarPartidas"){ 
            this.listaPartidas = msg.partidas;
            this.listaCargada = true;
        }
    }
    
    iniciarPartida(){
        if (config.WebSocket.isConnected()) {        
            config.WebSocket.ws.send(JSON.stringify({operacion:"iniciarPartida",nick:"pepe",modalidad:"1vs1",nombre:this.Nombre,publica:"true",passwd:"0",bando:this.Bando}));
        //aca el backend registrara una nueva partida y la sesion del usuaria, ademas retornara la sesion del juego.
        }        
    }

    ingresarAPartida(idpartida){
        console.log(idpartida);
        config.WebSocket.ws.send(JSON.stringify({operacion:"ingresarAPartida",idpartida:idpartida,nick:"Juan",passwd:"0"}));
    }

    sincronizar(msg){
        if (config.WebSocket.isConnected()) {        
            config.WebSocket.ws.send(JSON.stringify({operacion:"sincronizar",idpartida:this.idpartida,idavion:this.idavion,x: msg.x, y: msg.y}));
        }
    }

    listarPartidas(){
        config.WebSocket.ws.send(JSON.stringify({operacion:"listarPartidas"}));        
    }

}

export default Partida ;