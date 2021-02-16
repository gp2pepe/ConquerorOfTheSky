class Avion extends Phaser.GameObjects.Sprite {
	
	/**
	 * Constructor.
	 */
	constructor(config) {

		// Constructor de Phaser.GameObjects.Sprite
		super(config.scene, config.x, config.y, 'Nieuport_28C1').setScale(.10);
        this.scene = config.scene;
		this.scene.physics.world.enable(this);
        this.scene.add.existing(this);
		this.body.setMaxSpeed(500);
		this.body.setCollideWorldBounds(true);
        this.vidaAvion = 100;
    }

	update() {
		
	}
}

export default Avion ;