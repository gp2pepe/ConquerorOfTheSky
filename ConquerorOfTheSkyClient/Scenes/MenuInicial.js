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
        this.fondoMenu = this.add.image(0, 0, "fondoMenu").setOrigin(0).setInteractive();
        this.add.image(900, 50, "titulo").setOrigin(0);
        this.sonido_fondo = this.sound.add('fondo_menu',{loop:false,volume:0.02});
        this.sonido_fondo.resume();
        console.log('antes del sonido');
        console.log(this.sonido_fondo);
        this.fondoMenu.on(Phaser.Input.Events.POINTER_DOWN, () =>{
            this.sonido_fondo.play();
        })

        //Se carga imagen interactiva de Nueva Partida
        this.nuevaPartida = this.add.image(1050,250,'nuevaPartida'
        ).setOrigin(0).setScale(0.8).setInteractive();
        //Evento de la imagen Nueva Partida
        this.nuevaPartida.on(Phaser.Input.Events.POINTER_DOWN, () => {
            this.add.tween({
                targets: this.nuevaPartida,
                ease: 'Bounce.easeIn',
                x:1070,
                duration: 1000,
                onComplete: () => {
                    this.scene.launch('MenuBando');
                }
            });

            this.add.tween({
                targets: [ this.pointsText, this.bestPointsText ],                
                y: 400,
                duration: 1000
            });
            this.sonido_fondo.play();
        });

        //Se carga imagen interactiva de Buscar Partida
        this.buscarPartida = this.add.image(1050,450,'buscarPartida'
        ).setOrigin(0).setScale(0.8).setInteractive();
        this.buscarPartida.on(Phaser.Input.Events.POINTER_DOWN, () => {
            this.add.tween({
                targets: this.buscarPartida,
                ease: 'Bounce.easeIn',
                x:1070,
                duration: 1000,
                onComplete: () => {   
                    config.Partida.listarPartidas(); //Hacer luego un boton refresh            
                   // this.scene.launch('MenuPartidas');
                }
            });

            this.add.tween({
                targets: [ this.pointsText, this.bestPointsText ],                
                y: 400,
                duration: 1000
            });
            this.sonido_fondo.play();
        });

         //Se carga imagen interactiva de Buscar Partida
         this.cargarPartida = this.add.image(1050,650,'cargarPartida'
         ).setOrigin(0).setScale(0.8).setInteractive();

         this.cargarPartida.on(Phaser.Input.Events.POINTER_DOWN, () => {
            this.add.tween({
                targets: this.cargarPartida,
                ease: 'Bounce.easeIn',
                x:1070,
                duration: 1000,
                onComplete: () => {    
                    this.scene.launch('MenuCargar');
                }
            });

            this.add.tween({
                targets: [ this.pointsText, this.bestPointsText ],                
                y: 400,
                duration: 1000
            });
            this.sonido_fondo.play();
        });
    }
    update(){     
        if(config.Partida.listaCargada)
         this.scene.start('MenuPartidas');
    }
}
export  default MenuInicial;