

/**
 * 绑定动画
 */
;(function (window, factory) {
	if (typeof define === 'function' && define.amd) {
		define([
			'global',
			'slider',
			'bind-event'
		], function (Global, Slider) {
			return factory($, window, document, Global, Slider);
		});
	} else if (typeof exports !== 'undefined') {
		module.exports = factory($, window, document,
			require('global'),
			require('slider'),
			require('bind-event')
		);
	} else {
		window.terseSlider = window.terseSlider || {};
		factory($, window, document, window.terseSlider.Global, window.terseSlider.Slider);
	}
}(window, function (jQuery, window, document, Global, Slider) {
	Slider.prototype.bindAnimation = function() {

	};
}));


