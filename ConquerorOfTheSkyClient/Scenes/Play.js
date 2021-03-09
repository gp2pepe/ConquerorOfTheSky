import Avion from '../Objects/Avion.js';
import Bullet from '../Objects/Bullet.js';
import { config,game } from '../lib/main.js';

//using System.Threading;

//Variables Globales
var avion_1;
var avion_2;
var avion_3;
var avion_4;
var avion_1_Aliados;
var avion_2_Aliados;
var avion_3_Aliados;
var avion_4_Aliados;
var bullets;
var bulletsPotencias;
var bulletsAliados;
var bulletsArtilleriaPotencia;
var bulletsArtilleriaAliados;
var bulletsTorre;
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
var aviones;
var aviones_aliados;
var circulo_aviones_aliados;
var circulo_aviones;
var velAvion;
var light1;
var light2;
var light3;
var light4;
var lightBasePotencia;
var lightBaseAliados;

//Inicializo la clase/escena
class Play extends Phaser.Scene {

    constructor(){
        //le asigno una clave a la escena Play
        super({key: 'Play'});
        this.bullets;
    }
    create(){ 
        //Se remueven escenas de menus anteriores
        this.scene.remove('MenuInicial');
        this.scene.remove('ElegirBando');

        //Se agrega imagenes a utilizar y dibujar en pantalla primero (fondo, muros, vista lateral)
        this.add.image(0, 0, "fondoMapa").setOrigin(0);
        this.vistaLateral = this.add.image(45,47,'nubeslateral').setOrigin(0).setScale(1);
        this.avionVistaLateral = this.add.image(100,180,'Nieuport_28C1Lateral').setOrigin(0).setScale(.7);
        this.mapaMask = this.add.image(433, 46, "mapa_6").setOrigin(0).setScale(1);

        this.boton_1 = this.add.image(190, 425, "boton_1").setOrigin(0).setScale(.1).setInteractive(); 
        this.boton_2 = this.add.image(240, 425, "boton_2").setOrigin(0).setScale(.1).setInteractive(); 
        this.boton_4 = this.add.image(290, 425, "boton_3").setOrigin(0).setScale(.1).setInteractive(); 
        this.boton_4 = this.add.image(340, 425, "boton_4").setOrigin(0).setScale(.1).setInteractive(); 
        this.panelAvion1 = this.add.image(45, 500, "panelAvion1").setOrigin(0).setScale(.3).setInteractive();
        this.panelAvion2 = this.add.image(45, 595, "panelAvion2").setOrigin(0).setScale(.3).setInteractive();
        this.panelAvion3 = this.add.image(45, 690, "panelAvion3").setOrigin(0).setScale(.3).setInteractive();
        this.panelAvion4 = this.add.image(45, 785, "panelAvion4").setOrigin(0).setScale(.3).setInteractive();
        this.panelBase = this.add.image(28, 890, "panelBase").setOrigin(0).setScale(.3).setInteractive();
        this.mostrarRango = this.add.image(112, 938, "mostrarRango").setOrigin(0).setScale(.22).setInteractive();
        this.nick = this.add.image(70, 985, "nick").setOrigin(0).setScale(.7).setInteractive();
     

        this.cargarBomba1 = this.add.image(65, 545, "botonBomba").setOrigin(0).setScale(.3).setInteractive(); 
        this.cargarBomba2 = this.add.image(65, 640, "botonBomba").setOrigin(0).setScale(.3).setInteractive(); 
        this.cargarBomba3 = this.add.image(65, 735, "botonBomba").setOrigin(0).setScale(.3).setInteractive(); 
        this.cargarBomba4 = this.add.image(65, 830, "botonBomba").setOrigin(0).setScale(.3).setInteractive(); 
       
        this.volverBase1 = this.add.image(220, 545, "botonCombustible").setOrigin(0).setScale(.3).setInteractive();
        this.volverBase2 = this.add.image(220, 640, "botonCombustible").setOrigin(0).setScale(.3).setInteractive();
        this.volverBase3 = this.add.image(220, 735, "botonCombustible").setOrigin(0).setScale(.3).setInteractive();
        this.volverBase4 = this.add.image(220, 830, "botonCombustible").setOrigin(0).setScale(.3).setInteractive();

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
        this.pisoBasePotencias = this.add.image(campoPotencias.base.posicionX + 50, campoPotencias.base.posicionY + 50, 'pisoBase').setScale(.25);
        this.contenedorPotencias = this.add.image(campoPotencias.base.posicionX+10, campoPotencias.base.posicionY + 10, 'contenedor_2').setScale(.15);
        this.depositoPotencias = this.add.image(campoPotencias.base.posicionX + 70, campoPotencias.base.posicionY + 10, 'depositoCombustible').setScale(.10);
        this.torrePotencias = this.add.image(campoPotencias.base.posicionX +40, campoPotencias.base.posicionY + 70, 'torre').setScale(.07);
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
            artilleriasPotencias.getChildren()[i].lastFired = 0; 
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
        this.pisoBaseAliados = this.add.image(campoAliados.base.posicionX + 50, campoAliados.base.posicionY + 50, 'pisoBase').setScale(.25);
        this.contenedorAliados = this.add.image(campoAliados.base.posicionX+10, campoAliados.base.posicionY + 10, 'contenedor_2').setScale(.15);
        this.depositoAliados = this.add.image(campoAliados.base.posicionX + 70, campoAliados.base.posicionY + 10, 'depositoCombustible').setScale(.10);
        this.torreAliados = this.add.image(campoAliados.base.posicionX +40, campoAliados.base.posicionY + 70, 'torre').setScale(.07);
    
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
            artilleriasAliados.getChildren()[i].lastFired = 0; 
       }

        //Se llama a funcion que definira los aviones          
        this.definicionAviones();   

        //Se definen luces que seguiran a los aviones y tambien habra en la base, es para el efecto visual del circulo
        this.mapaMask.setPipeline('Light2D');
        this.lights.enable();
        this.lights.setAmbientColor(0xF3F3F3);  
        if (config.Partida.Bando == 'Potencias')
        {
            light1 = this.lights.addLight(500, 200, 100).setIntensity(10);
            light2 = this.lights.addLight(500, 400, 100).setIntensity(10);
            light3 = this.lights.addLight(500, 600, 100).setIntensity(10);
            light4 = this.lights.addLight(500, 800, 100).setIntensity(10);
            lightBasePotencia = this.lights.addLight(campoPotencias.base.posicionX +40, campoPotencias.base.posicionY + 70, 200).setIntensity(12);
            this.lightCampoPotencia = this.lights.addLight(campoPotencias.posicionX +150, campoPotencias.posicionY + 200, 300).setIntensity(8);
            
        }
        else
        {
            light1 = this.lights.addLight(1500, 200, 100).setIntensity(10);
            light2 = this.lights.addLight(1500, 400, 100).setIntensity(10);
            light3 = this.lights.addLight(1500, 600, 100).setIntensity(10);
            light4 = this.lights.addLight(1500, 800, 100).setIntensity(10);
            lightBaseAliados = this.lights.addLight(campoAliados.base.posicionX +40, campoAliados.base.posicionY + 70, 200).setIntensity(12);
            this.lightCampoAliados = this.lights.addLight(campoAliados.posicionX +150, campoAliados.posicionY + 200, 300).setIntensity(8);
            
        }
        //Se define el grupo de aviones Potencias para darle fisica y eventos 
        aviones = this.physics.add.group({
            key: 'avion',
            repeat: 4
        });

        //Se define el grupo de circulos para aviones Potencias para darle fisica y eventos 
        circulo_aviones = this.physics.add.group({
            key: 'circulo',
            repeat: 4
        });

         //Se define el grupo de aviones Aliados para darle fisica y eventos
        aviones_aliados = this.physics.add.group({
            key: 'avion',
            repeat: 4
        });

        //Se define el grupo de circulos para aviones Aliados para darle fisica y eventos 
        circulo_aviones_aliados = this.physics.add.group({
            key: 'circulo',
            repeat: 4
        });
        
        //Aniado a los grupos los aviones y circulos ya definidos
        aviones.getChildren()[0]=avion_1;
        aviones.getChildren()[1]=avion_2;
        aviones.getChildren()[2]=avion_3;
        aviones.getChildren()[3]=avion_4;

        circulo_aviones.getChildren()[0]=this.circulo_1;
        circulo_aviones.getChildren()[1]=this.circulo_2;
        circulo_aviones.getChildren()[2]=this.circulo_3;
        circulo_aviones.getChildren()[3]=this.circulo_4;        

        aviones_aliados.getChildren()[0]=avion_1_Aliados;
        aviones_aliados.getChildren()[1]=avion_2_Aliados;
        aviones_aliados.getChildren()[2]=avion_3_Aliados;
        aviones_aliados.getChildren()[3]=avion_4_Aliados;

        circulo_aviones_aliados.getChildren()[0]=this.circulo_5;
        circulo_aviones_aliados.getChildren()[1]=this.circulo_6;
        circulo_aviones_aliados.getChildren()[2]=this.circulo_7;
        circulo_aviones_aliados.getChildren()[3]=this.circulo_8;  

        //Se realiza la asignacion entre los aviones recien definidos con los que maneja la clase Partida
        //Esto necesario para el sincronizar
        config.Partida.aviones = new Array;
        config.Partida.aviones[0] = avion_1;
        config.Partida.aviones[1] = avion_2;
        config.Partida.aviones[2] = avion_3;
        config.Partida.aviones[3] = avion_4;
        config.Partida.aviones[4] = avion_1_Aliados;
        config.Partida.aviones[5] = avion_2_Aliados;
        config.Partida.aviones[6] = avion_3_Aliados;
        config.Partida.aviones[7] = avion_4_Aliados;
        
        this.BotonesLaterales();
        
        //Evento que escucha cuando se clickea con el mouse y llama al onObjectClicked
        this.input.on('pointerdown',this.onObjectClicked);   
        
        //Bullets, se define el grupo de balas que utilizaran los aviones
        bullets = this.add.group({
            classType: Bullet,
            maxSize: 4,
            runChildUpdate: true
        });
        //bulletsPotencias, se define el grupo de balas que utilizaran los aviones Potencias
        bulletsPotencias = this.add.group({
            classType: Bullet,
            maxSize: 4,
            runChildUpdate: true
        });
        //bulletsAliados, se define el grupo de balas que utilizaran los aviones Aliados
        bulletsAliados = this.add.group({
            classType: Bullet,
            maxSize: 4,
            runChildUpdate: true
        });
         //bulletsArtilleria, se define el grupo de balas que utilizaran las artillerias Potencias
        bulletsArtilleriaPotencia = this.add.group({
            classType: Bullet,
            maxSize: 8,
            runChildUpdate: true
        });
         //bulletsArtilleriaAliados, se define el grupo de balas que utilizaran las artillerias Aliados
         bulletsArtilleriaAliados = this.add.group({
            classType: Bullet,
            maxSize: 8,
            runChildUpdate: true
        });
        this.colisiones(); 
        if(config.Partida.duenio)   
            this.botonGuardar();
    }

    //funcion que carga las funcionalidades del tablero
    BotonesLaterales()
    {
        //Se definen los eventos de los botones del tablero/panel
        this.cargarBomba1.on(Phaser.Input.Events.POINTER_DOWN, () => {
            this.add.tween({
                targets: this.cargarBomba1,
                ease: 'Bounce.easeIn',                
                onComplete: () => {
                     
                    if (avion_1.focus==true)
                    {    
                        avion_1.cargarbomba=true;      
                        this.cargarBomba1 = this.add.image(65, 545, "botonBombaRojo").setOrigin(0).setScale(.3).setInteractive();         
                        config.Partida.idavion=1;
                        avion_1.moverAvion({x: avion_1.xInicial, y: avion_1.yInicial});
                        config.Partida.sincronizar({tipoOp:"sincronizarAvion", idavion:1, x: avion_1.xInicial, y: avion_1.yInicial});
                    }            

                    if (avion_1_Aliados.focus==true)
                    {    
                        avion_1_Aliados.cargarbomba=true;  
                        this.cargarBomba1 = this.add.image(65, 545, "botonBombaRojo").setOrigin(0).setScale(.3).setInteractive();         
                        config.Partida.idavion=5;
                        avion_1_Aliados.moverAvion({x: avion_1_Aliados.xInicial, y: avion_1_Aliados.yInicial});
                        config.Partida.sincronizar({tipoOp:"sincronizarAvion", idavion:5, x: avion_1_Aliados.xInicial, y: avion_1_Aliados.yInicial});

                    }          
                }
            });
        });

        this.volverBase1.on(Phaser.Input.Events.POINTER_DOWN, () => {
            this.add.tween({
                targets: this.volverBase1,
                ease: 'Bounce.easeIn',                
                onComplete: () => {
                                        
                    if (avion_1.focus==true)
                    {            
                        avion_1.cargarCombustible=true;
                        config.Partida.idavion=1;
                        avion_1.moverAvion({x: avion_1.xInicial, y: avion_1.yInicial});
                        config.Partida.sincronizar({tipoOp:"sincronizarAvion", idavion:1, x: avion_1.xInicial, y: avion_1.yInicial});
                        this.volverBase1 = this.add.image(220, 545, "botonCombustibleRojo").setOrigin(0).setScale(.3).setInteractive();
                    }                

                    if (avion_1_Aliados.focus==true)
                    {        
                        avion_1_Aliados.cargarCombustible=true;     
                        config.Partida.idavion=5;
                        avion_1_Aliados.moverAvion({x: avion_1_Aliados.xInicial, y: avion_1_Aliados.yInicial});
                        config.Partida.sincronizar({tipoOp:"sincronizarAvion", idavion:5, x: avion_1_Aliados.xInicial, y: avion_1_Aliados.yInicial});
                        this.volverBase1 = this.add.image(220, 545, "botonCombustibleRojo").setOrigin(0).setScale(.3).setInteractive();
                    }              
                }
            });
        });
        // segunda tanda
        this.cargarBomba2.on(Phaser.Input.Events.POINTER_DOWN, () => {
            this.add.tween({
                targets: this.cargarBomba2,
                ease: 'Bounce.easeIn',                
                onComplete: () => {
                     
                    if (avion_2.focus==true)
                    {    
                        avion_2.cargarbomba=true;      
                        this.cargarBomba2 = this.add.image(65, 545, "botonBombaRojo").setOrigin(0).setScale(.3).setInteractive();         
                        config.Partida.idavion=2;
                        avion_2.moverAvion({x: avion_2.xInicial, y: avion_2.yInicial});
                        config.Partida.sincronizar({tipoOp:"sincronizarAvion", idavion:2, x: avion_2.xInicial, y: avion_2.yInicial});
                    }            

                    if (avion_2_Aliados.focus==true)
                    {    
                        avion_2_Aliados.cargarbomba=true;  
                        this.cargarBomba2 = this.add.image(65, 545, "botonBombaRojo").setOrigin(0).setScale(.3).setInteractive();         
                        config.Partida.idavion=6;
                        avion_2_Aliados.moverAvion({x: avion_2_Aliados.xInicial, y: avion_2_Aliados.yInicial});
                        config.Partida.sincronizar({tipoOp:"sincronizarAvion", idavion:6, x: avion_2_Aliados.xInicial, y: avion_2_Aliados.yInicial});

                    }          
                }
            });
        });

        this.volverBase2.on(Phaser.Input.Events.POINTER_DOWN, () => {
            this.add.tween({
                targets: this.volverBase2,
                ease: 'Bounce.easeIn',                
                onComplete: () => {
                                        
                    if (avion_2.focus==true)
                    {            
                        avion_2.cargarCombustible=true;
                        config.Partida.idavion=2;
                        avion_2.moverAvion({x: avion_2.xInicial, y: avion_2.yInicial});
                        config.Partida.sincronizar({tipoOp:"sincronizarAvion", idavion:2, x: avion_2.xInicial, y: avion_2.yInicial});
                        this.volverBase2 = this.add.image(220, 545, "botonCombustibleRojo").setOrigin(0).setScale(.3).setInteractive();
                    }                

                    if (avion_2_Aliados.focus==true)
                    {        
                        avion_2_Aliados.cargarCombustible=true;     
                        config.Partida.idavion=6;
                        avion_2_Aliados.moverAvion({x: avion_2_Aliados.xInicial, y: avion_2_Aliados.yInicial});
                        config.Partida.sincronizar({tipoOp:"sincronizarAvion", idavion:6, x: avion_2_Aliados.xInicial, y: avion_2_Aliados.yInicial});
                        this.volverBase2 = this.add.image(220, 545, "botonCombustibleRojo").setOrigin(0).setScale(.3).setInteractive();
                    }              
                }
            });
        });
        // tecera tanda
        this.cargarBomba3.on(Phaser.Input.Events.POINTER_DOWN, () => {
            this.add.tween({
                targets: this.cargarBomba3,
                ease: 'Bounce.easeIn',                
                onComplete: () => {
                     
                    if (avion_3.focus==true)
                    {    
                        avion_3.cargarbomba=true;      
                        this.cargarBomba3 = this.add.image(65, 545, "botonBombaRojo").setOrigin(0).setScale(.3).setInteractive();         
                        config.Partida.idavion=3;
                        avion_3.moverAvion({x: avion_3.xInicial, y: avion_3.yInicial});
                        config.Partida.sincronizar({tipoOp:"sincronizarAvion", idavion:3, x: avion_3.xInicial, y: avion_3.yInicial});
                    }            

                    if (avion_3_Aliados.focus==true)
                    {    
                        avion_3_Aliados.cargarbomba=true;  
                        this.cargarBomba3 = this.add.image(65, 545, "botonBombaRojo").setOrigin(0).setScale(.3).setInteractive();         
                        config.Partida.idavion=7;
                        avion_3_Aliados.moverAvion({x: avion_3_Aliados.xInicial, y: avion_3_Aliados.yInicial});
                        config.Partida.sincronizar({tipoOp:"sincronizarAvion", idavion:7, x: avion_3_Aliados.xInicial, y: avion_3_Aliados.yInicial});

                    }          
                }
            });
        });

        this.volverBase3.on(Phaser.Input.Events.POINTER_DOWN, () => {
            this.add.tween({
                targets: this.volverBase3,
                ease: 'Bounce.easeIn',                
                onComplete: () => {
                                        
                    if (avion_3.focus==true)
                    {            
                        avion_3.cargarCombustible=true;
                        config.Partida.idavion=3;
                        avion_3.moverAvion({x: avion_3.xInicial, y: avion_3.yInicial});
                        config.Partida.sincronizar({tipoOp:"sincronizarAvion", idavion:3, x: avion_3.xInicial, y: avion_3.yInicial});
                        this.volverBase3 = this.add.image(220, 545, "botonCombustibleRojo").setOrigin(0).setScale(.3).setInteractive();
                    }                

                    if (avion_3_Aliados.focus==true)
                    {        
                        avion_3_Aliados.cargarCombustible=true;     
                        config.Partida.idavion=7;
                        avion_3_Aliados.moverAvion({x: avion_3_Aliados.xInicial, y: avion_3_Aliados.yInicial});
                        config.Partida.sincronizar({tipoOp:"sincronizarAvion", idavion:7, x: avion_3_Aliados.xInicial, y: avion_3_Aliados.yInicial});
                        this.volverBase3 = this.add.image(220, 545, "botonCombustibleRojo").setOrigin(0).setScale(.3).setInteractive();
                    }              
                }
            });
        });
        // cuarta tanda
        this.cargarBomba4.on(Phaser.Input.Events.POINTER_DOWN, () => {
            this.add.tween({
                targets: this.cargarBomba4,
                ease: 'Bounce.easeIn',                
                onComplete: () => {
                     
                    if (avion_4.focus==true)
                    {    
                        avion_4.cargarbomba=true;      
                        this.cargarBomba4 = this.add.image(65, 545, "botonBombaRojo").setOrigin(0).setScale(.3).setInteractive();         
                        config.Partida.idavion=4;
                        avion_4.moverAvion({x: avion_4.xInicial, y: avion_4.yInicial});
                        config.Partida.sincronizar({tipoOp:"sincronizarAvion", idavion:4, x: avion_4.xInicial, y: avion_4.yInicial});
                    }            

                    if (avion_4_Aliados.focus==true)
                    {    
                        avion_4_Aliados.cargarbomba=true;  
                        this.cargarBomba4 = this.add.image(65, 545, "botonBombaRojo").setOrigin(0).setScale(.3).setInteractive();         
                        config.Partida.idavion=8;
                        avion_4_Aliados.moverAvion({x: avion_4_Aliados.xInicial, y: avion_4_Aliados.yInicial});
                        config.Partida.sincronizar({tipoOp:"sincronizarAvion", idavion:8, x: avion_4_Aliados.xInicial, y: avion_4_Aliados.yInicial});

                    }          
                }
            });
        });

        this.volverBase4.on(Phaser.Input.Events.POINTER_DOWN, () => {
            this.add.tween({
                targets: this.volverBase4,
                ease: 'Bounce.easeIn',                
                onComplete: () => {
                                        
                    if (avion_4.focus==true)
                    {            
                        avion_4.cargarCombustible=true;
                        config.Partida.idavion=4;
                        avion_4.moverAvion({x: avion_4.xInicial, y: avion_4.yInicial});
                        config.Partida.sincronizar({tipoOp:"sincronizarAvion", idavion:4, x: avion_4.xInicial, y: avion_4.yInicial});
                        this.volverBase4 = this.add.image(220, 545, "botonCombustibleRojo").setOrigin(0).setScale(.3).setInteractive();
                    }                

                    if (avion_4_Aliados.focus==true)
                    {        
                        avion_4_Aliados.cargarCombustible=true;     
                        config.Partida.idavion=8;
                        avion_4_Aliados.moverAvion({x: avion_4_Aliados.xInicial, y: avion_4_Aliados.yInicial});
                        config.Partida.sincronizar({tipoOp:"sincronizarAvion", idavion:8, x: avion_4_Aliados.xInicial, y: avion_4_Aliados.yInicial});
                        this.volverBase4 = this.add.image(220, 545, "botonCombustibleRojo").setOrigin(0).setScale(.3).setInteractive();
                    }              
                }
            });
        });
    }

    botonGuardar(){

        this.guardar = this.add.image(10, 10, "Save-64").setOrigin(0).setScale(.5).setInteractive(); 
        this.guardar.on(Phaser.Input.Events.POINTER_DOWN, () => {
            this.add.tween({
                targets: this.guardar,
                ease: 'Bounce.easeIn',                
                onComplete: () => {
         
                        this.guardar.setScale(0.6);  
                        this.scene.pause();
                        config.Partida.sincronizar({tipoOp:"sincronizarPausa", estado:"Pausar"});
                        this.scene.launch('Guardando');
                        config.Partida.guardarPartida();
       
                }
            });
        });

    }

    Colision_Aviones(circulo, avion)
    {   
        //Se definen colisiones entre el rango visible de un avion (circulo) y el avion con el que colisiona
        if (circulo==this.circulo_1)
        {                                
            if (avion_1.altitud == avion.altitud && this.time > avion_1.lastFired)  
            {  
                avion.setVisible(true);           
                this.disparar(avion_1,avion)   
                avion_1.lastFired = this.time + 500; 
                avion.activarColision=1;                             
            }
        }
        if (circulo==this.circulo_2 )
        {                 
            if (avion_2.altitud == avion.altitud && this.time > avion_2.lastFired)  
            { 
                avion.setVisible(true);             
                this.disparar(avion_2,avion) 
                avion_2.lastFired = this.time + 500;
                avion.activarColision=1;
            }
        }
        if (circulo==this.circulo_3)
        {                 
            if (avion_3.altitud == avion.altitud && this.time > avion_3.lastFired)            
            { 
                avion.setVisible(true);             
                this.disparar(avion_3,avion) 
                avion_3.lastFired = this.time + 500;
                avion.activarColision=1;
            }  

        }
        if (circulo==this.circulo_4)
        {                 
            if (avion_4.altitud == avion.altitud && this.time > avion_4.lastFired)
            { 
                avion.setVisible(true);             
                this.disparar(avion_4,avion) 
                avion_4.lastFired = this.time + 500;
                avion.activarColision=1;
            }
        }
        //------Aliados-/// 
        if (circulo==this.circulo_5)
        {                
            if (avion_1_Aliados.altitud == avion.altitud && this.time > avion_1_Aliados.lastFired )            
            {                 
                avion.setVisible(true);             
                this.disparar(avion_1_Aliados,avion) 
                avion_1_Aliados.lastFired = this.time + 500;
                avion.activarColision=1;
            }
        }
        if (circulo==this.circulo_6)
        {                 
            if (avion_2_Aliados.altitud == avion.altitud && this.time > avion_2_Aliados.lastFired)             
            { 
                avion.setVisible(true);             
                this.disparar(avion_2_Aliados,avion) 
                avion_2_Aliados.lastFired = this.time + 500;
                avion.activarColision=1;
            }
        }
        if (circulo==this.circulo_7)
        {                 
            if (avion_3_Aliados.altitud == avion.altitud && this.time > avion_3_Aliados.lastFired)            
            { 
                avion.setVisible(true);             
                this.disparar(avion_3_Aliados,avion) 
                avion_3_Aliados.lastFired = this.time + 500;
                avion.activarColision=1;
            }  

        }
        if (circulo==this.circulo_8)
        {                 
            if (avion_4_Aliados.altitud == avion.altitud && this.time > avion_4_Aliados.lastFired)              
            { 
                avion.setVisible(true);             
                this.disparar(avion_4_Aliados,avion) 
                avion_4_Aliados.lastFired = this.time + 500;
                avion.activarColision=1;
            }
        }      
    }

    colision_bala_avion(Bullet,avion)
    { 
        //Colisiones entre los aviones y las balas que pueda llegar a colisionar
        if (1 == avion.activarColision)
        {
            var Hit = Phaser.Math.Between(1,2);
            if (Hit == 1 ){
                avion.vidaAvion-=10;  
                config.Partida.sincronizar({tipoOp:"sincronizarVidaAvion", idavion:avion.idavion, vida:avion.vidaAvion});
            }  
            console.log('avion :'+avion.vidaAvion);
            avion.activarColision = 0;
        }
    }

    //Evento  llamado al disparar automaticamente 
    disparar(avion_focus,avion_A_pegar)
    {           
        //Dispara balas entre aviones    
        bullet = bullets.get();     
        bullet.fire( avion_focus,{x: avion_A_pegar.x, y: avion_A_pegar.y});         
    }
    
    colisiones()
    { 
        //Colisiones generales, artilleria, torre de control , balas y aviones
        this.physics.add.overlap(artilleriasAliados,aviones, this.dispararArtilleria, null, this);
        this.physics.add.overlap(artilleriasPotencias, aviones_aliados, this.dispararArtilleria, null, this);
        //Aniado colision entre los aviones y los muros
        this.physics.add.collider([avion_1,avion_2,avion_3,avion_4,avion_1_Aliados,avion_2_Aliados,avion_3_Aliados,avion_4_Aliados],this.wall_floor);       

        if (config.Partida.Bando=='Potencias')
        { 
            this.physics.add.overlap(circulo_aviones, aviones_aliados, this.Colision_Aviones, null, this);  
            this.physics.add.overlap(bullets, aviones_aliados, this.colision_bala_avion, null, this);  
        
        }else{ 
            this.physics.add.overlap(circulo_aviones_aliados, aviones, this.Colision_Aviones, null, this);         
            this.physics.add.overlap(bullets, aviones, this.colision_bala_avion, null, this);        
        }
    }
    //----------------//
    
    //Evento llamado al realizar click con el mouse
    onObjectClicked(pointer)
    {  
        //Comienzo a chequear que avion o elemento se encuentra en focus para ejecutar su correspondiente accion       
        if (config.Partida.Bando=='Potencias')
        {
            if (avion_1.focus==true)
            {            
                avion_1.altitud ='Baja';
                config.Partida.idavion=1;
                avion_1.moverAvion({x: pointer.x, y: pointer.y});            
                config.Partida.sincronizar({tipoOp:"sincronizarAvion", idavion:1, x: pointer.x, y: pointer.y});
            }  

            if (avion_2.focus==true)
            {            
                avion_2.altitud ='Baja';
                config.Partida.idavion=2;
                avion_2.moverAvion({x: pointer.x, y: pointer.y});
                config.Partida.sincronizar({tipoOp:"sincronizarAvion", idavion:2, x: pointer.x, y: pointer.y});
            } 

            if (avion_3.focus==true)
            {            
                avion_3.altitud ='Baja';
                config.Partida.idavion=3;
                avion_3.moverAvion({x: pointer.x, y: pointer.y});
                config.Partida.sincronizar({tipoOp:"sincronizarAvion", idavion:3, x: pointer.x, y: pointer.y});
            }  

            if (avion_4.focus==true)
            { 
                avion_4.altitud ='Baja';           
                config.Partida.idavion=4;
                avion_4.moverAvion({x: pointer.x, y: pointer.y});
                config.Partida.sincronizar({tipoOp:"sincronizarAvion", idavion:4, x: pointer.x, y: pointer.y});
            } 
        }
        else
        {
            if (avion_1_Aliados.focus==true )
            {
                avion_1_Aliados.altitud ='Baja'; 
                config.Partida.idavion=5;
                avion_1_Aliados.moverAvion({x: pointer.x, y: pointer.y});
                config.Partida.sincronizar({tipoOp:"sincronizarAvion", idavion:5, x: pointer.x, y: pointer.y});
            }
            if (avion_2_Aliados.focus==true)
            {
                avion_2_Aliados.altitud ='Baja'; 
                config.Partida.idavion=6;
                avion_2_Aliados.moverAvion({x: pointer.x, y: pointer.y});
                config.Partida.sincronizar({tipoOp:"sincronizarAvion", idavion:6, x: pointer.x, y: pointer.y});
            }
            if (avion_3_Aliados.focus==true)
            {
                avion_3_Aliados.altitud ='Baja'; 
                config.Partida.idavion=7;
                avion_3_Aliados.moverAvion({x: pointer.x, y: pointer.y});
                config.Partida.sincronizar({tipoOp:"sincronizarAvion", idavion:7, x: pointer.x, y: pointer.y});
            }
            if (avion_4_Aliados.focus==true)
            {
                avion_4_Aliados.altitud ='Baja'; 
                config.Partida.idavion=8;
                avion_4_Aliados.moverAvion({x: pointer.x, y: pointer.y});
                config.Partida.sincronizar({tipoOp:"sincronizarAvion", idavion:8, x: pointer.x, y: pointer.y});
            }
        }
    }




    colision_Artillerias_aviones(Bullet, avion_A_pegar)
    {       
        //Colisiones entre la artilleria y avion que colisiono con el rango visible
        if (avion_A_pegar.altitud == 'Baja' && avion_A_pegar.activarColision==1)
            {
                var Hit = Phaser.Math.Between(1,2);
                if (Hit == 1 ){
                    avion_A_pegar.vidaAvion-=10; 
                    config.Partida.sincronizar({tipoOp:"sincronizarVidaAvion", idavion:avion_A_pegar.idavion, vida:avion_A_pegar.vidaAvion});                    
                }  
                avion_A_pegar.activarColision=0; 
                console.log("vida avion: "+avion_A_pegar.vidaAvion);               
            }
    }

     //Evento  llamado al disparar automaticamente artilleria
     dispararArtilleria(artilleria_focus,avion_A_pegar)
     {           
         //Se pasa el avion que esta en focus 
         bullet = bulletsArtilleriaAliados.get();
         if (bullet)
         {            
            if (this.time > artilleria_focus.lastFired)
            {                 
                avion_A_pegar.activarColision=1;
                bullet.fireArtilleria(artilleria_focus,{x: avion_A_pegar.x, y: avion_A_pegar.y});  
                this.physics.add.overlap(bullet, avion_A_pegar, this.colision_Artillerias_aviones, null, this);   
                artilleria_focus.lastFired  = this.time + 2000;     
            }
         }  
     }
 

    
    definicionAviones()
    {	
        //Se definen los aviones de ambos bandos
        var velAvion = config.Partida.configuraciones.avionVelocidad;  
        avion_1 = new Avion({
            scene: this,
     /*       x: avionXInicial,
            y: avionYInicial,
            xInicial: avionXInicial,
            yInicial: avionYInicial,*/
            x: 500,
            y: 200            
        }).setInteractive();    
        avion_1.idavion = 1;  
        avion_1.vidaAvion = config.Partida.configuraciones.avionSalud;
        avion_1.velocidad = velAvion;
        this.circulo_1 = this.add.image(avion_1.x-50,avion_1.y-50,'circuloAvion').setScale(1.5);
        this.physics.world.enable(this.circulo_1);
        this.circulo_1.body.setCircle(35);
        this.circulo_1.body.setOffset(15,16); 
        this.circulo_1.idAvion=1;

        avion_2 = new Avion({
            scene: this,
            x: 500,
            y: 400                                          
        }).setInteractive(); 
        avion_2.idavion = 2;  
        avion_2.vidaAvion = config.Partida.configuraciones.avionSalud;     
        avion_2.velocidad = velAvion;  
        this.circulo_2 = this.add.image(avion_2.x-50,avion_2.y-50,'circuloAvion').setScale(1.5);
        this.physics.world.enable(this.circulo_2);
        this.circulo_2.body.setCircle(35);
        this.circulo_2.body.setOffset(15,16);
        this.circulo_2.idAvion=2;

        avion_3 = new Avion({
            scene: this,
            x: 500,
            y: 600               
        }).setInteractive(); 
        avion_3.idavion = 3;  
        avion_3.vidaAvion = config.Partida.configuraciones.avionSalud;
        avion_3.velocidad = velAvion;       
        this.circulo_3 = this.add.image(avion_3.x-50,avion_3.y-50,'circuloAvion').setScale(1.5);
        this.physics.world.enable(this.circulo_3);
        this.circulo_3.body.setCircle(35);
        this.circulo_3.body.setOffset(15,16);
        this.circulo_2.idAvion=3;

        avion_4 = new Avion({
            scene: this,
            x: 500,
            y: 800                   
        }).setInteractive();  
        avion_4.idavion = 4;  
        avion_4.vidaAvion = config.Partida.configuraciones.avionSalud;
        avion_4.velocidad = velAvion;      
        this.circulo_4 = this.add.image(avion_4.x-50,avion_4.y-50,'circuloAvion').setScale(1.5);
        this.physics.world.enable(this.circulo_4);
        this.circulo_4.body.setCircle(35);
        this.circulo_4.body.setOffset(15,16);
        this.circulo_4.idAvion=4;

        avion_1_Aliados = new Avion({
            scene: this,
            x: 1500,
            y: 200
        }).setInteractive();    
        avion_1_Aliados.idavion = 5;  
        avion_1_Aliados.vidaAvion = config.Partida.configuraciones.avionSalud;  
        avion_1_Aliados.velocidad = velAvion; 
        //avion_1_Aliados.flipX = !avion_1_Aliados.flipX;
        this.circulo_5 = this.add.image(avion_1_Aliados.x-50,avion_1_Aliados.y-50,'circuloAvion').setScale(1.5);
        this.physics.world.enable(this.circulo_5);
        this.circulo_5.body.setCircle(35);
        this.circulo_5.body.setOffset(15,16); 
        this.circulo_5.idAvion=5;


        avion_2_Aliados = new Avion({
            scene: this,
            x: 1500,
            y: 400
        }).setInteractive();       
        avion_2_Aliados.idavion = 6;  
        avion_2_Aliados.vidaAvion = config.Partida.configuraciones.avionSalud; 
        avion_2_Aliados.velocidad = velAvion; 
        //avion_2_Aliados.flipX = !avion_2_Aliados.flipX;
        this.circulo_6 = this.add.image(avion_2_Aliados.x-50,avion_2_Aliados.y-50,'circuloAvion').setScale(1.5);
        this.physics.world.enable(this.circulo_6);
        this.circulo_6.body.setCircle(35);
        this.circulo_6.body.setOffset(15,16);
        this.circulo_6.idAvion=6;


        avion_3_Aliados = new Avion({
            scene: this,
            x: 1500,
            y: 600
        }).setInteractive();   
        avion_3_Aliados.idavion = 7;  
        avion_3_Aliados.vidaAvion = config.Partida.configuraciones.avionSalud; 
        avion_3_Aliados.velocidad = velAvion;   
        //avion_3_Aliados.flipX = !avion_3_Aliados.flipX;   
        this.circulo_7 = this.add.image(avion_3_Aliados.x-50,avion_3_Aliados.y-50,'circuloAvion').setScale(1.5);
        this.physics.world.enable(this.circulo_7);
        this.circulo_7.body.setCircle(35);
        this.circulo_7.body.setOffset(15,16);
        this.circulo_7.idAvion=7;


        avion_4_Aliados = new Avion({
            scene: this,
            x: 1500,
            y: 800
        }).setInteractive(); 
        avion_4_Aliados.idavion = 8;  
        avion_4_Aliados.vidaAvion = config.Partida.configuraciones.avionSalud;       
        avion_4_Aliados.velocidad = velAvion;  
        //avion_4_Aliados.flipX = !avion_4_Aliados.flipX;
        this.circulo_8 = this.add.image(avion_4_Aliados.x-50,avion_4_Aliados.y-50,'circuloAvion').setScale(1.5);
        this.physics.world.enable(this.circulo_8);
        this.circulo_8.body.setCircle(35);
        this.circulo_8.body.setOffset(15,16);
        this.circulo_8.idAvion=8;
        
        //Se guardan las teclas cursor y se setea evento para cambiar altitud del avion
        this.keys = this.input.keyboard.createCursorKeys();
        this.keys.up.on('down',()=>
        {            
            if (avion_1.focus==true){
                this.vistaLateral = this.add.image(45,47,'nubeslateral').setOrigin(0).setScale(1);
                /*this.boton_5.depth=100;
                this.boton_6.depth=100;
                this.avionVistaLateral.depth=100;*/
                avion_1.cambiarAltitud("Alta");
                config.Partida.sincronizar({tipoOp:"sincronizarAltitudAvion", idavion:1, altitud:"Alta"});                    

            }
            if (avion_2.focus==true){
                this.vistaLateral = this.add.image(45,47,'nubeslateral').setOrigin(0).setScale(1);
                /*this.boton_5.depth=100;
                this.boton_6.depth=100;
                this.avionVistaLateral.depth=100;*/
                avion_2.cambiarAltitud("Alta");
                config.Partida.sincronizar({tipoOp:"sincronizarAltitudAvion", idavion:2, altitud:"Alta"});                    

            }
            if (avion_3.focus==true){
                this.vistaLateral = this.add.image(45,47,'nubeslateral').setOrigin(0).setScale(1);
                /*this.boton_5.depth=100;
                this.boton_6.depth=100;
                this.avionVistaLateral.depth=100;*/
                avion_3.cambiarAltitud("Alta");
                config.Partida.sincronizar({tipoOp:"sincronizarAltitudAvion", idavion:3, altitud:"Alta"});

            }
            if (avion_4.focus==true){
                this.vistaLateral = this.add.image(45,47,'nubeslateral').setOrigin(0).setScale(1);
                /*this.boton_5.depth=100;
                this.boton_6.depth=100;
                this.avionVistaLateral.depth=100;*/
                avion_4.cambiarAltitud("Alta");
                config.Partida.sincronizar({tipoOp:"sincronizarAltitudAvion", idavion:4, altitud:"Alta"});

            }   
            if (avion_1_Aliados.focus==true){
                this.vistaLateral = this.add.image(45,47,'nubeslateral').setOrigin(0).setScale(1);
                /*this.boton_5.depth=100;
                this.boton_6.depth=100;
                this.avionVistaLateral.depth=100;*/
                avion_1_Aliados.cambiarAltitud("Alta");
                config.Partida.sincronizar({tipoOp:"sincronizarAltitudAvion", idavion:5, altitud:"Alta"});
    
            }
            if (avion_2_Aliados.focus==true){
                this.vistaLateral = this.add.image(45,47,'nubeslateral').setOrigin(0).setScale(1);
                /*this.boton_5.depth=100;
                this.boton_6.depth=100;
                this.avionVistaLateral.depth=100;*/
                avion_2_Aliados.cambiarAltitud("Alta");
                config.Partida.sincronizar({tipoOp:"sincronizarAltitudAvion", idavion:6, altitud:"Alta"});

            }
            if (avion_3_Aliados.focus==true){
                this.vistaLateral = this.add.image(45,47,'nubeslateral').setOrigin(0).setScale(1);
                /*this.boton_5.depth=100;
                this.boton_6.depth=100;
                this.avionVistaLateral.depth=100;*/
                avion_3_Aliados.cambiarAltitud("Alta");
                config.Partida.sincronizar({tipoOp:"sincronizarAltitudAvion", idavion:7, altitud:"Alta"});

            }
            if (avion_4_Aliados.focus==true){
                this.vistaLateral = this.add.image(45,47,'nubeslateral').setOrigin(0).setScale(1);
                /*this.boton_5.depth=100;
                this.boton_6.depth=100;
                this.avionVistaLateral.depth=100;*/
                avion_4_Aliados.cambiarAltitud("Alta");
                config.Partida.sincronizar({tipoOp:"sincronizarAltitudAvion", idavion:8, altitud:"Alta"});

            }   
        });

        this.keys.down.on('down',()=>
        {            
            if (avion_1.focus==true){
                this.vistaLateral = this.add.image(45,47,'vistaLateralBaja').setOrigin(0).setScale(1);
                /*this.boton_5.depth=100;
                this.boton_6.depth=100;
                this.avionVistaLateral.depth=100;*/
                avion_1.cambiarAltitud("Baja");
                config.Partida.sincronizar({tipoOp:"sincronizarAltitudAvion", idavion:1, altitud:"Baja"});
            }
            if (avion_2.focus==true){
                this.vistaLateral = this.add.image(45,47,'vistaLateralBaja').setOrigin(0).setScale(1);
               /* this.boton_5.depth=100;
                this.boton_6.depth=100;
                this.avionVistaLateral.depth=100;*/
                avion_2.cambiarAltitud("Baja");
                config.Partida.sincronizar({tipoOp:"sincronizarAltitudAvion", idavion:2, altitud:"Baja"});

            }
            if (avion_3.focus==true){
                this.vistaLateral = this.add.image(45,47,'vistaLateralBaja').setOrigin(0).setScale(1);
                /*this.boton_5.depth=100;
                this.boton_6.depth=100;
                this.avionVistaLateral.depth=100;*/
                avion_3.cambiarAltitud("Baja");
                config.Partida.sincronizar({tipoOp:"sincronizarAltitudAvion", idavion:3, altitud:"Baja"});

            }
            if (avion_4.focus==true){

                this.vistaLateral = this.add.image(45,47,'vistaLateralBaja').setOrigin(0).setScale(1);
                /*this.boton_5.depth=100;
                this.boton_6.depth=100;
                this.avionVistaLateral.depth=100;*/
                avion_4.cambiarAltitud("Baja");
                config.Partida.sincronizar({tipoOp:"sincronizarAltitudAvion", idavion:4, altitud:"Baja"});

            } 
            if (avion_1_Aliados.focus==true){
                this.vistaLateral = this.add.image(45,47,'nubeslateral').setOrigin(0).setScale(1);
                /*this.boton_5.depth=100;
                this.boton_6.depth=100;
                this.avionVistaLateral.depth=100;*/
                avion_1_Aliados.cambiarAltitud("Baja");
                config.Partida.sincronizar({tipoOp:"sincronizarAltitudAvion", idavion:5, altitud:"Baja"});

            }
            if (avion_2_Aliados.focus==true){
                this.vistaLateral = this.add.image(45,47,'nubeslateral').setOrigin(0).setScale(1);
                /*this.boton_5.depth=100;
                this.boton_6.depth=100;
                this.avionVistaLateral.depth=100;*/
                avion_2_Aliados.cambiarAltitud("Baja");
                config.Partida.sincronizar({tipoOp:"sincronizarAltitudAvion", idavion:6, altitud:"Baja"});

            }
            if (avion_3_Aliados.focus==true){
                this.vistaLateral = this.add.image(45,47,'nubeslateral').setOrigin(0).setScale(1);
               /* this.boton_5.depth=100;
                this.boton_6.depth=100;
                this.avionVistaLateral.depth=100;*/
                avion_3_Aliados.cambiarAltitud("Baja");
                config.Partida.sincronizar({tipoOp:"sincronizarAltitudAvion", idavion:7, altitud:"Baja"});

            }
            if (avion_4_Aliados.focus==true){ 
                this.vistaLateral = this.add.image(45,47,'nubeslateral').setOrigin(0).setScale(1);
               /* this.boton_5.depth=100;
                this.boton_6.depth=100;
                this.avionVistaLateral.depth=100;*/
                avion_4_Aliados.cambiarAltitud("Baja");
                config.Partida.sincronizar({tipoOp:"sincronizarAltitudAvion", idavion:8, altitud:"Baja"});

            }     
        });

        //Evento para disparo de bomba disparado por el jugador al apretar espacio
        this.keys.space.on('down',()=>
        {                        
            if (avion_1.focus==true && avion_1.tengobomba){                
                //this.vistaLateral = this.add.image(45,47,'vistaLateralBaja').setOrigin(0).setScale(1);
               // this.boton_5.depth=100;
               // this.boton_6.depth=100;
                //this.avionVistaLateral.depth=100;
                avion_1.tengobomba=false;
                avion_1.velocidad= avion_1.calcularVelocidad();
            }
            if (avion_2.focus==true && avion_2.tengobomba){                
                //this.vistaLateral = this.add.image(45,47,'vistaLateralBaja').setOrigin(0).setScale(1);
               // this.boton_5.depth=100;
               // this.boton_6.depth=100;
                //this.avionVistaLateral.depth=100;
                avion_2.tengobomba=false;
                avion_2.velocidad= avion_2.calcularVelocidad();
            }
            if (avion_3.focus==true && avion_3.tengobomba){
                //this.vistaLateral = this.add.image(45,47,'vistaLateralBaja').setOrigin(0).setScale(1);
               // this.boton_5.depth=100;
               // this.boton_6.depth=100;
                //this.avionVistaLateral.depth=100;
                avion_3.tengobomba=false;
                avion_3.velocidad= avion_3.calcularVelocidad();
            }
            if (avion_4.focus==true && avion_4.tengobomba){
                //this.vistaLateral = this.add.image(45,47,'vistaLateralBaja').setOrigin(0).setScale(1);
               // this.boton_5.depth=100;
               // this.boton_6.depth=100;
                //this.avionVistaLateral.depth=100;
                avion_4.tengobomba=false;
                avion_4.velocidad= avion_4.calcularVelocidad();
            } 
            if (avion_1_Aliados.focus==true && avion_1_Aliados.tengobomba){
                //this.vistaLateral = this.add.image(45,47,'vistaLateralBaja').setOrigin(0).setScale(1);
               // this.boton_5.depth=100;
               // this.boton_6.depth=100;
                //this.avionVistaLateral.depth=100;
                avion_1_Aliados.tengobomba=false;
                avion_1_Aliados.velocidad= avion_1_Aliados.calcularVelocidad();
            }
            if (avion_2_Aliados.focus==true && avion_2_Aliados.tengobomba){
                //this.vistaLateral = this.add.image(45,47,'vistaLateralBaja').setOrigin(0).setScale(1);
               // this.boton_5.depth=100;
               // this.boton_6.depth=100;
                //this.avionVistaLateral.depth=100;
                avion_2_Aliados.tengobomba=false;
                avion_2_Aliados.velocidad= avion_2_Aliados.calcularVelocidad();
            }
            if (avion_3_Aliados.focus==true && avion_3_Aliados.tengobomba){
                //this.vistaLateral = this.add.image(45,47,'vistaLateralBaja').setOrigin(0).setScale(1);
               // this.boton_5.depth=100;
               // this.boton_6.depth=100;
                //this.avionVistaLateral.depth=100;
                avion_3_Aliados.tengobomba=false;
                avion_3_Aliados.velocidad= avion_3_Aliados.calcularVelocidad();
            }
            if (avion_4_Aliados.focus==true && avion_4_Aliados.tengobomba){
                //this.vistaLateral = this.add.image(45,47,'vistaLateralBaja').setOrigin(0).setScale(1);
               // this.boton_5.depth=100;
               // this.boton_6.depth=100;
                //this.avionVistaLateral.depth=100;
                avion_4_Aliados.tengobomba=false;
                avion_4_Aliados.velocidad= avion_4_Aliados.calcularVelocidad();
            }     
        });

        //Evento que escucha que tecla se presiona y reacciona a los numeros 1 al 4 para setear el focus de los aviones
        this.input.keyboard.on('keydown',(evento)=>{
            if (config.Partida.Bando=='Potencias')
            {
                
                if (evento.key==='1' )  
                {    
                    avion_1.focus=true;
                    avion_2.focus=false;
                    avion_3.focus=false;
                    avion_4.focus=false;
                    this.panelAvion1 = this.add.image(45, 500, "panelAvion1Rojo").setOrigin(0).setScale(.3).setInteractive();
                    this.panelAvion2 = this.add.image(45, 595, "panelAvion2").setOrigin(0).setScale(.3).setInteractive();
                    this.panelAvion3 = this.add.image(45, 690, "panelAvion3").setOrigin(0).setScale(.3).setInteractive();
                    this.panelAvion4 = this.add.image(45, 785, "panelAvion4").setOrigin(0).setScale(.3).setInteractive();
                    this.cargarBomba1.depth=100; 
                    this.cargarBomba2.depth=100; 
                    this.cargarBomba3.depth=100; 
                    this.cargarBomba4.depth=100; 
                    this.volverBase1.depth=100;
                    this.volverBase2.depth=100;
                    this.volverBase3.depth=100;
                    this.volverBase4.depth=100;

                }
                if (evento.key==='2')  
                {    
                    avion_2.focus=true;
                    avion_1.focus=false;
                    avion_3.focus=false;
                    avion_4.focus=false;
                    this.panelAvion1 = this.add.image(45, 500, "panelAvion1").setOrigin(0).setScale(.3).setInteractive();
                    this.panelAvion2 = this.add.image(45, 595, "panelAvion2Rojo").setOrigin(0).setScale(.3).setInteractive();
                    this.panelAvion3 = this.add.image(45, 690, "panelAvion3").setOrigin(0).setScale(.3).setInteractive();
                    this.panelAvion4 = this.add.image(45, 785, "panelAvion4").setOrigin(0).setScale(.3).setInteractive();
                    this.cargarBomba1.depth=100; 
                    this.cargarBomba2.depth=100; 
                    this.cargarBomba3.depth=100; 
                    this.cargarBomba4.depth=100; 
                    this.volverBase1.depth=100;
                    this.volverBase2.depth=100;
                    this.volverBase3.depth=100;
                    this.volverBase4.depth=100;
                }
                if (evento.key==='3')  
                {    
                    avion_3.focus=true;
                    avion_1.focus=false;
                    avion_2.focus=false;
                    avion_4.focus=false;
                    this.panelAvion1 = this.add.image(45, 500, "panelAvion1").setOrigin(0).setScale(.3).setInteractive();
                    this.panelAvion2 = this.add.image(45, 595, "panelAvion2").setOrigin(0).setScale(.3).setInteractive();
                    this.panelAvion3 = this.add.image(45, 690, "panelAvion3Rojo").setOrigin(0).setScale(.3).setInteractive();
                    this.panelAvion4 = this.add.image(45, 785, "panelAvion4").setOrigin(0).setScale(.3).setInteractive();
                    this.cargarBomba1.depth=100; 
                    this.cargarBomba2.depth=100; 
                    this.cargarBomba3.depth=100; 
                    this.cargarBomba4.depth=100; 
                    this.volverBase1.depth=100;
                    this.volverBase2.depth=100;
                    this.volverBase3.depth=100;
                    this.volverBase4.depth=100;
                }
                if (evento.key==='4')  
                {    
                    avion_4.focus=true;
                    avion_1.focus=false;
                    avion_2.focus=false;
                    avion_3.focus=false;
                    this.panelAvion1 = this.add.image(45, 500, "panelAvion1").setOrigin(0).setScale(.3).setInteractive();
                    this.panelAvion2 = this.add.image(45, 595, "panelAvion2").setOrigin(0).setScale(.3).setInteractive();
                    this.panelAvion3 = this.add.image(45, 690, "panelAvion3").setOrigin(0).setScale(.3).setInteractive();
                    this.panelAvion4 = this.add.image(45, 785, "panelAvion4Rojo").setOrigin(0).setScale(.3).setInteractive();
                    this.cargarBomba1.depth=100; 
                    this.cargarBomba2.depth=100; 
                    this.cargarBomba3.depth=100; 
                    this.cargarBomba4.depth=100; 
                    this.volverBase1.depth=100;
                    this.volverBase2.depth=100;
                    this.volverBase3.depth=100;
                    this.volverBase4.depth=100;
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
                    this.panelAvion1 = this.add.image(45, 500, "panelAvion1Rojo").setOrigin(0).setScale(.3).setInteractive();
                    this.panelAvion2 = this.add.image(45, 595, "panelAvion2").setOrigin(0).setScale(.3).setInteractive();
                    this.panelAvion3 = this.add.image(45, 690, "panelAvion3").setOrigin(0).setScale(.3).setInteractive();
                    this.panelAvion4 = this.add.image(45, 785, "panelAvion4").setOrigin(0).setScale(.3).setInteractive();
                    this.cargarBomba1.depth=100; 
                    this.cargarBomba2.depth=100; 
                    this.cargarBomba3.depth=100; 
                    this.cargarBomba4.depth=100; 
                    this.volverBase1.depth=100;
                    this.volverBase2.depth=100;
                    this.volverBase3.depth=100;
                    this.volverBase4.depth=100;
                }
                if (evento.key==='2')  
                {    
                    avion_1_Aliados.focus=false;
                    avion_2_Aliados.focus=true;
                    avion_3_Aliados.focus=false;
                    avion_4_Aliados.focus=false;
                    this.panelAvion1 = this.add.image(45, 500, "panelAvion1").setOrigin(0).setScale(.3).setInteractive();
                    this.panelAvion2 = this.add.image(45, 595, "panelAvion2Rojo").setOrigin(0).setScale(.3).setInteractive();
                    this.panelAvion3 = this.add.image(45, 690, "panelAvion3").setOrigin(0).setScale(.3).setInteractive();
                    this.panelAvion4 = this.add.image(45, 785, "panelAvion4").setOrigin(0).setScale(.3).setInteractive();
                    this.cargarBomba1.depth=100; 
                    this.cargarBomba2.depth=100; 
                    this.cargarBomba3.depth=100; 
                    this.cargarBomba4.depth=100; 
                    this.volverBase1.depth=100;
                    this.volverBase2.depth=100;
                    this.volverBase3.depth=100;
                    this.volverBase4.depth=100;
                }
                if (evento.key==='3')  
                {    
                    avion_1_Aliados.focus=false;
                    avion_2_Aliados.focus=false;
                    avion_3_Aliados.focus=true;
                    avion_4_Aliados.focus=false; 
                    this.panelAvion1 = this.add.image(45, 500, "panelAvion1").setOrigin(0).setScale(.3).setInteractive();
                    this.panelAvion2 = this.add.image(45, 595, "panelAvion2").setOrigin(0).setScale(.3).setInteractive();
                    this.panelAvion3 = this.add.image(45, 690, "panelAvion3Rojo").setOrigin(0).setScale(.3).setInteractive();
                    this.panelAvion4 = this.add.image(45, 785, "panelAvion4").setOrigin(0).setScale(.3).setInteractive();
                    this.cargarBomba1.depth=100; 
                    this.cargarBomba2.depth=100; 
                    this.cargarBomba3.depth=100; 
                    this.cargarBomba4.depth=100; 
                    this.volverBase1.depth=100;
                    this.volverBase2.depth=100;
                    this.volverBase3.depth=100;
                    this.volverBase4.depth=100;
                    
                }
                if (evento.key==='4')  
                {    
                    avion_1_Aliados.focus=false;
                    avion_2_Aliados.focus=false;
                    avion_3_Aliados.focus=false;
                    avion_4_Aliados.focus=true;
                    this.panelAvion1 = this.add.image(45, 500, "panelAvion1").setOrigin(0).setScale(.3).setInteractive();
                    this.panelAvion2 = this.add.image(45, 595, "panelAvion2").setOrigin(0).setScale(.3).setInteractive();
                    this.panelAvion3 = this.add.image(45, 690, "panelAvion3").setOrigin(0).setScale(.3).setInteractive();
                    this.panelAvion4 = this.add.image(45, 785, "panelAvion4Rojo").setOrigin(0).setScale(.3).setInteractive();
                    this.cargarBomba1.depth=100; 
                    this.cargarBomba2.depth=100; 
                    this.cargarBomba3.depth=100; 
                    this.cargarBomba4.depth=100; 
                    this.volverBase1.depth=100;
                    this.volverBase2.depth=100;
                    this.volverBase3.depth=100;
                    this.volverBase4.depth=100;
                }   
            }
        });
        //Se deja visible los aviones dependiendo el bando del jugador
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

    // Funcion que recibe por parametro el Sprite usado para la máscara, que va a seguir al avion
    // dependiendo de si se está moviendo y ademas está enfocado.
    lightAvion()
    {
        if (config.Partida.Bando=='Potencias')
        {
            if (this.EstaMoviendose(avion_1))
            {
                light1.x = avion_1.x;
                light1.y = avion_1.y;
            } 
            if (this.EstaMoviendose(avion_2))
            {
                light2.x = avion_2.x;
                light2.y = avion_2.y;
            }  
            if (this.EstaMoviendose(avion_3))
            {
                light3.x = avion_3.x;
                light3.y = avion_3.y;
            } 
            if (this.EstaMoviendose(avion_4))
            {
                light4.x = avion_4.x;
                light4.y = avion_4.y;
            }            
        }
        else
        {
            if (this.EstaMoviendose(avion_1_Aliados))
            {
                light1.x = avion_1_Aliados.x;
                light1.y = avion_1_Aliados.y;
            } 
            if (this.EstaMoviendose(avion_2_Aliados))
            {
                light2.x = avion_2_Aliados.x;
                light2.y = avion_2_Aliados.y;
            } 
            if (this.EstaMoviendose(avion_3_Aliados))
            {
                light3.x = avion_3_Aliados.x;
                light3.y = avion_3_Aliados.y;
            }
            if (this.EstaMoviendose(avion_4_Aliados))
            {
                light4.x = avion_4_Aliados.x;
                light4.y = avion_4_Aliados.y;
            }  
        }
    }

    //Funcion que chequea si un avion esta en la base o no, y si esta en la base y se llamo al cargar bomba o combustible, asigna los atributos necesarios 
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
                avion.altitud='En base';
                avion.setScale(.05);
                avion.cargarbomba=false;
                avion.tengobomba=true; 
                avion.velocidad=avion.calcularVelocidad(velAvion);
                this.cargarBomba1 = this.add.image(65, 545, "botonBomba").setOrigin(0).setScale(.3).setInteractive(); 
            }
            if (avion.cargarCombustible==true)
            {
                avion.altitud='En base';
                avion.setScale(.05);
                avion.body.setVelocityY(0);
                avion.body.setVelocityX(0);
                avion.cargarCombustible=false;                
                this.volverBase = this.add.image(220, 545, "botonCombustible").setOrigin(0).setScale(.3).setInteractive();
            }            
            return false;
        }
        else
            return true;           
    }

    //Funcion para controlar la visibilidad de los aviones cuando entran en el rango visible de otro avion
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

        //llama a funcion que actualiza el efecto visual de luces en los aviones y la base
        this.lightAvion();
        //Tiempo que se usa para las balas 
        this.time = time;
        //Dependiendo de que bando sea el jugador controlara el movimiento y combustible de los aviones
        if (config.Partida.Bando=='Potencias')
        {
            if (this.EstaMoviendose(avion_1) && time>timeNafta)
            {                
                if(avion_1.combustible!=0)
                {   
                    timeNafta =timeNafta+1000;            
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
                    //console.log(avion_1_Aliados.combustible);
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

        //Se setea la posicion de los circulos de cada avion para que sigan al avion correspondiente
        this.circulo_1.setPosition(avion_1.x, avion_1.y);  
        this.circulo_2.setPosition(avion_2.x, avion_2.y);
        this.circulo_3.setPosition(avion_3.x, avion_3.y);
        this.circulo_4.setPosition(avion_4.x, avion_4.y);
        this.circulo_5.setPosition(avion_1_Aliados.x, avion_1_Aliados.y);  
        this.circulo_6.setPosition(avion_2_Aliados.x, avion_2_Aliados.y);
        this.circulo_7.setPosition(avion_3_Aliados.x, avion_3_Aliados.y);
        this.circulo_8.setPosition(avion_4_Aliados.x, avion_4_Aliados.y); 

        //Dependiendo el bando del jugaddor controla la visibilidad de los aviones enemigos al entrar en el campo visual de algun avion del jugador
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
        if(avion_1.vidaAvion <= 0) 
            avion_1.destroy();  
        if(avion_2.vidaAvion <= 0) 
            avion_2.destroy();  
        if(avion_3.vidaAvion <= 0) 
            avion_3.destroy();  
        if(avion_4.vidaAvion <= 0) 
            avion_4.destroy();   
        if(avion_1_Aliados.vidaAvion <= 0) 
            avion_1_Aliados.destroy(); 
        if(avion_2_Aliados.vidaAvion <= 0) 
            avion_2_Aliados.destroy(); 
        if(avion_3_Aliados.vidaAvion <= 0) 
            avion_3_Aliados.destroy(); 
        if(avion_4_Aliados.vidaAvion <= 0) 
            avion_4_Aliados.destroy(); 
        
        //Se controla condicion de victoria del juego
        if(avion_1.vidaAvion <= 0 && avion_2.vidaAvion <= 0 && avion_3.vidaAvion <= 0 && avion_4.vidaAvion <= 0) 
        {
            if (config.Partida.Bando=='Potencias')
            {
                this.scene.pause();
                this.scene.launch('GameOver');
            }
            else
            {
                this.scene.pause();
                this.scene.launch('Win');
            }
                
        }

        //Se controla condicion de victoria del juego
        if(avion_1_Aliados.vidaAvion <= 0 && avion_2_Aliados.vidaAvion <= 0 && avion_3_Aliados.vidaAvion <= 0 && avion_4_Aliados.vidaAvion <= 0)
        {
            if (config.Partida.Bando=='Potencias')
            {
                this.scene.pause();
                this.scene.launch('Win');
            }
            else
            {
                this.scene.pause();
                this.scene.launch('GameOver');
            }
        }

        if(config.Partida.estado=='Pausado'){
            this.scene.pause();
        }else if(config.Partida.estado=='Jugando'){
            this.scene.resume();
        }

    }



}


export  default Play;
