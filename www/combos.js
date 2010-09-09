
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
   return new Ext.data.JsonPStore({
        url: Convoy.Urls.Data,
        callbackParam: "callback",
        root: '.items',
       reader:{
         type: "json" ,
           root: "combos"
       },
        model: 'Combo'});
};
//
//            :id=>'4Set',
//            :name=>'Set of four',
//            :evaluation=>'Convoy.Combos.setOf4('category')',
//            :displayTpl=>'Set of four: {category}'

Convoy.Combos.Process = function(){
    var combosStore = Convoy.CreateCombosStore();

    alert(combosStore.getCount());
}
