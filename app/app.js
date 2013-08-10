var URL = 'http://localhost:3000/api/';
TOKEN = '';

Ext.Loader.setPath({
    'Utils':'./utils'
});

Ext.application({
    controllers: ["Main"],
    stores: ["Todos"],
    name: 'Todos',
    autoCreateViewport: true
});
