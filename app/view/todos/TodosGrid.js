/**
 * @class Todos.view.todos.TodosGrid
 * @extends Ext.grid.Panel
 * Grid para listar las tareas
 */
Ext.define('Todos.view.todos.TodosGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.todos-grid',

    requires:[
        'Ext.grid.column.Action',
        'Ext.grid.column.CheckColumn',
        'Ext.grid.plugin.RowEditing',
        'Ext.form.field.Checkbox',
        'Ext.form.field.Date'
    ],

    title:'Tareas',

    store: 'Todos',
    
    viewConfig: {
        stripeRows: true,
        enableTextSelection: true
    },

     tbar: [{
            text: 'Agregar Tarea',
            scale:'medium',
            glyph:'160',
            iconCls:'icon-plus-1',
            itemId:'addTodo'
        },'->',{
            text: 'Pendientes',
            scale:'medium',
            glyph:'160',
            iconCls:'icon-eye',
            itemId:'listUndone'
        },{
            text: 'Terminados',
            scale:'medium',
            glyph:'160',
            iconCls:'icon-ok',
            itemId:'listDone'
        },{
            text: 'Ver todos',
            scale:'medium',
            glyph:'160',
            iconCls:'icon-list',
            itemId:'listAll'
    }],

    initComponent: function (argument) {
    	var me = this;
    	me.columns =  me.buildColumns();
    	me.editor =  Ext.create('Ext.grid.plugin.RowEditing', {
            clicksToMoveEditor: 1,
            autoCancel: false
        });
        //editing
        me.plugins = [me.editor];

    	me.callParent();
    },
    buildColumns: function () {
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
                        me.fireEvent('changetodostatus',me, me.getStore().getAt(rowIndex),checked);
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
                                me.fireEvent('deletetodo', grid, record);
                             }
                         });
                    }
                }]
            }
        ];
    }
});