import { config } from '../lib/main.js';

class MenuInicial extends Phaser.Scene {
	
	/**
	 * Constuctor.
	 */
    
	constructor() {
		super({key: 'MenuInicial'});        
	}
	
	/**
	 * Pre-carga de recursos.
	 */
	preload() {
		
	}
	
	/**
	 * Creación de la escena.
	 */
    
	create() {
        //Carga boton de nueva partida y dirije a la escena nueva partida
        this.add.image(0, 0, "fondoMenu").setOrigin(0);
        this.add.image(900, 100, "titulo").setOrigin(0);

        //Se carga imagen interactiva de Nueva Partida
        this.nuevaPartida = this.add.image(1050,300,'nuevaPartida'
        ).setOrigin(0).setScale(0.8).setInteractive();
        
        this.nuevaPartida.on(Phaser.Input.Events.POINTER_DOWN, () => {
            this.add.tween({
                targets: this.nuevaPartida,
                ease: 'Bounce.easeIn',
                x:1300,
                duration: 1000,
                onComplete: () => {
                    console.log('Entre iniciando partida');
                    config.Partida.iniciarPartida();
                    config.Partida.Bando=1;
                    this.scene.start('Play');
                }
            });

            this.add.tween({
                targets: [ this.pointsText, this.bestPointsText ],                
                y: 400,
                duration: 1000
            });
        });

        //Se carga imagen interactiva de Buscar Partida
        this.buscarPartida = this.add.image(1050,600,'buscarPartida'
        ).setOrigin(0).setScale(0.8).setInteractive();
        
        this.buscarPartida.on(Phaser.Input.Events.POINTER_DOWN, () => {
            this.add.tween({
                targets: this.buscarPartida,
                ease: 'Bounce.easeIn',
                x:1300,
                duration: 1000,
                onComplete: () => {   
                    config.Partida.listarPartidas(); //Hacer luego un boton refresh
                    config.Partida.Bando=0;             
                    this.scene.start('MenuPartidas');
                }
            });

            this.add.tween({
                targets: [ this.pointsText, this.bestPointsText ],                
                y: 400,
                duration: 1000
            });
        });

         //Se carga imagen interactiva de Buscar Partida
         this.cargarPartida = this.add.image(1050,800,'cargarPartida'
         ).setOrigin(0).setScale(0.8).setInteractive();

         this.cargarPartida.on(Phaser.Input.Events.POINTER_DOWN, () => {
            this.add.tween({
                targets: this.cargarPartida,
                ease: 'Bounce.easeIn',
                x:1300,
                duration: 1000,
                onComplete: () => {                       
                    config.Partida.ingresarAPartida(0);
                    config.Partida.listarPartidas(); //Hacer luego un boton refresh
                    config.Partida.Bando=0;
                    this.scene.start('Play');
                }
            });

            this.add.tween({
                targets: [ this.pointsText, this.bestPointsText ],                
                y: 400,
                duration: 1000
            });
        });
    }
    update(){     

    }
}
export  default MenuInicial;