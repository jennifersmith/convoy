Convoy.FakeLocation = new function(){

  if(window.console){

  navigator.geolocation.getCurrentPosition = function(callback){
      if(Convoy.FakeLocation.stubLocation){

        callback(Convoy.FakeLocation.stubLocation);
      }
    };
 }

  this.setLocation = function (latitude, longitude){
        Convoy.FakeLocation.stubLocation = {
          coords : {
              latitude:latitude,
              longitude: longitude
          }
       };
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
            id:'map-view',
            mainPanel : this
        });

        var playersListPanel = new Convoy.views.PlayersListPanel({
            height:"50%",
            width: "100%",
            playersStore: this.playersStore,
            spottablesStore: this.spottablesStore,
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

        var map = new Convoy.views.Map({height:"100%", width:"100%"});
        this.items = [map];
        }

        Convoy.views.MapPanel.superclass.initComponent.call(this);

        this.mainPanel.on("restartJourney", function(){

            map.resetLine();
        }, this);
    }

});

Convoy.views.Map = Ext.extend(Ext.Panel, {
    geo : new Ext.util.GeoLocation(),
    hasMoved: function(newLocation){
      var hasMoved =  (!this.latLng)||(this.latLng.lat()!= newLocation.lat())||(this.latLng.lng()!= newLocation.lng()) ;
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
    resetLine: function(){
        if(this.route){
//            while(this.route.getPath().length>0){
//                this.route.deleteVertex(0);
//            }
            this.route.setMap( null);
            this.route = null;
        }
       
    },
    addToRoute: function(){
      
        if(!this.route){
             var polyOptions = {
                strokeColor: '#ff0000',
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
    height: 405,
    styleHtmlContent: true,
    html: '',
    scroll: 'vertical',
    geoLocation : new Ext.util.GeoLocation(),
    initComponent: function() {

	    this.geocoder = new google.maps.Geocoder();
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
            maxHeight: 170,
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
        this.playersStore.load();
        playerList.on("selectionchange", function(dataView, selections) {
            if (selections.length) {
                scoreButton.show();
            }
            else {
                scoreButton.hide();
            }
        }, this);


        scoreButton.setHandler(function() {
            this.geoLocation.updateLocation(function(location){
               var latLng = new google.maps.LatLng(location.latitude, location.longitude);
               var that = this; //arrrrrrrrgh
               this.geocoder.geocode({'latLng': latLng}, function(results, status) {
                var locationDisplay = (results[0].formatted_address);
                var players = playerList.getSelectedRecords();
                for(var i = 0; i < players.length; i++){
                    // where is .each when you need it...
                    players[i].spottedA(that.itemSpotted, {coords: location, display:locationDisplay});
                }
                that.hide();
                that.playersStore.sync();
               });
                 
            }, this);
        }, this);
    }
});

