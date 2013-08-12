/**
 * @class Todos.view.login.LoginForm
 * @extends Ext.form.Panel
 * Formulario de login de usuarios en nuestra aplicación
 */
Ext.define('Todos.view.login.LoginForm', {
    extend: 'Ext.form.Panel',
    // alias: 'widget.login-form',
    xtype: 'login-form',
    requires: [
        'Ext.layout.container.Form',
        'Ext.ux.DataTip'
    ],
    layout:'form',
    defaultType: 'textfield',
    frame:true,
    title:'Login',
    bodyPadding:'5 5 0',
    width:270,
    height:150,
    fieldDefaults: {
        msgTarget: 'side'
    },
    plugins: {
        ptype: 'datatip'
    },
    items:[{
    	fieldLabel: 'Email',
        name: 'email',
        vtype:'email',
        allowBlank: false
    },{
    	fieldLabel: 'Password',
        name: 'password',
        inputType:'password',
        allowBlank: false
    }],
    buttons:[
	    {
	    	text:'Cancelar',
	    	handler:function () {
	    		this.up('form').getForm().reset();
	    	}
	    },{
	    	text:'Enviar',
	    	formBind: true, //only enabled once the form is valid
        	disabled: true,
	    	handler:function () {
	    		var form = this.up('form').getForm(),
	    			me = this; //no quiero perder

	    			// this.up('form').addEvents('loginuser');
	    		if(form.isValid()){
	    			Ext.data.JsonP.request({
	                    url: Utils.Utils.url+'tokens/create.json',
	                    params: form.getValues(),
	                    callback: function (c, action) {
	                        if (action.response.success === true) {
	                            me.up('form').fireEvent('loginuser',action.response['auth_token']);
	                        } else {
	                            Ext.Msg.alert('Failed', action.response.message);
	                        }
	                    }
	                });
	    		}	    		
	    	}
	    }
    ]
});








