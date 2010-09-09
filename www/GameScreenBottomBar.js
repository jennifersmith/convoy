Convoy.views.GameScreenBottomBar = Ext.extend(Ext.Toolbar,
{
    dock: 'bottom',
    xtype: 'toolbar',
    title: 'CONVOY!',
    items: [
        {
            iconCls: 'bolt',
            ui:"mask"
        },
        {
            iconCls: 'locate',
            ui:"mask"
        },
        {
            iconCls: 'maps',
            ui:"mask"
        },
        {
            iconCls: 'delete',
            ui:"mask"
        }
    ],
    initComponent: function() {

        var that = this;
        this.items[0].handler = function() {
            that.loadPlayers();
        };
        this.items[1].handler = function() {
            var defaultLoc = "";
            if(Convoy.FakeLocation.stubLocation){
                defaultLoc = Convoy.FakeLocation.stubLocation.coords.latitude + "," +  Convoy.FakeLocation.stubLocation.coords.longitude;
            }
            var loc = prompt("enter location comma separated", defaultLoc).split(",");
            Convoy.FakeLocation.setLocation(loc[0], loc[1]);
        };
        var route = new Convoy.RouteSimulator(5000);
        this.items[2].handler = function() {
            route.start();
        };

        this.items[3].handler = function() {
            route.stop();
        };

        Convoy.views.GameScreenBottomBar.superclass.initComponent.call(this);
            this.playersStore.load();

    },

    loadPlayers: function() {

        if (confirm("start new?")) {

            this.playersStore.load();
            this.playersStore.proxy.clear();
            this.playersStore.sync();
            this.playersStore.load();

            this.playersStore.add(Ext.ModelMgr.create({name:"Player 1", id:"player1", currentScore: 0}, "Player"));
            this.playersStore.add(Ext.ModelMgr.create({name:"Player 2", id:"player2", currentScore: 0}, "Player"));
            this.playersStore.add(Ext.ModelMgr.create({name:"Player 3", id:"player3", currentScore: 0}, "Player"));
            this.playersStore.add(Ext.ModelMgr.create({name:"Player 4", id:"player4", currentScore: 0}, "Player"));
            this.playersStore.sync();

            this.mainView.fireEvent('playerlistchanged');
        }
    }
});