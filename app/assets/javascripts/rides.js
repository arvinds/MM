$(document).ready(function() {
	
});

Rides = {};

Rides.new = {
	init : function() {
		$('#create_ride').on ( 'click', function() {
			ajaxPost('/rides', 'ride', { description : 'hello', 'ride_id' : 10 });
		});
	}
};

Rides.search = {
	init : function() {
	}
};