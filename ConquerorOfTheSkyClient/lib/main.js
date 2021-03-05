import Bootloader from '../Scenes/Bootloader.js';
import Play from '../Scenes/Play.js';
import MenuInicial from '../Scenes/MenuInicial.js';
import Client from './websocket.js';
import Partida from '../Objects/Partida.js';
import MenuPartidas from '../Scenes/MenuPartidas.js';
import MenuBando from '../Scenes/MenuBando.js';
import confirmarNuevaPartida from '../Scenes/confirmarNuevaPartida.js';
import PartidaLlena from '../Scenes/PartidaLlena.js';
import GameOver from '../Scenes/GameOver.js'
import Win from '../Scenes/Win.js'
import scroll from '../Scenes/scroll.js'

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
            debug: true
        }
    },
<<<<<<< HEAD
    scene: [Bootloader, Play,MenuInicial,MenuPartidas,MenuBando,confirmarNuevaPartida,PartidaLlena,GameOver,Win,scroll],
=======
    scene: [Bootloader, Play,MenuInicial,MenuPartidas,MenuBando,confirmarNuevaPartida,confirmarIngresarPartida,GameOver,Win,scroll],
>>>>>>> 1e5b983e38c1f28cf2aa4f37c46b29d8e145b817
    WebSocket: new Client(),
    Partida: new Partida(),   
    
};

export {
    game,config
  }
  
var game = new Phaser.Game(config);