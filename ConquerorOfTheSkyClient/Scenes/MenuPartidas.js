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
       
               
            });
            num++;
            
        
        }
      

    }
    
    update(){
        if(config.Partida.partidaCargada){
            this.scene.remove('MenuInicial');
            this.scene.remove('MenuPartidas');
            this.scene.start('Play');
        }

    }

}

export default MenuPartidas;
