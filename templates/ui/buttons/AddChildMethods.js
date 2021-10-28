import Sizer from '../sizer/Sizer.js';
import { ButtonSetInteractive } from '../utils/buttons/ButtonSetInteractive.js';
import IsArray from '../../../plugins/utils/object/IsArray.js';

const SizerAdd = Sizer.prototype.add;
const SizerAddSpace = Sizer.prototype.addSpace;

var Add = function (gameObject) {
    var isNormalGameObject = !gameObject.isRexSpace;
    var proportion = (!isNormalGameObject || this.buttonsExpand) ? 1 : 0;

    if (this.sizerChildren.length === 0) {  // First element
        if (isNormalGameObject && this.hasHeadSpace) {
            SizerAddSpace.call(this);
        }

        SizerAdd.call(this,
            gameObject,
            { proportion: proportion, expand: true }
        );

        // Add space at last element
        if (isNormalGameObject && this.hasTailSpace) {
            SizerAddSpace.call(this);
        }


    } else {   // Others
        if (this.hasTailSpace) {
            var lastIndex = this.sizerChildren.length - 1;
            SizerAdd.call(this,
                gameObject,
                { index: lastIndex, proportion: proportion, expand: true }
            );

        } else {
            SizerAdd.call(this,
                gameObject,
                { proportion: proportion, expand: true }
            );
        }

    }

    // Space or other game object as button
    if (isNormalGameObject) {
        this.buttons.push(gameObject);
        ButtonSetInteractive.call(this, gameObject, this.clickConfig);
    }

    return this;
};

export default {
    addButton(gameObject) {
        if (IsArray(gameObject)) {
            var gameObjects = gameObject;
            for (var i = 0, cnt = gameObjects.length; i < cnt; i++) {
                Add.call(this, gameObjects[i]);
            }
        } else {
            Add.call(this, gameObject);
        }
        return this;
    },

    addButtons(gameObjects) {
        for (var i = 0, cnt = gameObjects.length; i < cnt; i++) {
            Add.call(this, gameObjects[i]);
        }
        return this;
    }
}