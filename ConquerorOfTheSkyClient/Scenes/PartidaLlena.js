import { config } from '../lib/main.js';
var timedEvent;

class PartidaLlena extends Phaser.Scene
{
    /**
	 * Constuctor.
	 */
    
	constructor() {
		super({key: 'PartidaLlena'});        
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
		this.PartidaLlena = this.add.image(600,550, "partidaLlena").setOrigin(0).setScale(1).setInteractive(); 
		config.Partida.hayError=false;
		config.Partida.mensajeError="";
		timedEvent = this.time.delayedCall(2000, onEvent, [], this);

	}

}

function onEvent ()
{
	this.scene.setVisible(false, this);
}
export  default PartidaLlena;