import 'phaser';
import AwaitLoader from '../../plugins/awaitloader';

class Demo extends Phaser.Scene {
    print: Phaser.GameObjects.Text;

    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        var textObject = this.add.text(0, 0, 'Preload\n');

        AwaitLoader.call(this.load, async function (successCallback: Function, failureCallback: Function) {
            textObject.text += 'Loader1\n';
            setTimeout(successCallback, 1000);
        })

        this.print = textObject;
    }

    create() {
        this.print.text += 'Create\n';
    }

    update() {
    }
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
    scene: Demo
};

var game = new Phaser.Game(config);