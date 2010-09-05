/**
 * Created by IntelliJ IDEA.
 * User: jsmith
 * Date: Sep 2, 2010
 * Time: 9:53:34 PM
 * To change this template use File | Settings | File Templates.
 */

var offline = false;
Convoy.Urls = function(loadLocalhostUrls){
    function url(path){
        if(loadLocalhostUrls){
            return "http://localhost:4567" + path;
        }else{
            return "http://convoy.heroku.com" + path;
        }
    }
    return {
        Trucks: url("/data")
    };

}(offline);


Trucks = {
       get: function(success){
             Ext.util.JSONP.request( {
                 url:Convoy.Urls.Trucks,
                callbackKey: 'callback',
                callback: function(data){
                    success(data.items);  
                }
            });
       }
};
Ext.regModel('Truck', {
    fields: [
        {name: 'name',  type: 'string'},
        {name: 'imagePath',  type: 'string'},
        {name: 'id',  type: 'string'},
        {name: 'score',  type: 'integer'}
    ],

    changeName: function() {
        var oldName = this.get('name'),
            CreateTrucksStore = oldName + " The Barbarian";

        this.set('name', newName);
    }
});

Convoy.CreateTrucksStore = function(){
   return new Ext.data.JsonPStore({
        url: Convoy.Urls.Trucks,
        callbackParam: "callback",
        root: '.items',
       reader:{
         type: "json" ,
           root: "items"
       },
        model: 'Truck'});
};
//        fields: [
//            'name', 'url',
//            {name:'size', type: 'float'},
//            {name:'lastmod', type:'date', dateFormat:'timestamp'}
//        ]