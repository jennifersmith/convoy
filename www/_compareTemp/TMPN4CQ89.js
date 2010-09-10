Convoy.views.StartScreen = Ext.extend(Ext.Panel, {
    layout: 'card',
    activeItem: 0,
    initComponent: function() {
         var that = this;
        var startButton = new Ext.Button({
            text:"Start a new game",
            ui:'Round',
            baseCls: "x-button start-button",
            handler: function(){
                that.startNewGame();
            }
        });
        var continueButton = new Ext.Button({
            text:"Continue Game",
            ui:'Round',
            baseCls: "x-button start-button",
            handler: function(){
                that.nextScreen();
            }
        });
        var buttons;
        this.playersStore = Convoy.CreatePlayersStore();
        this.playersStore.load();
        if(this.playersStore.getCount()==0){
            buttons = [startButton];
        }
        else{
            buttons = [startButton, continueButton];
        }
        this.main = new Ext.Container({
            scroll: true,
            items: buttons
        });
        this.items = [this.main];//, this.form];
        Convoy.views.StartScreen.superclass.initComponent.call(this);
    },
    startNewGame: function(){
        this.playersStore.load();
        this.playersStore.proxy.clear();
        this.playersStore.sync();
        this.playersStore.load();

        this.playersStore.add(Ext.ModelMgr.create({name:"Player 1", id:"player1", currentScore: 0}, "Player"));
        this.playersStore.add(Ext.ModelMgr.create({name:"Player 2", id:"player2", currentScore: 0}, "Player"));
        this.playersStore.add(Ext.ModelMgr.create({name:"Player 3", id:"player3", currentScore: 0}, "Player"));
        this.playersStore.add(Ext.ModelMgr.create({name:"Player 4", id:"player4", currentScore: 0}, "Player"));
        this.playersStore.sync();
        this.nextScreen();
    }
});  