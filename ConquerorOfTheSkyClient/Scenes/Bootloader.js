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
            'Nieuport_28C1_2',
            'fondoMapa',
            'mapa_1',
            'mapa_2',
            'bullet',
            'fondoMenu',
            'nuevaPartida',
            'buscarPartida',
            'cargarPartida',
            'titulo',
            'contenedor',
            'torre',
            'muralla',
            'deposito',

             'menupartidas',
             'nubeslateral',

            'wall1',
            'wall2'

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