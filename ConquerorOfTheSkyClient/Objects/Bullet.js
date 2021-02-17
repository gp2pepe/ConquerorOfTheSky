class Bullet extends Phaser.GameObjects.Sprite {

	/**
	 * Constructor.
	 */
	constructor (scene, x, y)
    {		
        super(scene, x, y, 'bullet').setScale(2);	
		this.incX = 0;
		this.incY = 0;
		this.speed = Phaser.Math.GetSpeed(1000, 1);
		this.scene.physics.world.enable(this);
    }

    fire (avion)
    {		
		this.rotation = Phaser.Math.DegToRad(avion.body.rotation);
		this.setPosition(avion.x, avion.y);
		var angle = Phaser.Math.DegToRad(avion.body.rotation);
		this.incX = Math.cos(angle);
		this.incY = Math.sin(angle);
		this.setActive(true);
		this.setVisible(true);
		this.lifespan = 1000;		
    }

	update(time,delta)
	{		
		this.lifespan -= delta;
		this.x += this.incX * (this.speed * delta);
		this.y += this.incY * (this.speed * delta);

		if (this.lifespan <= 0)
		{
			this.setActive(false);
			this.setVisible(false);
		}
		
	}
}

export default Bullet ;