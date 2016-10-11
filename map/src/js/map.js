(function() {
	var map = {
		queryOptions: {
			query: '民办院校',
			region: '上海市',
			district: '',
			pagesize: 10,
			pageNumber: 0,
			ak: 'zUFzIA24qme28V6fTZPPObYDseC5G6Mp'
		},
		mapInstance: function() {
			//新建地图实例
			var map;
			if (map == null) {
				map = new BMap.Map("mapdetail");
				return map;
			} else {
				return map;
			}
			// return (function() {
			//  if (!map) {
			//      map = new BMap.Map("mapdetail");
			//  } else {
			//      return map;
			//  }
			// })
		},
		mapHover: function() {
			$('#mapelement area').hover(function() {
				$('.map_mapselector_wrapper .' + $(this).attr('name')).addClass('hover').siblings(".area").removeClass('hover');
			});
		},
		schoolMap: function(lat, lng, name) {
			$('.map_mapdetail_wrapper .back').one('click', function() {
				$('.map_mapselector_wrapper').show();
				$('.map_mapdetail_wrapper').hide();
			});
			var map = this.mapInstance();
			//
			map.centerAndZoom(new BMap.Point(lat, lng), 11);
			//打开各种地图控件
			map.addControl(new BMap.MapTypeControl());
			map.addControl(new BMap.NavigationControl());
			//打开滚轮操作
			map.enableScrollWheelZoom(true);
			//设置当前城市
			map.setCurrentCity("上海");
			var local = new BMap.LocalSearch(map, {
				renderOptions: {
					map: map
				}
			});
			local.search(name);

		},
		searching: function() {
			var that = this,
				searchText,
				serarchbarWrapper = $('.map_searchbar_wrapper'),
				searchBtn = serarchbarWrapper.find('.querybtn');
			searchBtn.click(function() {
				searchText = serarchbarWrapper.find('.querytxt').val();
				if (searchText == '') {
					return;
				} else {
					that.queryOptions.query = 'searching:' + searchText
						//that.assembleUrl(that.queryOptions.query);
					console.log(that.queryOptions.query)
					that.getPlace(that.queryOptions.query);

				}
			})
		},
		schoolList: function() {
			var that = this,
				thislat,
				thisLng;
			$('.map_schooltypelist_wrapper li').click(function() {
				var $this = $(this),
					thisType = $this.attr('class'),
					thisSrc = $this.find('img').attr('src');
				$this.addClass('active').find('img').attr('src', function() {
					return thisSrc.replace(/_off/, '_on');
				}).end().siblings().removeClass('active').find('img').attr('src', function() {
					return $(this).attr('src').replace(/_on/, '_off');
				});
				that.assembleUrl(thisType);

				that.getPlace('page1');
			});

			$('.pagination .prevpage').click(function() {

				that.getPlace('prevpage');
			});
			$('.pagination .nextpage').click(function() {

				that.getPlace('nextpage');
			});

			$('.map_schoollist_wrapper').on('click', ' li a', function() {
				var $this = $(this);
				$('.map_mapselector_wrapper').hide();
				$('.map_mapdetail_wrapper').show();
				thisLat = $this.attr('lat');
				thisLng = $this.attr('lng');
				that.schoolMap(thisLat, thisLng, $this.html());
			});
			//地图上选择区县
			$('.map_mapselector_wrapper map area').click(function() {
				var $this = $(this),
					thisType = $this.attr('name');
				$('.map_mapselector_wrapper .' + thisType).addClass('active').siblings().removeClass('active');
				//筛选数据
				// that.assembleUrl('page1');
				that.getPlace(thisType);
			})
		},
		showMap: function() {

		},
		assembleUrl: function(queryArgu) {
			var that = this,
				querySchool,
				queryPage,
				queryArgu,
				queryDistrict,
				thisQueryOptions = that.queryOptions;

			var getResult = function(argument) {
				var encode = function(string) {
					return string;
					// return encodeURIComponent(string);
				}
				var result = 'http://api.map.baidu.com/place/v2/search?q=' + encode(thisQueryOptions.district) + encode(thisQueryOptions.query) + '&page_size=' + encode(thisQueryOptions.pagesize) + '&region=' + encode(thisQueryOptions.region) + '&page_num=' + thisQueryOptions.pageNumber + '&output=json&ak=' + thisQueryOptions.ak;
				return result;
			}
			var query = {
				querySchool: function(queryArgu) {
					switch (queryArgu) {
						case 'all':
							querySchool = {
								query: '民办学校'
							}
							break;
						case 'college':
							querySchool = {
								query: '大学'
							}
							break;
						case 'primaryschool':
							querySchool = {
								query: '民办中学民办小学'
							}
							break;
						case 'kindergarten':
							querySchool = {
								query: '民办幼儿园'
							}
							break;
						case 'institute':
							querySchool = {
								query: '培训机构'
							}
							break;
					}
					thisQueryOptions = $.extend(thisQueryOptions, querySchool);
				},
				queryNav: function(queryArgu) {
					switch (queryArgu) {
						case 'prevpage':
							if (thisQueryOptions.pageNumber == 0) {
								return;
							} else {
								thisQueryOptions.pageNumber--;
							}
							break;
						case 'nextpage':
							thisQueryOptions.pageNumber++;
							break;
						case 'page1':
							thisQueryOptions.pageNumber = 0;
							break;
					}
				},
				queryDistrict: function(queryArgu) {
					switch (queryArgu) {
						case 'chongming':
							queryDistrict = {
								district: '崇明'
							}
							break;
						case 'jiading':
							queryDistrict = {
								district: '嘉定'
							}
							break;
						case 'baoshan':
							queryDistrict = {
								district: '宝山'
							}
							break;
						case 'putuo':
							queryDistrict = {
								district: '普陀'
							}
							break;
						case 'jingan':
							queryDistrict = {
								district: '静安闸北'
							}
							break;
						case 'hongkou':
							queryDistrict = {
								district: '虹口'
							}
							break;
						case 'yangpu':
							queryDistrict = {
								district: '杨浦'
							}
							break;
						case 'changnin':
							queryDistrict = {
								district: '长宁'
							}
							break;
						case 'huangpu':
							queryDistrict = {
								district: '黄浦'
							}
							break;
						case 'yangpu':
							queryDistrict = {
								district: '杨浦'
							}
							break;
						case 'xuhui':
							queryDistrict = {
								district: '徐汇'
							}
							break;
						case 'qingpu':
							queryDistrict = {
								district: '青浦'
							}
							break;
						case 'songjiang':
							queryDistrict = {
								district: '松江'
							}
							break;
						case 'minhang':
							queryDistrict = {
								district: '闵行'
							}
							break;
						case 'pudong':
							queryDistrict = {
								district: '浦东新'
							}
							break;
						case 'jinshan':
							queryDistrict = {
								district: '金山'
							}
							break;
						case 'fengxian':
							queryDistrict = {
								district: '奉贤'
							}
							break;
						default:
							querySchool = '民办学校';
					}
					thisQueryOptions = $.extend(thisQueryOptions, queryDistrict);
				}
			}
			console.log(queryArgu)
			query.querySchool(queryArgu);
			query.queryNav(queryArgu);
			query.queryDistrict(queryArgu);
			if (queryArgu.indexOf('searching:') != -1) {
				queryArgu = queryArgu.replace(/searching:/, '');
				thisQueryOptions = $.extend(thisQueryOptions, { query: queryArgu });
				return getResult(thisQueryOptions)
			} else {
				return getResult(thisQueryOptions)
			}
		},
		ajaxRequest: function(url) {
			console.log(url)
			var thisQueryOptions = this.queryOptions;
			$.ajax({
				type: 'GET',
				url: url,
				dataType: 'jsonp',
				success: function(data) {
					var schoollistWrapperEl = $('.map_schoollist_wrapper'),
						schoollistEl = schoollistWrapperEl.find('ul'),
						totalPages = Math.ceil(data.total / thisQueryOptions.pagesize),
						currentPage = thisQueryOptions.pageNumber,
						listItem = function(data, index) {
							return "<li><label>" + Number(currentPage * 10 + index + 1) + "</label><a href='javascript:;' lat=" + data.results[i].location.lat + " lng=" + data.results[i].location.lng + ">" + data.results[i].name + "</a></li>";
						}
					console.log(data);
					$('.map_schooltypelist_wrapper .active').find('span').html(data.total).end().siblings().find('span').html('');
					schoollistWrapperEl.find('.totalpages').html(totalPages).end().find('.currentpage').html(currentPage + 1);
					schoollistEl.html('');
					for (var i = 0; i < data.results.length; i++) {
						// console.log(data.results[i].name);
						schoollistEl.append(listItem(data, i));
					};
				}
			});
		},
		getPlace: function(para) {
			this.ajaxRequest(this.assembleUrl(para));
		},
		firstLoad: function() {

		},
		init: function() {
			this.searching();
			this.mapHover();
			this.schoolList();
		}
	}
	map.init();
})(jQuery);
