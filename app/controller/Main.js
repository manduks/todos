Ext.define('Todos.controller.Main', {
    extend: 'Ext.app.Controller',
    refs: [{
        ref: 'loginform',
        selector: 'loginform'
    }, {
        ref: 'main',
        selector: 'viewport'
    }],
    listTodosUndones:true,
    init: function () {
        this.control({
            'loginform': {
                loginuser: this.onLoginUser
            },
            'todosgrid #addTodo': {
                click: this.addTodo
            },
            'todosgrid #listUndone': {
                click: this.listUndone
            },
            'todosgrid #listDone': {
                click: this.listDone
            },
            'todosgrid #listAll': {
                click: this.listAllTodos
            },
            'todosgrid': {
                edit: this.saveTodo,
                changetodostatus: this.changeTodoStatus,
                eliminartodo: this.deleteTodo
            }
        });
    },
    onLoginUser: function (token) {
        var me = this;
        TOKEN = token;
        me.getMain().layout.setActiveItem(1);
        me.getStore('Todos').load();
    },
    addTodo: function (b) {
        var editor = b.up('todosgrid').editor;
        editor.cancelEdit();

        // Create a model instance
        var todo = Ext.create('Todos.model.Todo', {
            description: '',
            deadline: Ext.Date.clearTime(new Date()),
            done: false
        });
        this.getStore('Todos').insert(0, todo);
        editor.startEdit(0, 0);
    },
    listUndone: function () {
    	// Clear the filter collection without updating the UI
    	this.getStore('Todos').clearFilter(true);
    	this.getStore('Todos').filter('done', false);
    	this.listTodosUndones = true;
    },
    listDone: function () {
    	this.getStore('Todos').clearFilter(true);
    	this.getStore('Todos').filter('done', true);
    	this.listTodosUndones = false;
    },
    listAllTodos: function () {
    	this.getStore('Todos').clearFilter();
    },
    saveTodo:function (editor, e) {
    	this.saveData(e.record)
    },
    changeTodoStatus:function (grid, record) {
    	this.saveData(record);
    },
    saveData: function (record) {
    	var me = this;      
        Ext.data.JsonP.request({
            url: URL + 'api/add_todo.json',
            params: Ext.apply({auth_token:TOKEN},record.getData()),
            callback: function (c, action) {
                if (action.response.success === true) {
                	// commit the changes right after editing finished 
                	record.set('id',action.response.todo.id);
                	record.commit();
                	me.getStore('Todos').clearFilter(true);
                	me.getStore('Todos').filter('done', !me.listTodosUndones);
                } 
                else {
                    Ext.Msg.alert('Failed', action.response.message);
                }
            }
        });
    },
    deleteTodo:function (record) {
    	var me = this;
    	Ext.data.JsonP.request({
            url: URL + 'api/delete_todo.json',
            params: Ext.apply({auth_token:TOKEN},record.getData()),
            callback: function (c, action) {
                if (action.response.success === true) {
                	me.getStore('Todos').remove(record);
                } 
                else {
                    Ext.Msg.alert('Failed', action.response.message);
                }
            }
        });
    }
});