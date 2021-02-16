import Bootloader from '../Scenes/Bootloader.js';
import Play from '../Scenes/Play.js';

const config = {
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
    scene: [Bootloader, Play]
};

export {
    game
  }
  
var game = new Phaser.Game(config);