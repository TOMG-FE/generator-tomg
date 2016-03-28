/*
底部弹出层
*/

var $ = require('../../lib');
var $dialog = require('./dialog');
var $position = require('../../lib/more/position');
var $scrollFix = require('../../lib/kit/util/scrollFix');

var $win = $(window);

$([
	'<style id="ui-bottom-popup">',
		'.ui-bottom-popup{',
			'position:absolute;',
			'z-index:10000;',
			'bottom:0;',
			'left:0;',
			'overflow:hidden;',
			'width:100%;',
			'height:100%;',
		'}',
		'.ui-bottom-popup .role-mask{',
			'position : absolute;',
			'z-index : 1;',
			'top : 0;',
			'left : 0;',
			'width : 100%;',
			'height : 100%;',
			'overflow : hidden;',
			'transition : background-color 0.3s linear;',
			'background-color : rgba(0,0,0,0.4);',
		'}',
		'.ui-bottom-popup .role-box{',
			'position : absolute;',
			'left: 0;',
			'bottom : 0;',
			'z-index : 2;',
			'width : 100%;',
			'overflow : hidden;',
		'}',
	'</style>'
].join('')).appendTo(document.head);

var TPL = {};
TPL.root = [
	'<div class="ui-bottom-popup">',
		'<div class="role-mask" role="mask"></div>',
		'<div class="role-box" role="box"></div>',
	'</div>'
].join('');

var BottomPopup = $dialog.extend({
	defaults : {
		template : TPL.root,
		target : 'screen',
		parent : null,
		mask : true,
		styles : {
			'z-index' : 10000,
			'display' : 'none'
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
		var root = self.role('root');
		var box = self.role('box');
		var model = self.model;
		if(model.get('visible')){
			if(root.css('display') === 'none'){
				root.show();
				box.css('transform', 'translateY(100%)');
			}
			self.trigger('show');
			setTimeout(function(){
				if(model.get('visible')){
					box.transit({
						'translateY' : 0
					}, 300, 'ease-out');
				}
			});
		}else{
			box.transit({
				'translateY' : '100%'
			}, 300, 'ease-in', function(){
				if(!model.get('visible')){
					root.hide();
				}
			});
			self.trigger('hide');
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

module.exports = BottomPopup;
