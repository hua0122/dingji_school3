// banner-api
let sign_get_banner = "/api/sign/get_banner";
// 场地列表
let sign_get_area = "/api/sign/get_area";
// 班别列表
let sign_get_grade = "/api/sign/get_grade";
// 班别详情
let sign_grade_detail = "/api/sign/grade_detail";
// 活动列表
let sign_get_activity = "/api/sign/get_activity";
// 优惠券选择
let sign_yhq_code = "/api/sign/yhq_code";
// 推荐码确认
let sign_referral = "/api/sign/referral";
// 体检站列表
let sign_get_station = "/api/sign/get_station";
// 报名
let sign_submit_sign = "/api/sign/submit_sign";
// 我的协议
let user_agreement = "/api/user/agreement";
// 活动选择
let sign_activity_detail = "/api/sign/activity_detail";
let sign_apply = "/api/sign/apply";
// 体检页面默认数据
let sign_get_sign = "/api/sign/get_sign";
// let latlng=JSON.parse(sessionStorage.getItem("latlng"));
// 报名api
// banner
function get_banner() {
	let ajaxdata = {

	}
	let data = ajaxGet(sign_get_banner, ajaxdata)
	let src = "";
	if (data.status == "200") {
		for (var i = 0; i < data.data.length; i++) {
			src += "<li style='background:url(" + domainName + data.data[i].picurl +
				") 50% 50% no-repeat;background-size: 100%;'></li>";

		}
	}
	$(".slides").html(src);
}
// 场地列表
function get_area() {
	if (latlng != null && latlng != undefined && latlng != "" && latlng != "null" && latlng != "undefined") {
		area(latlng.lng, latlng.lat);
	} else {
		wx.ready(function() {
			wx.getLocation({
				type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
				success: function(res) {
					area(res.longitude, res.latitude);
				}
			});
		});
	}

}

function area(longitude, latitude) {
	let uniqsortdata = JSON.parse(sessionStorage.getItem("uniqsortdata"));
	let src = "";
	if (uniqsortdata != null && uniqsortdata != "null" && uniqsortdata != undefined && uniqsortdata != "" && uniqsortdata !=
		"undefined") {
		for (var i = 0; i < uniqsortdata.length; i++) {
			src += "<label><font><input type='radio' name='city' value=" + uniqsortdata[i].id + "/>" + uniqsortdata[i].name +
				"</font><font style='font-size:12px;'>" + Math.round(uniqsortdata[i].Distance) + "km</font></label><br/>"
		}
		$("#area").html(src);
	} else {

		let ajaxdata = {

		}
		let data = ajaxGet(sign_get_area, ajaxdata)
		var map = new BMap.Map("container");
		var point1 = new BMap.Point(longitude, latitude);

		let DistanceSORT = [];
		for (var i = 0; i < data.data.length; i++) {
			var point2 = new BMap.Point(data.data[i].lng, data.data[i].lat);
			let Distance = map.getDistance(point1, point2) / 1000;
			data.data[i]["Distance"] = Distance;
			DistanceSORT.push(Distance);
		}
		// 排序
		DistanceSORT.sort(function(x, y) {
			return x - y;
		});
		let sortdata = [];
		for (var i = 0; i < DistanceSORT.length; i++) {
			for (let j = 0; j < data.data.length; j++) {
				if (data.data[j].Distance == DistanceSORT[i]) {
					sortdata.push(data.data[j]);

				}
			}
		}
		uniqsortdata = uniq(sortdata);
		sessionStorage.setItem("uniqsortdata", JSON.stringify(uniqsortdata))

		geocoderfun(uniqsortdata);
	}

}
// 班别列表
function get_list(city) {
	let ajaxdata = {
		area_id: parseInt(city)
	};
	let data = ajaxPost(sign_get_grade, ajaxdata)
	let src = "";

	if (data.data != null && data.data.length != 0) {

		for (var i = 0; i < data.data.length; i++) {

			src += "<div class='col-xs-12'>" +
				"<a href='../enlist/detail.html?id=" + data.data[i].id + "'>" + data.data[i].name + "C" + data.data[i].type +
				"<span class='right'>" + data.data[i].price + "</span></a>" +
				"</div>";
		}
		$("#course_list").html(src);
	} else {
		$("#course_list").empty();
		$("#course_list").append('<div class="col-xs-12">暂无数据</div>');
	}
}


// 班别详情
function grade_detail() {
	let id = parseInt(window.location.href.split("detail.html?id=")[1]);
	let ajaxdata = {
		id: id
	};
	let data = ajaxPost(sign_grade_detail, ajaxdata)

	if (data.status == "200") {
		sessionStorage.setItem("grade_detail", JSON.stringify(data.data))
		$(".img-left img").attr("src", domainName + data.data.picurl);
		$(".address_name").text(data.data.address);
		$(".infocontent").html(data.data.content);
		$(".infonotice").html(data.data.notice);
		$(".enroll-btn").attr("href", "../enlist/sign.html?id=" + data.data.notice)
		getBaiduLocation("#address", latlng.lng, latlng.lat, data.data.lng, data.data.lat); //转换为百度坐标

	}
}
// 活动列表
function get_activity() {

	let ajaxdata = {

	};
	let data = ajaxPost(sign_get_activity, ajaxdata)
	let src = "";
	if (data.status == "200") {
		for (var i = 0; i < data.data.length; i++) {
			src += '<div class="modal-body">' +
				'<input type="radio" value="' + data.data[i].id + '" class="activity_id" name="activity_id" style="width: 25px;">' +
				'<div><img src="" data-src="' + domainName + data.data[i].picurl + '" width="83" height="83"/> <br/>' + data.data[i]
				.name +
				'</div>' +
				'<div><span>' + data.data[i].description + '</span></div>' +
				'</div>';
		}
	}
	let boxsrc = "<div class='boxsrc'>" + src + "</div>"
	$("#activity").html(boxsrc);
}
// 优惠券选择
function yhq_code(code) {

	let ajaxdata = {
		code: code
	};
	let data = ajaxPost(sign_yhq_code, ajaxdata)
	if (data.status == "400") {
		alert("优惠券不正确,请重新输入");
		$("#yhq_code").val("");
	} else if (data.status == "000") {
		alert(data.msg);
		$("#yhq_code").val("");
	} else if (data.status == "200") {
		$("#coupon").html('<input type="hidden" name="coupon_id" id="coupon_id" value="' + data.data.id + '"/>');
		var count = parseFloat($(".total-count").html() - data.data.amount).toFixed(2);
		$(".total-count").html(count);
		sessionStorage.setItem("total_count", count);
		// $("#yhq").attr('disabled', true);
		$(".yhq-code").html(data.data.name);
		$(".yhq-code").attr("yhqid", data.data.id);
		$(".yhq-code").css({
			"flex": 1
		})
		$(".activity").removeClass("activity-tjm");
	}
}
// 推荐码确认
function referral(code) {
	let ajaxdata = {
		code: code
	};
	let data = ajaxPost(sign_referral, ajaxdata)
	if (data.status == "200") {
		$("#referral").html('<input type="hidden" name="inviter" id="inviter" value="' + data.data.id + '"/>');
		$(".tjm-code").html(data.data.code + '<span class="more-jt">></span>');
		$("#inviter").attr("inviterid", data.data.code)
		$(".tjm-code").removeClass("activity-tjm");
	} else {
		alert(data.msg);
		$("#code").val("");

	}
}
// 活动选择

// 体检列表
function get_station() {

	let ajaxdata = {

	}
	let data = ajaxGet(sign_get_station, ajaxdata)
	let src = "";
	sessionStorage.setItem("get_station", JSON.stringify(data.data))
	var map = new BMap.Map("container");
	var point1 = new BMap.Point(latlng.lng, latlng.lat);
	for (var i = 1; i < data.data.length; i++) {

		var point2 = new BMap.Point(data.data[i].lng, data.data[i].lat);
		let distancetext = Math.round(map.getDistance(point1, point2) / 1000);
		src += '<li class="shenqing">' +
			'<div  >' +
			'<span class="left tit">' +
			'<span class="station">' + data.data[i].name + '</span>' +
			' <span class="dizhi">地址:' + data.data[i].address + '</span>' +
			'<input type="hidden" class="station_id" value="' + data.data[i].id + '" />' +
			'</span>' +
			'<a class="address" class="right address">距您' + distancetext +
			'km <span  class="fa fa-map-marker"></span></a>' +
			'</div>' +
			'</li>';

		getBaiduLocation(".address", latlng.lng, latlng.lat, data.data[i].lng, data.data[i].lat); //转换为百度坐标
	}
	$(".stationitem").html(src);
}

function submit_sign() {

	var name = $("#name").val(); //姓名
	var phone = $("#phone").val(); //电话
	var card = $("#cno").val(); //身份证号
	if (!name) {
		alert('姓名不能为空');
		return false;
	}
	if (!(/^[\u4e00-\u9fa5]{2,4}$/).test(name)) {
		alert("真实姓名填写有误");
		return false;
	}


	if (!phone) {
		alert('联系电话不能为空');
		return false;
	}
	if (!(/^1[34578]\d{9}$/.test(phone))) {
		alert("手机号码有误，请重填");
		return false;
	}


	if (!card) {
		alert('身份证号码不能为空');
		return false;
	}

	if (!(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/).test(card)) {
		alert("身份证号码填写有误");
		return false;
	}

	if (!$('#color-input-red').is(':checked')) {
		alert('请先阅读并同意鼎吉驾校学车协议');
		return false;
	}


	var payable = $("#payable").text(); //应付款
	var grade_id = $("#grade_id").val(); //班级id
	var area_id = $("#area_id").val(); //场地id

	var activity_id = $('input:radio[name="activity_id"]:checked').val(); //活动id
	var coupon = $("#coupon_id").attr("yhqid"); //优惠券
	var inviter = $("#inviter").attr("inviterid"); //邀请人 推荐码
	var pay_type = $('input:radio[name="other"]:checked').val(); //缴费类型

	var payment = "";
	if (pay_type == 1) {
		payment = $(".total-count").text(); //实付款
	} else if (pay_type == 2) {
		var deposit = $("#deposit").val();
		if (!deposit) {
			alert('请输入定金');
			return false;
		}
		if (deposit < 300) {
			alert('定金不能低于300');
			return false;
		}
		payment = deposit;
	} else {
		payment = 0;
	}
	let ajaxdata = {
		name: name,
		phone: phone,
		card: card,
		payable: payable,
		grade_id: grade_id,
		area_id: area_id,
		activity_id: activity_id,
		coupon: coupon,
		inviter: inviter,
		pay_type: pay_type,
		payment: payment
	};
	let data = ajaxPost(sign_submit_sign, ajaxdata);

	if (data.status == "200") {
		var check_val = $('input:radio[name="other"]:checked').val();
		if (check_val == 3) {
			alert("报名成功")
			return
		}
		var type = "";
		var dataUrl = "";
		wx.ready(function() {
			wx.chooseWXPay({
				appId: data.data.appId, //公众号名称，由商户传入
				timestamp: data.data.timestamp, //时间戳，自1970年以来的秒数
				nonceStr: data.data.nonceStr, //随机串
				package: data.data.package,
				signType: "MD5", //微信签名方式：
				paySign: data.data.paySign, //微信签名
				success: function(res) {
					window.location.href = "../enlist/success.html";
				},
				cancel: function(res) { // 支付取消回调函数
					window.location.href = "../enlist/fail.html";
				},
				fail: function(res) { // 支付失败回调函数
					window.location.href = "../enlist/fail.html";
				}
			});
		});
		localStorage.hurl = "";
	} else if (data.status == "2000") {
		alert(data.msg);
		location.href = "../enlist/sign_success.html";
	} else if (data.status == "500") {
		alert(data.msg);
		location.reload();
	} else {
		alert(data.msg);
		// location.href = "../enlist/sign_fail.html";
	}

}

function index() {
	get_banner();

}

function detail() {
	grade_detail();
}

function subsign() {
	let grade_detail = JSON.parse(sessionStorage.getItem("grade_detail"));
	$("#grade_id").attr("value", grade_detail.id)
	$(".gradename").text(grade_detail.name)
	$(".gradetype").text(grade_detail.type)
	$("#payable").text(grade_detail.price)
	$(".gradearea_name").text(grade_detail.area_name)
	$("#area_id").attr("value", grade_detail.area_id)
	$(".total-count").text(grade_detail.price)

	get_activity();
}

function test() {
	get_station();
	let ajaxdata = {};
	let data = ajaxPost(sign_get_sign, ajaxdata);
	if (data.status == "200") {
		$("#name").val(data.data.name);
		$("#phone").val(data.data.phone)
		$("#name").attr("disabled", true)
		$("#phone").attr("disabled", true)
	}

}

function geocoderfun(indexdata) {
	let src = "";
	for (var l = 0; l < indexdata.length; l++) {
		src += "<label><font><input type='radio' name='city' value=" + indexdata[l].id + "/>" + indexdata[l].name +
			"</font><font style='font-size:12px;'>" + Math.round(indexdata[l].Distance) + "km</font></label><br/>"
	}
	$("#area").html(src);
	let distance = [];
	for (var i = 0; i < indexdata.length; i++) {
		if (indexdata[i].Distance <= 5) {
			distance.push({
				id: i,
				distance: indexdata[i].Distance
			});
		}

	}
	if (distance.length != 0) {
		let distanceMin = Math.min.apply(null, distance); //最小值
		if (distance.length == 1) {
			let dataindex = distance[0].id;
			$("#city").val(indexdata[dataindex].id);
			get_list(indexdata[dataindex].id);
			$("#text").html(indexdata[dataindex].name);
			sessionStorage.setItem("garetext", JSON.stringify({
				"garetextid": indexdata[dataindex].id + "/",
				"garetextname": indexdata[dataindex].name
			}))
			let garetextid = JSON.parse(sessionStorage.getItem("garetext"))
			for (var c = 0; c < $('input:radio[name="city"]').length; c++) {
				if ($('input:radio[name="city"]').eq(c).val() == garetextid.garetextid) {
					$('input:radio[name="city"]').eq(c).attr("checked", true);
				}
			}
		} else {
			$(".dialog_open").show();
		}
	} else {

		$(".dialog_open").show();
	}
}

// 我的协议
function agreement() {

	let ajaxdata = {}
	let data = ajaxGet(user_agreement, ajaxdata)
	$(".yi-input").html(data.data.user.name);
	$(".cno-input").html(data.data.user.card);
	$(".content").html(data.data.content.content);
	$(".class").html(data.data.grade.name + "c" + data.data.grade.type);


}
// 申请体检
function transform_order() {
	var name = $("#name").val().trim();
	var phone = $("#phone").val().trim();
	var station_id = $("#station_id").val();

	if ("" == name || "" == phone || "" == station_id) {
		alert("请填写完整");
		return false;
	}

	if (!(/^[\u4e00-\u9fa5]{2,4}$/).test(name)) {
		alert("真实姓名填写有误");
		return false;
	}


	if (!(/^1[34578]\d{9}$/.test(phone))) {
		alert("手机号码有误，请重填");
		return false;
	}
	let ajaxdata = {
		name: $("#name").val(),
		phone: $("#phone").val(),
		station_id: $("#station_id").val(),
		money: "0.01"
	}
	let data = ajaxPost(sign_apply, ajaxdata)
	if (data.status == "200") {
		if (data.data == null || data.data == "null" || data.data == "") {
			$(".scok").show();
			$("#tj_code_form").hide();
		} else {
			wx.ready(function() {
				wx.chooseWXPay({
					appId: data.data.appId, //公众号名称，由商户传入
					timestamp: data.data.timestamp, //时间戳，自1970年以来的秒数
					nonceStr: data.data.nonceStr, //随机串
					package: data.data.package,
					signType: "MD5", //微信签名方式：
					paySign: data.data.paySign, //微信签名
					success: function(res) {
						//alert(res.msg);
						window.location.href = "../enlist/pay_success.html";
					},
					cancel: function(res) { // 支付取消回调函数
						window.location.href = "../enlist/pay_fail.html";
					},
					fail: function(res) { // 支付失败回调函数
						window.location.href = "../enlist/pay_fail.html";
					}
				});
			});
			localStorage.hurl = "";
		}

	} else if (data.status == "500") {
		alert(data.msg);
	} else {
		$(".gobaoming").show();
		$("#tj_code_form").hide();
		$(".gobaoming .text").html(data.msg)
		$(".gobaoming h1").html("提示")
		localStorage.hurl = window.location.href;
	}

}

function activity_detail() {

}
