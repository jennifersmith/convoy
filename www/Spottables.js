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
        Data: url("/data"),
        Combos: url("/combos")
    };

}(offline);


Ext.regModel('Spottable', {
    fields: [
        {name: 'name',  type: 'string'},
        {name: 'imagePath',  type: 'string'},
        {name: 'id',  type: 'string'},
        {name: 'score',  type: 'integer'}
    ]
});

Convoy.CreateSpottablesStore = function(){
   return new Ext.data.JsonPStore({
        url: Convoy.Urls.Data,
        callbackParam: "callback",
        root: '.items',
       reader:{
         type: "json" ,
           root: "items"
       },
        model: 'Spottable'});
};
//        fields: [
//            'name', 'url',
//            {name:'size', type: 'float'},
//            {name:'lastmod', type:'date', dateFormat:'timestamp'}
//        ]