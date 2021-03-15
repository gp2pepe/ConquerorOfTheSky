
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
        this.add.image(900, 550, "imagenDerrota").setScale(1);
        this.pruebaEndGame = this.add.image(1150,830, 'pruebaEndGame').setScale(0.4).setInteractive();
        this.pruebaEndGame.setAlpha(0.03);

        this.pruebaEndGame.on(Phaser.Input.Events.POINTER_DOWN, () => {
            this.add.tween({
                targets: this.pruebaEndGame,
                ease: 'Bounce.easeIn',
                x:620,
                duration: 100,
                onComplete: () => {
                    console.log('Antes del reload');
                    location.reload();
                    console.log('Despues del reload');
                }
            });

            this.add.tween({
                targets: [ this.pointsText, this.bestPointsText ],                
                y: 400,
                duration: 100
            });
        });
    }


}

export default GameOver