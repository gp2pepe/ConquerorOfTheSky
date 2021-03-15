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
		this.fondo = this.add.image(900,550, "fondoGuardar").setOrigin(0).setScale(1);
		this.menuInicial =this.add.text(1082,770, 'Menu Inicial', { font: 'bold 32px Courier', fill: '#333' }).setInteractive();
		this.partidaPausada =this.add.text(1000,620, 'Partida Pausada', { font: 'bold 32px Courier', fill: '#333' }).setScale (1.5);
		this.menuInicial.on(Phaser.Input.Events.POINTER_DOWN, () => {
			location.reload();
		});
	}

	update(){
		if(config.Partida.estado=="Jugando"){
			this.scene.setVisible(false, this);
			this.scene.resume("Play");
		}
		else
		if (config.Partida.hayError)
		{	
			if (config.Partida.mensajeError == 'Se desconecto un jugador')
			this.scene.remove('Play');
			this.scene.launch('WinHuida');
		}
	}

}




export  default Pausado;