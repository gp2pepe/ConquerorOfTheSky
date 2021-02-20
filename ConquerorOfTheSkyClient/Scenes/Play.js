import Avion from '../Objects/Avion.js';
import Bullet from '../Objects/Bullet.js';
import { config,game } from '../lib/main.js';

var avion_1;
var avion_2;
var avion_3;
var avion_4;
var cursors;
var bullets;
var circle;
var bullet;

class Play extends Phaser.Scene {

    constructor(){
        super({key: 'Play'});
        this.bullets;
    }

    create(){ 
        this.add.image(0, 0, "fondoMapa").setOrigin(0);
        var mapa = this.add.image(433, 46, "mapa_2").setOrigin(0).setScale(1); 
        this.wall_floor = this.physics.add.staticGroup();

        this.wall_floor.create(433, 46, 'wall')
            .setOrigin(0);
        this.wall_floor.create(1878, 46, 'wall')
            .setOrigin(1, 0)
            .setFlipX(true);
        
        this.wall_floor.create(433, 1077, 'floor')
            .setOrigin(0, 1);

        this.wall_floor.refresh();

        //opacidad
        mapa.alpha = 0.4;

        //Seccion donde se randomizara la posicion de la base y se agregara al mapa
        var opcion1 = [550,160,520,180,520,130,570,150];
        var opcion2 = [550,500,520,520,520,470,570,490];
        var opcion3 = [550,860,520,880,520,830,570,850];
        var opcion4 = [700,980,670,1000,670,950,720,970];
        var opcion5 = [700,130,670,150,670,100,720,120];
        var opcion6 = [800,800,770,820,770,770,820,790];
        
    var numero = Phaser.Math.Between(1,6);

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
            
     
        // Personaje
        avion_1 = new Avion({
            scene: this,
            x: 500,
            y: 200                             
        }).setInteractive();
        this.circle = this.add.circle(avion_1.x, avion_1.y, 100 , 0xffffff, 0.2)  

        avion_2 = new Avion({
            scene: this,
            x: 500,
            y: 400            
        }).setInteractive();

        avion_3 = new Avion({
            scene: this,
            x: 500,
            y: 600            
        }).setInteractive();

        avion_4 = new Avion({
            scene: this,
            x: 500,
            y: 800            
        }).setInteractive();

     /*   if (config.Partida.Bando==1)
            avion_2.setVisible(false);
        else
            avion_1.setVisible(false);*/
        this.input.keyboard.on('keydown',(evento)=>{
            if (evento.key==='1')  
            {    
                avion_1.focus=true;
                avion_2.focus=false;
                avion_3.focus=false;
                avion_4.focus=false;
            }
            if (evento.key==='2')  
            {    
                avion_2.focus=true;
                avion_1.focus=false;
                avion_3.focus=false;
                avion_4.focus=false;
            }
            if (evento.key==='3')  
            {    
                avion_3.focus=true;
                avion_1.focus=false;
                avion_2.focus=false;
                avion_4.focus=false;
            }
            if (evento.key==='4')  
            {    
                avion_4.focus=true;
                avion_1.focus=false;
                avion_2.focus=false;
                avion_3.focus=false;
            }        
        }); 

        cursors = this.input.keyboard.createCursorKeys(); 
        config.Partida.avion_1 = avion_1;
        config.Partida.avion_2 = avion_2;
        config.Partida.avion_3 = avion_3;
        config.Partida.avion_4 = avion_4;
        this.input.on('pointerdown',this.onObjectClicked);         
        
        
        //Bullets
        bullets = this.add.group({
            classType: Bullet,
            maxSize: 10,
            runChildUpdate: true
        });
       // bullets = this.physics.add.group();
        this.input.keyboard.on('keydown-SPACE', this.disparar);         
        this.physics.add.collider([avion_1,avion_2,this.wall_floor]);
       
        console.log(bullets);
        this.physics.add.collider(avion_1,bullets, ()=>
        {
            avion_1.vidaAvion-=10;
           // this.destroySprite(bullets[1]);
           bullets.remove(bullets.getLast(true),true);
            console.log(avion_1.vidaAvion);
        });  
    }

    onObjectClicked(pointer)
    {  
        if (avion_2.focus==true)
        {            
            config.Partida.idavion=2;
            avion_2.moverAvion({x: pointer.x, y: pointer.y});
            config.Partida.sincronizarAvion({x: pointer.x, y: pointer.y});
        } 

        if (avion_1.focus==true)
        {            
            config.Partida.idavion=1;
            avion_1.moverAvion({x: pointer.x, y: pointer.y});
            config.Partida.sincronizarAvion({x: pointer.x, y: pointer.y});
        }   
         if (avion_3.focus==true)
        {            
            config.Partida.idavion=3;
            avion_3.moverAvion({x: pointer.x, y: pointer.y});
            config.Partida.sincronizarAvion({x: pointer.x, y: pointer.y});
        }  
         if (avion_4.focus==true)
        {            
            config.Partida.idavion=4;
            avion_4.moverAvion({x: pointer.x, y: pointer.y});
            config.Partida.sincronizarAvion({x: pointer.x, y: pointer.y});
        }  
    }
    
    disparar()
    {   
        bullet = bullets.get();
        if (bullet)
        {
            if (avion_2.focus==true)
            {            
                bullet.fire(avion_2);   
            } 

            if (avion_1.focus==true)
            {            
                bullet.fire(avion_1);      
            }  
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
       this.circle.setPosition(avion_1.x, avion_1.y);  
       if(avion_1.vidaAvion == 0) 
       avion_1.destroy();  
       if(avion_2.vidaAvion == 0) 
       avion_2.destroy();  
       if(avion_3.vidaAvion == 0) 
       avion_3.destroy();  
       if(avion_4.vidaAvion == 0) 
       avion_4.destroy();   
	}
}


export  default Play;