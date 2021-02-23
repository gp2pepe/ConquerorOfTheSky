import { config } from '../lib/main.js';


class Client {
    
    constructor() {
    }
    openConnection() {
        var url = 'ws://localhost:8082/web-socket    ';

        this.ws = new WebSocket(url);
        this.connected = false;
        this.ws.onmessage = this.onMessage.bind(this);        
        this.ws.onerror = this.displayError.bind(this);        
        this.ws.onopen = this.connectionOpen.bind(this);     
    }

    connectionOpen() {
        this.connected = true;    
        console.log("conexion abierta"); 
    }

    isConnected() {
        return this.connected;
    }

    onMessage(message) {
        var msg = JSON.parse(message.data);
        console.log("Recibí el mensaje : " + msg);
        config.Partida.procesarMensaje(msg);
    }

    displayError(err) {
        console.log("Hubo un error !!"); 
        console.log('Websocketerror: ' );
        console.log( err);

    }
}

export default Client;