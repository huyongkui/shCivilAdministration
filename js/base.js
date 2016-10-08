(function() {
	$.fn.extend({
		align: function(options) {
			options = $.extend({
				position: 'both',
				container: '',
				isimage: false,
				offsetx: 0,
				offsety: 0,
				ignorey: 0,
				ignorex: 0
			}, options);
			var that = this,
				imgSrc = that.attr('src'),
				reload = false,
				container = $(options.container),
				thisWidth = 0,
				thisHeight = 0,
				containerWidth = 0,
				containerHeight = 0,
				timer,
				offsetX = Number(options.offsetx),
				offsetY = Number(options.offsety),
				ignoreX = 0,
				ignoreY = 0,
				ignoredElX = '',
				ignoredElY = '',
				windowWidth = $(window).width(),
				windowHeight = $(window).height();
			//_this.attr('src', imgSrc + '?' + Date.parse(new Date()))
			var tools = {
				calculateIgnore: function() {
					if (typeof options.ignorey === 'string' || typeof options.ignorex === 'string') {
						alert('aaqa')
						var ignoreArrX = options.ignorex.split(','),
							ignoreArrY = options.ignorey.split(',');
						for (var i = 0; i < ignoreArrX.length; i++) {
							ignoreX += $(ignoreArrX[i]).width();
						}
						for (var i = 0; i < ignoreArrY.length; i++) {
							ignoreY += $(ignoreArrY[i]).height();
						}
						ignoredElX = $(ignoreArrX.join(','));
						ignoredElY = $(ignoreArrY.join(','));
						console.log(ignoreY)
					} else {
						ignoreX = options.ignorex;
						ignoreY = options.ignorey;
					}
				}
			}
			initAligning();
			$(window).resize(function() {
				initAligning();
			});

			function initAligning() {
				//当居中元素是img标签时，特殊处理！
				if (that.is('img')) {
					//递归判断需要居中的图片是否加载完成，如果没有就重载
					var checkImageLoaded = function() {
						that.each(function(index) {
							var $this = $(this);
							if ($this.height() == 0) {
								console.log('load failed ' + $(this).width())
								reload = true;
								return false;
							} else {
								containerWidth = container.eq(index).width();
								containerHeight = container.eq(index).height();
								checkPosition($this)
								console.log('第' + index + '张图片的高度:' + containerHeight);
							}
						});
						if (reload) {
							reload = false;
							checkBrowser({
								ie: function() {
									timer = window.setTimeout(function() {
										checkImageLoaded();
									}, 100);
								},
								other: function() {
									timer = setTimeout(function() {
										checkImageLoaded();
									}, 100);
								}
							})
						}
					}
					checkImageLoaded();
					//缺省情况
				} else {
					//需要遍历每个居中对象，判断其每个container尺寸不同时，需分别处理
					//当设置了container时，以container尺寸大小居中
					if (options.container != '') {
						that.each(function(index) {
							var $this = $(this);
							containerHeight = container.eq(index).height();
							containerWidth = container.eq(index).width();
							//console.log(containerHeight)
							if ($this.is(':hidden')) {
								return true
							} else {
								checkPosition($this);
							}
						});
						//当没有设置container时，以窗口尺寸大小居中
					} else {
						containerWidth = $(window).width();
						containerHeight = $(window).height();
						that.each(function(index) {
							var $this = $(this);
							if ($this.is(':hidden')) {
								return true
							} else {
								checkPosition($this);
							}
						});
					}
				}
			}

			function checkPosition(_this) {
				checkBrowser({
					ie: function() {
						window.clearTimeout(timer);
					},
					other: function() {
						clearTimeout(timer);
					}
				})

				var thisWidth = _this.outerWidth(),
					thisHeight = _this.outerHeight();

				switch (options.position) {
					case 'both':
						var marginY = (containerHeight - thisHeight) / 2;
						if (thisWidth <= $(window).width()) {

							if (options.offsetx != 0) {
								_this.css({
									'margin': marginY + offsetY - ignoreY + 'px ' + (containerWidth - thisWidth) / 2 + offsetX - ignoreX + 'px'
								});
							} else {
								_this.css({
									'margin': marginY + offsetY - ignoreY + 'px auto'
								});
							}
						} else {
							var marginX = (containerWidth - thisWidth) / 2;
							_this.css({
								'margin': marginY + offsetY - ignoreY + 'px ' + (marginX + options.offsetx) + 'px'
							});
						}
						break;
					case 'top':
						aligning(function(thisWidth, thisHeight) {
							if ($(document).height() > $(window).height()) {
								return;
							} else {
								_this.css({
									'margin': 0 +(containerWidth - thisWidth) / 2 + offsetX - ignoreX + 'px'
								});
							}
						});
						break;
					case 'right':
						aligning(function(thisWidth, thisHeight) {
							_this.css({
								'margin': (windowHeight - thisHeight) / 2 + 'px 0 0 ' + (containerWidth - thisWidth) + 'px'
							});
						});
						break;
					case 'bottom':
						aligning(function(thisWidth, thisHeight) {
							tools.calculateIgnore();
							if (ignoreY <= windowHeight) {
								_this.css({
									'margin': (windowHeight - thisHeight + offsetY - ignoreY) + 'px auto 0'
								});
								console.log(ignoreY)
								console.log(windowHeight)
							};
						});
						break;
					case 'left':
						aligning(function(thisWidth, thisHeight) {
							_this.css({
								'margin': (windowHeight - thisHeight) / 2 + 'px 0 0 0'
							});
						});
						break;
				}
			}

			function aligning(callback) {
				thisWidth = that.outerWidth();
				thisHeight = that.outerHeight();
				return callback(thisWidth, thisHeight);
			}

			function checkBrowser(callback) {
				callback = $.extend({
					ie: function() {
						return;
					},
					other: function() {
						return;
					}
				}, callback)
				if (navigator.appName.indexOf("Explorer") > -1) {
					console.log('IE')
					callback.ie();
				} else {
					// console.log('other')
					callback.other();
				}
			}
			//屏幕方向探测器
			function orientationSensor(callback) {
				var windowWidth = $(window).width(),
					windowHeight = $(window).height(),
					orientation = '';
				callback = $.extend({
					portrait: function() {},
					landscape: function() {},
					orientationchange: function(windowWidth, windowHeight) {}
				}, callback)

				checkoritation();
				$(window).resize(function() {
					checkoritation();
				});

				function checkoritation() {
					callback.orientationchange();
					if (windowWidth < windowHeight) {
						return callback.portrait();
					} else {
						return callback.landscape();
					}
				}
				return (windowWidth < windowHeight) ? orientation = 'portrait' : orientation = 'landscape';
			}
		}
	})
})()
