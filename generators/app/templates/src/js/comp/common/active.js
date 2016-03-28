/**
为所有 .link 元素添加 active 事件 class : active
**/

var $ = require('../../lib');

var $doc = $(document);

$doc.delegate('.link', 'touchstart', function(evt){
	var link = $(evt.currentTarget);
	link.addClass('active');
});

$doc.delegate('.link', 'touchend', function(evt){
	var link = $(evt.currentTarget);
	link.removeClass('active');
});

$doc.delegate('.link', 'touchmove', function(evt){
	var link = $(evt.currentTarget);
	link.removeClass('active');
});

