import { config } from '../../lib/main.js';
var timedEvent;

class ContraIncorrecta extends Phaser.Scene
{
    /**
	 * Constuctor.
	 */
    
	constructor() {
		super({key: 'ContraIncorrecta'});        
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
		this.mensaje = this.add.text(980,800, "La contraseña es incorrecta").setOrigin(0).setScale(3.2).setInteractive(); 
		config.Partida.hayError=false;
		config.Partida.mensajeError="";
		timedEvent = this.time.delayedCall(2000, onEvent, [], this);
	}

}

function onEvent ()
{
	this.scene.setVisible(false, this);
}
export  default ContraIncorrecta;