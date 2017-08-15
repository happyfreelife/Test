/**
 * terseSlider
 * Version: 0.0.2
 * URI: https://github.com/happyfreelife/terseSlider
 * Date: 2017-08-15
 **/
;(function (window, factory) {
	if (typeof define === 'function' && define.amd) {
		define(['jquery'], function (jQuery) {
			factory(jQuery, window, document);
		});
	} else if (typeof module === 'object' && typeof module.exports) {
		module.exports = factory(require('jQuery'), window, document);
	} else {
		factory(jQuery, window, document);
	}
}(window, function ($, window, document) {


	/**
	 * Plugin construct function
	 */
	function Slider(slider, option) {
		this.$slider = $(slider);
		this.option = option;
	}



	/**
	 * 滑动器初始化
	 */
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
	};








	/**
	 * Plugin main method
	 */
	// 播放
	Slider.prototype.slide = function() {
		this.activeIndex = this.currentIndex;

		if (this.len > 1) {
			this.animation[this.options.animation]();
			this.lazyload(this.currentIndex);
		}
	};

	// 自动滑动定时器
	Slider.prototype.setSliderTimer = function() {
		var self = this,
			clear = function() {
				self.isHovered = true;
				clearInterval(self.slideTimer);
			},
			reset = function() {
				self.isHovered = false;
				if (!self.isAnimated) {
					self.setSliderTimer();
				}
			};

		clearInterval(self.slideTimer);

		self.slideTimer = setInterval(function() {
			self.options.before.call(self, self.$elem, self.$item, self.currentIndex);
			self.currentIndex++;
			self.play();
		}, self.options.auto);

		self.$elem.off('mouseenter.terseSlider');
		self.$elem.off('mouseleave.terseSlider');
		self.$elem.on({
			'mouseenter.terseSlider': clear,
			'mouseleave.terseSlider': reset
		});
	};

	// 指示按钮或缩略图添加高亮样式
	Banner.prototype.btnActive = function() {
		if (!this.option.btn) return;

		var s = this;

		s.activeIndex =
		s.currentIndex === s.len ? 0 :
		s.currentIndex === -1 ? s.len - 1 : s.currentIndex;

		s.$btn.eq(s.activeIndex).addClass('active').siblings().removeClass('active');
	};

	// 切换轮播图片
	Banner.prototype.slideTo = function() {
		var s = this;

		if (s.animating) return;

		if ($.isNumeric(arguments[0]) && (arguments[0] < 0 || arguments[0] > s.len)) {
			throw new Error('terseSlider\'s index overflow!');
		}

		s.option.before.call(s, s.$banner, s.$item, s.currentIndex);

		switch (arguments[0]) {
			case 'prev':
				if(!Util.IS_MOBILE) {
					s.currentIndex--;
					s.play();
				} else {
					s.slidePrev();
				}
				break;

			case 'next':
				if(!Util.IS_MOBILE) {
					s.currentIndex++;
					s.play();
				} else {
					s.slideNext();
				}
				break;

			default:
				if(!Util.IS_MOBILE) {
					s.currentIndex = arguments[0];
					s.play();
				}
				break;
		}
	};


	$.fn.terseSlider = function(opt) {
		if (Util.IS_LTIE8) {
			throw new Error('terseSlider cannot work under IE8!');
		}

		return this.each(function() {
			var terseSlider = $(this).data('terseSlider');

			if (!terseSlider) {
				var option = $.extend(true, {}, $.fn.terseSlider.defaults,
					typeof opt === 'object' && opt);

				$(this).data('terseSlider', (terseSlider = new Banner(this, option)));

				terseSlider.init();
			} else {
				if (opt === 'prev') {
					terseSlider.slideTo.call(terseSlider, 'prev');
				} else if (opt === 'next') {
					terseSlider.slideTo.call(terseSlider, 'next');
				} else if ($.isNumeric(opt)) {
					terseSlider.slideTo.call(terseSlider, opt);
				}
			}
		});
	};


	/**
	 * Plugin default options
	 */
	$.fn.terseSlider.defaults = {
		marquee    : false,  // 连续滚动模式
		dragable   : false,  // 元素可拖拽
		responsive : false,  // 响应式排版
		vertical   : false,  // 垂直方向滑动
		arrow      : false,  // 切换箭头
		btn        : true,   // 切换按钮
		loop       : true,   // 循环滑动
		offset     : 0,      // 列表偏移距离
		slideView  : 0,      // 列表项显示的个数
		slideGroup : 1,      // 列表项每组的个数
		slideOffset: 0,      // 列表项偏移数量
		auto       : 5000,   // 自动滑动: [为0时禁用此功能]
		speed      : 800,    // 滑动速度
		init       : $.noop, // 轮播初始化时执行的回调函数
		before     : $.noop, // 滑动开始时执行的回调函数
		after      : $.noop  // 滑动完成时执行的回调函数
	};

}));
