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

        var route = new Convoy.RouteSimulator(5000);
        this.items[1].handler = function() {
            route.start();
        };

        this.items[2].handler = function() {
            route.stop();
            that.mainView.fireEvent('restartJourney'); //HACK
        };

        Convoy.views.GameScreenBottomBar.superclass.initComponent.call(this);
            this.playersStore.load();

    },

    loadPlayers: function() {

        if (confirm("start new?")) {

  
        }
    }
});