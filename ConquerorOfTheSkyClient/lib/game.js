var myText = null;
var avion = null;

var config = {
    type: Phaser.AUTO,
    width: 1920,
    height:800,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { n: 300 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);
var punteroX;
var punteroY;

function preload() {
    this.load.image("plane", "../assets/Nieuport_28C1.png");
    this.load.image("mapa", "../assets/mapa_1.png");
    this.load.image('bullet', 'assets/bullet.png');
}

var bullets;
var speed;
var stats;
var cursors;
var lastFired = 0;
var circle;

function create() {

    //Cargo mapa
    this.add.image(400, 300, 'mapa');

    //Cargo el cliente y establesco la conexion
    game.client = new Client();
    game.client.openConnection();
    myText = this.add.text(0, 0, "started (not yet connected)", { font: "14px Arial", fill: "#ff0044"});
  
    avion = this.physics.add.sprite(200, 450, 'plane').setScale(.10);

    avion.setCollideWorldBounds(true);
    this.input.on('pointerdown',onObjectClicked);     
    
    //Bullet
    var Bullet = new Phaser.Class( {

        Extends: Phaser.GameObjects.Image,

        initialize:

        function Bullet (scene)
        {
            Phaser.GameObjects.Image.call(this, scene, 0, 0, 'bullet');
            this.incX = 0;
            this.incY = 0;
            this.speed = Phaser.Math.GetSpeed(400, 1);
        },

        fire: function (x, y)
        {
            this.setPosition(avion.x, avion.y);
            var angle = Phaser.Math.Angle.Between(avion.x, avion.y, punteroX, punteroY);

            this.setRotation(angle);

            this.incX = Math.cos(angle);
            this.incY = Math.sin(angle)
            this.setActive(true);
            this.setVisible(true);
            this.lifespan = 1000;

        },

        update: function (time, delta)
        {
            this.lifespan -= delta;

            this.x -= this.incX * (this.speed * delta);
            this.y -= this.incY * (this.speed * delta);
            if (this.lifespan <= 0)
            {
                this.setActive(false);
                this.setVisible(false);
            }
        }

    });

    bullets = this.add.group({
        classType: Bullet,
        maxSize: 10,
        runChildUpdate: true
    });
    cursors = this.input.keyboard.createCursorKeys();
    speed = Phaser.Math.GetSpeed(400, 1);
}

function onObjectClicked(pointer,gameObject)
{  
    punteroX=pointer.x;
    punteroY=pointer.y;
    moverAvion({x: pointer.x, y: pointer.y}, avion);
    sincronizarAvion({x: pointer.x, y: pointer.y});
}

function moverAvion(msg,gameObject){    
    distanciaX = Math.abs(msg.x - avion.x);
    distanciaY = Math.abs(msg.y - avion.y);
    avion.rotation = Math.atan2(msg.y - avion.y, msg.x - avion.x);  

    if(distanciaX>distanciaY){
        
    }else{

    }

    if(msg.x >  avion.x){
        avion.setVelocityX(0);
        avion.setVelocityX(100*(distanciaX/100));
    }else{
        avion.setVelocityX(0);
        avion.setVelocityX(-100*(distanciaX/100));
    }

    if(msg.y >  avion.y){
        avion.setVelocityY(0);
        avion.setVelocityY(100*(distanciaY/100));
    }else{
        avion.setVelocityY(0);
        avion.setVelocityY(-100*(distanciaY/100));  
    }

}

function sincronizarAvion(msg){
    if (game.client.isConnected()) {
        console.log('ffff:' );
        game.client.ws.send(JSON.stringify({x: msg.x, y: msg.y}));
    }
}

function update (time, delta)
{          
    if (cursors.up.isDown && time > lastFired)
    {
        var bullet = bullets.get();
        if (bullet)
        {
            bullet.fire(avion.x,avion.y);
            lastFired = time + 50;
        }
    }
}