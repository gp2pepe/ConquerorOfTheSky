import Avion from '../Objects/Avion.js';
import Bullet from '../Objects/Bullet.js';
import { config,game } from '../lib/main.js';


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

//Inicializo la clase/escena
class Play extends Phaser.Scene {

    constructor(){
        //le asigno una clave a la escena Play
        super({key: 'Play'});
        this.bullets;
    }

    preload(){
        if(config.Partida.tipoPartida = "NuevaPartida")
            config.Partida.iniciarPartida();
        else if(config.Partida.tipoPartida = "IngresarAPartida")
          config.Partida.ingresarAPartida(partida);
    }
    
    create(){ 
        this.scene.remove('MenuInicial');
        this.scene.remove('ElegirBando');
        //Se agrega imagenes a utilizar y dibujar en pantalla primero (fondo, muros, vista lateral)
        this.add.image(0, 0, "fondoMapa").setOrigin(0);
        this.vistaLateral = this.add.image(45,47,'nubeslateral').setOrigin(0).setScale(1);
        this.avionVistaLateral = this.add.image(100,140,'albatros').setOrigin(0).setScale(.3);
        this.mapa = this.add.image(433, 46, "mapa_3").setOrigin(0).setScale(1); 

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

        this.campo = this.add.image(433, 46, "campo").setOrigin(0).setScale(1); 

        //Cargo base para bando 1
        //Seccion donde se randomizara la posicion de la base y se agregara al mapa, tendra predefinidas ubicaciones y se randomizara entre las mismas
        var opcion1 = [550,160,520,180,520,130,570,150];
        var opcion2 = [550,500,520,520,520,470,570,490];
        var opcion3 = [550,860,520,880,520,830,570,850];
        var opcion4 = [700,980,670,1000,670,950,720,970];
        var opcion5 = [700,130,670,150,670,100,720,120];
        var opcion6 = [800,800,770,820,770,770,820,790];
        var numero = Phaser.Math.Between(1,6);


        switch (numero)
        {
            case 1:       
                    this.posicionAleatoria(opcion1);
                    break;
            case 2:
                    this.posicionAleatoria(opcion2);
                    break; 
            case 3:
                    this.posicionAleatoria(opcion3);
                    break;
            case 4: 
                    this.posicionAleatoria(opcion4);
                    break;
            case 5:
                    this.posicionAleatoria(opcion5);
                    break;
            case 6:
                    this.posicionAleatoria(opcion6);
                    break;
        }       

        //Cargo base para bando 2
        opcion1 = [1750,160,1720,180,1720,130,1770,150];
        opcion2 = [1750,500,1720,520,1720,470,1770,490];
        opcion3 = [1750,860,1720,880,1720,830,1770,850];
        opcion4 = [1500,980,1470,1000,1470,950,1520,970];
        opcion5 = [1500,130,1470,150,1470,100,1520,120];
        opcion6 = [1500,800,1470,820,1470,770,1520,790];

        numero = Phaser.Math.Between(1,6);
        switch (numero)
        {
            case 1:       
                    this.posicionAleatoria(opcion1);
                    break;
            case 2:
                    this.posicionAleatoria(opcion2);
                    break; 
            case 3:
                    this.posicionAleatoria(opcion3);
                    break;
            case 4: 
                    this.posicionAleatoria(opcion4);
                    break;
            case 5:
                    this.posicionAleatoria(opcion5);
                    break;
            case 6:
                    this.posicionAleatoria(opcion6);
                    break;
        }      



        //Se llama a funcion que definira los aviones  
        console.log(config.Partida.Bando);
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

    colisiones()
    { 
        //Aniado colision entre los aviones y los muros
        this.physics.add.collider([avion_1,avion_2,avion_3,avion_4,avion_1_Aliados,avion_2_Aliados,avion_3_Aliados,avion_4_Aliados],this.wall_floor);       
        
        
        if (config.Partida.Bando=='Aleman')
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
    if (config.Partida.Bando=='Aleman')
    {
        if (avion_2.focus==true)
        {            
            config.Partida.idavion=2;
            avion_2.moverAvion({x: pointer.x, y: pointer.y});
            config.Partida.sincronizarAvion({x: pointer.x, y: pointer.y});
        } 

        if (avion_1.focus==true)
        {            
            config.Partida.idavion=1;
            avion_1.moverAvion({x: pointer.x, y: pointer.y});
            config.Partida.sincronizarAvion({x: pointer.x, y: pointer.y});
        }  

        if (avion_3.focus==true)
        {            
            config.Partida.idavion=3;
            avion_3.moverAvion({x: pointer.x, y: pointer.y});
            config.Partida.sincronizarAvion({x: pointer.x, y: pointer.y});
        }  

        if (avion_4.focus==true)
        {            
            config.Partida.idavion=4;
            avion_4.moverAvion({x: pointer.x, y: pointer.y});
            config.Partida.sincronizarAvion({x: pointer.x, y: pointer.y});
        } 
    }
        else
        {
        if (avion_1_Aliados.focus==true)
        {
            config.Partida.idavion=5;
            avion_1_Aliados.moverAvion({x: pointer.x, y: pointer.y});
            config.Partida.sincronizarAvion({x: pointer.x, y: pointer.y});
        }
        if (avion_2_Aliados.focus==true)
        {
            config.Partida.idavion=6;
            avion_2_Aliados.moverAvion({x: pointer.x, y: pointer.y});
            config.Partida.sincronizarAvion({x: pointer.x, y: pointer.y});
        }
        if (avion_3_Aliados.focus==true)
        {
            config.Partida.idavion=7;
            avion_3_Aliados.moverAvion({x: pointer.x, y: pointer.y});
            config.Partida.sincronizarAvion({x: pointer.x, y: pointer.y});
        }
        if (avion_4_Aliados.focus==true)
        {
            config.Partida.idavion=8;
            avion_4_Aliados.moverAvion({x: pointer.x, y: pointer.y});
            config.Partida.sincronizarAvion({x: pointer.x, y: pointer.y});
        }
    }
    }

    //Evento  llamado al disparar automaticamente o de momento apretar espacio
    disparar(avion_focus,avion_A_pegar)
    {           
        //Se pasa el avion que esta en focus 
        bullet = bullets.get();
        if (bullet)
        {
            bullet.fire(avion_focus,{x: avion_A_pegar.x, y: avion_A_pegar.y});  
        }  
    }

    definicionAviones()
    {	        
                // Personaje
        avion_1 = new Avion({
            scene: this,
            x: 500,
            y: 200                             
        }).setInteractive();      
        this.circulo_1 = this.add.image(avion_1.x-50,avion_1.y-50,'circuloAvion').setScale(2);
        this.physics.world.enable(this.circulo_1);
        this.circulo_1.body.setCircle(40);
        this.circulo_1.body.setOffset(10,12);     

        
        avion_2 = new Avion({
            scene: this,
            x: 500,
            y: 400            
        }).setInteractive();        
        this.circulo_2 = this.add.image(avion_2.x-50,avion_2.y-50,'circuloAvion').setScale(2);
        this.physics.world.enable(this.circulo_2);
        this.circulo_2.body.setCircle(40);
        this.circulo_2.body.setOffset(10,12);

        avion_3 = new Avion({
            scene: this,
            x: 500,
            y: 600            
        }).setInteractive();        
        this.circulo_3 = this.add.image(avion_3.x-50,avion_3.y-50,'circuloAvion').setScale(2);
        this.physics.world.enable(this.circulo_3);
        this.circulo_3.body.setCircle(40);
        this.circulo_3.body.setOffset(10,12);

        avion_4 = new Avion({
            scene: this,
            x: 500,
            y: 800            
        }).setInteractive();        
        this.circulo_4 = this.add.image(avion_4.x-50,avion_4.y-50,'circuloAvion').setScale(2);
        this.physics.world.enable(this.circulo_4);
        this.circulo_4.body.setCircle(40);
        this.circulo_4.body.setOffset(10,12);

        avion_1_Aliados = new Avion({
            scene: this,
            x: 1500,
            y: 200          
        }).setInteractive();       
        this.circulo_5 = this.add.image(avion_1_Aliados.x-50,avion_1_Aliados.y-50,'circuloAvion').setScale(2);
        this.physics.world.enable(this.circulo_5);
        this.circulo_5.body.setCircle(40);
        this.circulo_5.body.setOffset(10,12); 

        avion_2_Aliados = new Avion({
            scene: this,
            x: 1500,
            y: 400           
        }).setInteractive();       
        this.circulo_6 = this.add.image(avion_2_Aliados.x-50,avion_2_Aliados.y-50,'circuloAvion').setScale(2);
        this.physics.world.enable(this.circulo_6);
        this.circulo_6.body.setCircle(40);
        this.circulo_6.body.setOffset(10,12);

        avion_3_Aliados = new Avion({
            scene: this,
            x: 1500,
            y: 600           
        }).setInteractive();        
        this.circulo_7 = this.add.image(avion_3_Aliados.x-50,avion_3_Aliados.y-50,'circuloAvion').setScale(2);
        this.physics.world.enable(this.circulo_7);
        this.circulo_7.body.setCircle(40);
        this.circulo_7.body.setOffset(10,12);

        avion_4_Aliados = new Avion({
            scene: this,
            x: 1500,
            y: 800           
        }).setInteractive();        
        this.circulo_8 = this.add.image(avion_4_Aliados.x-50,avion_4_Aliados.y-50,'circuloAvion').setScale(2);
        this.physics.world.enable(this.circulo_8);
        this.circulo_8.body.setCircle(40);
        this.circulo_8.body.setOffset(10,12);
        
        this.keys = this.input.keyboard.createCursorKeys();
        this.keys.up.on('down',()=>
        {            
            if (avion_1.focus==true){
                avion_1.altitud='Alta'
                avion_1.setScale(0.09);
            }
            if (avion_2.focus==true){
                avion_2.altitud='Alta'
                avion_2.setScale(0.09);
            }
            if (avion_3.focus==true){
                avion_3.altitud='Alta'
                avion_3.setScale(0.09);
            }
            if (avion_4.focus==true){
                avion_4.altitud='Alta'  
                avion_4.setScale(0.09); 
            }     
        });

        this.keys.down.on('down',()=>
        {            
            if (avion_1.focus==true){
                avion_1.altitud='Baja'
                avion_1.setScale(0.07);
            }
            if (avion_2.focus==true){
                avion_2.altitud='Baja'
                avion_2.setScale(0.07);
            }
            if (avion_3.focus==true){
                avion_3.altitud='Baja'
                avion_3.setScale(0.07);
            }
            if (avion_4.focus==true){
                avion_4.altitud='Baja'
                avion_4.setScale(0.07);
            }    
        });

        this.input.keyboard.on('keydown',(evento)=>{
            if (config.Partida.Bando=='Aleman')
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
        if (config.Partida.Bando=='Aleman')
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

    posicionAleatoria (Array)
    {	
        this.add.image(Array[0], Array[1], 'pisoBase').setScale(.20);
        this.add.image(Array[2], Array[3], 'contenedor_2').setScale(.15);
        this.add.image(Array[4], Array[5], 'depositoCombustible').setScale(.10);
        this.add.image(Array[6], Array[7], 'torre').setScale(.07);
    }

    MostrarOcultarAvion(avion)
    {        
        var dx;
        var dy;        
        if (config.Partida.Bando=='Frances')
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

        this.circulo_1.setPosition(avion_1.x, avion_1.y);  
        this.circulo_2.setPosition(avion_2.x, avion_2.y);
        this.circulo_3.setPosition(avion_3.x, avion_3.y);
        this.circulo_4.setPosition(avion_4.x, avion_4.y);

        this.circulo_5.setPosition(avion_1_Aliados.x, avion_1_Aliados.y);  
        this.circulo_6.setPosition(avion_2_Aliados.x, avion_2_Aliados.y);
        this.circulo_7.setPosition(avion_3_Aliados.x, avion_3_Aliados.y);
        this.circulo_8.setPosition(avion_4_Aliados.x, avion_4_Aliados.y); 
     
        if (config.Partida.Bando=='Frances')
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