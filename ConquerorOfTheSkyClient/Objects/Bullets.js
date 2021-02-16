import Bullet from './Bullet.js';
var bullet;
class Bullets extends Phaser.Physics.Arcade.Group
{
    
    constructor (scene)
    {
        super(scene.physics.world, scene);

        this.createMultiple({
            frameQuantity: 5,
            key: 'bullet',
            active: false,
            visible: false,
            classType: Bullet
        });        
    }

    fireBullet (avion)
    {
        //let bullet = this.getFirstDead(false);
        bullet = this.get();
        
        if (bullet)
        {
            bullet.fire(avion);
        }
    }

    update(delta)
	{        
        bullet.update(delta);
	}
}
export default Bullets ;