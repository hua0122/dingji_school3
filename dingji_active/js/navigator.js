/* 获取当前环境： 
    系统环境： iOS Android PC
    浏览器环境 微信内置浏览器、QQ内置浏览器、正常浏览器
    是否app内打开
*/

// var ua = navigator.userAgent.toLowerCase(); //获取浏览器标识并转换为小写
// console.log(ua)
// 
// var curConfig = {
// 	isiOS: !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //是否苹果
// 	isAndroid: ua.indexOf('android') > -1 || ua.indexOf('adr') > -1, //是否安卓
// 	isPC: isPC(), //是否PC
// isWeiXin: ua.match(/MicroMessenger/i) == "micromessenger", //是否微信
// 	isQQ: ua.indexOf(' qq/') > -1, //是否QQ
// 	isApp: ua.indexOf('isApp') > -1, //是否某个应用
// };
// setTimeout(function() {
// 	$('#span_ua').html(ua); //打印
// 	$('#span_config').html(JSON.stringify(curConfig));
// }, 100);
// 
// 
// function isPC() {
// 	var Agents = new Array("android", "iphone", "symbianOS", "windows phone", "ipad", "ipod");
// 	var flag = true;
// 	for (var v = 0; v < Agents.length; v++) {
// 		if (ua.indexOf(Agents[v]) > 0) {
// 			flag = false;
// 			break;
// 		}
// 	}
// 	return flag;
// }
// $rootScope.browser = {
// 	versions: function() {
// 		var u = navigator.userAgent,
// 			app = navigator.appVersion;
// 		return {
// 			u: u,
// 			trident: u.indexOf('Trident') > -1, //IE内核
// 			presto: u.indexOf('Presto') > -1, //opera内核
// 			webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
// 			gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
// 			mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
// 			ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
// 			android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1, //android终端
// 			iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
// 			iPad: u.indexOf('iPad') > -1, //是否iPad
// 			webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
// 			weixin: u.indexOf('MicroMessenger') > -1, //是否微信 
// 			qq: u.match(/\sQQ/i) == " qq" //是否QQ
// 		};
// 	}(),
// 	language: (navigator.browserLanguage || navigator.language).toLowerCase()
// };
// $rootScope.ostypeReal = $rootScope.browser.versions.ios || $rootScope.browser.versions.iPad ? 'ios' : 'android';
// $rootScope.ostype = 'android';
// 
// function isPC() {
// 	var Agents = new Array("android", "iphone", "symbianOS", "windows phone", "ipad", "ipod");
// 	var flag = true;
// 	for (var v = 0; v < Agents.length; v++) {
// 		if (ua.indexOf(Agents[v]) > 0) {
// 			flag = false;
// 			break;
// 		}
// 	}
// 	return flag;
// }
// 
// var ua = navigator.userAgent.toLowerCase();
// 
// function bower() {
// 	return {
// 		isiOS: !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
// 		isAndroid: ua.indexOf('android') > -1 || ua.indexOf('adr') > -1,
// 		isPC: isPC(),
// 		isWeiXin: ua.match(/MicroMessenger/i) == "micromessenger",
// 		isQQ: ua.indexOf(' qq/') > -1,
// 		isVrseen: ua.indexOf('vrseen') > -1,
// 	}
// }
// console.log(JSON.stringify(bower()))
// console.log(JSON.stringify(bower().isQQ))
// 
// /*2017-10-26*/
// function isPC() {
// 	var Agents = new Array("android", "iphone", "symbianOS", "windows phone", "ipad", "ipod");
// 	var flag = true;
// 	for (var v = 0; v < Agents.length; v++) {
// 		if (ua.indexOf(Agents[v]) > 0) {
// 			flag = false;
// 			break;
// 		}
// 	}
// 	return flag;
// }
// var ua = navigator.userAgent.toLowerCase();
// 
// function bower() {
// 	return {
// 		isiOS: !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
// 		isAndroid: ua.indexOf('android') > -1 || ua.indexOf('adr') > -1,
// 		isPC: isPC(),
// 		isWeiXin: ua.match(/MicroMessenger/i) == "micromessenger",
// 		isQQ: ua.indexOf(' qq/') > -1,
// 		isVrseen: ua.indexOf('vrseen') > -1
// 	}
// }
// 
// function myclick(aid) {
// 	//安卓手机
// 	if (bower().isAndroid) {
// 		// 首先判断是否是 webview  如果包含  VRSeen  说明是我们自己的webview浏览器打开的
// 		if (bower().isVrseen) {
// 			// 内链，走安卓方法，回到详情页
// 			window.android.getAppDetail(aid);
// 		} else if (bower().isWeiXin) {
// 			//微信打开
// 			alert('这是微信中,请通过浏览器打开!');
// 		} else if (bower().isQQ) {
// 			//QQ打开
// 			var url = 'vrseenstore://vrseenstore.com/open?aId=' + aid;
// 			window.location.href = url;
// 		} else {
// 			// 外链，走 scheme 方法   vrseenstore://vrseenstore.com/open?aId=689
// 			var url = 'vrseenstore://vrseenstore.com/open?aId=' + aid;
// 			window.location.href = url;
// 		}
// 	} else if (bower().isiOS) {
// 		//IOS手机
// 		if (bower().isWeiXin) {
// 			//微信打开
// 			alert('这是微信,请通过浏览器打开');
// 		} else if (bower().isQQ) {
// 			alert('这是QQ,请通过浏览器打开');
// 		}
// 
// 	} else {
// 		alert('请在安卓手机上玩！')
// 	}
// }
//