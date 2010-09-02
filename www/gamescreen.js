Convoy.views.GameScreen = Ext.extend(Ext.Panel, {
    cls: 'screen',
    layout: 'card',

    activeItem: 0,
    initComponent: function() {
		var rootPanel = new Ext.Panel({
			layout:'vbox',
			layoutConfig: {
			    align : 'stretch',
			    pack  : 'start',
			},
			items: [
			    {html:'panel 1', flex:1},
			    {html:'panel 2', height:"75%"},
			    {html:'panel 3', flex:2}
			]
		});
		this.dockedItems = [];
		this.items = [rootPanel];
        Convoy.views.StartScreen.superclass.initComponent.call(this);
	}
});