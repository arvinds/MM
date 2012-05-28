$(document).ready(function() {

	var map = new MapManager(document.getElementById('map_container'));
	
	$('#to_from_container input').val('');
	
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
	
	$('#find_ride, #post_ride').on('click', function() {
	
		var $from = $('#from_select');
		var $to = $('#to_select');
		var $when = $('#when_select');
		var $ridesList = $('#rides_list');
		var $rides = $('div.rides');
		var $ridesLoad = $('div.rides-loading');
	
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
		
		var from_latlang = map.getLocationMarker('from').getPosition();
		var to_latlang = map.getLocationMarker('to').getPosition();
		
		var subpageOpts = {
			url : '/rides',
			data : {
				from_string : $from.val(),
				to_string : $to.val(),
				from_lat : from_latlang.lat(),
				from_lng : from_latlang.lng(),
				to_lat : to_latlang.lat(),
				to_lng : to_latlang.lng()
			}
		};
		
		if ($(this).attr('id') == 'post_ride') {
			subpageOpts.url += "/new";
		}
		
		loadSubpage(subpageOpts);
		
	});

});

function loadSubpage(options) {

	var options = options;

	var $subpage = $('#subpage');
	var $subpageContent = $('div.subpage-content');
	var $subpageLoad = $('div.subpage-loading');
	
	var fetchFunction = function() {
		$subpageContent.stop().animate({ opacity : 0 }, 300, function() {
			$(this).addClass('hidden');
			$subpageLoad.stop().css({ opacity : 0 }).show().animate({ opacity : 1}, 300, function() {
				$.ajax({
					url : options.url,
					dataType : 'html',
					data : options.data,
					success : function(data) {
						$subpageLoad.stop().animate({ opacity : 0}, 300, function() {
							$(this).hide();
							$subpageContent.html('').append(data).removeClass('hidden').animate({ opacity : 1}, 300);
						});
					}
				});
			});
		});
	}
	
	if (!$subpage.hasClass('animated')) {
		var subpageHeight = $subpage.height();
		$subpage.addClass('animated').css({ height : "0px", opacity : 0 }).show().animate({
			height : subpageHeight + "px"
		}, 300, function() {
			$(this).css('height', 'auto').animate({ opacity : 1}, 300, fetchFunction);
		});
	} else {
		fetchFunction();
	}
};