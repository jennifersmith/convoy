Convoy.views.LocationSelectScreen = Ext.extend(Ext.Panel, {
    cls: 'screen location-select-screen',
    layout: 'card',
    activeItem: 0,
    initComponent: function() {
       
  		//       this.mapPanel = new Ext.Panel({
  		//     items: [{
  		//         xtype: 'map',
  		//         getLocation: true
  		//     }]
  		// });
		
		 var position = new google.maps.LatLng(37.44885,-122.158592);
	  
		this.map = new Ext.Map({
				mapOptions:{
				    mapTypeId: google.maps.MapTypeId.ROADMAP
				  }
			});
		var mapPanel = new Ext.Panel({
            items: [this.map]
        });


	    this.geocoder = new google.maps.Geocoder();

		this.locationStart = new Ext.form.Select({
			label: "Starting from",
			baseCls:"toolbar-textfield"
		});
		var nextButton = new Ext.Button({
			text: "Next"
		});
		var toolbar = new Ext.Toolbar({
		    dock: 'top',
            layout: {
                pack: 'end'
            },	
            defaults: {
                scope: this,
                ui: 'mask'
            },
		    title: 'Start and destination',
		    items: [this.locationStart,{flex: 1}, nextButton]
		});
        this.dockedItems = [toolbar];
        this.items = [mapPanel];//, this.form];
        Convoy.views.StartScreen.superclass.initComponent.call(this);
		this.on("activate", this.onActivate, this);
		this.on("deactivate", this.onDeactivate, this);
		
		
    },
	onActivate: function(){
	    this.geo = new Ext.util.GeoLocation();
        this.geo.on('update', this.onGeoUpdate, this);
	},
	onDeactivate: function(){
		this.geo.purgeListeners();
	},
	onGeoUpdate: function(coordinates){
		
		var latLng = new google.maps.LatLng(coordinates.latitude, coordinates.longitude);
			this.map.map.setCenter(latLng);
			
		var marker = new google.maps.Marker({
		      position: latLng, 
		      map: this.map.map, 
		      title:"Hello World!",
			  draggable: true
		  });
		this.updateLocationText(latLng);
		var that = this;
	    google.maps.event.addListener(marker, 'dragend', function() {
	      that.updateLocationText(marker.getPosition());
	    });
	},
	updateLocationText : function(latLng){
	   var that = this;
	   this.geocoder.geocode({'latLng': latLng}, function(results, status) {
			options = new Array();
			for(item in results){
				var val = results[item].formatted_address;
				if(val){
					options.push({text:val, value:val});
				}
			}
			that.locationStart.setOptions(options);
	   });
	}
});

