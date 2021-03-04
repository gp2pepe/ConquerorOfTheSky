import Avion from '../Objects/Avion.js';
import Bullet from '../Objects/Bullet.js';
import { config,game } from '../lib/main.js';

//using System.Threading;

//Variables Globales
var lastFired = 0;
var avion_1;
var avion_2;
var avion_3;
var avion_4;
var avion_1_Aliados;
var avion_2_Aliados;
var avion_3_Aliados;
var avion_4_Aliados;
var bullets;
var distance
var bullet;
var difX; 
var difY;
var timeNafta = 0;
var avionXInicial;
var avionYInicial;
var campoPotencias;
var campoAliados;
var artilleriasPotencias;
var artilleriasAliados;

//Inicializo la clase/escena
class Play extends Phaser.Scene {

    constructor(){
        //le asigno una clave a la escena Play
        super({key: 'Play'});
        this.bullets;
    }
    create(){ 
//prueba Nacho

        this.scene.remove('MenuInicial');
        this.scene.remove('ElegirBando');
        //Se agrega imagenes a utilizar y dibujar en pantalla primero (fondo, muros, vista lateral)
        this.add.image(0, 0, "fondoMapa").setOrigin(0);
        this.vistaLateral = this.add.image(45,47,'nubeslateral').setOrigin(0).setScale(1);
        this.avionVistaLateral = this.add.image(100,180,'Nieuport_28C1Lateral').setOrigin(0).setScale(.7);
        this.mapa = this.add.image(433, 46, "mapa_6").setOrigin(0).setScale(1); 

        //esto es para mejorar el efecto spotlight de descubrir las areas no visibles
        /*const plc = this.add.image(433, 46, "mapa_3").setOrigin(0).setScale(1); 
        const spotlight = this.make.sprite({
            x: 500,
            y: 500,
            key: 'nubeslateral',
            add: false
        });
        plc.mask = new Phaser.Display.Masks.BitmapMask(this, spotlight);

        this.input.on('pointermove', function(pointer) {
            spotlight.x = pointer.x;
            spotlight.y = pointer.y;
        });*/
        //opacidad del mapa
        //this.mapa.alpha = 0.4;
        this.boton_5 = this.add.image(290, 425, "boton_1").setOrigin(0).setScale(.1).setInteractive(); 
        this.boton_6 = this.add.image(340, 425, "boton_2").setOrigin(0).setScale(.1).setInteractive(); 
        this.cargarBomba = this.add.image(45, 700, "cargarBomba").setOrigin(0).setScale(.3).setInteractive(); 
        this.volverBase = this.add.image(45, 800, "cargarBomba").setOrigin(0).setScale(.3).setInteractive();

        this.boton_5.on(Phaser.Input.Events.POINTER_DOWN, () => {
            this.vistaLateral = this.add.image(45,47,'nubeslateral').setOrigin(0).setScale(1);
            this.boton_5.depth=100;
            this.boton_6.depth=100;
            this.avionVistaLateral.depth=100;

        });
        this.boton_6.on(Phaser.Input.Events.POINTER_DOWN, () => {
            this.vistaLateral = this.add.image(45,47,'vistaLateralBaja').setOrigin(0).setScale(1);
            this.boton_5.depth=100;
            this.boton_6.depth=100;
            this.avionVistaLateral.depth=100;

        });

        //Grupo de imagenes estaticas que seran los muros o bordes del juego
        this.wall_floor = this.physics.add.staticGroup();

        this.wall_floor.create(433, 40, 'wall1').setOrigin(0);
        this.wall_floor.create(1890, 40, 'wall1').setOrigin(1, 0);
        this.wall_floor.create(433, 50, 'wall2').setOrigin(0, 1);
        this.wall_floor.create(433, 1060, 'wall2').setOrigin(0, 1);
        //El refresh es para que cargue bien las zonas de colision de la imagen
        this.wall_floor.refresh();
        
        console.log("Before Change", JSON.parse(JSON.stringify(config.Partida)));

        //Offset inicio de campo
        var inicioMapaX=433;
        var inicioMapaY=40;

        //Cargo campo y base para bando 1 - Potencias
        campoPotencias = config.Partida.campoPotencias;
        campoPotencias.posicionX+= inicioMapaX;
        campoPotencias.posicionY+= inicioMapaY;
 
        //Seteo el campo 
        this.imgCampoPotencias = this.add.image(campoPotencias.posicionX, campoPotencias.posicionY, "campo").setOrigin(0).setScale(1); 

        campoPotencias.base.posicionX+= inicioMapaX;
        campoPotencias.base.posicionY+= inicioMapaY;

        //Seteo la base y sus elementos
        this.add.image(campoPotencias.base.posicionX + 50, campoPotencias.base.posicionY + 50, 'pisoBase').setScale(.25);
        this.add.image(campoPotencias.base.posicionX+10, campoPotencias.base.posicionY + 10, 'contenedor_2').setScale(.15);
        this.add.image(campoPotencias.base.posicionX + 70, campoPotencias.base.posicionY + 10, 'depositoCombustible').setScale(.10);
        this.add.image(campoPotencias.base.posicionX +40, campoPotencias.base.posicionY + 70, 'torre').setScale(.07);
        avionXInicial = campoPotencias.base.posicionX ; 
      
        if(campoPotencias.posicionY > 540)
            avionYInicial = campoPotencias.base.posicionY -120;
         else
          avionYInicial  = campoPotencias.base.posicionY + 120;
        
        //Defino las artillerias de las Potencias
        artilleriasPotencias = this.physics.add.group({
            key: 'artilleria',
            repeat: config.Partida.configuraciones.artilleriaCantidad-1
        });
        for(var i = 0; i<config.Partida.configuraciones.artilleriaCantidad; i++){
            artilleriasPotencias.getChildren()[i].setX(campoPotencias.artillerias[i].posicionX + inicioMapaX);
            artilleriasPotencias.getChildren()[i].setY(campoPotencias.artillerias[i].posicionY + inicioMapaY);
            artilleriasPotencias.getChildren()[i].setScale(0.1);
            artilleriasPotencias.getChildren()[i].setCircle(450);
            artilleriasPotencias.getChildren()[i].setOffset(-250,-250);   
        }

        //Cargo base para bando 2 - Aliados
        campoAliados = config.Partida.campoAliados;
        campoAliados.posicionX+= inicioMapaX;
        campoAliados.posicionY+= inicioMapaY;

        //Seteo el campoAliados 
        this.campoAliados = this.add.image(campoAliados.posicionX, campoAliados.posicionY, "campo").setOrigin(0).setScale(1); 

        campoAliados.base.posicionX+= inicioMapaX;
        campoAliados.base.posicionY+= inicioMapaY;

        //Seteo la base enemiga y sus elementos
        this.add.image(campoAliados.base.posicionX + 50, campoAliados.base.posicionY + 50, 'pisoBase').setScale(.25);
        this.add.image(campoAliados.base.posicionX+10, campoAliados.base.posicionY + 10, 'contenedor_2').setScale(.15);
        this.add.image(campoAliados.base.posicionX + 70, campoAliados.base.posicionY + 10, 'depositoCombustible').setScale(.10);
        this.add.image(campoAliados.base.posicionX +40, campoAliados.base.posicionY + 70, 'torre').setScale(.07);
    
        //Defino las artillerias de los Aliados
        artilleriasAliados = this.physics.add.group({
            key: 'artilleria',
            repeat: config.Partida.configuraciones.artilleriaCantidad-1
        });

        for(var i = 0; i<config.Partida.configuraciones.artilleriaCantidad; i++){
            artilleriasAliados.getChildren()[i].setX(campoAliados.artillerias[i].posicionX + inicioMapaX);
            artilleriasAliados.getChildren()[i].setY(campoAliados.artillerias[i].posicionY + inicioMapaY);
            artilleriasAliados.getChildren()[i].setScale(0.1);
            artilleriasAliados.getChildren()[i].setCircle(450);
            artilleriasAliados.getChildren()[i].setOffset(-250,-250);     

        }
       
        //Se llama a funcion que definira los aviones          
        this.definicionAviones(); 
        
        //Se realiza la asignacion entre los aviones recien definidos con los que maneja la clase Partida
        config.Partida.avion_1 = avion_1;
        config.Partida.avion_2 = avion_2;
        config.Partida.avion_3 = avion_3;
        config.Partida.avion_4 = avion_4;
        config.Partida.avion_1_Aliados = avion_1_Aliados;
        config.Partida.avion_2_Aliados = avion_2_Aliados;
        config.Partida.avion_3_Aliados = avion_3_Aliados;
        config.Partida.avion_4_Aliados = avion_4_Aliados;
        
        this.BotonesLaterales();
        
        //Evento que escucha cuando se clickea con el mouse y llama al onObjectClicked
        this.input.on('pointerdown',this.onObjectClicked);   
        
        //Bullets, se define el grupo de balas que utilizaran los aviones
        bullets = this.add.group({
            classType: Bullet,
            maxSize: 1,
            runChildUpdate: true
        });
        this.colisiones();     
    }

    BotonesLaterales()
    {
        
        this.cargarBomba.on(Phaser.Input.Events.POINTER_DOWN, () => {
            this.add.tween({
                targets: this.cargarBomba,
                ease: 'Bounce.easeIn',                
                onComplete: () => {
                    
                    if (avion_1.focus==true)
                    {    
                        avion_1.cargarbomba=true;      
                        config.Partida.idavion=1;
                        avion_1.moverAvion({x: avion_1.xInicial, y: avion_1.yInicial});
                        config.Partida.sincronizar({x: avion_1.xInicial, y: avion_1.yInicial});
                    }  
                    if (avion_2.focus==true)
                    {      
                        avion_2.cargarbomba=true;       
                        config.Partida.idavion=1;
                        avion_2.moverAvion({x: avion_2.xInicial, y: avion_2.yInicial});
                        config.Partida.sincronizar({x: avion_2.xInicial, y: avion_2.yInicial});
                    } 
                    if (avion_3.focus==true)
                    {     
                        avion_3.cargarbomba=true;        
                        config.Partida.idavion=1;
                        avion_3.moverAvion({x: avion_3.xInicial, y: avion_3.yInicial});
                        config.Partida.sincronizar({x: avion_3.xInicial, y: avion_3.yInicial});
                    }  
                    if (avion_4.focus==true)
                    {    
                        avion_4.cargarbomba=true;         
                        config.Partida.idavion=1;
                        avion_4.moverAvion({x: avion_4.xInicial, y: avion_4.yInicial});
                        config.Partida.sincronizar({x: avion_4.xInicial, y: avion_4.yInicial});
                    } 

                    if (avion_1_Aliados.focus==true)
                    {    
                        avion_1_Aliados.cargarbomba=true;          
                        config.Partida.idavion=5;
                        avion_1_Aliados.moverAvion({x: avion_1_Aliados.xInicial, y: avion_1_Aliados.yInicial});
                        config.Partida.sincronizar({x: avion_1_Aliados.xInicial, y: avion_1_Aliados.yInicial});
                    }  
                    if (avion_2_Aliados.focus==true)
                    {   
                        avion_2_Aliados.cargarbomba=true;         
                        config.Partida.idavion=6;
                        avion_2_Aliados.moverAvion({x: avion_2_Aliados.xInicial, y: avion_2_Aliados.yInicial});
                        config.Partida.sincronizar({x: avion_2_Aliados.xInicial, y: avion_2_Aliados.yInicial});
                    } 
                    if (avion_3_Aliados.focus==true)
                    {      
                        avion_3_Aliados.cargarbomba=true;      
                        config.Partida.idavion=7;
                        avion_3_Aliados.moverAvion({x: avion_3_Aliados.xInicial, y: avion_3_Aliados.yInicial});
                        config.Partida.sincronizar({x: avion_3_Aliados.xInicial, y: avion_3_Aliados.yInicial});
                    }  
                    if (avion_4_Aliados.focus==true)
                    {      
                        avion_4_Aliados.cargarbomba=true;      
                        config.Partida.idavion=8;
                        avion_4_Aliados.moverAvion({x: avion_4_Aliados.xInicial, y: avion_4_Aliados.yInicial});
                        config.Partida.sincronizar({x: avion_4_Aliados.xInicial, y: avion_4_Aliados.yInicial});
                    } 
                }
            });
        });

        this.volverBase.on(Phaser.Input.Events.POINTER_DOWN, () => {
            this.add.tween({
                targets: this.cargarBomba,
                ease: 'Bounce.easeIn',                
                onComplete: () => {
                                        
                    if (avion_1.focus==true)
                    {            
                        avion_1.cargarCombustible=true;
                        config.Partida.idavion=1;
                        avion_1.moverAvion({x: avion_1.xInicial, y: avion_1.yInicial});
                        config.Partida.sincronizar({x: avion_1.xInicial, y: avion_1.yInicial});
                    }  
                    if (avion_2.focus==true)
                    {     
                        avion_2.cargarCombustible=true;       
                        config.Partida.idavion=1;
                        avion_2.moverAvion({x: avion_2.xInicial, y: avion_2.yInicial});
                        config.Partida.sincronizar({x: avion_2.xInicial, y: avion_2.yInicial});
                    } 
                    if (avion_3.focus==true)
                    {  
                        avion_3.cargarCombustible=true;           
                        config.Partida.idavion=1;
                        avion_3.moverAvion({x: avion_3.xInicial, y: avion_3.yInicial});
                        config.Partida.sincronizar({x: avion_3.xInicial, y: avion_3.yInicial});
                    }  
                    if (avion_4.focus==true)
                    {       
                        avion_4.cargarCombustible=true;      
                        config.Partida.idavion=1;
                        avion_4.moverAvion({x: avion_4.xInicial, y: avion_4.yInicial});
                        config.Partida.sincronizar({x: avion_4.xInicial, y: avion_4.yInicial});
                    } 

                    if (avion_1_Aliados.focus==true)
                    {        
                        avion_1_Aliados.cargarCombustible=true;     
                        config.Partida.idavion=5;
                        avion_1_Aliados.moverAvion({x: avion_1_Aliados.xInicial, y: avion_1_Aliados.yInicial});
                        config.Partida.sincronizar({x: avion_1_Aliados.xInicial, y: avion_1_Aliados.yInicial});
                    }  
                    if (avion_2_Aliados.focus==true)
                    {          
                        avion_3_Aliados.cargarCombustible=true;  
                        config.Partida.idavion=6;
                        avion_2_Aliados.moverAvion({x: avion_2_Aliados.xInicial, y: avion_2_Aliados.yInicial});
                        config.Partida.sincronizar({x: avion_2_Aliados.xInicial, y: avion_2_Aliados.yInicial});
                    } 
                    if (avion_3_Aliados.focus==true)
                    {      
                        avion_3_Aliados.cargarCombustible=true;      
                        config.Partida.idavion=7;
                        avion_3_Aliados.moverAvion({x: avion_3_Aliados.xInicial, y: avion_3_Aliados.yInicial});
                        config.Partida.sincronizar({x: avion_3_Aliados.xInicial, y: avion_3_Aliados.yInicial});
                    }  
                    if (avion_4_Aliados.focus==true)
                    {     
                        avion_4_Aliados.cargarCombustible=true;       
                        config.Partida.idavion=8;
                        avion_4_Aliados.moverAvion({x: avion_4_Aliados.xInicial, y: avion_4_Aliados.yInicial});
                        config.Partida.sincronizar({x: avion_4_Aliados.xInicial, y: avion_4_Aliados.yInicial});
                    } 
                }
            });
        });
    }

    colisiones()
    { 
      
            //si intento hacer que la artilleria dispare pero hay que ver como sacar la que hizo colision
        this.physics.add.overlap(avion_1,artilleriasAliados, ()=>
        {   
            console.log('estoy acaac');
            if (avion_1.altitud == 'Baja')
                {
                 
                    if (this.time > lastFired)
                    { 
                        this.dispararArtilleria(artilleriasAliados.getChildren(),avion_1)  
                        lastFired = this.time + 500;               
                    } 
                }
        });

      
        //Aniado colision entre los aviones y los muros
        this.physics.add.collider([avion_1,avion_2,avion_3,avion_4,avion_1_Aliados,avion_2_Aliados,avion_3_Aliados,avion_4_Aliados],this.wall_floor);       
        
        
        if (config.Partida.Bando=='Potencias')
        { 
            this.physics.add.overlap(this.circulo_1,avion_1_Aliados, ()=>
            {   
                if (avion_1.altitud == avion_1_Aliados.altitud)
                {
                    avion_1_Aliados.setVisible(true);
                    if (this.time > lastFired)
                    { 
                        this.disparar(avion_1,avion_1_Aliados)  
                        lastFired = this.time + 500;               
                    } 
                }
            });
            this.physics.add.overlap(this.circulo_1,avion_2_Aliados, ()=>
            {   
                if (avion_1.altitud == avion_2_Aliados.altitud)
                {
                    avion_2_Aliados.setVisible(true);
                    if (this.time > lastFired)
                    { 
                        this.disparar(avion_1,avion_2_Aliados)  
                        lastFired = this.time + 500;               
                    } 
                }
            });
            this.physics.add.overlap(this.circulo_1,avion_3_Aliados, ()=>
            {   
                if (avion_1.altitud == avion_3_Aliados.altitud)
                {
                    avion_3_Aliados.setVisible(true);
                    if (this.time > lastFired)
                    { 
                        this.disparar(avion_1,avion_3_Aliados)  
                        lastFired = this.time + 500;               
                    } 
                }
            });

            this.physics.add.overlap(this.circulo_1,avion_4_Aliados, ()=>
            {   
                if (avion_1.altitud == avion_4_Aliados.altitud)
                {
                    avion_4_Aliados.setVisible(true);
                    if (this.time > lastFired)
                    { 
                        this.disparar(avion_1,avion_4_Aliados)  
                        lastFired = this.time + 500;               
                    } 
                }
            });

            //avion 2
            this.physics.add.overlap(this.circulo_2,avion_1_Aliados, ()=>
            {   
                if (avion_2.altitud == avion_1_Aliados.altitud)
                {
                    avion_1_Aliados.setVisible(true);
                    if (this.time > lastFired)
                    { 
                        this.disparar(avion_2,avion_1_Aliados)  
                        lastFired = this.time + 500;               
                    } 
                }
            });
            this.physics.add.overlap(this.circulo_2,avion_2_Aliados, ()=>
            {   
                if (avion_2.altitud == avion_2_Aliados.altitud)
                {
                    avion_2_Aliados.setVisible(true);
                    if (this.time > lastFired)
                    { 
                        this.disparar(avion_2,avion_2_Aliados)  
                        lastFired = this.time + 500;               
                    } 
                }
            });
            this.physics.add.overlap(this.circulo_2,avion_3_Aliados, ()=>
            {   
                if (avion_2.altitud == avion_3_Aliados.altitud)
                {
                    avion_3_Aliados.setVisible(true);
                    if (this.time > lastFired)
                    { 
                        this.disparar(avion_2,avion_3_Aliados)  
                        lastFired = this.time + 500;               
                    } 
                }
            });

            this.physics.add.overlap(this.circulo_2,avion_4_Aliados, ()=>
            {   
                if (avion_2.altitud == avion_4_Aliados.altitud)
                {
                    avion_4_Aliados.setVisible(true);
                    if (this.time > lastFired)
                    { 
                        this.disparar(avion_2,avion_4_Aliados)  
                        lastFired = this.time + 500;               
                    } 
                }
            });

            //Avion 3
            this.physics.add.overlap(this.circulo_3,avion_1_Aliados, ()=>
            {   
                if (avion_3.altitud == avion_1_Aliados.altitud)
                {
                    avion_1_Aliados.setVisible(true);
                    if (this.time > lastFired)
                    { 
                        this.disparar(avion_3,avion_1_Aliados)  
                        lastFired = this.time + 500;               
                    } 
                }
            });
            this.physics.add.overlap(this.circulo_3,avion_2_Aliados, ()=>
            {   
                if (avion_3.altitud == avion_2_Aliados.altitud)
                {
                    avion_2_Aliados.setVisible(true);
                    if (this.time > lastFired)
                    { 
                        this.disparar(avion_3,avion_2_Aliados)  
                        lastFired = this.time + 500;               
                    } 
                }
            });
            this.physics.add.overlap(this.circulo_3,avion_3_Aliados, ()=>
            {   
                if (avion_3.altitud == avion_3_Aliados.altitud)
                {
                    avion_3_Aliados.setVisible(true);
                    if (this.time > lastFired)
                    { 
                        this.disparar(avion_3,avion_3_Aliados)  
                        lastFired = this.time + 500;               
                    } 
                }
            });

            this.physics.add.overlap(this.circulo_3,avion_4_Aliados, ()=>
            {   
                if (avion_3.altitud == avion_4_Aliados.altitud)
                {
                    avion_4_Aliados.setVisible(true);
                    if (this.time > lastFired)
                    { 
                        this.disparar(avion_3,avion_4_Aliados)  
                        lastFired = this.time + 500;               
                    } 
                }
            });
            //Avion 4
            this.physics.add.overlap(this.circulo_4,avion_1_Aliados, ()=>
            {   
                if (avion_4.altitud == avion_1_Aliados.altitud)
                {
                    avion_1_Aliados.setVisible(true);
                    if (this.time > lastFired)
                    { 
                        this.disparar(avion_4,avion_1_Aliados)  
                        lastFired = this.time + 500;               
                    } 
                }
            });
            this.physics.add.overlap(this.circulo_4,avion_2_Aliados, ()=>
            {   
                if (avion_4.altitud == avion_2_Aliados.altitud)
                {
                    avion_2_Aliados.setVisible(true);
                    if (this.time > lastFired)
                    { 
                        this.disparar(avion_4,avion_2_Aliados)  
                        lastFired = this.time + 500;               
                    } 
                }
            });
            this.physics.add.overlap(this.circulo_4,avion_3_Aliados, ()=>
            {   
                if (avion_4.altitud == avion_3_Aliados.altitud)
                {
                    avion_3_Aliados.setVisible(true);
                    if (this.time > lastFired)
                    { 
                        this.disparar(avion_4,avion_3_Aliados)  
                        lastFired = this.time + 500;               
                    } 
                }
            });

            this.physics.add.overlap(this.circulo_4,avion_4_Aliados, ()=>
            {   
                if (avion_4.altitud == avion_4_Aliados.altitud)
                {
                    avion_4_Aliados.setVisible(true);
                    if (this.time > lastFired)
                    { 
                        this.disparar(avion_4,avion_4_Aliados)  
                        lastFired = this.time + 500;               
                    } 
                }
            });


            //////////// balas
            this.physics.add.overlap(avion_1_Aliados,bullets, ()=>
            {
                var Hit = Phaser.Math.Between(1,2);
                if (Hit == 1 )
                    avion_1_Aliados.vidaAvion-=10;                                
                bullets.remove(bullets.getLast(true),true);
                console.log('avion Aliado :'+avion_1_Aliados.vidaAvion);
            }); 

            this.physics.add.overlap(avion_2_Aliados,bullets, ()=>
            {
                var Hit = Phaser.Math.Between(1,2);
                if (Hit == 1 )
                    avion_2_Aliados.vidaAvion-=10;                                
                bullets.remove(bullets.getLast(true),true);
                console.log('avion Aliado 2 :'+avion_2_Aliados.vidaAvion);
            }); 

            this.physics.add.overlap(avion_3_Aliados,bullets, ()=>
            {
                var Hit = Phaser.Math.Between(1,2);
                if (Hit == 1 )
                    avion_3_Aliados.vidaAvion-=10;                                
                bullets.remove(bullets.getLast(true),true);
                console.log('avion Aliado 3 :'+avion_3_Aliados.vidaAvion);
            }); 

            this.physics.add.overlap(avion_4_Aliados,bullets, ()=>
            {
                var Hit = Phaser.Math.Between(1,2);
                if (Hit == 1 )
                    avion_4_Aliados.vidaAvion-=10;                                
                bullets.remove(bullets.getLast(true),true);
                console.log('avion Aliado 4 :'+avion_4_Aliados.vidaAvion);
            }); 
        }
        else
        {    
            ////////Colisiones avion_1_Aliado
            this.physics.add.overlap(this.circulo_5,avion_1, ()=>
            {   
                if (avion_1.altitud == avion_1_Aliados.altitud)
                {
                    avion_1.setVisible(true);
                    if (this.time > lastFired)
                    { 
                        this.disparar(avion_1_Aliados,avion_1)  
                        lastFired = this.time + 500;               
                    } 
                }
            });

            this.physics.add.overlap(this.circulo_5,avion_2, ()=>
            {   
                if (avion_2.altitud == avion_1_Aliados.altitud)
                {
                    avion_2.setVisible(true);
                    if (this.time > lastFired)
                    { 
                        this.disparar(avion_1_Aliados,avion_2)  
                        lastFired = this.time + 500;               
                    } 
                }
            });

            this.physics.add.overlap(this.circulo_5,avion_3, ()=>
            {   
                if (avion_3.altitud == avion_1_Aliados.altitud)
                {
                    avion_3.setVisible(true);
                    if (this.time > lastFired)
                    { 
                        this.disparar(avion_1_Aliados,avion_3)  
                        lastFired = this.time + 500;               
                    } 
                }
            });

            this.physics.add.overlap(this.circulo_5,avion_4, ()=>
            {   
                if (avion_4.altitud == avion_1_Aliados.altitud)
                {
                    avion_4.setVisible(true);
                    if (this.time > lastFired)
                    { 
                        this.disparar(avion_1_Aliados,avion_4)  
                        lastFired = this.time + 500;               
                    } 
                }
            });
            ////////Colisiones avion_2_Aliado
            this.physics.add.overlap(this.circulo_6,avion_1, ()=>
            {   
                if (avion_1.altitud == avion_2_Aliados.altitud)
                {
                    avion_1.setVisible(true);
                    if (this.time > lastFired)
                    { 
                        this.disparar(avion_2_Aliados,avion_1)  
                        lastFired = this.time + 500;               
                    } 
                }
            });

            this.physics.add.overlap(this.circulo_6,avion_2, ()=>
            {   
                if (avion_2.altitud == avion_2_Aliados.altitud)
                {
                    avion_2.setVisible(true);
                    if (this.time > lastFired)
                    { 
                        this.disparar(avion_2_Aliados,avion_2)  
                        lastFired = this.time + 500;               
                    } 
                }
            });

            this.physics.add.overlap(this.circulo_6,avion_3, ()=>
            {   
                if (avion_3.altitud == avion_2_Aliados.altitud)
                {
                    avion_3.setVisible(true);
                    if (this.time > lastFired)
                    { 
                        this.disparar(avion_2_Aliados,avion_3)  
                        lastFired = this.time + 500;               
                    } 
                }
            });

            this.physics.add.overlap(this.circulo_6,avion_4, ()=>
            {   
                if (avion_4.altitud == avion_2_Aliados.altitud)
                {
                    avion_4.setVisible(true);
                    if (this.time > lastFired)
                    { 
                        this.disparar(avion_2_Aliados,avion_4)  
                        lastFired = this.time + 500;               
                    } 
                }
            });
            ////////Colisiones avion_3_Aliado
            this.physics.add.overlap(this.circulo_7,avion_1, ()=>
            {   
                if (avion_1.altitud == avion_3_Aliados.altitud)
                {
                    avion_1.setVisible(true);
                    if (this.time > lastFired)
                    { 
                        this.disparar(avion_3_Aliados,avion_1)  
                        lastFired = this.time + 500;               
                    } 
                }
            });

            this.physics.add.overlap(this.circulo_7,avion_2, ()=>
            {   
                if (avion_2.altitud == avion_3_Aliados.altitud)
                {
                    avion_2.setVisible(true);
                    if (this.time > lastFired)
                    { 
                        this.disparar(avion_3_Aliados,avion_2)  
                        lastFired = this.time + 500;               
                    } 
                }
            });

            this.physics.add.overlap(this.circulo_7,avion_3, ()=>
            {   
                if (avion_3.altitud == avion_3_Aliados.altitud)
                {
                    avion_3.setVisible(true);
                    if (this.time > lastFired)
                    { 
                        this.disparar(avion_3_Aliados,avion_3)  
                        lastFired = this.time + 500;               
                    } 
                }
            });

            this.physics.add.overlap(this.circulo_7,avion_4, ()=>
            {   
                if (avion_4.altitud == avion_3_Aliados.altitud)
                {
                    avion_4.setVisible(true);
                    if (this.time > lastFired)
                    { 
                        this.disparar(avion_3_Aliados,avion_4)  
                        lastFired = this.time + 500;               
                    } 
                }
            });

            ////////Colisiones avion_3_Aliado
            this.physics.add.overlap(this.circulo_7,avion_1, ()=>
            {   
                if (avion_1.altitud == avion_4_Aliados.altitud)
                {
                    avion_1.setVisible(true);
                    if (this.time > lastFired)
                    { 
                        this.disparar(avion_4_Aliados,avion_1)  
                        lastFired = this.time + 500;               
                    } 
                }
            });

            this.physics.add.overlap(this.circulo_8,avion_2, ()=>
            {   
                if (avion_2.altitud == avion_4_Aliados.altitud)
                {
                    avion_2.setVisible(true);
                    if (this.time > lastFired)
                    { 
                        this.disparar(avion_3_Aliados,avion_2)  
                        lastFired = this.time + 500;               
                    } 
                }
            });

            this.physics.add.overlap(this.circulo_8,avion_3, ()=>
            {   
                if (avion_3.altitud == avion_4_Aliados.altitud)
                {
                    avion_3.setVisible(true);
                    if (this.time > lastFired)
                    { 
                        this.disparar(avion_4_Aliados,avion_3)  
                        lastFired = this.time + 500;               
                    } 
                }
            });

            this.physics.add.overlap(this.circulo_8,avion_4, ()=>
            {   
                if (avion_4.altitud == avion_4_Aliados.altitud)
                {
                    avion_4.setVisible(true);
                    if (this.time > lastFired)
                    { 
                        this.disparar(avion_4_Aliados,avion_4)  
                        lastFired = this.time + 500;               
                    } 
                }
            });
            /// Bala con aviones con bando 1
            this.physics.add.overlap(avion_1,bullets, ()=>
            {
                var Hit = Phaser.Math.Between(1,2);
                if (Hit == 1 )
                    avion_1.vidaAvion-=10;           
                bullets.remove(bullets.getLast(true),true);
                console.log('avion 1 :'+avion_1.vidaAvion);
            }); 

            this.physics.add.overlap(avion_2,bullets, ()=>
            {
                var Hit = Phaser.Math.Between(1,2);
                if (Hit == 1)
                    avion_2.vidaAvion-=10;           
                bullets.remove(bullets.getLast(true),true);
                console.log('avion 2 :'+avion_2.vidaAvion);
            }); 

            this.physics.add.overlap(avion_3,bullets, ()=>
            {
                var Hit = Phaser.Math.Between(1,2);
                if (Hit == 1)
                    avion_3.vidaAvion-=10;           
                bullets.remove(bullets.getLast(true),true);
                console.log('avion 3 :'+avion_3.vidaAvion);
            }); 

            this.physics.add.overlap(avion_4,bullets, ()=>
            {
                var Hit = Phaser.Math.Between(1,2);
                if (Hit == 1 )
                    avion_4.vidaAvion-=10;           
                bullets.remove(bullets.getLast(true),true);
                console.log('avion 4 :'+avion_4.vidaAvion);
            });
        }
    }
    //----------------//
    
    //Evento llamado al realizar click con el mouse
    onObjectClicked(pointer)
    {  
        //Comienzo a chequear que avion o elemento se encuentra en focus para ejecutar su correspondiente accion       
    if (config.Partida.Bando=='Potencias')
    {
        if (avion_2.focus==true)
        {            
            config.Partida.idavion=2;
            avion_2.moverAvion({x: pointer.x, y: pointer.y});
            config.Partida.sincronizar({x: pointer.x, y: pointer.y});
        } 

        if (avion_1.focus==true)
        {            
            config.Partida.idavion=1;
            avion_1.moverAvion({x: pointer.x, y: pointer.y});
            config.Partida.sincronizar({x: pointer.x, y: pointer.y});
        }  

        if (avion_3.focus==true)
        {            
            config.Partida.idavion=3;
            avion_3.moverAvion({x: pointer.x, y: pointer.y});
            config.Partida.sincronizar({x: pointer.x, y: pointer.y});
        }  

        if (avion_4.focus==true)
        {            
            config.Partida.idavion=4;
            avion_4.moverAvion({x: pointer.x, y: pointer.y});
            config.Partida.sincronizar({x: pointer.x, y: pointer.y});
        } 
    }
        else
        {
        if (avion_1_Aliados.focus==true)
        {
            config.Partida.idavion=5;
            avion_1_Aliados.moverAvion({x: pointer.x, y: pointer.y});
            config.Partida.sincronizar({x: pointer.x, y: pointer.y});
        }
        if (avion_2_Aliados.focus==true)
        {
            config.Partida.idavion=6;
            avion_2_Aliados.moverAvion({x: pointer.x, y: pointer.y});
            config.Partida.sincronizar({x: pointer.x, y: pointer.y});
        }
        if (avion_3_Aliados.focus==true)
        {
            config.Partida.idavion=7;
            avion_3_Aliados.moverAvion({x: pointer.x, y: pointer.y});
            config.Partida.sincronizar({x: pointer.x, y: pointer.y});
        }
        if (avion_4_Aliados.focus==true)
        {
            config.Partida.idavion=8;
            avion_4_Aliados.moverAvion({x: pointer.x, y: pointer.y});
            config.Partida.sincronizar({x: pointer.x, y: pointer.y});
        }
    }
    }


    //Evento  llamado al disparar automaticamente 
    disparar(avion_focus,avion_A_pegar)
    {           
        //Se pasa el avion que esta en focus 
        bullet = bullets.get();
        if (bullet)
        {
            bullet.fire(avion_focus,{x: avion_A_pegar.x, y: avion_A_pegar.y});  
        }  
    }
     //Evento  llamado al disparar automaticamente artilleria
     dispararArtilleria(artilleria_focus,avion_A_pegar)
     {           
         //Se pasa el avion que esta en focus 
         bullet = bullets.get();
         if (bullet)
         {
             bullet.fireArtilleria(artilleria_focus,{x: avion_A_pegar.x, y: avion_A_pegar.y});  
         }  
     }
 

 
    
    definicionAviones()
    {	
        var velAvion = config.Partida.configuraciones.avionVelocidad;        
                // Personaje
        avion_1 = new Avion({
            scene: this,
     /*       x: avionXInicial,
            y: avionYInicial,
            xInicial: avionXInicial,
            yInicial: avionYInicial,*/
            x: 500,
            y: 200,
            estoyEnBase : false                              
        }).setInteractive();      
        avion_1.velocidad = velAvion;
        this.circulo_1 = this.add.image(avion_1.x-50,avion_1.y-50,'circuloAvion').setScale(1.5);
        this.physics.world.enable(this.circulo_1);
        this.circulo_1.body.setCircle(35);
        this.circulo_1.body.setOffset(15,16);     

        
        avion_2 = new Avion({
            scene: this,
            x: 500,
            y: 400,
            estoyEnBase : false            
        }).setInteractive();      
        avion_2.velocidad = velAvion;  
        this.circulo_2 = this.add.image(avion_2.x-50,avion_2.y-50,'circuloAvion').setScale(1.5);
        this.physics.world.enable(this.circulo_2);
        this.circulo_2.body.setCircle(35);
        this.circulo_2.body.setOffset(15,16);

        avion_3 = new Avion({
            scene: this,
            x: 500,
            y: 600,
            estoyEnBase : false         
        }).setInteractive(); 
        avion_3.velocidad = velAvion;       
        this.circulo_3 = this.add.image(avion_3.x-50,avion_3.y-50,'circuloAvion').setScale(1.5);
        this.physics.world.enable(this.circulo_3);
        this.circulo_3.body.setCircle(35);
        this.circulo_3.body.setOffset(15,16);

        avion_4 = new Avion({
            scene: this,
            x: 500,
            y: 800,
            estoyEnBase: false           
        }).setInteractive();  
        avion_4.velocidad = velAvion;      
        this.circulo_4 = this.add.image(avion_4.x-50,avion_4.y-50,'circuloAvion').setScale(1.5);
        this.physics.world.enable(this.circulo_4);
        this.circulo_4.body.setCircle(35);
        this.circulo_4.body.setOffset(15,16);

        avion_1_Aliados = new Avion({
            scene: this,
            x: 1500,
            y: 200,
        }).setInteractive();      
        avion_1_Aliados.velocidad = velAvion; 
        this.circulo_5 = this.add.image(avion_1_Aliados.x-50,avion_1_Aliados.y-50,'circuloAvion').setScale(1.5);
        this.physics.world.enable(this.circulo_5);
        this.circulo_5.body.setCircle(35);
        this.circulo_5.body.setOffset(15,16); 

        avion_2_Aliados = new Avion({
            scene: this,
            x: 1500,
            y: 400,
        }).setInteractive();       
        avion_2_Aliados.velocidad = velAvion; 
        this.circulo_6 = this.add.image(avion_2_Aliados.x-50,avion_2_Aliados.y-50,'circuloAvion').setScale(1.5);
        this.physics.world.enable(this.circulo_6);
        this.circulo_6.body.setCircle(35);
        this.circulo_6.body.setOffset(15,16);

        avion_3_Aliados = new Avion({
            scene: this,
            x: 1500,
            y: 600,
        }).setInteractive();   
        avion_3_Aliados.velocidad = velAvion;      
        this.circulo_7 = this.add.image(avion_3_Aliados.x-50,avion_3_Aliados.y-50,'circuloAvion').setScale(1.5);
        this.physics.world.enable(this.circulo_7);
        this.circulo_7.body.setCircle(35);
        this.circulo_7.body.setOffset(15,16);

        avion_4_Aliados = new Avion({
            scene: this,
            x: 1500,
            y: 800,
        }).setInteractive();       
        avion_4_Aliados.velocidad = velAvion;  
        this.circulo_8 = this.add.image(avion_4_Aliados.x-50,avion_4_Aliados.y-50,'circuloAvion').setScale(1.5);
        this.physics.world.enable(this.circulo_8);
        this.circulo_8.body.setCircle(35);
        this.circulo_8.body.setOffset(15,16);
        
        this.keys = this.input.keyboard.createCursorKeys();
        this.keys.up.on('down',()=>
        {            
            if (avion_1.focus==true){
                avion_1.altitud='Alta'
                avion_1.setScale(0.09);
                this.vistaLateral = this.add.image(45,47,'nubeslateral').setOrigin(0).setScale(1);
                this.boton_5.depth=100;
                this.boton_6.depth=100;
                this.avionVistaLateral.depth=100;
            }
            if (avion_2.focus==true){
                avion_2.altitud='Alta'
                avion_2.setScale(0.09);
                this.vistaLateral = this.add.image(45,47,'nubeslateral').setOrigin(0).setScale(1);
                this.boton_5.depth=100;
                this.boton_6.depth=100;
                this.avionVistaLateral.depth=100;
            }
            if (avion_3.focus==true){
                avion_3.altitud='Alta'
                avion_3.setScale(0.09);
                this.vistaLateral = this.add.image(45,47,'nubeslateral').setOrigin(0).setScale(1);
                this.boton_5.depth=100;
                this.boton_6.depth=100;
                this.avionVistaLateral.depth=100;
            }
            if (avion_4.focus==true){
                avion_4.altitud='Alta'  
                avion_4.setScale(0.09); 
                this.vistaLateral = this.add.image(45,47,'nubeslateral').setOrigin(0).setScale(1);
                this.boton_5.depth=100;
                this.boton_6.depth=100;
                this.avionVistaLateral.depth=100;
            }     
        });

        this.keys.down.on('down',()=>
        {            
            if (avion_1.focus==true){
                avion_1.altitud='Baja'
                avion_1.setScale(0.07);
                this.vistaLateral = this.add.image(45,47,'vistaLateralBaja').setOrigin(0).setScale(1);
                this.boton_5.depth=100;
                this.boton_6.depth=100;
                this.avionVistaLateral.depth=100;
            }
            if (avion_2.focus==true){
                avion_2.altitud='Baja'
                avion_2.setScale(0.07);
                this.vistaLateral = this.add.image(45,47,'vistaLateralBaja').setOrigin(0).setScale(1);
                this.boton_5.depth=100;
                this.boton_6.depth=100;
                this.avionVistaLateral.depth=100;
            }
            if (avion_3.focus==true){
                avion_3.altitud='Baja'
                avion_3.setScale(0.07);
                this.vistaLateral = this.add.image(45,47,'vistaLateralBaja').setOrigin(0).setScale(1);
                this.boton_5.depth=100;
                this.boton_6.depth=100;
                this.avionVistaLateral.depth=100;
            }
            if (avion_4.focus==true){
                avion_4.altitud='Baja'
                avion_4.setScale(0.07);
                this.vistaLateral = this.add.image(45,47,'vistaLateralBaja').setOrigin(0).setScale(1);
                this.boton_5.depth=100;
                this.boton_6.depth=100;
                this.avionVistaLateral.depth=100;
            }    
        });

        this.input.keyboard.on('keydown',(evento)=>{
            if (config.Partida.Bando=='Potencias')
            {
                
                if (evento.key==='1' )  
                {    
                    avion_1.focus=true;
                    avion_2.focus=false;
                    avion_3.focus=false;
                    avion_4.focus=false;
                }
                if (evento.key==='2')  
                {    
                    avion_2.focus=true;
                    avion_1.focus=false;
                    avion_3.focus=false;
                    avion_4.focus=false;
                }
                if (evento.key==='3')  
                {    
                    avion_3.focus=true;
                    avion_1.focus=false;
                    avion_2.focus=false;
                    avion_4.focus=false;
                }
                if (evento.key==='4')  
                {    
                    avion_4.focus=true;
                    avion_1.focus=false;
                    avion_2.focus=false;
                    avion_3.focus=false;
                }                        
            } 
            else
            { 
                if (evento.key==='1' )  
                {    
                    avion_1_Aliados.focus=true;
                    avion_2_Aliados.focus=false;
                    avion_3_Aliados.focus=false;
                    avion_4_Aliados.focus=false;
                }
                if (evento.key==='2')  
                {    
                    avion_1_Aliados.focus=false;
                    avion_2_Aliados.focus=true;
                    avion_3_Aliados.focus=false;
                    avion_4_Aliados.focus=false;
                }
                if (evento.key==='3')  
                {    
                    avion_1_Aliados.focus=false;
                    avion_2_Aliados.focus=false;
                    avion_3_Aliados.focus=true;
                    avion_4_Aliados.focus=false;
                }
                if (evento.key==='4')  
                {    
                    avion_1_Aliados.focus=false;
                    avion_2_Aliados.focus=false;
                    avion_3_Aliados.focus=false;
                    avion_4_Aliados.focus=true;
                }   
            }
        });
        if (config.Partida.Bando=='Potencias')
        {
            avion_1_Aliados.setVisible(false);
            avion_2_Aliados.setVisible(false);
            avion_3_Aliados.setVisible(false);
            avion_4_Aliados.setVisible(false);            
        }
        else
        {
            avion_1.setVisible(false);
            avion_2.setVisible(false);
            avion_3.setVisible(false);
            avion_4.setVisible(false);            
        }
           
    }


    EstaMoviendose(avion)
    {
        difX= Math.abs(avion.x - avion.xInicial); 
        difY= Math.abs(avion.y - avion.yInicial);

        if (difX < 1.5 && difY < 1.5)
        {      
            avion.combustible = 2000;      
            if (avion.cargarbomba==true)
            {
                avion.body.setVelocityY(0);
                avion.body.setVelocityX(0);
                avion.cargarbomba=false;
            }
            if (avion.cargarCombustible==true)
            {
                avion.body.setVelocityY(0);
                avion.body.setVelocityX(0);
                avion.cargarCombustible=false;
            }            
            return false;
        }
        else
            return true;           
    }

    MostrarOcultarAvion(avion)
    {        
        var dx;
        var dy;        
        if (config.Partida.Bando=='Aliados')
        { 
            dx = avion.x - avion_1_Aliados.x;
            dy = avion.y - avion_1_Aliados.y;
            distance = Math.sqrt(dx * dx + dy * dy); 
                    
            if (distance < 100)      
            {   
                return true;           
            } 
            
            dx = avion.x - avion_2_Aliados.x;
            dy = avion.y - avion_2_Aliados.y;
            distance = Math.sqrt(dx * dx + dy * dy);         
            if (distance < 100)      
            {   
                return true;           
            } 

            dx = avion.x - avion_3_Aliados.x;
            dy = avion.y - avion_3_Aliados.y;
            distance = Math.sqrt(dx * dx + dy * dy);         
            if (distance < 100)      
            {   
                return true;           
            } 

            dx = avion.x - avion_4_Aliados.x;
            dy = avion.y - avion_4_Aliados.y;
            distance = Math.sqrt(dx * dx + dy * dy);         
            if (distance < 100)      
            { 
                return true;           
            } 
        } 
        else
        {
            
            dx = avion.x - avion_1.x;
            dy = avion.y - avion_1.y;           
            distance = Math.sqrt(dx * dx + dy * dy);                   
            if (distance < 100)      
            {                   
                return true;           
            } 
            
            dx = avion.x - avion_2.x;
            dy = avion.y - avion_2.y;
            distance = Math.sqrt(dx * dx + dy * dy);         
            if (distance < 100)      
            {   
                return true;           
            } 

            dx = avion.x - avion_3.x;
            dy = avion.y - avion_3.y;
            distance = Math.sqrt(dx * dx + dy * dy);         
            if (distance < 100)      
            {   
                return true;           
            } 

            dx = avion.x - avion_4.x;
            dy = avion.y - avion_4.y;
            distance = Math.sqrt(dx * dx + dy * dy);         
            if (distance < 100)      
            {   
                return true;           
            } 
        }
        return false;
    }

    update(time,delta)
    {    
        
        //Tiempo que se usa para las balas 
        this.time = time;
        if (config.Partida.Bando=='Potencias')
        {
            if (this.EstaMoviendose(avion_1) && time>timeNafta)
            {                
                if(avion_1.combustible!=0)
                {   
                    timeNafta =timeNafta+1000;                    
                    console.log(avion_1.combustible);
                    avion_1.combustible--;
                }
            }
            if (this.EstaMoviendose(avion_2) && time>timeNafta)
            {                
                if(avion_2.combustible!=0)
                {   
                    timeNafta =timeNafta+1000;                    
                    console.log(avion_2.combustible);
                    avion_2.combustible--;
                }
            }
            if (this.EstaMoviendose(avion_3) && time>timeNafta)
            {                
                if(avion_3.combustible!=0)
                {   
                    timeNafta =timeNafta+1000;                    
                    console.log(avion_3.combustible);
                    avion_3.combustible--;
                }
            }            
            if (this.EstaMoviendose(avion_4) && time>timeNafta)
            {                
                if(avion_4.combustible!=0)
                {   
                    timeNafta =timeNafta+1000;                    
                    console.log(avion_4.combustible);
                    avion_4.combustible--;
                }
            }
    }
    else
    {
            if (this.EstaMoviendose(avion_1_Aliados) && time>timeNafta)
            {                
                if(avion_1_Aliados.combustible!=0)
                {   
                    timeNafta =timeNafta+1000;                    
                    console.log(avion_1_Aliados.combustible);
                    avion_1_Aliados.combustible--;
                }
            }
            if (this.EstaMoviendose(avion_2_Aliados) && time>timeNafta)
            {                
                if(avion_2_Aliados.combustible!=0)
                {   
                    timeNafta =timeNafta+1000;                    
                    console.log(avion_2_Aliados.combustible);
                    avion_2_Aliados.combustible--;
                }
            }
            if (this.EstaMoviendose(avion_3_Aliados) && time>timeNafta)
            {                
                if(avion_3_Aliados.combustible!=0)
                {   
                    timeNafta =timeNafta+1000;                    
                    console.log(avion_3_Aliados.combustible);
                    avion_3_Aliados.combustible--;
                }
            }            
            if (this.EstaMoviendose(avion_4_Aliados) && time>timeNafta)
            {                
                if(avion_4_Aliados.combustible!=0)
                {   
                    timeNafta =timeNafta+1000;                    
                    console.log(avion_4_Aliados.combustible);
                    avion_4_Aliados.combustible--;
                }
            }
    }
        this.circulo_1.setPosition(avion_1.x, avion_1.y);  
        this.circulo_2.setPosition(avion_2.x, avion_2.y);
        this.circulo_3.setPosition(avion_3.x, avion_3.y);
        this.circulo_4.setPosition(avion_4.x, avion_4.y);

        this.circulo_5.setPosition(avion_1_Aliados.x, avion_1_Aliados.y);  
        this.circulo_6.setPosition(avion_2_Aliados.x, avion_2_Aliados.y);
        this.circulo_7.setPosition(avion_3_Aliados.x, avion_3_Aliados.y);
        this.circulo_8.setPosition(avion_4_Aliados.x, avion_4_Aliados.y); 
     
        if (config.Partida.Bando=='Aliados')
        {           
            if (!this.MostrarOcultarAvion(avion_1)) 
                avion_1.setVisible(false);  

            if (!this.MostrarOcultarAvion(avion_2)) 
                avion_2.setVisible(false); 

            if (!this.MostrarOcultarAvion(avion_3)) 
                avion_3.setVisible(false);  

            if (!this.MostrarOcultarAvion(avion_4)) 
                avion_4.setVisible(false);
        }
        else
        {            
            if (!this.MostrarOcultarAvion(avion_1_Aliados)) 
                avion_1_Aliados.setVisible(false);  

            if (!this.MostrarOcultarAvion(avion_2_Aliados)) 
                avion_2_Aliados.setVisible(false); 

            if (!this.MostrarOcultarAvion(avion_3_Aliados)) 
                avion_3_Aliados.setVisible(false);  

            if (!this.MostrarOcultarAvion(avion_4_Aliados)) 
                avion_4_Aliados.setVisible(false);
        }

        //Se prueba evento de destruccion de avion al llegar la vida a 0
        if(avion_1.vidaAvion == 0) 
            avion_1.destroy();  
        if(avion_2.vidaAvion == 0) 
            avion_2.destroy();  
        if(avion_3.vidaAvion == 0) 
            avion_3.destroy();  
        if(avion_4.vidaAvion == 0) 
            avion_4.destroy();   
        if(avion_1_Aliados.vidaAvion == 0) 
            avion_1_Aliados.destroy(); 
        if(avion_2_Aliados.vidaAvion == 0) 
            avion_2_Aliados.destroy(); 
        if(avion_3_Aliados.vidaAvion == 0) 
            avion_3_Aliados.destroy(); 
        if(avion_4_Aliados.vidaAvion == 0) 
            avion_4_Aliados.destroy(); 
            
    }



}


export  default Play;
