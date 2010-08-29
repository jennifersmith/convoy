Convoy.defaultAnim = Ext.platform.isAndroidOS ? false : 'slide';
Convoy.App = Ext.extend(Ext.Panel, {
    cls: 'app',
    fullscreen: true,
    layout: 'card',
    activeItem: 0,
    
    initComponent: function() {
        var that = this;
        this.startScreen = new Convoy.views.StartScreen({
            flex: 1,
            startNewGame:function(){
                that.startNewGame();
            }
        });

        this.splash = new Ext.Container({
            cls: 'splash',
            layout: {
                type: 'vbox',
                align: 'stretch',
                pack: 'end'
            },
            items: [this.startScreen]
        });
        //this.detail = new Convoy.views.LegislatorDetails();

        this.items = [this.splash];//, this.detail];
        Convoy.App.superclass.initComponent.call(this);
        
        this.startScreen.on('startNewGame', this.startNewGame, this);
    },
    
    afterRender: function() {
        Convoy.App.superclass.afterRender.apply(this, arguments);
        //Ext.getBody().on(Ext.isChrome ? 'click' : 'tap', this.onLinkTap, this, {delegate: 'a.goOutside'});
    },
    
    onLinkTap: function(e, t) {        
        e.stopEvent();
        Convoy.Util.openUrl(t.href);
    },
    startNewGame : function(){
        alert("OK let's start a new game");
    }
    
    
});