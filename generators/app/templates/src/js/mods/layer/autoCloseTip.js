/**
自动关闭的提示信息浮层

@param {string} content 信息内容，为字符串或者HTML
@param {object} options 选项
@param {string} [options.title='提示'] 标题栏显示文字
@param {string} [options.icon='right'] 浮层提示图标
@param {number} [options.autoClose=1000] 自动关闭时间，单位为ms
@param {function} [options.cancel=$.noop] 浮层隐藏的回调函数

@example

var $autoCloseTip = require('mods/layer/autoCloseTip');

$autoCloseTip('<p class="tips f18">恭喜您，出价成功</p>', {
	icon : 'right',
	cancel : function(){
		console.info('提示信息浮层隐藏了');
	}
});

$autoCloseTip([
	'<p class="tips f18">很抱歉，出价失败</p>',
	'<p class="reason f14">出价不能低于当前价（￥32200）</p>'
].join(''), {
	icon : 'error',
	cancel : function(){
		console.info('提示信息浮层隐藏了');
	}
});

**/

var $ = require('../../lib');
var $reuse = require('../../comp/ui/reuseDialog');
var $tplAutoCloseTip = require('../tpl/autoCloseTip.tpl');
var $countDown = require('../../lib/kit/time/countDown');

var cache = $reuse({
	template : $tplAutoCloseTip,
	target : 'screen',
	parent : null,
	mask : true,
	styles : {
		'z-index' : 10000,
		'position' : 'absolute',
		'display' : 'none'
	}
});

var ICONS = {
	'error' : 'error',
	'right' : 'right'
};

module.exports = function(content, options){
	if(!options && $.isPlainObject(content)){
		options = content;
	}else{
		options = options || {};
		options.content = content;
	}

	var conf = $.extend({
		title : '提示',
		icon : 'right',
		autoClose : 2000,
		cancel : $.noop
	}, options);

	var dialog = cache.get();
	dialog.role('title').html(conf.title);
	dialog.role('content').html(conf.content);

	var delay = parseInt(conf.autoClose / 1000, 10) || 0;
	dialog.role('delay').html(delay);

	var cd = null;

	if(conf.autoClose){
		cd = $countDown({
			target : Date.now() + conf.autoClose,
			onChange : function(delta){
				var second = Math.round(delta / 1000);
				dialog.role('delay').html(second);
			},
			onStop : function(){
				dialog.hide();
			}
		});
	}

	var icon = ICONS[conf.icon] || 'right';
	dialog.role('box').attr('class', 'bd ' + icon);

	dialog.on('hide', function(){
		if(cd && cd.stop){
			cd.stop();
		}
	});

	dialog.on('cancel', conf.cancel);

	//重用对话框时，清除了对话框自动绑定的自定义事件
	//所以这里需要重新绑定一次
	dialog.on('cancel', function(){
		dialog.hide();
	});

	dialog.show();
};
