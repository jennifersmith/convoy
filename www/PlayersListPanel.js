/**
 * Created by IntelliJ IDEA.
 * User: jsmith
 * Date: Sep 7, 2010
 * Time: 8:52:02 AM
 * To change this template use File | Settings | File Templates.
 */

Convoy.views.PlayersListPanel = Ext.extend(Ext.Panel, {
    initComponent: function() {
        var that = this;
        this.playerList = new Ext.List({
            store: this.playersStore,
            height:'100%',
            tpl: Convoy.templates.playerMainDisplay,
            itemSelector: 'div.player',
            singleSelect: false,
            multipleSelect:false,
            grouped: false,
            indexBar: true ,
            scroll: true
        });

        this.playerList.components = [
            {
                config: {
                    xtype: 'button',
                    ui:'mask',
                    iconCls: 'bookmarks',
                    handler:function(sender, event){
                        that.showHistory(event.target);
                    }
                }
            },
            {
                config: {
                    xtype: 'button',
                    ui:'mask',
                    iconCls: 'compose',
                    handler:function(sender, event){
                        that.showEdit(event.target);
                    }
                }
            }
        ];

        var toolbar = {
            dock: 'top',
            xtype: 'toolbar',
            title: 'Players',
            layout: {
                pack: 'right'
            },
            items: [
                {
                    iconCls: 'add',
                    ui: "mask",
                    id:'delete-button' ,
                    handler: function() {
                        var nextId = that.playersStore.getCount() +1;
                        that.playersStore.add(Ext.ModelMgr.create({name:"Player " + nextId, id:"player" + nextId, currentScore: 0}, "Player"));
                        that.playersStore.sync();
                    }
                } ]
        };

        this.dockedItems = [toolbar];
        this.items = [this.playerList];
        this.historyPopup = new Convoy.views.PlayerScoreHistory({});
        this.playerEdit = new Convoy.views.PlayerEdit({playersStore : this.playersStore});

        Convoy.views.PlayersListPanel.superclass.initComponent.call(this);
        this.ensurePlayers();

        this.mainView.on('playerlistchanged', function() {
            this.playersStore.load();
            this.playerList.refresh();
        }, this);

    },  
    ensurePlayers: function() {
        this.playersStore.load();

    },
    showHistory: function(target){
        var node = this.playerList.findItemFromChild(target);
        if (node) {
            var player = this.playerList.getRecord(node);
            this.historyPopup.show(player,history);
        }

    },
    showEdit: function(target){
        var node = this.playerList.findItemFromChild(target);
        if (node) {
            var player = this.playerList.getRecord(node);
            this.playerEdit.show(player);
        }

    }
});

Convoy.views.PlayerEdit =  Ext.extend(Ext.Panel, {
    floating: true,
    modal: true,
    centered: true,
    width: 420,
    height: 300,
    styleHtmlContent: true,

    initComponent: function(){
        var that = this; // every time I put this in my code a fairy dies
        var toolbar = {
        dock: 'top',
        xtype: 'toolbar',
        title: 'Edit player',
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
        var textField = new Ext.form.TextField(
                {
                    xtype: 'textfield',
                    name : 'name',
                    label: 'Player name',
                    required: 'true'
                }
        )
        this.form = new Ext.form.FormPanel({
            items: [textField]
        });
        var saveButton = new Ext.Button({text: "Save"});
        this.items = [this.form, saveButton];
        Convoy.views.PlayerEdit.superclass.initComponent.call(this);
        saveButton.setHandler(this.savePlayer, this);

        textField.on("keyup", this.savePlayerWhenPressEnter, this);

    } ,
    show: function(player){
        this.player = player; // ick!
        this.form.load(player);
        Convoy.views.PlayerEdit.superclass.show.call(this, 'pop');
    },
    savePlayer: function(){
        this.form.updateModel(this.player);
        this.playersStore.sync();
        this.hide();
    },
    savePlayerWhenPressEnter : function(sender, e){
        if(e.browserEvent.keyCode==13){       // enter
            this.savePlayer();
        }

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
