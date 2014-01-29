$(document).ready(function() {

	

	// Slider Home
	$(".sliderHome")
		.after("<div class='navSlider'>")
		.cycle({
			fx : "fade",
			speed : 500,
			timeout : 5000,
			pager : ".navSlider"
		});

});