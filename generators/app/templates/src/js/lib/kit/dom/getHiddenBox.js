/**
页面统一隐藏容器工具
@module lib/kit/dom/hiddenContainer
@example
var $hiddenContainer = require('lib/kit/dom/hiddenContainer');
$hiddenContainer.append('<div></div>');
**/

var $ = require('../../../lib');

var hiddenNode;

var getHiddenNode = function(){
	if(!hiddenNode){
		hiddenNode = $('<div></div>').css({
			'display' : 'none',
			'position' : 'absolute',
			'top' : '-9999px',
			'left' : '-9999px'
		}).appendTo($('body'));
	}
	return hiddenNode;
};

module.exports = {
	/**
	插入需要隐藏的 dom 元素
	@param {element} node 要存放在隐藏容器中的 dom 元素
	**/
	append : function(node){
		getHiddenNode().append($(node));
	},
	/**
	清除容器内所有元素
	**/
	clear : function(){
		getHiddenNode().html('');
	},
	/**
	获取容器本身 dom 元素
	@return {element} 容器 dom 元素
	**/
	get : function(){
		return getHiddenNode();
	}
};


