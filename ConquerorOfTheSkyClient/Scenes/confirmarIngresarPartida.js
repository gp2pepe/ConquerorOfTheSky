import { config } from '../lib/main.js';

class confirmarIngresarPartida extends Phaser.Scene
{
    /**
	 * Constuctor.
	 */
    
	constructor() {
		super({key: 'confirmarIngresarPartida'});        
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
    this.confirmarIngresarPartida = this.add.image(500,650, "confirmarNuevaPartida").setOrigin(0).setScale(0.5).setInteractive(); 
    this.confirmarIngresarPartida.on(Phaser.Input.Events.POINTER_DOWN, () => {
        this.scene.remove('MenuInicial');
        this.scene.remove('MenuPartidas');
        this.scene.start('Play');
    });

}




}
export  default confirmarIngresarPartida;