/**
 * @class Todos.model.Todo
 * @extends Ext.data.Model
 * Este es el modelo de nuestros todos
 */
Ext.define('Todos.model.Todo', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'id',
        type: 'int'
    }, {
        name: 'description',
        type: 'string'
    }, {
        name: 'deadline',
        type: 'date'
    }, {
        name: 'done',
        type: 'boolean'
    }],
    proxy: {
        type: 'jsonp',
        url: URL + 'api/list_todos.json',
        reader: {
            type: 'json',
            root: 'todos'
        }
    }
});