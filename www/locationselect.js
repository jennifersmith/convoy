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
				    mapTypeId: google.maps.MapTypeId.ROADMAP,
					zoom: 15
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
		var that = this;
		var nextButton = new Ext.Button({
			text: "Next",
			handler: function(){
				that.onNextButtonClicked();
			}
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
		    items: [this.locationStart, this.locationStartFind, this.locationEnd, this.locationEndFind, nextButton]
		});
        this.dockedItems = [this.toolbar];
        this.items = [mapPanel];//, this.form];
        Convoy.views.StartScreen.superclass.initComponent.call(this);
		this.on("activate", this.onActivate, this);
		this.on("deactivate", this.onDeactivate, this);
    },
	onNextButtonClicked: function(){
		
		
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
		
		var carMarker = new Convoy.CarMarker(this.map.map, 'images/redcar.png', latLng, this.locationStart, this.geocoder, "Where you are travelling from", this.locationStartFind);
		var endMarker = new Convoy.CarMarker(this.map.map, 'images/purplecar.png', suggestedEnd, this.locationEnd, this.geocoder, "Where you are travelling to", this.locationEndFind);
		

	},
	updateLocationTextFromMarker: function (){
		this.updateLocationText(this.startMarker.getPosition());
	},
	placeMarker: function(latLng){
		this.startMarker.setPosition(latLng);
		this.updateLocationTextFromMarker();
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