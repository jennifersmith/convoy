/**
 * Created by IntelliJ IDEA.
 * User: jsmith
 * Date: Sep 2, 2010
 * Time: 9:53:34 PM
 * To change this template use File | Settings | File Templates.
 */

Trucks = {
       get: function(success){
             Ext.util.JSONP.request( {
                 url:'http://convoy.heroku.com/data',
                callbackKey: 'callback',
                callback: function(data){
                    success(data.items);  
                }
            });
       }
};
