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

        Convoy.views.PlayersListPanel.superclass.initComponent.call(this);
        this.ensurePlayers();
        playerList.on("itemtap", function(sender, tapped){
            var player = playerList.getRecord(sender.getNode(tapped));
            alert(player.get("name"));
        }, this);

        this.mainView.on('playerlistchanged', function(){
                this.playersStore.load();
                playerList.refresh();
                //playerList.refresh();
        },this);

    },
    ensurePlayers: function(){
        this.playersStore.load();

    }
});