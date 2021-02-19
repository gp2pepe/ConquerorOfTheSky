import Avion from '../Objects/Avion.js';
import Bullet from '../Objects/Bullet.js';
import { config } from '../lib/main.js';

var avion;
var avion_1;
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
        var mapa = this.add.image(433, 46, "mapa_2").setOrigin(0).setScale(1); 
        //opacidad
        mapa.alpha = 1.2;

        //Seccion donde se randomizara la posicion de la base y se agregara al mapa
        var opcion1 = [550,160,520,180,520,130,570,150];
        var opcion2 = [550,500,520,520,520,470,570,490];
        var opcion3 = [550,860,520,880,520,830,570,850];
        var opcion4 = [700,980,670,1000,670,950,720,970];
        var opcion5 = [700,130,670,150,670,100,720,120];
        var opcion6 = [800,800,770,820,770,770,820,790];
        
var numero = Phaser.Math.Between(1,6);

console.log(numero);

	switch (numero)
	{
		case 1:       
				this.posicionAleatoria(opcion1);
				break;
		case 2:
                this.posicionAleatoria(opcion2);
				break; 
		case 3:
                this.posicionAleatoria(opcion3);
				break;
		case 4: 
                this.posicionAleatoria(opcion4);
				break;
		case 5:
                this.posicionAleatoria(opcion5);
				break;
		case 6:
                this.posicionAleatoria(opcion6);
				break;
	} 
        avion = new Avion({
            scene: this,
            x: 100,
            y: 100                     
        });
        
     
        // Personaje
        avion_1 = new Avion({
            scene: this,
            x: 200,
            y: 200                   
        }).setInteractive();
        

        var avion_2 = new Avion({
            scene: this,
            x: 300,
            y: 300            
        });

     /*   if (config.Partida.Bando==1)
            avion_2.setVisible(false);
        else
            avion_1.setVisible(false);*/
        avion_1.on('clicked', this.clickHandler, this);
            
        this.input.on('gameobjectup', function (pointer, gameObject)
        {
            gameObject.emit('clicked', gameObject);
        }, this);
 

        cursors = this.input.keyboard.createCursorKeys(); 
        config.Partida.avion = avion;
        config.Partida.avion_1 = avion_1;
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

    clickHandler (avion_1)
    {        
        avion_1.focus=true;
        console.log(avion_1.focus);
    }

    onObjectClicked(pointer)
    {     
        if (avion_1.focus==true)
        {            
            config.Partida.idavion=1;
            avion_1.moverAvion({x: pointer.x, y: pointer.y});
            config.Partida.sincronizarAvion({x: pointer.x, y: pointer.y});
        }   
    }
    
    disparar()
    {        
        var bullet = bullets.get();
        if (bullet)
        {
            bullet.fire(avion);            
        }
    }

    posicionAleatoria (Array)
    {	
	    this.add.image(Array[0], Array[1], 'muralla').setScale(.65);
	    this.add.image(Array[2], Array[3], 'contenedor').setScale(.40);
	    this.add.image(Array[4], Array[5], 'deposito').setScale(.40);
        this.add.image(Array[6], Array[7], 'torre').setScale(.450);
    }
    


    update(time,delta)
	{ 
       circle.setPosition(avion.x, avion.y);      
	}
}


export  default Play;