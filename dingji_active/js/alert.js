let sth={
	alert:function(option){
		let index=-1;
		let src='<div class="iframe-popo">'+
			'<div class="iframe">'+
				'<div class="iframe-bg"><span class="content">'+
					option.content+
				'</span></div>'+
				'<div class="btn">'+
					'<span class="ok">我知道了</span>'+
					'<span class="close">我知道了</span>'+
				'</div>'+
			'</div>'+
		'</div>';
		$(".main").append(src);
		$(".ok").on("click",function(){
			$(".iframe-popo").hide();
			index=0;
		})
		
		$(".close").on("click",function(){
			$(".iframe-popo").hide();
			index=1;
		})
		return index
	}
}