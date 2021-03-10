import { config } from '../../lib/main.js';
var timedEvent;

class Pausado extends Phaser.Scene
{
    /**
	 * Constuctor.
	 */
    
	constructor() {
		super({key: 'Pausado'});        
	}

	/**
	 * Pre-carga de recursos.
	 */
	preload() {
		
	}
	
	/**
	 * Creación de la escena.
	 */

    create() 
    {   
		this.Pausado = this.add.image(900,550, "pausado").setOrigin(0).setScale(1); 

	}

	update(){
		if(config.Partida.estado=="Jugando"){
			this.scene.setVisible(false, this);
			this.scene.resume("Play");
		}
	}

}




export  default Pausado;