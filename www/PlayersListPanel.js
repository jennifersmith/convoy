/**
 * Created by IntelliJ IDEA.
 * User: jsmith
 * Date: Sep 7, 2010
 * Time: 8:52:02 AM
 * To change this template use File | Settings | File Templates.
 */

Convoy.views.PlayersListPanel = Ext.extend(Ext.Panel, {
    initComponent: function() {
        var playerList = new Ext.List({
            store: this.playersStore,
            tpl: Convoy.templates.playerMainDisplay,
            itemSelector: 'div.player',
            singleSelect: false,
            multipleSelect:false,
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
        this.historyPopup = new Convoy.views.PlayerScoreHistory({});

        Convoy.views.PlayersListPanel.superclass.initComponent.call(this);
        this.ensurePlayers();
        playerList.on("itemtap", function(sender, tapped) {
            var player = playerList.getRecord(sender.getNode(tapped));
            var history = player.getHistory(this.spottablesStore);
            this.historyPopup.show(player,history);
//            this.historyPopup.show("pop");
//
//                title: "Score history for " + player.get("name")
//            }).show("pop");


        }, this);

        this.mainView.on('playerlistchanged', function() {
            this.playersStore.load();
            playerList.refresh();
        }, this);

    },
    ensurePlayers: function() {
        this.playersStore.load();

    }
});

Convoy.views.PlayerScoreHistory = Ext.extend(Ext.Panel, {
    floating: true,
    modal: true,
    centered: true,
    width: 420,
    height: 300,
    styleHtmlContent: true,
    dockedItems: [
        {
            dock: 'top',
            xtype: 'toolbar'
        }
    ],
    initComponent: function() {
        this.store = new Ext.data.JsonStore({
              autoDestroy: true,
            storeId: 'playerHistory',
            fields: ['when', 'where', 'spotted']
        });
        this.list = new Ext.List({
            height: 200,
            store: this.store  ,
            tpl:Convoy.templates.historyItem ,
            itemSelector: 'div.historyItem',
            singleSelect: false,
            multipleSelect:false,
            grouped: false ,
            scroll: 'vertical'
        })
        this.items = [this.list];
        Convoy.views.PlayerScoreHistory.superclass.initComponent.call(this);
    },
    show: function(player, history){

        this.getDockedItems()[0].setTitle("Previously spotted by " + player.get("name") );
        this.store.loadData(history);
        this.list.doComponentLayout();
        Convoy.views.PlayerScoreHistory.superclass.show.call(this, 'pop');

    }
});
