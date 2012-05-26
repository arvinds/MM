$(document).ready(function() {

	var map = new MapManager(document.getElementById('map_container'));
	
	$('#choice input').val('');

	// Body click bindings
	$('body').on('click', function(e) {
	
		// Bind out of focus clicks to close the sign in dropdown
		if (($(e.target).closest('#sign_in').length == 0)
			&& !($('#sign_in_dropdown').hasClass('hidden'))
			&& ($(e.target).closest('#sign_in_dropdown').length == 0)) {
			$('#sign_in').trigger('click');
		}
		
	});

	// Bind the sign in click dropdown
	$('#sign_in').on( 'click' , function(event) {
		event.preventDefault();
		var pos = $(this).offset();
		var $signInBox = $('#sign_in_dropdown');
		
		if ($signInBox.hasClass('hidden')) {
			$signInBox.stop().css({
				top : pos.top + $(this).outerHeight() + 2 + "px",
				left : pos.left - $signInBox.width() + $(this).outerWidth() + "px"
			}).removeClass('hidden').fadeIn('fast');
		} else {
			$('#sign_in_dropdown').stop().fadeOut('fast').addClass('hidden');
		}
	});
	
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


});