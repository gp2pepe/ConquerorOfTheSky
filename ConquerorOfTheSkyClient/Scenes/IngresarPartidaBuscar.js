import { config,game } from '../lib/main.js';

class IngresarPartidaBuscar extends Phaser.Scene
{
    
     /* Constuctor.
     */

     

    constructor() {
        super({
            key: 'IngresarPartidaBuscar'
        })
        Phaser.Scene.call(this, { key: 'IngresarPartidaBuscar' });
    }

    init(data)
    {
        this.IdPartida = data.Id;
        this.Nombre = data.Nombre
        this.Bando = data.Bando;
        this.Publica = data.Publica;
    }

    preload() 
    { 

    }

    create()
    {
        var ingresoTexto = false;
        var ingresoTexto2 = false;
        this.add.image(0,0, 'desenfocar').setOrigin(0);
        this.add.image(73, 100, "menuEmergenteBuscar").setOrigin(0).setScale(1.1);
        this.pruebaEndGame = this.add.image(1470,920, 'pruebaEndGame').setScale(0.6).setInteractive();
        this.pruebaEndGame.setAlpha(0.05);
        this.pruebaEndGame.on(Phaser.Input.Events.POINTER_DOWN, () => {
            this.add.tween({
                targets: this.pruebaEndGame,
                ease: 'Bounce.easeIn',
                x:740,
                duration: 100,
                onComplete: () => {
                    this.scene.stop('IngresarPartidaBuscar');
                    this.scene.resume('MenuPartidas');
                }
            });

            this.add.tween({
                targets: [ this.pointsText, this.bestPointsText ],                
                y: 400,
                duration: 100
            });
        });
        this.add.text(220,280, this.IdPartida).setScale(4);
        this.add.text(396,347, this.Nombre).setScale(4);
        if (this.Bando == 'Aliados')
            this.add.text(354,447, 'Potencias').setScale(4);
        else
            this.add.text(354,447, 'Aliados').setScale(4);
        if (this.Publica == 'No')
        {
            this.add.text(395,532, 'NO').setScale(4);
        }
        else
        {
            this.add.text(395,532, 'Si').setScale(4);
        }

        
        
        this.textBox2 = this.add.image(300,620, 'textBox').setOrigin(0).setScale(0.5);
        this.text2 = this.add.text(350, 645, 'Click para ingresar Nick', { font: '16px Arial', fill: '#474747' }).setScale(1.5).setInteractive();
        var textNick = this.add.text(310, 640, '', { font: '48px Courier', fill: '#474747' });




        this.text2.on(Phaser.Input.Events.POINTER_DOWN, () => {
            this.add.tween({
                targets: this.text2,
                ease: 'Bounce.easeIn',
                x:810,
                duration: 100,
                onComplete: () => {
                    ingresoTexto = true;
                    this.text2.destroy();
                }
            });

            this.add.tween({
                targets: [ this.pointsText, this.bestPointsText ],                
                y: 400,
                duration: 1000
            });
        });
        
        this.input.keyboard.on('keydown', function (event) {
            if(ingresoTexto == true){
                if (event.keyCode === 8 && textNick.text.length > 0)
                {
                    textNick.text = textNick.text.substr(0, textNick.text.length - 1);
                }
                else if (event.keyCode === 32 || (event.keyCode >= 48 && event.keyCode < 90))
                {
                    textNick.text += event.key;
                }
            }
        });
        if (this.Publica == 'No')
      {  
        this.textBox = this.add.image(570,780, 'textBox').setOrigin(0).setScale(0.5);
        this.text = this.add.text(605, 805, 'Click para ingresar contraseña', { font: '16px Arial', fill: '#474747' }).setScale(1.5).setInteractive();
        var textContra = this.add.text(580, 800, '', { font: '48px Courier', fill: '#474747' });

        this.text.on(Phaser.Input.Events.POINTER_DOWN, () => {
            this.add.tween({
                targets: this.text,
                ease: 'Bounce.easeIn',
                x:810,
                duration: 100,
                onComplete: () => {
                    ingresoTexto2 = true;
                    this.text.destroy();
                    ingresoTexto = false;
                }
            });

            this.add.tween({
                targets: [ this.pointsText, this.bestPointsText ],                
                y: 400,
                duration: 1000
            });
        });
        this.input.keyboard.on('keydown', function (event) {
            if(ingresoTexto2 == true){
                if (event.keyCode === 8 && textContra.text.length > 0)
                {
                    textContra.text = textContra.text.substr(0, textContra.text.length - 1);
                }
                else if (event.keyCode === 32 || (event.keyCode >= 48 && event.keyCode < 90))
                {
                    textContra.text += event.key;
                }
            }
        });

        }
        else
        {
            this.textBox = this.add.text(570,780, 'N/A').setOrigin(0).setScale(4);
        }

        var alerta = this.add.text(700, 960, '', { font: 'bold 48px Courier', fill: '#080808' });

        this.unirseAPartida = this.add.image(550, 890, 'crearPartida').setOrigin(0).setScale(0.7).setAlpha(0.01).setInteractive();
        this.unirseAPartida.on(Phaser.Input.Events.POINTER_DOWN, () => {
            if (textNick.text.length > 10)
            {
                alerta.setText('el nick debe de ser menor a 10 caracteres').setScale(0.45);
            }
            else{
            //Creo la partida con el bando y el nombre seleccionado
            //this.sonidoConfirmar.play();
            //this.sonidoFondoPartida.play();
            //config.Partida.Bando = bandoElegido;
            //config.Partida.Nombre = this.Nombre;
            config.Partida.nick = textNick.text;
            //config.Partida.pass = textContra.text;
            config.Partida.tipoPartida = "ingresarAPartida";
            if (this.Publica == 'No')
                {
                    config.Partida.ingresarAPartida(this.IdPartida, textContra.text);   
                    config.Partida.estado = "Pausado";
                    //this.scene.launch('EsperandoContrincante');
                }
            else
                {
                config.Partida.ingresarAPartida(this.IdPartida, '');
                }
            //console.log(config.Partida);
            //this.scene.launch('confirmarNuevaPartida');
        }
        });

        //config.Partida.ingresarAPartida(this.IdPartida);
    }

    update() {
        if(config.Partida.partidaCargada){
            this.scene.remove('MenuInicial');
            this.scene.remove('MenuPartidas');
            this.scene.remove('PartidaLlena');
            console.log(config.Partida.partidaCargada);
            this.scene.start('Play');
            
            
        }else 
        if(config.Partida.hayError){
            if(config.Partida.mensajeError=="La partida esta llena"){
                //this.scene.sendToBack();
                this.scene.launch('PartidaLlena');
                this.scene.bringToTop('PartidaLlena');
                this.currentScene = this.scene.get('PartidaLlena');
                this.scene.setVisible(true, this.currentScene);
                this.scene.stop('IngresarPartidaBuscar');
                this.scene.resume('MenuPartidas');
            }
            if (config.Partida.mensajeError == 'La contraseña no es correcta')
            {
                this.scene.launch('ContraIncorrecta');
                this.scene.bringToTop('ContraIncorrecta');
                this.scene.setVisible(true,this.currentScene);
            }
        }
     }


}

export default IngresarPartidaBuscar