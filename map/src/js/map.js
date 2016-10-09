(function() {
	var map = {
		mapHover: function() {
			$('.area').hide();
			$('#mapelement area').hover(function() {
				$('.leftarea #' + $(this).attr('name')).show().siblings(".area").hide();
			});
		},
		schoolMap: function() {
			$('.map_mapdetail_wrapper .back').one('click', function() {
				$('.map_mapselector_wrapper').show();
				$('.map_mapdetail_wrapper').hide();
			});
			// 百度地图API功能
			var map = new BMap.Map("mapdetail");
			map.centerAndZoom(new BMap.Point(116.404, 39.915), 11);
			var local = new BMap.LocalSearch(map, {
				renderOptions: { map: map }
			});
			local.search("上海工商外国语职业学院");
		},
		queryOptions: {
			query: '民办院校',
			region: '上海市',
			pagesize: 10,
			pageNumber: 1,
			ak: 'zUFzIA24qme28V6fTZPPObYDseC5G6Mp'
		},
		schoolList: function() {
			var that = this;
			//选择学校类别
			$('.map_schooltypelist_wrapper li').click(function() {
				var $this = $(this),
					thisType = $this.attr('class'),
					thisSrc = $this.find('img').attr('src');
				//标签切换效果
				$this.find('img').attr('src', function() {
					return thisSrc.replace(/_off/, '_on');
				}).end().siblings().find('img').attr('src', function() {
					return $(this).attr('src').replace(/_on/, '_off');
				});
				//筛选数据
				switch (thisType) {
					case 'all':
						that.getPlace('all');
						break;
					case 'college':
						that.getPlace('college');
						break;
					case 'primaryschool':
						that.getPlace('primaryschool');
						break;
					case 'kindergarten':
						that.getPlace('kindergarten');
						break;
					case 'institute':
						that.getPlace('institute');
						break;
					default:
						alert('nono');
				}
			});

			$('.pagination .prevpage').click(function() {
				that.getPlace('prevpage');
			});
			$('.pagination .nextpage').click(function() {
				that.getPlace('nextpage');
			});

			$('.map_schoollist_wrapper').on('click', ' li a', function() {
				$('.map_mapselector_wrapper').hide();
				$('.map_mapdetail_wrapper').show();
				that.schoolMap();
			});
		},
		getPlace: function(queryArgu) {
			var that = this,
				thisQueryOptions = this.queryOptions;
			switch (queryArgu) {
				case 'all':
					querySchool = {
						query: '民办学校'
					}
					this.queryOptions = $.extend(this.queryOptions, querySchool);
					break;
				case 'college':
					querySchool = {
						query: '大学'
					}
					this.queryOptions = $.extend(this.queryOptions, querySchool);
					break;
				case 'primaryschool':
					querySchool = {
						query: '民办中学民办小学'
					}
					this.queryOptions = $.extend(this.queryOptions, querySchool);
					break;
				case 'kindergarten':
					querySchool = {
						query: '民办幼儿园'
					}
					this.queryOptions = $.extend(this.queryOptions, querySchool);
					break;
				case 'institute':
					querySchool = {
						query: '培训机构'
					}
					this.queryOptions = $.extend(this.queryOptions, querySchool);
					break;
				case 'prevpage':
					var prevpageNum = thisQueryOptions.pageNumber - 1;
					if (prevpageNum < 1) {
						prevpageNum = 1;
					};
					this.queryOptions = $.extend(this.queryOptions, {
						pageNumber: prevpageNum
					});
					break;
				case 'nextpage':
					var nextpageNum = thisQueryOptions.pageNumber + 1;
					console.log(nextpageNum)
					thisQueryOptions = $.extend(this.queryOptions, {
						pageNumber: nextpageNum
					});
					break;
				default:
					querySchool = '民办学校';
			}

			this.queryOptions = thisQueryOptions;
			var url = function(newqueryOptions) {
				this.queryOptions = $.extend(this.queryOptions, newqueryOptions)
				var encode = function(string) {
					return encodeURIComponent(string);
				}
				var result = 'http://api.map.baidu.com/place/v2/search?q=' + encode(this.queryOptions.query) + '&page_size=' + encode(this.queryOptions.pagesize) + '&region=' + encode(this.queryOptions.region) + '&page_num=' + this.queryOptions.pageNumber + '&output=json&ak=' + this.queryOptions.ak;
				return result;
			};

			$.ajax({
				type: 'GET',
				url: url(this.queryOptions),
				dataType: 'jsonp',
				success: function(data) {
					var schoollistWrapperEl = $('.map_schoollist_wrapper'),
						schoollistEl = $('.map_schoollist_wrapper ul'),
						listItem = function(data) {
							return "<li><label>" + data + "</label><a href='javascript:;'>" + data.results[i].name + "</a></li>";
						}
					console.log(data);
					schoollistWrapperEl.find('.totalpages').html(data.total).end().find('.currentpage').html(that.queryOptions.pageNumber);
					schoollistEl.html('');
					for (var i = 0; i < data.results.length; i++) {
						// console.log(data.results[i].name);
						schoollistEl.append(listItem(data));
					};

				}
			});
		},
		init: function() {
			this.mapHover();
			this.schoolList();
		}
	}
	map.init();
})(jQuery);
