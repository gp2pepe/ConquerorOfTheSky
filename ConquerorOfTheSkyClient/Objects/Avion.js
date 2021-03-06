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
		this.body.setMaxSpeed(500);        
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
        this.lastFired = 0;
    }

    moverAvion(msg){     
        
		var angle = Phaser.Math.Angle.BetweenPoints(this, msg);
        this.rotation = angle;	
		this.scene.physics.velocityFromRotation(angle, this.velocidad, this.body.velocity);
		this.setActive(true);
		this.setVisible(true);
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
