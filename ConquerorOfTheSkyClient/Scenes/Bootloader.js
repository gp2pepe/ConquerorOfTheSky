import {config} from '../lib/main.js';

class Bootloader extends Phaser.Scene {
    constructor(){
        super('Bootloader');
    }
    init(){
        console.log('Scene Bootloader');
    }
    preload(){
        this.load.path = './assets/';
        this.load.image([
            'Nieuport_28C1',
            'Nieuport_28C1_2',
            'fondoMapa',
            'mapa_1',
            'bullet'
        ])
        this.load.on('complete',()=>{
            this.scene.start('Play');
        })
        config.WebSocket.openConnection();
    }
    create(){       
        
    }
}

export default Bootloader;