import Avion from '../Objects/Avion.js';
import Bullet from '../Objects/Bullet.js';
import { config } from '../lib/main.js';

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

    create(){
               
        myText = this.add.text(0, 0, "started (not yet connected)", { font: "14px Arial", fill: "#ff0044"}).setDepth(2);
        if (config.WebSocket.isConnected())
            myText.text= "conectado";   
        this.add.image(0, 0, "fondoMapa").setOrigin(0);
        this.add.image(433, 46, "mapa_1").setOrigin(0); 
        config.Part.iniciarPartida();       
        // Personaje
        avion = new Avion({
            scene: this,
            x: 100,
            y: 100            
        });
        config.Part.avion = avion;
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

    onObjectClicked(pointer)
    {  
        avion.moverAvion({x: pointer.x, y: pointer.y});
        config.Part.sincronizarAvion({x: pointer.x, y: pointer.y});
    }

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