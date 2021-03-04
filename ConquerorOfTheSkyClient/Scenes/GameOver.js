import { config } from '../lib/main.js';
import Partida from '../Objects/Partida.js';

class GameOver extends Phaser.Scene
{

     /* Constuctor.
     */

    constructor() {
        super({key: 'GameOver'});
    }

        /* Pre-carga de recursos.
     */
    preload() 
    { 
    }

    create()
    {
        this.add.image(0,0, 'desenfocar').setOrigin(0);
        this.add.image(1200, 550, "fondoendgame");
        this.pruebaEndGame = this.add.image(700,830, 'pruebaEndGame').setScale(0.3).setInteractive();

        this.pruebaEndGame.on(Phaser.Input.Events.POINTER_DOWN, () => {
            this.add.tween({
                targets: this.pruebaEndGame,
                ease: 'Bounce.easeIn',
                x:620,
                duration: 1000,
                onComplete: () => {
                    console.log('Entre luego de hacer click');
                    this.scene.remove('Play');
                    this.scene.start('MenuInicial');
                }
            });

            this.add.tween({
                targets: [ this.pointsText, this.bestPointsText ],                
                y: 400,
                duration: 1000
            });
        });
    }


}

export default GameOver