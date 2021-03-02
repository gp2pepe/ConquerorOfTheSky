import Play from '../Scenes/Play.js';

class Avion extends Phaser.GameObjects.Sprite {
	
	/**
	 * Constructor.
	 */
	constructor(config) {

		// Constructor de Phaser.GameObjects.Sprite
		super(config.scene, config.x, config.y, 'Nieuport_28C1').setScale(.05);
        this.scene = config.scene;
		this.scene.physics.world.enable(this);
        this.scene.add.existing(this);
		this.body.setMaxSpeed(100);        
		this.body.setCollideWorldBounds(true);
        this.vidaAvion = 100;    
        this.focus=false;   
        this.altitud='Baja';
        this.lastFired=0;
        this.combustible = 2000;
        this.xInicial = config.x;
        this.yInicial = config.y;
        this.cargarbomba=false;
        this.cargarCombustible=false; 
    }

    moverAvion(msg){     
           
        var distanciaX = Math.abs(msg.x - this.x);
        var distanciaY = Math.abs(msg.y - this.y);
        this.rotation = Math.atan2(msg.y - this.y, msg.x - this.x);  
    
        if(msg.x >  this.x){
            this.body.setVelocityX(0);
            this.body.setVelocityX(distanciaX);
        }else{
            this.body.setVelocityX(0);
            this.body.setVelocityX(-distanciaX);
        }
    
        if(msg.y >  this.y){
            this.body.setVelocityY(0);
            this.body.setVelocityY(distanciaY);
        }else{
            this.body.setVelocityY(0);
			this.body.setVelocityY(-distanciaY);  
        }
    }

    combustibleMenos1()
    {
        this.combustible-=1;
        console.log(this.combustible);
        if (avion_1.combustible === 0)
        {
            timedEvent.remove(false);
        }
    }
}

export default Avion ;