$(document).ready(function() {
	
	var routePieces = getRelativeRoute(location.href);
	
	if (routePieces.length > 0) {
		if (Rides[ucfirst(routePieces[0])]) {
			Rides[ucfirst(routePieces[0])].init();
		}
	}
});

var Rides = {};

/*
 * Handles '/rides' route
 */
Rides.Rides = {
	init : function() {
	}
};

/*
 * Handles '/rides/new' route
 */
Rides.New = {
	init : function() {
	
		var ride = new Ride();
	
		$('#create_ride').on( 'click', function() {
			ajaxPost({
				url : '/rides',
				model : 'ride',
				modelData : {},
				success : function(data){
					console.log(data);
				}
			});
		});
	}
};

Rides.Search = {
	init : function() {
	}
};

var Ride = function(){
};

