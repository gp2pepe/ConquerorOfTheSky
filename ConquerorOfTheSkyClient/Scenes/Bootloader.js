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
            'confirmarNuevaPartida',
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
            'cargarBomba',
            
             'menupartidas',
             'nubeslateral',
             'vistaLateralBaja',


            'wall1',
            'wall2',
            'seleccioncarac'

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