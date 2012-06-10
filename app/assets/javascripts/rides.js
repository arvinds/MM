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
	
		$('#add_ride').on( 'click', function() {
			// Gather data
			var data = {};
			
			data.from_loc_str = $('#from_link').html();
			data.to_loc_str = $('#to_link').html();
			
			data.from_loc_lat = $('#from_lat').val();
			data.from_loc_lng = $('#from_lng').val();
			data.to_loc_lat = $('#to_lat').val();
			data.to_loc_lng = $('#to_lng').val();
			
			var totalSeats = $('#passenger_number').val();
			var seatPrice = $('#passenger_price').val();
			
			/*if (totalSeats !== parseInt(totalSeats,10)) {
				alert('Please enter a valid Passenger number');
				return;
			}
			
			if (seatPrice !== parseInt(seatPrice,10)) {
				alert('Please enter a valid Passenger price');
				return;
			}*/
		
			data.seats = [];
			for (var i = 0; i<totalSeats; i++ ) {
				data.seats.push({
					price : seatPrice
				});
			}
			
			data.description = $('#description').val();
			console.log(data);
			ajaxPost({
				url : '/rides',
				model : 'ride',
				modelData : data,
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

