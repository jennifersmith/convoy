Convoy.views.GameScreen = Ext.extend(Ext.Panel, {
    cls: 'game-screen',
    layout: 'card',

    activeItem: 0,
    initComponent: function() {
		var rootPanel = new Ext.Panel({
			layout:'hbox',
            defaults: {
                cls:'game-panel'
            },
			layoutConfig: {
			    align : 'stretch',
			    pack  : 'start'
			},
			items: [
			    {html:'main game bit', width:"75%", height:"100%"},
			    {html:'other bits', height:"100%", width:"25%"}
			]
		});
		this.dockedItems = [];
		this.items = [rootPanel];
        Convoy.views.StartScreen.superclass.initComponent.call(this);
	}
});