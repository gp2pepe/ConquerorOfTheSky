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
    this.load.image("plane2", "../assets/Nieuport_28C1_2.png");
    this.load.image("mapa", "../assets/mapa_1.png");
    this.load.image('bullet', 'assets/bullet.png');
}

var bullets;
var speed;
var cursors;
var lastFired = 0;
var circle;
var circle_2;
var positionY;
var positionX;
var distance;

function create() {
    game.physics
    //Cargo mapa
    this.add.image(400, 300, 'mapa');

    //Cargo el cliente y establesco la conexion
    game.client = new Client();
    game.client.openConnection();
    myText = this.add.text(0, 0, "started (not yet connected)", { font: "14px Arial", fill: "#ff0044"});
    ///Se definen los aviones Franceses
    avion_f_1 = this.physics.add.sprite(50,550, 'plane2').setScale(.10).setInteractive();
    avion_f_2 = this.physics.add.sprite(120,550, 'plane2').setScale(.10).setInteractive();
    avion_f_3 = this.physics.add.sprite(190,550, 'plane2').setScale(.10).setInteractive();
    avion_f_4 = this.physics.add.sprite(260,550, 'plane2').setScale(.10).setInteractive();
    
    avion = this.physics.add.sprite(200, 450, 'plane').setScale(.10);
    avion_2 = this.physics.add.sprite(500, 600, 'plane').setScale(.10);
    avion_2.setVisible(false);
    avion_2.setCollideWorldBounds(true);    
    avion.body.setMaxSpeed(200);
     
    circle = this.add.circle(avion.x, avion.y, 100 , 0xffffff, 0.2); 

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
            this.rotation = Phaser.Math.DegToRad(avion.body.rotation);
            this.setPosition(avion.x, avion.y);
            var angle = Phaser.Math.DegToRad(avion.body.rotation);
            this.incX = Math.cos(angle);
            this.incY = Math.sin(angle);
            this.setActive(true);
            this.setVisible(true);
            this.lifespan = 1000;
        },
        update: function (time, delta)
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
    });

    bullets = this.add.group({
        classType: Bullet,
        maxSize: 10,
        runChildUpdate: true
    });
    cursors = this.input.keyboard.createCursorKeys();
    speed = Phaser.Math.GetSpeed(400, 1); 
// esto es para seleccionar que avion se va a utilizar
   /* avion_f_1.on('pointerdown', function (pointer) {
        console.log('avion_1');
    });
    avion_f_2.on('pointerdown', function (pointer) {
        console.log('avion_2');
    });
    avion_f_3.on('pointerdown', function (pointer) {
        console.log('avion_3');
    });
    avion_f_4.on('pointerdown', function (pointer) {
        console.log('avion_4');
    });*/

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
    circle.setPosition(avion.x, avion.y);
    var dx = circle.x - avion_2.x;
    var dy = circle.y - avion_2.y;
    distance = Math.sqrt(dx * dx + dy * dy);   
    
    if (distance < circle.radius)        
            avion_2.setVisible(true);        
    else
        avion_2.setVisible(false);
}