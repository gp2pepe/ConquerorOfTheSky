import {config} from '../lib/main.js';

class Bootloader extends Phaser.Scene {
    constructor(){
        super('Bootloader');
    }
    init(){      
    }
    
    preload(){
        this.load.path = './assets/';
        this.load.image([
            'Nieuport_28C1',
            'fondoMapa',
            'mapa_1',
            'mapa_2',
            'mapa_3',
            'mapa_4',
            'mapa_5',
            'mapa_6',
            'campo',
            'bullet',
            'fondoMenu',
            'nuevaPartida',
            'buscarPartida',
            'cargarPartida',
            'crearPartida',
            'partidaLlena',
            'desenfocar',
            'textBox',
            'Aliados',
            'potenciasCentrales',
            'titulo',
            'contenedor',
            'contenedor_2',
            'torre',
            'muralla',
            'deposito',
            'artilleria',
            'artilleria_2',
            'artilleria_3',
            'artilleria_4',
            'artilleria_5',
            'albatros',
            'pisoBase',
            'depositoCombustible',
            'circuloAvion',
            'Nieuport_28C1Lateral',


            'boton_1',
            'boton_2',
            'boton_3',
            'boton_4',
            'botonBomba',
            'botonBombaRojo',
            'botonCombustible',
            'botonCombustibleRojo',
            'panelAvion1',
            'panelAvion2',
            'panelAvion3',
            'panelAvion4',
            'panelAvion1Rojo',
            'panelAvion2Rojo',
            'panelAvion3Rojo',
            'panelAvion4Rojo',
            'panelBase',
            'mostrarRango',
            'nick',
            'vidaContainer',
            'combustibleContainer',
            'vidaBar',
            'combustibleBar',
            'avionBombaLateral',

             'menupartidas',
             'menupartidas_2',
             'nubeslateral',
             'vistaLateralBaja',


            'wall1',
            'wall2',
            'seleccioncarac',
            'seleccionBando',
            'fondoendgame',
            'pruebaEndGame',
            'imagenWinGame2estrellas',
            'imagenWinGame1estrellas',
            'imagenWinGame3estrellas',
             'imagenDerrota',
             'mask',
             'mitadMapa',
             'mapa_6Claro',
             'Save-64',
             'guardando',
             'pausado',
             'fondoGuardar',
             "fondoCargar",
             'fondoBuscarPartida'
             //'loading'

        ])
        /* var context = new AudioContext();
        console.log(context); */
        this.load.audio('fondo_menu','audio/fondo_menu.wav');
        this.load.audio('sonido_disparos','audio/sonido_disparos.wav');
        this.load.audio('sonido_click','audio/sonido_click.mp3');
        this.load.audio('sonido_confirmar','audio/sonido_confirmar.wav');
        this.load.audio('sonido_fondo_partida','audio/sonido_fondo_partida.wav');
        this.load.on('complete',()=>{
            this.scene.start('MenuInicial');
        })
        config.WebSocket.openConnection();
    }
    create(){       
        /* let sonido_fondo = this.sound.add('fondo_menu',{loop:true})
        sonido_fondo.resume();
         this.input.keyboard.on('keydown_RIGHT',() => {
            sonido_fondo.play();
        })
        this.input.keyboard.on('keydown_LEFT',() => {
            sonido_fondo.stop(0);
        })  */
    }
}

export default Bootloader;