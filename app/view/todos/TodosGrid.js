/**
 * @class Todos.model.Todo
 * @extends Ext.grid.Panel
 * Este es el grid que mostrará los todos
 */

Ext.define('Todos.view.todos.TodosGrid', {
    extend: 'Ext.grid.Panel',
    requires: [
        'Ext.grid.column.Action',
        'Ext.grid.column.CheckColumn',
        'Ext.grid.plugin.RowEditing',
        'Ext.form.field.Checkbox',
        'Ext.form.field.Date'
    ],
    // xtype: 'todosgrid',
    alias: 'widget.todosgrid',
    title:'Tareas',
    store: 'Todos',
    stateful: true,
    viewConfig: {
        stripeRows: true,
        enableTextSelection: true
    },
    tbar: [{
            text: 'Agregar Tarea',
            itemId:'addTodo'
        },'->',{
            text: 'Pendientes',
            itemId:'listUndone'
        },{
            text: 'Terminados',
            itemId:'listDone'
        },{
            text: 'Ver todos',
            itemId:'listAll'
        }],
    initComponent: function () {
        var me = this;
        me.columns = me.buildColumns();
        me.editor = Ext.create('Ext.grid.plugin.RowEditing', {
            clicksToMoveEditor: 1,
            autoCancel: false
        });
        //editing
        me.plugins = [me.editor];
        
        me.callParent();
    },
    buildColumns: function (argument) {
        var me = this;
        return [
            {
                xtype: 'checkcolumn',
                header: 'Terminar',
                dataIndex: 'done',
                width: 100,
                editor: {
                    xtype: 'checkbox',
                    cls: 'x-grid-checkheader-editor'
                },
                listeners: {
                    checkchange: function(column, rowIndex, checked){
                         me.fireEvent('changetodostatus',me, me.getStore().getAt(rowIndex));
                    }
                }
            },{
                text     : 'Descripción',
                flex     : 1,
                sortable : false,
                dataIndex: 'description',
                editor:{
                    xtype: 'textfield'
                }
            },
            {
                text     : 'Terminar antes de ',
                width    : 150,
                sortable : true,
                renderer : Ext.util.Format.dateRenderer('m/d/Y'),
                dataIndex: 'deadline',
                 editor: {
                    xtype: 'datefield',
                    format: 'm/d/Y',
                    minValue: Ext.Date.format(new Date(), 'm/d/Y')
                }
            },
            {
                menuDisabled: true,
                sortable: false,
                xtype: 'actioncolumn',
                width: 150,
                items: [{
                    iconCls: 'sell-col',
                    tooltip: 'Eliminar tarea',
                    handler: function(grid, rowIndex, colIndex) {
                        var record = grid.getStore().getAt(rowIndex);
                         Ext.MessageBox.confirm('Confirm', '¿Estas seguro que quieres borrar esta tarea?', function (btn) {
                             if(btn === 'yes'){
                                me.fireEvent('eliminartodo', record);
                             }
                         });
                    }
                }]
            }
        ];
    }
});