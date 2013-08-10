/**
 * @class Utils.data.Store
 * @extends Ext.data.Store
 * This is the Notifications store of Cursame
 */
Ext.define('Utils.data.Store', {
    extend: 'Ext.data.Store',

    params: {},
    pageSize: 30,
    listeners: {
        beforeload: function (store, operation, ops) {
            var me = this;
            me.params.auth_token = TOKEN;
            store.getProxy().extraParams = me.params;
        }
    }
});