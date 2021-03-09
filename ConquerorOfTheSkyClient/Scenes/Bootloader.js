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
             'guardando'

        ])
        this.load.on('complete',()=>{
            this.scene.start('MenuInicial');
        })
        config.WebSocket.openConnection();
    }
    create(){       
        
    }
}

export default Bootloader;