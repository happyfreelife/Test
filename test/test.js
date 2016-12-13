$(function() {
	requirejs.config({
		baseUrl: '../src',
		paths: {
			main: 'main'
		}
	});
	
	define(['main'], function() {
		$('#simpe').easySlider();
	});
});