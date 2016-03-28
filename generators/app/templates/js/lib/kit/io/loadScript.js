/**
该方法为zepto而存在，使用jquery请用$.getScript替代
@module lib/kit/io/loadScript
**/

var $ = require('../../../lib');

/**
加载script
@param {object} options script选项
@param {string} options.url script地址
@param {string} [options.type='text/javascript'] script类型
@param {string} [options.charset='utf-8'] script编码
@param {function} [options.onLoad] script加载完成的回调函数
**/
module.exports = function(options){
	var conf = $.extend({
		url : '',
		type : 'text/javascript',
		charset : 'utf-8',
		onLoad : $.noop
	}, options);

	var script = $(document.createElement('script'));
	script.on('load', function(){
		conf.onLoad();
		delete script.onload;
		$(script).off().remove();
	}).attr({
		src : conf.url,
		charset : conf.charset,
		type : conf.type
	}).appendTo( $('head') );
};


