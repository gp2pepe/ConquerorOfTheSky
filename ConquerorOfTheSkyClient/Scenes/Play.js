import Avion from '../Objects/Avion.js';
import Bullet from '../Objects/Bullet.js';
import { config,game } from '../lib/main.js';

//using System.Threading;

//Variables Globales
var dx;
var dy; 
var avion_1;
var avion_2;
var avion_3;
var avion_4;
var avion_1_Aliados;
var avion_2_Aliados;
var avion_3_Aliados;
var avion_4_Aliados;
var bullets;
var bulletsArtilleria;
var distance
var bullet;
var difX; 
var difY;
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
var torreContainer;
var depositoCombustibleContainer;
var depositoExplosivosContainer;
var torreBar;
var depositoCombustibleBar;
var depositoExplosivosBar;
var mensajeAvionDestruido1 = false;
var mensajeAvionDestruido2 = false;
var mensajeAvionDestruido3 = false;
var mensajeAvionDestruido4 = false;
var mensajeAvionDestruido5 = false;
var mensajeAvionDestruido6 = false;
var mensajeAvionDestruido7 = false;
var mensajeAvionDestruido8 = false;
var moverX;
var sleep;
var Espera;
var prendido = false;
var inicioMapaX;
var inicioMapaY;
var timer1 = 100;
var timer2 = 100;
var timer3 = 100;
var timer4 = 100;
var boom;

const arregloVida = new Array();

//Inicializo la clase/escena
class Play extends Phaser.Scene {

    constructor(){
        //le asigno una clave a la escena Play
        super({key: 'Play'});
        this.bullets;
    }
    create(){       
       // boom = this.add.sprite(0, 0, "Nieuport_28C1");
        //boom.setVisible(false);  
        console.log(config.Partida);
        //Se agrega imagenes a utilizar y dibujar en pantalla primero (fondo, muros, vista lateral)
        this.add.image(0, 0, "fondoMapa").setOrigin(0);45
        this.vistaLateral = this.add.image(45,113,'vistaLateralEnBase').setOrigin(0).setScale(1);
        //this.avionVistaLateral = this.add.image(100,240,'Nieuport_28C1Lateral').setOrigin(0).setScale(.7);
        this.mapaMask = this.add.image(433, 46, "mapa_6").setOrigin(0).setScale(1);

        this.panelAvion1 = this.add.image(45, 500, "panelAvion1").setOrigin(0).setScale(.3).setInteractive();
        this.panelAvion2 = this.add.image(45, 595, "panelAvion2").setOrigin(0).setScale(.3).setInteractive();
        this.panelAvion3 = this.add.image(45, 690, "panelAvion3").setOrigin(0).setScale(.3).setInteractive();
        this.panelAvion4 = this.add.image(45, 785, "panelAvion4").setOrigin(0).setScale(.3).setInteractive();
        this.panelBase = this.add.image(28, 890, "panelBase").setOrigin(0).setScale(.3).setInteractive();
        this.mostrarRango = this.add.image(112, 938, "mostrarRango").setOrigin(0).setScale(.22).setInteractive();
        this.nick = this.add.image(70, 985, "nick").setOrigin(0).setScale(.7).setInteractive();
        this.textNick = this.add.text(180, 1008, config.Partida.nick,{fontSize: 14,color: '#000000'}).setOrigin(0).setScale(2);

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
        inicioMapaX=433;
        inicioMapaY=40;

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
        this.contenedorExplosivosPotencias = this.add.image(campoPotencias.base.posicionX+10, campoPotencias.base.posicionY + 10, 'contenedor_2').setScale(.15);
        this.depositoCombustiblePotencias = this.add.image(campoPotencias.base.posicionX + 70, campoPotencias.base.posicionY + 10, 'depositoCombustible').setScale(.10);
        this.torrePotencias = this.add.image(campoPotencias.base.posicionX +40, campoPotencias.base.posicionY + 70, 'torre').setScale(.07);
        avionXInicial = campoPotencias.base.posicionX ; 

        this.torrePotencias.vida= campoPotencias.base.torreControl.salud;
        this.physics.world.enable(this.torrePotencias);        
		this.torrePotencias.body.setCollideWorldBounds(true);
        this.torrePotencias.body.setSize(300,900);
        this.torrePotencias.lastFired=0;

        this.circulo_torrePotencias = this.add.image(this.torrePotencias.x,this.torrePotencias.y,'circuloAvion').setScale(1.5);
        this.circulo_torrePotencias.setVisible(false);
        this.physics.world.enable(this.circulo_torrePotencias);
        this.circulo_torrePotencias.body.setCircle(campoPotencias.base.torreControl.radioDisparo+32); 
        this.circulo_torrePotencias.body.setOffset(-35,-47); 
               
        //deposito de combustible
        this.depositoCombustiblePotencias.vida= campoPotencias.base.tanqueCombustible.salud;
        this.physics.world.enable(this.depositoCombustiblePotencias);        
		this.depositoCombustiblePotencias.body.setCollideWorldBounds(true);
        //deposito de explosivos       
        this.contenedorExplosivosPotencias.vida= campoPotencias.base.depositoExplosivos.salud;
        this.physics.world.enable(this.contenedorExplosivosPotencias);        
		this.contenedorExplosivosPotencias.body.setCollideWorldBounds(true);

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
            artilleriasPotencias.getChildren()[i].setCircle(campoPotencias.artillerias[i].radioDisparo);
            artilleriasPotencias.getChildren()[i].setOffset(-250,-250);  
            artilleriasPotencias.getChildren()[i].lastFired = 0; 
            artilleriasPotencias.getChildren()[i].vida = campoPotencias.artillerias[i].salud;
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
        this.contenedorExplosivosAliados = this.add.image(campoAliados.base.posicionX+10, campoAliados.base.posicionY + 10, 'contenedor_2').setScale(.15);
        this.depositoCombustibleAliados = this.add.image(campoAliados.base.posicionX + 70, campoAliados.base.posicionY + 10, 'depositoCombustible').setScale(.10);
        this.torreAliados = this.add.image(campoAliados.base.posicionX +40, campoAliados.base.posicionY + 70, 'torre').setScale(.07);
       
        this.torreAliados.vida= campoAliados.base.torreControl.salud;
        this.physics.world.enable(this.torreAliados);        
		this.torreAliados.body.setCollideWorldBounds(true);
        this.torreAliados.body.setSize(300,900);
        this.torreAliados.lastFired=0;
        
        this.circulo_torreAliados = this.add.image(this.torreAliados.x,this.torreAliados.y,'circuloAvion').setScale(1.5);
        this.circulo_torreAliados.setVisible(false);
        this.physics.world.enable(this.circulo_torreAliados);
        this.circulo_torreAliados.body.setCircle(campoAliados.base.torreControl.radioDisparo+32);
        this.circulo_torreAliados.body.setOffset(-35,-47); 

        this.depositoCombustibleAliados.vida= campoAliados.base.tanqueCombustible.salud;
        this.physics.world.enable(this.depositoCombustibleAliados);        
		this.depositoCombustibleAliados.body.setCollideWorldBounds(true);

        this.contenedorExplosivosAliados.vida= campoAliados.base.depositoExplosivos.salud;
        this.physics.world.enable(this.contenedorExplosivosAliados);        
		this.contenedorExplosivosAliados.body.setCollideWorldBounds(true);

        //Defino las artillerias de los Aliados
        artilleriasAliados = this.physics.add.group({
            key: 'artilleria',
            repeat: config.Partida.configuraciones.artilleriaCantidad-1
        });

        for(var i = 0; i<config.Partida.configuraciones.artilleriaCantidad; i++){
            artilleriasAliados.getChildren()[i].setX(campoAliados.artillerias[i].posicionX + inicioMapaX);
            artilleriasAliados.getChildren()[i].setY(campoAliados.artillerias[i].posicionY + inicioMapaY);
            artilleriasAliados.getChildren()[i].setScale(0.1);
            artilleriasAliados.getChildren()[i].setCircle(campoAliados.artillerias[i].radioDisparo);
            artilleriasAliados.getChildren()[i].setOffset(-250,-250);    
            artilleriasAliados.getChildren()[i].lastFired = 0; 
            artilleriasAliados.getChildren()[i].vida = campoAliados.artillerias[i].salud; 
       }

        this.definicionAviones();   

        this.mensaje = this.add.text(800, 0, ' ');
        this.mensaje2 = this.add.text(800, 0, ' ');
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
            //lightBasePotencia = this.lights.addLight(campoPotencias.base.posicionX +40, campoPotencias.base.posicionY + 70, 200).setIntensity(12);
            this.lightCampoPotencia = this.lights.addLight(campoPotencias.posicionX +150, campoPotencias.posicionY + 200, 300).setIntensity(8);
            this.lightTorre = this.lights.addLight(this.torrePotencias.x + 12 , this.torrePotencias.y - 12, 150).setColor(0xFF9900).setIntensity(0);
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
            //lightBaseAliados = this.lights.addLight(campoAliados.base.posicionX +40, campoAliados.base.posicionY + 70, 200).setIntensity(12);
            this.lightCampoAliados = this.lights.addLight(campoAliados.posicionX +150, campoAliados.posicionY + 200, 300).setIntensity(8);
            this.lightTorre = this.lights.addLight(this.torreAliados.x + 12 , this.torreAliados.y - 22, 150).setColor(0xFF9900).setIntensity(0);
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
        config.Partida.basePotencias[1] = this.depositoCombustiblePotencias;
        config.Partida.basePotencias[2] = this.contenedorExplosivosPotencias;

        config.Partida.baseAliados = new Array();
        config.Partida.baseAliados[0] = this.torreAliados;
        config.Partida.baseAliados[1] = this.depositoCombustibleAliados;
        config.Partida.baseAliados[2] = this.contenedorExplosivosAliados;

        config.Partida.artilleriasPotencias = new Array();
        for(var i = 0; i<config.Partida.configuraciones.artilleriaCantidad; i++){
            config.Partida.artilleriasPotencias[i] = artilleriasPotencias.getChildren()[i];
        }

        config.Partida.artilleriasAliados = new Array();
        for(var i = 0; i<config.Partida.configuraciones.artilleriaCantidad; i++){
            config.Partida.artilleriasAliados[i] = artilleriasAliados.getChildren()[i];
        }

        arregloVida[0] = config.Partida.configuraciones.avionSalud;
        arregloVida[1] = config.Partida.configuraciones.avionSalud;
        arregloVida[2] = config.Partida.configuraciones.avionSalud;
        arregloVida[3] = config.Partida.configuraciones.avionSalud;
        arregloVida[4] = config.Partida.configuraciones.avionSalud;
        arregloVida[5] = config.Partida.configuraciones.avionSalud;
        arregloVida[6] = config.Partida.configuraciones.avionSalud;
        arregloVida[7] = config.Partida.configuraciones.avionSalud;

        //Evento que escucha cuando se clickea con el mouse y llama al onObjectClicked
        this.input.on('pointerdown',pointer => this.onObjectClicked(pointer));   
        
        //Bullets, se define el grupo de balas que utilizaran los aviones
        bullets = this.add.group({
            classType: Bullet,
            maxSize: -1,
            runChildUpdate: true
        });

         //bulletsArtilleria, se define el grupo de balas que utilizaran las artillerias Aliados
         bulletsArtilleria = this.add.group({
            classType: Bullet,
            maxSize: -1,
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

        //Se definen las barra de vida  de la torre 
        torreContainer = this.add.sprite(170, 915 , "baseContainer").setScale(0.25);
         //Sprite con la barra de vida a moverse
        torreBar = this.add.sprite(torreContainer.x-10 , torreContainer.y, "vidaBar").setScale(0.25);
         //Mascara para ocultar la barra de vida
        this.torreMask = this.add.sprite(torreBar.x, torreBar.y, "vidaBar").setScale(0.25);
         // dejo la mascara no visible para que luego aparezca al mover el torreBar
        this.torreMask.visible = false;
        // Asigno la mascara la barra de vida
        torreBar.mask = new Phaser.Display.Masks.BitmapMask(this, this.torreMask);
        
        //Se definen las barra de vida del deposito de combustible
        depositoCombustibleContainer = this.add.sprite(347, 955 , "baseContainer").setScale(0.22);
        //Sprite con la barra de vida a moverse
        depositoCombustibleBar = this.add.sprite(depositoCombustibleContainer.x-10 , depositoCombustibleContainer.y, "vidaBar").setScale(0.22);
        //Mascara para ocultar la barra de vida
        this.depositoCombustibleMask = this.add.sprite(depositoCombustibleBar.x, depositoCombustibleBar.y, "vidaBar").setScale(0.22);
        // dejo la mascara no visible para que luego aparezca al mover el depositoCombutibleBar
        this.depositoCombustibleMask.visible = false;
        // Asigno la mascara la barra de vida
        depositoCombustibleBar.mask = new Phaser.Display.Masks.BitmapMask(this, this.depositoCombustibleMask);

        //Se definen las barras de vida  de cada avion
        depositoExplosivosContainer = this.add.sprite(347, 915 , "baseContainer").setScale(0.22);
        //Sprite con la barra de vida a moverse
        depositoExplosivosBar = this.add.sprite(depositoExplosivosContainer.x-10 , depositoExplosivosContainer.y, "vidaBar").setScale(0.22);
        //Mascara para ocultar la barra de vida
        this.depositoExplosivosMask = this.add.sprite(depositoExplosivosBar.x, depositoExplosivosBar.y, "vidaBar").setScale(0.22);
        // dejo la mascara no visible para que luego aparezca al mover el vidaBar
        this.depositoExplosivosMask.visible = false;
        // Asigno la mascara la barra de vida
        depositoExplosivosBar.mask = new Phaser.Display.Masks.BitmapMask(this, this.depositoExplosivosMask);
        
        this.BotonesLaterales();
        /*this.anims.create({
            key: 'explosion',
            frames: '2a9n_0"',
            frameRate: 12,
            repeat: -1,
            duration: 5000
        });
*/

        this.anims.create({
            key: 'explosion',
            frames: this.anims.generateFrameNames('test',{
                prefix: '2a9n_',
                start: 0,
                end: 16,
            }),
            repeat: 3,
            frameRate: 12

        })
    }



    //funcion que carga las funcionalidades del tablero
    BotonesLaterales()
    {
        //Se definen los eventos de los botones del tablero/panel

        this.mostrarRango.on(Phaser.Input.Events.POINTER_DOWN, () => {
            this.add.tween({
                targets: this.mostrarRango,
                ease: 'Bounce.easeIn',
                onComplete:() => {
                    if (config.Partida.Bando == 'Potencias')
                    {    if (prendido == true)
                        {
                            this.lightTorre.setIntensity(0);
                            prendido = false;
                        }
                        else
                        {
                            this.lightTorre.setIntensity(1000);
                            prendido = true;
                        }
                    }
                    else
                    {
                        if (prendido == true)
                        {
                            this.lightTorre.setIntensity(0);
                            prendido = false;
                        }
                        else
                        {
                            this.lightTorre.setIntensity(1000);
                            prendido = true;
                        }
                    }
                }
            })
        })

        this.cargarBomba1.on(Phaser.Input.Events.POINTER_DOWN, () => {
            this.add.tween({
                targets: this.cargarBomba1,
                ease: 'Bounce.easeIn',                
                onComplete: () => {
                    
                    if (avion_1.focus==true && avion_1.altitud!='Inicial')
                    {    
                        avion_1.altitud_anterior=avion_1.altitud;
                        
                        avion_1.cargarbomba=true;      
                        this.cargarBomba1.setTint(0xff5b5b); 
                        config.Partida.idavion=1;
                        avion_1.moverAvion({x: avion_1.xInicial, y: avion_1.yInicial});                        
                        config.Partida.sincronizar({tipoOp:"sincronizarAvion", idavion:1, x: avion_1.xInicial, y: avion_1.yInicial});
                        config.Partida.sincronizar({tipoOp:"sincronizarBombaAvion", idavion:1, bomba: true});
                    }            

                    if (avion_1_Aliados.focus==true && avion_1_Aliados.altitud!='Inicial')
                    {    
                        avion_1_Aliados.altitud_anterior=avion_1_Aliados.altitud;

                        avion_1_Aliados.cargarbomba=true;  
                        this.cargarBomba1.setTint(0xff5b5b);         
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
                                        
                    if (avion_1.focus==true && avion_1.altitud!='Inicial')
                    {            
                        avion_1.altitud_anterior=avion_1.altitud;

                        avion_1.cargarCombustible=true;
                        config.Partida.idavion=1;
                        this.volverBase1.setTint(0xff5b5b); 
                        avion_1.moverAvion({x: avion_1.xInicial, y: avion_1.yInicial});
                        config.Partida.sincronizar({tipoOp:"sincronizarAvion", idavion:1, x: avion_1.xInicial, y: avion_1.yInicial});
                        config.Partida.sincronizar({tipoOp:"sincronizarCombustibleAvion", idavion:1, combustible: true});

                    }                

                    if (avion_1_Aliados.focus==true && avion_1_Aliados.altitud!='Inicial')
                    {        
                        avion_1_Aliados.altitud_anterior=avion_1_Aliados.altitud;

                        avion_1_Aliados.cargarCombustible=true;     
                        config.Partida.idavion=5;
                        this.volverBase1.setTint(0xff5b5b); 
                        avion_1_Aliados.moverAvion({x: avion_1_Aliados.xInicial, y: avion_1_Aliados.yInicial});
                        config.Partida.sincronizar({tipoOp:"sincronizarAvion", idavion:5, x: avion_1_Aliados.xInicial, y: avion_1_Aliados.yInicial});
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
                     
                    if (avion_2.focus==true && avion_2.altitud!='Inicial')
                    {    
                        avion_2.altitud_anterior=avion_2.altitud;

                        avion_2.cargarbomba=true;      
                        this.cargarBomba2.setTint(0xff5b5b);        
                        config.Partida.idavion=2;
                        avion_2.moverAvion({x: avion_2.xInicial, y: avion_2.yInicial});
                        config.Partida.sincronizar({tipoOp:"sincronizarAvion", idavion:2, x: avion_2.xInicial, y: avion_2.yInicial});
                        config.Partida.sincronizar({tipoOp:"sincronizarBombaAvion", idavion:2, bomba: true});

                    }            

                    if (avion_2_Aliados.focus==true && avion_2_Aliados.altitud!='Inicial')
                    {    
                        avion_2_Aliados.altitud_anterior=avion_2_Aliados.altitud;

                        avion_2_Aliados.cargarbomba=true;  
                        this.cargarBomba2.setTint(0xff5b5b);        
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
                                        
                    if (avion_2.focus==true && avion_2.altitud!='Inicial')
                    {            
                        avion_2.altitud_anterior=avion_2.altitud;

                        avion_2.cargarCombustible=true;
                        config.Partida.idavion=2;
                        this.volverBase2.setTint(0xff5b5b); 
                        avion_2.moverAvion({x: avion_2.xInicial, y: avion_2.yInicial});
                        config.Partida.sincronizar({tipoOp:"sincronizarAvion", idavion:2, x: avion_2.xInicial, y: avion_2.yInicial});
                        config.Partida.sincronizar({tipoOp:"sincronizarCombustibleAvion", idavion:2, combustible: true});

                    }                

                    if (avion_2_Aliados.focus==true && avion_2_Aliados.altitud!='Inicial')
                    {        
                        avion_2_Aliados.altitud_anterior=avion_2_Aliados.altitud;

                        avion_2_Aliados.cargarCombustible=true;     
                        config.Partida.idavion=6;
                        this.volverBase2.setTint(0xff5b5b); 
                        avion_2_Aliados.moverAvion({x: avion_2_Aliados.xInicial, y: avion_2_Aliados.yInicial});
                        config.Partida.sincronizar({tipoOp:"sincronizarAvion", idavion:6, x: avion_2_Aliados.xInicial, y: avion_2_Aliados.yInicial});
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
                     
                    if (avion_3.focus==true && avion_3.altitud!='Inicial')
                    {    
                        avion_3.altitud_anterior=avion_3.altitud;

                        avion_3.cargarbomba=true;      
                        this.cargarBomba3.setTint(0xff5b5b);       
                        config.Partida.idavion=3;
                        avion_3.moverAvion({x: avion_3.xInicial, y: avion_3.yInicial});
                        config.Partida.sincronizar({tipoOp:"sincronizarAvion", idavion:3, x: avion_3.xInicial, y: avion_3.yInicial});
                        config.Partida.sincronizar({tipoOp:"sincronizarBombaAvion", idavion:3, bomba: true});

                    }            

                    if (avion_3_Aliados.focus==true && avion_3_Aliados.altitud!='Inicial')
                    {    
                        avion_3_Aliados.altitud_anterior=avion_3_Aliados.altitud;
                        
                        avion_3_Aliados.cargarbomba=true;  
                        this.cargarBomba3.setTint(0xff5b5b);         
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
                                        
                    if (avion_3.focus==true && avion_3.altitud!='Inicial')
                    {            
                        avion_3.altitud_anterior=avion_3.altitud;
                        avion_3.cargarCombustible=true;
                        config.Partida.idavion=3;
                        this.volverBase3.setTint(0xff5b5b); 
                        avion_3.moverAvion({x: avion_3.xInicial, y: avion_3.yInicial});
                        config.Partida.sincronizar({tipoOp:"sincronizarAvion", idavion:3, x: avion_3.xInicial, y: avion_3.yInicial});
                        config.Partida.sincronizar({tipoOp:"sincronizarCombustibleAvion", idavion:3, combustible: true});

                    }                

                    if (avion_3_Aliados.focus==true && avion_3_Aliados.altitud!='Inicial')
                    {        
                        avion_3_Aliados.altitud_anterior=avion_3_Aliados.altitud;
                        avion_3_Aliados.cargarCombustible=true;     
                        config.Partida.idavion=7;
                        this.volverBase3.setTint(0xff5b5b); 
                        avion_3_Aliados.moverAvion({x: avion_3_Aliados.xInicial, y: avion_3_Aliados.yInicial});
                        config.Partida.sincronizar({tipoOp:"sincronizarAvion", idavion:7, x: avion_3_Aliados.xInicial, y: avion_3_Aliados.yInicial});
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
                     
                    if (avion_4.focus==true && avion_4.altitud!='Inicial')
                    {    
                        avion_4.altitud_anterior=avion_4.altitud;

                        avion_4.cargarbomba=true;      
                        this.cargarBomba4.setTint(0xff5b5b);       
                        config.Partida.idavion=4;
                        avion_4.moverAvion({x: avion_4.xInicial, y: avion_4.yInicial});
                        config.Partida.sincronizar({tipoOp:"sincronizarAvion", idavion:4, x: avion_4.xInicial, y: avion_4.yInicial});
                        config.Partida.sincronizar({tipoOp:"sincronizarBombaAvion", idavion:4, bomba: true});

                    }            

                    if (avion_4_Aliados.focus==true && avion_4_Aliados.altitud!='Inicial')
                    {    
                        avion_4_Aliados.altitud_anterior=avion_4_Aliados.altitud;
                        
                        avion_4_Aliados.cargarbomba=true;  
                        this.cargarBomba4.setTint(0xff5b5b);         
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
                                        
                    if (avion_4.focus==true && avion_4.altitud!='Inicial')
                    {            
                        avion_4.altitud_anterior=avion_4.altitud;
                        avion_4.cargarCombustible=true;
                        config.Partida.idavion=4;
                        this.volverBase4.setTint(0xff5b5b); 
                        avion_4.moverAvion({x: avion_4.xInicial, y: avion_4.yInicial});
                        config.Partida.sincronizar({tipoOp:"sincronizarAvion", idavion:4, x: avion_4.xInicial, y: avion_4.yInicial});
                        config.Partida.sincronizar({tipoOp:"sincronizarCombustibleAvion", idavion:4, combustible: true});
                    }                

                    if (avion_4_Aliados.focus==true && avion_4_Aliados.altitud!='Inicial')
                    {        
                        avion_4_Aliados.altitud_anterior=avion_4_Aliados.altitud;
                        avion_4_Aliados.cargarCombustible=true;     
                        config.Partida.idavion=8;
                        this.volverBase4.setTint(0xff5b5b); 
                        avion_4_Aliados.moverAvion({x: avion_4_Aliados.xInicial, y: avion_4_Aliados.yInicial});
                        config.Partida.sincronizar({tipoOp:"sincronizarAvion", idavion:8, x: avion_4_Aliados.xInicial, y: avion_4_Aliados.yInicial});
                        config.Partida.sincronizar({tipoOp:"sincronizarCombustibleAvion", idavion:8, combustible: true});
                    }              
                }
            });
        });
    }

    botonGuardar(){

        this.guardar = this.add.image(250, 55, "Save-64").setOrigin(0).setScale(.7).setInteractive(); 
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
                avion.vidaAvion-=config.Partida.configuraciones.avionDanio;  
                console.log( avion.vidaAvion);
                config.Partida.sincronizar({tipoOp:"sincronizarVidaAvion", idavion:avion.idavion, vida:config.Partida.configuraciones.avionDanio});
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
                avion_A_pegar.vidaAvion-=config.Partida.configuraciones.torreDanio; 
                config.Partida.sincronizar({tipoOp:"sincronizarVidaAvion", idavion:avion_A_pegar.idavion, vida:config.Partida.configuraciones.torreDanio});                    
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
        if (avion_potencia.altitud == avion_aliado.altitud)
        {
            avion_potencia.vidaAvion= 0;
            avion_aliado.vidaAvion= 0;            
            config.Partida.sincronizar({tipoOp:"sincronizarVidaAvion", idavion:avion_potencia.idavion, vida:config.Partida.configuraciones.avionSalud });                    
            config.Partida.sincronizar({tipoOp:"sincronizarVidaAvion", idavion:avion_aliado.idavion, vida:config.Partida.configuraciones.avionSalud });                    
        }   
    }

    colision_aviones_deposito(circulo,objeto)
    {        
        if (config.Partida.Bando=='Potencias')
        { 
            this.depositoCombustibleAliados.setVisible(true);            
        }  
        else   
        {                
            this.depositoCombustiblePotencias.setVisible(true);
        } 
    }

    colision_aviones_contenedor(circulo,objeto)
    {        
        if (config.Partida.Bando=='Potencias')
        { 
            this.contenedorExplosivosAliados.setVisible(true);
        }  
        else   
        {                
            this.contenedorExplosivosPotencias.setVisible(true);
        } 
    }


    colisiones()
    { 
        //Colisiones generales, artilleria, torre de control , balas y aviones
        this.physics.add.overlap(artilleriasAliados,aviones, this.dispararArtilleria, null, this);
        this.physics.add.overlap(artilleriasPotencias, aviones_aliados, this.dispararArtilleria, null, this);
        //colision de torre con avion dependiendo del bando (se chequea dos en dos colisiones sino dispara doble porque la colision se da en ambos jugadores)
        if (config.Partida.Bando=='Potencias'){
            this.physics.add.overlap(this.circulo_torreAliados, aviones, this.colision_torre_avion, null, this); 
        }else{
            this.physics.add.overlap(this.circulo_torrePotencias, aviones_aliados, this.colision_torre_avion, null, this);        
        }
            
        this.physics.add.overlap([avion_1,avion_2,avion_3,avion_4],[avion_1_Aliados,avion_2_Aliados,avion_3_Aliados,avion_4_Aliados], this.choqueAviones, null, this);
        this.physics.add.overlap(circulo_aviones, this.depositoCombustibleAliados, this.colision_aviones_deposito, null, this); 
        this.physics.add.overlap(circulo_aviones_aliados, this.depositoCombustiblePotencias, this.colision_aviones_deposito, null, this); 

        this.physics.add.overlap(circulo_aviones, this.contenedorExplosivosAliados, this.colision_aviones_contenedor, null, this); 
        this.physics.add.overlap(circulo_aviones_aliados, this.contenedorExplosivosPotencias, this.colision_aviones_contenedor, null, this); 
        
        //Aniado colision entre los aviones y los muros
        this.physics.add.collider([avion_1,avion_2,avion_3,avion_4,avion_1_Aliados,avion_2_Aliados,avion_3_Aliados,avion_4_Aliados],this.wall_floor); 
      


        if (config.Partida.Bando=='Potencias')
        { 
            this.physics.add.overlap(circulo_aviones, aviones_aliados, this.Colision_Aviones, null, this);  
            this.physics.add.overlap(bullets, aviones_aliados, this.colision_bala_avion, null, this); 
            
            //deposito
            this.physics.add.overlap(this.depositoCombustibleAliados,this.circulo_bomba_chico, ()=>
            {   
                if (this.depositoCombustibleAliados.recibeBombaCirculoChico)
                {                    
                    this.depositoCombustibleAliados.recibeBombaCirculoChico = false;
                    this.depositoCombustibleAliados.vida = this.depositoCombustibleAliados.vida - this.circulo_bomba_chico.danio; 
                    config.Partida.sincronizar({tipoOp:"sincronizarVidaBase", objeto:1, bando:"Aliados", vida: this.depositoCombustibleAliados.vida});                    
                    this.mensajeAviso('Se ha hecho ' + this.circulo_bomba_chico.danio + ' de daño al Deposito enemigo');
                }
            });

            this.physics.add.overlap(this.depositoCombustibleAliados,this.circulo_bomba_grande, ()=>
            {   
                if (this.depositoCombustibleAliados.recibeBombaCirculoGrande)
                {
                    this.depositoCombustibleAliados.recibeBombaCirculoGrande = false;
                    this.depositoCombustibleAliados.vida = this.depositoCombustibleAliados.vida - this.circulo_bomba_grande.danio;
                    torreBar.x= torreBar.x-this.circulo_bomba_chico.danio;
                    config.Partida.sincronizar({tipoOp:"sincronizarVidaBase", objeto:1, bando:"Aliados", vida: this.depositoCombustibleAliados.vida});                    
                    this.mensajeAviso2('Se ha hecho ' + this.circulo_bomba_grande.danio + ' de daño al Deposito enemigo');
                }
            });
            // torre
            this.physics.add.overlap(this.torreAliados,this.circulo_bomba_chico, ()=>
            {   
                if (this.torreAliados.recibeBombaCirculoChico)
                {
                    this.torreAliados.recibeBombaCirculoChico = false;
                    this.torreAliados.vida = this.torreAliados.vida - this.circulo_bomba_chico.danio;                   
                    config.Partida.sincronizar({tipoOp:"sincronizarVidaBase", objeto:0, bando:"Aliados", vida: this.torreAliados.vida});                    
                    this.mensajeAviso('Se ha hecho ' + this.circulo_bomba_chico.danio + ' de daño a la Torre enemiga');
                    console.log(this.torreAliados.vida);
                }
            });

            this.physics.add.overlap(this.torreAliados,this.circulo_bomba_grande, ()=>
            {   
                if (this.torreAliados.recibeBombaCirculoGrande)
                {
                    this.torreAliados.recibeBombaCirculoGrande = false;
                    this.torreAliados.vida = this.torreAliados.vida - this.circulo_bomba_grande.danio;                   
                    config.Partida.sincronizar({tipoOp:"sincronizarVidaBase", objeto:0, bando:"Aliados", vida: this.torreAliados.vida});                    
                    this.mensajeAviso2('Se ha hecho ' + this.circulo_bomba_grande.danio + ' de daño a la Torre enemiga');
                    console.log(this.torreAliados.vida);
                }
            });
            //contendor
            this.physics.add.overlap(this.contenedorExplosivosAliados,this.circulo_bomba_chico, ()=>
            {   
                if (this.contenedorExplosivosAliados.recibeBombaCirculoChico)
                {
                    this.contenedorExplosivosAliados.recibeBombaCirculoChico = false;
                    this.contenedorExplosivosAliados.vida = this.contenedorExplosivosAliados.vida - this.circulo_bomba_chico.danio;                   
                    config.Partida.sincronizar({tipoOp:"sincronizarVidaBase", objeto:2, bando:"Aliados", vida: this.contenedorExplosivosAliados.vida});                    
                    this.mensajeAviso('Se ha hecho ' + this.circulo_bomba_chico.danio + ' de daño al Contenedor enemigo');
                }
            });

            this.physics.add.overlap(this.contenedorExplosivosAliados,this.circulo_bomba_grande, ()=>
            {   
                if (this.contenedorExplosivosAliados.recibeBombaCirculoGrande)
                {
                    this.contenedorExplosivosAliados.recibeBombaCirculoGrande = false;
                    this.contenedorExplosivosAliados.vida = this.contenedorExplosivosAliados.vida - this.circulo_bomba_grande.danio; 
                    config.Partida.sincronizar({tipoOp:"sincronizarVidaBase", objeto:2, bando:"Aliados", vida: this.contenedorExplosivosAliados.vida});                                
                    this.mensajeAviso2('Se ha hecho ' + this.circulo_bomba_grande.danio + ' de daño al Contenedor enemigo');
                }
            });
        }else{ 
            this.physics.add.overlap(circulo_aviones_aliados, aviones, this.Colision_Aviones, null, this);         
            this.physics.add.overlap(bullets, aviones, this.colision_bala_avion, null, this);  
            //deposito
            this.physics.add.overlap(this.depositoCombustiblePotencias,this.circulo_bomba_chico, ()=>
            {   
                if (this.depositoCombustiblePotencias.recibeBombaCirculoChico)
                {
                    this.depositoCombustiblePotencias.recibeBombaCirculoChico = false;
                    this.depositoCombustiblePotencias.vida = this.depositoCombustiblePotencias.vida - this.circulo_bomba_chico.danio;
                    config.Partida.sincronizar({tipoOp:"sincronizarVidaBase", objeto:1, bando:"Potencias", vida: this.depositoCombustiblePotencias.vida});                    
                    this.mensajeAviso('Se ha hecho ' + this.circulo_bomba_chico.danio + ' de daño al Deposito enemigo');
                }
            });

            this.physics.add.overlap(this.depositoCombustiblePotencias,this.circulo_bomba_grande, ()=>
            {   
                if (this.depositoCombustiblePotencias.recibeBombaCirculoGrande)
                {
                    this.depositoCombustiblePotencias.recibeBombaCirculoGrande = false;                    
                    this.depositoCombustiblePotencias.vida = this.depositoCombustiblePotencias.vida - this.circulo_bomba_grande.danio;  
                    config.Partida.sincronizar({tipoOp:"sincronizarVidaBase", objeto:1, bando:"Potencias", vida: this.depositoCombustiblePotencias.vida});              
                    this.mensajeAviso2('Se ha hecho ' + this.circulo_bomba_grande.danio + ' de daño al Deposito enemigo');
                }
            });
            // torre
            this.physics.add.overlap(this.torrePotencias,this.circulo_bomba_chico, ()=>
            {   
                if (this.torrePotencias.recibeBombaCirculoChico)
                {
                    this.torrePotencias.recibeBombaCirculoChico = false;
                    this.torrePotencias.vida = this.torrePotencias.vida - this.circulo_bomba_chico.danio;
                    config.Partida.sincronizar({tipoOp:"sincronizarVidaBase", objeto:0, bando:"Potencias", vida: this.torrePotencias.vida});
                    this.mensajeAviso('Se ha hecho ' + this.circulo_bomba_chico.danio + ' de daño a la Torre enemiga');
                }
            });

            this.physics.add.overlap(this.torrePotencias,this.circulo_bomba_grande, ()=>
            {   
                if (this.depositoCombustiblePotencias.recibeBombaCirculoGrande)
                {
                    this.torrePotencias.recibeBombaCirculoGrande = false; 
                    this.torrePotencias.vida = this.torrePotencias.vida - this.circulo_bomba_grande.danio;
                    config.Partida.sincronizar({tipoOp:"sincronizarVidaBase", objeto:0, bando:"Potencias", vida: this.torrePotencias.vida});                
                    this.mensajeAviso2('Se ha hecho ' + this.circulo_bomba_grande.danio + ' de daño a la Torre enemiga');
                }
            });
            //contendor
            this.physics.add.overlap(this.contenedorExplosivosPotencias,this.circulo_bomba_chico, ()=>
            {   
                if (this.contenedorExplosivosPotencias.recibeBombaCirculoChico)
                {
                    this.contenedorExplosivosPotencias.recibeBombaCirculoChico = false;
                    this.contenedorExplosivosPotencias.vida = this.contenedorExplosivosPotencias.vida - this.circulo_bomba_chico.danio;
                    config.Partida.sincronizar({tipoOp:"sincronizarVidaBase", objeto:2, bando:"Potencias", vida: this.contenedorExplosivosPotencias.vida});
                    this.mensajeAviso('Se ha hecho ' + this.circulo_bomba_chico.danio + ' de daño al Contenedor enemigo');
                }
            });

            this.physics.add.overlap(this.contenedorExplosivosPotencias,this.circulo_bomba_grande, ()=>
            {   
                if (this.contenedorExplosivosPotencias.recibeBombaCirculoGrande)
                {
                    this.contenedorExplosivosPotencias.recibeBombaCirculoGrande = false; 
                    this.contenedorExplosivosPotencias.vida = this.contenedorExplosivosPotencias.vida - this.circulo_bomba_grande.danio;  
                    config.Partida.sincronizar({tipoOp:"sincronizarVidaBase", objeto:2, bando:"Potencias", vida: this.contenedorExplosivosPotencias.vida});              
                    this.mensajeAviso2('Se ha hecho ' + this.circulo_bomba_grande.danio + ' de daño al Contenedor enemigo');
                }
            });      
        }
    }
    //----------------//
    
    //Evento llamado al realizar click con el mouse
    onObjectClicked(pointer)
    {  
        if((pointer.x > 433 && pointer.y >46)&&(pointer.x < 1869 && pointer.y < 1056))
        {
            //Comienzo a chequear que avion o elemento se encuentra en focus para ejecutar su correspondiente accion       
            if (config.Partida.Bando=='Potencias')
            {
                if (avion_1.focus==true && avion_1.altitud!='Inicial')
                {      
                    if (!avion_1.saliBase)
                    {    
                        if (avion_1.altitud=='EnBase') 
                        {              
                            avion_1.cambiarAltitud(avion_1.altitud_anterior);
                            config.Partida.sincronizar({tipoOp:"sincronizarAltitudAvion", idavion:1, altitud:avion_1.altitud}); 
                        }    
                        else
                        {
                            avion_1.cambiarAltitud(avion_1.altitud);
                            config.Partida.sincronizar({tipoOp:"sincronizarAltitudAvion", idavion:1, altitud:avion_1.altitud}); 
                        } 
                        avion_1.saliBase=true;
                    }
                    if (avion_1.vidaAvion > 0)
                    {                              
                        config.Partida.idavion=1;                
                        avion_1.moverAvion({x: pointer.x, y: pointer.y});            
                        config.Partida.sincronizar({tipoOp:"sincronizarAvion", idavion:1, x: pointer.x, y: pointer.y});
                    } 
                } else{
                    if(avion_1.altitud == 'Inicial' && avion_1.focus==true){
                        config.Partida.idavion=1;          
                        avion_1.setScale(0.05);
                        avion_1.altitud ="Baja";
                        avion_1.cambiarAltitud(avion_1.altitud);
                        avion_1.saliBase=true;
                        avion_1.moverAvion({x: pointer.x, y: pointer.y});   
                        config.Partida.sincronizar({tipoOp:"sincronizarAvion", idavion:1, x: pointer.x, y: pointer.y});
                        config.Partida.sincronizar({tipoOp:"sincronizarAltitudAvion", idavion:1, altitud:avion_1.altitud}); 
                        this.cambiarImagenAltitud('Baja');
                    }
                }

                if (avion_2.focus==true && avion_2.altitud!='Inicial')
                {         
                    if (!avion_2.saliBase)
                    {    
                        if (avion_2.altitud=='EnBase') 
                        {              
                            avion_2.cambiarAltitud(avion_2.altitud_anterior);
                            config.Partida.sincronizar({tipoOp:"sincronizarAltitudAvion", idavion:2, altitud:avion_2.altitud}); 
                        }    
                        else
                        {
                            avion_2.cambiarAltitud(avion_2.altitud);
                            config.Partida.sincronizar({tipoOp:"sincronizarAltitudAvion", idavion:2, altitud:avion_2.altitud}); 
                        } 
                        avion_2.saliBase=true;
                    }      
                    if (avion_2.vidaAvion > 0)
                    {
                        config.Partida.idavion=2;                
                        avion_2.moverAvion({x: pointer.x, y: pointer.y});            
                        config.Partida.sincronizar({tipoOp:"sincronizarAvion", idavion:2, x: pointer.x, y: pointer.y});
                    }                        
                    
                } else{
                    if(avion_2.altitud == 'Inicial' && avion_2.focus==true){
                        config.Partida.idavion=2;           
                        avion_2.setScale(0.05);
                        avion_2.altitud ="Baja";
                        avion_2.cambiarAltitud(avion_2.altitud);
                        avion_2.saliBase=true;
                        avion_2.moverAvion({x: pointer.x, y: pointer.y});   
                        config.Partida.sincronizar({tipoOp:"sincronizarAvion", idavion:2, x: pointer.x, y: pointer.y});
                        config.Partida.sincronizar({tipoOp:"sincronizarAltitudAvion", idavion:2, altitud:avion_2.altitud}); 
                        this.cambiarImagenAltitud('Baja');
                        
                    }
                }

                if (avion_3.focus==true && avion_3.altitud!='Inicial')
                {            
                    if (!avion_3.saliBase)
                    {    
                        if (avion_3.altitud=='EnBase') 
                        {              
                            avion_3.cambiarAltitud(avion_3.altitud_anterior);
                            config.Partida.sincronizar({tipoOp:"sincronizarAltitudAvion", idavion:3, altitud:avion_3.altitud}); 
                        }    
                        else
                        {
                            avion_3.cambiarAltitud(avion_3.altitud);
                            config.Partida.sincronizar({tipoOp:"sincronizarAltitudAvion", idavion:3, altitud:avion_3.altitud}); 
                        } 
                        avion_3.saliBase=true;
                    }  
                    if (avion_3.vidaAvion > 0)                            
                    {
                        config.Partida.idavion=3;                
                        avion_3.moverAvion({x: pointer.x, y: pointer.y});            
                        config.Partida.sincronizar({tipoOp:"sincronizarAvion", idavion:3, x: pointer.x, y: pointer.y});
                    }
                }else{
                    if(avion_3.altitud == 'Inicial' && avion_3.focus==true){
                        config.Partida.idavion=3;           
                        avion_3.setScale(0.05);
                        avion_3.altitud ="Baja";
                        avion_3.cambiarAltitud(avion_3.altitud);
                        avion_3.saliBase=true;
                        avion_3.moverAvion({x: pointer.x, y: pointer.y});   
                        config.Partida.sincronizar({tipoOp:"sincronizarAvion", idavion:3, x: pointer.x, y: pointer.y});
                        config.Partida.sincronizar({tipoOp:"sincronizarAltitudAvion", idavion:3, altitud:avion_3.altitud}); 
                        this.cambiarImagenAltitud('Baja');
                    }
                }  

                if (avion_4.focus==true && avion_4.altitud!='Inicial')
                {            
                    if (!avion_4.saliBase)
                    {    
                        if (avion_4.altitud=='EnBase') 
                        {              
                            avion_4.cambiarAltitud(avion_4.altitud_anterior);
                            config.Partida.sincronizar({tipoOp:"sincronizarAltitudAvion", idavion:4, altitud:avion_4.altitud}); 
                        }    
                        else
                        {
                            avion_4.cambiarAltitud(avion_4.altitud);
                            config.Partida.sincronizar({tipoOp:"sincronizarAltitudAvion", idavion:4, altitud:avion_4.altitud}); 
                        } 
                        avion_4.saliBase=true;
                    }    
                    if (avion_4.vidaAvion > 0) 
                    {
                        config.Partida.idavion=4;                
                        avion_4.moverAvion({x: pointer.x, y: pointer.y});            
                        config.Partida.sincronizar({tipoOp:"sincronizarAvion", idavion:4, x: pointer.x, y: pointer.y});
                    }                         
                    
                }else{
                    if(avion_4.altitud == 'Inicial' && avion_4.focus==true){
                        config.Partida.idavion=4;           
                        avion_4.setScale(0.05);
                        avion_4.altitud ="Baja";
                        avion_4.cambiarAltitud(avion_4.altitud);
                        avion_4.saliBase=true;
                        avion_4.moverAvion({x: pointer.x, y: pointer.y});   
                        config.Partida.sincronizar({tipoOp:"sincronizarAvion", idavion:4, x: pointer.x, y: pointer.y});
                        config.Partida.sincronizar({tipoOp:"sincronizarAltitudAvion", idavion:4, altitud:avion_4.altitud}); 
                        this.cambiarImagenAltitud('Baja');
                    }
                }   
            }
                else
                {
                if (avion_1_Aliados.focus==true && avion_1_Aliados.altitud!='Inicial')
                {
                    if (!avion_1_Aliados.saliBase)
                    {    
                        if (avion_1_Aliados.altitud=='EnBase') 
                        {              
                            avion_1_Aliados.cambiarAltitud(avion_1_Aliados.altitud_anterior);
                            config.Partida.sincronizar({tipoOp:"sincronizarAltitudAvion", idavion:5, altitud:avion_1_Aliados.altitud}); 
                        }    
                        else
                        {
                            avion_1_Aliados.cambiarAltitud(avion_1_Aliados.altitud);
                            config.Partida.sincronizar({tipoOp:"sincronizarAltitudAvion", idavion:5, altitud:avion_1_Aliados.altitud}); 
                        } 
                        avion_1_Aliados.saliBase=true;
                    }    
                    if (avion_1_Aliados.vidaAvion > 0)                          
                    {
                        config.Partida.idavion=5;                
                        avion_1_Aliados.moverAvion({x: pointer.x, y: pointer.y});            
                        config.Partida.sincronizar({tipoOp:"sincronizarAvion", idavion:5, x: pointer.x, y: pointer.y});
                    }
                
                }else{
                    if(avion_1_Aliados.altitud == 'Inicial' && avion_1_Aliados.focus==true){
                        config.Partida.idavion=5;           
                        avion_1_Aliados.setScale(0.05);
                        avion_1_Aliados.altitud ="Baja";
                        avion_1_Aliados.cambiarAltitud(avion_1_Aliados.altitud);
                        avion_1_Aliados.saliBase=true;
                        avion_1_Aliados.moverAvion({x: pointer.x, y: pointer.y});   
                        config.Partida.sincronizar({tipoOp:"sincronizarAvion", idavion:5, x: pointer.x, y: pointer.y});
                        config.Partida.sincronizar({tipoOp:"sincronizarAltitudAvion", idavion:5, altitud:avion_1_Aliados.altitud}); 
                        this.cambiarImagenAltitud('Baja');
                    }
                } 
                if (avion_2_Aliados.focus==true && avion_2_Aliados.altitud!='Inicial')
                { 
                    if (!avion_2_Aliados.saliBase)
                    {    
                        if (avion_2_Aliados.altitud=='EnBase') 
                        {              
                            avion_2_Aliados.cambiarAltitud(avion_2_Aliados.altitud_anterior);
                            config.Partida.sincronizar({tipoOp:"sincronizarAltitudAvion", idavion:6, altitud:avion_2_Aliados.altitud}); 
                        }    
                        else
                        {
                            avion_2_Aliados.cambiarAltitud(avion_2_Aliados.altitud);
                            config.Partida.sincronizar({tipoOp:"sincronizarAltitudAvion", idavion:6, altitud:avion_1_Aliados.altitud}); 
                        } 
                        avion_2_Aliados.saliBase=true;
                    }             
                    if (avion_2_Aliados.vidaAvion > 0)
                    {
                        config.Partida.idavion=6;                
                        avion_2_Aliados.moverAvion({x: pointer.x, y: pointer.y});            
                        config.Partida.sincronizar({tipoOp:"sincronizarAvion", idavion:6, x: pointer.x, y: pointer.y});
                    }                 
                    
                }else{
                    if(avion_2_Aliados.altitud == 'Inicial' && avion_2_Aliados.focus==true){
                        config.Partida.idavion=6;           
                        avion_2_Aliados.setScale(0.05);
                        avion_2_Aliados.altitud ="Baja";
                        avion_2_Aliados.cambiarAltitud(avion_2_Aliados.altitud);
                        avion_2_Aliados.saliBase=true;
                        avion_2_Aliados.moverAvion({x: pointer.x, y: pointer.y});   
                        config.Partida.sincronizar({tipoOp:"sincronizarAvion", idavion:6, x: pointer.x, y: pointer.y});
                        config.Partida.sincronizar({tipoOp:"sincronizarAltitudAvion", idavion:6, altitud:avion_2_Aliados.altitud}); 
                        this.cambiarImagenAltitud('Baja');
                    }
                } 
                if (avion_3_Aliados.focus==true && avion_3_Aliados.altitud!='Inicial')
                {
                    if (!avion_3_Aliados.saliBase)
                    {    
                        if (avion_3_Aliados.altitud=='EnBase') 
                        {              
                            avion_3_Aliados.cambiarAltitud(avion_3_Aliados.altitud_anterior);
                            config.Partida.sincronizar({tipoOp:"sincronizarAltitudAvion", idavion:7, altitud:avion_3_Aliados.altitud}); 
                        }    
                        else
                        {
                            avion_3_Aliados.cambiarAltitud(avion_3_Aliados.altitud);
                            config.Partida.sincronizar({tipoOp:"sincronizarAltitudAvion", idavion:7, altitud:avion_3_Aliados.altitud}); 
                        } 
                        avion_3_Aliados.saliBase=true;
                    }       
                    if (avion_3_Aliados.vidaAvion > 0)
                    {
                        config.Partida.idavion=7;                
                        avion_3_Aliados.moverAvion({x: pointer.x, y: pointer.y});            
                        config.Partida.sincronizar({tipoOp:"sincronizarAvion", idavion:7, x: pointer.x, y: pointer.y});
                    }                       
                    
                }else{
                    if(avion_3_Aliados.altitud == 'Inicial' && avion_3_Aliados.focus==true){
                        config.Partida.idavion=7;           
                        avion_3_Aliados.setScale(0.05);
                        avion_3_Aliados.altitud ="Baja";
                        avion_3_Aliados.cambiarAltitud(avion_3_Aliados.altitud);
                        avion_3_Aliados.saliBase=true;
                        avion_3_Aliados.moverAvion({x: pointer.x, y: pointer.y});   
                        config.Partida.sincronizar({tipoOp:"sincronizarAvion", idavion:7, x: pointer.x, y: pointer.y});
                        config.Partida.sincronizar({tipoOp:"sincronizarAltitudAvion", idavion:7, altitud:avion_3_Aliados.altitud});
                        this.cambiarImagenAltitud('Baja');
                    }
                } 
                if (avion_4_Aliados.focus==true && avion_4_Aliados.altitud!='Inicial')
                {
                    if (!avion_4_Aliados.saliBase)
                    {    
                        if (avion_4_Aliados.altitud=='EnBase') 
                        {              
                            avion_4_Aliados.cambiarAltitud(avion_4_Aliados.altitud_anterior);
                            config.Partida.sincronizar({tipoOp:"sincronizarAltitudAvion", idavion:8, altitud:avion_4_Aliados.altitud}); 
                        }    
                        else
                        {
                            avion_4_Aliados.cambiarAltitud(avion_4_Aliados.altitud);
                            config.Partida.sincronizar({tipoOp:"sincronizarAltitudAvion", idavion:8, altitud:avion_4_Aliados.altitud}); 
                        } 
                        avion_3_Aliados.saliBase=true;
                    }       
                    if (avion_4_Aliados.vidaAvion > 0) 
                    {
                        config.Partida.idavion=8;                
                        avion_4_Aliados.moverAvion({x: pointer.x, y: pointer.y});            
                        config.Partida.sincronizar({tipoOp:"sincronizarAvion", idavion:8, x: pointer.x, y: pointer.y});
                    }                      
                    
                }else{
                    if(avion_4_Aliados.altitud == 'Inicial' && avion_4_Aliados.focus==true){
                        config.Partida.idavion=8;           
                        avion_4_Aliados.setScale(0.05);
                        avion_4_Aliados.altitud ="Baja";
                        avion_4_Aliados.cambiarAltitud(avion_4_Aliados.altitud);
                        avion_4_Aliados.saliBase=true;
                        avion_4_Aliados.moverAvion({x: pointer.x, y: pointer.y});   
                        config.Partida.sincronizar({tipoOp:"sincronizarAvion", idavion:8, x: pointer.x, y: pointer.y});
                        config.Partida.sincronizar({tipoOp:"sincronizarAltitudAvion", idavion:8, altitud:avion_4_Aliados.altitud}); 
                        this.cambiarImagenAltitud('Baja');
                    }
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
                    avion_A_pegar.vidaAvion-=config.Partida.configuraciones.artilleriaDanio; 
                    config.Partida.sincronizar({tipoOp:"sincronizarVidaAvion", idavion:avion_A_pegar.idavion, vida:config.Partida.configuraciones.artilleriaDanio});                    
                }  
                avion_A_pegar.activarColision=0; 
                console.log("vida avion: "+avion_A_pegar.vidaAvion);               
            }
    }

     //Evento  llamado al disparar automaticamente artilleria
     dispararArtilleria(artilleria_focus,avion_A_pegar)
     {           
         //Se pasa el avion que esta en focus 
         bullet = bulletsArtilleria.get();         
         if (bullet && avion_A_pegar.vidaAvion>0)
         {      
            artilleria_focus.setVisible(true);
            if (this.time > artilleria_focus.lastFired && avion_A_pegar.altitud=='Baja')
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
         if(config.Partida.Bando=='Potencias'){
            if(avion_1.vidaAvion > 0){
                vidaContainer1.depth=100;
                vidaBar1.depth=100;
                combustibleContainer1.depth=100;
                combustibleBar1.depth=100;
                this.cargarBomba1.depth=100; 
                this.volverBase1.depth=100;
            }
            if(avion_2.vidaAvion > 0){
                vidaContainer2.depth=100;
                vidaBar2.depth=100;
                combustibleContainer2.depth=100;
                combustibleBar2.depth=100;
                this.cargarBomba2.depth=100; 
                this.volverBase2.depth=100;
            }
            if(avion_3.vidaAvion > 0){
                vidaContainer3.depth=100;
                vidaBar3.depth=100;
                combustibleContainer3.depth=100;
                combustibleBar3.depth=100;
                this.cargarBomba3.depth=100; 
                this.volverBase3.depth=100;
            }
            if(avion_4.vidaAvion > 0){
                vidaContainer4.depth=100;
                vidaBar4.depth=100;
                combustibleContainer4.depth=100;
                combustibleBar4.depth=100;
                this.cargarBomba4.depth=100; 
                this.volverBase4.depth=100;
            }
         }else{
            if(avion_1_Aliados.vidaAvion > 0){
                vidaContainer1.depth=100;
                vidaBar1.depth=100;
                combustibleContainer1.depth=100;
                combustibleBar1.depth=100;
                this.cargarBomba1.depth=100; 
                this.volverBase1.depth=100;
            }
            if(avion_2_Aliados.vidaAvion > 0){
                vidaContainer2.depth=100;
                vidaBar2.depth=100;
                combustibleContainer2.depth=100;
                combustibleBar2.depth=100;
                this.cargarBomba2.depth=100; 
                this.volverBase2.depth=100;
            }
            if(avion_3_Aliados.vidaAvion > 0){
                vidaContainer3.depth=100;
                vidaBar3.depth=100;
                combustibleContainer3.depth=100;
                combustibleBar3.depth=100;
                this.cargarBomba3.depth=100; 
                this.volverBase3.depth=100;
            }
            if(avion_4_Aliados.vidaAvion > 0){
                vidaContainer4.depth=100;
                vidaBar4.depth=100;
                combustibleContainer4.depth=100;
                combustibleBar4.depth=100;
                this.cargarBomba4.depth=100; 
                this.volverBase4.depth=100;
            }
         }
     }
    
    definicionAviones()
    {	         
        velAvion = config.Partida.configuraciones.avionVelocidad;
        //Se definen los aviones de ambos bandos
        var posi = 50;
        inicioMapaX=0;
        inicioMapaY=0;
        if (config.Partida.tipoPartida!='cargarPartida')
        { 
            inicioMapaX=433;
            inicioMapaY=40;
        }  
        
        for(var i = 0; i < 4; i++)
        {              
            var bomba = false;
            if (typeof config.Partida.avionesPotencias[i].bomba !== 'undefined')
                bomba = true;

            eval("avion_"+(i+1)+"= new Avion({scene: this,x:"+ (config.Partida.avionesPotencias[i].posicionX+inicioMapaX)+",y:"+ (config.Partida.avionesPotencias[i].posicionY+inicioMapaY)+",altitud: '"+config.Partida.avionesPotencias[i].altitud+"',vidaAvion:"+ config.Partida.avionesPotencias[i].salud+",combustible: "+config.Partida.avionesPotencias[i].combustible+",idavion:" +(i+1)+",tengoBomba: "+bomba+" }).setInteractive(); ")
            eval("avion_"+(i+1)+".xInicial = campoPotencias.posicionX +"+posi+";")
            eval("avion_"+(i+1)+".yInicial = campoPotencias.base.posicionY-30;") 
            if (config.Partida.tipoPartida=='cargarPartida')
                eval("avion_"+(i+1)+".cambiarAltitud("+config.Partida.avionesPotencias[i].altitud+");")
            else
                eval("avion_"+(i+1)+".cambiarAltitud('"+config.Partida.avionesPotencias[i].altitud+"');")


            posi = posi +50;      
        }
        posi = 50;
        for(var i = 0; i < 4; i++){

            var bomba = false;
            if (typeof config.Partida.avionesAliados[i].bomba !== 'undefined')
                bomba = true;

            eval("avion_"+(i+1)+"_Aliados = new Avion({scene: this,x:"+ (config.Partida.avionesAliados[i].posicionX+inicioMapaX)+",y:"+ (config.Partida.avionesAliados[i].posicionY+inicioMapaY)+",altitud: '"+config.Partida.avionesAliados[i].altitud+"',vidaAvion:"+ config.Partida.avionesAliados[i].salud+",combustible: "+config.Partida.avionesAliados[i].combustible+",idavion:" +(i+5)+",tengoBomba: "+bomba+" }).setInteractive(); ")
            eval("avion_"+(i+1)+"_Aliados.xInicial = campoAliados.posicionX +"+posi+";")
            eval("avion_"+(i+1)+"_Aliados.yInicial = campoAliados.base.posicionY-30;")             
            if (config.Partida.tipoPartida=='cargarPartida')
                eval("avion_"+(i+1)+"_Aliados.cambiarAltitud("+config.Partida.avionesAliados[i].altitud+");")  
            else
                eval("avion_"+(i+1)+"_Aliados.cambiarAltitud('"+config.Partida.avionesAliados[i].altitud+"');") 
            posi = posi +50; 
        }


        //circulos     
        this.circulo_1 = this.add.image(avion_1.x-50,avion_1.y-50,'circuloAvion').setScale(1.5);
        this.physics.world.enable(this.circulo_1);
        this.circulo_1.body.setCircle(config.Partida.configuraciones.avionRadioVision);
        this.circulo_1.idAvion=1;  
 
        this.circulo_2 = this.add.image(avion_2.x-50,avion_2.y-50,'circuloAvion').setScale(1.5);
        this.physics.world.enable(this.circulo_2);
        this.circulo_2.body.setCircle(config.Partida.configuraciones.avionRadioVision);
        this.circulo_2.idAvion=2;
      
        this.circulo_3 = this.add.image(avion_3.x-50,avion_3.y-50,'circuloAvion').setScale(1.5);
        this.physics.world.enable(this.circulo_3);
        this.circulo_3.body.setCircle(config.Partida.configuraciones.avionRadioVision);
        this.circulo_2.idAvion=3;
    
        this.circulo_4 = this.add.image(avion_4.x-50,avion_4.y-50,'circuloAvion').setScale(1.5);
        this.physics.world.enable(this.circulo_4);
        this.circulo_4.body.setCircle(config.Partida.configuraciones.avionRadioVision);
        this.circulo_4.idAvion=4;

        this.circulo_5 = this.add.image(avion_1_Aliados.x-50,avion_1_Aliados.y-50,'circuloAvion').setScale(1.5);
        this.physics.world.enable(this.circulo_5);
        this.circulo_5.body.setCircle(config.Partida.configuraciones.avionRadioVision);
        this.circulo_5.idAvion=5;

        this.circulo_6 = this.add.image(avion_2_Aliados.x-50,avion_2_Aliados.y-50,'circuloAvion').setScale(1.5);
        this.physics.world.enable(this.circulo_6);
        this.circulo_6.body.setCircle(config.Partida.configuraciones.avionRadioVision);
        this.circulo_6.idAvion=6;

        this.circulo_7 = this.add.image(avion_3_Aliados.x-50,avion_3_Aliados.y-50,'circuloAvion').setScale(1.5);
        this.physics.world.enable(this.circulo_7);
        this.circulo_7.body.setCircle(config.Partida.configuraciones.avionRadioVision);
        this.circulo_7.idAvion=7;
 
        this.circulo_8 = this.add.image(avion_4_Aliados.x-50,avion_4_Aliados.y-50,'circuloAvion').setScale(1.5);
        this.physics.world.enable(this.circulo_8);
        this.circulo_8.body.setCircle(config.Partida.configuraciones.avionRadioVision);
        this.circulo_8.idAvion=8;

        this.circulo_bomba_grande = this.add.image(1,1,'circuloAvion').setScale(1.5);
        this.circulo_bomba_grande.setVisible(false);
        this.physics.world.enable(this.circulo_bomba_grande);
        this.circulo_bomba_grande.danio= config.Partida.configuraciones.bombaDanio;


        this.circulo_bomba_chico = this.add.image(1,1,'circuloAvion').setScale(1.5);
        this.circulo_bomba_chico.setVisible(false);
        this.physics.world.enable(this.circulo_bomba_chico);
        this.circulo_bomba_chico.danio= config.Partida.configuraciones.bombaDanio;
        
        //Se guardan las teclas cursor y se setea evento para cambiar altitud del avion
        this.keys = this.input.keyboard.createCursorKeys();
        this.keys.up.on('down',()=>
        {            
            if (avion_1.focus==true){ 
                
                if (timer1 == 0)
                {
                    if (!avion_1.saliBase)
                        {                
                            
                            avion_1.setScale(0.08);
                            avion_1.altitud ="Alta";
                            avion_1.body.setSize(180,180); 
                            timer1 = 100;
                        }
                    else{
                        avion_1.body.setSize(180,180);
                        avion_1.cambiarAltitud("Alta");
                        timer1 = 100;
                    }  
                    this.vistaLateral = this.add.image(45,113,'nubeslateral').setOrigin(0).setScale(1);
                    if(avion_1.tengobomba){
                        this.avionVistaLateral = this.add.image(100,240,'avionBombaLateral').setOrigin(0).setScale(.7);
                    }
                    else{
                        this.avionVistaLateral = this.add.image(100,240,'Nieuport_28C1Lateral').setOrigin(0).setScale(.7);
                    }
                    this.vistaLateral.depth = 100;
                    this.avionVistaLateral.depth =100;
                    config.Partida.sincronizar({tipoOp:"sincronizarAltitudAvion", idavion:1, altitud:"Alta"});     
                }           
            }
            if (avion_2.focus==true){      
                if (timer2 == 0)
                {
                    if (!avion_2.saliBase)
                        {                
                            avion_2.setScale(0.08);
                            avion_2.altitud ="Alta";
                            avion_2.body.setSize(300,300); 
                            timer2 = 100;
                    }
                    else{
                        avion_2.body.setSize(300,300); 
                        avion_2.cambiarAltitud("Alta");  
                        timer2 = 100;
                    }    
                    
                    this.vistaLateral = this.add.image(45,113,'nubeslateral').setOrigin(0).setScale(1);             
                    if(avion_2.tengobomba){
                        this.avionVistaLateral = this.add.image(100,240,'avionBombaLateral').setOrigin(0).setScale(.7);
                    }
                    else{
                        this.avionVistaLateral = this.add.image(100,240,'Nieuport_28C1Lateral').setOrigin(0).setScale(.7);
                    }
                    
                    this.vistaLateral.depth = 100;
                    this.avionVistaLateral.depth =100;
                     config.Partida.sincronizar({tipoOp:"sincronizarAltitudAvion", idavion:2, altitud:"Alta"});                          
                }            

            }
            if (avion_3.focus==true){
                if (timer3 == 0)
                {
                    timer3 = 100;
                    if (!avion_3.saliBase)
                    {                
                        avion_3.setScale(0.08);
                        avion_3.altitud ="Alta";
                        avion_3.body.setSize(180,180); 
                        timer3 = 100;
                    }
                    else{
                        avion_3.cambiarAltitud("Alta");
                        avion_3.body.setSize(180,180); 
                        timer3 = 100;
                    }  
                    
                    this.vistaLateral = this.add.image(45,113,'nubeslateral').setOrigin(0).setScale(1);
                    if(avion_3.tengobomba){
                        this.avionVistaLateral = this.add.image(100,240,'avionBombaLateral').setOrigin(0).setScale(.7);
                    }
                    else{
                        this.avionVistaLateral = this.add.image(100,240,'Nieuport_28C1Lateral').setOrigin(0).setScale(.7);
                    }    
                    this.vistaLateral.depth = 100;
                    this.avionVistaLateral.depth =100;     
                    config.Partida.sincronizar({tipoOp:"sincronizarAltitudAvion", idavion:3, altitud:"Alta"});                         
                } 

            }
            if (avion_4.focus==true){
                if (timer4 == 0)
                {
                    if (!avion_4.saliBase)
                    {                
                        avion_4.setScale(0.08);
                        avion_4.altitud ="Alta";
                        avion_4.body.setSize(180,180); 
                        timer4 = 100;
                    }
                    else{
                        avion_4.cambiarAltitud("Alta"); 
                        avion_4.body.setSize(180,180); 
                        timer4 = 100; 
                    }
                    this.vistaLateral = this.add.image(45,113,'nubeslateral').setOrigin(0).setScale(1);
                    if(avion_4.tengobomba){
                        this.avionVistaLateral = this.add.image(100,240,'avionBombaLateral').setOrigin(0).setScale(.7);
                    }
                    else{
                        this.avionVistaLateral = this.add.image(100,240,'Nieuport_28C1Lateral').setOrigin(0).setScale(.7);
                    }
                    this.vistaLateral.depth = 100;
                    this.avionVistaLateral.depth =100; 
                    config.Partida.sincronizar({tipoOp:"sincronizarAltitudAvion", idavion:4, altitud:"Alta"});                                  
                }

            }   
            if (avion_1_Aliados.focus==true){
                if (timer1 == 0)
                {
                    if (!avion_1_Aliados.saliBase)
                    {                
                        avion_1_Aliados.setScale(0.08);
                        avion_1_Aliados.altitud ="Alta";
                        avion_1_Aliados.body.setSize(180,180);  
                        timer1 = 100;
                    }
                    else{
                        avion_1_Aliados.cambiarAltitud("Alta"); 
                        avion_1_Aliados.body.setSize(180,180);  
                        timer1 = 100;
                    }
                    this.vistaLateral = this.add.image(45,113,'nubeslateral').setOrigin(0).setScale(1);
                    if(avion_1_Aliados.tengobomba){
                        this.avionVistaLateral = this.add.image(100,240,'avionBombaLateral').setOrigin(0).setScale(.7);
                    }
                    else{
                        this.avionVistaLateral = this.add.image(100,240,'Nieuport_28C1Lateral').setOrigin(0).setScale(.7);
                    }  
                    this.vistaLateral.depth = 100;
                    this.avionVistaLateral.depth =100;   
                    config.Partida.sincronizar({tipoOp:"sincronizarAltitudAvion", idavion:5, altitud:"Alta"});                                
                }
            }
            if (avion_2_Aliados.focus==true){
                if (timer2 == 0)
                {
                    if (!avion_2_Aliados.saliBase)
                    {                
                        avion_2_Aliados.setScale(0.08);
                        avion_2_Aliados.altitud ="Alta";
                        avion_2_Aliados.body.setSize(180,180);  
                        timer2 = 100;
                    }
                    else{
                        avion_2_Aliados.cambiarAltitud("Alta");
                        avion_2_Aliados.body.setSize(180,180); 
                        timer2 = 100; 
                    }
                    this.vistaLateral = this.add.image(45,113,'nubeslateral').setOrigin(0).setScale(1);
                    if(avion_2_Aliados.tengobomba){
                        this.avionVistaLateral = this.add.image(100,240,'avionBombaLateral').setOrigin(0).setScale(.7);
                    }
                    else{
                        this.avionVistaLateral = this.add.image(100,240,'Nieuport_28C1Lateral').setOrigin(0).setScale(.7);
                    }
                    this.vistaLateral.depth = 100;
                    this.avionVistaLateral.depth =100;   
                    config.Partida.sincronizar({tipoOp:"sincronizarAltitudAvion", idavion:6, altitud:"Alta"});                                  
                } 
            }
            if (avion_3_Aliados.focus==true){
                if (timer3 == 0)
                {
                    if (!avion_3_Aliados.saliBase)
                    {                
                        avion_3_Aliados.setScale(0.08);
                        avion_3_Aliados.altitud ="Alta";
                        avion_3_Aliados.body.setSize(180,180); 
                        timer3 = 100; 
                    }
                    else{ 
                        avion_3_Aliados.cambiarAltitud("Alta");
                        avion_3_Aliados.body.setSize(180,180);  
                        timer3 = 100;
                    } 
                    this.vistaLateral = this.add.image(45,113,'nubeslateral').setOrigin(0).setScale(1);
                    if(avion_3_Aliados.tengobomba){
                        this.avionVistaLateral = this.add.image(100,240,'avionBombaLateral').setOrigin(0).setScale(.7);
                    }
                    else{
                        this.avionVistaLateral = this.add.image(100,240,'Nieuport_28C1Lateral').setOrigin(0).setScale(.7);
                    }
                    this.vistaLateral.depth = 100;
                    this.avionVistaLateral.depth =100;   
                    config.Partida.sincronizar({tipoOp:"sincronizarAltitudAvion", idavion:7, altitud:"Alta"});                                 
                }
            }
            if (avion_4_Aliados.focus==true){
                if (timer4 == 0)
                {
                    if (!avion_4_Aliados.saliBase)
                    {                
                        avion_4_Aliados.setScale(0.08);
                        avion_4_Aliados.altitud ="Alta";
                        avion_4_Aliados.body.setSize(180,180);  
                        timer4 = 100;
                    }
                    else{
                        avion_4_Aliados.cambiarAltitud("Alta"); 
                        avion_4_Aliados.body.setSize(180,180);  
                        timer4 = 100;
                    }  
                    this.vistaLateral = this.add.image(45,113,'nubeslateral').setOrigin(0).setScale(1);
                    if(avion_4_Aliados.tengobomba){
                        this.avionVistaLateral = this.add.image(100,240,'avionBombaLateral').setOrigin(0).setScale(.7);
                    }
                    else{
                        this.avionVistaLateral = this.add.image(100,240,'Nieuport_28C1Lateral').setOrigin(0).setScale(.7);
                    }
                    this.vistaLateral.depth = 100;
                    this.avionVistaLateral.depth =100;  
                    config.Partida.sincronizar({tipoOp:"sincronizarAltitudAvion", idavion:8, altitud:"Alta"});                                
                }
            }
        });

        this.keys.down.on('down',()=>
        {            
            if (avion_1.focus==true){
                if (timer1 == 0)
                {
                    if (!avion_1.saliBase)
                        {                
                            avion_1.setScale(0.05);
                            avion_1.altitud ="Baja";
                            avion_1.body.setSize(300,300); 
                            timer1 = 100;
                        }
                    else{    
                        avion_1.cambiarAltitud("Baja"); 
                        avion_1.body.setSize(300,300); 
                        timer1 = 100;
                }         
                this.vistaLateral = this.add.image(45,113,'vistaLateralBaja').setOrigin(0).setScale(1);
                if(avion_1.tengobomba){
                    this.avionVistaLateral = this.add.image(100,240,'avionBombaLateral').setOrigin(0).setScale(.7);
                }
                else{
                    this.avionVistaLateral = this.add.image(100,240,'Nieuport_28C1Lateral').setOrigin(0).setScale(.7);
                }
                this.vistaLateral.depth = 100;
                this.avionVistaLateral.depth =100;       
                config.Partida.sincronizar({tipoOp:"sincronizarAltitudAvion", idavion:1, altitud:"Baja"});                  
            } 
            }
            if (avion_2.focus==true){
                if (timer2 ==0)
                {
                    if (!avion_2.saliBase)
                    {                
                        avion_2.setScale(0.05);
                        avion_2.altitud ="Baja";
                        avion_2.body.setSize(300,300); 
                        timer2 = 100;  
                    }
                    else{ 
                        avion_2.cambiarAltitud("Baja"); 
                        avion_2.body.setSize(300,300); 
                        timer2 = 100;   
                    }  
                    this.vistaLateral = this.add.image(45,113,'vistaLateralBaja').setOrigin(0).setScale(1);
                    if(avion_2.tengobomba){
                        this.avionVistaLateral = this.add.image(100,240,'avionBombaLateral').setOrigin(0).setScale(.7);
                    }
                    else{
                        this.avionVistaLateral = this.add.image(100,240,'Nieuport_28C1Lateral').setOrigin(0).setScale(.7);
                    }
                    this.vistaLateral.depth = 100;
                    this.avionVistaLateral.depth =100;            
                    config.Partida.sincronizar({tipoOp:"sincronizarAltitudAvion", idavion:2, altitud:"Baja"});                    
                }

            }
            if (avion_3.focus==true){
                if (timer3 == 0)
                {
                    if (!avion_3.saliBase)
                    {                
                        avion_3.setScale(0.05);
                        avion_3.altitud ="Baja";
                        avion_3.body.setSize(300,300); 
                        timer3 = 100;
                    }
                    else{
                        avion_3.cambiarAltitud("Baja");
                        avion_3.body.setSize(300,300);   
                        timer3 = 100;
                    }    
                    this.vistaLateral = this.add.image(45,113,'vistaLateralBaja').setOrigin(0).setScale(1);
                    if(avion_3.tengobomba){
                        this.avionVistaLateral = this.add.image(100,240,'avionBombaLateral').setOrigin(0).setScale(.7);
                    }
                    else{
                        this.avionVistaLateral = this.add.image(100,240,'Nieuport_28C1Lateral').setOrigin(0).setScale(.7);
                    }
                    this.vistaLateral.depth = 100;
                    this.avionVistaLateral.depth =100;     
                    config.Partida.sincronizar({tipoOp:"sincronizarAltitudAvion", idavion:3, altitud:"Baja"});                          
                }

            }
            if (avion_4.focus==true){
                if (timer4 == 0)
                {
                    if (!avion_4.saliBase)
                    {                
                        avion_4.setScale(0.05);
                        avion_4.altitud ="Baja";
                        avion_4.body.setSize(300,300); 
                        timer4 = 100;  
                    }
                    else{
                        avion_4.cambiarAltitud("Baja"); 
                        avion_4.body.setSize(300,300);
                        timer4 = 100;   
                    }  
                    this.vistaLateral = this.add.image(45,113,'vistaLateralBaja').setOrigin(0).setScale(1);
                    if(avion_4.tengobomba){
                        this.avionVistaLateral = this.add.image(100,240,'avionBombaLateral').setOrigin(0).setScale(.7);
                    }
                    else{
                        this.avionVistaLateral = this.add.image(100,240,'Nieuport_28C1Lateral').setOrigin(0).setScale(.7);
                    }
                    this.vistaLateral.depth = 100;
                    this.avionVistaLateral.depth =100;     
                    config.Partida.sincronizar({tipoOp:"sincronizarAltitudAvion", idavion:4, altitud:"Baja"}); 
                                               
                }


            } 
            if (avion_1_Aliados.focus==true){
                if (timer1 == 0)
                {
                    if (!avion_1_Aliados.saliBase)
                    {                
                        avion_1_Aliados.setScale(0.05);
                        avion_1_Aliados.altitud ="Baja";
                        avion_1_Aliados.body.setSize(300,300); 
                        timer1 = 100; 
                    }
                    else{
                        avion_1_Aliados.cambiarAltitud("Baja"); 
                        avion_1_Aliados.body.setSize(300,300);    
                        timer1 = 100;
                    } 
                    this.vistaLateral = this.add.image(45,113,'vistaLateralBaja').setOrigin(0).setScale(1);
                    if(avion_1_Aliados.tengobomba){
                        this.avionVistaLateral = this.add.image(100,240,'avionBombaLateral').setOrigin(0).setScale(.7);
                    }
                    else{
                        this.avionVistaLateral = this.add.image(100,240,'Nieuport_28C1Lateral').setOrigin(0).setScale(.7);
                    }
                    this.vistaLateral.depth = 100;
                    this.avionVistaLateral.depth =100;   
                    config.Partida.sincronizar({tipoOp:"sincronizarAltitudAvion", idavion:5, altitud:"Baja"});                               
                }
            }
            if (avion_2_Aliados.focus==true){
                if (timer2 == 0)
                {
                    if (!avion_2_Aliados.saliBase)
                    {                
                        avion_2_Aliados.setScale(0.05);
                        avion_2_Aliados.altitud ="Baja";
                        avion_2_Aliados.body.setSize(300,300);  
                        timer2 = 100;
                    }
                    else{
                        avion_2_Aliados.cambiarAltitud("Baja");
                        avion_2_Aliados.body.setSize(300,300);  
                        timer2 = 100;
                    }         
                    this.vistaLateral = this.add.image(45,113,'vistaLateralBaja').setOrigin(0).setScale(1);
                    if(avion_2_Aliados.tengobomba){
                        this.avionVistaLateral = this.add.image(100,240,'avionBombaLateral').setOrigin(0).setScale(.7);
                    }
                    else{
                        this.avionVistaLateral = this.add.image(100,240,'Nieuport_28C1Lateral').setOrigin(0).setScale(.7);
                    }
                    this.vistaLateral.depth = 100;
                    this.avionVistaLateral.depth =100;    
                    config.Partida.sincronizar({tipoOp:"sincronizarAltitudAvion", idavion:6, altitud:"Baja"});                        
                }
            }
            if (avion_3_Aliados.focus==true){
                if (timer3 == 0)
                {
                    if (!avion_3_Aliados.saliBase)
                    {                
                        avion_3_Aliados.setScale(0.05);
                        avion_3_Aliados.altitud ="Baja";
                        avion_3_Aliados.body.setSize(300,300);
                        timer3 = 100;
                    }
                    else{
                        avion_3_Aliados.cambiarAltitud("Baja");
                        avion_3_Aliados.body.setSize(300,300); 
                        timer3 = 100;
                    }   
                    this.vistaLateral = this.add.image(45,113,'vistaLateralBaja').setOrigin(0).setScale(1);
                    if(avion_3_Aliados.tengobomba){
                        this.avionVistaLateral = this.add.image(100,240,'avionBombaLateral').setOrigin(0).setScale(.7);
                    }
                    else{
                        this.avionVistaLateral = this.add.image(100,240,'Nieuport_28C1Lateral').setOrigin(0).setScale(.7);
                    }
                    this.vistaLateral.depth = 100;
                    this.avionVistaLateral.depth =100;              
                    config.Partida.sincronizar({tipoOp:"sincronizarAltitudAvion", idavion:7, altitud:"Baja"});                 
                }
            }
            if (avion_4_Aliados.focus==true){ 
                if (timer4 == 0)
                {
                    if (!avion_4_Aliados.saliBase)
                    {                
                        avion_4_Aliados.setScale(0.05);
                        avion_4_Aliados.altitud ="Baja";
                        avion_4_Aliados.body.setSize(300,300);
                        timer4 = 100;
                    }
                    else{
                        avion_4_Aliados.cambiarAltitud("Baja");
                        avion_4_Aliados.body.setSize(300,300); 
                        timer4 = 100; 
                    }       
                    this.vistaLateral = this.add.image(45,113,'vistaLateralBaja').setOrigin(0).setScale(1);
                    if(avion_4_Aliados.tengobomba){
                        this.avionVistaLateral = this.add.image(100,240,'avionBombaLateral').setOrigin(0).setScale(.7);
                    }
                    else{
                        this.avionVistaLateral = this.add.image(100,240,'Nieuport_28C1Lateral').setOrigin(0).setScale(.7);
                    }
                    this.vistaLateral.depth = 100;
                    this.avionVistaLateral.depth =100;   
                    config.Partida.sincronizar({tipoOp:"sincronizarAltitudAvion", idavion:8, altitud:"Baja"});                         
                }
            }   
        });

        //Evento para disparo de bomba disparado por el jugador al apretar espacio
        this.keys.space.on('down',()=>
        {          
            this.circulo_bomba_chico.body.setCircle(config.Partida.configuraciones.bombaRadioImpacto/2);
            this.circulo_bomba_chico.body.setOffset(40,40); 

            this.circulo_bomba_grande.body.setCircle(config.Partida.configuraciones.bombaRadioImpacto);
            this.circulo_bomba_grande.body.setOffset(25,25);

            if (avion_1.focus==true && avion_1.tengobomba){ 
                this.circulo_bomba_chico.setPosition(avion_1.x, avion_1.y); 
                this.circulo_bomba_grande.setPosition(avion_1.x, avion_1.y); 
                this.cargarBomba1.clearTint()
                this.vistaLateral = this.add.image(45,113,'vistaLateralBaja').setOrigin(0).setScale(1);
                this.vistaLateral.depth =100;   
                this.avionVistaLateral = this.add.image(100,240,'Nieuport_28C1Lateral').setOrigin(0).setScale(.7); 
                this.avionVistaLateral.depth =100;            
                avion_1.tengobomba=false;
                config.Partida.sincronizar({tipoOp:"sincronizarBombaAvion", idavion:1, bomba: false});
                avion_1.soltarBomba();
                this.sonidoBomba.play();
            } 

            if (avion_2.focus==true && avion_2.tengobomba){ 
                this.circulo_bomba_chico.setPosition(avion_2.x, avion_2.y);
                this.circulo_bomba_grande.setPosition(avion_2.x, avion_2.y);                 
                this.cargarBomba2.clearTint()
                this.vistaLateral = this.add.image(45,113,'vistaLateralBaja').setOrigin(0).setScale(1);
                this.avionVistaLateral = this.add.image(100,240,'Nieuport_28C1Lateral').setOrigin(0).setScale(.7);
                this.vistaLateral.depth =100;   
                this.avionVistaLateral.depth =100; 
                avion_2.tengobomba=false;
                config.Partida.sincronizar({tipoOp:"sincronizarBombaAvion", idavion:2, bomba: false});
                avion_2.soltarBomba();
                this.sonidoBomba.play();
            }

            if (avion_3.focus==true && avion_3.tengobomba){
                this.circulo_bomba_chico.setPosition(avion_3.x, avion_3.y); 
                this.circulo_bomba_grande.setPosition(avion_3.x, avion_3.y);                 
                this.cargarBomba3.clearTint()
                this.vistaLateral = this.add.image(45,113,'vistaLateralBaja').setOrigin(0).setScale(1);
                this.avionVistaLateral = this.add.image(100,240,'Nieuport_28C1Lateral').setOrigin(0).setScale(.7);
                this.vistaLateral.depth =100;   
                this.avionVistaLateral.depth =100; 
                avion_3.tengobomba=false;
                config.Partida.sincronizar({tipoOp:"sincronizarBombaAvion", idavion:3, bomba: false});
                avion_3.soltarBomba();
                this.sonidoBomba.play();
            }
            if (avion_4.focus==true && avion_4.tengobomba){
                this.circulo_bomba_chico.setPosition(avion_4.x, avion_4.y); 
                this.circulo_bomba_grande.setPosition(avion_4.x, avion_4.y);
                this.cargarBomba4.clearTint()
                this.vistaLateral = this.add.image(45,113,'vistaLateralBaja').setOrigin(0).setScale(1);
                this.avionVistaLateral = this.add.image(100,240,'Nieuport_28C1Lateral').setOrigin(0).setScale(.7);
                this.vistaLateral.depth =100;   
                this.avionVistaLateral.depth =100; 
                avion_4.tengobomba=false;
                config.Partida.sincronizar({tipoOp:"sincronizarBombaAvion", idavion:4, bomba: false});
                avion_4.soltarBomba();
                this.sonidoBomba.play();
            } 
            if (avion_1_Aliados.focus==true && avion_1_Aliados.tengobomba){
                this.circulo_bomba_chico.setPosition(avion_1_Aliados.x, avion_1_Aliados.y); 
                this.circulo_bomba_grande.setPosition(avion_1_Aliados.x, avion_1_Aliados.y);                
                this.cargarBomba1.clearTint()
                this.vistaLateral = this.add.image(45,113,'vistaLateralBaja').setOrigin(0).setScale(1);
                this.avionVistaLateral = this.add.image(100,240,'Nieuport_28C1Lateral').setOrigin(0).setScale(.7);
                this.vistaLateral.depth =100;   
                this.avionVistaLateral.depth =100; 
                avion_1_Aliados.tengobomba=false;
                config.Partida.sincronizar({tipoOp:"sincronizarBombaAvion", idavion:5, bomba: false});
                avion_1_Aliados.soltarBomba();
                this.sonidoBomba.play();
            }
            if (avion_2_Aliados.focus==true && avion_2_Aliados.tengobomba){
                this.circulo_bomba_chico.setPosition(avion_2_Aliados.x, avion_2_Aliados.y); 
                this.circulo_bomba_grande.setPosition(avion_2_Aliados.x, avion_2_Aliados.y);                 
                this.cargarBomba2.clearTint()
                this.vistaLateral = this.add.image(45,113,'vistaLateralBaja').setOrigin(0).setScale(1);
                this.avionVistaLateral = this.add.image(100,240,'Nieuport_28C1Lateral').setOrigin(0).setScale(.7);
                this.vistaLateral.depth =100;   
                this.avionVistaLateral.depth =100; 
                avion_2_Aliados.tengobomba=false;
                config.Partida.sincronizar({tipoOp:"sincronizarBombaAvion", idavion:6, bomba: false});
                avion_2_Aliados.soltarBomba();
                this.sonidoBomba.play();
            }
            if (avion_3_Aliados.focus==true && avion_3_Aliados.tengobomba){
                this.circulo_bomba_chico.setPosition(avion_3_Aliados.x, avion_3_Aliados.y); 
                this.circulo_bomba_grande.setPosition(avion_3_Aliados.x, avion_3_Aliados.y);                
                this.cargarBomba3.clearTint()
                this.vistaLateral = this.add.image(45,113,'vistaLateralBaja').setOrigin(0).setScale(1);
                this.avionVistaLateral = this.add.image(100,240,'Nieuport_28C1Lateral').setOrigin(0).setScale(.7);
                this.vistaLateral.depth =100;   
                this.avionVistaLateral.depth =100; 
                avion_3_Aliados.tengobomba=false;
                config.Partida.sincronizar({tipoOp:"sincronizarBombaAvion", idavion:7, bomba: false});
                avion_3_Aliados.soltarBomba();
                this.sonidoBomba.play();
            }
            if (avion_4_Aliados.focus==true && avion_4_Aliados.tengobomba){
                this.circulo_bomba_chico.setPosition(avion_4_Aliados.x, avion_4_Aliados.y);
                this.circulo_bomba_grande.setPosition(avion_4_Aliados.x, avion_4_Aliados.y);                
                this.cargarBomba4.clearTint()
                this.vistaLateral = this.add.image(45,113,'vistaLateralBaja').setOrigin(0).setScale(1);
                this.avionVistaLateral = this.add.image(100,240,'Nieuport_28C1Lateral').setOrigin(0).setScale(.7);
                this.vistaLateral.depth =100;   
                this.avionVistaLateral.depth =100; 
                avion_4_Aliados.tengobomba=false;
                config.Partida.sincronizar({tipoOp:"sincronizarBombaAvion", idavion:8, bomba: false});
                avion_4_Aliados.soltarBomba();
                this.sonidoBomba.play();
            }     
        });

        //Evento que escucha que tecla se presiona y reacciona a los numeros 1 al 4 para setear el focus de los aviones
        this.input.keyboard.on('keydown',(evento)=>{
            if (config.Partida.Bando=='Potencias')
            {
                if (evento.key==='1' && avion_1.vidaAvion > 0)  
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

                    // Segun su altitud es la imagen lateral que se muestra
                    if (avion_1.altitud == 'Baja')
                        {
                            this.vistaLateral = this.add.image(45,113,'vistaLateralBaja').setOrigin(0).setScale(1);
                            if(avion_1.tengobomba){
                                this.avionVistaLateral = this.add.image(100,240,'avionBombaLateral').setOrigin(0).setScale(.7);
                            }
                            else{
                                this.avionVistaLateral = this.add.image(100,240,'Nieuport_28C1Lateral').setOrigin(0).setScale(.7);
                            }
                            this.vistaLateral.depth = 100;
                            this.avionVistaLateral.depth =100;
                        }
                    if (avion_1.altitud == 'Alta')
                    {
                        this.vistaLateral = this.add.image(45,113,'nubeslateral').setOrigin(0).setScale(1);
                        if(avion_1.tengobomba){
                            this.avionVistaLateral = this.add.image(100,240,'avionBombaLateral').setOrigin(0).setScale(.7);
                        }
                        else{
                            this.avionVistaLateral = this.add.image(100,240,'Nieuport_28C1Lateral').setOrigin(0).setScale(.7);
                        }
                        this.vistaLateral.depth = 100;
                        this.avionVistaLateral.depth =100;
                    }
                    if (avion_1.altitud == 'EnBase' || avion_1.altitud == 'Inicial' )
                    {
                        this.vistaLateral = this.add.image(45,113,'vistaLateralEnBase').setOrigin(0).setScale(1);
                        this.vistaLateral.depth = 100;
                    }
                }
                if (evento.key==='2' && avion_2.vidaAvion > 0)  
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
                    if (avion_2.altitud == 'Baja')
                        {
                            this.vistaLateral = this.add.image(45,113,'vistaLateralBaja').setOrigin(0).setScale(1);
                            if(avion_2.tengobomba){
                                this.avionVistaLateral = this.add.image(100,240,'avionBombaLateral').setOrigin(0).setScale(.7);
                            }
                            else{
                                this.avionVistaLateral = this.add.image(100,240,'Nieuport_28C1Lateral').setOrigin(0).setScale(.7);
                            }
                            this.vistaLateral.depth = 100;
                            this.avionVistaLateral.depth =100;
                        }
                    if (avion_2.altitud == 'Alta')
                    {
                        this.vistaLateral = this.add.image(45,113,'nubeslateral').setOrigin(0).setScale(1);
                        if(avion_2.tengobomba){
                            this.avionVistaLateral = this.add.image(100,240,'avionBombaLateral').setOrigin(0).setScale(.7);
                        }
                        else{
                            this.avionVistaLateral = this.add.image(100,240,'Nieuport_28C1Lateral').setOrigin(0).setScale(.7);
                        }
                        this.vistaLateral.depth = 100;
                        this.avionVistaLateral.depth =100;
                    }
                    if (avion_2.altitud == 'EnBase'  || avion_2.altitud == 'Inicial')
                    {
                        this.vistaLateral = this.add.image(45,113,'vistaLateralEnBase').setOrigin(0).setScale(1);
                        this.vistaLateral.depth = 100;
                    }
                }
                if (evento.key==='3' && avion_3.vidaAvion > 0)  
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
                    if (avion_3.altitud == 'Baja')
                        {
                            this.vistaLateral = this.add.image(45,113,'vistaLateralBaja').setOrigin(0).setScale(1);
                            if(avion_3.tengobomba){
                                this.avionVistaLateral = this.add.image(100,240,'avionBombaLateral').setOrigin(0).setScale(.7);
                            }
                            else{
                                this.avionVistaLateral = this.add.image(100,240,'Nieuport_28C1Lateral').setOrigin(0).setScale(.7);
                            }
                            this.vistaLateral.depth = 100;
                            this.avionVistaLateral.depth =100;
                        }
                    if (avion_3.altitud == 'Alta')
                    {
                        this.vistaLateral = this.add.image(45,113,'nubeslateral').setOrigin(0).setScale(1);
                        if(avion_3.tengobomba){
                            this.avionVistaLateral = this.add.image(100,240,'avionBombaLateral').setOrigin(0).setScale(.7);
                        }
                        else{
                            this.avionVistaLateral = this.add.image(100,240,'Nieuport_28C1Lateral').setOrigin(0).setScale(.7);
                        }
                        this.vistaLateral.depth = 100;
                        this.avionVistaLateral.depth =100;
                    }
                    if (avion_3.altitud == 'EnBase'  || avion_3.altitud == 'Inicial')
                    {
                        this.vistaLateral = this.add.image(45,113,'vistaLateralEnBase').setOrigin(0).setScale(1);
                        this.vistaLateral.depth = 100;
                    }
                }
                if (evento.key==='4' && avion_4.vidaAvion > 0)  
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
                     if (avion_4.altitud == 'Baja')
                         {
                             this.vistaLateral = this.add.image(45,113,'vistaLateralBaja').setOrigin(0).setScale(1);
                             if(avion_4.tengobomba){
                                this.avionVistaLateral = this.add.image(100,240,'avionBombaLateral').setOrigin(0).setScale(.7);
                            }
                            else{
                                this.avionVistaLateral = this.add.image(100,240,'Nieuport_28C1Lateral').setOrigin(0).setScale(.7);
                            }
                             this.vistaLateral.depth = 100;
                             this.avionVistaLateral.depth =100;
                         }
                     if (avion_4.altitud == 'Alta')
                     {
                         this.vistaLateral = this.add.image(45,113,'nubeslateral').setOrigin(0).setScale(1);
                         if(avion_4.tengobomba){
                            this.avionVistaLateral = this.add.image(100,240,'avionBombaLateral').setOrigin(0).setScale(.7);
                        }
                        else{
                            this.avionVistaLateral = this.add.image(100,240,'Nieuport_28C1Lateral').setOrigin(0).setScale(.7);
                        }
                         this.vistaLateral.depth = 100;
                         this.avionVistaLateral.depth =100;
                     }
                     if (avion_4.altitud == 'EnBase'  || avion_4.altitud == 'Inicial')
                     {
                         this.vistaLateral = this.add.image(45,113,'vistaLateralEnBase').setOrigin(0).setScale(1);
                         this.vistaLateral.depth = 100;
                     }
                }                        
            } 
            else
            { 
                if (evento.key==='1' && avion_1_Aliados.vidaAvion > 0)  
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
                    // Segun su altitud es la imagen lateral que se muestra
                    if (avion_1_Aliados.altitud == 'Baja')
                        {
                            this.vistaLateral = this.add.image(45,113,'vistaLateralBaja').setOrigin(0).setScale(1);
                            if(avion_1_Aliados.tengobomba){
                                this.avionVistaLateral = this.add.image(100,240,'avionBombaLateral').setOrigin(0).setScale(.7);
                            }
                            else{
                                this.avionVistaLateral = this.add.image(100,240,'Nieuport_28C1Lateral').setOrigin(0).setScale(.7);
                            }
                            this.vistaLateral.depth = 100;
                            this.avionVistaLateral.depth =100;
                        }
                    if (avion_1_Aliados.altitud == 'Alta')
                    {
                        this.vistaLateral = this.add.image(45,113,'nubeslateral').setOrigin(0).setScale(1);
                        if(avion_1_Aliados.tengobomba){
                            this.avionVistaLateral = this.add.image(100,240,'avionBombaLateral').setOrigin(0).setScale(.7);
                        }
                        else{
                            this.avionVistaLateral = this.add.image(100,240,'Nieuport_28C1Lateral').setOrigin(0).setScale(.7);
                        }
                        this.vistaLateral.depth = 100;
                        this.avionVistaLateral.depth =100;
                    }
                    if (avion_1_Aliados.altitud == 'EnBase' || avion_1_Aliados.altitud == 'Inicial')
                    {
                        this.vistaLateral = this.add.image(45,113,'vistaLateralEnBase').setOrigin(0).setScale(1);
                        this.vistaLateral.depth = 100;
                    }
                }
                if (evento.key==='2' && avion_2_Aliados.vidaAvion > 0)   
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
                     // Segun su altitud es la imagen lateral que se muestra
                     if (avion_2_Aliados.altitud == 'Baja')
                         {
                             this.vistaLateral = this.add.image(45,113,'vistaLateralBaja').setOrigin(0).setScale(1);
                             if(avion_2_Aliados.tengobomba){
                                this.avionVistaLateral = this.add.image(100,240,'avionBombaLateral').setOrigin(0).setScale(.7);
                            }
                            else{
                                this.avionVistaLateral = this.add.image(100,240,'Nieuport_28C1Lateral').setOrigin(0).setScale(.7);
                            }
                             this.vistaLateral.depth = 100;
                             this.avionVistaLateral.depth =100;
                         }
                    if (avion_2_Aliados.altitud == 'Alta')
                    {
                        this.vistaLateral = this.add.image(45,113,'nubeslateral').setOrigin(0).setScale(1);
                        if(avion_2_Aliados.tengobomba){
                        this.avionVistaLateral = this.add.image(100,240,'avionBombaLateral').setOrigin(0).setScale(.7);
                        }
                        else{
                            this.avionVistaLateral = this.add.image(100,240,'Nieuport_28C1Lateral').setOrigin(0).setScale(.7);
                        }
                        this.vistaLateral.depth = 100;
                        this.avionVistaLateral.depth =100;
                    }
                    if (avion_2_Aliados.altitud == 'EnBase' || avion_2_Aliados.altitud == 'Inicial')
                    {
                        this.vistaLateral = this.add.image(45,113,'vistaLateralEnBase').setOrigin(0).setScale(1);
                        this.vistaLateral.depth = 100;
                    }
                }
                if (evento.key==='3' && avion_3_Aliados.vidaAvion > 0)  
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
                    // Segun su altitud es la imagen lateral que se muestra
                    if (avion_3_Aliados.altitud == 'Baja')
                        {
                            this.vistaLateral = this.add.image(45,113,'vistaLateralBaja').setOrigin(0).setScale(1);
                            if(avion_3_Aliados.tengobomba){
                                this.avionVistaLateral = this.add.image(100,240,'avionBombaLateral').setOrigin(0).setScale(.7);
                            }
                            else{
                                this.avionVistaLateral = this.add.image(100,240,'Nieuport_28C1Lateral').setOrigin(0).setScale(.7);
                            }
                            this.vistaLateral.depth = 100;
                            this.avionVistaLateral.depth =100;
                        }
                    if (avion_3_Aliados.altitud == 'Alta')
                    {
                        this.vistaLateral = this.add.image(45,113,'nubeslateral').setOrigin(0).setScale(1);
                        if(avion_3_Aliados.tengobomba){
                            this.avionVistaLateral = this.add.image(100,240,'avionBombaLateral').setOrigin(0).setScale(.7);
                        }
                        else{
                            this.avionVistaLateral = this.add.image(100,240,'Nieuport_28C1Lateral').setOrigin(0).setScale(.7);
                        }
                        this.vistaLateral.depth = 100;
                        this.avionVistaLateral.depth =100;
                    }
                    if (avion_3_Aliados.altitud == 'EnBase' || avion_3_Aliados.altitud == 'Inicial')
                    {
                        this.vistaLateral = this.add.image(45,113,'vistaLateralEnBase').setOrigin(0).setScale(1);
                        this.vistaLateral.depth = 100;
                    }
                }
                if (evento.key==='4' && avion_4_Aliados.vidaAvion > 0)  
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

                    // Segun su altitud es la imagen lateral que se muestra
                    if (avion_4_Aliados.altitud == 'Baja')
                        {
                            this.vistaLateral = this.add.image(45,113,'vistaLateralBaja').setOrigin(0).setScale(1);
                            if(avion_4_Aliados.tengobomba){
                                this.avionVistaLateral = this.add.image(100,240,'avionBombaLateral').setOrigin(0).setScale(.7);
                            }
                            else{
                                this.avionVistaLateral = this.add.image(100,240,'Nieuport_28C1Lateral').setOrigin(0).setScale(.7);
                            }
                            this.vistaLateral.depth = 100;
                            this.avionVistaLateral.depth =100;
                        }
                    if (avion_4_Aliados.altitud == 'Alta')
                    {
                        this.vistaLateral = this.add.image(45,113,'nubeslateral').setOrigin(0).setScale(1);
                        if(avion_4_Aliados.tengobomba){
                            this.avionVistaLateral = this.add.image(100,240,'avionBombaLateral').setOrigin(0).setScale(.7);
                        }
                        else{
                            this.avionVistaLateral = this.add.image(100,240,'Nieuport_28C1Lateral').setOrigin(0).setScale(.7);
                        }
                        this.vistaLateral.depth = 100;
                        this.avionVistaLateral.depth =100;
                    }
                    if (avion_4_Aliados.altitud == 'EnBase' || avion_4_Aliados.altitud == 'Inicial')
                    {
                        this.vistaLateral = this.add.image(45,113,'vistaLateralEnBase').setOrigin(0).setScale(1);
                        this.vistaLateral.depth = 100;
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
            this.contenedorExplosivosAliados.setVisible(false); 
            this.depositoCombustibleAliados.setVisible(false); 
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
            this.contenedorExplosivosPotencias.setVisible(false); 
            this.depositoCombustiblePotencias.setVisible(false); 
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
    lightAvion()
    {
        if (config.Partida.Bando=='Potencias')
        {
            if (this.EstaMoviendose(avion_1))
            {
                light1Bomba.setIntensity(0);
                light1.setIntensity(10);
                light1Bomba.x = avion_1.x;
                light1Bomba.y = avion_1.y;
                light1.x = avion_1.x;
                light1.y = avion_1.y;
                if (avion_1.tengobomba)  
                {  
                    light1Bomba.setIntensity(12);  
                    light1.setIntensity(5);  
                    light1Bomba.x = avion_1.x;  
                    light1Bomba.y = avion_1.y;  
                    light1.x = avion_1.x;  
                    light1.y = avion_1.y;  
                } 
            }
            if (this.EstaMoviendose(avion_2))
            {
                light2Bomba.setIntensity(0);
                light2.setIntensity(10);
                light2Bomba.x = avion_2.x;
                light2Bomba.y = avion_2.y;
                light2.x = avion_2.x;
                light2.y = avion_2.y;
                if (avion_2.tengobomba)  
                {  
                    light2Bomba.setIntensity(12);  
                    light2.setIntensity(5);  
                    light2Bomba.x = avion_2.x;
                    light2Bomba.y = avion_2.y;
                    light2.x = avion_2.x;
                    light2.y = avion_2.y;  
                }
            }
            if (this.EstaMoviendose(avion_3))
            {
                light3Bomba.setIntensity(0);
                light3.setIntensity(10);
                light3Bomba.x = avion_3.x;
                light3Bomba.y = avion_3.y;
                light3.x = avion_3.x;
                light3.y = avion_3.y;
                if (avion_3.tengobomba)
            {
                light3Bomba.setIntensity(12);
                light3.setIntensity(5);
                light3Bomba.x = avion_3.x;
                light3Bomba.y = avion_3.y;
                light3.x = avion_3.x;
                light3.y = avion_3.y;  
            }
                
            }
            if (this.EstaMoviendose(avion_4))
            {
                light4Bomba.setIntensity(0);
                light4.setIntensity(10);
                light4Bomba.x = avion_4.x;
                light4Bomba.y = avion_4.y;
                light4.x = avion_4.x;
                light4.y = avion_4.y;
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
                if (avion_1_Aliados.tengobomba)
                {
                    light1Bomba.setIntensity(12);
                    light1.setIntensity(5);
                    light1Bomba.x = avion_1_Aliados.x;
                    light1Bomba.y = avion_1_Aliados.y;
                    light1.x = avion_1_Aliados.x;
                    light1.y = avion_1_Aliados.y;
                }
            } 
            if (this.EstaMoviendose(avion_2_Aliados))
            {
                light2Bomba.setIntensity(0);
                light2.setIntensity(10);
                light2Bomba.x = avion_2_Aliados.x;
                light2Bomba.y = avion_2_Aliados.y;
                light2.x = avion_2_Aliados.x;
                light2.y = avion_2_Aliados.y;
                if (avion_2_Aliados.tengobomba)
            {
                light2Bomba.setIntensity(12);
                light2.setIntensity(5);
                light2Bomba.x = avion_2_Aliados.x;
                light2Bomba.y = avion_2_Aliados.y;
                light2.x = avion_2_Aliados.x;
                light2.y = avion_2_Aliados.y;
            }
            }
            if (this.EstaMoviendose(avion_3_Aliados))
            {
                light3Bomba.setIntensity(0);
                light3.setIntensity(10);
                light3Bomba.x = avion_3_Aliados.x;
                light3Bomba.y = avion_3_Aliados.y;
                light3.x = avion_3_Aliados.x;
                light3.y = avion_3_Aliados.y;
                if (avion_3_Aliados.tengobomba)
            {
                light3Bomba.setIntensity(12);
                light3.setIntensity(5);
                light3Bomba.x = avion_3_Aliados.x;
                light3Bomba.y = avion_3_Aliados.y;
                light3.x = avion_3_Aliados.x;
                light3.y = avion_3_Aliados.y;
            }
            }
            if (this.EstaMoviendose(avion_4_Aliados))
            {
                light4Bomba.setIntensity(0);
                light4.setIntensity(10);
                light4Bomba.x = avion_4_Aliados.x;
                light4Bomba.y = avion_4_Aliados.y;
                light4.x = avion_4_Aliados.x;
                light4.y = avion_4_Aliados.y;
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
    }
    //Funcion que chequea si un avion esta en la base o no, y si esta en la base y se llamo al cargar bomba o combustible, asigna los atributos necesarios 
    EstaMoviendose(avion)
    {
        difX= Math.abs(avion.x - avion.xInicial); 
        difY= Math.abs(avion.y - avion.yInicial);

        if (difX < 4 && difY < 4)
        {                                      
            if (avion.cargarbomba==true)
            {            
                avion.body.setVelocityY(0);
                avion.body.setVelocityX(0);    
                avion.cambiarAltitud('EnBase');    
                avion.saliBase=false;                      
                avion.cargarbomba=false;
                avion.tengobomba=true; 
                if(avion.focus){
                    this.avionVistaLateral = this.add.image(100,240,'avionBombaLateral').setOrigin(0).setScale(.7);
                    this.avionVistaLateral.depth = 100;
                } 
                this.circulo_bomba_chico.setPosition(1, 1); 
                this.circulo_bomba_grande.setPosition(1, 1);
                //habilito colision con circulo grande de la bomba    
                this.torreAliados.recibeBombaCirculoGrande=true; 
                this.torrePotencias.recibeBombaCirculoGrande=true;  
                this.contenedorExplosivosAliados.recibeBombaCirculoGrande=true;
                this.contenedorExplosivosPotencias.recibeBombaCirculoGrande=true;
                this.depositoCombustibleAliados.recibeBombaCirculoGrande=true;
                this.depositoCombustiblePotencias.recibeBombaCirculoGrande=true;
                //habilito colision con circulo chico de la bomba  
                this.torreAliados.recibeBombaCirculoChico=true; 
                this.torrePotencias.recibeBombaCirculoChico=true;  
                this.contenedorExplosivosAliados.recibeBombaCirculoChico=true;
                this.contenedorExplosivosPotencias.recibeBombaCirculoChico=true;
                this.depositoCombustibleAliados.recibeBombaCirculoChico=true;
                this.depositoCombustiblePotencias.recibeBombaCirculoChico=true;
                avion.velocidad=0;
            }
            if (avion.cargarCombustible==true)
            {
                if (avion.idavion==1 || avion.idavion==5)
                    this.volverBase1.clearTint(); 
                if (avion.idavion==2 || avion.idavion==6)
                    this.volverBase2.clearTint();  
                if (avion.idavion==3 || avion.idavion==7)
                    this.volverBase3.clearTint(); 
                if (avion.idavion==4 || avion.idavion==8)
                    this.volverBase4.clearTint();                
                avion.body.setVelocityY(0);
                avion.body.setVelocityX(0);  
                avion.saliBase=false;     
                this.altitud_anterior=avion.altitud;                     
                avion.cambiarAltitud('EnBase');                
                avion.cargarCombustible=false; 
                avion.velocidad=0;
            }            
            return false;
        }
        else
        {
            return true;
        }
                       
    }

    cambiarImagenAltitud(String)
    {
        if (String == 'Baja'){
           this.vistaLateral = this.add.image(45,113,'vistaLateralBaja').setOrigin(0).setScale(1);
            this.avionVistaLateral = this.add.image(100,240,'Nieuport_28C1Lateral').setOrigin(0).setScale(.7);
            this.vistaLateral.depth = 100;
            this.avionVistaLateral.depth = 100;
        }
    }
    //Funcion para controlar la visibilidad de los aviones cuando entran en el rango visible de otro avion
    MostrarOcultar(avion)
    {       
       
        if (config.Partida.Bando=='Aliados')
        { 
            dx = avion.x - avion_1_Aliados.x;
            dy = avion.y - avion_1_Aliados.y;
            distance = Math.sqrt(dx * dx + dy * dy); 
                    
            if (distance < 100 && avion_1_Aliados.vidaAvion>0)      
            {   
                return true;           
            } 
            
            dx = avion.x - avion_2_Aliados.x;
            dy = avion.y - avion_2_Aliados.y;
            distance = Math.sqrt(dx * dx + dy * dy);         
            if (distance < 100 && avion_2_Aliados.vidaAvion>0)      
            {   
                return true;           
            } 

            dx = avion.x - avion_3_Aliados.x;
            dy = avion.y - avion_3_Aliados.y;
            distance = Math.sqrt(dx * dx + dy * dy);         
            if (distance < 100 && avion_3_Aliados.vidaAvion>0)      
            {   
                return true;           
            } 

            dx = avion.x - avion_4_Aliados.x;
            dy = avion.y - avion_4_Aliados.y;
            distance = Math.sqrt(dx * dx + dy * dy);         
            if (distance < 100 && avion_4_Aliados.vidaAvion>0)      
            { 
                return true;           
            } 
        } 
        else
        {            
            dx = avion.x - avion_1.x;
            dy = avion.y - avion_1.y;           
            distance = Math.sqrt(dx * dx + dy * dy);                   
            if (distance < 100 && avion_1.vidaAvion>0)      
            {                   
                return true;           
            }            
            dx = avion.x - avion_2.x;
            dy = avion.y - avion_2.y;
            distance = Math.sqrt(dx * dx + dy * dy);         
            if (distance < 100 && avion_2.vidaAvion>0)      
            {   
                return true;           
            }
            dx = avion.x - avion_3.x;
            dy = avion.y - avion_3.y;
            distance = Math.sqrt(dx * dx + dy * dy);         
            if (distance < 100 && avion_3.vidaAvion>0)      
            {   
                return true;           
            } 
            dx = avion.x - avion_4.x;
            dy = avion.y - avion_4.y;
            distance = Math.sqrt(dx * dx + dy * dy);         
            if (distance < 100 && avion_4.vidaAvion>0)      
            {   
                return true;           
            } 
        }
        return false;
    }

   mensajeAviso(String)
    {        
        if(this.mensaje.text.length > 0 || this.mensaje2.text.length > 0)
        {   
            this.mensaje.destroy();
            this.mensaje2.destroy(); 
        }
        sleep = (delay) => new Promise((resolve) => setTimeout(resolve,delay))
            Espera = async () => {
                this.mensaje = this.add.text(800,5, String).setScale(1.9)
                console.log(this.mensaje.text);
                await sleep(1000)
                await sleep(2000)
                await sleep(1000)
                this.mensaje.destroy();
            }
            Espera();  
    }

    mensajeAviso2(String)
    {        
        console.log(this.mensaje2);
        if(this.mensaje.text.length > 0 || this.mensaje2.text.length > 0)
        {
            this.mensaje2.destroy();
            this.mensaje.destroy();     
        }
        sleep = (delay) => new Promise((resolve) => setTimeout(resolve,delay))
        Espera = async () => {
            this.mensaje2 = this.add.text(800,5, String).setScale(1.9)
            console.log(this.mensaje2.text);
            await sleep(1000)
            await sleep(2000)
            await sleep(1000)
            this.mensaje2.destroy();
        }
        Espera();  
    }

    onEvent()
    {
        this.mensaje.destroy();
    }

    actualizarVidaAvion(){

        if(config.Partida.Bando=='Potencias'){
            for(var i = 0; i < 4; i++){
                if(config.Partida.aviones[i].vidaAvion<arregloVida[i]){
                    moverX =  (( arregloVida[i] - config.Partida.aviones[i].vidaAvion) * 100 / config.Partida.configuraciones.avionSalud );
                    arregloVida[i] = config.Partida.aviones[i].vidaAvion;
                    eval("vidaBar"+(i+1)+".x-="+ moverX + ";")
                }                
            }
        }else{
            for(var i = 4; i < 8; i++){
                if(config.Partida.aviones[i].vidaAvion<arregloVida[i]){
                    moverX =  (( arregloVida[i] - config.Partida.aviones[i].vidaAvion) * 100 / config.Partida.configuraciones.avionSalud );
                    arregloVida[i] = config.Partida.aviones[i].vidaAvion;                    
                    eval("vidaBar"+((i-3))+".x-="+ moverX + ";")
                }                
            }
        }

    }

    actualizarCombustible(){

        for(var i = 0; i < 8; i++){
            if (this.EstaMoviendose(config.Partida.aviones[i]) && this.time>config.Partida.aviones[i].timeNafta 
                && config.Partida.aviones[i].altitud!='EnBase')
            {  
                
                if(config.Partida.aviones[i].combustible>0)
                {   
                    config.Partida.aviones[i].timeNafta =this.time+550;            
                    config.Partida.aviones[i].combustible--;   
                    moverX = config.Partida.aviones[i].combustible+253;
                    if(config.Partida.Bando=='Potencias' && i<4)
                        eval("combustibleBar"+((i+1))+".x="+ moverX + ";")   
                    else if(config.Partida.Bando=='Aliados' && i>3)
                        eval("combustibleBar"+((i-3))+".x="+ moverX + ";")                 
                }
                else       
                    config.Partida.aviones[i].vidaAvion = 0;              
            }
            if (config.Partida.aviones[i].altitud=='EnBase')
            {   
                config.Partida.aviones[i].combustible =config.Partida.configuraciones.avionCombustible;
                if(config.Partida.Bando=='Potencias' && i<4 && this.contenedorExplosivosPotencias.vida>0)
                {                     
                    moverX = config.Partida.aviones[i].combustible+253;
                    eval("combustibleBar"+((i+1))+".x="+ moverX + ";")                    
                    this.vistaLateral = this.add.image(45,113,'vistaLateralEnBase').setOrigin(0).setScale(1); 
                }  
                else if(config.Partida.Bando=='Aliados' && i>3 && this.contenedorExplosivosAliados.vida>0)
                {    
                    moverX = config.Partida.aviones[i].combustible+253;  
                    eval("combustibleBar"+((i-3))+".x="+ moverX + ";")
                }   
            }
        }
    }

    update(time,delta)
    {     
        this.time = time;
        this.actualizarVidaAvion();
        if (timer1 > 0)
        {
            timer1--; 
        }
        if (timer2 > 0)
        {
            timer2--;
        }
        if (timer3 > 0)
        {
            timer3--;
        }
        if (timer4 > 0)
        {
            timer4--;
        }
        
        this.actualizarCombustible(time);
        //llama a funcion que actualiza el efecto visual de luces en los aviones y la base
        
        //Efecto visual para el campo visual de los aviones
        this.lightAvion(); 

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

            if (!this.MostrarOcultar(this.contenedorExplosivosPotencias)) 
                this.contenedorExplosivosPotencias.setVisible(false);

            if (!this.MostrarOcultar(this.depositoCombustiblePotencias)) 
                this.depositoCombustiblePotencias.setVisible(false);

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

            if (!this.MostrarOcultar(this.contenedorExplosivosAliados)) 
                this.contenedorExplosivosAliados.setVisible(false);

            if (!this.MostrarOcultar(this.depositoCombustibleAliados)) 
                this.depositoCombustibleAliados.setVisible(false);

            for(var i = 0; i<config.Partida.configuraciones.artilleriaCantidad; i++){
                if (!this.MostrarOcultar(artilleriasAliados.getChildren()[i])) 
                    artilleriasAliados.getChildren()[i].setVisible(false);  
            }
        }

        //Se prueba evento de destruccion de avion al llegar la vida a 0
        
        if(avion_1.vidaAvion <= 0 ) 
            {
               // boom = this.add.sprite(avion_1.x, avion_1.y , "Nieuport_28C1");
                //boom.setVisible(true);
                //boom.play('explosion');
                avion_1.destroy();
                if (mensajeAvionDestruido1 == false && config.Partida.Bando == 'Aliados')
                {
                    this.mensajeAviso('El avion 1 del enemigo fue destruido');
                    mensajeAvionDestruido1 = true;
                }
                this.circulo_1.destroy();
                
                if (config.Partida.Bando == 'Potencias')
                {
                    this.panelAvion1 = this.add.image(45, 500, "panelAvionDestruido").setOrigin(0).setScale(.3).setInteractive();
                    this.cargarBomba1.destroy();
                    this.volverBase1.destroy();
                    vidaContainer1.destroy();
                    combustibleContainer1.destroy();
                    combustibleBar1.destroy();
                    avion_1.focus = false;
                    light1.setIntensity(0);
                    light1Bomba.setIntensity(0);
                }
                
            }
        if(avion_2.vidaAvion <= 0 ) 
        {
            avion_2.destroy();
            if (mensajeAvionDestruido2 == false && config.Partida.Bando == 'Aliados')
                {
                    this.mensajeAviso('El avion 2 del enemigo fue destruido');
                    mensajeAvionDestruido2 = true;
                }
            this.circulo_2.destroy();
            if (config.Partida.Bando == 'Potencias')
            {
                this.panelAvion2 = this.add.image(45, 595, "panelAvionDestruido").setOrigin(0).setScale(.3).setInteractive();
                this.cargarBomba2.destroy();
                this.volverBase2.destroy();
                vidaContainer2.destroy();
                combustibleContainer2.destroy();
                combustibleBar2.destroy();
                avion_2.focus = false;
                light2.setIntensity(0);
                light2Bomba.setIntensity(0);
            }
        }
            
        if(avion_3.vidaAvion <= 0 ) 
            {
                this.circulo_3.destroy();
                if (mensajeAvionDestruido3 == false && config.Partida.Bando == 'Aliados')
                {
                    this.mensajeAviso('El avion 3 del enemigo fue destruido');
                    mensajeAvionDestruido3 = true;
                }
                avion_3.destroy();
                if (config.Partida.Bando == 'Potencias')
                {
                    this.panelAvion3 = this.add.image(45, 690, "panelAvionDestruido").setOrigin(0).setScale(.3).setInteractive();
                    this.cargarBomba3.destroy();
                    this.volverBase3.destroy();
                    vidaContainer3.destroy();
                    combustibleContainer3.destroy();
                    combustibleBar3.destroy();
                    avion_3.focus = false;
                    light3.setIntensity(0);
                    light3Bomba.setIntensity(0);
                }
            }
        if(avion_4.vidaAvion <= 0) 
            {
                avion_4.destroy();
                if (mensajeAvionDestruido4 == false&& config.Partida.Bando == 'Aliados')
                {
                    this.mensajeAviso('El avion 4 del enemigo fue destruido');
                    mensajeAvionDestruido4 = true;
                }
                this.circulo_4.destroy();
                if (config.Partida.Bando == 'Potencias')
                {
                    this.panelAvion4 = this.add.image(45, 785, "panelAvionDestruido").setOrigin(0).setScale(.3).setInteractive();
                    this.cargarBomba4.destroy();
                    this.volverBase4.destroy();
                    vidaContainer4.destroy();
                    combustibleContainer4.destroy();
                    combustibleBar4.destroy();
                    avion_4.focus = false;
                    light4.setIntensity(0);
                light4Bomba.setIntensity(0);
                }
            }   
        if(this.torrePotencias.vida <= 0) 
        {
            if (mensajeAvionDestruido8 == false && config.Partida.Bando == 'Aliados')
            {
                this.mensajeAviso('La torre enemiga fue destruida');
                mensajeAvionDestruido8 = true;
            }
            this.circulo_torrePotencias.destroy();
            this.torrePotencias.destroy();
        }
        if(this.contenedorExplosivosPotencias.vida <= 0) 
        {
            if (mensajeAvionDestruido8 == false && config.Partida.Bando == 'Aliados')
            {
                this.mensajeAviso('El contenedor enemigo fue destruido');
                mensajeAvionDestruido8 = true;
            }
            this.contenedorExplosivosPotencias.destroy();            
        }
        if(this.depositoCombustiblePotencias.vida <= 0) 
        {
            if (mensajeAvionDestruido8 == false && config.Partida.Bando == 'Aliados')
            {
                this.mensajeAviso('El deposito enemigo fue destruido');
                mensajeAvionDestruido8 = true;
            }
            this.depositoCombustiblePotencias.destroy();            
        }
        if(avion_1_Aliados.vidaAvion <= 0) 
            {
                avion_1_Aliados.destroy(); 
                if (mensajeAvionDestruido5 == false && config.Partida.Bando == 'Potencias')
                {
                    this.mensajeAviso('El avion 1 del enemigo fue destruido');
                    mensajeAvionDestruido5 = true;
                }
                this.circulo_5.destroy();
                if (config.Partida.Bando == 'Aliados')
                {
                    this.panelAvion1 = this.add.image(45, 500, "panelAvionDestruido").setOrigin(0).setScale(.3).setInteractive();
                    this.cargarBomba1.destroy();
                    this.volverBase1.destroy();
                    vidaContainer1.destroy();
                    combustibleContainer1.destroy();
                    combustibleBar1.destroy();
                    avion_1_Aliados.focus = false;
                    light1.setIntensity(0);
                    light1Bomba.setIntensity(0);
                }
            }
        if(avion_2_Aliados.vidaAvion <= 0) 
            {
                avion_2_Aliados.destroy();
                if (mensajeAvionDestruido6 == false && config.Partida.Bando == 'Potencias')
                {
                    this.mensajeAviso('El avion 2 del enemigo fue destruido');
                    mensajeAvionDestruido6 = true;
                }
                this.circulo_6.destroy();
                if (config.Partida.Bando == 'Aliados')
                {
                    this.panelAvion2 = this.add.image(45, 595, "panelAvionDestruido").setOrigin(0).setScale(.3).setInteractive();
                    this.cargarBomba2.destroy();
                    this.volverBase2.destroy();
                    vidaContainer2.destroy();
                    combustibleContainer2.destroy();
                    combustibleBar2.destroy();
                    avion_2_Aliados.focus = false;
                    light2.setIntensity(0);
                    light2Bomba.setIntensity(0);
                }
            }
        if(avion_3_Aliados.vidaAvion <= 0) 
            {
                avion_3_Aliados.destroy();
                if (mensajeAvionDestruido7 == false && config.Partida.Bando == 'Potencias')
                {
                    this.mensajeAviso('El avion 3 del enemigo fue destruido');
                    mensajeAvionDestruido7 = true;
                }
                this.circulo_7.destroy();
                if (config.Partida.Bando == 'Aliados')
                {
                    this.panelAvion3 = this.add.image(45, 690, "panelAvionDestruido").setOrigin(0).setScale(.3).setInteractive();
                    this.cargarBomba3.destroy();
                    this.volverBase3.destroy();
                    vidaContainer3.destroy();
                    combustibleContainer3.destroy();
                    combustibleBar3.destroy();
                    avion_3_Aliados.focus = false;
                    light3.setIntensity(0);
                    light3Bomba.setIntensity(0);
                }
            }
        if(avion_4_Aliados.vidaAvion <= 0) 
            {
                avion_4_Aliados.destroy();
                if (mensajeAvionDestruido8 == false && config.Partida.Bando == 'Potencias')
                {
                    this.mensajeAviso('El avion 4 del enemigo fue destruido');
                    mensajeAvionDestruido8 = true;
                }
                this.circulo_8.destroy();
                if (config.Partida.Bando == 'Aliados')
                {
                    this.panelAvion4 = this.add.image(45, 785, "panelAvionDestruido").setOrigin(0).setScale(.3).setInteractive();
                    this.cargarBomba4.destroy();
                    this.volverBase4.destroy();
                    vidaContainer4.destroy();
                    combustibleContainer4.destroy();
                    combustibleBar4.destroy();
                    avion_4_Aliados.focus = false;
                    light4.setIntensity(0);
                    light4Bomba.setIntensity(0);
                }
            }

        if(this.torreAliados.vida <= 0) 
        {
            if (mensajeAvionDestruido8 == false && config.Partida.Bando == 'Potencias')
            {
                this.mensajeAviso('La torre enemiga fue destruida');
                mensajeAvionDestruido8 = true;
            }
            this.circulo_torreAliados.destroy();
            this.torreAliados.destroy();
        }

        if(this.contenedorExplosivosAliados.vida <= 0) 
        {
            if (mensajeAvionDestruido8 == false && config.Partida.Bando == 'Potencias')
            {
                this.mensajeAviso('El contenedor enemigo fue destruido');
                mensajeAvionDestruido8 = true;
            }
            this.contenedorExplosivosAliados.destroy();            
        }

        if(this.depositoCombustibleAliados.vida <= 0) 
        {
            if (mensajeAvionDestruido8 == false && config.Partida.Bando == 'Potencias')
            {
                this.mensajeAviso('El deposito enemigo fue destruido');
                mensajeAvionDestruido8 = true;
            }
            this.depositoCombustibleAliados.destroy();            
        }

        //compruebo condicion de victoria para bando Potencia
        if (config.Partida.Bando=='Potencias')
        {   
            if ((this.torrePotencias.vida <= 0 && this.depositoCombustiblePotencias.vida <= 0 && this.contenedorExplosivosPotencias.vida <= 0)||(avion_1.vidaAvion <= 0 && avion_2.vidaAvion <= 0 && avion_3.vidaAvion <= 0 && avion_4.vidaAvion <= 0))
            {
                config.Partida.sincronizar({tipoOp:"terminarPartida", estado:"Terminada"});
                this.scene.remove('Play');  
                this.scene.launch('GameOver');
            }else{
                if(config.Partida.estado == 'Terminada')
                {
                    this.scene.remove('Play');    
                    this.scene.launch('Win');
                    
                } 
            }

        }
         //compruebo condicion de victoria para bando Aliados
        if (config.Partida.Bando=='Aliados')
        {   
            if ((this.torreAliados.vida <= 0 && this.depositoCombustibleAliados.vida <= 0 && this.contenedorExplosivosAliados.vida <= 0 )||(avion_1_Aliados.vidaAvion <= 0 && avion_2_Aliados.vidaAvion <= 0 && avion_3_Aliados.vidaAvion <= 0 && avion_4_Aliados.vidaAvion <= 0))
            {
                config.Partida.sincronizar({tipoOp:"terminarPartida", estado:"Terminada"});
                this.scene.remove('Play');  
                this.scene.launch('GameOver');
            }else{
                if(config.Partida.estado == 'Terminada')
                {
                    this.scene.remove('Play');  
                    this.scene.launch('Win');                    
                } 
            }

        }           
      
        //Chequea si la partida se manda pausar
        if(config.Partida.estado=='Pausado'){
            if(!config.Partida.duenio)
                this.scene.launch('Pausado');
            this.scene.pause();
        }

        if(config.Partida.Bando=="Potencias"){
            depositoExplosivosBar.x=config.Partida.basePotencias[2].vida+267;
            depositoCombustibleBar.x = config.Partida.basePotencias[1].vida+267;
            torreBar.x = config.Partida.basePotencias[0].vida+70;            
        }else{
            depositoExplosivosBar.x=config.Partida.baseAliados[2].vida+267;
            depositoCombustibleBar.x = config.Partida.baseAliados[1].vida+267;
            torreBar.x = config.Partida.baseAliados[0].vida+70;  
        }

        //Manejo los errores que vienen de backend
		if(config.Partida.hayError){
			if(config.Partida.mensajeError=="Se desconecto un jugador" ){
                config.Partida.sincronizar({tipoOp:"terminarPartida", estado:"Terminada"});
                this.scene.remove('Play');  
                this.scene.launch('WinHuida'); 

			}

		}

    }



}


export default Play;