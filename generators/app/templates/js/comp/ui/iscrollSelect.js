/**
iscroll 增强的 select UI
**/

var $ = require('../../lib');
var $model = require('../../lib/mvc/model');
var $view = require('../../lib/mvc/view');
var $iscroll = require('../../vendor/iscroll/iscroll');
var $substitute = require('../../lib/kit/str/substitute');
var $delay = require('../../lib/kit/func/delay');
var $limit = require('../../lib/kit/num/limit');

var IscrollSelect = $view.extend({
	defaults : {
		node : null,

		//标记 select 上下留空需要留几个选项，留空是为了让选中项停留在正中间
		//select的高度必须是 option 的整数倍
		//这样 iscroll 设置 snap 时才能准确的滚动到单位高度 
		//marginOptions = ((select 的高度 / 单个 option 的高度) - 1) / 2
		marginOptions : 2,

		//单个选项的模板 
		tplOption : '<li data-value="{{value}}">{{text}}</li>'
	},
	build : function(){
		this.value = '';
		this.buildIscroll();
	},
	setEvents : function(action){
		var proxy = this.proxy();
		this.iscroll[action]('scrollEnd', proxy('updateValue'));
	},
	buildIscroll : function(){
		var handleBox = this.role('handle-box').get(0);
		var viewBox = this.role('view-box').get(0);
		var valBox = this.role('val-box').get(0);

		var scroll = new $iscroll(handleBox, {
			scrollX : false,
			scrollY : true,
			indicators : [{
				el: viewBox,
				resize: false,
				ignoreBoundaries: true
			},{
				el: valBox,
				resize: false,
				ignoreBoundaries: true
			}]
		});

		var itemHeight = this.role('handle-box').find('li').eq(0).height();
		var originScrollTo = scroll.scrollTo;
		scroll.scrollTo = $delay(function(x, y, time, easing){
			var targetY = y;
			if(y > scroll.maxScrollY && y < 0){
				var absY = Math.abs(y);
				var step = Math.floor(absY / itemHeight);
				var itemDelta = absY - step * itemHeight;
				if(scroll.startY <= scroll.absStartY){
					if(y - scroll.absStartY < 0){
						step = step + 1;
					}
				}			
				targetY = 0 - step * itemHeight;
				time = parseInt(time, 10) || 0;
				time = Math.max(time, Math.abs(targetY - y) * 10);
				targetY = $limit(targetY, scroll.maxScrollY, 0);
			}
			originScrollTo.call(scroll, x, targetY, time, easing);
		}, 10);

		this.iscroll = scroll;

		//iscroll 在可滚动高度小于容器高度时，会自动隐藏 indicators 设置的dom
		//因此重新构建后，需要再把它们显示出来
		if($(valBox).find('li').length <= 1){
			$(valBox).children().show();
			$(viewBox).children().show();
		}
	},
	renderOptions : function(list){
		var conf = this.conf;
		var html = [];
		var handleHtml = [];
		list.forEach(function(item){
			var optionHtml = $substitute(conf.tplOption, item);
			html.push(optionHtml);
			handleHtml.push(
				$substitute(
					conf.tplOption,
					{value : item.value}
				)
			);
		});

		var i = 0;
		for(i = 0; i < conf.marginOptions * 2; i++){
			handleHtml.push($substitute(conf.tplOption,{}));
		}
		this.role('handle-list').html(handleHtml.join(''));

		var viewHtml = html.join('');
		this.role('val-list').html(viewHtml);
		this.role('view-list').html(viewHtml);

		this.restore();
	},
	reset : function(){
		this.value = '';
		this.setValue();
	},
	restore : function(){
		var self = this;
		self.setEvents('off');
		self.iscroll.destroy();
		setTimeout(function(){
			self.buildIscroll();
			self.setEvents('on');
			self.setValue();
			self.trigger('change');
		});
	},
	//从 iscroll 滚动状态获取其定义的值
	getScrollValue : function(){
		var value = '';
		if(!this.iscroll){return value;}
		var optionHeight = this.optionHeight;
		if(!optionHeight){
			var optionNode = this.role('handle-list').children().get(0);
			this.optionHeight = optionHeight = $(optionNode).height();
		}

		var index = Math.abs(Math.floor(this.iscroll.y / optionHeight));
		var valueNode = this.role('val-list').children().get(index);
		value = $(valueNode).attr('data-value') || '';
		return value;
	},
	updateValue : function(){
		if(!this.iscroll){return;}
		var value = this.getScrollValue();
		if(value !== this.value){
			this.value = value;
			this.trigger('change');
		}
	},
	setValue : function(value){
		var self = this;
		var conf = this.conf;
		var targetNode = null;
		value = value || self.value || '';
		self.value = value;

		var children = self.role('handle-list').children();
		if(value){
			children.each(function(index){
				var node = $(this);
				if(node.attr('data-value') === self.value){
					targetNode = this;
					return false;
				}
			});
		}else{
			targetNode = children.get(0);
		}

		if(this.iscroll && targetNode){
			this.iscroll.scrollToElement(targetNode, 0);
		}
	},
	getValue : function(){
		var value = this.value;
		if(!value){
			value = this.getScrollValue();
		}
		return value;
	}
});

module.exports = IscrollSelect;


