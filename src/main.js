/**
 * terseSlider需要的功能
 * css3动画和jquery双版本动画
 * 支持到ie8，支持移动端，可以自适应视口的宽度
 * 支持垂直方向的滑动
 * 连续滑动（即跑马灯效果marquee），支持鼠标悬浮暂停，鼠标拖拽
 * 普通滑动（即间隔性滑动，默认参数）
 * ****鼠标拖拽
 * ****添加切换箭头
 * ****添加切换按钮
 * ****可分组，即每次几个元素一起滑动（切换按钮对应分组的数量）
 * ****循环滑动
 * ****自动滑动
 * ****滑动列表偏移量
 * ****回调函数: init, before, after
 * ****对外提供的方法：slideToPrev, slideToNext, slideToIndex
 */


/**
 * Plugin main method
 */
;(function (window, factory) {
	if (typeof define === 'function' && define.amd) {
		define([
			'global',
			'slider',
			'init'
		], function (Global, Slider) {
			return factory($, window, document, Global, Slider);
		});
	} else if (typeof exports !== 'undefined') {
		module.exports = factory($, window, document,
			require('global'),
			require('slider'),
			require('init')
		);
	} else {
		window.terseSlider = window.terseSlider || {};
		factory($, window, document, window.terseSlider.Global, window.terseSlider.Slider);
	}
}(window, function (jQuery, window, document, Global, Slider) {
	// 播放
	Slider.prototype.slide = function() {
		this.activeIndex = this.currentIndex;

		if (this.len > 1) {
			this.animation[this.options.animation]();
			this.lazyload(this.currentIndex);
		}
	};

	// 自动滑动定时器
	Slider.prototype.setSlideTimer = function() {
		var self = this,
			clear = function() {
				self.isHovered = true;
				clearInterval(self.slideTimer);
			},
			reset = function() {
				self.isHovered = false;
				if (!self.isAnimated) {
					self.setSlideTimer();
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

	// 导航按钮和缩略图添加高亮样式
	Slider.prototype.activeBtnAndThumb = function() {
		this.activeIndex =
		this.currentIndex === this.len ? 0 :
		this.currentIndex === -1 ? this.len - 1 : this.currentIndex;

		if (this.$btn) {
			this.$btn.eq(this.activeIndex).addClass('active').siblings().removeClass('active');
		}

		if (this.$thumb) {
			this.$thumb.eq(this.activeIndex).addClass('active').siblings().removeClass('active');
			if (this.$thumbSlideBtn.is(':visible')) {
				this.animation.thumbListSlide();
			}
		}
	};

	// 切换滑动器元素
	Slider.prototype.switchTo = function() {
		if (this.isAnimated) return;

		if ($.isNumeric(arguments[0]) && (arguments[0] < 0 || arguments[0] > this.len)) {
			throw new Error('TerseSlider\'s index overflow!');
		}

		this.options.before.call(this, this.$elem, this.$item, this.currentIndex);
		
		switch (arguments[0]) {
			case 'prev':
				this.currentIndex--;
				break;

			case 'next':
				this.currentIndex++;
				break;

			default:
				this.currentIndex = arguments[0];
				break;
		}

		this.play();
	};


	Slider.prototype.slideToPrev = function() {
		
	};

	Slider.prototype.slideToNext = function() {
		
	};

	Slider.prototype.slideToIndex = function() {
		
	};

	$.fn.terseSlider = function(opt) {
		if (Global.isLTIE8) {
			throw new Error('terseSlider does not support IE6 and IE7!');
		}

		return this.each(function() {
			var terseSlider = $(this).data('terseSlider');

			if (!terseSlider) {
				var options = $.extend(true, {}, $.fn.terseSlider.defaults, typeof opt === 'object' && opt);

				$(this).data('terseSlider', (terseSlider = new Slider(this, options)));

				terseSlider.init();
			}
		});
	};


	/**
	 * Plugin default options
	 */
	$.fn.terseSlider.defaults = {
		marquee   : false,  // 连续滚动模式
		dragable  : false,  // 元素可拖拽
		responsive: false,  // 响应式排版
		vertical  : false,  // 垂直方向滑动
		arrow     : false,  // 切换箭头
		btn       : true,   // 切换按钮
		loop      : true,   // 循环滑动
		offset    : 0,      // 元素偏移量
		groupItem : 0,      // 分组元素数量
		auto      : 5000,   // 自动滑动: [为0时禁用此功能]
		duration  : 800,    // 滑动速度
		init      : $.noop, // 轮播初始化时执行的回调函数
		before    : $.noop, // 动画开始时执行的回调函数
		after     : $.noop, // 动画完成时执行的回调函数
	};
}));