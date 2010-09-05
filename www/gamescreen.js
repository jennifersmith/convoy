Convoy.views.GameScreen = Ext.extend(Ext.Panel, {
    cls: 'game-screen',
    layout: 'card',
    defaults: {
            cls:'game-panel',
            height:"100%"
    } ,
    layoutConfig: {
        pack  : 'start'
    },
    initComponent: function() {

        var tpl = Convoy.templates.itemBox;
        this.trucksStore = Convoy.CreateTrucksStore();
        this.playersStore = Convoy.CreatePlayersStore();

        this.playersStore.load();


        var that = this;

        var bottomToolbar = new Convoy.views.GameScreenBottomBar({
            playersStore : this.playersStore
        });
        
        var dataView = new Ext.DataView({
            trucksStore: this.trucksStore,
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
        this.dockedItems = [bottomToolbar];

        Convoy.views.StartScreen.superclass.initComponent.call(this);
        dataView.on("itemtap", this.itemTapped, this);
        this.trucksStore.load();


	} ,
    itemTapped: function(dataView, index, item, e){
        var playerSelect = new Convoy.views.PlayerSelect({
            itemSpotted: this.trucksStore.getById(item["id"])
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
        scroll: 'vertical',
        initComponent: function() {
            var that = this;
            var toolbar = {
            dock: 'top',
            xtype: 'toolbar',
            title: 'Player select',
            items: [{
                iconCls: 'delete',
                ui: "mask",
                id:'delete-button' ,
                handler: function(){
                    that.hide();   
                }
                }]};

            this.dockedItems = [toolbar];

            var tpl = Convoy.templates.itemBoxOnPlayerSelect;
            this.items =[{xtype:"panel", tpl: tpl, data: this.itemSpotted.data}] ;

            Convoy.views.PlayerSelect.superclass.initComponent.call(this);
        }
});

Convoy.views.GameScreenBottomBar = Ext.extend(Ext.Toolbar,
{
        dock: 'bottom',
        xtype: 'toolbar',
        title: 'CONVOY!',
        items: [{
            iconCls: 'bolt',
            ui:"mask"
        }],
    initComponent: function(){
        var that = this;
        this.items[0].handler = function(){
            that.loadPlayers();
        };
        Convoy.views.GameScreenBottomBar.superclass.initComponent.call(this);

    },

    loadPlayers: function(){

       if(confirm("start new?")){

           this.playersStore.proxy.clear();
           this.playersStore.add({name:"fred", id:"fred", currentScore: 0});
           this.playersStore.add({name:"bob", id:"bob", currentScore: 0});
           this.playersStore.add({name:"joe", id:"joe", currentScore: 0});
           this.playersStore.add({name:"freda", id:"freda", currentScore: 0});
           this.playersStore.sync();
       }

    }
});