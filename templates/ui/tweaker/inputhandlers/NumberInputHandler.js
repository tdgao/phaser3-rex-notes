import CreateInputText from './utils/CreateInputText.js';

var SetInputTextReadOnly = function (gameObject, enable) {
    if (enable === undefined) {
        enable = true;
    }
    var inputText = gameObject.getElement('inputText');
    inputText.setReadOnly(enable);
}

export default {
    name: 'NumberInput',

    accept(config, value) {
        if (config.hasOwnProperty('view')) {
            return (config.view === 'number')
        }

        return typeof (value) === 'number';
    },

    // Callback inside `constructor()`
    build(gameObject, style) {
        var scene = gameObject.scene;

        gameObject.type = 'rexTweaker.NumberInput';

        var inputTextConfig = style.inputNumber || style.inputText;
        var inputText = CreateInputText(scene, inputTextConfig)
            .setNumberInput();

        gameObject.add(
            inputText,
            { proportion: 1, expand: true, key: 'inputText' }
        )

        inputText.on('close', function () {
            gameObject.setValue(inputText.value);
        });
    },

    // Callback inside `setup()`
    setup(gameObject, config) {
        SetInputTextReadOnly(gameObject, !!config.inputTextReadOnly);
    },

    // Callback inside `setValue()`
    displayValue(gameObject, value) {
        var inputText = gameObject.getElement('inputText');
        inputText.setText(gameObject.getFotmatText(value));
    },
}