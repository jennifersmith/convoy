Convoy.FakeLocation = new function(){
  this.stubLocation = {
          coords : {
              latitude: 51.3026 ,
              longitude: 0.739
          }
       };
  if(window.console){

  navigator.geolocation.getCurrentPosition = function(callback){
        callback(Convoy.FakeLocation.stubLocation);
    } ;
 }

  this.setLocation = function (latitude, longitude){
        Convoy.FakeLocation.stubLocation.coords.latitude = latitude;
        Convoy.FakeLocation.stubLocation.coords.longitude = longitude;
  };
  return this;
}();



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

        var tpl = Convoy.templates.itemBox;
        this.spottablesStore = Convoy.CreateSpottablesStore();
        this.playersStore = Convoy.CreatePlayersStore();

        this.playersStore.load();


        var bottomToolbar = new Convoy.views.GameScreenBottomBar({
            playersStore : this.playersStore,
            mainView : this
        });

        var spottablesPanel = new Convoy.views.SpottablesPanel({
            id:'main-view',
            width: '75%',
            spottablesStore : this.spottablesStore,
            playersStore : this.playersStore
        });

        var mapPanel = new Convoy.views.MapPanel(
        {
            height: "50%", width:"100%",
            id:'map-view'
        });

        var playersListPanel = new Convoy.views.PlayersListPanel({
            height:"50%",
            width: "100%",
            playersStore: this.playersStore,
            mainView : this});

        var rightPanel = new Ext.Panel({
            id:'right-view',
            width: '25%',
            height: '100%',
            items: [playersListPanel,mapPanel]
        });
        this.items = [ spottablesPanel, rightPanel];
        this.dockedItems = [bottomToolbar];


        Convoy.views.StartScreen.superclass.initComponent.call(this);





    } 
});

Convoy.views.SpottablesPanel = Ext.extend(Ext.Panel, {
    initComponent: function() {

        var tpl = Convoy.templates.itemBox;

        var dataView = new Ext.DataView({
            store: this.spottablesStore,
            tpl: tpl,
            overClass:'x-view-over',
            itemSelector:'div.item-box',
            emptyText: 'No data',
            scroll:true ,
            singleSelect:false,
            multiSelect:false,
            height :'100%' 
        });

//        var testButton = new Ext.Button({
//            iconCls: "smile", ui:"mask" , cls: "x-spottable-button", text: "Smile!"
//        });

        this.items = [dataView];



        Convoy.views.SpottablesPanel.superclass.initComponent.call(this);

        dataView.on("itemtap", this.itemTapped, this);

        this.spottablesStore.load();


    } ,
    itemTapped: function(dataView, index, item, e) {
        var playerSelect = new Convoy.views.PlayerSelect({
            itemSpotted: this.spottablesStore.getById(item["id"]),
            playersStore : this.playersStore
        });
        playerSelect.show('pop');
    }

});
Convoy.views.MapPanel = Ext.extend(Ext.Panel, {
    initComponent: function() {

        var toolbar = {
            dock: 'top',
            xtype: 'toolbar',
            title: 'Location'};
        this.dockedItems = [toolbar];
        if(offline){
            this.items = [{xtype: "panel", html:"Map not available in offline mode"}];
        } else{

        this.items = [new Convoy.views.Map({height:"100%", width:"100%"})];   
        }

        Convoy.views.MapPanel.superclass.initComponent.call(this);
    }

});

Convoy.views.Map = Ext.extend(Ext.Panel, {
    geo : new Ext.util.GeoLocation(),
    hasMoved: function(newLocation){
      var hasMoved =  (!this.latLng)||(this.latLng.latitude!= newLocation.longitude)||(this.latLng.longitude!= newLocation.longitude) ;
        return hasMoved;

    },
    setMarker: function(){

        if(!this.marker){
             this.marker =  new google.maps.Marker({
                              map: this.map.map,
                              icon: "images/purplecar.png",
                              draggable: false,
                              position: this.latLng
                        });

        }
        else{     
            this.marker.setPosition(this.latLng);
        }
        this.addToRoute();
    },
    addToRoute: function(){
      
        if(!this.route){
             var polyOptions = {
                strokeColor: '#000000',
                strokeOpacity: 1.0,
                strokeWeight: 3,
                geodesic: true,
                 map:this.map.map
              };
              this.route = new google.maps.Polyline(polyOptions);
        }
        var path = this.route.getPath();

        path.push(this.latLng);
    },
    initComponent: function() {

        Convoy.views.Map.superclass.initComponent.call(this);
        this.on("render", function() {

            this.map = new Ext.Map({
                zoom: 12
            });
            this.map.on("render", function(){
                this.geo.on("update", function(position){    
                    
                    var newLatLng = new google.maps.LatLng(position.latitude, position.longitude);
                    if(this.hasMoved(newLatLng)){
                        this.latLng = newLatLng;
                        this.map.map.panTo(this.latLng);
                        this.setMarker();
                    }
                }, this) ;
                var geo = this.geo;

                setInterval(function(){
                    geo.updateLocation();
                }, 2000);
            }, this);
            this.add(this.map);
        }, this);
    }



});
Convoy.views.PlayerSelect = Ext.extend(Ext.Panel, {
    floating: true,
    modal: true,
    centered: true,
    width: 320,
    cls: 'player-select',
    height: 350,
    styleHtmlContent: true,
    html: '',
    scroll: 'vertical',
    geoLocation : new Ext.util.GeoLocation(),
    initComponent: function() {
        var that = this;
        var toolbar = {
            dock: 'top',
            xtype: 'toolbar',
            title: 'Player select',
            items: [
                {
                    iconCls: 'delete',
                    ui: "mask",
                    id:'delete-button' ,
                    handler: function() {
                        that.hide();
                    }
                }
            ]};

        this.dockedItems = [toolbar];


        var playerList = new Ext.List({
            maxHeight: 180,
            store: this.playersStore,
            tpl: Convoy.templates.playerSelectListItem,
            itemSelector: 'div.player',
            singleSelect: false,
            multiSelect:true,
            grouped: false,
            scroll: true
        });

        var scoreButton = new Ext.Button({ text: "SCORE!"});
        scoreButton.hide();
        this.playersStore.load();

        this.items = [
            {xtype:"panel", tpl: Convoy.templates.itemBoxOnPlayerSelect, data: this.itemSpotted.data},
            playerList,
            scoreButton
        ];

        Convoy.views.PlayerSelect.superclass.initComponent.call(this);
        playerList.on("selectionchange", function(dataView, selections) {
            if (selections.length) {
                scoreButton.show();
            }
            else {
                scoreButton.hide();
            }
        }, this);


        scoreButton.setHandler(function() {
            this.geoLocation.getLocation(function(location){
                var players = playerList.getSelectedRecords();
                for(var i = 0; i < players.length; i++){
                    // where is .each when you need it...
                    players[i].spottedA(this.itemSpotted, location);
                }
                this.hide();
                this.playersStore.sync();
            }, this);
        }, this);
    }
});

Convoy.views.GameScreenBottomBar = Ext.extend(Ext.Toolbar,
{
    dock: 'bottom',
    xtype: 'toolbar',
    title: 'CONVOY!',
    items: [
        {
            iconCls: 'bolt',
            ui:"mask"
        },
        {
            iconCls: 'locate',
            ui:"mask"
        }
    ],
    initComponent: function() {
        var that = this;
        this.items[0].handler = function() {
            that.loadPlayers();
        };
        this.items[1].handler = function() {
            var loc = prompt("enter location comma separated").split(",");
            Convoy.FakeLocation.setLocation(loc[0], loc[1]);
        };
        Convoy.views.GameScreenBottomBar.superclass.initComponent.call(this);
            this.playersStore.load();

    },

    loadPlayers: function() {

        if (confirm("start new?")) {

            this.playersStore.proxy.clear();
            this.playersStore.sync();
            this.playersStore.load();
            
            this.playersStore.add(Ext.ModelMgr.create({name:"fred", id:"fred", currentScore: 0}, "Player"));
            this.playersStore.add(Ext.ModelMgr.create({name:"bob", id:"bob", currentScore: 0}, "Player"));
            this.playersStore.add(Ext.ModelMgr.create({name:"joe", id:"joe", currentScore: 0}, "Player"));
            this.playersStore.add(Ext.ModelMgr.create({name:"freda", id:"freda", currentScore: 0}, "Player"));
            this.playersStore.add(Ext.ModelMgr.create({name:"frank", id:"frank", currentScore: 0}, "Player"));
            this.playersStore.sync();
                    
            this.mainView.fireEvent('playerlistchanged');
        } 
    }
});