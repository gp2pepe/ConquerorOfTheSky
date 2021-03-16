import { config } from '../lib/main.js';
var ingresoTexto;
var ingresoTexto2;
var IngresoNombrePartida;
var IngresoNick;


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
        ingresoTexto2 = false;
        IngresoNombrePartida = false;
        IngresoNick = false;
        this.add.image(0,0, 'desenfocar').setOrigin(0);
        this.add.image(650,20, 'seleccioncarac').setOrigin(0);
        this.textBox = this.add.image(750,130, 'textBox').setOrigin(0).setScale(0.5);
        this.text = this.add.text(800, 155, 'Click para ingresar nombre', { font: '16px Arial', fill: '#474747' }).setScale(1.5).setInteractive();
        this.textBox2 = this.add.image(750,860, 'textBox').setOrigin(0).setScale(0.5);
        this.text2 = this.add.text(800, 885, 'Click para ingresar nombre', { font: '16px Arial', fill: '#474747' }).setScale(1.5).setInteractive();
        this.sonidoClick = this.sound.add('click',{loop:false,volume:0.06});
        this.sonidoConfirmar = this.sound.add('sonido_confirmar',{loop:false,volume:0.08});
        this.sonidoFondoPartida = this.sound.add('Battleship',{loop:true,volume:0.007});
        
        this.text.on(Phaser.Input.Events.POINTER_DOWN, () => {
            this.add.tween({
                targets: this.text,
                ease: 'Bounce.easeIn',
                x:810,
                duration: 100,
                onComplete: () => {
                    ingresoTexto = true;
                    this.text.destroy();
                    ingresoTexto2 = false;
                }
            });

            this.add.tween({
                targets: [ this.pointsText, this.bestPointsText ],                
                y: 400,
                duration: 1000
            });
        });

        this.text2.on(Phaser.Input.Events.POINTER_DOWN, () => {
            this.add.tween({
                targets: this.text,
                ease: 'Bounce.easeIn',
                x:810,
                duration: 100,
                onComplete: () => {
                    ingresoTexto2 = true;
                    this.text2.destroy();
                    ingresoTexto = false;
                }
            });

            this.add.tween({
                targets: [ this.pointsText, this.bestPointsText ],                
                y: 400,
                duration: 1000
            });
        });

        var textEntry = this.add.text(760, 150, '', { font: '48px Courier', fill: '#474747' });
        
        this.input.keyboard.on('keydown', function (event) {
            if(ingresoTexto == true){
                if (event.keyCode === 8 && textEntry.text.length > 0)
                {
                    textEntry.text = textEntry.text.substr(0, textEntry.text.length - 1);
                }
                else if (event.keyCode === 32 || (event.keyCode >= 48 && event.keyCode < 90))
                {
                    textEntry.text += event.key;
                    
                    IngresoNombrePartida = true;
                }

            }
        });

        var textEntryNick = this.add.text(760, 880, '', { font: '48px Courier', fill: '#474747' });
        
        this.input.keyboard.on('keydown', function (event) {
            if(ingresoTexto2 == true){
                if (event.keyCode === 8 && textEntryNick.text.length > 0)
                {
                    textEntryNick.text = textEntryNick.text.substr(0, textEntryNick.text.length - 1);
                }
                else if (event.keyCode === 32 || (event.keyCode >= 48 && event.keyCode < 90))
                {
                    textEntryNick.text += event.key;
                    IngresoNick = true;
                }
            }
        });

        this.textoPotencias = this.add.image(600, 490, 'potenciasCentrales').setOrigin(0).setScale(0.5).setInteractive();
        this.textoAliados = this.add.image(920, 490, 'Aliados').setOrigin(0).setScale(0.5).setInteractive();
        var bandoElegido ; 

       this.selecBando = this.add.image(670, 300, "seleccionBando").setOrigin(0).setScale(0.85).setInteractive();
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
    this.selecBando2 = this.add.image(945, 260, "seleccionBando").setOrigin(0).setScale(1.05).setInteractive();
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

        var alerta = this.add.text(680, 960, '', { font: 'bold 44px Courier', fill: '#080808' });
        this.crearNuevaPartida = this.add.image(680, 1025, 'crearPartida').setOrigin(0).setScale(0.36).setInteractive();
        this.crearNuevaPartida.on(Phaser.Input.Events.POINTER_DOWN, () => {
            if(IngresoNombrePartida == false ){
                alerta.setText('Ingrese Nombre Partida'); 
            }else
            if(bandoElegido == null ){
                alerta.setText('Seleccione un Bando'); 
            }else
            if(IngresoNick == false  ){
                alerta.setText('Ingrese un Nick'); 
            }else
            if (textEntry.text.length > 12)
            { 
                alerta.setText('El nombre debe ser menor a 12 caracteres').setScale(0.45);
            }
            else
            if (textEntryNick.text.length > 10)
            {
                alerta.setText('el nick debe de ser menor a 10 caracteres').setScale(0.45);
            }
            else{
            //Creo la partida con el bando y el nombre seleccionado
            this.sonidoConfirmar.play();
            this.sonidoFondoPartida.play();
            while (textEntry.text.length != 12)
            {
                textEntry.text = ' ' + textEntry.text;     
            }
            config.Partida.Bando = bandoElegido;
            config.Partida.Nombre = textEntry.text;
            config.Partida.nick = textEntryNick.text;
            config.Partida.tipoPartida = "NuevaPartida";
            config.Partida.iniciarPartida();

        }
        });

        this.menuInicial = this.add.image(1140,1050, 'pruebaEndGame').setScale(0.43).setInteractive();
        this.menuInicial.setAlpha(0.01);
        this.menuInicial.on(Phaser.Input.Events.POINTER_DOWN, () => {
            this.add.tween({
                targets: this.menuInicial,
                ease: 'Bounce.easeIn',
                x:740,
                duration: 100,
                onComplete: () => {
                    location.reload();
                }
            });

            this.add.tween({
                targets: [ this.pointsText, this.bestPointsText ],                
                y: 400,
                duration: 100
            });
        });
    }

    update(){
        if(config.Partida.partidaCargada){
            this.scene.remove('MenuInicial');
            this.scene.remove('MenuBando');
            this.scene.start('Play');
            config.Partida.estado = "Pausado";
            this.scene.launch('EsperandoContrincante');

        }
    }
}
export  default MenuBando;