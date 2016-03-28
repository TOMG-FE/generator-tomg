/**
屏幕滚动区域固定
**/

var $ = require('../../../lib');
var $stockMonitor = require('./stockMonitor');

var $body = $(document.body);

var scrollFix = new $stockMonitor();

var prevWidth = 0;

scrollFix.on = function(){
	//禁止屏幕滚动
	prevWidth = $body.width();
	$body.css('width', prevWidth + 'px');
	$body.css('overflow', 'hidden');
};

scrollFix.off = function(){
	prevWidth = 0;
	$body.css('overflow', '');
	$body.css('width', '');
};

module.exports = scrollFix;

