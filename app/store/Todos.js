/**
 * @class Todos.store.Todos
 * @extends extendsClass
 * Store para almacenar los todos
 */
Ext.define('Todos.store.Todos', {
    extend: 'Ext.data.Store',
    extend: 'Utils.data.Store',
    requires:['Todos.model.Todo'],
    model:'Todos.model.Todo',
    // autoLoad:true,
    // destroy the store if the grid is destroyed
    autoDestroy: true,
});