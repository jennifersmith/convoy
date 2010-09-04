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
                '<div class="item-box" id="{id}"  >',
                        '<div style=" background-image:url({imagePath})">' ,
                '<p class="name">{name}</p>' ,
                '<p class="score">{score}</p>' ,
                         '</div>',
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


	} ,
    itemTapped: function(dataView, index, item, e){
        var playerSelect = new Convoy.views.PlayerSelect({
            itemSpotted: this.store.getById(item["id"])
        });
        playerSelect.show('pop');
    }
});

Convoy.views.PlayerSelect = Ext.extend(Ext.Panel,{
        floating: true,
        modal: true,
        centered: true,
        width: 320,
        cls: 'player-select',
        height: 300,
        styleHtmlContent: true,
        html: '',
        dockedItems: [{
            dock: 'top',
            xtype: 'toolbar',
            title: 'Player select'
        }],
        scroll: 'vertical',
        initComponent: function() {
            glob = this.itemSpotted;
            var tpl = new Ext.XTemplate(
            '<tpl for=".">',
                '<div class="item-box-small" >',
                        '<div style=" background-image:url({imagePath})">' ,
                '<p class="name">{name}</p>' ,
                '<p class="score">{score}</p>' ,
                         '</div>',
                '</div>',
            '</tpl>',
            '<div class="x-clear"></div>'
            );
            this.items =[{xtype:"panel", tpl: tpl, data: this.itemSpotted.data}] ;

            Convoy.views.PlayerSelect.superclass.initComponent.call(this);
        }
});
