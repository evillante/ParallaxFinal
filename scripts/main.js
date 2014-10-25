
$(document).ready(function() {


	var windowWidth = $(window).width();
	var windowHeight = $(window).height();

	console.log(windowWidth);

	$(document).on("click", ".navOptions", function() {
		$(this).addClass('alcSelected');
		$(this).removeClass('alcUnSelected');

		$(this).siblings().addClass('alcUnSelected');
		$(this).siblings().removeClass('alcSelected');

		$('.alcSelected').css('color', '#61E65C');
		$('.alcUnSelected').css('color', '#ccc');
	});

	$(document).on("mouseenter", ".alcUnSelected", function() {
		$(this).css('color', '#5C8AE6');
	});
	
	$(document).on("mouseleave", ".alcUnSelected", function() {
		$('.alcUnSelected').css('color', '#ccc');
	});



	$( window ).resize(function() {
	});
});
