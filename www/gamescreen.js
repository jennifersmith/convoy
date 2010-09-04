Convoy.views.GameScreen = Ext.extend(Ext.Panel, {
    cls: 'game-screen',
    layout: 'hbox',
    defaults: {
            cls:'game-panel',
            height:"100%"
    } ,
    layoutConfig: {
        pack  : 'start'
    },
    initComponent: function() {

        var tpl = new Ext.XTemplate(
            '<tpl for=".">',
                '<div class="item-box"  >',
                        '<div style=" background-image:url({imagePath})"><p>{name}</p></div>',
                '</div>',
            '</tpl>',
            '<div class="x-clear"></div>'
        );
        this.store = Convoy.CreateTrucksReader();


        var dataView = new Ext.DataView({
            store: this.store,
            tpl: tpl,
            overClass:'x-view-over',
            itemSelector:'div.item-box',
            emptyText: 'No data',
            scroll:true ,
            singleSelect:false,
            multiSelect:false
        });
        var panel = new Ext.Panel({
            id:'main-view',
            width: '75%',


            items: dataView
        });

        var rightPanel = new Ext.Panel({
            layout: 'vbox',
            width: '25%',
            items:[panel]
        });
		this.items =[panel, rightPanel];

        Convoy.views.StartScreen.superclass.initComponent.call(this);
        dataView.on("itemtap", this.itemTapped, this);
        this.store.load();


	}     ,
    itemTapped: function(dataView, index, item, e){
        alert("you just clicked on " + item["id"]);
        
    }
});
