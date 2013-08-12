/**
 * @class Todos.store.Todos
 * @extends extendsClass
 * Store para almacenar los todos
 */
Ext.define('Todos.store.Todos', {
    extend: 'Utils.data.Store',
    requires:['Todos.model.Todo'],
    model:'Todos.model.Todo'
});