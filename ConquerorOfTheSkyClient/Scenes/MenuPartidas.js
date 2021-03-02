import { config } from '../lib/main.js';
import Partida from '../Objects/Partida.js';

const COLOR_PRIMARY = 0x4e342e;
const COLOR_LIGHT = 0x7b5e57;
const COLOR_DARK = 0x260e04;
class MenuPartidas extends Phaser.Scene
{
    /* Constuctor.
     */

    constructor() {
        super({key: 'MenuPartidas'});
    }

    /* Pre-carga de recursos.
     */
    preload() 
    {
        this.load.scenePlugin({
            key: 'rexuiplugin',
            url: 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js',
            sceneKey: 'rexUI'
        });    
    }

    /**
     * Creación de la escena.
     */

    create() 
    {
        this.add.image(0,0, 'desenfocar').setOrigin(0);

        

    

        var ejeX = 450;
        var ejeY = 300;
        this.add.image(150, 150, "menupartidas_2").setOrigin(0).setScale(0.3);
        var textArea = this.rexUI.add.textArea({
            x: 1700,
            y: 600,
            width: 220,
            height: 620,

            background: this.rexUI.add.roundRectangle(0, 0, 2, 2, 0, COLOR_PRIMARY),

            // text: this.add.text(),
            text: this.rexUI.add.BBCodeText(),

            // textMask: false,

            slider: {
                track: this.rexUI.add.roundRectangle(0, 0, 20, 10, 10, 0x260e04),
                thumb: this.rexUI.add.roundRectangle(0, 0, 0, 0, 13, 0x7b5e57),
            },
            // scroller: true,
        }).layout() .drawBounds(this.add.graphics(), 0xff0000);
        textArea.setText('PPhaser is a fast, free, and fun open source HTML5 game framework that offers WebGL and Canvas rendering across desktop and mobile web browsers. Games can be compiled to iOS, Android and native apps by using 3rd party tools. You can use JavaScript or TypeScript for development.`Phaser is a fast, free, and fun open source HTML5 game framework that offers WebGL and Canvas rendering across desktop and mobile web browsers. Games can be compiled to iOS, Android and native apps by using 3rd party tools. You can use JavaScript or TypeScript for development.PPhaser is a fast, free, and fun open source HTML5 game framework that offers WebGL and Canvas rendering across desktop and mobile web browsers. Games can be compiled to iOS, Android and native apps by using 3rd party tools. You can use JaPPhaser is a fast, free, and fun open source HTML5 game framework that offers WebGL and Canvas rendering across desktop and mobile web browsers. Games can be compiled to iOS, Android and native apps by using 3rd party tools. You can use JaPPhaser is a fast, free, and fun open source HTML5 game framework that offers WebGL and Canvas rendering across desktop and mobile web browsers. Games can be compiled to iOS, Android and native apps by using 3rd party tools. You can use JaPPhaser is a fast, free, and fun open source HTML5 game framework that offers WebGL and Canvas rendering across desktop and mobile web browsers. Games can be compiled to iOS, Android and native apps by using 3rd party tools. You can use JaPPhaser is a fast, free, and fun open source HTML5 game framework that offers WebGL and Canvas rendering across desktop and mobile web browsers. Games can be compiled to iOS, Android and native apps by using 3rd party tools. You can use JaPPhaser is a fast, free, and fun open source HTML5 game framework that offers WebGL and Canvas rendering across desktop and mobile web browsers. Games can be compiled to iOS, Android and native apps by using 3rd party tools. You can use Ja`');

        console.log('Aca abajo tendría que estar todo');
        //config.Partida.listarPartidas();
        var listaPartidas = config.Partida.listaPartidas; //Acá suplantaría este arreglo con lo que me diga Gabriel luego de agregarle lo faltante
        console.log(listaPartidas);
        var cantPartidasPrueba = listaPartidas.length;
        console.log(cantPartidasPrueba);
        var num = 0;

        while (num < cantPartidasPrueba)
        {
            this.add.text(ejeX,ejeY,listaPartidas[num].idPartida, { font: '18px Arial', fill: '#0095DD' }).setScale(2.8);
            const textoPrueba = this.add.text(ejeX + 230,ejeY, listaPartidas[num].nombre,{ font: '18px Arial', fill: '#0095DD' }).setScale(2.8).setInteractive();
            this.add.text(ejeX + 650,ejeY, listaPartidas[num].modalidad,{ font: '18px Arial', fill: '#0095DD' }).setScale(2.8);
            ejeY = ejeY + 50;
            const partida = listaPartidas[num].idPartida;
            textoPrueba.on(Phaser.Input.Events.POINTER_DOWN, () => {
                config.Partida.ingresarAPartida(partida);
                //config.Partida.listarPartidas(); //Hacer luego un boton refresh
                this.scene.launch('confirmarIngresarPartida');
            });
            num++;
            
        
        }
      

    }
    
    update()
    {

    }

}

export default MenuPartidas;
