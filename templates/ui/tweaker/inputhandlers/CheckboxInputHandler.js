import CreateCheckbox from './utils/CreateCheckbox.js';

export default {
    name: 'CheckboxInput',

    accept(config, value) {
        if (config.hasOwnProperty('view')) {
            return (config.view === 'boolean')
        }

        return typeof (value) === 'boolean';
    },

    // Callback inside `constructor()`
    build(gameObject, style) {
        var scene = gameObject.scene;

        gameObject.type = 'rexTweaker.CheckboxInput';

        var checkboxConfig = style.checkbox;
        var checkbox = CreateCheckbox(scene, checkboxConfig);

        var size = checkboxConfig.size;
        if (size !== undefined) {
            checkbox.setSize(size, size);
        }

        var fitRatio = (size !== undefined) ? 0 : 1;
        gameObject.add(
            checkbox,
            { proportion: 0, expand: false, fitRatio: fitRatio, key: 'checkbox' }
        )

        checkbox.on('valuechange', function (value) {
            gameObject.setValue(value);
        });
    },

    // Callback inside `setValue()`
    displayValue(gameObject, value) {
        var checkbox = gameObject.getElement('checkbox');
        checkbox.setValue(value);
    }
}