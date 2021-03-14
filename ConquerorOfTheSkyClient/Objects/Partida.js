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
            this.pass = msg.partida.passwd;

        }else if(msg.operacion == "ingresarAPartida"){            

            this.idpartida = msg.partida.idPartida;
            this.Bando = msg.bando;
            this.campoPotencias = msg.campoPotencias;
            this.campoAliados = msg.campoAliados;
            this.configuraciones = msg.configuraciones;
            this.duenio = false;
            this.partidaCargada = true;
            //this.pass = msg.Partida.passwd;

        }else if(msg.operacion == "ingresoUnJugador"){            
            this.estado = "Jugando";
        }else if(msg.operacion == "sincronizar"){ 
            
            if(msg.carga.tipoOp == "sincronizarAvion") {
                this.aviones[msg.carga.idavion-1].moverAvion(msg.carga);

            }else if(msg.carga.tipoOp == "sincronizarVidaAvion"){
                this.aviones[msg.carga.idavion-1].vidaAvion-=msg.carga.vida;
                //this.aviones[msg.carga.idavion-1].mePegaron('true');

            }else if(msg.carga.tipoOp == "sincronizarAltitudAvion"){
                this.aviones[msg.carga.idavion-1].cambiarAltitud(msg.carga.altitud);

            }else if(msg.carga.tipoOp == "sincronizarBombaAvion"){
                this.aviones[msg.carga.idavion-1].cargarbomba=msg.carga.bomba;
               

            }else if(msg.carga.tipoOp == "sincronizarCombustibleAvion"){
                this.aviones[msg.carga.idavion-1].cargarCombustible=msg.carga.combustible;

            }else if(msg.carga.tipoOp == "sincronizarVidaBase"){
                /*
                [0] = this.torreAliados;
                [1] = this.depositoAliados;
                [2] = this.contenedorAliados;
                */
                if(msg.carga.bando=="Potencias"){
                    this.basePotencias[msg.carga.objeto].vida = msg.carga.vida;
                    if(this.basePotencias[0].vida  == 0 && this.basePotencias[1].vida  == 0 && this.basePotencias[2].vida  == 0 )
                    this.estado="Terminada";

                }else{
                    this.baseAliados[msg.carga.objeto].vida = msg.carga.vida;
                    if(this.basePotencias[0].vida  == 0 && this.basePotencias[1].vida  == 0 && this.basePotencias[2].vida  == 0 )
                    this.estado="Terminada";
                }

            }else if(msg.carga.tipoOp == "sincronizarPausa"){
                if(msg.carga.estado == "Pausar")
                    this.estado = "Pausado";
                if(msg.carga.estado == "Activar"){
                    this.estado = "Jugando";
                }

            }

        }else if(msg.operacion == "listarPartidas"){ 
            this.listaPartidas = msg.partidas;
            this.listaCargada = true;

        }else if(msg.operacion == "guardarPartida"){ 
            this.estado = "Preparado";
            this.nroPartida = msg.nroPartida;

        }else if(msg.operacion == "recuperarPartida"){ 
            this.estado = "Preparado";
            this.idpartida = msg.partida.idPartida;
            this.Bando = msg.bando;
            this.campoPotencias = msg.campoPotencias;
            this.campoAliados = msg.campoAliados;
            this.avionesPotencias = msg.avionesPotencias;
            this.avionesAliados = msg.avionesAliados;
            this.configuraciones = msg.configuraciones;
            this.Nombre = msg.partida.nombre;
            this.duenio = true;
            this.partidaCargada = true;
            console.log('Partida1: '+msg);

        }else if(msg.operacion == "errorServidor"){ 
                this.hayError = true;
                this.mensajeError = msg.mensaje;
        }
    }
    
    iniciarPartida(){
        if (config.WebSocket.isConnected()) {        
            config.WebSocket.ws.send(JSON.stringify({operacion:"iniciarPartida",nick:this.nick,modalidad:"1vs1",nombre:this.Nombre,publica:"true",passwd:"0",bando:this.Bando}));
        //aca el backend registrara una nueva partida y la sesion del usuaria, ademas retornara la sesion del juego.
        }        
    }

    ingresarAPartida(idpartida, passwd){
        console.log(idpartida);
        config.WebSocket.ws.send(JSON.stringify({operacion:"ingresarAPartida",idpartida:idpartida,nick:"Juan",passwd:passwd}));
    }

    sincronizar(carga){
        if (config.WebSocket.isConnected()) {        
            config.WebSocket.ws.send(JSON.stringify({operacion:"sincronizar",idpartida:this.idpartida,carga}));
        }
    }

    listarPartidas(){
        config.WebSocket.ws.send(JSON.stringify({operacion:"listarPartidas"}));        
    }

    guardarPartida(contrasenia){

        //Armo el json de aviones
        var stringAviones="[";
        for(var i = 0; i<8 ; i++)
            stringAviones+=this.aviones[i] + ",";
        stringAviones=stringAviones.substring(0, stringAviones.length-1);   
        stringAviones+="]";  

        //Armo el json de la base potencias
        var baseP = "{ vidaTorre: " + this.basePotencias[0].vida + ", vidaDepositoExplosivos: " + this.basePotencias[1].vida + ", vidaTanqueCombustible: " + this.basePotencias[2].vida + "}";
        
        //Armo el json de la base aliados
        var baseA = "{ vidaTorre: " + this.baseAliados[0].vida + ", vidaDepositoExplosivos: " + this.baseAliados[1].vida + ", vidaTanqueCombustible: " + this.baseAliados[2].vida + "}";

        //Armo el json de artilleria Potencias
        var stringArtPotencias="[";
        for(var i = 0; i<this.configuraciones.artilleriaCantidad ; i++)     
            stringArtPotencias+="{id:"+ i +",salud:" + this.artilleriasPotencias[i].vida + "},";
        stringArtPotencias=stringArtPotencias.substring(0, stringArtPotencias.length-1);   
        stringArtPotencias+="]";  

        //Armo el json de artilleria Aliados
        var stringArtAliados="[";
        for(var i = 0; i<this.configuraciones.artilleriaCantidad ; i++)     
            stringArtAliados+="{id:"+ i +",salud:" + this.artilleriasAliados[i].vida + "},";
        stringArtAliados=stringArtAliados.substring(0, stringArtAliados.length-1);   
        stringArtAliados+="]";  

        console.log('contrasenia');
        config.WebSocket.ws.send(JSON.stringify({operacion:"guardarPartida",idpartida:this.idpartida,
            passwd:contrasenia,
            aviones: stringAviones, 
            basePotencias: baseP , 
            baseAliados: baseA, 
            artPotencias: stringArtPotencias,
            artAliados: stringArtAliados}));        
    }

    recuperarPartida(idpart, contrasenia){
        config.WebSocket.ws.send(JSON.stringify({operacion:"recuperarPartida",idpartida: idpart, passwd: contrasenia}));  
    }

    terminarPartida(){
        config.WebSocket.ws.send(JSON.stringify({operacion:"terminarPartida",idpartida:this.idpartida}));  
    }

}

export default Partida ;