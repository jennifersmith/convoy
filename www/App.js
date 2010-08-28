Geo.defaultAnim = Ext.platform.isAndroidOS ? false : 'slide';
Geo.App = Ext.extend(Ext.Panel, {
    cls: 'app',
    fullscreen: true,
    layout: 'card',
    activeItem: 0,
    
    initComponent: function() {
        var that = this;
        this.startScreen = new Geo.views.StartScreen({
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
        //this.detail = new Geo.views.LegislatorDetails();

        this.items = [this.splash];//, this.detail];
        Geo.App.superclass.initComponent.call(this);
        
        this.startScreen.on('startNewGame', this.startNewGame, this);
    },
    
    afterRender: function() {
        Geo.App.superclass.afterRender.apply(this, arguments);
        //Ext.getBody().on(Ext.isChrome ? 'click' : 'tap', this.onLinkTap, this, {delegate: 'a.goOutside'});
    },
    
    onLinkTap: function(e, t) {        
        e.stopEvent();
        Geo.Util.openUrl(t.href);
    },
    startNewGame : function(){
        alert("OK let's start a new game");
    }
    
    
});