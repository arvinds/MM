$(document).ready(function() {
	
});

Rides = {};

Rides.new = {
	init : function() {
		$('#create_ride').on ( 'click', function() {
			$.ajax({
				type : 'POST',
				url : '/rides',
				data : {
					description : "TEST"
				},
				success : function( data ) {
					console.log(data);
				},
				error : function( data ) {
					console.log(data);
				}
			});
		});
	}
};

Rides.search = {
	init : function() {
	}
};