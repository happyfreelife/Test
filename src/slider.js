

/**
 * Plugin construct function
 */
;(function (window, factory) {
	if (typeof define === 'function' && define.amd) {
		define(function () {
			return factory(window, document);
		});
	} else if (typeof exports !== 'undefined') {
		module.exports = factory(window, document);
	} else {
		window.terseSlider = window.terseSlider || {};
		window.terseSlider.Slider = factory(window, document);
	}
}(window, function (window, document) {
	function Slider(slider, options) {
		this.$slider = $(slider);
		this.options = options;
	}

	return Slider;
}));