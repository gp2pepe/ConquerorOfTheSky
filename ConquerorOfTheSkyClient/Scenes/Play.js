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
var light1Bomba;
var light2Bomba;
var light3Bomba;
var light4Bomba;
var lightBasePotencia;
var lightBaseAliados;
var vidaContainer1;
var vidaContainer2;
var vidaContainer3;
var vidaContainer4;
var combustibleContainer1;
var combustibleContainer2;
var combustibleContainer3;
var combustibleContainer4;
var vidaBar1;
var vidaBar2;
var vidaBar3;
var vidaBar4;
var combustibleBar1;
var combustibleBar2;
var combustibleBar3;
var combustibleBar4;
var yInicialAvionBasePotencias;
var yInicialAvionBaseAliados;
var timedEvent;
var mensajeAvionDestruido1 = false;
var mensajeAvionDestruido2 = false;
var mensajeAvionDestruido3 = false;
var mensajeAvionDestruido4 = false;
var mensajeAvionDestruido5 = false;
var mensajeAvionDestruido6 = false;
var mensajeAvionDestruido7 = false;
var mensajeAvionDestruido8 = false;

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

        // agrego sonido de fondo de la partida
        this.sonidoDisparos = this.sound.add('sonido_disparos',{loop:false});
        this.sonidoBomba = this.sound.add('sonido_confirmar',{loop:false});
        
        //Se imprime en consola la partida que devuelve el servidor
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

        this.torrePotencias.vida= config.Partida.configuraciones.torreSalud;
        this.physics.world.enable(this.torrePotencias);        
		this.torrePotencias.body.setCollideWorldBounds(true);
        this.torrePotencias.body.setSize(300,900);
        this.torrePotencias.lastFired=0;

        this.circulo_torrePotencias = this.add.image(this.torrePotencias.x,this.torrePotencias.y,'circuloAvion').setScale(1.5);
        this.circulo_torrePotencias.setVisible(false);
        this.physics.world.enable(this.circulo_torrePotencias);
        this.circulo_torrePotencias.body.setCircle(60); 
        this.circulo_torrePotencias.body.setOffset(-10,-10); 
               

        this.depositoPotencias.vida= config.Partida.configuraciones.depositoExplosivosSalud;
        this.physics.world.enable(this.depositoPotencias);        
		this.depositoPotencias.body.setCollideWorldBounds(true);

        this.contenedorPotencias.vida= config.Partida.configuraciones.tanqueCombustibleSalud;
        this.physics.world.enable(this.contenedorPotencias);        
		this.contenedorPotencias.body.setCollideWorldBounds(true);

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
            artilleriasPotencias.getChildren()[i].vida = config.Partida.configuraciones.artilleriaSalud; 

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
       
        this.torreAliados.vida= config.Partida.configuraciones.torreSalud;
        this.physics.world.enable(this.torreAliados);        
		this.torreAliados.body.setCollideWorldBounds(true);
        this.torreAliados.body.setSize(300,900);
        this.torreAliados.lastFired=0;
        
        this.circulo_torreAliados = this.add.image(this.torreAliados.x,this.torreAliados.y,'circuloAvion').setScale(1.5);
        this.circulo_torreAliados.setVisible(false);
        this.physics.world.enable(this.circulo_torreAliados);
        this.circulo_torreAliados.body.setCircle(60);
        this.circulo_torreAliados.body.setOffset(-10,-10); 

        this.depositoAliados.vida= config.Partida.configuraciones.depositoExplosivosSalud;
        this.physics.world.enable(this.depositoAliados);        
		this.depositoAliados.body.setCollideWorldBounds(true);

        this.contenedorAliados.vida= config.Partida.configuraciones.tanqueCombustibleSalud;
        this.physics.world.enable(this.contenedorAliados);        
		this.contenedorAliados.body.setCollideWorldBounds(true);

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
            artilleriasAliados.getChildren()[i].vida = config.Partida.configuraciones.artilleriaSalud; 

       }

        //Se define la posicion inicial de aviones y se llama a funcion que definira los aviones 

        if (campoPotencias.base.posicionY - campoPotencias.posicionY + 50 > 200)
	        yInicialAvionBasePotencias = campoPotencias.base.posicionY + 50 - 120;
        else
	        yInicialAvionBasePotencias = campoPotencias.base.posicionY + 50 + 120;
        
        if (campoAliados.base.posicionY - campoAliados.posicionY + 50 > 200)
	        yInicialAvionBaseAliados = campoAliados.base.posicionY + 50 - 120;
        else
	        yInicialAvionBaseAliados = campoAliados.base.posicionY + 50 + 120;

       //Llamo a la funcion para definir los aviones
        this.definicionAviones();   

        //Se definen luces que seguiran a los aviones y tambien habra en la base, es para el efecto visual del circulo
        this.mapaMask.setPipeline('Light2D');
        this.lights.enable();
        this.lights.setAmbientColor(0xF3F3F3);  
        if (config.Partida.Bando == 'Potencias')
        {
            //var light = this.lights.addLight(10, 20, 200).setColor(0xffffff).setIntensity(2);
            light1 = this.lights.addLight(500, 200, 100).setIntensity(0);
            light2 = this.lights.addLight(500, 400, 100).setIntensity(0);
            light3 = this.lights.addLight(500, 600, 100).setIntensity(0);
            light4 = this.lights.addLight(500, 800, 100).setIntensity(0);
            light1Bomba = this.lights.addLight(500, 200, 100).setColor(0xFF0000).setIntensity(0);
            light2Bomba = this.lights.addLight(500, 400, 100).setColor(0xFF0000).setIntensity(0);
            light3Bomba = this.lights.addLight(500, 600, 100).setColor(0xFF0000).setIntensity(0);
            light4Bomba = this.lights.addLight(500, 800, 100).setColor(0xFF0000).setIntensity(0);
            lightBasePotencia = this.lights.addLight(campoPotencias.base.posicionX +40, campoPotencias.base.posicionY + 70, 200).setIntensity(12);
            this.lightCampoPotencia = this.lights.addLight(campoPotencias.posicionX +150, campoPotencias.posicionY + 200, 300).setIntensity(8);
            
        }
        else
        {
            light1 = this.lights.addLight(1500, 200, 100).setIntensity(0);
            light2 = this.lights.addLight(1500, 400, 100).setIntensity(0);
            light3 = this.lights.addLight(1500, 600, 100).setIntensity(0);
            light4 = this.lights.addLight(1500, 800, 100).setIntensity(0);
            light1Bomba = this.lights.addLight(1500, 200, 100).setColor(0xFF0000).setIntensity(0);
            light2Bomba = this.lights.addLight(1500, 400, 100).setColor(0xFF0000).setIntensity(0);
            light3Bomba = this.lights.addLight(1500, 600, 100).setColor(0xFF0000).setIntensity(0);
            light4Bomba = this.lights.addLight(1500, 800, 100).setColor(0xFF0000).setIntensity(0);
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
        config.Partida.aviones = new Array();
        config.Partida.aviones[0] = avion_1;
        config.Partida.aviones[1] = avion_2;
        config.Partida.aviones[2] = avion_3;
        config.Partida.aviones[3] = avion_4;
        config.Partida.aviones[4] = avion_1_Aliados;
        config.Partida.aviones[5] = avion_2_Aliados;
        config.Partida.aviones[6] = avion_3_Aliados;
        config.Partida.aviones[7] = avion_4_Aliados;

        config.Partida.basePotencias = new Array();
        config.Partida.basePotencias[0] = this.torrePotencias;
        config.Partida.basePotencias[1] = this.depositoPotencias;
        config.Partida.basePotencias[2] = this.contenedorPotencias;

        config.Partida.baseAliados = new Array();
        config.Partida.baseAliados[0] = this.torreAliados;
        config.Partida.baseAliados[1] = this.depositoAliados;
        config.Partida.baseAliados[2] = this.contenedorAliados;

        config.Partida.artilleriasPotencias = new Array();
        for(var i = 0; i<config.Partida.configuraciones.artilleriaCantidad; i++){
            config.Partida.artilleriasPotencias[i] = artilleriasPotencias.getChildren()[i];
        }

        config.Partida.artilleriasAliados = new Array();
        for(var i = 0; i<config.Partida.configuraciones.artilleriaCantidad; i++){
            config.Partida.artilleriasAliados[i] = artilleriasAliados.getChildren()[i];
        }
        
        //Evento que escucha cuando se clickea con el mouse y llama al onObjectClicked
        this.input.on('pointerdown',this.onObjectClicked);   
        
        //Bullets, se define el grupo de balas que utilizaran los aviones
        bullets = this.add.group({
            classType: Bullet,
            maxSize: 10,
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

        //Se llama a la funcionan para setear los eventos de las colisiones
        this.colisiones(); 

        //Coloco boton para que el jugador que creo la partida pueda guardar la misma
        if(config.Partida.duenio)   
            this.botonGuardar();

        //Se definen las barras de vida  de cada avion
        vidaContainer1 = this.add.sprite(233, 520 , "vidaContainer").setScale(0.25);
        vidaContainer2 = this.add.sprite(233, 615 , "vidaContainer").setScale(0.25);
        vidaContainer3 = this.add.sprite(233, 710 , "vidaContainer").setScale(0.25);
        vidaContainer4 = this.add.sprite(233, 805 , "vidaContainer").setScale(0.25);
 
        //Sprite con la barra de vida a moverse
        vidaBar1 = this.add.sprite(vidaContainer1.x-10 , vidaContainer1.y, "vidaBar").setScale(0.25);
        vidaBar2 = this.add.sprite(vidaContainer2.x-10 , vidaContainer2.y, "vidaBar").setScale(0.25);
        vidaBar3 = this.add.sprite(vidaContainer3.x-10 , vidaContainer3.y, "vidaBar").setScale(0.25);
        vidaBar4 = this.add.sprite(vidaContainer4.x-10 , vidaContainer4.y, "vidaBar").setScale(0.25);
 
        //Mascara para ocultar la barra de vida
        this.vidaMask1 = this.add.sprite(vidaBar1.x, vidaBar1.y, "vidaBar").setScale(0.25);
        this.vidaMask2 = this.add.sprite(vidaBar2.x, vidaBar2.y, "vidaBar").setScale(0.25);
        this.vidaMask3 = this.add.sprite(vidaBar3.x, vidaBar3.y, "vidaBar").setScale(0.25);
        this.vidaMask4 = this.add.sprite(vidaBar4.x, vidaBar4.y, "vidaBar").setScale(0.25);
 
        // dejo la mascara no visible para que luego aparezca al mover el vidaBar
        this.vidaMask1.visible = false;
        this.vidaMask2.visible = false;
        this.vidaMask3.visible = false;
        this.vidaMask4.visible = false;
 
        // Asigno la mascara la barra de vida
        vidaBar1.mask = new Phaser.Display.Masks.BitmapMask(this, this.vidaMask1);
        vidaBar2.mask = new Phaser.Display.Masks.BitmapMask(this, this.vidaMask2);
        vidaBar3.mask = new Phaser.Display.Masks.BitmapMask(this, this.vidaMask3);
        vidaBar4.mask = new Phaser.Display.Masks.BitmapMask(this, this.vidaMask4);


        //Se definen las barras de combustible de cada avion
        combustibleContainer1 = this.add.sprite(347, 520 , "combustibleContainer").setScale(0.25);
        combustibleContainer2 = this.add.sprite(347, 615 , "combustibleContainer").setScale(0.25);
        combustibleContainer3 = this.add.sprite(347, 710 , "combustibleContainer").setScale(0.25);
        combustibleContainer4 = this.add.sprite(347, 805 , "combustibleContainer").setScale(0.25);

        //Sprite con la barra de combustible a moverse
        combustibleBar1 = this.add.sprite(combustibleContainer1.x-10 , combustibleContainer1.y, "combustibleBar").setScale(0.25);
        combustibleBar2 = this.add.sprite(combustibleContainer2.x-10 , combustibleContainer2.y, "combustibleBar").setScale(0.25);
        combustibleBar3 = this.add.sprite(combustibleContainer3.x-10 , combustibleContainer3.y, "combustibleBar").setScale(0.25);
        combustibleBar4 = this.add.sprite(combustibleContainer4.x-10 , combustibleContainer4.y, "combustibleBar").setScale(0.25);

        //Mascara para ocultar la barra de combustible
        this.combustibleMask1 = this.add.sprite(combustibleBar1.x, combustibleBar1.y, "combustibleBar").setScale(0.25);
        this.combustibleMask2 = this.add.sprite(combustibleBar2.x, combustibleBar2.y, "combustibleBar").setScale(0.25);
        this.combustibleMask3 = this.add.sprite(combustibleBar3.x, combustibleBar3.y, "combustibleBar").setScale(0.25);
        this.combustibleMask4 = this.add.sprite(combustibleBar4.x, combustibleBar4.y, "combustibleBar").setScale(0.25);

        // dejo la mascara no visible para que luego aparezca al mover el combustibleBar
        this.combustibleMask1.visible = false;
        this.combustibleMask2.visible = false;
        this.combustibleMask3.visible = false;
        this.combustibleMask4.visible = false;

        // Asigno la mascara la barra de combustible
        combustibleBar1.mask = new Phaser.Display.Masks.BitmapMask(this, this.combustibleMask1);
        combustibleBar2.mask = new Phaser.Display.Masks.BitmapMask(this, this.combustibleMask2);
        combustibleBar3.mask = new Phaser.Display.Masks.BitmapMask(this, this.combustibleMask3);
        combustibleBar4.mask = new Phaser.Display.Masks.BitmapMask(this, this.combustibleMask4);

        this.BotonesLaterales();
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
                        avion_1.altitud_anterior=avion_1.altitud;
                        
                        avion_1.cargarbomba=true;      
                        this.cargarBomba1 = this.add.image(65, 545, "botonBombaRojo").setOrigin(0).setScale(.3).setInteractive();   
                     //   this.cargarBomba1.depth =100;      
                        config.Partida.idavion=1;
                        avion_1.moverAvion({x: avion_1.xInicial, y: avion_1.yInicial});                        
                        config.Partida.sincronizar({tipoOp:"sincronizarAvion", idavion:1, x: avion_1.xInicial, y: avion_1.yInicial});
                        config.Partida.sincronizar({tipoOp:"sincronizarBombaAvion", idavion:1, bomba: true});
                        
                        this.avionVistaLateral = this.add.image(100,180,'avionBombaLateral').setOrigin(0).setScale(.7);
                        this.avionVistaLateral.depth = 100;

                    }            

                    if (avion_1_Aliados.focus==true)
                    {    
                        avion_1_Aliados.altitud_anterior=avion_1_Aliados.altitud;

                        avion_1_Aliados.cargarbomba=true;  
                        this.cargarBomba1 = this.add.image(65, 545, "botonBombaRojo").setOrigin(0).setScale(.3).setInteractive();         
                        config.Partida.idavion=5;
                        avion_1_Aliados.moverAvion({x: avion_1_Aliados.xInicial, y: avion_1_Aliados.yInicial});
                        config.Partida.sincronizar({tipoOp:"sincronizarAvion", idavion:5, x: avion_1_Aliados.xInicial, y: avion_1_Aliados.yInicial});
                        config.Partida.sincronizar({tipoOp:"sincronizarBombaAvion", idavion:5, bomba: true});


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
                        avion_1.altitud_anterior=avion_1.altitud;

                        avion_1.cargarCombustible=true;
                        config.Partida.idavion=1;
                        avion_1.moverAvion({x: avion_1.xInicial, y: avion_1.yInicial});
                        config.Partida.sincronizar({tipoOp:"sincronizarAvion", idavion:1, x: avion_1.xInicial, y: avion_1.yInicial});
                        this.volverBase1 = this.add.image(220, 545, "botonCombustibleRojo").setOrigin(0).setScale(.3).setInteractive();
                        config.Partida.sincronizar({tipoOp:"sincronizarCombustibleAvion", idavion:1, combustible: true});

                    }                

                    if (avion_1_Aliados.focus==true)
                    {        
                        avion_1_Aliados.altitud_anterior=avion_1_Aliados.altitud;

                        avion_1_Aliados.cargarCombustible=true;     
                        config.Partida.idavion=5;
                        avion_1_Aliados.moverAvion({x: avion_1_Aliados.xInicial, y: avion_1_Aliados.yInicial});
                        config.Partida.sincronizar({tipoOp:"sincronizarAvion", idavion:5, x: avion_1_Aliados.xInicial, y: avion_1_Aliados.yInicial});
                        this.volverBase1 = this.add.image(220, 545, "botonCombustibleRojo").setOrigin(0).setScale(.3).setInteractive();
                        config.Partida.sincronizar({tipoOp:"sincronizarCombustibleAvion", idavion:5, combustible: true});

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
                        avion_2.altitud_anterior=avion_2.altitud;

                        avion_2.cargarbomba=true;      
                        this.cargarBomba2 = this.add.image(65, 545, "botonBombaRojo").setOrigin(0).setScale(.3).setInteractive();         
                        config.Partida.idavion=2;
                        avion_2.moverAvion({x: avion_2.xInicial, y: avion_2.yInicial});
                        config.Partida.sincronizar({tipoOp:"sincronizarAvion", idavion:2, x: avion_2.xInicial, y: avion_2.yInicial});
                        config.Partida.sincronizar({tipoOp:"sincronizarBombaAvion", idavion:2, bomba: true});

                    }            

                    if (avion_2_Aliados.focus==true)
                    {    
                        avion_2_Aliados.altitud_anterior=avion_2_Aliados.altitud;

                        avion_2_Aliados.cargarbomba=true;  
                        this.cargarBomba2 = this.add.image(65, 545, "botonBombaRojo").setOrigin(0).setScale(.3).setInteractive();         
                        config.Partida.idavion=6;
                        avion_2_Aliados.moverAvion({x: avion_2_Aliados.xInicial, y: avion_2_Aliados.yInicial});
                        config.Partida.sincronizar({tipoOp:"sincronizarAvion", idavion:6, x: avion_2_Aliados.xInicial, y: avion_2_Aliados.yInicial});
                        config.Partida.sincronizar({tipoOp:"sincronizarBombaAvion", idavion:6, bomba: true});


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
                        avion_2.altitud_anterior=avion_2.altitud;

                        avion_2.cargarCombustible=true;
                        config.Partida.idavion=2;
                        avion_2.moverAvion({x: avion_2.xInicial, y: avion_2.yInicial});
                        config.Partida.sincronizar({tipoOp:"sincronizarAvion", idavion:2, x: avion_2.xInicial, y: avion_2.yInicial});
                        this.volverBase2 = this.add.image(220, 545, "botonCombustibleRojo").setOrigin(0).setScale(.3).setInteractive();
                        config.Partida.sincronizar({tipoOp:"sincronizarCombustibleAvion", idavion:2, combustible: true});

                    }                

                    if (avion_2_Aliados.focus==true)
                    {        
                        avion_2_Aliados.altitud_anterior=avion_2_Aliados.altitud;

                        avion_2_Aliados.cargarCombustible=true;     
                        config.Partida.idavion=6;
                        avion_2_Aliados.moverAvion({x: avion_2_Aliados.xInicial, y: avion_2_Aliados.yInicial});
                        config.Partida.sincronizar({tipoOp:"sincronizarAvion", idavion:6, x: avion_2_Aliados.xInicial, y: avion_2_Aliados.yInicial});
                        this.volverBase2 = this.add.image(220, 545, "botonCombustibleRojo").setOrigin(0).setScale(.3).setInteractive();
                        config.Partida.sincronizar({tipoOp:"sincronizarCombustibleAvion", idavion:6, combustible: true});

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
                        avion_3.altitud_anterior=avion_3.altitud;

                        avion_3.cargarbomba=true;      
                        this.cargarBomba3 = this.add.image(65, 545, "botonBombaRojo").setOrigin(0).setScale(.3).setInteractive();         
                        config.Partida.idavion=3;
                        avion_3.moverAvion({x: avion_3.xInicial, y: avion_3.yInicial});
                        config.Partida.sincronizar({tipoOp:"sincronizarAvion", idavion:3, x: avion_3.xInicial, y: avion_3.yInicial});
                        config.Partida.sincronizar({tipoOp:"sincronizarBombaAvion", idavion:3, bomba: true});

                    }            

                    if (avion_3_Aliados.focus==true)
                    {    
                        avion_3_Aliados.altitud_anterior=avion_3_Aliados.altitud;
                        
                        avion_3_Aliados.cargarbomba=true;  
                        this.cargarBomba3 = this.add.image(65, 545, "botonBombaRojo").setOrigin(0).setScale(.3).setInteractive();         
                        config.Partida.idavion=7;
                        avion_3_Aliados.moverAvion({x: avion_3_Aliados.xInicial, y: avion_3_Aliados.yInicial});
                        config.Partida.sincronizar({tipoOp:"sincronizarAvion", idavion:7, x: avion_3_Aliados.xInicial, y: avion_3_Aliados.yInicial});
                        config.Partida.sincronizar({tipoOp:"sincronizarBombaAvion", idavion:7, bomba: true});

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
                        avion_3.altitud_anterior=avion_3.altitud;

                        avion_3.cargarCombustible=true;
                        config.Partida.idavion=3;
                        avion_3.moverAvion({x: avion_3.xInicial, y: avion_3.yInicial});
                        config.Partida.sincronizar({tipoOp:"sincronizarAvion", idavion:3, x: avion_3.xInicial, y: avion_3.yInicial});
                        this.volverBase3 = this.add.image(220, 545, "botonCombustibleRojo").setOrigin(0).setScale(.3).setInteractive();
                        config.Partida.sincronizar({tipoOp:"sincronizarCombustibleAvion", idavion:3, combustible: true});

                    }                

                    if (avion_3_Aliados.focus==true)
                    {        
                        avion_3_Aliados.altitud_anterior=avion_3_Aliados.altitud;

                        avion_3_Aliados.cargarCombustible=true;     
                        config.Partida.idavion=7;
                        avion_3_Aliados.moverAvion({x: avion_3_Aliados.xInicial, y: avion_3_Aliados.yInicial});
                        config.Partida.sincronizar({tipoOp:"sincronizarAvion", idavion:7, x: avion_3_Aliados.xInicial, y: avion_3_Aliados.yInicial});
                        this.volverBase3 = this.add.image(220, 545, "botonCombustibleRojo").setOrigin(0).setScale(.3).setInteractive();
                        config.Partida.sincronizar({tipoOp:"sincronizarCombustibleAvion", idavion:7, combustible: true});

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
                        avion_4.altitud_anterior=avion_4.altitud;

                        avion_4.cargarbomba=true;      
                        this.cargarBomba4 = this.add.image(65, 545, "botonBombaRojo").setOrigin(0).setScale(.3).setInteractive();         
                        config.Partida.idavion=4;
                        avion_4.moverAvion({x: avion_4.xInicial, y: avion_4.yInicial});
                        config.Partida.sincronizar({tipoOp:"sincronizarAvion", idavion:4, x: avion_4.xInicial, y: avion_4.yInicial});
                        config.Partida.sincronizar({tipoOp:"sincronizarBombaAvion", idavion:4, bomba: true});

                    }            

                    if (avion_4_Aliados.focus==true)
                    {    
                        avion_4_Aliados.altitud_anterior=avion_4_Aliados.altitud;

                        avion_4_Aliados.cargarbomba=true;  
                        this.cargarBomba4 = this.add.image(65, 545, "botonBombaRojo").setOrigin(0).setScale(.3).setInteractive();         
                        config.Partida.idavion=8;
                        avion_4_Aliados.moverAvion({x: avion_4_Aliados.xInicial, y: avion_4_Aliados.yInicial});
                        config.Partida.sincronizar({tipoOp:"sincronizarAvion", idavion:8, x: avion_4_Aliados.xInicial, y: avion_4_Aliados.yInicial});
                        config.Partida.sincronizar({tipoOp:"sincronizarBombaAvion", idavion:8, bomba: true});


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
                        config.Partida.sincronizar({tipoOp:"sincronizarCombustibleAvion", idavion:4, combustible: true});

                    }                

                    if (avion_4_Aliados.focus==true)
                    {        
                        avion_4_Aliados.cargarCombustible=true;     
                        config.Partida.idavion=8;
                        avion_4_Aliados.moverAvion({x: avion_4_Aliados.xInicial, y: avion_4_Aliados.yInicial});
                        config.Partida.sincronizar({tipoOp:"sincronizarAvion", idavion:8, x: avion_4_Aliados.xInicial, y: avion_4_Aliados.yInicial});
                        this.volverBase4 = this.add.image(220, 545, "botonCombustibleRojo").setOrigin(0).setScale(.3).setInteractive();
                        config.Partida.sincronizar({tipoOp:"sincronizarCombustibleAvion", idavion:8, combustible: true});

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
                        config.Partida.estado="Pausado";
                        this.scene.launch('Guardar');
                        config.Partida.sincronizar({tipoOp:"sincronizarPausa", estado:"Pausar"});
                        this.scene.pause();
       
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
                if(config.Partida.Bando=='Potencias'){
                    if(avion.idAvion == 1){
                        vidaBar1.x-=5;
                    }else{
                        if(avion.idAvion == 2){
                            vidaBar2.x-=5;
                        }else{
                            if(avion.idAvion == 3){
                                vidaBar3.x-=5;
                            }else{
                                if(avion.idAvion == 4){
                                    vidaBar4.x-=5;
                                }
                                
                            }
                        }
                    }
                }else{
                    if(config.Partida.Bando=='Aliados'){
                         if(avion.idAvion == 5){
                            vidaBar1.x-=5;
                            }else{
                                if(avion.idAvion == 6){
                                    vidaBar2-=5;
                                }else{
                                    if(avion.idAvion == 7){
                                        vidaBar3.x-=5;
                                    }else{
                                        if(avion.idAvion == 8){
                                            vidaBar4.x-=5;
                                    
                                        }
                                    }
                                }
                            }
                    }
                 }
                
                avion.vidaAvion-=10;  
                console.log( avion.vidaAvion);
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
        this.sonidoDisparos.play();     
    }

    colision_torre_aviones(Bullet, avion_A_pegar)
    {                
        //Colisiones entre la torre y avion que colisiono con el rango visible
        if (avion_A_pegar.activarColision==1)
        {            
            var Hit = Phaser.Math.Between(1,2);
            if (Hit == 1 ){
                if(config.Partida.Bando=='Potencias'){
                    if(avion_A_pegar.idAvion == 1){
                        vidaBar1.x-=5;
                    }else{
                        if(avion_A_pegar.idAvion == 2){
                            vidaBar2.x-=5;
                        }else{
                            if(avion_A_pegar.idAvion == 3){
                                vidaBar3.x-=5;
                            }else{
                                if(avion_A_pegar.idAvion == 4){
                                    vidaBar4.x-=5;
                                }
                                
                            }
                        }
                    }
                }else{
                    if(config.Partida.Bando=='Aliados'){
                         if(avion_A_pegar.idAvion == 5){
                            vidaBar1.x-=5;
                            }else{
                                if(avion_A_pegar.idAvion == 6){
                                    vidaBar2-=5;
                                }else{
                                    if(avion_A_pegar.idAvion == 7){
                                        vidaBar3.x-=5;
                                    }else{
                                        if(avion_A_pegar.idAvion == 8){
                                            vidaBar4.x-=5;
                                    
                                        }
                                    }
                                }
                            }
                    }
                 }
                avion_A_pegar.vidaAvion-=10; 
                config.Partida.sincronizar({tipoOp:"sincronizarVidaAvion", idavion:avion_A_pegar.idavion, vida:avion_A_pegar.vidaAvion});                    
            }  
            avion_A_pegar.activarColision=0; 
            console.log("vida avion: "+avion_A_pegar.vidaAvion);               
        }
    }

     //Evento  llamado al disparar automaticamente artilleria
     colision_torre_avion(circulo,avion_A_pegar)
     {                 
        //Se pasa el avion que esta en focus 
        bullet = bullets.get();
        if (bullet)
        {                
            if (config.Partida.Bando=='Potencias')
            { 
                if (this.time > this.torreAliados.lastFired)
                {  
                    avion_A_pegar.activarColision=1;
                    bullet.fireArtilleria(this.torreAliados,{x: avion_A_pegar.x, y: avion_A_pegar.y});  
                    this.physics.add.overlap(bullet, avion_A_pegar, this.colision_torre_aviones, null, this);   
                    this.torreAliados.lastFired  = this.time + 2000;   
                    this.torreAliados.setVisible(true);
                }
            }  
            else   
            {                
                if (this.time > this.torrePotencias.lastFired)
                {     
                         
                    avion_A_pegar.activarColision=1;
                    bullet.fireArtilleria(this.torrePotencias,{x: avion_A_pegar.x, y: avion_A_pegar.y});  
                    this.physics.add.overlap(bullet, avion_A_pegar, this.colision_torre_aviones, null, this);   
                    this.torrePotencias.lastFired  = this.time + 2000;  
                    this.torrePotencias.setVisible(true);   
                }
            }  
        }         
     }
     
    choqueAviones(avion_potencia,avion_aliado)
    {
        if (avion_potencia.altitud = avion_aliado.altitud)
        {
            avion_potencia.vidaAvion= 0;
            avion_aliado.vidaAvion= 0;
            config.Partida.sincronizar({tipoOp:"sincronizarVidaAvion", idavion:avion_potencia.idavion, vida:avion_potencia.vidaAvion});                    
            config.Partida.sincronizar({tipoOp:"sincronizarVidaAvion", idavion:avion_aliado.idavion, vida:avion_aliado.vidaAvion});
        }     
    }

    colision_aviones_deposito(circulo,objeto)
    {        
        if (config.Partida.Bando=='Potencias')
        { 
            this.depositoAliados.setVisible(true);
        }  
        else   
        {                
            this.depositoPotencias.setVisible(true);
        } 
    }

    colision_aviones_contenedor(circulo,objeto)
    {        
        if (config.Partida.Bando=='Potencias')
        { 
            this.contenedorAliados.setVisible(true);
        }  
        else   
        {                
            this.contenedorPotencias.setVisible(true);
        } 
    }


    colisiones()
    { 
        //Colisiones generales, artilleria, torre de control , balas y aviones
        this.physics.add.overlap(artilleriasAliados,aviones, this.dispararArtilleria, null, this);
        this.physics.add.overlap(artilleriasPotencias, aviones_aliados, this.dispararArtilleria, null, this);
        this.physics.add.overlap(this.circulo_torreAliados, aviones, this.colision_torre_avion, null, this); 
        this.physics.add.overlap(this.circulo_torrePotencias, aviones_aliados, this.colision_torre_avion, null, this); 
        
        this.physics.add.overlap(aviones, aviones_aliados, this.choqueAviones, null, this);
        
        this.physics.add.overlap(circulo_aviones, this.depositoAliados, this.colision_aviones_deposito, null, this); 
        this.physics.add.overlap(circulo_aviones_aliados, this.depositoPotencias, this.colision_aviones_deposito, null, this); 

        this.physics.add.overlap(circulo_aviones, this.contenedorAliados, this.colision_aviones_contenedor, null, this); 
        this.physics.add.overlap(circulo_aviones_aliados, this.contenedorPotencias, this.colision_aviones_contenedor, null, this); 
        
        //Aniado colision entre los aviones y los muros
        this.physics.add.collider([avion_1,avion_2,avion_3,avion_4,avion_1_Aliados,avion_2_Aliados,avion_3_Aliados,avion_4_Aliados],this.wall_floor);       


        if (config.Partida.Bando=='Potencias')
        { 
            this.physics.add.overlap(circulo_aviones, aviones_aliados, this.Colision_Aviones, null, this);  
            this.physics.add.overlap(bullets, aviones_aliados, this.colision_bala_avion, null, this); 
            
            //deposito
            this.physics.add.overlap(this.depositoAliados,this.circulo_bomba_chico, ()=>
            {   
                if (config.Partida.Bando=='Potencias')
                { 
                    this.depositoAliados.setVisible(true);
                }  
                else   
                {                
                    this.depositoPotencias.setVisible(true);
                } 
            });

            this.physics.add.overlap(this.depositoAliados,this.circulo_bomba_grande, ()=>
            {   
                this.depositoAliados.vida = this.depositoAliados.vida - this.circulo_bomba_grande.danio;                
                this.circulo_bomba_grande.setPosition(1, 1);
                console.log('grande:'+this.depositoAliados.vida);
                this.mensajeAviso('Se ha hecho ' + this.circulo_bomba_grande.danio + ' de daño al Deposito enemigo');
                if (this.depositoAliados.vida < 0)
                    console.log('sin deposito');
            });
            // torre
            this.physics.add.overlap(this.torreAliados,this.circulo_bomba_chico, ()=>
            {   
                this.torreAliados.vida = this.torreAliados.vida - this.circulo_bomba_chico.danio;
                this.circulo_bomba_chico.setPosition(1, 1);
                console.log('torre - chica:'+this.torreAliados.vida);
                this.mensajeAviso('Se ha hecho ' + this.circulo_bomba_chico.danio + ' de daño a la Torre enemiga');
                if (this.torreAliados.vida < 0)
                    console.log('sin torre ');
            });

            this.physics.add.overlap(this.torreAliados,this.circulo_bomba_grande, ()=>
            {   
                this.torreAliados.vida = this.torreAliados.vida - this.circulo_bomba_grande.danio;                
                this.circulo_bomba_grande.setPosition(1, 1);
                console.log('torre -grande:'+this.torreAliados.vida);
                this.mensajeAviso('Se ha hecho ' + this.circulo_bomba_grande.danio + ' de daño a la Torre enemiga');
                if (this.torreAliados.vida < 0)
                    console.log('sin torre');
            });
            //contendor
            this.physics.add.overlap(this.contenedorAliados,this.circulo_bomba_chico, ()=>
            {   
                this.contenedorAliados.vida = this.contenedorAliados.vida - this.circulo_bomba_chico.danio;
                this.circulo_bomba_chico.setPosition(1, 1);
                console.log('contendor - chica:'+this.contenedorAliados.vida);
                this.mensajeAviso('Se ha hecho ' + this.circulo_bomba_chico.danio + ' de daño al Contenedor enemigo');
                if (this.contenedorAliados.vida < 0)
                    console.log('sin contenedor');
            });

            this.physics.add.overlap(this.contenedorAliados,this.circulo_bomba_grande, ()=>
            {   
                this.contenedorAliados.vida = this.contenedorAliados.vida - this.circulo_bomba_grande.danio;                
                this.circulo_bomba_grande.setPosition(1, 1);
                console.log('contenedor - grande:'+this.contenedorAliados.vida);
                this.mensajeAviso('Se ha hecho ' + this.circulo_bomba_grande.danio + ' de daño al Contenedor enemigo');
                if (this.contenedorAliados.vida < 0)
                    console.log('sin contenedor');
            });
        }else{ 
            this.physics.add.overlap(circulo_aviones_aliados, aviones, this.Colision_Aviones, null, this);         
            this.physics.add.overlap(bullets, aviones, this.colision_bala_avion, null, this);  
            //deposito
            this.physics.add.overlap(this.depositoPotencias,this.circulo_bomba_chico, ()=>
            {   
                this.depositoPotencias.vida = this.depositoPotencias.vida - this.circulo_bomba_chico.danio;
                this.circulo_bomba_chico.setPosition(1, 1);
                console.log('chica:'+this.depositoPotencias.vida);
                this.mensajeAviso('Se ha hecho ' + this.circulo_bomba_chico.danio + ' de daño al Deposito enemigo');
                if (this.depositoPotencias.vida < 0)
                    console.log('sin deposito ');
            });

            this.physics.add.overlap(this.depositoPotencias,this.circulo_bomba_grande, ()=>
            {   
                this.depositoPotencias.vida = this.depositoPotencias.vida - this.circulo_bomba_grande.danio;                
                this.circulo_bomba_grande.setPosition(1, 1);
                console.log('grande:'+this.depositoPotencias.vida);
                this.mensajeAviso('Se ha hecho ' + this.circulo_bomba_grande.danio + ' de daño al Deposito enemigo');
                if (this.depositoPotencias.vida < 0)
                    console.log('sin deposito');
            });
            // torre
            this.physics.add.overlap(this.torrePotencias,this.circulo_bomba_chico, ()=>
            {   
                this.torrePotencias.vida = this.torrePotencias.vida - this.circulo_bomba_chico.danio;
                this.circulo_bomba_chico.setPosition(1, 1);
                console.log('torre - chica:'+this.torrePotencias.vida);
                this.mensajeAviso('Se ha hecho ' + this.circulo_bomba_chico.danio + ' de daño a la Torre enemiga');
                if (this.torrePotencias.vida < 0)
                    console.log('sin torre ');
            });

            this.physics.add.overlap(this.torrePotencias,this.circulo_bomba_grande, ()=>
            {   
                this.torrePotencias.vida = this.torrePotencias.vida - this.circulo_bomba_grande.danio;                
                this.circulo_bomba_grande.setPosition(1, 1);
                console.log('torre -grande:'+this.torrePotencias.vida);
                this.mensajeAviso('Se ha hecho ' + this.circulo_bomba_grande.danio + ' de daño a la Torre enemiga');
                if (this.torrePotencias.vida < 0)
                    console.log('sin torre');
            });
            //contendor
            this.physics.add.overlap(this.contenedorPotencias,this.circulo_bomba_chico, ()=>
            {   
                this.contenedorPotencias.vida = this.contenedorPotencias.vida - this.circulo_bomba_chico.danio;
                this.circulo_bomba_chico.setPosition(1, 1);                
                console.log('contendor - chica:'+this.contenedorPotencias.vida);
                this.mensajeAviso('Se ha hecho ' + this.circulo_bomba_chico.danio + ' de daño al Contenedor enemigo');
                if (this.contenedorPotencias.vida < 0)
                    console.log('sin contenedor');
            });

            this.physics.add.overlap(this.contenedorPotencias,this.circulo_bomba_grande, ()=>
            {   
                this.contenedorPotencias.vida = this.contenedorPotencias.vida - this.circulo_bomba_grande.danio;                
                this.circulo_bomba_grande.setPosition(1, 1);
                console.log('contenedor - grande:'+this.contenedorPotencias.vida);
                this.mensajeAviso('Se ha hecho ' + this.circulo_bomba_grande.danio + ' de daño al Contenedor enemigo');
                if (this.contenedorPotencias.vida < 0)
                    console.log('sin contenedor');
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
            if (avion_1.focus==true)
            {       
 
                if (avion_1.altitud_anterior!='En base' &&avion_1.altitud==='En base')
                {    
                    avion_1.cambiarAltitud(avion_1.altitud_anterior);
                    config.Partida.sincronizar({tipoOp:"sincronizarAltitudAvion", idavion:1, altitud:avion_1.altitud});                    
                    avion_1.altitud_anterior = 'En base';
                } 
                config.Partida.idavion=1;                
                avion_1.moverAvion({x: pointer.x, y: pointer.y});            
                config.Partida.sincronizar({tipoOp:"sincronizarAvion", idavion:1, x: pointer.x, y: pointer.y});
            }  

            if (avion_2.focus==true)
            {         
                if (avion_2.altitud_anterior!='En base' &&avion_2.altitud==='En base')
                {    
                    avion_2.cambiarAltitud(avion_2.altitud_anterior);
                    config.Partida.sincronizar({tipoOp:"sincronizarAltitudAvion", idavion:2, altitud:avion_2.altitud});                    
                    avion_2.altitud_anterior = 'En base';
                }    
                config.Partida.idavion=2;
                avion_2.moverAvion({x: pointer.x, y: pointer.y});
                config.Partida.sincronizar({tipoOp:"sincronizarAvion", idavion:2, x: pointer.x, y: pointer.y});
            } 

            if (avion_3.focus==true)
            {            
                if (avion_3.altitud_anterior!='En base' &&avion_3.altitud==='En base')
                {    
                    avion_3.cambiarAltitud(avion_3.altitud_anterior);
                    config.Partida.sincronizar({tipoOp:"sincronizarAltitudAvion", idavion:3, altitud:avion_3.altitud});                    
                    avion_3.altitud_anterior = 'En base';
                }    
                config.Partida.idavion=3;
                avion_3.moverAvion({x: pointer.x, y: pointer.y});
                config.Partida.sincronizar({tipoOp:"sincronizarAvion", idavion:3, x: pointer.x, y: pointer.y});
            }  

            if (avion_4.focus==true)
            {       
                if (avion_4.altitud_anterior!='En base' &&avion_4.altitud==='En base')
                {    
                    avion_4.cambiarAltitud(avion_4.altitud_anterior);
                    config.Partida.sincronizar({tipoOp:"sincronizarAltitudAvion", idavion:4, altitud:avion_4.altitud});                    
                    avion_4.altitud_anterior = 'En base';
                }   
                config.Partida.idavion=4;
                avion_4.moverAvion({x: pointer.x, y: pointer.y});
                config.Partida.sincronizar({tipoOp:"sincronizarAvion", idavion:4, x: pointer.x, y: pointer.y});
            } 
        }
            else
            {
            if (avion_1_Aliados.focus==true )
            {
                if (avion_1_Aliados.altitud_anterior!='En base' &&avion_1_Aliados.altitud==='En base')
                {    
                    avion_1_Aliados.cambiarAltitud(avion_1_Aliados.altitud_anterior);
                    config.Partida.sincronizar({tipoOp:"sincronizarAltitudAvion", idavion:5, altitud:avion_1_Aliados.altitud});                    
                    avion_1_Aliados.altitud_anterior = 'En base';
                } 
                config.Partida.idavion=5;
                avion_1_Aliados.moverAvion({x: pointer.x, y: pointer.y});
                config.Partida.sincronizar({tipoOp:"sincronizarAvion", idavion:5, x: pointer.x, y: pointer.y});
            }
            if (avion_2_Aliados.focus==true)
            { 
                if (avion_2_Aliados.altitud_anterior!='En base' &&avion_2_Aliados.altitud==='En base')
                {    
                    avion_2_Aliados.cambiarAltitud(avion_2_Aliados.altitud_anterior);
                    config.Partida.sincronizar({tipoOp:"sincronizarAltitudAvion", idavion:6, altitud:avion_2_Aliados.altitud});                    
                    avion_2_Aliados.altitud_anterior = 'En base';
                } 
                config.Partida.idavion=6;
                avion_2_Aliados.moverAvion({x: pointer.x, y: pointer.y});
                config.Partida.sincronizar({tipoOp:"sincronizarAvion", idavion:6, x: pointer.x, y: pointer.y});
            }
            if (avion_3_Aliados.focus==true)
            {
                if (avion_3_Aliados.altitud_anterior!='En base' &&avion_3_Aliados.altitud==='En base')
                {    
                    avion_3_Aliados.cambiarAltitud(avion_3_Aliados.altitud_anterior);
                    config.Partida.sincronizar({tipoOp:"sincronizarAltitudAvion", idavion:6, altitud:avion_3_Aliados.altitud});                    
                    avion_3_Aliados.altitud_anterior = 'En base';
                }
                config.Partida.idavion=7;
                avion_3_Aliados.moverAvion({x: pointer.x, y: pointer.y});
                config.Partida.sincronizar({tipoOp:"sincronizarAvion", idavion:7, x: pointer.x, y: pointer.y});
            }
            else
            {
                if (avion_4_Aliados.altitud_anterior!='En base' &&avion_4_Aliados.altitud==='En base')
                {    
                    avion_4_Aliados.cambiarAltitud(avion_4_Aliados.altitud_anterior);
                    config.Partida.sincronizar({tipoOp:"sincronizarAltitudAvion", idavion:6, altitud:avion_4_Aliados.altitud});                    
                    avion_4_Aliados.altitud_anterior = 'En base';
                }
                if (avion_4_Aliados.focus==true){
                config.Partida.idavion=8;
                avion_4_Aliados.moverAvion({x: pointer.x, y: pointer.y});
                config.Partida.sincronizar({tipoOp:"sincronizarAvion", idavion:8, x: pointer.x, y: pointer.y});
            }
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
                    if(config.Partida.Bando=='Potencias'){
                        if(avion_A_pegar.idAvion == 1){
                            vidaBar1.x-=5;
                        }else{
                            if(avion_A_pegar.idAvion == 2){
                                vidaBar2.x-=5;
                            }else{
                                if(avion_A_pegar.idAvion == 3){
                                    vidaBar3.x-=5;
                                }else{
                                    if(avion_A_pegar.idAvion == 4){
                                        vidaBar4.x-=5;
                                    }
                                    
                                }
                            }
                        }
                    }else{
                        if(config.Partida.Bando=='Aliados'){
                             if(avion_A_pegar.idAvion == 5){
                                vidaBar1.x-=5;
                                }else{
                                    if(avion_A_pegar.idAvion == 6){
                                        vidaBar2-=5;
                                    }else{
                                        if(avion_A_pegar.idAvion == 7){
                                            vidaBar3.x-=5;
                                        }else{
                                            if(avion_A_pegar.idAvion == 8){
                                                vidaBar4.x-=5;
                                        
                                            }
                                        }
                                    }
                                }
                        }
                     }
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
            artilleria_focus.setVisible(true);
            if (this.time > artilleria_focus.lastFired)
            {                 
                avion_A_pegar.activarColision=1;
                bullet.fireArtilleria(artilleria_focus,{x: avion_A_pegar.x, y: avion_A_pegar.y});  
                this.physics.add.overlap(bullet, avion_A_pegar, this.colision_Artillerias_aviones, null, this);   
                artilleria_focus.lastFired  = this.time + 2000;     
            }
         }  
     }
     //Funcion que coloca las barras de vida y los botones laterales encima de los demas elementos para que sean visibles
     colocarArriba(){
        
        vidaContainer1.depth=100;
        vidaContainer2.depth=100;
        vidaContainer3.depth=100;
        vidaContainer4.depth=100;
        vidaBar1.depth=100;
        vidaBar2.depth=100;
        vidaBar3.depth=100;
        vidaBar4.depth=100;
        combustibleContainer1.depth=100;
        combustibleContainer2.depth=100;
        combustibleContainer3.depth=100;
        combustibleContainer4.depth=100;
        combustibleBar1.depth=100;
        combustibleBar2.depth=100;
        combustibleBar3.depth=100;
        combustibleBar4.depth=100;
        this.cargarBomba1.depth=100; 
        this.cargarBomba2.depth=100; 
        this.cargarBomba3.depth=100; 
        this.cargarBomba4.depth=100; 
        this.volverBase1.depth=100;
        this.volverBase2.depth=100;
        this.volverBase3.depth=100;
        this.volverBase4.depth=100;
     }
    
    definicionAviones()
    {	
        //Se definen los aviones de ambos bandos
        var velAvion = config.Partida.configuraciones.avionVelocidad;  
        avion_1 = new Avion({
            scene: this,
            x: campoPotencias.posicionX + 70,
            y: yInicialAvionBasePotencias,
         //   xInicial: campoPotencias.posicionX + 70,
        //    yInicial: yInicialAvionBasePotencias
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
            x: campoPotencias.posicionX + 120,
            y: yInicialAvionBasePotencias,
            xInicial: campoPotencias.posicionX + 120,
            yInicial: yInicialAvionBasePotencias                                 
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
            x: campoPotencias.posicionX + 170,
            y: yInicialAvionBasePotencias,
            xInicial: campoPotencias.posicionX + 170,
            yInicial: yInicialAvionBasePotencias           
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
            x: campoPotencias.posicionX + 220,
            y: yInicialAvionBasePotencias,
            xInicial: campoPotencias.posicionX + 220,
            yInicial: yInicialAvionBasePotencias              
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
            x: campoAliados.posicionX + 70,
            y: yInicialAvionBaseAliados,
            xInicial: campoAliados.posicionX + 70,
            yInicial: yInicialAvionBaseAliados
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
       // avion_1_Aliados.flipX = true;

        avion_2_Aliados = new Avion({
            scene: this,
            x: campoAliados.posicionX + 120,
            y: yInicialAvionBaseAliados,
            xInicial: campoAliados.posicionX + 120,
            yInicial: yInicialAvionBaseAliados
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
        //avion_2_Aliados.flipX = true;

        avion_3_Aliados = new Avion({
            scene: this,
            x: campoAliados.posicionX + 170,
            y: yInicialAvionBaseAliados,
            xInicial: campoAliados.posicionX + 170,
            yInicial: yInicialAvionBaseAliados
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
      //  avion_3_Aliados.flipX = true;

        avion_4_Aliados = new Avion({
            scene: this,
            x: campoAliados.posicionX + 220,
            y: yInicialAvionBaseAliados,
            xInicial: campoAliados.posicionX + 220,
            yInicial: yInicialAvionBaseAliados
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
      //  avion_4_Aliados.flipX = true;

        this.circulo_bomba_grande = this.add.image(1,1,'circuloAvion').setScale(1.5);
        this.circulo_bomba_grande.setVisible(false);
        this.physics.world.enable(this.circulo_bomba_grande);
        this.circulo_bomba_grande.danio= 100;


        this.circulo_bomba_chico = this.add.image(1,1,'circuloAvion').setScale(1.5);
        this.circulo_bomba_chico.setVisible(false);
        this.physics.world.enable(this.circulo_bomba_chico);
        this.circulo_bomba_chico.danio= 100;
        
        //Se guardan las teclas cursor y se setea evento para cambiar altitud del avion
        this.keys = this.input.keyboard.createCursorKeys();
        this.keys.up.on('down',()=>
        {            
            if (avion_1.focus==true){
                this.vistaLateral = this.add.image(45,47,'nubeslateral').setOrigin(0).setScale(1);
                this.avionVistaLateral = this.add.image(100,180,'Nieuport_28C1Lateral').setOrigin(0).setScale(.7);
                if (avion_1.altitud!='En base'){
                    avion_1.cambiarAltitud("Alta");
                    config.Partida.sincronizar({tipoOp:"sincronizarAltitudAvion", idavion:1, altitud:"Alta"}); 
                }  
                else
                    avion_1.setScale(0.08);  
                avion_1.altitud_anterior= "Alta";
            }
            if (avion_2.focus==true){                
                this.vistaLateral = this.add.image(45,47,'nubeslateral').setOrigin(0).setScale(1);
                this.avionVistaLateral = this.add.image(100,180,'Nieuport_28C1Lateral').setOrigin(0).setScale(.7);
                if (avion_2.altitud!='En base'){
                    avion_2.cambiarAltitud("Alta");
                    config.Partida.sincronizar({tipoOp:"sincronizarAltitudAvion", idavion:2, altitud:"Alta"}); 
                }  
                else
                    avion_2.setScale(0.08);  
                avion_2.altitud_anterior= "Alta";                   

            }
            if (avion_3.focus==true){
                this.vistaLateral = this.add.image(45,47,'nubeslateral').setOrigin(0).setScale(1);
                this.avionVistaLateral = this.add.image(100,180,'Nieuport_28C1Lateral').setOrigin(0).setScale(.7); 
                if (avion_3.altitud!='En base'){    
                    avion_3.cambiarAltitud("Alta");
                    config.Partida.sincronizar({tipoOp:"sincronizarAltitudAvion", idavion:3, altitud:"Alta"});
                }   
                else
                    avion_3.setScale(0.08);  
                avion_3.altitud_anterior= "Alta"; 

            }
            if (avion_4.focus==true){
                this.vistaLateral = this.add.image(45,47,'nubeslateral').setOrigin(0).setScale(1);
                this.avionVistaLateral = this.add.image(100,180,'Nieuport_28C1Lateral').setOrigin(0).setScale(.7);
                if (avion_4.altitud!='En base'){
                    avion_4.cambiarAltitud("Alta");
                    config.Partida.sincronizar({tipoOp:"sincronizarAltitudAvion", idavion:4, altitud:"Alta"});
                }   
                else
                    avion_4.setScale(0.08);  
                avion_4.altitud_anterior= "Alta"; 

            }   
            if (avion_1_Aliados.focus==true){
                this.vistaLateral = this.add.image(45,47,'nubeslateral').setOrigin(0).setScale(1);
                this.avionVistaLateral = this.add.image(100,180,'Nieuport_28C1Lateral').setOrigin(0).setScale(.7);
                if (avion_1_Aliados.altitud!='En base'){
                    avion_1_Aliados.cambiarAltitud("Alta");
                    config.Partida.sincronizar({tipoOp:"sincronizarAltitudAvion", idavion:5, altitud:"Alta"});
                }   
                else
                    avion_1_Aliados.setScale(0.08);  
                avion_1_Aliados.altitud_anterior= "Alta"; 
            }
            if (avion_2_Aliados.focus==true){
                this.vistaLateral = this.add.image(45,47,'nubeslateral').setOrigin(0).setScale(1);
                this.avionVistaLateral = this.add.image(100,180,'Nieuport_28C1Lateral').setOrigin(0).setScale(.7);
                if (avion_2_Aliados.altitud!='En base'){
                    avion_2_Aliados.cambiarAltitud("Alta");
                    config.Partida.sincronizar({tipoOp:"sincronizarAltitudAvion", idavion:6, altitud:"Alta"});
                }   
                else
                    avion_2_Aliados.setScale(0.08);  
                avion_2_Aliados.altitud_anterior= "Alta"; 
            }
            if (avion_3_Aliados.focus==true){
                this.vistaLateral = this.add.image(45,47,'nubeslateral').setOrigin(0).setScale(1);
                this.avionVistaLateral = this.add.image(100,180,'Nieuport_28C1Lateral').setOrigin(0).setScale(.7);
                if (avion_3_Aliados.altitud!='En base'){
                    avion_3_Aliados.cambiarAltitud("Alta");
                    config.Partida.sincronizar({tipoOp:"sincronizarAltitudAvion", idavion:7, altitud:"Alta"});
                }   
                else
                    avion_3_Aliados.setScale(0.08);  
                avion_3_Aliados.altitud_anterior= "Alta"; 
            }
            if (avion_4_Aliados.focus==true){
                this.vistaLateral = this.add.image(45,47,'nubeslateral').setOrigin(0).setScale(1);
                this.avionVistaLateral = this.add.image(100,180,'Nieuport_28C1Lateral').setOrigin(0).setScale(.7);
                if (avion_4_Aliados.altitud!='En base'){
                    avion_4_Aliados.cambiarAltitud("Alta");
                    config.Partida.sincronizar({tipoOp:"sincronizarAltitudAvion", idavion:8, altitud:"Alta"});
                }   
                else
                    avion_4_Aliados.setScale(0.08);  
                avion_4_Aliados.altitud_anterior= "Alta"; 
            }
        });

        this.keys.down.on('down',()=>
        {            
            if (avion_1.focus==true){
                this.vistaLateral = this.add.image(45,47,'vistaLateralBaja').setOrigin(0).setScale(1);
                this.avionVistaLateral = this.add.image(100,180,'Nieuport_28C1Lateral').setOrigin(0).setScale(.7);
                if (avion_1.altitud!='En base'){
                    avion_1.cambiarAltitud("Baja");
                    config.Partida.sincronizar({tipoOp:"sincronizarAltitudAvion", idavion:1, altitud:"Baja"});
                }   
                else
                    avion_1.setScale(0.05);  
                avion_1.altitud_anterior= "Baja"; 
            }
            if (avion_2.focus==true){
                this.vistaLateral = this.add.image(45,47,'vistaLateralBaja').setOrigin(0).setScale(1);
                this.avionVistaLateral = this.add.image(100,180,'Nieuport_28C1Lateral').setOrigin(0).setScale(.7);
                if (avion_2.altitud!='En base'){
                    avion_2.cambiarAltitud("Baja");
                    config.Partida.sincronizar({tipoOp:"sincronizarAltitudAvion", idavion:2, altitud:"Baja"});
                }   
                else
                    avion_2.setScale(0.05);  
                avion_2.altitud_anterior= "Baja"

            }
            if (avion_3.focus==true){
                this.vistaLateral = this.add.image(45,47,'vistaLateralBaja').setOrigin(0).setScale(1);
                this.avionVistaLateral = this.add.image(100,180,'Nieuport_28C1Lateral').setOrigin(0).setScale(.7);
                if (avion_3.altitud!='En base'){
                    avion_3.cambiarAltitud("Baja");
                    config.Partida.sincronizar({tipoOp:"sincronizarAltitudAvion", idavion:3, altitud:"Baja"});
                }   
                else
                    avion_3.setScale(0.05);  
                avion_3.altitud_anterior= "Baja"

            }
            if (avion_4.focus==true){
                this.vistaLateral = this.add.image(45,47,'vistaLateralBaja').setOrigin(0).setScale(1);
                this.avionVistaLateral = this.add.image(100,180,'Nieuport_28C1Lateral').setOrigin(0).setScale(.7);
                if (avion_4.altitud!='En base'){
                    avion_4.cambiarAltitud("Baja");
                    config.Partida.sincronizar({tipoOp:"sincronizarAltitudAvion", idavion:4, altitud:"Baja"});
                }   
                else
                    avion_4.setScale(0.05);  
                avion_4.altitud_anterior= "Baja"


            } 
            if (avion_1_Aliados.focus==true){
                this.vistaLateral = this.add.image(45,47,'nubeslateral').setOrigin(0).setScale(1);
                this.avionVistaLateral = this.add.image(100,180,'Nieuport_28C1Lateral').setOrigin(0).setScale(.7);
                if (avion_1_Aliados.altitud!='En base'){
                    avion_1_Aliados.cambiarAltitud("Baja");
                    config.Partida.sincronizar({tipoOp:"sincronizarAltitudAvion", idavion:5, altitud:"Baja"});
                }   
                else
                    avion_1_Aliados.setScale(0.05);  
                avion_1_Aliados.altitud_anterior= "Baja"
            }
            if (avion_2_Aliados.focus==true){
                this.vistaLateral = this.add.image(45,47,'nubeslateral').setOrigin(0).setScale(1);
                this.avionVistaLateral = this.add.image(100,180,'Nieuport_28C1Lateral').setOrigin(0).setScale(.7);
                if (avion_2_Aliados.altitud!='En base'){
                    avion_2_Aliados.cambiarAltitud("Baja");
                    config.Partida.sincronizar({tipoOp:"sincronizarAltitudAvion", idavion:6, altitud:"Baja"});
                }
                else
                    avion_2_Aliados.setScale(0.05);  
                avion_2_Aliados.altitud_anterior= "Baja"
            }
            if (avion_3_Aliados.focus==true){
                this.vistaLateral = this.add.image(45,47,'nubeslateral').setOrigin(0).setScale(1);
                this.avionVistaLateral = this.add.image(100,180,'Nieuport_28C1Lateral').setOrigin(0).setScale(.7);
                if (avion_3_Aliados.altitud!='En base'){
                    avion_3_Aliados.cambiarAltitud("Baja");
                    config.Partida.sincronizar({tipoOp:"sincronizarAltitudAvion", idavion:7, altitud:"Baja"});
                }
                else
                    avion_3_Aliados.setScale(0.05);  
                avion_3_Aliados.altitud_anterior= "Baja"
            }
            if (avion_4_Aliados.focus==true){ 
                this.vistaLateral = this.add.image(45,47,'nubeslateral').setOrigin(0).setScale(1);
                this.avionVistaLateral = this.add.image(100,180,'Nieuport_28C1Lateral').setOrigin(0).setScale(.7);
                if (avion_4_Aliados.altitud!='En base'){
                    avion_4_Aliados.cambiarAltitud("Baja");
                    config.Partida.sincronizar({tipoOp:"sincronizarAltitudAvion", idavion:8, altitud:"Baja"});
                }
                else
                    avion_4_Aliados.setScale(0.05);  
                avion_4_Aliados.altitud_anterior= "Baja"
            }   
        });

        //Evento para disparo de bomba disparado por el jugador al apretar espacio
        this.keys.space.on('down',()=>
        {                        
            if (avion_1.focus==true && avion_1.tengobomba){  
                this.circulo_bomba_chico.setPosition(avion_1.x, avion_1.y); 
                this.circulo_bomba_chico.body.setCircle(13);
                this.circulo_bomba_chico.body.setOffset(40,40);

                this.circulo_bomba_grande.setPosition(avion_1.x, avion_1.y); 
                this.circulo_bomba_grande.body.setCircle(26);
                this.circulo_bomba_grande.body.setOffset(25,25);
               // this.cargarBomba1 = this.add.image(65, 545, "botonBomba").setOrigin(0).setScale(.3).setInteractive(); 

               this.vistaLateral = this.add.image(45,47,'vistaLateralBaja').setOrigin(0).setScale(1);
               this.avionVistaLateral = this.add.image(100,180,'Nieuport_28C1Lateral').setOrigin(0).setScale(.7);              
               avion_1.tengobomba=false;
               avion_1.velocidad= avion_1.calcularVelocidad();
               this.sonidoBomba.play();
            } 

            if (avion_2.focus==true && avion_2.tengobomba){ 
                this.circulo_bomba_chico.setPosition(avion_2.x, avion_2.y); 
                this.circulo_bomba_chico.body.setCircle(13);
                this.circulo_bomba_chico.body.setOffset(40,40);

                this.circulo_bomba_grande.setPosition(avion_2.x, avion_2.y); 
                this.circulo_bomba_grande.body.setCircle(26);
                this.circulo_bomba_grande.body.setOffset(25,25);
                this.vistaLateral = this.add.image(45,47,'vistaLateralBaja').setOrigin(0).setScale(1);
                this.avionVistaLateral = this.add.image(100,180,'Nieuport_28C1Lateral').setOrigin(0).setScale(.7);
                avion_2.tengobomba=false;
                avion_2.velocidad= avion_2.calcularVelocidad();
                this.sonidoBomba.play();
            }

            if (avion_3.focus==true && avion_3.tengobomba){
                this.circulo_bomba_chico.setPosition(avion_3.x, avion_3.y); 
                this.circulo_bomba_chico.body.setCircle(13);
                this.circulo_bomba_chico.body.setOffset(40,40);

                this.circulo_bomba_grande.setPosition(avion_3.x, avion_3.y); 
                this.circulo_bomba_grande.body.setCircle(26);
                this.circulo_bomba_grande.body.setOffset(25,25);
                this.vistaLateral = this.add.image(45,47,'vistaLateralBaja').setOrigin(0).setScale(1);
                this.avionVistaLateral = this.add.image(100,180,'Nieuport_28C1Lateral').setOrigin(0).setScale(.7);
                avion_3.tengobomba=false;
                avion_3.velocidad= avion_3.calcularVelocidad();
                this.sonidoBomba.play();
            }
            if (avion_4.focus==true && avion_4.tengobomba){
                this.circulo_bomba_chico.setPosition(avion_4.x, avion_4.y); 
                this.circulo_bomba_chico.body.setCircle(13);
                this.circulo_bomba_chico.body.setOffset(40,40);

                this.circulo_bomba_grande.setPosition(avion_4.x, avion_4.y); 
                this.circulo_bomba_grande.body.setCircle(26);
                this.circulo_bomba_grande.body.setOffset(25,25);
                this.vistaLateral = this.add.image(45,47,'vistaLateralBaja').setOrigin(0).setScale(1);
                this.avionVistaLateral = this.add.image(100,180,'Nieuport_28C1Lateral').setOrigin(0).setScale(.7);
                avion_4.tengobomba=false;
                avion_4.velocidad= avion_4.calcularVelocidad();
                this.sonidoBomba.play();
            } 
            if (avion_1_Aliados.focus==true && avion_1_Aliados.tengobomba){
                this.circulo_bomba_chico.setPosition(avion_1_Aliados.x, avion_1_Aliados.y); 
                this.circulo_bomba_chico.body.setCircle(13);
                this.circulo_bomba_chico.body.setOffset(40,40);

                this.circulo_bomba_grande.setPosition(avion_1_Aliados.x, avion_1_Aliados.y); 
                this.circulo_bomba_grande.body.setCircle(26);
                this.circulo_bomba_grande.body.setOffset(25,25);
                this.vistaLateral = this.add.image(45,47,'vistaLateralBaja').setOrigin(0).setScale(1);
                this.avionVistaLateral = this.add.image(100,180,'Nieuport_28C1Lateral').setOrigin(0).setScale(.7);
                avion_1_Aliados.tengobomba=false;
                avion_1_Aliados.velocidad= avion_1_Aliados.calcularVelocidad();
                this.sonidoBomba.play();
            }
            if (avion_2_Aliados.focus==true && avion_2_Aliados.tengobomba){
                this.circulo_bomba_chico.setPosition(avion_2_Aliados.x, avion_2_Aliados.y); 
                this.circulo_bomba_chico.body.setCircle(13);
                this.circulo_bomba_chico.body.setOffset(40,40);

                this.circulo_bomba_grande.setPosition(avion_2_Aliados.x, avion_2_Aliados.y); 
                this.circulo_bomba_grande.body.setCircle(26);
                this.circulo_bomba_grande.body.setOffset(25,25);
                this.vistaLateral = this.add.image(45,47,'vistaLateralBaja').setOrigin(0).setScale(1);
                this.avionVistaLateral = this.add.image(100,180,'Nieuport_28C1Lateral').setOrigin(0).setScale(.7);
                avion_2_Aliados.tengobomba=false;
                avion_2_Aliados.velocidad= avion_2_Aliados.calcularVelocidad();
                this.sonidoBomba.play();
            }
            if (avion_3_Aliados.focus==true && avion_3_Aliados.tengobomba){
                this.circulo_bomba_chico.setPosition(avion_3_Aliados.x, avion_3_Aliados.y); 
                this.circulo_bomba_chico.body.setCircle(13);
                this.circulo_bomba_chico.body.setOffset(40,40);

                this.circulo_bomba_grande.setPosition(avion_3_Aliados.x, avion_3_Aliados.y); 
                this.circulo_bomba_grande.body.setCircle(26);
                this.circulo_bomba_grande.body.setOffset(25,25);
                this.vistaLateral = this.add.image(45,47,'vistaLateralBaja').setOrigin(0).setScale(1);
                this.avionVistaLateral = this.add.image(100,180,'Nieuport_28C1Lateral').setOrigin(0).setScale(.7);
                avion_3_Aliados.tengobomba=false;
                avion_3_Aliados.velocidad= avion_3_Aliados.calcularVelocidad();
                this.sonidoBomba.play();
            }
            if (avion_4_Aliados.focus==true && avion_4_Aliados.tengobomba){
                this.circulo_bomba_chico.setPosition(avion_4_Aliados.x, avion_4_Aliados.y); 
                this.circulo_bomba_chico.body.setCircle(13);
                this.circulo_bomba_chico.body.setOffset(40,40);

                this.circulo_bomba_grande.setPosition(avion_4_Aliados.x, avion_4_Aliados.y); 
                this.circulo_bomba_grande.body.setCircle(26);
                this.circulo_bomba_grande.body.setOffset(25,25);
                this.vistaLateral = this.add.image(45,47,'vistaLateralBaja').setOrigin(0).setScale(1);
                this.avionVistaLateral = this.add.image(100,180,'Nieuport_28C1Lateral').setOrigin(0).setScale(.7);
                avion_4_Aliados.tengobomba=false;
                avion_4_Aliados.velocidad= avion_4_Aliados.calcularVelocidad();
                this.sonidoBomba.play();
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
                    this.colocarArriba();
                  
                    // Seteo la altitud
                    if (avion_1.altitud == 'Alta')
                    {
                    }
                    else
                    {
                        avion_1.altitud = 'Baja';
                    }
                    // Segun su altitud es la imagen lateral que se muestra
                    if (avion_1.altitud == 'Baja')
                        {
                            this.vistaLateral = this.add.image(45,47,'vistaLateralBaja').setOrigin(0).setScale(1);
                            this.avionVistaLateral = this.add.image(100,180,'Nieuport_28C1Lateral').setOrigin(0).setScale(.7);
                        }
                    else
                    {
                        this.vistaLateral = this.add.image(45,47,'nubeslateral').setOrigin(0).setScale(1);
                        this.avionVistaLateral = this.add.image(100,180,'Nieuport_28C1Lateral').setOrigin(0).setScale(.7);
                    }
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
                    this.colocarArriba();
                
                    // Segun su altitud es la imagen lateral que se muestra
                    if (avion_2.altitud == 'Alta')
                    {
                    }
                    else
                    {
                        avion_2.altitud = 'Baja';
                    }
                    // Segun su altitud es la imagen lateral que se muestra
                    if (avion_2.altitud == 'Baja')
                        {
                            this.vistaLateral = this.add.image(45,47,'vistaLateralBaja').setOrigin(0).setScale(1);
                            this.avionVistaLateral = this.add.image(100,180,'Nieuport_28C1Lateral').setOrigin(0).setScale(.7);
                        }
                    else
                    {
                        this.vistaLateral = this.add.image(45,47,'nubeslateral').setOrigin(0).setScale(1);
                        this.avionVistaLateral = this.add.image(100,180,'Nieuport_28C1Lateral').setOrigin(0).setScale(.7);
                    }
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
                    this.colocarArriba();
                    // Segun su altitud es la imagen lateral que se muestra
                    if (avion_3.altitud == 'Alta')
                    {
                    }
                    else
                    {
                        avion_3.altitud = 'Baja';
                    }
                    // Segun su altitud es la imagen lateral que se muestra
                    if (avion_3.altitud == 'Baja')
                        {
                            this.vistaLateral = this.add.image(45,47,'vistaLateralBaja').setOrigin(0).setScale(1);
                            this.avionVistaLateral = this.add.image(100,180,'Nieuport_28C1Lateral').setOrigin(0).setScale(.7);
                        }
                    else
                    {
                        this.vistaLateral = this.add.image(45,47,'nubeslateral').setOrigin(0).setScale(1);
                        this.avionVistaLateral = this.add.image(100,180,'Nieuport_28C1Lateral').setOrigin(0).setScale(.7);
                    }
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
                    this.colocarArriba();
                    
                     // Segun su altitud es la imagen lateral que se muestra
                     if (avion_4.altitud == 'Alta')
                     {
                     }
                     else
                     {
                         avion_4.altitud = 'Baja';
                     }
                     // Segun su altitud es la imagen lateral que se muestra
                     if (avion_4.altitud == 'Baja')
                         {
                             this.vistaLateral = this.add.image(45,47,'vistaLateralBaja').setOrigin(0).setScale(1);
                             this.avionVistaLateral = this.add.image(100,180,'Nieuport_28C1Lateral').setOrigin(0).setScale(.7);
                         }
                     else
                     {
                         this.vistaLateral = this.add.image(45,47,'nubeslateral').setOrigin(0).setScale(1);
                         this.avionVistaLateral = this.add.image(100,180,'Nieuport_28C1Lateral').setOrigin(0).setScale(.7);
                     }
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
                    this.colocarArriba();
                    
                    // Seteo la altitud
                    if (avion_1_Aliados.altitud == 'Alta')
                    {
                    }
                    else
                    {
                        avion_1_Aliados.altitud = 'Baja';
                    }
                    // Segun su altitud es la imagen lateral que se muestra
                    if (avion_1_Aliados.altitud == 'Baja')
                        {
                            this.vistaLateral = this.add.image(45,47,'vistaLateralBaja').setOrigin(0).setScale(1);
                            this.avionVistaLateral = this.add.image(100,180,'Nieuport_28C1Lateral').setOrigin(0).setScale(.7);
                        }
                    else
                    {
                        this.vistaLateral = this.add.image(45,47,'nubeslateral').setOrigin(0).setScale(1);
                        this.avionVistaLateral = this.add.image(100,180,'Nieuport_28C1Lateral').setOrigin(0).setScale(.7);
                    }
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
                    this.colocarArriba();
                    
                     // Seteo la altitud
                     if (avion_2_Aliados.altitud == 'Alta')
                     {
                     }
                     else
                     {
                         avion_2_Aliados.altitud = 'Baja';
                     }
                     // Segun su altitud es la imagen lateral que se muestra
                     if (avion_2_Aliados.altitud == 'Baja')
                         {
                             this.vistaLateral = this.add.image(45,47,'vistaLateralBaja').setOrigin(0).setScale(1);
                             this.avionVistaLateral = this.add.image(100,180,'Nieuport_28C1Lateral').setOrigin(0).setScale(.7);
                         }
                     else
                     {
                         this.vistaLateral = this.add.image(45,47,'nubeslateral').setOrigin(0).setScale(1);
                         this.avionVistaLateral = this.add.image(100,180,'Nieuport_28C1Lateral').setOrigin(0).setScale(.7);
                     }
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
                    this.colocarArriba();
                    
                    // Seteo la altitud
                    if (avion_3_Aliados.altitud == 'Alta')
                    {
                    }
                    else
                    {
                        avion_3_Aliados.altitud = 'Baja';
                    }
                    // Segun su altitud es la imagen lateral que se muestra
                    if (avion_3_Aliados.altitud == 'Baja')
                        {
                            this.vistaLateral = this.add.image(45,47,'vistaLateralBaja').setOrigin(0).setScale(1);
                            this.avionVistaLateral = this.add.image(100,180,'Nieuport_28C1Lateral').setOrigin(0).setScale(.7);
                        }
                    else
                    {
                        this.vistaLateral = this.add.image(45,47,'nubeslateral').setOrigin(0).setScale(1);
                        this.avionVistaLateral = this.add.image(100,180,'Nieuport_28C1Lateral').setOrigin(0).setScale(.7);
                    }
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
                    this.colocarArriba();
                    
                    // Seteo la altitud
                    if (avion_4_Aliados.altitud == 'Alta')
                    {
                    }
                    else
                    {
                        avion_4_Aliados.altitud = 'Baja';
                    }
                    // Segun su altitud es la imagen lateral que se muestra
                    if (avion_4_Aliados.altitud == 'Baja')
                        {
                            this.vistaLateral = this.add.image(45,47,'vistaLateralBaja').setOrigin(0).setScale(1);
                            this.avionVistaLateral = this.add.image(100,180,'Nieuport_28C1Lateral').setOrigin(0).setScale(.7);
                        }
                    else
                    {
                        this.vistaLateral = this.add.image(45,47,'nubeslateral').setOrigin(0).setScale(1);
                        this.avionVistaLateral = this.add.image(100,180,'Nieuport_28C1Lateral').setOrigin(0).setScale(.7);
                    }
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
            this.torreAliados.setVisible(false);  
            this.contenedorAliados.setVisible(false); 
            this.depositoAliados.setVisible(false); 
            this.circulo_5.setVisible(false);   
            this.circulo_6.setVisible(false);  
            this.circulo_7.setVisible(false);  
            this.circulo_8.setVisible(false);   
            for(var i = 0; i<config.Partida.configuraciones.artilleriaCantidad; i++){
                artilleriasAliados.getChildren()[i].setVisible(false);
            }   
            this.campoAliados.setVisible(false);  
            this.pisoBaseAliados.setVisible(false);       
        }
        else
        {
            for(var i = 0; i<config.Partida.configuraciones.artilleriaCantidad; i++){
                artilleriasPotencias.getChildren()[i].setVisible(false);
            }
            avion_1.setVisible(false);
            avion_2.setVisible(false);
            avion_3.setVisible(false);
            avion_4.setVisible(false); 
            this.torrePotencias.setVisible(false);  
            this.contenedorPotencias.setVisible(false); 
            this.depositoPotencias.setVisible(false); 
            this.circulo_1.setVisible(false);   
            this.circulo_2.setVisible(false);  
            this.circulo_3.setVisible(false);  
            this.circulo_4.setVisible(false); 
            this.imgCampoPotencias.setVisible(false);  
            this.pisoBasePotencias.setVisible(false);         
        }
           
    }

    // Funcion que recibe por parametro el Sprite usado para la máscara, que va a seguir al avion
    // dependiendo de si se está moviendo y ademas está enfocado.
    lightAvionSinBomba()
    {
        if (config.Partida.Bando=='Potencias')
        {
            if (this.EstaMoviendose(avion_1) && !avion_1.tengobomba)
            {
                light1Bomba.setIntensity(0);
                light1.setIntensity(10);
                light1Bomba.x = avion_1.x;
                light1Bomba.y = avion_1.y;
                light1.x = avion_1.x;
                light1.y = avion_1.y;
            } 
            if (this.EstaMoviendose(avion_2))
            {
                light2Bomba.setIntensity(0);
                light2.setIntensity(10);
                light2Bomba.x = avion_2.x;
                light2Bomba.y = avion_2.y;
                light2.x = avion_2.x;
                light2.y = avion_2.y;
            }  
            if (this.EstaMoviendose(avion_3))
            {
                light3Bomba.setIntensity(0);
                light3.setIntensity(10);
                light3Bomba.x = avion_3.x;
                light3Bomba.y = avion_3.y;
                light3.x = avion_3.x;
                light3.y = avion_3.y;
            } 
            if (this.EstaMoviendose(avion_4))
            {
                light4Bomba.setIntensity(0);
                light4.setIntensity(10);
                light4Bomba.x = avion_4.x;
                light4Bomba.y = avion_4.y;
                light4.x = avion_4.x;
                light4.y = avion_4.y;
            }            
        }
        else
        {
            if (this.EstaMoviendose(avion_1_Aliados))
            {
                light1Bomba.setIntensity(0);
                light1.setIntensity(10);
                light1Bomba.x = avion_1_Aliados.x;
                light1Bomba.y = avion_1_Aliados.y;
                light1.x = avion_1_Aliados.x;
                light1.y = avion_1_Aliados.y;
            } 
            if (this.EstaMoviendose(avion_2_Aliados))
            {
                light2Bomba.setIntensity(0);
                light2.setIntensity(10);
                light2Bomba.x = avion_2_Aliados.x;
                light2Bomba.y = avion_2_Aliados.y;
                light2.x = avion_2_Aliados.x;
                light2.y = avion_2_Aliados.y;
            } 
            if (this.EstaMoviendose(avion_3_Aliados))
            {
                light3Bomba.setIntensity(0);
                light3.setIntensity(10);
                light3Bomba.x = avion_3_Aliados.x;
                light3Bomba.y = avion_3_Aliados.y;
                light3.x = avion_3_Aliados.x;
                light3.y = avion_3_Aliados.y;
            }
            if (this.EstaMoviendose(avion_4_Aliados))
            {
                light4Bomba.setIntensity(0);
                light4.setIntensity(10);
                light4Bomba.x = avion_4_Aliados.x;
                light4Bomba.y = avion_4_Aliados.y;
                light4.x = avion_4_Aliados.x;
                light4.y = avion_4_Aliados.y;
            }  
        }
    }
    lightAvionConBomba()  
    {  
        if (config.Partida.Bando == 'Potencias')  
        {  
            if (avion_1.tengobomba)  
            {  
                light1Bomba.setIntensity(12);  
                light1.setIntensity(5);  
                light1Bomba.x = avion_1.x;  
                light1Bomba.y = avion_1.y;  
                light1.x = avion_1.x;  
                light1.y = avion_1.y;  
            }  
            if (avion_2.tengobomba)  
            {  
                light2Bomba.setIntensity(12);  
                light2.setIntensity(5);  
                light2Bomba.x = avion_2.x;
                light2Bomba.y = avion_2.y;
                light2.x = avion_2.x;
                light2.y = avion_2.y;  
            }
            if (avion_3.tengobomba)
            {
                light3Bomba.setIntensity(12);
                light3.setIntensity(5);
                light3Bomba.x = avion_3.x;
                light3Bomba.y = avion_3.y;
                light3.x = avion_3.x;
                light3.y = avion_3.y;  
            }
            if (avion_4.tengobomba)
            {
                light4Bomba.setIntensity(12);
                light4.setIntensity(5);
                light4Bomba.x = avion_4.x;
                light4Bomba.y = avion_4.y;
                light4.x = avion_4.x;
                light4.y = avion_4.y;  
            }
        }
        else
        {
            if (avion_1_Aliados.tengobomba)
            {
                light1Bomba.setIntensity(12);
                light1.setIntensity(5);
                light1Bomba.x = avion_1_Aliados.x;
                light1Bomba.y = avion_1_Aliados.y;
                light1.x = avion_1_Aliados.x;
                light1.y = avion_1_Aliados.y;
            }
            if (avion_2_Aliados.tengobomba)
            {
                light2Bomba.setIntensity(12);
                light2.setIntensity(5);
                light2Bomba.x = avion_2_Aliados.x;
                light2Bomba.y = avion_2_Aliados.y;
                light2.x = avion_2_Aliados.x;
                light2.y = avion_2_Aliados.y;
            }
            if (avion_3_Aliados.tengobomba)
            {
                light3Bomba.setIntensity(12);
                light3.setIntensity(5);
                light3Bomba.x = avion_3_Aliados.x;
                light3Bomba.y = avion_3_Aliados.y;
                light3.x = avion_3_Aliados.x;
                light3.y = avion_3_Aliados.y;
            }
            if (avion_4_Aliados.tengobomba)
            {
                light4Bomba.setIntensity(12);
                light4.setIntensity(5);
                light4Bomba.x = avion_4_Aliados.x;
                light4Bomba.y = avion_4_Aliados.y;
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

        if (difX < 2 && difY < 2)
        {   
            avion.combustible = 2000;             
            if (avion.cargarbomba==true)
            {            
                avion.body.setVelocityY(0);
                avion.body.setVelocityX(0);                            
                avion.cambiarAltitud('En base');                              
                this.cargarBomba1 = this.add.image(65, 545, "botonBomba").setOrigin(0).setScale(.3).setInteractive(); 
                avion.cargarbomba=false;
                avion.tengobomba=true; 
            }
            if (avion.cargarCombustible==true)
            {
                avion.body.setVelocityY(0);
                avion.body.setVelocityX(0);                            
                avion.cambiarAltitud('En base');                
                avion.cargarCombustible=false; 
                this.volverBase = this.add.image(220, 545, "botonCombustible").setOrigin(0).setScale(.3).setInteractive();
            }            
            return false;
        }
        else
        {
            return true;
        }
                       
    }

    //Funcion para controlar la visibilidad de los aviones cuando entran en el rango visible de otro avion
    MostrarOcultar(avion)
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

   mensajeAviso(String)
    {
        this.mensaje = this.add.text(800,0, String).setScale(1.9);
    }

    onEvent()
    {
        this.mensaje.destroy();
    }


    update(time,delta)
    {    
        //llama a funcion que actualiza el efecto visual de luces en los aviones y la base
        this.lightAvionSinBomba(); // Cambio de color al avion sin bomba
        this.lightAvionConBomba(); // cambio de color al avion con bomba
        //Tiempo que se usa para las balas     
        this.time = time;
        if (this.EstaMoviendose(avion_1) && time>timeNafta)
        {                
            if(avion_1.combustible!=0)
            {   
                timeNafta =timeNafta+100;            
                avion_1.combustible--;
                //console.log(avion_1.cargarCombustible);              
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
            if (!this.MostrarOcultar(avion_1)) 
                avion_1.setVisible(false);  

            if (!this.MostrarOcultar(avion_2)) 
                avion_2.setVisible(false); 

            if (!this.MostrarOcultar(avion_3)) 
                avion_3.setVisible(false);  

            if (!this.MostrarOcultar(avion_4)) 
                avion_4.setVisible(false);

            if (!this.MostrarOcultar(this.torrePotencias)) 
                this.torrePotencias.setVisible(false);

            if (!this.MostrarOcultar(this.contenedorPotencias)) 
                this.contenedorPotencias.setVisible(false);

            if (!this.MostrarOcultar(this.depositoPotencias)) 
                this.depositoPotencias.setVisible(false);

            for(var i = 0; i<config.Partida.configuraciones.artilleriaCantidad; i++){
                if (!this.MostrarOcultar(artilleriasPotencias.getChildren()[i])) 
                    artilleriasPotencias.getChildren()[i].setVisible(false);  
            }
        }
        else
        {            
            if (!this.MostrarOcultar(avion_1_Aliados)) 
                avion_1_Aliados.setVisible(false);  

            if (!this.MostrarOcultar(avion_2_Aliados)) 
                avion_2_Aliados.setVisible(false); 

            if (!this.MostrarOcultar(avion_3_Aliados)) 
                avion_3_Aliados.setVisible(false);  

            if (!this.MostrarOcultar(avion_4_Aliados)) 
                avion_4_Aliados.setVisible(false);

            if (!this.MostrarOcultar(this.torreAliados)) 
                this.torreAliados.setVisible(false);

            if (!this.MostrarOcultar(this.contenedorAliados)) 
                this.contenedorAliados.setVisible(false);

            if (!this.MostrarOcultar(this.depositoAliados)) 
                this.depositoAliados.setVisible(false);

            for(var i = 0; i<config.Partida.configuraciones.artilleriaCantidad; i++){
                if (!this.MostrarOcultar(artilleriasAliados.getChildren()[i])) 
                    artilleriasAliados.getChildren()[i].setVisible(false);  
            }
        }

        //Se prueba evento de destruccion de avion al llegar la vida a 0
        
        if(avion_1.vidaAvion <= 0) 
            {
                if (mensajeAvionDestruido1 == false && config.Partida.Bando == 'Aliados')
                {
                    this.mensajeAviso('El avion 1 del enemigo fue destruido');
                    mensajeAvionDestruido1 = true;
                }
                avion_1.destroy();
            }
        if(avion_2.vidaAvion <= 0) 
        {
            if (mensajeAvionDestruido2 == false && config.Partida.Bando == 'Aliados')
                {
                    this.mensajeAviso('El avion 2 del enemigo fue destruido');
                    mensajeAvionDestruido2 = true;
                }
            avion_2.destroy();
        }
            
        if(avion_3.vidaAvion <= 0) 
            {
                if (mensajeAvionDestruido3 == false && config.Partida.Bando == 'Aliados')
                {
                    this.mensajeAviso('El avion 3 del enemigo fue destruido');
                    mensajeAvionDestruido3 = true;
                }
                avion_3.destroy();
            }
        if(avion_4.vidaAvion <= 0) 
            {
                if (mensajeAvionDestruido4 == false&& config.Partida.Bando == 'Aliados')
                {
                    this.mensajeAviso('El avion 4 del enemigo fue destruido');
                    mensajeAvionDestruido4 = true;
                }
                avion_4.destroy();
            }   
        if(avion_1_Aliados.vidaAvion <= 0) 
            {
                if (mensajeAvionDestruido5 == false && config.Partida.Bando == 'Potencias')
                {
                    this.mensajeAviso('El avion 1 del enemigo fue destruido');
                    mensajeAvionDestruido5 = true;
                }
                avion_1_Aliados.destroy(); 
            }
        if(avion_2_Aliados.vidaAvion <= 0) 
            {
                if (mensajeAvionDestruido6 == false && config.Partida.Bando == 'Potencias')
                {
                    this.mensajeAviso('El avion 2 del enemigo fue destruido');
                    mensajeAvionDestruido6 = true;
                }
                avion_2_Aliados.destroy();
            }
        if(avion_3_Aliados.vidaAvion <= 0) 
            {
                if (mensajeAvionDestruido7 == false && config.Partida.Bando == 'Potencias')
                {
                    this.mensajeAviso('El avion 3 del enemigo fue destruido');
                    mensajeAvionDestruido7 = true;
                }
                avion_3_Aliados.destroy();
            }
        if(avion_4_Aliados.vidaAvion <= 0) 
            {
                if (mensajeAvionDestruido8 == false && config.Partida.Bando == 'Potencias')
                {
                    this.mensajeAviso('El avion 4 del enemigo fue destruido');
                    mensajeAvionDestruido8 = true;
                }
                avion_4_Aliados.destroy();
            }

        if (config.Partida.Bando == 'Potencias')
        {
            if(avion_1.vidaAvion == 0)
            {
                light1.setIntensity(0);
                light1Bomba.setIntensity(0);
            }
            if(avion_2.vidaAvion == 0)
            {
                light2.setIntensity(0);
                light2Bomba.setIntensity(0);
            }
            if(avion_3.vidaAvion == 0)
            {
                light3.setIntensity(0);
                light3Bomba.setIntensity(0);
            }
            if(avion_4.vidaAvion == 0)
            {
                light4.setIntensity(0);
                light4Bomba.setIntensity(0);
            }
        }
        else
        {
            if(avion_1_Aliados.vidaAvion == 0)
            {
                light1.setIntensity(0);
                light1Bomba.setIntensity(0);
            }
            if(avion_2_Aliados.vidaAvion == 0)
            {
                light2.setIntensity(0);
                light2Bomba.setIntensity(0);
            }
            if(avion_3_Aliados.vidaAvion == 0)
            {
                light3.setIntensity(0);
                light3Bomba.setIntensity(0);
            }
            if(avion_4_Aliados.vidaAvion == 0)
            {
                light4.setIntensity(0);
                light4Bomba.setIntensity(0);
            }
        }
        
        
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
            if(!config.Partida.duenio)
                this.scene.launch('Pausado');
            this.scene.pause();
        }else if(config.Partida.estado=='Jugando'){
            this.scene.resume();
        }

    }



}


export default Play;
