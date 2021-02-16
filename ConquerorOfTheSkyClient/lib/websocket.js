import { config } from '../lib/main.js';


class Client {
    
    constructor() {
    }
    openConnection() {
        var url = 'ws://localhost:8080/web-socket    ';

        this.ws = new WebSocket(url);
        this.connected = false;
        this.ws.onmessage = this.onMessage.bind(this);        
        this.ws.onerror = this.displayError.bind(this);        
        this.ws.onopen = this.connectionOpen.bind(this);  
        
    }

    connectionOpen() {
        this.connected = true;    
        console.log("conexion abierta"); 
      //  myText.text = 'connected\n';
    }
    isConnected() {
        return this.connected;
    }
    onMessage(message) {
      //  myText.text = message.data;
        var msg = JSON.parse(message.data);
        console.log(msg);
        config.Part.avion.moverAvion(msg);

    }

    displayError(err) {
        console.log("Hubo un error !!"); 
        console.log('Websocketerror: ' + err);
    }
}

export default Client;