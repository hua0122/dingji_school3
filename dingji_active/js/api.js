// 发送验证码
let protect_sent_msg = "/api/protect/sent_msg";
// 登录
let protect_login = "/api/protect/login";
// 查询推荐码
let protect_get_code = "/api/protect/get_code";
// 设置推荐码
let protect_set_code = "/api/protect/set_code";
// 查询学员是否已经被保护
let protect_select_student = "/api/protect/select_student";
// 意向资源添加保护
let protect_resource_add = "/api/protect/resource_add";
// 资源保护列表
let protect_resource_list = "/api/protect/resource_list";
// 成交学员详细列表
let protect_deal_list = "/api/protect/deal_list";
// 团队成交数据
let protect_deal_team = "/api/protect/deal_team";
// 开发记录列表
let protect_develop_list = "/api/protect/develop_list";
// 开发记录查询
let protect_develop_show = "/api/protect/develop_show";
// 开发记录编辑
let protect_develop_edit = "/api/protect/develop_edit";
// 资源保护人员替换
let protect_resource_replace = "/api/protect/resource_replace";
// 添加开发记录
let protect_develop_add = "/api/protect/develop_add";
// 解除资源保护
let protect_resource_remove = "/api/protect/resource_remove";

// 发送验证码
function sent_msg(tel) {
	let ajaxdata = {
		tel: tel
	}
	let data = ajaxPost(protect_sent_msg, ajaxdata);
	if (data.returnstatus == "Success") {
		mui.alert("验证码已发送，请注意查收", " ")
		$(".codebtn").css("pointer-events", "none");
		$(".codebtn").text(60);
		num();
		$(".codebtn").addClass("ztsfontcolor").removeClass("ztsbuttom");
	} else {

		mui.alert(data.message, " ")
	}
}
// 登录
function login(ajaxdata) {
	let data = ajaxPost(protect_login, ajaxdata);
	if (data.status == "200") {
		localStorage.setItem("userInfo", JSON.stringify(data.data))
		location.href = "index.html";
	} else {
		mui.alert(data.msg, " ")
	}
}
// 查询推荐码
function get_code(tel) {
	let ajaxdata = {
		tel: tel
	}
	let data = ajaxPost(protect_get_code, ajaxdata);
	return data;
}
// 设置推荐码
function set_code(ajaxdata) {

	let data = ajaxPost(protect_set_code, ajaxdata);

	mui.alert(data.msg, " ")
	if (data.status == "200") {
		$(".setCode").removeClass("ztsbuttom");
		$(".setCode").css("pointer-events", "none");
		$("#recomcode").attr("disabled", true);
		$(".updetaCode").text("修改推荐码");
		$(".updetaCode").css("width", ".65rem");
	}
}

// 查询学员是否已经被保护
function select_student(ajaxdata) {
	let data = ajaxPost(protect_select_student, ajaxdata);
	if (data.status == "200") {
		if (data.data.num == 0) {
			mui.confirm("您的保护名额已经用完您可以替换掉无法成交的学员", " ", ['不用了', '去替换'], function(e) {
				if (e.index == 1) {
					$(".index-TstudentDetail").css("display", "block");
				}
			})
		} else {

			mui.confirm("您查询的学员未保护，是否保护？您当前还可以添加 " + data.data.num + " 名", " ", ['取消', '添加保护'], function(e) {
				if (e.index == 1) {
					resource_add(ajaxdata);
				}
			})
		}
	}
	if (data.status == "500") {

		mui.alert("您查询的学员已经被保护\n\n保护时间：<font>" + data.data.protect_time + "</font>\n脱保时间：<font>" + data.data.protect_time +
			"</font>", " ")
	}
}
// 意向资源添加保护
function resource_add(ajaxdata) {

	let data = ajaxPost(protect_resource_add, ajaxdata);
	if (data.status == "200") {
		mui.alert("添加成功", " ", function() {

			$(".mui-popup").remove()
		})
	}
}

// 资源保护列表
function resource_list(type) {
	let jcth = "";
	if (type == "popo") {
		jcth = "替换";
	}
	if (type == "page") {
		jcth = "解除";
	}
	let userInfo = JSON.parse(localStorage.getItem("userInfo"));
	let ajaxdata = {
		person: userInfo.phone
	}
	let data = ajaxPost(protect_resource_list, ajaxdata);
	let rlData = data.data.list;
	let deactivationData = data.data.deactivation;
	// 资源保护列表
	let listSrc = "";
	// 已脱保列表
	let deactivationSrc = "";
	let src = "";
	let numStudent = 0;
	for (var i = 0; i < rlData.length; i++) {
		let time = rlData[i].time;
		let valuesrc = "";
		let titlesrc = "";
		let dxSrc = "";
		let daynumStudent = 0;
		if (i == 0) {
			titlesrc = '<div class="title">' +
				'您共成交<span class="ztsfontcolor numStudent">28</span>名学员' +
				'</div>';
		}
		if (i == (rlData.length - 1)) {
			dxSrc = '<div class="dx">人家有底线啦</div>';
		}
		delete rlData[i]['time'];
		$.each(rlData[i], function(index, value) {
			valuesrc += '<div class="item ">' +
				'<div class="name">' + value.name + '</div>' +
				'<div class="tel">' + value.tel + '</div>' +
				'<div class="relieve"><span class="time">' + value.deactivation_time.substring(0, value.deactivation_time.length -
					3) + '</span><span class="line">|</span><span class="replace" id="' + value.id + '">' + jcth +
				'<span class="mui-icon mui-icon-forward"></span></span></div>' +
				'</div>';
			numStudent++;
			daynumStudent++;
		});
		listSrc = '<div class="column box-shadow">' +
			titlesrc +
			'<div class="item ztsfontcolor">' +
			'<span><span class="time">' + time + '</span><span class="text6">共' + daynumStudent + '名</span></span>' +
			'</div>' +
			valuesrc +
			dxSrc +
			'</div>';
	}


	$(".TstudentDetail .content").html(listSrc);
	$(".numStudent").text(numStudent);
	if (type == "page") {
		let srcda = "";
		for (var i = 0; i < deactivationData.length; i++) {
			srcda += '<div class="item ">' +
				'<div>' + deactivationData[i].name + '</div>' +
				'<div>' + deactivationData[i].tel + '</div>' +
				'<div class="relieve deinsurance"><span class="time">' + deactivationData[i].deal_time +
				'</span><span class="line">|</span>' +
				deactivationData[i].status + '</div>' +
				'</div>';
		}

		deactivationSrc = '<div class="column box-shadow">' +
			'<div class="item ztsfontcolor">' +
			'已脱保名单' +
			'</div>' +
			srcda +
			'<div class="dx">人家有底线啦</div>' +
			'</div>';
		$(".TstudentDetail .content").append(deactivationSrc);
		$(".TstudentDetail .content .column").eq($(".TstudentDetail .content .column").length - 2).find(".dx").remove();

	}
}

// 资源保护人员替换
function resource_replace(id) {

	let userInfo = JSON.parse(localStorage.getItem("userInfo"));
	let ajaxdata = {
		person: userInfo.phone,
		id: id,
		tel: $("#studentPhone").val(),
		name: $("#studentName").val()
	}
	let data = ajaxPost(protect_resource_replace, ajaxdata);
	if (data.status == "200") {
		mui.alert("替换保护成员成功", " ");
	}
	console.log(data)
}

// 解除资源保护
function resource_remove(id) {
	
	let userInfo = JSON.parse(localStorage.getItem("userInfo"));
	let ajaxdata = {
		person: userInfo.phone,
		id: id,
	}
	let data = ajaxPost(protect_resource_remove, ajaxdata);
	if (data.status == "200") {
		mui.alert("解除保护成功", " ", function() {
			window.location.reload();
		})
	}

	console.log(data)
}
// 成交学员详细列表
function deal_list() {

	let userInfo = JSON.parse(localStorage.getItem("userInfo"));
	let ajaxdata = {
		person: userInfo.phone
	}
	let data = ajaxPost(protect_deal_list, ajaxdata);
	let src = "";
	let numStudent = 0;
	for (var i = 0; i < data.data.length; i++) {

		let time = data.data[i].time;
		let valuesrc = "";
		let titlesrc = "";
		let dxSrc = "";
		let daynumStudent = 0;
		if (i == 0) {
			titlesrc = '<div class="title">' +
				'您共成交<span class="ztsfontcolor numStudent">28</span>名学员' +
				'</div>';
		}
		if (i == (data.data.length - 1)) {
			dxSrc = '<div class="dx">人家有底线啦</div>';
		}
		delete data.data[i]['time'];
		$.each(data.data[i], function(index, value) {
			valuesrc += '<div class="item ">' +
				'<div>' + value.name + '</div>' +
				'<div>' + value.tel + '</div>' +
				'<div>' + value.school_name + '</div>' +
				'</div>';
			numStudent++;
			daynumStudent++;
		});
		src += '<div class="column box-shadow">' +
			titlesrc +
			'<div class="item ztsfontcolor">' +
			'<span><span class="time">' + time + '</span><span class="text6">共' + daynumStudent + '名</span></span>' +
			'</div>' +
			valuesrc +
			dxSrc +
			'</div>';
	}
	$(".item1").html(src)
	$(".numStudent").text(numStudent);
}

function deal_team() {


	let userInfo = JSON.parse(localStorage.getItem("userInfo"));
	let ajaxdata = {
		person: userInfo.phone
	}
	let data = ajaxPost(protect_deal_team, ajaxdata);
		let src = "";
		let numStudent = 0;
		for (var i = 0; i < data.data.length; i++) {
	
			let time = data.data[i].time;
			let valuesrc = "";
			let titlesrc = "";
			let dxSrc = "";
			let daynumStudent = 0;
			if (i == 0) {
				titlesrc = '<div class="title">' +
					'您的团队共成交<span class="ztsfontcolor numStudent">28</span>名学员' +
					'</div>';
			}
			if (i == (data.data.length - 1)) {
				dxSrc = '<div class="dx">人家有底线啦</div>';
			}
			delete data.data[i]['time'];
			$.each(data.data[i], function(index, value) {
				let personnumStudent = 0;

				let person=value['person'];
			delete value['person'];
			let value1src="";
			$.each(value,function(index1,value1){
				 value1src+= '<div class="item ">' +
					'<div>' + value1.name + '</div>' +
					'<div>' + value1.tel + '</div>' +
					'<div>' + value1.school_name + '</div>' +
					'</div>';
					
					numStudent++;
					daynumStudent++;
					personnumStudent++;
			})
				valuesrc+=
				'<div class="item fu-item ztsfontcolor">'+
					'<span><span class="time">'+person+'&nbsp;&nbsp;&nbsp;&nbsp;</span><span class="text6">共'+personnumStudent+'名</span></span>'+
				'</div>'+value1src;
			});
			src += '<div class="column box-shadow">' +
				titlesrc +
				'<div class="item ztsfontcolor">'+
					'<div class="fu-title">'+
					'<span><span class="time">' + time + '</span><span class="text6">共' + daynumStudent + '名</span></span>' +
						'</div>'+
				'</div>'+
				valuesrc +
				dxSrc +
				'</div>';
		}
		$(".item2").html(src)
		$(".numStudent").text(numStudent);
}
// 开发记录列表
function develop_list() {

	let userInfo = JSON.parse(localStorage.getItem("userInfo"));
	let ajaxdata = {
		person: userInfo.phone
	}
	let data = ajaxPost(protect_develop_list, ajaxdata);
	console.log(data)

	let src = "";
	let numStudent = 0;
	for (var i = 0; i < data.data.length; i++) {

		let time = data.data[i].time;
		let valuesrc = "";
		let titlesrc = "";
		let dxSrc = "";
		let daynumStudent = 0;
		if (i == 0) {
			titlesrc = '<div class="title">' +
				'共 <span class="ztsfontcolor numStudent">28</span> 名保护成员' +
				'</div>';
		}
		if (i == (data.data.length - 1)) {
			dxSrc = '<div class="dx">人家有底线啦</div>';
		}
		delete data.data[i]['time'];
		$.each(data.data[i], function(index, value) {
			valuesrc += '<div class="item ">' +
				'<div>' + value.name + '</div>' +
				'<div>' + value.tel + '</div>' +
				'<div class="edit" id=' + value.id + '>编辑<span class="mui-icon mui-icon-arrowright"></span></div>' +
				'</div>';
			numStudent++;
			daynumStudent++;
		});
		src += '<div class="column box-shadow">' +
			titlesrc +
			'<div class="item ztsfontcolor">' +
			'<span><span class="time">' + time + '</span><span class="text6">共' + daynumStudent + '名</span></span>' +
			'</div>' +
			valuesrc +
			dxSrc +
			'</div>';
	}
	$(".content").html(src)
	$(".numStudent").text(numStudent);
}

// 添加开发记录
function develop_add(ajaxdata) {

	let data = ajaxPost(protect_develop_add, ajaxdata);
	if (data.status == "200") {
		mui.alert("添加成功", " ");
	} else {

		mui.alert(data.msg, " ");
	}
}
// 开发记录查询
function develop_show() {

	let userInfo = JSON.parse(localStorage.getItem("userInfo"));
	let ajaxdata = {
		id: getQueryString("id"),
		person: userInfo.phone
	}
	let data = ajaxPost(protect_develop_show, ajaxdata);
	
	if (data.status == "200") {
		$("#selName").val(data.data.name); //复制[string] 学员姓名
		$("#selTel").val(data.data.tel);//[string] 是 学员电话号码
		$("#selChannel").val(data.data.channel);//[string] 是 资源获取途径
		$("#selOne").val(data.data.one);//[string] 一次跟进情况
		$("#selTwo").val(data.data.two);//[string] 两次跟进情况
		$("#selThree").val(data.data.three);//[string] 三次跟进情况
		$("#selDeal_time").val(settiem(data.data.deal_time));//[string] 预计成交时间
		$("#selRemark").val(data.data.remark);
	}
}

// 开发记录编辑
function develop_edit(ajaxdata){
	let data = ajaxPost(protect_develop_edit, ajaxdata);
	if (data.status == "200") {
			mui.alert("修改成功", " ");
			history.back();
		} else {
	
			mui.alert(data.msg, " ");
		}
}