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
      //  myText.text = 'connected\n';
    }
    isConnected() {
        return this.connected;
    }
    onMessage(message) {
      //  myText.text = message.data;
        var msg = JSON.parse(message.data);
       // moverAvion({ x: msg.x, y: msg.y }, avion);
    }
    displayError(err) {
        console.log("llegue2");
        console.log('Websocketerror: ' + err);
    }
}

export default Client;