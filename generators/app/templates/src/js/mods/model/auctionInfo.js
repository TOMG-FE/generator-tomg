var $ = require('../../lib');
var $model = require('../../lib/mvc/model');
var $transApp = require('../trans/app');
var $numerical = require('../../lib/kit/num/numerical');

var STATUS = {
	before : 0,
	ongoing : 1,
	over : 2
};

//下面这些属性在设置时会自动转换为数字
var numProps = {
	//最低加价
	minIncPrice : 0,
	//最高加价
	maxIncPrice : 0,
	//封顶价格
	ceilPrice : 0,
	//当前价格
	curPrice : 0,
	//活动状态
	actStatus : 0
};

var processors = {};
$.each(numProps, function(key){
	processors[key] = {
		set : $numerical
	};
});

var AuctionInfo = $model.extend({
	defaults : $.extend({
		actId : '',
		info : null
	}, numProps),
	processors : $.extend({}, processors),
	events : {
		'change:actStatus' : 'checkStatus',
		'change:info' : 'checkUpdate'
	},
	build : function(){
		this.checkStatus();
	},
	checkStatus : function(){
		var actStatus = this.get('actStatus');
		//仅在竞拍中
		if(actStatus === STATUS.ongoing){
			this.startPolling();
		}else{
			this.stopPolling();
		}
	},
	startPolling : function(){
		var actId = this.get('actId');
		if(actId){
			this.requestInfo();
			this.timer = setInterval(this.proxy('requestInfo'), 5000);
		}
	},
	stopPolling : function(){
		clearInterval(this.timer);
	},
	checkUpdate : function(){
		var info = this.get('info');
		if(!info){return;}
		this.set('curPrice', info.cur_price);
		this.set('ceilPrice', info.ceil_price);
	},
	requestInfo : function(){
		var self = this;
		var curPrice = this.get('curPrice');
		var curStatus = this.get('actStatus');
		$transApp.request('actInfo', {
			data : {
				act_id : self.get('actId'),
				size : 20
			},
			onSuccess : function(rs){
				if(rs.ret !== 0){return;}
				if((curPrice !== rs.data.cur_price) || (curStatus !== rs.data.act_status)) {
					self.updateInfo(rs.data);
				}
			}
		});
	},
	//供其他组件调用
	updateInfo : function(info){
		this.set('info', info);
	}
});

var models = {};
module.exports = function(actId){
	var obj = models[actId];
	if(!obj){
		obj = new AuctionInfo({
			actId : actId
		});
		models[actId] = obj;
	}
	return obj;
};
