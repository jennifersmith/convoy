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
		
	  
		this.map = new Ext.Map({
				mapOptions:{
				    mapTypeId: google.maps.MapTypeId.ROADMAP,
					zoom: 15
				  }
			});
			
		var that = this;
		var nextButton = new Ext.Button({
			text: "Start the game",
			handler: function(){
				that.onNextButtonClicked();
			}
		});

		var mapPanel = new Ext.Panel({
            items: [this.map]
        });
		

	    this.geocoder = new google.maps.Geocoder();

		this.locationStart = new Ext.form.TextField({
			label: "Starting from",
			baseCls:"toolbar-textfield"
		});
		this.locationStartFind = new Ext.Button({
			text: "Find"
		})
		this.locationEnd = new Ext.form.TextField({
			label: "Going to",
			baseCls:"toolbar-textfield"
		});
		 this.locationEndFind = new Ext.Button({
			text: "Find"
		});
		this.toolbar = new Ext.Toolbar({
		    dock: 'top',
            layout: {
                pack: 'end'
            },	
            defaults: {
                scope: this,
                ui: 'mask'
            },
		    items: [this.locationStart, this.locationStartFind]
		});
		this.toolbar2 = new Ext.Toolbar({
		    dock: 'top',
            layout: {
                pack: 'end'
            },	
            defaults: {
                scope: this,
                ui: 'mask'
            },
		    items: [this.locationEnd, this.locationEndFind, nextButton]
		});
       	this.dockedItems = [this.toolbar, this.toolbar2];
        this.items = [mapPanel];
        Convoy.views.StartScreen.superclass.initComponent.call(this);
		this.on("activate", this.onActivate, this);
		this.on("deactivate", this.onDeactivate, this);
    },
	onNextButtonClicked: function(){
		var locations = {
			start: this.startMarker.getLocation(),
			end: this.endMarker.getLocation(),
		};
		this.nextScreen(locations);
		
	},
	onActivate: function(){
	    var geo = new Ext.util.GeoLocation();
		var that = this;
		geo.getLocation(function(coordinates){
			that.setMarkers(coordinates);
		});
	},
	setMarkers: function(coordinates){
		
		var latLng = new google.maps.LatLng(coordinates.latitude, coordinates.longitude);
		var suggestedEnd = new google.maps.LatLng(coordinates.latitude + 0.01, coordinates.longitude);
			this.map.map.setCenter(latLng);
		// complicated interface ahoy
		this.startMarker = new Convoy.CarMarker(this.map.map, 'images/redcar.png', latLng, this.locationStart, this.geocoder, "Where you are travelling from", this.locationStartFind);
		this.endMarker = new Convoy.CarMarker(this.map.map, 'images/purplecar.png', suggestedEnd, this.locationEnd, this.geocoder, "Where you are travelling to", this.locationEndFind);
		

	}
});

Convoy.CarMarker = function(map, icon,position, textBox, geocoder, contentString, findButton){
	var updateLocationTextFromMarker = function(latLng){
		var that = this;
	   	geocoder.geocode({'latLng': latLng}, function(results, status) {
			
			textBox.setValue(results[0].formatted_address);
	   });
	};
	
	var result =  new google.maps.Marker({
	      position: position, 
	      map: map, 
		  icon: icon,
		  draggable: true
	});
	
	findButton.handler = function(){
		var val = textBox.getValue();
		if(val){
		   	geocoder.geocode({'address': textBox.getValue(), region: 'uk'}, function(results, status) {
				var location = results[0].geometry.location;
				result.setPosition(location);
				map.panToBounds(results[0].geometry.bounds);
		   });
		}
	}
	
	var infowindow = new google.maps.InfoWindow({
	    content: contentString
	});
	
	updateLocationTextFromMarker(position);
	
	google.maps.event.addListener(result, 'click', function() {
	  infowindow.open(map,result);
	});
	 google.maps.event.addListener(result, 'dragend', function() {
	     updateLocationTextFromMarker(result.getPosition());
	 });
	
	this.getLocation = function(){
		return {latLng: result.getPosition(), description : textBox.getValue()};
	}
	
}

Convoy.overlay = function(content){
	{
		var popup = new Ext.Panel({
			floating: true,
			modal: true,
			centered: true,
			width: 320,
			height: 300,
			styleHtmlContent: true,
			html: content,
			dockedItems: [{
			  dock: 'top',
			  xtype: 'toolbar',
			  title: 'Overlay Title'
			}],
			scroll: 'vertical'
		});	
		popup.show('pop');
      }
}