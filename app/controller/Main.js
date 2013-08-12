Ext.define('Todos.controller.Main', {
    extend: 'Ext.app.Controller',
    refs:[{
    	ref:'loginForm',
    	selector:'login-form'
    },{
    	ref:'main',
    	selector:'app-main'
    }],
    appiURL: 'http://api.codetlan.com/api/',
    init:function () {
    	this.control({
    		'login-form': {
    			loginuser: this.onLoginUser
    		},
    		'todos-grid #addTodo':{
                click: this.onAddTodo
            },
            'todos-grid #listUndone':{
                click: this.onlistUndone
            },
            'todos-grid #listDone':{
                click: this.onlistDone
            },
            'todos-grid #listAll':{
    			click: this.onlistAll
    		},
    		'todos-grid': {
                edit:this.onEditTodo,
                changetodostatus:this.onChangeTodoStatus,
                deletetodo:this.onDeleteTodo
            },
            'app-main #logOut':{
                click: this.onLogOut
            },
            'app-main panel':{
                activate:this.loadTodosStore
            }		
    	});
        
    },
    loadTodosStore:function () {
        this.getStore('Todos').load();
        this.getStore('Todos').filter('done',false);
    },
    onLaunch:function (argument) {
        if(localStorage.getItem("auth_token")){ //si existe el token
            this.getMain().layout.setActiveItem(1);
        }
    },
    onChangeTodoStatus:function (grid,record,checked) {
        console.log(arguments);
        this.saveData(record,checked,'api/add_todo.json',this.saveResponse, false);
    },
    onlistDone: function () {
        this.getStore('Todos').clearFilter(true);
        this.getStore('Todos').filter('done',true);
    },
    onlistAll:function () {
        this.getStore('Todos').clearFilter();
    },
    onlistUndone: function(btn) {
        this.getStore('Todos').clearFilter(true);
        this.getStore('Todos').filter('done',false);
    },
    onEditTodo:function(editor, e) {
    	var record = e.record;
    	this.saveData(record,true,'api/add_todo.json',this.saveResponse, false);
	},
    saveResponse:function (c, action, algo, record, checked, deleteAction) {
        if(action.response.success === true){
            if(!deleteAction){
                record.set('id',action.response.todo.id);
                record.commit();
            }else{
                this.getStore('Todos').remove(record);
            }            
            this.getStore('Todos').clearFilter(true);
            this.getStore('Todos').filter('done',!checked);
        }
        else{
            Ext.Msg.alert('Failed', action.response.message);
        }
    },
    onLoginUser:function (token) {
        localStorage.setItem("auth_token", token);
    	var me = this;
    	me.getMain().items.getAt(0).getEl().switchOff();
    	setTimeout(function () {
    		me.getMain().layout.setActiveItem(1);    		
    	},500);
    	
    },
    onAddTodo: function (button) {
    	var editor = button.up('todos-grid').editor,
    		todo;
        editor.cancelEdit();    	
    	todo = Ext.create('Todos.model.Todo',{
    		description: '',
            deadline: Ext.Date.clearTime(new Date()),
            done: false
    	});
    	this.getStore('Todos').insert(0,todo);

    	editor.startEdit(0,0);
    },
    onDeleteTodo: function(grid, record) {
        this.saveData(record,!record.get('done'),'api/delete_todo.json',this.saveResponse,true);
    },
    saveData: function (record, checked, url, callback, deleteAction) {
        var me = this;
        console.log(arguments);
    	Ext.data.JsonP.request({
    		url: Utils.Utils.url+url,
    		params: Ext.apply({auth_token:localStorage.getItem('auth_token')},record.getData()),
    		callback: Ext.Function.bind(callback,me,[record, checked, deleteAction],true)
    	});
    },
    onLogOut:function () {
        var me = this;
        localStorage.removeItem('auth_token');     
        me.getMain().items.getAt(1).el.switchOff();
        setTimeout(function () {
            me.getMain().layout.setActiveItem(0);      
        },500);
    }
});
