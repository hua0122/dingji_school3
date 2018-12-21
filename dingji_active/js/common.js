var response = function() {
 	var w = document.documentElement.clientWidth;
 	document.documentElement.style.fontSize = w / 3.8 + 'px'
 };

 window.onresize = function() {
 	response();
 	clearTimeout(this.responseTimer);
 	this.responseTimer = setTimeout(response, 300);
 };
 response();
if (window.location.href.charAt(window.location.href.length - 1) == "=") {
	let locationHref = window.location.href.substring(0, window.location.href.length - 1);
	window.location.href = locationHref;
}