import { config } from '../../lib/main.js';
var textEntry;

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
		textEntry = this.add.text(880, 570, '', { font: '30px Arial', fill: '#474747' });

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

        this.alerta = this.add.text(880, 640, '', { font: 'bold 24px Courier', fill: '#080808' });
		this.guardar = this.add.text(1060,670, 'Guardar', { font: 'bold 32px Courier', fill: '#333' }).setInteractive();
		this.guardar.on(Phaser.Input.Events.POINTER_DOWN, () => {
            if(ingresoTexto == false){
                this.alerta.setText('Ingrese una contraseña'); 
            }else{
				config.Partida.guardarPartida(textEntry.text);
				this.guardando = this.add.image(820,535, 'guardando').setOrigin(0).setScale(1.3);
        	}
        });

		this.cancelar =this.add.text(870,670, 'Cancelar', { font: 'bold 32px Courier', fill: '#333' }).setInteractive();
		this.cancelar.on(Phaser.Input.Events.POINTER_DOWN, () => {
    		config.Partida.estado="Jugando";
			this.scene.setVisible(false, this);
			config.Partida.sincronizar({tipoOp:"sincronizarPausa", estado:"Activar"});
			this.scene.resume("Play");
        });

		this.menuInicial =this.add.text(1060,670, 'Menu Inicial', { font: 'bold 32px Courier', fill: '#333' }).setInteractive();
		this.menuInicial.setVisible(false);
		this.menuInicial.on(Phaser.Input.Events.POINTER_DOWN, () => {
			window.location = window.location;
		});
	}

	update(){

		if(config.Partida.estado=="Preparado"){
			this.guardar.destroy();
			this.guardando.destroy();
			this.textBox.destroy();
        	this.text.destroy();
			textEntry.destroy();
			this.alerta.setY(570);
			this.alerta.setX(850);
			this.alerta.setText('Partida guardada id : ' + config.Partida.nroPartida); 
			this.cancelar.setX(820);
			this.cancelar.setText("Volver");
			this.menuInicial.setVisible(true);

		}
		//Manejo los errores que vienen de backend
		if(config.Partida.hayError){
			if(config.Partida.mensajeError=="Hubo un error al guardar" || config.Partida.mensajeError=="La partida no esta disponible"){
				this.guardar.destroy();
				this.guardando.destroy();
				this.textBox.destroy();
				this.text.destroy();
				textEntry.destroy();
				this.alerta.setY(570);
				this.alerta.setX(850);
				this.alerta.setText("ERROR: " + config.Partida.mensajeError); 
				this.cancelar.setX(970);
				this.cancelar.setText("Volver");
				
			}

		}
	}

}





export  default Guardar;