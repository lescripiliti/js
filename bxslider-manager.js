function loadbxslider(){

	// Banner principal: Highlight
	$('#highlight .sliderHome').bxSlider({
		auto: true,
		autoDelay: 8000,
		pager: false
	});

	// Comentarios de produto
	$('.boxAval .commentList.mainComments').bxSlider({
		auto: false,
		pager: false
	});
};

$(document).ready(function(){
	loadbxslider();
});