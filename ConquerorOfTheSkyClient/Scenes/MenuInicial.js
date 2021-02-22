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



        this.logoMenu = this.add.image(1050,300,'nuevaPartida'
        ).setOrigin(0).setScale(0.8).setInteractive();
        
        this.logoMenu.on(Phaser.Input.Events.POINTER_DOWN, () => {
            this.add.tween({
                targets: this.logoMenu,
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

        this.logoMenu_2 = this.add.image(1050,600,'nuevaPartida_2'
        ).setOrigin(0).setScale(0.8).setInteractive();
        
        this.logoMenu_2.on(Phaser.Input.Events.POINTER_DOWN, () => {
            this.add.tween({
                targets: this.logoMenu_2,
                ease: 'Bounce.easeIn',
                x:1300,
                duration: 1000,
                onComplete: () => {
                    config.Partida.ingresarAPartida();      
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
    }
    update(){
       

    }
}
export  default MenuInicial;