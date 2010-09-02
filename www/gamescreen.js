Convoy.views.GameScreen = Ext.extend(Ext.Panel, {
    cls: 'game-screen',
    layout: 'hbox',
    defaults: {
            cls:'game-panel',
            height:"100%"
    } ,
    layoutConfig: {
        align : 'stretch',
        pack  : 'start'
    },
    initComponent: function() {
        var mainPanel = new Convoy.views.MainPanel({
            width: '75%'
        });

        var rightPanel = new Ext.Panel({
            layout: 'vbox',
            width: '25%',
        html: "RIGHT"
        });
		this.items = [mainPanel, rightPanel];
        Convoy.views.StartScreen.superclass.initComponent.call(this);
	}
});

Convoy.views.MainPanel = Ext.extend(Ext.Panel,{
    defaults:{
        height:200,
        width:320 
    },
    layout: 'hbox',
    layoutConfig: {
        align : 'stretch',
        pack  : 'center'
    },
items: [
    {html:'1,1',  x:20, y:10},
    {html:'1,2 '},
    {html:'1,3'},
    {html:'2,2'},
    {html:'3,2'},
    {html:'3,3'}
],
    initComponent: function() {
        Convoy.views.MainPanel.superclass.initComponent.call(this);
	} });