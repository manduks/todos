Ext.define('Todos.Application', {
    name: 'Todos',

    extend: 'Ext.app.Application',

    requires:['Utils.Utils'],

    views: [
        'Todos.view.Main'
    ],

    controllers: [
        'Main'
    ],

    stores: [
        'Todos'
    ]
});
