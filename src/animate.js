
	/**
	 * 绑定动画
	 */
	Slider.prototype.animate = function() {
		var s = this,
			o = s.option,
			$slider = s.$slider,
			$list = s.$list,
			$item = $list.children();

		if (o.marquee) {
			// s.animation = function() {
				if (!o.vertical) {
					console.log('aa');
					setInterval(function() {
						// $list.css(Util.TRANSFORM, 'translate3d(');
						$list.parent().scrollLeft($list.parent().scrollLeft() + 1);
						// $list.css('left', parseInt($list.css('left')) - 1);
					}, o.speed / 50);

				}

				if (o.vertical) {

				}
			// };
		}

		if (!o.marquee) {

		}
	};
