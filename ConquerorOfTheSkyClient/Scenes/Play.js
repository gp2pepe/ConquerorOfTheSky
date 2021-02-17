import Avion from '../Objects/Avion.js';
import Bullet from '../Objects/Bullet.js';
import { config } from '../lib/main.js';

var avion;
var cursors;
var bullets;
var circle;

class Play extends Phaser.Scene {

    constructor(){
        super({key: 'Play'});
        this.bullets;
    }

    create(){ 
        this.add.image(0, 0, "fondoMapa").setOrigin(0);
        this.add.image(433, 46, "mapa_1").setOrigin(0); 
               
        // Personaje
        avion = new Avion({
            scene: this,
            x: 100,
            y: 100            
        });
        cursors = this.input.keyboard.createCursorKeys(); 
        config.Partida.avion = avion;
        this.input.on('pointerdown',this.onObjectClicked); 
        
        circle = this.add.circle(avion.x, avion.y, 100 , 0xffffff, 0.2); 
        
        //Bullets
        bullets = this.add.group({
            classType: Bullet,
            maxSize: 10,
            runChildUpdate: true
        });
        this.input.keyboard.on('keydown-SPACE', this.disparar);   
    }

    onObjectClicked(pointer)
    {  
        avion.moverAvion({x: pointer.x, y: pointer.y});
        config.Partida.sincronizarAvion({x: pointer.x, y: pointer.y});
    }
    
    disparar()
    {        
        var bullet = bullets.get();
        if (bullet)
        {
            bullet.fire(avion);            
        }
    }

    update(time,delta)
	{ 
       circle.setPosition(avion.x, avion.y);        
	}
}


export  default Play;