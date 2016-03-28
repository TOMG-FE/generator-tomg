/**
屏幕遮罩
**/

var $ = require('../../lib');
var $mask = require('./mask');
var $stockMonitor = require('../../lib/kit/util/stockMonitor');

var ScreenMask = $mask.extend({
	defaults : {
		template : '<div class="ui-screen-mask"></div>',
		target : 'screen',
		bgColor : 'rgba(0,0,0,0.3)',
		styles : {
			'z-index' : 9999,
			'position' : 'fixed',
			'width' : '100%',
			'height' : '100%',
			'background-color' : 'rgba(0,0,0,0)',
			'display' : 'none'
		}
	},
	build : function(){
		this.supr();
		this.buildMonitor();
	},
	buildMonitor : function(){
		var self = this;
		var monitor = new $stockMonitor();
		monitor.on = function(){
			self.show();
		};
		monitor.off = function(){
			self.hide();
		};
		this.monitor = monitor;
	},
	watch : function(obj){
		this.monitor.watch(obj);
	},
	ignore : function(obj){
		this.monitor.ignore(obj);
	}
});

var masks = {};
module.exports = function(spec){
	var conf = $.extend({
		zIndex : 9999
	}, spec);

	var zIndex = conf.zIndex;
	delete conf.zIndex;
	conf.styles = conf.styles || {};
	conf.styles['z-index'] = zIndex;

	var mask = masks[zIndex];
	if(!mask){
		mask = new ScreenMask(conf);
		masks[zIndex] = mask;
	}else{
		mask.setOptions(conf);
	}

	return mask;
};



