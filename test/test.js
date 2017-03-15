$(function() {
	requirejs.config({
		baseUrl: '../src',
		paths: {
			main: 'main'
		}
	});

	define(['main'], function() {
		$('.normal').terseSlider();
		
		$('.vertical').terseSlider({
			vertical: true
		});
	});
});