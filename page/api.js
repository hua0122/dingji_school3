
// 内容详情
let index_detail="/api/index/detail";
// 内容详情
function detail() {
	let id=parseInt(window.location.href.split("id=")[1]);
	let ajaxdata = {
		id: id
	}
	let data = ajaxGet(index_detail, ajaxdata)
	$(".col-xs-12").html(data.data.content)
}
