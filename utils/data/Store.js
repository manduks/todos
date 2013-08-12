/**
 * @class Utils.data.Store
 * @extends Ext.data.Store
 * This is the utils store
 */
Ext.define('Utils.data.Store', {
    extend: 'Ext.data.Store',
    params: {},
    pageSize: 30,
    listeners: {
        beforeload: function (store, operation, ops) {
            var me = this;
            me.params.auth_token = localStorage.getItem("auth_token");
            store.getProxy().extraParams = me.params;
        }
    }
});