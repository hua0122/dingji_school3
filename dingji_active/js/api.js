// 发送验证码
let activity_sent_msg = "/api/activity/send_msg";
// 登录
let activity_login = "/api/activity/login";
// 个人信息
let activity_info = "/api/activity/info";
// 根据邀请人id获取电话号码
let activity_get_tel = "/api/activity/get_tel";
// 预存
let activity_prestore = "/api/activity/prestore";
// 分享前
let activity_share = "/api/activity/share";
// 邀请列表
let activity_invite_list = "/api/activity/invite_list";
// 邀请的时候调一下
let activity_invite = "/api/activity/invite";
// 抽奖
let activity_luck = "/api/activity/luck";
// 判断是否可以抽奖
let activity_chance = "/api/activity/chance";
// 中奖数据
let activity_luck_list = "/api/activity/luck_list";

// 根据邀请人id获取电话号码
function get_tel() {
	let ajaxdata = {
		id: getQueryString("yaoqing_id")
	}
	let data = ajaxPost(activity_get_tel, ajaxdata);
	if (data.status == "200") {
		$(".open-popo").css("display", "flex");
		$(".phone").html(data.data.tel)
	}
}
// 发送验证码
function sent_msg(tel) {
	let ajaxdata = {
		tel: tel
	}
	let data = ajaxPost(activity_sent_msg, ajaxdata);
	if (data.returnstatus == "Success") {
		alert("验证码已发送，请注意查收", " ")
		$(".codebtn").css("pointer-events", "none");
		$(".codebtn").text(60);
		num();
		// $(".codebtn").addClass("ztsfontcolor").removeClass("ztsbuttom");
	} else {

		alert(data.message, " ")
	}
}
// 登录
function login(ajaxdata) {
	let data = ajaxPost(activity_login, ajaxdata);
	if (data.status == "200") {
		localStorage.setItem("userInfo", JSON.stringify(data.data))
		alert("登录成功");
		$(".iframe-popo").hide(1);
		$(".total_amount").html(data.data.total_amount)
		window.location.reload();
		$("#recomphone").val("");
	} else {
		alert(data.msg, " ")
	}
}
// 判断是否登录
function toLogin() {
	let userInfo = JSON.parse(localStorage.getItem("userInfo"));
	if (userInfo == null || userInfo == "" || userInfo == "null" || userInfo == undefined || userInfo == "undefined") {
		$(".iframe-popo").show();
	}
}

// 个人信息
function info() {
	let userInfo = JSON.parse(localStorage.getItem("userInfo"));

	let ajaxdata = {
		tel: userInfo.tel,
	}
	let data = ajaxPost(activity_info, ajaxdata);
	if (data.status == "200") {
		localStorage.setItem("userInfo", JSON.stringify(data.data))
		$(".total_amount").html(data.data.total_amount)
		if (data.data.is_prestore == 1) {
			$(".ycmoney").html("300");
		} else {
			$(".ycmoney").html("0");
		}
		if (data.data.is_share == 0) {
			$(".fxmoney").html(0)
		} else {
			$(".fxmoney").html(100)

		}
		// 
	}
}
// 邀请列表
function invite_list() {
	let userInfo = JSON.parse(localStorage.getItem("userInfo"));
	let ajaxdata = {
		tel: userInfo.tel,
	}
	let data = ajaxPost(activity_invite_list, ajaxdata);
	if (data.status == "200") {
		let src = "";
		for (var i = 0; i < data.data.length; i++) {
			src += '<div class="row">' + data.data[i].name + ' ' + data.data[i].tel + '</div>';
		}
		$(".yqnum").html(data.data.length)
		$(".yqmoney").html(data.data.length * 100)
		$(".row-box").html(src);
	}
}
// 邀请
function invite() {
	let userInfo = JSON.parse(localStorage.getItem("userInfo"));
	let ajaxdata = {
		tel: userInfo.tel,
	}
	let data = ajaxPost(activity_invite, ajaxdata);
}
// 预存
function prestore() {
	let userInfo = JSON.parse(localStorage.getItem("userInfo"));
	let yaoqing_id = getQueryString("yaoqing_id"),
		id = "";
	if (yaoqing_id != null || yaoqing_id != "" || yaoqing_id != "null" || yaoqing_id != undefined || yaoqing_id !=
		"undefined") {
		id = yaoqing_id;
	} else {
		id = getQueryString("id");

	}
	let ajaxdata = {
		amount: 100,
		tel: userInfo.tel,
		id: getQueryString("id")
	}
	let data = ajaxPost(activity_prestore, ajaxdata);
	if (data.status == "200") {
		alert("预存成功");
		info();
	} else {
		alert(data.msg)
	}
}
// 分享前
function share() {
	let userInfo = JSON.parse(localStorage.getItem("userInfo"));
	let ajaxdata = {
		tel: userInfo.tel,
	}
	let data = ajaxPost(activity_share, ajaxdata);
	if (data.status == "200") {
		do_share();

	}
}
// 抽奖
function luck() {
	let userInfo = JSON.parse(localStorage.getItem("userInfo"));
	let ajaxdata = {
		tel: userInfo.tel,
	}
	let data = ajaxPost(activity_luck, ajaxdata);
	if (data.status == "200") {
		var random = Math.floor(Math.random() * 360); //生成随机数  
		$("#turntable").rotate({
			duration: 3000,
			//转动时间间隔（速度单位ms）  
			angle: 0,
			//指针开始角度  
			animateTo: 3600 + parseInt(data.data.angle),
			//转动角度，当转动角度到达3600+random度时停止转动。 
			easing: $.easing.easeOutSine,
			//easing动画效果 
			callback: function() { //回调函数  
				alert(data.data.prize);
			}
		});
	}else{
		alert(data.msg)
	}
}
// 查看是否可以抽奖
function chance() {

	let userInfo = JSON.parse(localStorage.getItem("userInfo"));
	let ajaxdata = {
		id: userInfo.id,
	}
	let data = ajaxPost(activity_chance, ajaxdata);
	return data;
}

function luck_list() {
	let ajaxdata = {}
	let data = ajaxPost(activity_luck_list, ajaxdata);
	if (data.status == "200") {
		let src = "";
		for (var i = 0; i < data.data.length; i++) {
			src += '<div class="row">'+data.data[i].tel+'抽中'+data.data[i].luck_name+'</div>';
		}
		$(".luck").html(src);
	}
}
//分享弹出页面层
function do_share() {
	layer.open({
		type: 1,
		content: $('#share_box').html(),
		anim: 'up',
		style: 'position:fixed; bottom:0; left:0; width: 100%; padding:10px 0; border:none;'
	});
	var $config = {
		title: '你好,美食',
		description: '我在你好美食,分享吃货间的快乐,现在邀请你的加入~快来和我一起分享美食吧~',
		url: window.location.href + "?yaoqing_id=" + userInfo.id,
		source: window.location.href + "?yaoqing_id=" + userInfo.id,
		image: 'http://hellofood.fun/webicon.png',
		// summary : '吃货召唤', //相当于description
		// sites   : ['qzone', 'qq', 'weibo','wechat', 'douban'], // 启用的站点
		disabled: ['google', 'facebook', 'twitter', 'linyin'], // 禁用的站点
		wechatQrcodeTitle: "微信扫一扫：分享", // 微信二维码提示文字
		wechatQrcodeHelper: '立即下载发送专属二维码,邀请朋友加入',
	};

	socialShare('.social-share', $config);
	alert("分享后需要小伙伴浏览您的分享链接才可以抽奖哟！")
}
//邀请弹出页面层
function do_Invitation() {


	layer.open({
		type: 1,
		content: $('#Invitation_box').html(),
		anim: 'up',
		style: 'position:fixed; bottom:0; left:0; width: 100%; padding:10px 0; border:none;'
	});
}
