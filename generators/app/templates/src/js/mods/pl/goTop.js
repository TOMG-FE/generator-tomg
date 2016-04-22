/**
公共 - 点击返回页面顶端
**/

var $ = require('../../lib');
var $smoothScrollTo = require('../../lib/kit/fx/smoothScrollTo');
var $tplGoTop = require('../tpl/goTop.tpl');

var root = $($tplGoTop);

var check = function(){
	var scrollHeight = window.scrollY;
	if(scrollHeight > 300){
		root.show();
	}else{
		root.hide();
	}
};

root.on('click', function(){
	$smoothScrollTo(document.body);
});

root.appendTo(document.body);
$(window).on('scroll', check);



