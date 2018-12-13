// 域名地址
let domainName = "http://admin.yidianxueche.cn";
// 学校id
let school_id = 6;
// 获取保存的经纬度
let latlng = JSON.parse(sessionStorage.getItem("latlng"));

// 微信配置pai
let s_user_getwxpz = "s_user/tp.php?method=getwxpz";
// 个人信息详情
let user_index = "/api/user/index";
// ajax-get调用
function ajaxGet(_url, _data) {
	let openid = sessionStorage.getItem("openid");
	_data["openid"] = openid,
	_data["school_id"] = school_id;
	var dataAjax = "";
	$.ajax({
		type: "get",
		url: domainName + _url,
		dataType: "json",
		data: _data,
		success: function(data) {
			dataAjax = data;
		},
		error: function(res) {
			dataAjax = "请求出错";
		},
		async: false
	});
	return dataAjax;
}
// ajax-post调用
function ajaxPost(_url, _data) {

	let openid = sessionStorage.getItem("openid");
	_data["openid"] = openid;
	_data["school_id"] = school_id;
	var dataAjax = "";
	$.ajax({
		type: "post",
		url: domainName + _url,
		dataType: "json",
		data: _data,
		success: function(data) {
			dataAjax = data;
		},
		error: function() {
			dataAjax = "请求出错";
		},
		async: false
	});
	return dataAjax;
}

function ajaxWX() {
	let ajaxdata = {};
	let data = ajaxGet(s_user_getwxpz, ajaxdata);

}

//转换百度坐标
var getBaiduLocation = function(address,longitude, latitude,lng1,lat1) {
	console.log(longitude+", "+latitude+","+lng1+","+lat1)
	$.ajax({
		type: "GET",
		url: 'http://api.map.baidu.com/geoconv/v1/?coords=' + longitude + ',' + latitude +
			'&from=1&to=5&output=json&ak=nHbhscSu1l3CjSLBNRUleeW1lppoVpaL',
		dataType: 'jsonp',
		success: function(msg) {
			try {
				var result = msg.result;
				var lat = result[0].y;
				var lng = result[0].x;
				//alert("99.999999,29.537472");

				//location.href="http://api.map.baidu.com/direction?origin="+lat+","+lng+"&destination=29.614186,106.335563&mode=driving&region=重庆&output=html";
				var href = "http://api.map.baidu.com/direction?origin=" + lat + "," + lng +
					"&destination="+lat1+","+lng1+"&mode=driving&region=重庆&output=html";

				$(address).attr('href', href);
			} catch (e) {
				$.fn.alert(e.message);
			}
		}
	});
};

// 获取个人信息
function wxinfoindex() {
	let ajaxdata = {};
	let data = ajaxPost(user_index, ajaxdata);
	sessionStorage.setItem("wxinfoindex",JSON.stringify(data))
	$("#my_model").attr("src", data.data.headimgurl)
	$("#nickname").text(data.data.nickname)
}
wxinfoindex();