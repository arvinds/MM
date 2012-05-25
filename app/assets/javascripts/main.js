$(document).ready(function() {

	var map = new MapManager($('#map_container')[0]);
	
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
			map.removeLocationPin('from');
			map.findLocation(request, response);
		},
		select : function(event, ui) {
			var result = ui.item.data;
			map.addLocationPin('from', new Microsoft.Maps.Location(result.point.coordinates[0], result.point.coordinates[1]));
			if (map.hasLocationPinId('from') && map.hasLocationPinId('to')) {
				map.calculateRoute([ 'from', 'to' ]);
			}
		},
		minLength : 2
	});
	
	$('#to_select').autocomplete({
		source : function(request, response) {
			map.removeLocationPin('to');
			map.findLocation(request, response);
		},
		select : function(event, ui) {
			var result = ui.item.data;
			map.addLocationPin('to', new Microsoft.Maps.Location(result.point.coordinates[0], result.point.coordinates[1]));
			if (map.hasLocationPinId('from') && map.hasLocationPinId('to')) {
				map.calculateRoute([ 'from', 'to' ]);
			}
		},
		minLength : 2
	});
	
	$('#when_select').datepicker();
	
	$('.black-button').click(function() {
		if ($('#from_select').val().trim() == '') {
			alert("Please choose a starting location");
			return;
		}
		if ($('#to_select').val().trim() == '') {
			alert("Please choose a destination");
			return;
		}
		if ($('#when_select').val().trim() == '') {
			alert("Please provide a valid date");
			return;
		}
		$('#choice').animate({
			opacity:0
		}, 300, function() { $(this).hide(); $('#map_container').animate({
			width:"940px"
		}, 500);});
	});

});