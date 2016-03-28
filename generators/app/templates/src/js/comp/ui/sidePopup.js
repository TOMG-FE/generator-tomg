/**
侧边弹出层
**/

var $ = require('../../lib');
var $dialog = require('./dialog');
var $position = require('../../lib/more/position');
var $scrollFix = require('../../lib/kit/util/scrollFix');

var $win = $(window);

$([
	'<style id="ui-side-popup">',
		'.ui-side-popup{',
			'z-index : 10000;',
			'overflow : hidden;',
			'top : 0;',
			'left : 0;',
			'width : 100%;',
			'height : 100%;',
			'position : absolute;',
		'}',
		'.ui-side-popup .role-mask{',
			'position : absolute;',
			'z-index : 1;',
			'top : 0;',
			'left : 0;',
			'width : 100%;',
			'height : 100%;',
			'overflow : hidden;',
			'background-color : rgba(0,0,0,0.4);',
		'}',
		'.ui-side-popup .role-box{',
			'position : absolute;',
			'z-index : 2;',
			'width : 100%;',
			'height : 100%;',
			'overflow : hidden;',
		'}',
	'</style>'
].join('')).appendTo(document.head);

var TPL = {};
TPL.root = [
	'<div class="ui-side-popup">',
		'<div class="role-mask" role="mask"></div>',
		'<div class="role-box" role="box"></div>',
	'</div>'
].join('');

var SidePopup = $dialog.extend({
	defaults : {
		template : TPL.root,
		side : 'right',
		target : 'screen',
		parent : null,
		mask : true,
		styles : {
			'display' : 'none',
			'z-index' : 10000
		}
	},
	setEvents : function(action){
		var root = this.role('root');
		var proxy = this.proxy();
		this.supr(action);
		this.on('show', proxy('fixSize'));
		$win.on('resize', proxy('fixSize'));
		root.on('touchmove', proxy('preventDefault'));
	},
	fixSize : function(){
		var height = $win.height();
		var width = $win.width();
		this.role('root').css({
			'width' : width + 'px',
			'height' : height + 'px'
		});
	},
	setPosition : function(){
		var conf = this.conf;
		var target = this.getTarget();
		$position.pin({
			element : this.role('root'),
			x : '0%',
			y : '0%'
		}, {
			element : conf.target === 'screen' ? $position.VIEWPORT : target,
			x : '0%',
			y : '0%'
		});
	},
	checkVisible : function(){
		var self = this;
		var conf = this.conf;
		var root = this.role('root');
		var box = this.role('box');
		var model = self.model;
		var pos = conf.side === 'left' ? '-100%' : '100%';
		if(model.get('visible')){
			if(root.css('display') === 'none'){
				root.show();
				box.css('transform', 'translateX(' + pos + ')');
			}
			this.trigger('show');
			setTimeout(function(){
				if(model.get('visible')){
					box.transit({
						'translateX' : 0
					}, 300, 'ease-out');
				}
			});
		}else{
			box.transit({
				'translateX' : pos
			}, 300, 'ease-in', function(){
				if(!model.get('visible')){
					root.hide();
				}
			});
			this.trigger('hide');
		}
	},
	//触发各种全局监控状态
	beObserve : function(){
		$scrollFix.watch(this);
	},
	beUnobserve : function(){
		$scrollFix.ignore(this);
	}
});

module.exports = SidePopup;
