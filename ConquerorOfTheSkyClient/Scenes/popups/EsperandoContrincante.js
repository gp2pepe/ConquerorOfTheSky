import { config } from '../../lib/main.js';
var timedEvent;

class EsperandoContrincante extends Phaser.Scene
{
    /**
	 * Constuctor.
	 */
    
	constructor() {
		super({key: 'EsperandoContrincante'});        
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
		this.EsperandoContrincante = this.add.image(900,550, "esperandoContrincante").setOrigin(0).setScale(1); 

	}

	update(){
		if(config.Partida.estado=="Jugando"){
			this.scene.setVisible(false, this);
			this.scene.resume("Play");
		}
	}

}




export  default EsperandoContrincante;