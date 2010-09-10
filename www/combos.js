
Ext.regModel('Combo', {
    fields: [
        {name: 'name',  type: 'string'},
        {name: 'displayTpl',  type: 'string'},
        {name: 'evaluation',  type: 'string'},
        {name: 'id',  type: 'string'},
        {name: 'score',  type: 'integer'}
    ]
});

Convoy.CreateCombosStore = function(){

    return Convoy.CreateSpottablesStore();

   var result = new Ext.data.JsonPStore({
        url: Convoy.Urls.Combos,
        callbackParam: "callback",
        root: '.combos',
       reader:{
         type: "json" ,
           root: "combos"
       },
        model: 'Combo'});

    return result;
};
// WIP!

Convoy.Combos = {
    Process: function(){
        var combosStore = Convoy.CreateSpottablesStore();
        combosStore.load();


        return combosStore.getAt(0);
    }
}
