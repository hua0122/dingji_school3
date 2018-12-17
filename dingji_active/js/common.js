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
