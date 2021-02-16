import Avion from '../Objects/Avion.js';
import Bullet from '../Objects/Bullet.js';
import { game } from '../lib/main.js';
import Client from '../lib/websocket.js';

var punteroX;
var punteroY;
var avion;
var cursors;
var bullets;
var lastFired = 0;
var circle;
var myText = null;

class Play extends Phaser.Scene {
    constructor(){
        super({key: 'Play'});
        this.bullets;
    }
    //luego voy a crear la scene UI como una capa arriba de la scene play
    /*init() {
        console.log('Se ha iniciado la escena Play');
        this.scene.launch('UI');
    }*/
    create(){
        game.Client = new Client();
        game.Client.openConnection();        
        myText = this.add.text(0, 0, "started (not yet connected)", { font: "14px Arial", fill: "#ff0044"}).setDepth(2);
        if (game.Client.isConnected())
            myText =   this.add.text(0, 0, "conectado", { font: "14px Arial", fill: "#ff0044"}).setDepth(2);
        this.add.image(0, 0, "fondoMapa").setOrigin(0);
        this.add.image(433, 46, "mapa_1").setOrigin(0);        
        // Personaje
        avion = new Avion({
            scene: this,
            x: 100,
            y: 100            
        });
        this.input.on('pointerdown',this.onObjectClicked); 

        circle = this.add.circle(avion.x, avion.y, 100 , 0xffffff, 0.2); 

        //Bullets
        bullets = this.add.group({
            classType: Bullet,
            maxSize: 10,
            runChildUpdate: true
        });
        cursors = this.input.keyboard.createCursorKeys();       
    }
    
    moverAvion(msg){ 
        distanciaX = Math.abs(msg.x - avion.x);
        distanciaY = Math.abs(msg.y - avion.y);
        avion.rotation = Math.atan2(msg.y - avion.y, msg.x - avion.x);  
    
        if(msg.x >  avion.x){
            avion.setVelocityX(0);
            avion.setVelocityX(100*(distanciaX/100));
        }else{
            avion.setVelocityX(0);
            avion.setVelocityX(-100*(distanciaX/100));
        }
    
        if(msg.y >  avion.y){
            avion.setVelocityY(0);
            avion.setVelocityY(100*(distanciaY/100));
        }else{
            avion.setVelocityY(0);
            avion.setVelocityY(-100*(distanciaY/100));  
        }
    }

    onObjectClicked(pointer)
    {  
        punteroX=pointer.x;
        punteroY=pointer.y;
      
       // moverAvion({x: pointer.x, y: pointer.y}, avion);
       // sincronizarAvion({x: pointer.x, y: pointer.y});
    }
    

    
    sincronizarAvion(msg){
        if (game.client.isConnected()) {        
            game.client.ws.send(JSON.stringify({x: msg.x, y: msg.y}));
        }
    }
    update(time, delta) {
      
        //this.Avion.update();
    }
/*
    //Mover avion y sincronizar su posicion
    moverYsincronizar(pointer)
    {  
        punteroX=pointer.x;
        punteroY=pointer.y;
        
        var distanciaX = Math.abs(pointer.x - avion.body.x);
        var distanciaY = Math.abs(pointer.y - avion.body.y);

        avion.rotation = Math.atan2(pointer.y - avion.body.y, pointer.x - avion.body.x); 
    
        if(pointer.x >  avion.body.x){
            avion.body.setVelocityX(0);
            avion.body.setVelocityX(100*(distanciaX/100));
        }else{
            avion.body.setVelocityX(0);
            avion.body.setVelocityX(-100*(distanciaX/100));
        }
    
        if(pointer.y >  avion.body.y){
            avion.body.setVelocityY(0);
            avion.body.setVelocityY(100*(distanciaY/100));
        }else{
            avion.body.setVelocityY(0);
            avion.body.setVelocityY(-100*(distanciaY/100));  
        }  
        //Sincronizar
        if (game.Client.isConnected()) {        
            game.Client.ws.send(JSON.stringify({x: pointer.x, y: pointer.y}));
        }      
        // sincronizarAvion({x: pointer.x, y: pointer.y});
    }*/
    
    update(time,delta)
	{
        if (cursors.up.isDown && time > lastFired)
        {
            var bullet = bullets.get();
            if (bullet)
            {
                bullet.fire(avion);
                lastFired = time + 50;
            }
        }
        circle.setPosition(avion.x, avion.y);        
	}
}


export  default Play;