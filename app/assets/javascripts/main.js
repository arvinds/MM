MapServices = {};

MapServices.map = null;

$(document).ready(function() {

	var map = null;

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
			$.ajax({
                    url: "http://dev.virtualearth.net/REST/v1/Locations",
                    dataType: "jsonp",
                    data: {
                        key: "	Aq1YIJbPm7C4HzFc_271JbEI8BoEIoccyB_g10Fa21jupGJKBG-Ocv0Cbmbt0cet",
                        q: request.term
                    },
                    jsonp: "jsonp",
                    success: function (data) {
                        var result = data.resourceSets[0];
                        if (result) {
                            if (result.estimatedTotal > 0) {
                                response($.map(result.resources, function (item) {
                                    return {
                                        data: item,
                                        label: item.name,
                                        value: item.name
                                    }
                                }));
                            }
                        }
                    }
                });
		},
		select : function(event, ui) {
			var result = ui.item.data;
			var location = new Microsoft.Maps.Location(result.point.coordinates[0], result.point.coordinates[1])
			var pin = new Microsoft.Maps.Pushpin(location);
			MapServices.map.setView({ center: location, zoom: 10 });
			MapServices.map.entities.push(pin);
		},
		minLength : 2
	});
	
	$('#to_select').autocomplete({
		source : function(request, response) {
			$.ajax({
                    url: "http://dev.virtualearth.net/REST/v1/Locations",
                    dataType: "jsonp",
                    data: {
                        key: "	Aq1YIJbPm7C4HzFc_271JbEI8BoEIoccyB_g10Fa21jupGJKBG-Ocv0Cbmbt0cet",
                        q: request.term
                    },
                    jsonp: "jsonp",
                    success: function (data) {
                        var result = data.resourceSets[0];
                        if (result) {
                            if (result.estimatedTotal > 0) {
                                response($.map(result.resources, function (item) {
                                    return {
                                        data: item,
                                        label: item.name,
                                        value: item.name
                                    }
                                }));
                            }
                        }
                    }
                });
		},
		select : function(event, ui) {
			var result = ui.item.data;
			var location = new Microsoft.Maps.Location(result.point.coordinates[0], result.point.coordinates[1])
			var pin = new Microsoft.Maps.Pushpin(location);
			MapServices.map.setView({ center: location, zoom: 10 });
			MapServices.map.entities.push(pin);
		},
		minLength : 2
	});
	
	if (!MapServices.map) {
		var mapOptions = {
			credentials:"	Aq1YIJbPm7C4HzFc_271JbEI8BoEIoccyB_g10Fa21jupGJKBG-Ocv0Cbmbt0cet",
			disableBirdseye : true,
			showDashboard : false,
			mapTypeId: Microsoft.Maps.MapTypeId.road
		};
		MapServices.map = new Microsoft.Maps.Map(document.getElementById("map_container"), mapOptions);
	}

});