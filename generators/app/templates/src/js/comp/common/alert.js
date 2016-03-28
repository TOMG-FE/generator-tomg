/**
alert对话框
**/

var $ = require('../../lib');
var $reuse = require('../ui/reuseDialog');
var $tplAlert = require('../tpl/alert.tpl');

var cache = $reuse({
	template : $tplAlert,
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
		title : '提 示',
		styleOk : '确 定',
		ok : $.noop,
		cancel : null
	}, options);

	var dialog = cache.get();
	dialog.role('title').html(conf.title);
	dialog.role('content').html(conf.content);
	dialog.role('ok').html(conf.styleOk);

	dialog.on('ok', conf.ok);
	if($.type(conf.cancel) === 'function'){
		dialog.on('cancel', conf.cancel);
	}else{
		dialog.on('cancel', conf.ok);
	}

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

