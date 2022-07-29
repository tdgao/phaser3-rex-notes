import phaser from 'phaser/src/phaser.js';
import BoardPlugin from '../../plugins/board-plugin.js';
import Bejeweled from '../../templates/bejeweled/Bejeweled.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() { }

    create() {
        var bejeweled = new Bejeweled(this, {
            // debug: true, // Show state changed log
            board: {
                grid: {
                    x: 30,
                    y: 30 - 600,
                    cellWidth: 60,
                    cellHeight: 60,
                },
                width: 10,
                height: 20 // Prepared rows: upper 10 rows
            },
            match: {
                // wildcard: undefined
                // dirMask: undefined
            },
            chess: {
                // pick random symbol from array, or a callback to return symbol
                symbols: [0, 1, 2, 3, 4, 5],
                // symbols: function(board, tileX, tileY, excluded) { return symbol; }

                // User-defined chess game object
                create: function (board) {
                    var scene = board.scene;
                    var gameObject = scene.rexBoard.add.shape(board, 0, 0, 0, 0x0, 1, false)
                        .setScale(0.95)
                        // Initial 'symbol' value
                        .setData('symbol', undefined);
                    // Symbol is stored in gameObject's data manager (`gameObject.getData('symbol')`)
                    // Add data changed event to change the appearance of game object via new symbol value
                    gameObject.on('changedata-symbol', function (gameObject, value, previousValue) {
                        gameObject.setFillStyle(getColor(value));
                    });
                    return gameObject;
                },

                // scope for callbacks
                scope: undefined,

                // moveTo behavior
                moveTo: {
                    speed: 400
                },
                // tileZ: 1,                
            },
        })
            .on('match', function (lines, board, bejeweled) {
                // get Game object/tile position of matched lines
                var line, gameObject, tileXYZ;
                for (var i = 0, icnt = lines.length; i < icnt; i++) {
                    line = lines[i];
                    var s = [`Get matched ${line.size}`];
                    var chessArray = line.entries;
                    for (var j = 0, jcnt = chessArray.length; j < jcnt; j++) {
                        gameObject = chessArray[j];
                        tileXYZ = gameObject.rexChess.tileXYZ;
                        s.push(`(${tileXYZ.x},${tileXYZ.y})`);
                    }
                    console.log(s.join(' '));
                }
            })
            .on('eliminate', function (chessArray, board, bejeweled) {
                bejeweled.incData('scores', chessArray.length);
            })
            .setData('scores', 0)

        // Mointor 'scores' variable
        var txtScore = this.add.text(
            650, 30,
            bejeweled.getData('scores'),
            { fontSize: '24px', color: '#fff' }
        );
        bejeweled.on(
            'changedata-scores',
            function (bejeweled, value, previousValue) {
                txtScore.setText(value);
            });

        bejeweled.start();
    }

    update() { }
}

var colorArray = Phaser.Display.Color.HSVColorWheel(0.5, 1);
var getColor = function (symbol) {
    // symbols: [0, 1, 2, 3, 4, 5]
    return colorArray[symbol * 60].color;
}

var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    scene: Demo,
    plugins: {
        scene: [{
            key: 'rexBoard',
            plugin: BoardPlugin,
            mapping: 'rexBoard'
        }]
    }
};

var game = new Phaser.Game(config);