/**
开关按钮组
**/

var $ = require('../../lib');
var $view = require('../../lib/mvc/view');

var SwitchGroup = $view.extend({
	defaults : {
		closeAble : false,
		activeClass : 'on',
		node : null,
		role : {
			'button' : '[role="button"]'
		}
	},
	events : {
		'[role="button"] click' : 'onBtnClick'
	},
	build : function(){
		var self = this;
		self.role('button').each(function(){
			var button = $(this);
			var active = self.getStatus(button);
			if(active){
				self.active = button;
				return false;
			}
		});
	},
	getStatus : function(button){
		return !!button.hasClass(this.conf.activeClass);
	},
	setStatus : function(button, active){
		var activeClass = this.conf.activeClass;
		if(active){
			button.addClass(activeClass);
		}else{
			button.removeClass(activeClass);
		}
	},
	getActive : function(){
		return this.active;
	},
	checkActive : function(){
		if(this.active){
			this.setStatus(this.active, false);
			this.active = null;
		}
	},
	setActive : function(button, active){
		active = !!active;
		var curActive = this.getStatus(button);
		if(active !== curActive){
			this.checkActive();
			this.setStatus(button, active);
			if(active){
				this.active = button;
			}
			this.trigger('change');
		}
	},
	open : function(button){
		this.setActive(button, true);
	},
	close : function(button){
		this.setActive(button, false);
	},
	toggle : function(button){
		var active = this.getStatus(button);
		if(this.conf.closeAble){
			this.setActive(button, !active);
		}else{
			this.setActive(button, true);
		}
	},
	onBtnClick : function(evt){
		evt.preventDefault();
		var button = $(evt.currentTarget);
		this.toggle(button);
	}
});

module.exports = SwitchGroup;
