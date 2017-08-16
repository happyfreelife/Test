// 把marqueen功能做出来，marqueen可以由箭头改变方向



requirejs.config({
	baseUrl: '../src',
	paths: {
		
	}
});

requirejs([
	'util',
	'slider',
	'init',
	'arrow',
	'btn',
	'animate',
	'drag',
	'touch',
	'lazyload',
	'marquee',
	'main'
], function() {
	$('.slider').terseSlider({
		marquee: true,
		// slideView: 3
	});
});
