/**
confirm对话框
**/

var $ = require('../../lib');
var $reuse = require('../ui/reuseDialog');
var $tplConfirm = require('../tpl/confirm.tpl');

var cache = $reuse({
	template : $tplConfirm,
	target : 'screen',
	parent : null,
	mask : true,
	styles : {
		'z-index' : 10000,
		'position' : 'absolute',
		'display' : 'none'
	}
});

module.exports = function(content, options){
	if(!options && $.isPlainObject(content)){
		options = content;
	}else{
		options = options || {};
		options.content = content;
	}

	var conf = $.extend({
		title : '',
		styleOk : '确定',
		styleCancel : '取消',
		ok : $.noop,
		cancel : $.noop
	}, options);

	var dialog = cache.get();
	dialog.role('title').html(conf.title);
	dialog.role('content').html(conf.content);
	dialog.role('ok').html(conf.styleOk);
	dialog.role('cancel').html(conf.styleCancel);

	dialog.on('ok', conf.ok);
	dialog.on('cancel', conf.cancel);

	//重用对话框时，清除了对话框自动绑定的 ok, cancel 事件
	//所以这里需要重新绑定一次
	dialog.on('ok', function(){
		dialog.hide();
	});

	dialog.on('cancel', function(){
		dialog.hide();
	});

	dialog.show();
};

