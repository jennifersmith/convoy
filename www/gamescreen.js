Convoy.views.GameScreen = Ext.extend(Ext.Panel, {
    cls: 'game-screen',
    layout: 'hbox',
    defaults: {
            cls:'game-panel',
            height:"100%"
    } ,
    layoutConfig: {
        pack  : 'start'
    },
    initComponent: function() {
        var mainPanel = new Convoy.views.MainPanel({
            width: '75%'
        });
        var tpl = new Ext.XTemplate(
            '<tpl for=".">',
                '<div class="item-box" id="{id}" style=" background-image:url({imagePath})">{name}<br/>',
                '</div>',
            '</tpl>',
            '<div class="x-clear"></div>'
        );
        var store = Convoy.CreateTrucksReader();
        

        var panel = new Ext.Panel({
            id:'images-view',
           

            items: new Ext.DataView({
                store: store,
                tpl: tpl,
                overClass:'x-view-over',
                itemSelector:'div.item-box',
                emptyText: 'No data',
                scroll:true ,
                singleSelect:false,
                multiSelect:false
            })
        });

        var rightPanel = new Ext.Panel({
            layout: 'vbox',
            width: '25%',
            items:[panel]
        });
		this.items =panel;//[mainPanel, rightPanel];

        Convoy.views.StartScreen.superclass.initComponent.call(this);
        store.load();


        Trucks.get(function(trucks){
            for(var i = 0; i < trucks.length; i++){
              //  mainPanel.addItem(trucks[i]);
                
            }
        });
	}
});

Convoy.views.MainPanelRow = Ext.extend(Ext.Panel,{
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

//Ext.layout.TYPES['main-panel-row'] = Convoy.views.MainPanelRow; 
Ext.reg('main-panel-row', Convoy.views.MainPanelRow);


Convoy.views.MainPanel = Ext.extend(Ext.Panel,{
   defaults:{
        xtype : "main-panel-row"
    },
    columns: 2,
    layout: 'vbox',
    layoutConfig: {
        align: 'top'
    },
    initComponent: function() {
        Convoy.views.MainPanel.superclass.initComponent.call(this);
	},
    addRow : function(){
        var that = this;
        this.add({rowNum:1, xtype:"main-panel-row", html:"foo"});
        this.add({rowNum:1, xtype:"button", handler: function(){
            alert(that.items[0]);
        }});
        this.doLayout();
    } ,
    currentRow : function(){
        if(this.items.length==0){
           this.addRow();
        };
        return this.items[0];
    },
    addItem:function(item){
this.addRow();
//      if (this.currentRow().items.length == columns){
//          this.addRow();
//      }
      //this.currentRow().addItem(item);
    }
  }

);