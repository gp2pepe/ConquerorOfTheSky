import { config } from '../../lib/main.js';
var timedEvent;

class Guardar extends Phaser.Scene
{
    /**
	 * Constuctor.
	 */
    
	constructor() {
		super({key: 'Guardar'});        
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
		var ingresoTexto = false;
		//this.Guardando = this.add.image(900,550, "guardando").setOrigin(0).setScale(1); 
		this.add.image(720,450, 'fondoGuardar').setOrigin(0);
		this.add.text(850,470, 'Guardar Partida', { font: 'bold 40px Courier', fill: '#333' });

		this.textBox = this.add.image(840,550, 'textBox').setOrigin(0).setScale(0.5);
        this.text = this.add.text(880, 570, 'Ingrese una contraseña', { font: '30px Arial', fill: '#474747' }).setInteractive();
		this.text.on(Phaser.Input.Events.POINTER_DOWN, () => {
            this.add.tween({
                targets: this.text,
                ease: 'Bounce.easeIn',
                x:830,
                duration: 100,
                onComplete: () => {
                    ingresoTexto = true;
                    this.text.destroy();
                }
            });

            this.add.tween({
                targets: [ this.pointsText, this.bestPointsText ],                
                y: 400,
                duration: 1000
            });
        });
		var textEntry = this.add.text(880, 570, '', { font: '30px Arial', fill: '#474747' });

        this.input.keyboard.on('keydown', function (event) {
            if(ingresoTexto == true){
                if (event.keyCode === 8 && textEntry.text.length > 0)
                {
                    textEntry.text = textEntry.text.substr(0, textEntry.text.length - 1);
                }
                else if (event.keyCode === 32 || (event.keyCode >= 48 && event.keyCode < 90))
                {
                    textEntry.text += event.key;
                }
            }
        });

        var alerta = this.add.text(880, 640, '', { font: 'bold 24px Courier', fill: '#080808' });
		this.guardar = this.add.text(1060,670, 'Guardar', { font: 'bold 32px Courier', fill: '#333' }).setInteractive();
		this.guardar.on(Phaser.Input.Events.POINTER_DOWN, () => {
            if(ingresoTexto == false){
                alerta.setText('Ingrese una contraseña'); 
            }else{
				config.Partida.guardarPartida(textEntry.text);
				this.add.image(820,535, 'guardando').setOrigin(0).setScale(1.3);

        	}
        });

		this.cancelar =this.add.text(870,670, 'Cancelar', { font: 'bold 32px Courier', fill: '#333' }).setInteractive();
		this.cancelar.on(Phaser.Input.Events.POINTER_DOWN, () => {
    		config.Partida.estado="Jugando";
			this.scene.setVisible(false, this);
			config.Partida.sincronizar({tipoOp:"sincronizarPausa", estado:"Activar"});
			this.scene.resume("Play");
        });
	}

	update(){

		if(config.Partida.estado=="Preparado"){
			config.Partida.estado="Jugando";
			this.scene.setVisible(false, this);
			config.Partida.sincronizar({tipoOp:"sincronizarPausa", estado:"Activar"});
			this.scene.resume("Play");
		}
		//Manejo los errores que vienen de backend
		if(config.Partida.hayError){
			if(config.Partida.mensajeError=="Hubo un error al guardar la partida"){
				//Falta mostrar un mensaje de error

				this.scene.resume("Play");

			}

		}
	}

}





export  default Guardar;