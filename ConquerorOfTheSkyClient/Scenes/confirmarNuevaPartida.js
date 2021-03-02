import { config } from '../lib/main.js';

class confirmarNuevaPartida extends Phaser.Scene
{
    /**
	 * Constuctor.
	 */
    
	constructor() {
		super({key: 'confirmarNuevaPartida'});        
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

	this.add.image(0,0, 'desenfocar').setOrigin(0);
    this.crearNuevaPartida = this.add.image(670,500, "confirmarNuevaPartida").setOrigin(0).setScale(0.9).setInteractive(); 
    this.crearNuevaPartida.on(Phaser.Input.Events.POINTER_DOWN, () => {
        this.scene.remove('MenuInicial');
        this.scene.remove('MenuBando');
        this.scene.start('Play');
    });

}




}
export  default confirmarNuevaPartida;