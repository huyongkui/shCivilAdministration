function multiTime(){
	var data=['00:00','01:00','02:00','03:00','04:00','05:00',
			'06:00','07:00','08:00','09:00','10:00','11:00',
			'12:00','13:00','14:00','15:00','16:00','17:00',
			'18:00','19:00','20:00','21:00','22:00','23:00'
		];
		var html="<ul style='width:300px;' id='timeUl'>";	
		for(var i=0;i<data.length;i++){
				html+="<li class='Multi_time' data-show='show'>"+data[i]+
				"<input type='checkbox' class='hide_checkbox' data-show='show' value="+data[i]+"></td></li>";
		
		}				
		html+="</ul>";
		$("#times").html(html);
		for(var s=0;s<data.length;s++){
			var Multi_time=$(".Multi_time").eq(s);
			var hide_checkbox=$(".hide_checkbox").eq(s);
			if(Multi_time.text()=="08:00"){
				Multi_time.addClass('currnet');
				hide_checkbox.attr('checked','checked');
			}if(Multi_time.text()=="09:00"){
				Multi_time.addClass('currnet');
				hide_checkbox.attr('checked','checked');
			}if(Multi_time.text()=="10:00"){
				Multi_time.addClass('currnet');
				hide_checkbox.attr('checked','checked');
			}if(Multi_time.text()=="11:00"){
				Multi_time.addClass('currnet');
				hide_checkbox.attr('checked','checked');
			}if(Multi_time.text()=="13:00"){
				Multi_time.addClass('currnet');
				hide_checkbox.attr('checked','checked');
			}if(Multi_time.text()=="14:00"){
				Multi_time.addClass('currnet');
				hide_checkbox.attr('checked','checked');
			}if(Multi_time.text()=="15:00"){
				Multi_time.addClass('currnet');
				hide_checkbox.attr('checked','checked');
			}if(Multi_time.text()=="16:00"){
				Multi_time.addClass('currnet');
				hide_checkbox.attr('checked','checked');
			}
		}	
		
		$(".Multi_time").click(function(){
			var s=$(this).index();
			if($(".hide_checkbox").eq(s).is(":checked")){					
					$(".hide_checkbox").eq(s).attr('checked','checked');
					$(".Multi_time").eq(s).addClass('currnet');
				}else{
					$(".hide_checkbox").eq(s).removeAttr('checked');
					$(".Multi_time").eq(s).removeClass('currnet');
			}
		})
}


//提交的时间段
function alertTime(){
	var checkData='';
	var checkD="";
	var getData='';
	for(var i=0;i<24;i++){
		if($(".hide_checkbox").eq(i).is(":checked")){
			var times=$(".Multi_time").eq(i).text();
			var time_01=parseInt(times)+1;
			if(time_01<10){
				checkData+=times+"-0"+time_01+":00;";
			}else if(time_01>10 && time_01<=23){
				checkData+=times+"-"+time_01+":00;";
			}else if(time_01==24){
				checkData+=times+"-00:00;";
			}
			
		}
	}
	for(var s=0;s<checkData.length-1;s++){
		checkD+=checkData[s];
	}
	$("#timesInput").val(checkD);
	//console.log(checkD);
	return checkD;
}

/*可预约人数*/
//function appointPeople(){
//	var appointInput=$("#appointInput").val();
//	//alert(appointInput);
//	return appointInput;
//}
/*日期处理*/
//function alertDate(){
	//var date_check=$("#date_check").val();
	//var datechange=date_check.split(",");//将字符串转换成数组，
//	var datachanges='';//将数组中得数放入字符串
	//var datachangesing='';//将数组中得数放入字符串
//	var a1=[],a2=[],a3=[];
	//for(var i=0;i<datechange.length;i++){
	//	var datechanging=datechange[i].split("/");
	//	for(var j=0;j<2;j++){
	//		a1[i]=datechanging[0];
	//		a2[i]=datechanging[1];
	//		a3[i]=datechanging[2];			
	//	}
	//	datachanges+=a3[i]+'-'+a1[i]+'-'+a2[i]+';';	
	//}
	//for(var n=0;n<datachanges.length-1;n++){
	//		datachangesing+=datachanges[n];
	//}
	//alert(datachangesing)
	//console.log(datachangesing)
	//$("#date_check").val(datachangesing);
	//return datachangesing;
//}