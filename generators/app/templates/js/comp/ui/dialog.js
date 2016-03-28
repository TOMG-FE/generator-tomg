/**
对话框
**/

var $ = require('../../lib');
var $position = require('../../lib/more/position');
var $scrollFix = require('../../lib/kit/util/scrollFix');
var $overlay = require('./overlay');
var $screenMask = require('./screenMask');

var getScreenMask = function(){
	var conf = this.conf;
	if(conf.mask === true){
		return $screenMask();
	}else if($.type(conf.mask === 'number')){
		return $screenMask({
			zIndex : conf.mask
		});
	}else if($.isPlainObject(conf.mask)){
		return $screenMask(conf.mask);
	}else if(
		conf.mask &&
		$.type(conf.mask.watch) === 'function' &&
		$.type(conf.mask.ignore) === 'function'
	){
		return conf.mask;
	}
};

var Dialog = $overlay.extend({
	defaults : {
		template : '<div class="ui-dialog"></div>',
		target : 'screen',
		parent : null,
		mask : true,
		styles : {
			'z-index' : 10000,
			'position' : 'absolute',
			'display' : 'none'
		}
	},
	events : {
		'[data-action] click' : 'preventDefault action'
	},
	setEvents : function(action){
		this.supr(action);
		var proxy = this.proxy();
		this[action]('ok', proxy('hide'));
		this[action]('cancel', proxy('hide'));
		this[action]('close', proxy('hide'));
		this[action]('show', proxy('beObserve'));
		this[action]('hide', proxy('beUnobserve'));
		this[action]('show', proxy('putToTop'));
	},
	getTarget : function(){
		var conf = this.conf;
		if(conf.target === 'screen'){
			return $(window);
		}else{
			return $(conf.target);
		}
	},
	//默认对话框显示在容器正中间
	setPosition : function(){
		var conf = this.conf;
		var target = this.getTarget();
		$position.pin({
			element : this.role('root'),
			x : '50%',
			y : '50%'
		}, {
			element : conf.target === 'screen' ? $position.VIEWPORT : target,
			x : '50%',
			y : '50%'
		});
	},
	//如果浮层内元素上有属性: data-action
	//其值会作为事件名称，在该元素被点击时触发
	action : function(evt){
		var node = $(evt.currentTarget);
		var action = node.attr('data-action');
		this.trigger(action, node);
	},
	//触发各种全局监控状态
	beObserve : function(){
		$scrollFix.watch(this);
		if(this.conf.mask){
			var mask = getScreenMask.call(this);
			mask.watch(this);
		}
	},
	beUnobserve : function(){
		$scrollFix.ignore(this);
		var mask = getScreenMask.call(this);
		mask.ignore(this);
	},
	//新打开的对话框需要显示在最上面
	putToTop : function(){
		var root = this.role('root');
		root.appendTo(root.parent());
	}
});

module.exports = Dialog;




