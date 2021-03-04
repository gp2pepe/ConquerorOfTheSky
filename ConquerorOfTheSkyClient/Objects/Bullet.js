class Bullet extends Phaser.GameObjects.Sprite {

	/**
	 * Constructor.
	 */
	constructor (scene, x, y)
    {		
        super(scene, x, y, 'bullet').setScale(2);	
		this.incX = 0;
		this.incY = 0;
		this.speed = Phaser.Math.GetSpeed(250, 1);
		this.scene.physics.world.enable(this);		
    }

    fire (avion,msg)
    {		
		this.setPosition(avion.x, avion.y);	
		var angle = Phaser.Math.Angle.BetweenPoints(this, msg);
        this.rotation = angle;	
		this.scene.physics.velocityFromRotation(angle, 250, this.body.velocity);
		this.setActive(true);
		this.setVisible(true);
		this.lifespan = 100;		
    }
	fireArtilleria (artilleria,msg)
    {		
		this.setPosition(artilleria.x, artilleria.y);	
		var angle = Phaser.Math.Angle.BetweenPoints(this, msg);
        this.rotation = angle;	
		this.scene.physics.velocityFromRotation(angle, 250, this.body.velocity);
		this.setActive(true);
		this.setVisible(true);
		this.lifespan = 100;		
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
