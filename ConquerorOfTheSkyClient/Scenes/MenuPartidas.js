import { config } from '../lib/main.js';
import Partida from '../Objects/Partida.js';

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

    }

    /**
     * Creación de la escena.
     */

    create() 
    {
        var ejeX = 460;
        var ejeY = 150;
        this.add.image(0, 0, "menupartidas").setOrigin(0).setScale(1.2);
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
            const textoPrueba = this.add.text(ejeX + 100,ejeY, listaPartidas[num].nombre,{ font: '18px Arial', fill: '#0095DD' }).setScale(2.8).setInteractive();
            this.add.text(ejeX + 500,ejeY, listaPartidas[num].modalidad,{ font: '18px Arial', fill: '#0095DD' }).setScale(2.8);
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
