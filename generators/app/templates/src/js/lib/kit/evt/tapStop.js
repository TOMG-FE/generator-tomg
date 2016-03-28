/**
用遮罩的方式阻止tap事件穿透引发表单元素获取焦点
**/

var $ = require('../../../lib');

var miniMask = $('<div></div>');
miniMask.css({
	'display' : 'none',
	'position' : 'absolute',
	'left' : 0,
	'top' : 0,
	'margin-left' : '-20px',
	'margin-top' : '-20px',
	'z-index' : 10000,
	'background-color' : 'rgba(0,0,0,0)',
	'width' : '40px',
	'height' : '40px'
}).appendTo(document.body);

var pos = {};
var timer = null;
$(document).on('touchstart', function(evt){
	if(!(evt && evt.touches && evt.touches.length)){
		return;
	}

	var touch = evt.touches[0];
	pos.pageX = touch.pageX;
	pos.pageY = touch.pageY;
});

var tapStop = function(delay){
	delay = parseInt(delay, 10) || 0;
	miniMask.show().css({
		'left' : pos.pageX + 'px',
		'top' : pos.pageY + 'px'
	});
	clearTimeout(timer);
	timer = setTimeout(function(){
		miniMask.hide();
	}, delay || 500);
};

module.exports = tapStop;

