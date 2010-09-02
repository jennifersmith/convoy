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
        Trucks.get(function(trucks){
            for(var i = 0; i < trucks.length; i++){
                mainPanel.addItem(trucks[i]);
                
            }
        });
	}
});

Convoy.views.MainPanel = Ext.extend(Ext.Panel,{
    defaults:{
        height:200,
        width:320 ,
        baseCls: "item-box",
        xtype : "panel"
    },
    layout: 'hbox',
    layoutConfig: {
        align: 'top'
    },
    initComponent: function() {
        Convoy.views.MainPanel.superclass.initComponent.call(this);
	},
    addItem:function(item){
      this.add({html:item.name});
      this.doLayout();   
    }
  }

);