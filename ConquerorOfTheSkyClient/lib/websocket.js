function Client() {

}

Client.prototype.openConnection = function() {
    var url ='ws://localhost:8080/web-socket    ';

    this.ws = new WebSocket(url);
    this.connected = false;
    this.ws.onmessage = this.onMessage.bind(this);
    this.ws.onerror = this.displayError.bind(this);
    this.ws.onopen = this.connectionOpen.bind(this);
};

Client.prototype.connectionOpen = function() {
    this.connected = true;
    myText.text = 'connected\n';
};

Client.prototype.isConnected = function() {
    return this.connected ;
};

Client.prototype.onMessage = function(message) {
    myText.text = message.data;
    var msg = JSON.parse(message.data);
    moverAvion({x: msg.x, y: msg.y}, avion);
};

Client.prototype.displayError = function(err) {
    console.log('Websocketerror: ' + err);
};
