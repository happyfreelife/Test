
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
			self.slide();
		}, self.options.auto);

		self.$elem.off('mouseenter.terseSlider');
		self.$elem.off('mouseleave.terseSlider');
		self.$elem.on({
			'mouseenter.terseSlider': clear,
			'mouseleave.terseSlider': reset
		});
	};

	// 指示按钮添加高亮样式
	Slider.prototype.btnActive = function() {
		if (!this.option.btn) return;

		var s = this;

		s.activeIndex =
		s.currentIndex === s.len ? 0 :
		s.currentIndex === -1 ? s.len - 1 : s.currentIndex;

		s.$btn.eq(s.activeIndex).addClass('active').siblings().removeClass('active');
	};

	// 切换轮播图片
	Slider.prototype.slideTo = function() {
		var s = this;

		if (s.animating) return;

		if ($.isNumeric(arguments[0]) && (arguments[0] < 0 || arguments[0] > s.len)) {
			throw new Error('terseSlider\'s index overflow!');
		}

		s.option.before.call(s, s.$Slider, s.$item, s.currentIndex);

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

				$(this).data('terseSlider', (terseSlider = new Slider(this, option)));

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
		vertical   : false,  // 垂直方向滑动
		arrow      : false,  // 切换箭头
		btn        : true,   // 指示按钮
		loop       : true,   // 循环滑动
		auto       : 5000,   // 自动滑动: [为0时禁用此功能]
		speed      : 400,    // 滑动速度
		offset     : 0,      // 列表偏移距离
		// slideGap   : 0,      // 列表项之间的距离
		slideView  : 0,      // 列表项显示的个数：[设为'auto'可以自适应个数]
		slideGroup : 1,      // 列表项每组的个数
		slideOffset: 0,      // 列表项偏移数量：[设置此参数则offset参数失效]
		init       : $.noop, // 轮播初始化时执行的回调函数
		before     : $.noop, // 滑动开始时执行的回调函数
		after      : $.noop  // 滑动完成时执行的回调函数
	};
