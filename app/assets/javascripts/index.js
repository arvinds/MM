$(document).ready(function() {

	var map = new MapManager(document.getElementById('map_container'));
	
	$('#choice input').val('');
	
	$('#from_select').autocomplete({
		source : function(request, response) {
			map.removeLocationMarker('from');
			map.findLocation(request, response);
		},
		select : function(event, ui) {
			var result = ui.item.data;	
			if (map.hasLocationMarkerId('to')) {
				map.addLocationMarker('from', result.geometry.location);
				map.calculateRoute();
			} else {
				map.addLocationMarker('from', result.geometry.location, true);
			}
		},
		minLength : 2
	});
	
	$('#to_select').autocomplete({
		source : function(request, response) {
			map.removeLocationMarker('to');
			map.findLocation(request, response);
		},
		select : function(event, ui) {
			var result = ui.item.data;
			if (map.hasLocationMarkerId('from')) {
				map.addLocationMarker('to', result.geometry.location);
				map.calculateRoute();
			} else {
				map.addLocationMarker('to', result.geometry.location, true);
			}
		},
		minLength : 2
	});
	
	$('#when_select').datepicker();
	
	$('#find_ride').on('click', function() {
	
		var $from = $('#from_select');
		var $to = $('#to_select');
		var $when = $('#when_select');
		var $ridesList = $('#rides_list');
		var $rides = $('div.rides');
		var $ridesLoad = $('div.rides-loading');
		
		// Load rides information based on given locations and date
		var loadRides = function() {
		
			var fetchRides = function(callback) {
				$.ajax({
					url : '/rides',
					dataType : 'html',
					data : {
						from_loc : $from.val(),
						to_loc : $to.val()
					},
					success : function(data) {
						callback(data);
					}
				});
			}
			
			$rides.stop().animate({ opacity : 0 }, 300, function() {
				$(this).addClass('hidden');
				$ridesLoad.stop().css({ opacity : 0 }).show().animate({ opacity : 1}, 300, function() {
					fetchRides(function(data) {
						$ridesLoad.stop().animate({ opacity : 0}, 300, function() {
							$(this).hide();
							$rides.html('').append(data).removeClass('hidden').animate({ opacity : 1}, 300);
						});
					});
				});
			});
		}
	
		if ($from.val().trim() == '') {
			alert("Please choose a starting location");
			return;
		}
		if ($to.val().trim() == '') {
			alert("Please choose a destination");
			return;
		}
		if ($when.val().trim() == '') {
			alert("Please provide a valid date");
			return;
		}
		if (!$ridesList.hasClass('animated')) {
			var ridesListHeight = $ridesList.height();
			
			$ridesList.addClass('animated').css({ height : "0px", opacity : 0 }).show().animate({
				height : ridesListHeight + "px"
			}, 300, function() {
				$(this).css('height', 'auto').animate({ opacity : 1}, 300, loadRides);
			});
		} else {
			loadRides();
		}
		
	});
	
	$('#post_ride').on('click', function() {
		location.href = "/rides/new";
	});


});