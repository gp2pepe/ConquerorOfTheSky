import { config } from '../lib/main.js';


class Partida {
    
    constructor() {
        this.tipoPartida = null;
        this.partidaCargada = false;
        this.listaCargada = false;
        this.hayError = false;
        this.mensajeError = "";
        this.estado = "Jugando";

    }

    procesarMensaje(msg){
        if(msg.operacion == "iniciarPartida"){
            this.idpartida = msg.partida.idPartida;
            this.Bando = msg.bando;
            this.campoPotencias = msg.campoPotencias;
            this.campoAliados = msg.campoAliados;
            this.configuraciones = msg.configuraciones;
            this.duenio = true;
            this.partidaCargada = true;

        }else if(msg.operacion == "ingresarAPartida"){            

            this.idpartida = msg.partida.idPartida;
            this.Bando = msg.bando;
            this.campoPotencias = msg.campoPotencias;
            this.campoAliados = msg.campoAliados;
            this.configuraciones = msg.configuraciones;
            this.duenio = false;
            this.partidaCargada = true;

        }else if(msg.operacion == "sincronizar"){ 
            
            if(msg.carga.tipoOp == "sincronizarAvion") {
                this.aviones[msg.carga.idavion-1].moverAvion(msg.carga);

            }else if(msg.carga.tipoOp == "sincronizarVidaAvion"){
                this.aviones[msg.carga.idavion-1].vidaAvion=msg.carga.vida;

            }else if(msg.carga.tipoOp == "sincronizarAltitudAvion"){
                this.aviones[msg.carga.idavion-1].cambiarAltitud(msg.carga.altitud);

            }else if(msg.carga.tipoOp == "sincronizarBombaAvion"){
                this.aviones[msg.carga.idavion-1].cargarbomba=msg.carga.bomba;

            }else if(msg.carga.tipoOp == "sincronizarCombustibleAvion"){
                this.aviones[msg.carga.idavion-1].cargarCombustible=msg.carga.combustible;

            }else if(msg.carga.tipoOp == "sincronizarPausa"){
                if(msg.carga.estado == "Pausar")
                    this.estado = "Pausado";
                if(msg.carga.estado == "Activar")
                    this.estado = "Jugando";

            }

        }else if(msg.operacion == "listarPartidas"){ 
            this.listaPartidas = msg.partidas;
            this.listaCargada = true;

        }else if(msg.operacion == "guardarPartida"){ 
            this.estado = "Jugando";

        }else if(msg.operacion == "errorServidor"){ 
                this.hayError = true;
                this.mensajeError = msg.mensaje;
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

    sincronizar(carga){
        if (config.WebSocket.isConnected()) {        
            config.WebSocket.ws.send(JSON.stringify({operacion:"sincronizar",idpartida:this.idpartida,carga}));
        }
    }

    listarPartidas(){
        config.WebSocket.ws.send(JSON.stringify({operacion:"listarPartidas"}));        
    }

    guardarPartida(){
        config.WebSocket.ws.send(JSON.stringify({operacion:"guardarPartida",idpartida:this.idpartida,aviones: this.aviones }));        
    }

}

export default Partida ;