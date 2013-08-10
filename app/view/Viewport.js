Ext.define('Todos.view.Viewport', {
    renderTo: Ext.getBody(),
    extend: 'Ext.container.Viewport',
    requires:[
        'Ext.tab.Panel',
        'Ext.layout.container.Border',
        'Todos.view.login.LoginForm',
        'Ext.ux.DataTip',
        'Todos.view.todos.TodosGrid'
    ],

    layout: {
        type: 'card',
        activeItem:0
    },

    items: [{        
        xtype: 'container',
        title: 'login',
        layout: {
          align: 'middle',
          pack: 'center',
          type: 'hbox'
        },
        items:[
            {
                xtype:'loginform',
                width:300,
                height:140
            }
        ]
    },{
        xtype: 'todosgrid'
    }]
});