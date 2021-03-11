import { config } from '../lib/main.js';
const Random = Phaser.Math.Between;

const COLOR_PRIMARY = 0x99b8c3 ;
const COLOR_LIGHT = 0x5E7B57;
const COLOR_DARK = 0x040B26;

class scroll extends Phaser.Scene {
    constructor() {
        super({
            key: 'scroll'
        })
    }

    preload() { 
        this.load.scenePlugin({
            key: 'rexuiplugin',
            url: 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js',
            sceneKey: 'rexUI'
        });      
    }

    create() {
        console.log(config.Partida.listaPartidas);
        //this.add.image(0, 0, "fondoMenu").setOrigin(0);
        //this.add.image(0,0, 'desenfocar').setOrigin(0);
        this.add.image(150, 150, "fondoBuscarPartida").setOrigin(0).setScale(2);
        var scrollMode = 0; // 0:vertical, 1:horizontal
        var gridTable = this.rexUI.add.gridTable({
            x: 770,
            y: 600,
            width: (scrollMode === 0) ? 1020 : 1800,
            height: (scrollMode === 0) ? 550 : 1000,

            scrollMode: scrollMode,

            background: this.rexUI.add.roundRectangle(0, 0, 20, 10, 10, COLOR_PRIMARY),

            table: {
                cellWidth: (scrollMode === 0) ? undefined : 190,
                cellHeight: (scrollMode === 0) ? 100 : undefined,

                columns: 1,

                mask: {
                    padding: 2,
                },

                reuseCellContainer: true,
            },

            slider: {
                track: this.rexUI.add.roundRectangle(0, 0, 20, 10, 10, COLOR_DARK),
                thumb: this.rexUI.add.roundRectangle(0, 0, 0, 0, 13, COLOR_LIGHT),
            },


            footer: GetFooterSizer(this, scrollMode),

            space: {
                left: 20,
                right: 20,
                top: 20,
                bottom: 20,

                table: 10,
                header: 10,
                footer: 10,
            },

            createCellContainerCallback: function (cell, cellContainer) {
                var scene = cell.scene,
                    width = cell.width,
                    height = cell.height,
                    item = cell.item,
                    index = cell.index;
                if (cellContainer === null) {
                    cellContainer = scene.rexUI.add.label({
                        width: width,
                        height: height,

                        orientation: scrollMode,
                        background: scene.rexUI.add.roundRectangle(0, 0, 20, 20, 0).setStrokeStyle(2, COLOR_DARK),
                        //icon: scene.rexUI.add.roundRectangle(0, 0, 20, 20, 10, 0x0),
                        text: scene.add.text(0, 0, '', { font: '22px Sportlight Stencil', fill: '#080808' }),

                        space: {
                            icon: 10,
                            left: (scrollMode === 0) ? 15 : 0,
                            top: (scrollMode === 0) ? 0 : 15,
                        }
                    });
                    console.log(cell.index + ': create new cell-container');
                } else {
                    console.log(cell.index + ': reuse cell-container');
                }

                // Set properties from item value
                cellContainer.setMinSize(width, height); // Size might changed in this demo
                cellContainer.getElement('text').setText(item.id); // Set text of text object
              //  cellContainer.getElement('icon').setFillStyle(item.color); // Set fill color of round rectangle object
                cellContainer.getElement('background').setStrokeStyle(2, COLOR_DARK).setDepth(0);
                return cellContainer;
            },
            items: CreateItems(100)
        })
            .layout()
        //.drawBounds(this.add.graphics(), 0xff0000);

        this.print = this.add.text(0, 0, '');
        gridTable
           
            .on('cell.over', function (cellContainer, cellIndex, pointer) {
                cellContainer.getElement('background')
                    .setStrokeStyle(2, COLOR_LIGHT)
                    .setDepth(1);
            }, this)
            .on('cell.out', function (cellContainer, cellIndex, pointer) {
                cellContainer.getElement('background')
                    .setStrokeStyle(2, COLOR_DARK)
                    .setDepth(0);
            }, this)
            .on('cell.click', function (cellContainer, cellIndex, pointer) {
                this.print.text += 'click ' + cellIndex + ': ' + cellContainer.text + '\n';
                var listaPartidas = config.Partida.listaPartidas; //Acá suplantaría este arreglo con lo que me diga Gabriel luego de agregarle lo faltante  
                var partida =cellContainer.text.split(' ');
                const partida1 = listaPartidas[partida[0]].idPartida;
                config.Partida.ingresarAPartida(partida1);
                var nextCellIndex = cellIndex + 1;
                var nextItem = gridTable.items[nextCellIndex];
                if (!nextItem) {
                    return;
                }
                nextItem.color = 0xffffff - nextItem.color;
                gridTable.updateVisibleCell(nextCellIndex);
          
            }, this)    
         
    }

    update() {
        if(config.Partida.partidaCargada){
            this.scene.remove('MenuInicial');
            this.scene.remove('scroll');
            this.scene.remove('PartidaLlena');
            this.scene.start('Play');
        }else if(config.Partida.hayError){
            if(config.Partida.mensajeError=="La partida esta llena"){
                console.log("Sigo avisando de error");
                this.scene.sendToBack();
                this.scene.launch('PartidaLlena');
                this.currentScene = this.scene.get('PartidaLlena');
                this.scene.setVisible(true, this.currentScene);
            }
            
        }
     }
}

var CreateItems = function (count) {
    var data = [];  
     var listaPartidas = config.Partida.listaPartidas; //Acá suplantaría este arreglo con lo que me diga Gabriel luego de agregarle lo faltante  
    var cantPartidas = listaPartidas.length;
    console.log(listaPartidas);
    console.log(data);
    for (var i = 0; i < cantPartidas; i++) {
        data.push({
            id: +listaPartidas[i].idPartida + '                                '  +listaPartidas[i].nombre + '                             ' + listaPartidas[i].jugConectados + '/2' + '                                 ' + esPublica(listaPartidas[i].publica) + '                                 ' + listaPartidas[i].modalidad,
            gold:listaPartidas[i].idPartida ,
        });
        console.log(listaPartidas);
    }
    return data;
}

var esPublica = function(boolean)
{
    if (boolean == true)
        return 'Si';
    else
        return 'No';
}
var GetFooterSizer = function (scene, orientation) {
    return scene.rexUI.add.sizer({
        orientation: orientation
    })
        
}

var CreateFooterButton = function (scene, text, orientation) {
    return scene.rexUI.add.label({
        height: (orientation === 0) ? 40 : undefined,
        width: (orientation === 0) ? undefined : 40,
        orientation: orientation,
        background: scene.rexUI.add.roundRectangle(0, 0, 2, 2, 20, COLOR_DARK),
        text: scene.add.text(0, 0, text),
        icon: scene.rexUI.add.roundRectangle(0, 0, 0, 0, 10, COLOR_LIGHT),
        align: 'center',
        space: {           
            icon: 10
        }
    })
        .setInteractive()
        .on('pointerdown', function () {
            console.log(`Pointer down ${text}`)
        })
        .on('pointerover', function(){
            this.getElement('background').setStrokeStyle(1, 0xffffff);
        })
        .on('pointerout', function(){
            this.getElement('background').setStrokeStyle();
        })  
}

export default scroll