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
        var route = new Convoy.RouteSimulator(7000);
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

            this.playersStore.proxy.clear();
            this.playersStore.sync();
            this.playersStore.load();

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