import Bootloader from '../Scenes/Bootloader.js';
import Play from '../Scenes/Play.js';
import Client from './websocket.js';
import Partida from '../Objects/Partida.js';


var config = {
    type: Phaser.AUTO,
    scale :{
        mode : Phaser.Scale.fit,
        autoCenter : Phaser.Scale.Center_BOTH,
        parent: 'contenedor',
        width: 1920,
        height:1080,
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { n: 300 },
            debug: false
        }
    },
    scene: [Bootloader, Play],
    WebSocket: new Client(),
    Part: new Partida(),

};

export {
    game,config
  }
  
var game = new Phaser.Game(config);