$(function(){
	$('.area').hide();
	$('#mapelement area').hover(function(){
		console.log($('#'+$(this).attr('name')))
		$('.leftarea #'+$(this).attr('name')).show().siblings(".area").hide();
	})
//	$('.hid').hide();
	$('.huzhao').find(':selected').click(function(){
		$(this).val();
	});
})