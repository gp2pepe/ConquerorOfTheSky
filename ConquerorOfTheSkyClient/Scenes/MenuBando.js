import { config } from '../lib/main.js';
var ingresoTexto;


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
        ingresoTexto = false;
        this.add.image(0,0, 'desenfocar').setOrigin(0);
        this.add.image(650,50, 'seleccioncarac').setOrigin(0);
        this.textBox = this.add.image(750,140, 'textBox').setOrigin(0).setScale(0.5);
        this.text = this.add.text(800, 160, 'Click para ingresar nombre', { font: '16px Arial', fill: '#474747' }).setScale(1.5).setInteractive();
        this.sonidoClick = this.sound.add('sonido_click',{loop:false});
        this.sonidoConfirmar = this.sound.add('sonido_confirmar',{loop:false});
        //this.sonidoFondoPartida = this.sound.add('sonido_fondo_partida',{loop:true,volume:0.1});
        
        
    
        this.text.on(Phaser.Input.Events.POINTER_DOWN, () => {
            this.add.tween({
                targets: this.text,
                ease: 'Bounce.easeIn',
                x:810,
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

        var textEntry = this.add.text(760, 160, '', { font: '48px Courier', fill: '#474747' });
        
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
        
       this.textoPotencias = this.add.image(600, 520, 'potenciasCentrales').setOrigin(0).setScale(0.5).setInteractive();
        this.textoAliados = this.add.image(920, 520, 'Aliados').setOrigin(0).setScale(0.5).setInteractive();
        var bandoElegido ; 

       this.selecBando = this.add.image(670, 330, "seleccionBando").setOrigin(0).setScale(0.85).setInteractive();
       this.selecBando.inputEnabled = true;
       this.selecBando.alpha = 0.1;
       this.selecBando.on(Phaser.Input.Events.POINTER_OVER, () => {
        this.add.tween({
            targets: this.selecBando,
            ease: 'Bounce.easeIn',
            onComplete: () => {
                this.selecBando.alpha = 0.8;
                this.textoPotencias.depth = 100;
            }
        });

        this.add.tween({
            targets: [ this.pointsText, this.bestPointsText ],                
            y: 400,
            duration: 1000
        });
    });
    this.selecBando.on(Phaser.Input.Events.POINTER_OUT, () => {
        this.add.tween({
            targets: this.selecBando,
            ease: 'Bounce.easeIn',
            onComplete: () => {
                this.selecBando.alpha = 0.1;
            }
        });

        this.add.tween({
            targets: [ this.pointsText, this.bestPointsText ],                
            y: 400,
            duration: 1000
        });
    });
    this.selecBando2 = this.add.image(945, 290, "seleccionBando").setOrigin(0).setScale(1.05).setInteractive();
       this.selecBando2.inputEnabled = true;
       this.selecBando2.alpha = 0.1;
       this.selecBando2.on(Phaser.Input.Events.POINTER_OVER, () => {
        this.add.tween({
            targets: this.selecBando2,
            ease: 'Bounce.easeIn',
            onComplete: () => {
                this.selecBando2.alpha = 0.8;
                this.textoAliados.depth = 100;
            }
        });

        this.add.tween({
            targets: [ this.pointsText, this.bestPointsText ],                
            y: 400,
            duration: 1000
        });
    });
    this.selecBando2.on(Phaser.Input.Events.POINTER_OUT, () => {
        this.add.tween({
            targets: this.selecBando2,
            ease: 'Bounce.easeIn',
            onComplete: () => {
                this.selecBando2.alpha = 0.1;
            }
        });

        this.add.tween({
            targets: [ this.pointsText, this.bestPointsText ],                
            y: 400,
            duration: 1000
        });
    });
       
       // Cuando hace click en Potencias Centrales
        this.textoPotencias.on(Phaser.Input.Events.POINTER_DOWN, () => {
            this.add.tween({
                targets: this.textoPotencias,
                ease: 'Bounce.easeIn',
                x:620,
                duration: 1000,
                onComplete: () => {
                    bandoElegido = "Potencias";
                }
            });

            this.add.tween({
                targets: [ this.pointsText, this.bestPointsText ],                
                y: 400,
                duration: 1000
            });
            this.sonidoClick.play();
        });
        this.textoPotencias.on(Phaser.Input.Events.POINTER_OVER, () => {
            this.add.tween({
                targets: this.textoPotencias,
                ease: 'Bounce.easeIn',
                onComplete: () => {
                    this.selecBando.alpha = 0.8;
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
                x:940,
                duration: 1000,
                onComplete: () => {
                    bandoElegido = "Aliados";
                }
            });

            this.add.tween({
                targets: [ this.pointsText, this.bestPointsText ],                
                y: 400,
                duration: 1000
            });
            this.sonidoClick.play();
        });
        
        this.textoAliados.on(Phaser.Input.Events.POINTER_OVER, () => {
            this.add.tween({
                targets: this.textoAliados,
                ease: 'Bounce.easeIn',
                onComplete: () => {
                    this.selecBando2.alpha = 0.8;
                }
            });

            this.add.tween({
                targets: [ this.pointsText, this.bestPointsText ],                
                y: 400,
                duration: 1000
            });
        });

        var alerta = this.add.text(700, 900, '', { font: 'bold 48px Courier', fill: '#080808' });
        this.crearNuevaPartida = this.add.image(780, 950, 'crearPartida').setOrigin(0).setScale(0.5).setInteractive();
        this.crearNuevaPartida.on(Phaser.Input.Events.POINTER_DOWN, () => {
            if(bandoElegido == null){
                alerta.setText('Seleccione un Bando'); 
            }else{
            //Creo la partida con el bando y el nombre seleccionado
            this.sonidoConfirmar.play();
           // this.sonidoFondoPartida.play();
            console.log('Entre iniciando partida en Menu Bando');
            config.Partida.Bando = bandoElegido;
            config.Partida.Nombre = textEntry.text;
            config.Partida.tipoPartida = "NuevaPartida";
            config.Partida.iniciarPartida();
            //console.log(config.Partida);
            //this.scene.launch('confirmarNuevaPartida');
        }
        });

    }

    update(){
        if(config.Partida.partidaCargada){
            this.scene.remove('MenuInicial');
            this.scene.remove('MenuBando');
            this.scene.start('Play');
        }


    }


}
export  default MenuBando;