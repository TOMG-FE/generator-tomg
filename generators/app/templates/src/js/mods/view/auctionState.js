/**
订单状态监视
**/
var $ = require('../../lib');
var $view = require('../../lib/mvc/view');
var $countDown = require('./countDown');

//订单状态class列表
var STATE = {
	before: 'today_start',
	ongoing: 'buying',
	over: 'time_over'
};

var TPL = {
	cdStart: '<em class="icon"></em><span> 距开始 <span class="time">{{hour}} : {{minute}} : {{second}}</span></span>',
	cdStop: '<em class="icon"></em><span> 距结束 <span class="time">{{hour}} : {{minute}} : {{second}}</span></span>'
};

var AuctionState = $view.extend({
	defaults: {
		node: null,
		state: STATE,
		maxUnit: 'hour',
		tplCDStart: TPL.cdStart,
		tplCDStop: TPL.cdStop,
		role: {
			'cd-box': '.TimeDetails'
		}
	},
	build: function() {
		var state = this.getState();
		switch (state) {
			case 'before':
				this.setStartCD();
				break;

			case 'ongoing':
				this.setStopCD();
				break;

			case 'over':
				this.setOver();
				break;
		}
	},
	getState: function() {
		var root = this.role('root');
		var state = '';

		$.each(this.conf.state, function(key, name) {
			if (root.hasClass(name)) {
				state = key;
				return false;
			}
		});

		return state;
	},
	setState: function(state) {
		var conf = this.conf;
		var root = this.role('root');
		var curState = this.getState();
		var curClassName = conf.state[curState] || '';
		var nextClassName = conf.state[state] || '';
		root.removeClass(curClassName)
			.addClass(nextClassName);
	},
	setStartCD: function() {
		var conf = this.conf;
		var root = this.role('root');
		var timeStart = root.attr('data-time-start');
		this.setState('before');
		if (!timeStart) {
			return;
		}
		var cd = new $countDown({
			target: timeStart,
			maxUnit: conf.maxUnit,
			node: this.role('cd-box'),
			timeTemplate: conf.tplCDStart
		});
		cd.on('stop', this.proxy('setStopCD'));
	},
	setStopCD: function() {
		var conf = this.conf;
		var root = this.role('root');
		var timeStop = root.attr('data-time-stop');
		this.setState('ongoing');
		if (!timeStop) {
			return;
		}
		var cd = new $countDown({
			target: timeStop,
			maxUnit: conf.maxUnit,
			node: this.role('cd-box'),
			timeTemplate: conf.tplCDStop
		});
		cd.on('stop', this.proxy('setOver'));
	},
	setOver: function() {
		this.role('cd-box').html('');
		this.setState('over');
	}
});

module.exports = AuctionState;
