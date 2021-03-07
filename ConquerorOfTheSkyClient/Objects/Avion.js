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
        this.activarColision=0;
        this.tengobomba=false;
    }

    moverAvion(msg)
    {             
		var angle = Phaser.Math.Angle.BetweenPoints(this, msg);
        this.rotation = angle;	
		this.scene.physics.velocityFromRotation(angle, this.velocidad, this.body.velocity);
		this.setActive(true);
		this.setVisible(true);
    }

    calcularVelocidad(velocidad)
    {
        if (this.altitud == "Baja")
            if (this.tengobomba)
                return velocidad/2;
            else
                return velocidad
        if (this.altitud == "Alta")
            if (this.tengobomba)
                return velocidad/4;
            else
                return velocidad/2;
    }
}

export default Avion ;
