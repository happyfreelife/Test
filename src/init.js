

/**
 * 滑动器初始化
 */
;(function (window, factory) {
	if (typeof define === 'function' && define.amd) {
		define([
			'global',
			'slider',
			'add-element'
		], function (Global, Slider) {
			return factory($, window, document, Global, Slider);
		});
	} else if (typeof exports !== 'undefined') {
		module.exports = factory($, window, document,
			require('global'),
			require('slider'),
			require('add-element')
		);
	} else {
		window.terseSlider = window.terseSlider || {};
		factory($, window, document, window.terseSlider.Global, window.terseSlider.Slider);
	}
}(window, function (jQuery, window, document, Global, Slider) {
	Slider.prototype.init = function() {
		var self = this,
			options = this.options,
			$slider = this.$slider,
			$list = $slider.children().first(),
			$item = $list.children();

		this.$list = $list;
		this.$item = $item;
		this.len = $item.length;
		this.currentIndex = 0; // 列表项当前索引
		this.activeIndex = 0; // 切换按钮当前索引
		this.visibleItem = 0; // 列表项可视数量
		this.isHovered = false;
		this.isAnimated = false;

		// 滑动器的列表初始化
		$list.wrap('<div class="ts-list"/>');

		$item.addClass('ts-item');

		// 响应式排版
		if (options.responsive) {

		}

		// 垂直方向滑动
		if (options.vertical) {
			$list.parent().height($slider.height());

			$slider.width($item.outerWidth(true));

			this.visibleItem = Math.ceil($slider.height() / $item.outerHeight(true));
		}

		// 普通状态
		if (!options.vertical) {
			$list.width($item.outerWidth(true) * this.len);

			$slider.height($item.height());

			this.visibleItem = Math.ceil($slider.width() / $item.outerWidth(true));
		}

		/**
		 * 当列表项的数量 小于 列表项可视数量时
		 * 不需要使用滑动器的任何功能
		 * 下面的语句都不需要执行了
		 */
		if (this.visibleItem < this.len) return;




		// self.addElement().arrow();
	};
}));