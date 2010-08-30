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
            nextScreen:function(){
				that.setCard(1);
            }
        });
        this.locationSelectScreen = new Convoy.views.LocationSelectScreen({
           
            nextScreen:function(){
				alert ("START THE GAME");
            }
        });

        //this.detail = new Convoy.views.LegislatorDetails();

        this.items = [this.startScreen, this.locationSelectScreen];
        Convoy.App.superclass.initComponent.call(this);
        
    },
    
    afterRender: function() {
        Convoy.App.superclass.afterRender.apply(this, arguments);
        //Ext.getBody().on(Ext.isChrome ? 'click' : 'tap', this.onLinkTap, this, {delegate: 'a.goOutside'});
    },
    
    onLinkTap: function(e, t) {        
        e.stopEvent();
        Convoy.Util.openUrl(t.href);
    }
    
    
});