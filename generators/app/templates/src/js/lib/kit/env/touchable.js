/**
判断是否支持触摸屏
@module lib/kit/env/touchable
@type {boolean}
@example
var $touchable = require('lib/kit/env/touchable');
if($touchable){
	//It is a touch device.
}
**/

var touchable = ('ontouchstart' in window) || window.DocumentTouch && document instanceof window.DocumentTouch;

module.exports = touchable;


