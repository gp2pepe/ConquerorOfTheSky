import { config } from '../lib/main.js';

class MenuBando extends Phaser.Scene
{
    /**
	 * Constuctor.
	 */
    
	constructor() {
		super({key: 'MenuBando'});        
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
        this.add.image(650,50, 'seleccioncarac').setOrigin(0);

    var textEntry = this.add.text(710, 180, '', { font: '32px Courier', fill: '#ffff00' });
    
    this.input.keyboard.on('keydown', function (event) {

        if (event.keyCode === 8 && textEntry.text.length > 0)
        {
            textEntry.text = textEntry.text.substr(0, textEntry.text.length - 1);
        }
        else if (event.keyCode === 32 || (event.keyCode >= 48 && event.keyCode < 90))
        {
            textEntry.text += event.key;
        }
        
    });
    
    //this.add.text(690, 520, 'Potencias Centrales', { font: '18px Arial', fill: '#0095DD' }).setScale(1.5).setInteractive();
    this.textoPotencias = this.add.text(690, 520, 'Potencias Centrales', { font: '18px Arial', fill: '#0095DD' }).setScale(1.5).setInteractive();
    this.textoAliados = this.add.text(1050, 520, 'Aliados', { font: '18px Arial', fill: '#0095DD' }).setScale(1.5).setInteractive();
    var bandoElegido; 

    // Cuando hace click en Potencias Centrales
    this.textoPotencias.on(Phaser.Input.Events.POINTER_DOWN, () => {
            this.add.tween({
                targets: this.textoPotencias,
                ease: 'Bounce.easeIn',
                x:1300,
                duration: 1000,
                onComplete: () => {
                    bandoElegido = 0;
                }
            });

            this.add.tween({
                targets: [ this.pointsText, this.bestPointsText ],                
                y: 400,
                duration: 1000
            });
        });
 // Cuando hace click en Aliados

        this.textoAliados.on(Phaser.Input.Events.POINTER_DOWN, () => {
            this.add.tween({
                targets: this.textoAliados,
                ease: 'Bounce.easeIn',
                x:1300,
                duration: 1000,
                onComplete: () => {
                    bandoElegido = 1;
                }
            });

            this.add.tween({
                targets: [ this.pointsText, this.bestPointsText ],                
                y: 400,
                duration: 1000
            });
        });

    this.crearNuevaPartida = this.add.text(820, 900, 'Crear Partida', { font: '18px Arial', fill: '#0095DD' }).setScale(2.3).setInteractive();
    this.crearNuevaPartida.on(Phaser.Input.Events.POINTER_DOWN, () => {
        //Creo la partida con el bando y el nombre seleccionado
        console.log('Entre iniciando partida en Menu Bando');
        config.Partida.Bando = bandoElegido;
        config.Partida.Nombre = textEntry.text;
        config.Partida.iniciarPartida();
        //console.log(config.Partida);
        this.scene.start('Play');
    });

}




}
export  default MenuBando;