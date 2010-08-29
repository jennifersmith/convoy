Convoy.views.StartScreen = Ext.extend(Ext.Panel, {
    cls: 'start-screen',
    layout: 'card',
    activeItem: 0,
    titleTpl: new Ext.Template('<strong>{state}</strong> District {number}'),
    initComponent: function() {
        this.settingsIcon = new Ext.Button({
            iconCls: 'settings',
            handler: this.onSettingsTap,
            disabled: true
        });
        this.refreshIcon = new Ext.Button({
            iconCls: 'refresh',
            handler: this.onRefreshTap,
            disabled: true
        });
        
        this.toolbar = new Ext.Toolbar({
            title: 'Finding location...',
            dock: 'top',
            layout: {
                pack: 'end'
            },
            defaults: {
                scope: this,
                ui: 'mask'
            },
            items: [this.settingsIcon,{flex: 1},this.refreshIcon]
        });
        this.dockedItems = [this.toolbar];
//        this.list = new Convoy.views.LegislatorList({
//            scroll: false
//        });

        var newGameClick = function(){
            alert("HI");
        };
        
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
        //this.form = new Convoy.views.DistrictInfo();
        this.items = [this.main];//, this.form];
        Convoy.views.StartScreen.superclass.initComponent.call(this);
        //this.form.on('lookupDistrict', this.onFormLookup, this);
        //this.list.on('itemtap', this.onListItemTap, this);
        
        //this.geo = new Ext.util.GeoLocation();
        //this.geo.on('beforeupdate', this.onBeforeGeoUpdate, this);
        //this.geo.on('update', this.onGeoUpdate, this);
    },
    
   onFormLookup: function(district) {
        this.updateDistrict(district);
        this.setCard(0, Ext.platform.isAndroidOS ? false : 'flip');
    },
    
    onRefreshTap: function() {
        this.geo.updateLocation();
        this.settingsIcon.setDisabled(true);
        this.refreshIcon.setDisabled(true);
    },
    
    updateDistrict: function(district) {
        this.district = district;
        this.form.updateDistrict(district);
        var title = this.titleTpl.applyTemplate(district);
        this.toolbar.setTitle(title);
        this.settingsIcon.setDisabled(false);
        this.refreshIcon.setDisabled(false);

        Convoy.CongressService.getLegislatorsByDistrict(district, this.loadLegislatorStore, this);
    },
    
    onGeoUpdate: function(coords) {
        Convoy.CongressService.getDistrictFromCoords(coords, this.updateDistrict, this);
    },
    
    onBeforeGeoUpdate: function(){
        this.toolbar.setTitle('Finding location...');
        this.refreshIcon.setDisabled(true);
    },
    
    loadLegislatorStore: function(legislators) {
        Convoy.stores.Legislators.loadData(legislators);
        // needed to paint the initial list on iPad.
        Ext.repaint();
    },
    
    onSettingsTap: function() {        
        this.setCard(1, Ext.platform.isAndroidOS ? false : 'flip');
    }
});