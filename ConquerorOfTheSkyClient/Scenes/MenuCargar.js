import { config } from '../lib/main.js';
var textEntry;
var textEntry2;
var selected;


class MenuCargar extends Phaser.Scene
{
    /**
	 * Constuctor.
	 */
    
	constructor() {
		super({key: 'MenuCargar'});        
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
		var ingresoTexto2 = false;

		this.add.image(650,350, 'fondoCargar').setOrigin(0);
		this.add.text(780,370, 'Cargar Partida', { font: 'bold 40px Courier', fill: '#333' });

		this.textBox = this.add.image(770,450, 'textBox').setOrigin(0).setScale(0.5);
        this.text = this.add.text(820, 470, 'Ingrese el identificador', { font: '30px Arial', fill: '#474747' }).setInteractive();
		textEntry = this.add.text(820, 470, '', { font: '30px Arial', fill: '#474747' });

		this.text.on(Phaser.Input.Events.POINTER_DOWN, () => {
            this.add.tween({
                targets: this.text,
                ease: 'Bounce.easeIn',
                x:800,
                duration: 100,
                onComplete: () => {
                    ingresoTexto = true;
                    this.text.destroy();
					selected = textEntry;

                }
            });

            this.add.tween({
                targets: [ this.pointsText, this.bestPointsText ],                
                y: 400,
                duration: 1000
            });
        });



		this.textBox2 = this.add.image(770,560, 'textBox').setOrigin(0).setScale(0.5);
        this.text2 = this.add.text(820, 580, 'Ingrese la contraseña', { font: '30px Arial', fill: '#474747' }).setInteractive();
		textEntry2 = this.add.text(820, 580, '', { font: '30px Arial', fill: '#474747' });

		this.text2.on(Phaser.Input.Events.POINTER_DOWN, () => {
            this.add.tween({
                targets: this.text2,
                ease: 'Bounce.easeIn',
                x:800,
                duration: 100,
                onComplete: () => {
                    ingresoTexto2 = true;
                    this.text2.destroy();
					selected = textEntry2;

                }
            });

            this.add.tween({
                targets: [ this.pointsText, this.bestPointsText ],                
                y: 400,
                duration: 1000
            });
        });

		this.input.keyboard.on('keydown', function (event) {
			if(ingresoTexto2 == true || ingresoTexto == true){
				if (event.keyCode === 8 && selected.text.length > 0)
				{
					selected.text = selected.text.substr(0, selected.text.length - 1);
				}
				else if (event.keyCode === 32 || (event.keyCode >= 48 && event.keyCode < 90))
				{
					selected.text += event.key;
				}
			}
		});

        this.alerta = this.add.text(810, 680, '', { font: 'bold 24px Courier', fill: '#080808' });
		this.cargar = this.add.text(990,730, 'Cargar', { font: 'bold 32px Courier', fill: '#333' }).setInteractive();
		this.cargar.on(Phaser.Input.Events.POINTER_DOWN, () => {
            if(ingresoTexto == false || ingresoTexto2 == false){
                this.alerta.setText('Ingrese los datos'); 
            }else{
				config.Partida.tipoPartida = "cargarPartida";
            	config.Partida.recuperarPartida(textEntry.text, textEntry2.text);
				//this.guardando = this.add.image(820,535, 'guardando').setOrigin(0).setScale(1.3);

        	}
        });

		this.cancelar =this.add.text(800,730, 'Cancelar', { font: 'bold 32px Courier', fill: '#333' }).setInteractive();
		this.cancelar.on(Phaser.Input.Events.POINTER_DOWN, () => {
			this.scene.setVisible(false, this);

        });
	}

	update(){

		if(config.Partida.estado=="Preparado"){
            this.scene.remove('MenuCargar');
            this.scene.remove('MenuInicial');
            this.scene.remove('MenuBando');
            this.scene.start('Play');
			config.Partida.estado = "Pausado";
            this.scene.launch('EsperandoContrincante');
			
		}
		//Manejo los errores que vienen de backend
		if(config.Partida.hayError){
			if(config.Partida.mensajeError=="No existe una partida con esa contraseña" || config.Partida.mensajeError=="No existe la partida "){
				this.cargar.destroy();
				this.cargar.destroy();
				this.textBox.destroy();
				this.text.destroy();
				textEntry.destroy();
				this.textBox2.destroy();
				this.text2.destroy();
				textEntry2.destroy();
				this.alerta.setY(570);
				this.alerta.setX(780);
				this.alerta.setText("ERROR: " + config.Partida.mensajeError); 
				this.cancelar.setX(900);
				this.cancelar.setText("Volver");
				config.Partida.mensajeError = "";
				config.Partida.hayError = false;

			}

		}
	}

}





export default MenuCargar;