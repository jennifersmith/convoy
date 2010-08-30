Convoy.views.StartScreen = Ext.extend(Ext.Panel, {
    cls: 'screen start-screen',
    layout: 'card',
    activeItem: 0,
    titleTpl: new Ext.Template('<strong>{state}</strong> District {number}'),
    initComponent: function() {
      
        var startButton = new Ext.Button({
            text:"Start a new game",
            ui:'Round',
            baseCls: "x-button start-button",
            handler:this.startNewGame
        });
        
        this.main = new Ext.Container({
            scroll: true,
            items: [startButton]
        });
        this.items = [this.main];//, this.form];
        Convoy.views.StartScreen.superclass.initComponent.call(this);
    }
});