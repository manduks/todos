Ext.define('Todos.view.Main', {
    extend: 'Ext.container.Container',
    requires:[
        'Ext.layout.container.Card',
        'Todos.view.login.LoginForm',
        'Todos.view.todos.TodosGrid',
        'Ext.data.JsonP'
    ],
    
    xtype: 'app-main',

    layout: {
        type: 'card',
        activeItem:0
    },

    items: [{
        xtype:'container',
        style:{
            "background-image":"url(./resources/images/blurres.jpg)"
        },
        layout: {
          align: 'middle',
          pack: 'center',
          type: 'hbox'
        },
        items:{
            xtype: 'login-form'
        }
    },{
       xtype:'panel',
       layout:'card',
       tbar:['->',{
            text:'Salir',
            itemId:'logOut',
            glyph:'160',
            iconCls:'icon-lock-empty'
       }],
       items:[{
         xtype: 'todos-grid'
       }]
    }]
});