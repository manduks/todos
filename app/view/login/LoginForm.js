/**
 * @class Todos.view.login.LoginForm
 * @extends extendsClass
 * Description
 */
Ext.define('Todos.view.login.LoginForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.loginform',
    requires: [
        'Ext.form.Panel',
        'Ext.layout.container.Form',
        'Ext.data.JsonP'
    ],
    frame: true,
    title: 'Simple Form',
    bodyPadding: '5 5 0',

    fieldDefaults: {
        msgTarget: 'side',
        labelWidth: 75
    },
    plugins: {
        ptype: 'datatip'
    },
    defaultType: 'textfield',
    items: [{
        fieldLabel: 'Email',
        name: 'email',
        vtype: 'email',
        value: 'armando@cursa.me',
        allowBlank: false,
        tooltip: 'Ingresa tu email'
    }, {
        fieldLabel: 'Password',
        name: 'password',
        value: '12345678',
        inputType: 'password',
        allowBlank: false,
        tooltip: 'Ingresa tu password'
    }],
    buttons: [{
        text: 'Cancel',
        handler: function () {
            this.up('form').getForm().reset();
        }
    }, {
        text: 'Submit',
        formBind: true, //only enabled once the form is valid
        disabled: true,
        handler: function () {
            var me = this,
                form = me.up('form').getForm();
            if (form.isValid()) {
                Ext.data.JsonP.request({
                    url: URL+'tokens/create.json',
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
    }]
});