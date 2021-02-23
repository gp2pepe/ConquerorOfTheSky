class Bullet extends Phaser.GameObjects.Sprite {

	/**
	 * Constructor.
	 */
	constructor (scene, x, y)
    {		
        super(scene, x, y, 'bullet').setScale(6);	
		this.incX = 0;
		this.incY = 0;
		this.speed = Phaser.Math.GetSpeed(400, 1);
		this.scene.physics.world.enable(this);
    }

    fire (avion,msg)
    {		
		this.rotation = Math.atan2(msg.y - avion.body.y,msg.x - avion.body.x);  	
		this.setPosition(avion.x+10, avion.y+10);		
		this.scene.physics.world.enable(this);
		if(msg.x >  this.x){
            this.body.setVelocityX(0);
            this.body.setVelocityX(250);
        }else{
            this.body.setVelocityX(0);
            this.body.setVelocityX(-250);
        }
    
        if(msg.y >  this.y){
            this.body.setVelocityY(0);
            this.body.setVelocityY(250);
        }else{
            this.body.setVelocityY(0);
			this.body.setVelocityY(-250);  
        }
		this.setActive(true);
		this.setVisible(true);
		this.lifespan = 600;		
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