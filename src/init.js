
	/**
	 * 滑动器初始化
	 */
	Slider.prototype.init = function() {
		var s = this,
			o = s.option,
			$slider = s.$slider,
			$list = s.$slider.find('.ts-list').children(),
			$item = $list.children();

		if (!$list.length) {
			console.error('please wrapper <div class="tb-list"></div> on inner list');
			return;
		}

		s.$list = $list;
		s.$item = $item;
		s.len = $item.length;
		s.currentIndex = 0;
		s.activeIndex = 0;
		s.isHovered = false;
		s.isAnimated = false;

		// 当列表项的数量只有一个时不使用任何功能
		if (s.len === 1) return;

		// 写入默认样式
		// s.style();

		// 滑动器的列表初始化
		// $list.wrap('<div class="ts-list"/>');


		// 水平方向
		if (!o.vertical) {
			if (typeof o.slideView === 'number' && o.slideView > 0) {
				$item.width(
					($slider.width() - parseInt($item.css('marginRight')) * (o.slideView - 1)) /
					o.slideView
				);
			}

			$list.addClass('ts-horizontal');
			$list.width($item.outerWidth(true) * s.len);
		}


		// 垂直方向
		if (o.vertical) {

		}

		// 循环滚动
		if (o.loop) {

		}
		
		s.animate();
	};
