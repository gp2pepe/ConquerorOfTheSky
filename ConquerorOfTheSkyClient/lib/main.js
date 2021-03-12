import Bootloader from '../Scenes/Bootloader.js';
import Play from '../Scenes/Play.js';
import MenuInicial from '../Scenes/MenuInicial.js';
import Client from './websocket.js';
import Partida from '../Objects/Partida.js';
import MenuPartidas from '../Scenes/MenuPartidas.js';
import MenuBando from '../Scenes/MenuBando.js';
import MenuCargar from '../Scenes/MenuCargar.js';
import GameOver from '../Scenes/GameOver.js'
import Win from '../Scenes/Win.js'
import IngresarPartidaBuscar from '../Scenes/IngresarPartidaBuscar.js'
import Guardar from '../Scenes/popups/Guardar.js'
import Pausado from '../Scenes/popups/Pausado.js'
import PartidaLlena from '../Scenes/popups/PartidaLlena.js';


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
    scene: [Bootloader, Play,MenuInicial,MenuPartidas,MenuCargar,MenuBando,PartidaLlena,GameOver,Win,Guardar,Pausado, IngresarPartidaBuscar],
    WebSocket: new Client(),
    Partida: new Partida(),   
    
};

export {
    game,config
  }
  
var game = new Phaser.Game(config);