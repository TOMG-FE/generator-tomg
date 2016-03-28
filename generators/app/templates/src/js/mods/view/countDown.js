/**
倒计时统一UI

@example
var $countDown = require('mods/view/countDown');
var node = $('<div data-cd-target="2015/12/30 18:25"></div>').prependTo(document.body);

var cd = new $countDown({
	baseTime : '2016/12/01 12:00:00',
	target : '2016/12/01 12:00:10',
	node : node
});

cd.reset({
	baseTime : '2016/12/01 11:00:00',
	target : '2016/12/01 12:00:10'
});
**/

var $ = require('../../lib');
var $view = require('../../lib/mvc/view');
var $countDown = require('../../lib/kit/time/countDown');
var $timeSplit = require('../../lib/kit/time/split.js');
var $substitute = require('../../lib/kit/str/substitute');
var $fixTo = require('../../lib/kit/num/fixTo');

var CountDown = $view.extend({
	defaults : {
		node : null,
		baseTime : $CONFIG.timeStamp,
		target : null,
		maxUnit : 'day',
		timeTemplate : '{{day}}天{{hour}}时{{minute}}分{{second}}秒'
	},
	build : function(){
		this.setCD();
	},
	formatTime : function(time){
		if($.type(time) === 'string'){
			time = time.replace(/-/g, '/');
		}
		return time;
	},
	setCD : function(){
		var self = this;
		var conf = self.conf;
		var root = self.role('root');
		var target = conf.target || root.attr('data-cd-target');
		var proxy = self.proxy();
		var baseTime = this.formatTime(conf.baseTime);
		target = this.formatTime(target);
		self.cd = $countDown({
			target : target,
			base : baseTime,
			onChange : proxy('update'),
			onStop : proxy('onStop')
		});
	},
	update : function(delta){
		var conf = this.conf;
		delta = Math.round(delta / 1000) * 1000;
		delta = Math.max(0, delta);
		
		var time = $timeSplit(delta, {
			maxUnit : conf.maxUnit
		});
		$.each(time, function(key, val){
			val = $fixTo(val, 2);
			time[key] = val;
		});

		var html = $substitute(conf.timeTemplate, time);
		this.role('root').html(html);
	},
	stop : function(){
		this.cd.stop();
	},
	reset : function(options){
		this.reseting = true;
		this.stop();
		this.reseting = false;
		$.extend(this.conf, options);
		this.setCD();
	},
	onStop : function(delta){
		this.update(delta);
		if(!this.reseting){
			this.trigger('stop');
		}
	}
});

module.exports = CountDown;
