(function($) {
	var index = {
		navMenu: function() {
			var substationnavTrigger = $('.common_substationnav_wrapper'),
				substationnavList = substationnavTrigger.find('.locationmenu');
			substationnavTrigger.hover(function() {
				substationnavList.show();
			}, function() {
				substationnavList.hide();
			});
		},
		swiper: function() {
			var swiper = new Swiper('.index_carousel_wrapper', {
				loop: true,
				pagination: '.swiper-pagination',
				nextButton: '.arrow_right',
				prevButton: '.arrow_left',
				paginationClickable: true
			});
		},
		init:function(){
			this.navMenu();
			this.swiper();
			$('.index_carousel_wrapper .swiper-slide>a>img').each(function(){
				console.log($(this).attr('src'))
			})

		}
	}
	index.init();
})(jQuery)
