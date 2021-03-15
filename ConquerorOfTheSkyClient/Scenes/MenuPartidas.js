import { config } from '../lib/main.js';
const Random = Phaser.Math.Between;

const COLOR_PRIMARY = 0x8a7a55 ;
const COLOR_LIGHT = 0xfaf2dc;
const COLOR_DARK = 0x040B26;

class MenuPartidas extends Phaser.Scene {
    constructor() {
        super({
            key: 'MenuPartidas'
        })
    }

    preload() { 
        this.load.scenePlugin({
            key: 'rexuiplugin',
            url: '../lib/rexuiplugin.min.js',
            sceneKey: 'rexUI'
        });      
    }

    create() {
        var listaPartidass = config.Partida.listaPartidas;
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
                //this.print.text += 'click ' + cellIndex + ': ' + cellContainer.text + '\n';
                var partida =cellContainer.text.split(' ');
                var nombrePartida = listaPartidass[partida[0]].nombre;
                var cantLetrasPartida = cantLetrasString(nombrePartida)
                var bando = listaPartidass[partida[0]].bandoDuenio;
                var posicionNombre = 44 - cantLetrasPartida;
                this.scene.pause();
                this.scene.launch('IngresarPartidaBuscar', { Id: partida[0], Nombre: partida[posicionNombre], Bando: bando, Publica: partida[posicionNombre  + 62] });
                this.scene.pause('MenuPartidas');
                var nextCellIndex = cellIndex + 1;
                var nextItem = gridTable.items[nextCellIndex];
                if (!nextItem) {
                    return;
                }
                nextItem.color = 0xffffff - nextItem.color;
                gridTable.updateVisibleCell(nextCellIndex);          
            }, this) 
        
        this.menuInicial = this.add.image(750,945, 'pruebaEndGame').setScale(0.4).setInteractive();
        this.menuInicial.setAlpha(0.01);
        this.menuInicial.on(Phaser.Input.Events.POINTER_DOWN, () => {
            this.add.tween({
                targets: this.menuInicial,
                ease: 'Bounce.easeIn',
                x:740,
                duration: 100,
                onComplete: () => {
                    location.reload();
                }
            });

            this.add.tween({
                targets: [ this.pointsText, this.bestPointsText ],                
                y: 400,
                duration: 100
            });
        });
    }

}

var CreateItems = function (count) {
    var data = [];  
    var listaPartidas = config.Partida.listaPartidas; //Acá suplantaría este arreglo con lo que me diga Gabriel luego de agregarle lo faltante  
    var cantPartidas = listaPartidas.length;
    for (var i = 0; i < cantPartidas; i++) {
        data.push({
            id: +listaPartidas[i].idPartida + '                                '  +listaPartidas[i].nombre + '                             ' + listaPartidas[i].jugConectados + '/2' + '                                 ' + esPublica(listaPartidas[i].publica) + '                                 ' + listaPartidas[i].modalidad,
            gold:listaPartidas[i].idPartida ,
        });
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

var cantLetrasString = function (String)
{
    var cantLetras = 0;
    for(var i = 0; i<12; i++)
    {
        if (String[i] != ' ')
        {
            cantLetras++;
        }
    }
    return cantLetras;
}

export default MenuPartidas