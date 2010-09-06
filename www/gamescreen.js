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

        var tpl = Convoy.templates.itemBox;
        this.trucksStore = Convoy.CreateTrucksStore();
        this.playersStore = Convoy.CreatePlayersStore();

        this.playersStore.load();


        var that = this;

        var bottomToolbar = new Convoy.views.GameScreenBottomBar({
            playersStore : this.playersStore,
            mainView : this
        });

        var dataView = new Ext.DataView({
            store: this.trucksStore,       // I have no clue how this is working... it doesnt when i call it store
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

        var mapPanel = new Convoy.views.MapPanel(
        {
            height: "50%", width:"100%",
            id:'map-view'
        });

        var playersListPanel = new Convoy.views.PlayersListPanel({
            height:"50%",
            width: "100%",
            playersStore: this.playersStore,
            mainView : this});

        var rightPanel = new Ext.Panel({
            id:'right-view',
            width: '25%',
            height: '100%',
            items: [mapPanel,playersListPanel]
        });
        this.items = [ panel, rightPanel];
        this.dockedItems = [bottomToolbar];


        Convoy.views.StartScreen.superclass.initComponent.call(this);


        dataView.on("itemtap", this.itemTapped, this);

        this.trucksStore.load();


    } ,
    itemTapped: function(dataView, index, item, e) {
        var playerSelect = new Convoy.views.PlayerSelect({
            itemSpotted: this.trucksStore.getById(item["id"]),
            playersStore : this.playersStore
        });
        playerSelect.show('pop');
    }
});

Convoy.views.PlayersListPanel = Ext.extend(Ext.Panel, {
    initComponent: function() {
         var playerList = new Ext.List({
            store: this.playersStore,
            tpl: Convoy.templates.playerMainDisplay,
            itemSelector: 'div.player',
            singleSelect: false,
            grouped: false,
            indexBar: true ,
            scroll: true
        });

         var toolbar = {
            dock: 'top',
            xtype: 'toolbar',
            title: 'Players'
            };

        this.dockedItems = [toolbar];
        this.items = [playerList];

        Convoy.views.PlayersListPanel.superclass.initComponent.call(this);
        this.ensurePlayers();
        this.mainView.on('playerlistchanged', function(){
            playerList.hide();
            setTimeout(1000, function(){
            //this.playersStore.load();
            playerList.show("Fade");  });
        },this);

    },
    ensurePlayers: function(){
        this.playersStore.load();

    }
});
Convoy.views.MapPanel = Ext.extend(Ext.Panel, {
    initComponent: function() {

        Convoy.views.MapPanel.superclass.initComponent.call(this);
        this.on("render", function() {
            var map = new Ext.Map({
            });
            this.add(map);
        }, this);
    }



});
Convoy.views.PlayerSelect = Ext.extend(Ext.Panel, {
    floating: true,
    modal: true,
    centered: true,
    width: 320,
    cls: 'player-select',
    height: 350,
    styleHtmlContent: true,
    html: '',
    scroll: 'vertical',
    initComponent: function() {
        var that = this;
        var toolbar = {
            dock: 'top',
            xtype: 'toolbar',
            title: 'Player select',
            items: [
                {
                    iconCls: 'delete',
                    ui: "mask",
                    id:'delete-button' ,
                    handler: function() {
                        that.hide();
                    }
                }
            ]};

        this.dockedItems = [toolbar];


        var playerList = new Ext.List({
            maxHeight: 180,
            store: this.playersStore,
            tpl: Convoy.templates.playerSelectListItem,
            itemSelector: 'div.player',
            singleSelect: true,
            grouped: false,
            indexBar: true ,
            scroll: true
        });

        var scoreButton = new Ext.Button({ text: "SCORE!"});
        scoreButton.hide();
        this.playersStore.load();

        this.items = [
            {xtype:"panel", tpl: Convoy.templates.itemBoxOnPlayerSelect, data: this.itemSpotted.data},
            playerList,
            scoreButton
        ];

        Convoy.views.PlayerSelect.superclass.initComponent.call(this);
        playerList.on("selectionchange", function(dataView, selections) {
            if (selections.length) {
                scoreButton.show();
            }
            else {
                scoreButton.hide();
            }
        }, this);


        scoreButton.setHandler(function() {
            var player = playerList.getSelectedRecords()[0];
            player.addToScore(this.itemSpotted.data.score);
            this.playersStore.sync();
            this.hide();
        }, this);
    }
});

Convoy.views.GameScreenBottomBar = Ext.extend(Ext.Toolbar,
{
    dock: 'bottom',
    xtype: 'toolbar',
    title: 'CONVOY!',
    items: [
        {
            iconCls: 'bolt',
            ui:"mask"
        }
    ],
    initComponent: function() {
        var that = this;
        this.items[0].handler = function() {
            that.loadPlayers();
        };
        Convoy.views.GameScreenBottomBar.superclass.initComponent.call(this);
            this.playersStore.load();

    },

    loadPlayers: function() {

        if (confirm("start new?")) {

            this.playersStore.proxy.clear();
            this.playersStore.add(Ext.ModelMgr.create({name:"fred", id:"fred", currentScore: 0}, "Player"));
            this.playersStore.add(Ext.ModelMgr.create({name:"bob", id:"bob", currentScore: 0}, "Player"));
            this.playersStore.add(Ext.ModelMgr.create({name:"joe", id:"joe", currentScore: 0}, "Player"));
            this.playersStore.add(Ext.ModelMgr.create({name:"freda", id:"freda", currentScore: 0}, "Player"));
            this.playersStore.add(Ext.ModelMgr.create({name:"frank", id:"frank", currentScore: 0}, "Player"));

            this.playersStore.sync();
            this.mainView.fireEvent('playerlistchanged');
        }
    }
});