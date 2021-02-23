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
            var textoPrueba = this.add.text(ejeX,ejeY,listaPartidas[num].idPartida, { font: '18px Arial', fill: '#0095DD' }).setScale(2.8);
            var textoPrueba2 = this.add.text(ejeX + 100,ejeY, "NombrePrueba",{ font: '18px Arial', fill: '#0095DD' }).setScale(2.8).setInteractive();
            ejeY = ejeY + 50;
            num++;
            console.log("Estoy en el while");
        }
        textoPrueba2.on(Phaser.Input.Events.POINTER_DOWN, () => {
                    config.Partida.ingresarAPartida();
                    config.Partida.listarPartidas(); //Hacer luego un boton refresh
                    config.Partida.Bando=0;
                    this.scene.start('Play');
            });

    }

    update()
    {

    }

}

export default MenuPartidas;
