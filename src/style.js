 
	/**
	 * 写入轮播元素的默认样式
	 */
	Slider.prototype.style = function() {
		var style =
			'.ts-list,\n' +
			'.ts-list > *\n{' +
			'    position: relative;\n' +
			'    overflow: hidden;\n' +
			'}\n' +

			'.ts-list > * > *{\n' +
			'    position: relative;\n' +
			'    display: block;\n' +
			'}\n' +
			'.ts-list > .ts-horizontal > *{\n' +
			'    float: left;\n' +
			'}\n' +
			'.ts-list > .touching{\n' +
			'    -webkit-transition-duration: 0ms !important;\n' +
			'    transition-duration: 0ms !important;\n' +
			'}\n' +

			'.ts-arrow{\n' +
			'    position: absolute;\n' +
			'    width: 100%;\n' +
			'    top: 50%;\n' +
			'    left: 0;\n' +
			'}\n' +
			'.ts-arrow a{\n' +
			'    position: absolute;\n' +
			'    top: 0;\n' +
			'    cursor: pointer;\n' +
			'    background-color: #333;\n' +
			'    background-color: rgba(0, 0, 0, .2);\n' +
			'}\n' +
			'.ts-arrow a.prev{\n' +
			'    left: 0;\n' +
			'}\n' +
			'.ts-arrow a.next{\n' +
			'    right: 0;\n' +
			'}\n' +
			'.ts-arrow a img{\n' +
			'    display: inline-block;\n' +
			'    max-height: 100%;\n' +
			'}\n' +

			'.ts-btn{\n' +
			'    position: absolute;\n' +
			'    bottom: 20px;\n' +
			'}\n' +		
			'.ts-btn a{\n' +
			'    float: left;\n' +
			'    width: 10px;\n' +
			'    height: 10px;\n' +
			'    margin: 0 5px;\n' +
			'    background-color: #fff;\n' +
			'    border-radius: 50%;\n' +
			'    cursor: pointer;\n' +
			'}\n' +
			'.ts-btn a.active{\n' +
			'    background-color: #09c;\n' +
			'}\n';

		if (!$('#ts-style').length) {
			$('head').append('<style id="ts-style">\n' + style + '</style>');
		}
	};
