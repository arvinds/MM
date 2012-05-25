/**
 * MapManager class
 * Wrapper to Mapping libraries to allow for atomicity of mapping code
 * Provides convenience methods only for executing actions in scope
 */

var MapManager = function($container) {

	// Load all necessary modules
	Microsoft.Maps.loadModule('Microsoft.Maps.Directions');

	// Initialize the map
	var mapOptions = {
		credentials: MapManager.Config.mapCredentials,
		disableBirdseye : true,
		showDashboard : false,
		mapTypeId: Microsoft.Maps.MapTypeId.road
	};
	this.map = new Microsoft.Maps.Map($container, mapOptions);
	
	this.directionsManager = null; 
	
	this.locationPins = {};
	
}

MapManager.Config = {
	mapCredentials : "Aq1YIJbPm7C4HzFc_271JbEI8BoEIoccyB_g10Fa21jupGJKBG-Ocv0Cbmbt0cet",
	allowedCountries : [ "United States" ]
};

MapManager.prototype.addLocationPin = function(id, location) {
	var pin = new Microsoft.Maps.Pushpin(location);
	this.locationPins[id] = pin;
	this.map.setView({ center: location, zoom: 10 });
	this.map.entities.push(pin);
}

MapManager.prototype.removeLocationPin = function(id) {
	if (!this.locationPins[id]) return;
	var indexOfPinToRemove = this.map.entities.indexOf(this.locationPins[id]);
	this.map.entities.removeAt(indexOfPinToRemove);
	delete this.locationPins[id];
}

MapManager.prototype.getLocationPin = function(id) {
	return this.locationPins[id];
}

MapManager.prototype.hasLocationPinId = function(id) {
	if (this.locationPins[id]) {
		return true;
	}
	
	return false;
}

MapManager.prototype.findLocation = function(request, response) {
	$.ajax({
        url: "http://dev.virtualearth.net/REST/v1/Locations",
        dataType: "jsonp",
        data: {
            key: MapManager.Config.mapCredentials,
            q: request.term
        },
        jsonp: "jsonp",
        success: function (data) {
            var result = data.resourceSets[0];
            if (result) {
                if (result.estimatedTotal > 0) {
                    response($.map(result.resources, function (item) {
						if ($.inArray(item.address.countryRegion, MapManager.Config.allowedCountries) > -1) {
							return {
								data: item,
								label: item.name,
								value: item.name
							}
						}
                    }));
                }
            }
        }
	});
}

MapManager.prototype.calculateRoute = function() {
	var self = this;
	var fromLoc = self.getLocationPin('from').getLocation();
	var toLoc = self.getLocationPin('to').getLocation();
	
	var viewBoundaries = Microsoft.Maps.LocationRect.fromLocations(fromLoc, toLoc);
	self.map.setView({ bounds: viewBoundaries});
	
	// Create all waypoints
	var startWaypoint = new Microsoft.Maps.Directions.Waypoint({ location: fromLoc });
	var endWaypoint = new Microsoft.Maps.Directions.Waypoint({ location : toLoc });
	
	if (!self.directionsManager) {
		self.directionsManager = new Microsoft.Maps.Directions.DirectionsManager(this.map);
	}
	
	// Clear previous directions
	self.directionsManager.resetDirections();
	
	self.directionsManager.addWaypoint(startWaypoint);
	self.directionsManager.addWaypoint(endWaypoint);
	Microsoft.Maps.Events.addHandler(self.directionsManager, 'directionsError', errorHandler);
	self.directionsManager.setRequestOptions({ routeDraggable : false });
	self.directionsManager.setRenderOptions({ waypointPushpinOptions : { draggable : false } });
	self.directionsManager.calculateDirections();

	var errorHandler = function () {
	}
}
