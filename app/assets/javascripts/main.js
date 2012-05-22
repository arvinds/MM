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
		
		if (($(e.target).closest('#map_container').length == 0) &&
			!($('#to_from_container').find('input').is(':focus'))) {
			$('#map_container').fadeOut('slow').addClass('hidden');
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
	
	$('#from_select').on('focus', function(event) {
		var $this = $(this);
		var top = $this.offset().top;
		var left = $this.offset().left;
		if (!map) {
			loadMap();
		}
		$('#map_container').removeClass('hidden').css({
			top : top + $this.outerHeight() + "px",
			left : left
		}).fadeIn('slow');
	});
	
	var loadMap = function() {
		var mapOptions = {
			credentials:"	Aq1YIJbPm7C4HzFc_271JbEI8BoEIoccyB_g10Fa21jupGJKBG-Ocv0Cbmbt0cet",
			disableBirdseye : true,
			showDashboard : false,
			mapTypeId: Microsoft.Maps.MapTypeId.road
		};
		map = new Microsoft.Maps.Map(document.getElementById("map_container"), mapOptions);
	}
	
	
});