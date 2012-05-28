/**
 * MapManager class
 * Wrapper to mapping libraries to allow for atomicity of mapping code
 * Provides convenience methods only for executing actions in scope
 */

var MapManager = function($container) {

	var latlng = new google.maps.LatLng(39.909736,-101.433106);

	// Initialize the map
	var mapOptions = {
		zoom: 3,
		center : latlng,
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		disableDefaultUI : true,
		zoomControl : true
    };
	
	this.map = new google.maps.Map($container, mapOptions);
	this.geocoder = null; 
	
	this.locationMarkers = {};
	
}

MapManager.prototype.addLocationMarker = function(id, location, addToMap) {
	var Marker = new google.maps.Marker({
		position : location,
		map : this.map
	});
	this.locationMarkers[id] = Marker;
	if (addToMap) {
		this.map.panTo(location);
		this.map.setZoom(8);
	}
}

MapManager.prototype.removeLocationMarker = function(id) {
	if (!this.locationMarkers[id]) return;
	var indexOfMarkerToRemove = this.locationMarkers[id].setMap(null);
	delete this.locationMarkers[id];
}

MapManager.prototype.getLocationMarker = function(id) {
	return this.locationMarkers[id];
}

MapManager.prototype.hasLocationMarkerId = function(id) {
	if (this.locationMarkers[id]) {
		return true;
	}
	
	return false;
}

MapManager.prototype.findLocation = function(request, response) {
	if (!this.geocoder) {
		this.geocoder = new google.maps.Geocoder();
	}	
	this.geocoder.geocode( { 'address': request.term, 'region' : 'US'}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        response($.map(results, function (item) {
			for (var i in item.address_components) {
				if (item.address_components[i].short_name === 'US') {
					return {
						data: item,
						label: item.formatted_address,
						value: item.formatted_address
					}
				}
			}
		}));
      }
    });
}

MapManager.prototype.calculateRoute = function() {
	var self = this;
	var fromLoc = self.getLocationMarker('from').getPosition();
	var toLoc = self.getLocationMarker('to').getPosition();
	
	var directionsDisplay = new google.maps.DirectionsRenderer();
	directionsDisplay.setMap(this.map);
	
	var routeRequest = {
		origin: fromLoc,
		destination: toLoc,
		travelMode: google.maps.TravelMode.DRIVING
	};
	var directionsService = new google.maps.DirectionsService();

	directionsService.route(routeRequest, function(result, status) {
		if (status == google.maps.DirectionsStatus.OK) {
			directionsDisplay.setDirections(result);
		}
	});


}

MapManager.prototype.checkResize = function() {
	google.maps.event.trigger(this.map, "resize");

}
