(function() {
	var map = {
		mapHover: function() {
			$('.area').hide();
			$('#mapelement area').hover(function() {
				$('.leftarea #' + $(this).attr('name')).show().siblings(".area").hide();
			});
		},
		schoolMap: function() {
			$('.map_mapdetail_wrapper .back').one('click', function(){
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
		schoolList: function() {
			var that = this;
			$('.school_types li').click(function() {
				var $this = $(this);
				thisSrc = $this.find('img').attr('src');
				$this.addClass('active').find('img').attr('src', function() {
					return thisSrc.replace(/_off/, '_on');
				}).end().siblings().removeClass('active').find('img').attr('src', function() {
					return $(this).attr('src').replace(/_on/, '_off');
				});
			});
			$('.map_schoollist_wrapper li a').click(function() {
				$('.map_mapselector_wrapper').hide();
				$('.map_mapdetail_wrapper').show();
				that.schoolMap();
			});
		},
		init: function() {
			this.mapHover();
			this.schoolList();
		}
	}
	map.init();
})(jQuery);
