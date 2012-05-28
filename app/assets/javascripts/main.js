$(document).ready(function() {

	/*// Body click bindings
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
	});*/
});