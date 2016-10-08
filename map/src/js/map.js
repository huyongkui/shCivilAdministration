$(function() {
	var map = {
		mapHover: function() {
			$('.area').hide();
			$('#mapelement area').hover(function() {
				console.log($('#' + $(this).attr('name')))
				$('.leftarea #' + $(this).attr('name')).show().siblings(".area").hide();
			});
		},
		schoolList: function() {
			$('.school_types li').click(function(e) {
				$this = $(this);
				thisSrc = $(this).find('img').attr('src');
				$(this).addClass('active').find('img').attr('src', function() {
					return thisSrc.replace(/_off.png/, '_on.png');
				}).end().siblings().removeClass('active').find('img').attr('src', function() {
					return ($(this).attr('src').replace(/_on.png/, '_off.png'));
				})
			})
		},
		init: function() {
			this.mapHover();
			this.schoolList();
		}
	}
	map.init();
});
