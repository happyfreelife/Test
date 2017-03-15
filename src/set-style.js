

/**
 * 设置滑动器元素的样式
 */
;(function (window, factory) {
	if (typeof define === 'function' && define.amd) {
		define([
			'global',
			'slider'
		], function (Global, Slider) {
			return factory($, window, document, Global, Slider);
		});
	} else if (typeof exports !== 'undefined') {
		module.exports = factory($, window, document,
			require('global'),
			require('slider')
		);
	} else {
		window.terseSlider = window.terseSlider || {};
		factory($, window, document, window.terseSlider.Global, window.terseSlider.Slider);
	}
}(window, function (jQuery, window, document, Global, Slider) {
	Slider.prototype.setStyle = function(elem) {
		var options = this.options,
			$slider = this.$elem,
			$arrow = this.$arrow,
			$arrowBox = this.$arrowBox,
			$btn = this.$btn,
			$btnBox = this.$btnBox;

		switch (elem) {
			case 'arrow' :
				if ($arrow.css('backgroundImage') === 'none') {
					if (!$arrow.height()) {
						var sliderHeight = Math.max(
							$slider.height(),
							$.isNumeric(parseInt($slider.css('maxHeight'))) ? parseInt($slider.css('maxHeight')) : 0,
							$.isNumeric(parseInt($slider.css('minHeight'))) ? parseInt($slider.css('minHeight')) : 0
						);

						$arrow.height(parseInt(sliderHeight * 0.1));
					}

					$arrow.filter('.prev').html('<img src="' + Global.prevArrow + '">');
					$arrow.filter('.next').html('<img src="' + Global.nextArrow + '">');

					$arrow.find('img').on('dragstart', function() {
						return false;
					});
				}
				break;

			case 'arrowBoxPos' :
				if ($arrowBox.css('top') === 'auto' && $arrowBox.css('bottom') === 'auto') {
					$arrowBox.css({
						top: '50%',
						marginTop: -$arrow.outerHeight() / 2
					});
				}

				$slider.append($arrowBox.css('position', 'absolute'));
				break;

			case 'btnBoxPos' :
				if ($btnBox.css('left') === 'auto' && $btnBox.css('right') === 'auto') {
					$btnBox.css({
						left: '50%',
						marginLeft: -$btn.outerWidth(true) * $btn.length / 2
					});
				}
				$slider.append($btnBox);
				break;
		}
	};
}));


