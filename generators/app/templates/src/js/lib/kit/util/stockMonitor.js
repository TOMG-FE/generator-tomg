/**
存量监视器

提供固定的 watch unwtach 方法
检查存量数组是否存在指定数量的对象，并触发开关接口函数 on, off
**/

var $ = require('../../../lib');
var $include = require('../arr/include');
var $erase = require('../arr/erase');

var StockMonitor = function(spec){
	this.conf = $.extend({
		length : 0
	}, spec);
	this.observed = [];
};

StockMonitor.prototype = {
	watch : function(obj){
		$include(this.observed, obj);
		this.check();
	},
	ignore : function(obj){
		$erase(this.observed, obj);
		this.check();
	},
	check : function(){
		if(this.observed.length > this.conf.length){
			this.on();
		}else{
			this.off();
		}
	},
	on : $.noop,
	off : $.noop
};

module.exports = StockMonitor;
