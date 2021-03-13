
class Win extends Phaser.Scene
{

     /* Constuctor.
     */

    constructor() {
        super({key: 'Win'});
    }

        /* Pre-carga de recursos.
     */
    preload() 
    { 
    }

    create()
    {
        this.add.image(0,0, 'desenfocar').setOrigin(0);
        this.add.image(900, 550, "imagenWinGame3estrellas").setScale(1);
        this.pruebaEndGame = this.add.image(1150,830, 'pruebaEndGame').setScale(0.4).setInteractive();
        this.pruebaEndGame.setVisible(false);
        console.log('Entre a Win.js');
        this.pruebaEndGame.on(Phaser.Input.Events.POINTER_DOWN, () => {
            this.add.tween({
                targets: this.pruebaEndGame,
                ease: 'Bounce.easeIn',
                x:740,
                duration: 1000,
                onComplete: () => {
                    this.scene.remove('Play');
                    this.scene.start('MenuInicial');
                    console.log('Abriendo MenuInicial');
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

export default Win