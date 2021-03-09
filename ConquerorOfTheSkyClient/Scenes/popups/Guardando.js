import { config } from '../../lib/main.js';
var timedEvent;

class Guardando extends Phaser.Scene
{
    /**
	 * Constuctor.
	 */
    
	constructor() {
		super({key: 'Guardando'});        
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
		this.Guardando = this.add.image(900,550, "guardando").setOrigin(0).setScale(1); 
		timedEvent = this.time.delayedCall(4000, onEvent, [], this);

	}

	update(){
		//Manejo los errores que vienen de backend
		if(config.Partida.hayError){
			if(config.Partida.mensajeError=="Hubo un error al guardar la partida"){
				//Falta mostrar un mensaje de error

				this.scene.resume();

			}

		}
	}

}

function onEvent ()
{
	this.scene.setVisible(false, this);
	
}



export  default Guardando;