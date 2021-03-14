import Play from '../Scenes/Play.js';
import { config } from '../lib/main.js';

class Avion extends Phaser.GameObjects.Sprite {

	/**
	 * Constructor.
	 */
	constructor(configuracion) {

		// Constructor de Phaser.GameObjects.Sprite
		super(configuracion.scene, configuracion.x, configuracion.y,'Nieuport_28C1').setScale(.05);
        this.scene = configuracion.scene;
		this.scene.physics.world.enable(this);
        this.body.setSize(300,300); 
        this.scene.add.existing(this);
		this.body.setMaxSpeed(500);        
		this.body.setCollideWorldBounds(true);
        this.body.bounce.setTo(1, 1);
        this.vidaAvion = configuracion.vidaAvion;    
        this.focus=false;   
        this.altitud=configuracion.altitud;
        this.altitud_anterior='EnBase';
        this.lastFired=0;
        this.combustible = configuracion.combustible;
        this.cargarbomba=false;
        this.cargarCombustible=false; 
        this.lastFired = 0;
        this.activarColision=0;
        this.tengobomba=false;
        this.mepegaron='false';
        this.timeNafta=550;
        this.saliBase=true;
        this.idavion= configuracion.idavion;
    }

    moverAvion(msg)
    {             
		var angle = Phaser.Math.Angle.BetweenPoints(this, msg);
        this.rotation = angle;	
		this.scene.physics.velocityFromRotation(angle, this.velocidad, this.body.velocity);
		this.setActive(true);
		this.setVisible(true);
    }

    cambiarAltitud(altitud){
        this.altitud=altitud
        
        if (altitud=='EnBase' || altitud=='Inicial')
        {
            this.setScale(0.05);
            this.velocidad = 0;
            var angle = this.rotation;	
            this.scene.physics.velocityFromRotation(angle, this.velocidad, this.body.velocity);

        }else{
            if(altitud=='Alta'){
                this.setScale(0.08);
                this.velocidad = this.calcularVelocidad();
                var angle = this.rotation;	
                this.scene.physics.velocityFromRotation(angle, this.velocidad, this.body.velocity);        
            }else{                
                this.setScale(0.05);
                this.velocidad = this.calcularVelocidad();
                var angle = this.rotation;	
                this.scene.physics.velocityFromRotation(angle, this.velocidad, this.body.velocity);
            }
        }

    }

    soltarBomba(){
        this.velocidad = this.calcularVelocidad();
        var angle = this.rotation;	
        this.scene.physics.velocityFromRotation(angle, this.velocidad, this.body.velocity);
    }


    calcularVelocidad()
    {
        var velocidad = config.Partida.configuraciones.avionVelocidad;
     
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



    toString(){
        return "{idAvion: "+ this.idavion+", posicionX:" + this.x +  ", posicionY:" + this.y + ",combustible:"+ this.combustible + ", altitud: " + this.altitud + ", bomba:"+ this.tengobomba + ",salud :" + this.vidaAvion+"}";
    }
}

export default Avion ;
