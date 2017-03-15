

/**
 * 自动添加滑动器必须的元素
 */
;(function (window, factory) {
	if (typeof define === 'function' && define.amd) {
		define([
			'global',
			'slider',
			'set-style',
			'bind-animation'
		], function (Global, Slider) {
			return factory($, window, document, Global, Slider);
		});
	} else if (typeof exports !== 'undefined') {
		module.exports = factory($, window, document,
			require('global'),
			require('slider'),
			require('set-style'),
			require('bind-animation')
		);
	} else {
		window.terseSlider = window.terseSlider || {};
		factory($, window, document, window.terseSlider.Global, window.terseSlider.Slider);
	}
}(window, function (jQuery, window, document, Global, Slider) {
	Slider.prototype.addElement = function() {
		var self = this,
			$slider = this.$elem,
			$list = this.$list,
			options = this.options;

		function beforeCallback() {
			options.before.call(self, self.$elem, self.$item, self.currentIndex);
		}

		return {
			arrow: function() {
				if (!options.arrow || Global.isMobile) {
					self.addElement().btn();
					return;
				}

				$slider.append(
					'<div class="tb-arrow">' +
						'<a class="prev"></a>' +
						'<a class="next"></a>' +
					'</div>'
				);

				self.$arrowBox = $('.tb-arrow', $slider);
				self.$arrow = $('.tb-arrow a', $slider);

				self.setStyle('arrow');
				self.setStyle('arrowBoxPos');

				self.$arrow.on({
					'click.terseSlider': function() {
						if (self.isAnimated) return;

						beforeCallback();

						$(this).hasClass('prev') ? self.currentIndex-- : self.currentIndex++;
						
						self.play();
					},

					// 阻止连续点击箭头按钮时选中按钮
					'selectstart.terseSlider': function() {
						return false;
					}
				});

				self.addElement().btn();
			},

			btn: function() {
				if (!options.btn) {
					self.addElement().thumb();
					return;
				}

				for (var i = 0, item = ''; i < self.len; i++) {
					item += '<a><i></i></a>';
				}
				$slider.append($('<div class="tb-btn"/>').append(item));

				self.$btnBox = $('.tb-btn', $slider);
				self.$btn = $('.tb-btn a', $slider);

				self.$btn.first().addClass('active');

				self.setStyle('btnBoxPos');

				// 导航按钮中添加序列数字
				if (options.btn === 'ol') {
					self.$btn.find('i').each(function(index) {
						$(this).text(index + 1);
					});
				}

				if (!Global.isMobile) {
					self.$btn.on(
						self.options.useHover ?
							'mouseenter.terseSlider' : 'click.terseSlider',
						function() {
							if (self.isAnimated) return;

							beforeCallback();
							self.currentIndex = $(this).index();
							self.play();
						}
					);
				}

				self.addElement().thumb();
			}
		};
	};
}));