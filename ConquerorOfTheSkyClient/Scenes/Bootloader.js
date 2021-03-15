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
            'contenedor_2',
            'torre',
            'deposito',
            'artilleria',
            'pisoBase',
            'depositoCombustible',
            'circuloAvion',
            'Nieuport_28C1Lateral',
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
            'panelAvionDestruido',
            'panelBase',
            'mostrarRango',
            'nick',
            'vidaContainer',
            'combustibleContainer',
            'baseContainer',
            'vidaBar',
            'combustibleBar',
            'avionBombaLateral',
            'nubeslateral',
            'vistaLateralBaja',
            'vistaLateralEnBase',
            'wall1',
            'wall2',
            'seleccioncarac',
            'seleccionBando',
            'pruebaEndGame',
            'imagenWinGame2estrellas',
            'imagenWinGame1estrellas',
            'imagenWinGame3estrellas',
            'imagenDerrota',
            'mask',
            'Save-64',
            'guardando',
            'pausado',
            'fondoGuardar',
            "fondoCargar",
            'fondoBuscarPartida',
            'menuEmergenteBuscar',
            'esperandoContrincante',
            'imagenWinGame1estrellaSeRetiro'

        ])
        this.load.audio('fondo_menu','audio/fondo_menu.wav');
        this.load.audio('sonido_disparos','audio/sonido_disparos.wav');
        this.load.audio('sonido_click','audio/sonido_click.mp3');
        this.load.audio('sonido_confirmar','audio/sonido_confirmar.wav');
        this.load.audio('Battleship','audio/Battleship.wav');
        this.load.atlas('Nieuport_28C1', 'animaciones/explosion.png', 'animaciones/explosion_atlas.json');
        this.load.on('complete',()=>{
            this.scene.start('MenuInicial');
        })
        config.WebSocket.openConnection();
    }
    create(){       

    }
}

export default Bootloader;