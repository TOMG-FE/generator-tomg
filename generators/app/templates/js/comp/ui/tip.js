/**
简单提示信息
**/

var $ = require('../../lib');
var $position = require('../../lib/more/position');
var $overlay = require('./overlay');

var Tip = $overlay.extend({
	defaults : {
		template : '<div class="ui-tip"></div>',
		target : 'screen',
		parent : null,
		visiblePos : 0,
		styles : {
			'display' : 'none',
			'position' : 'fixed',
			'z-index' : 10000,
			'padding' : '0.1rem',
			'overflow' : 'hidden',
			'background' : 'rgb(0,0,0)',
			'background-color' : 'rgba(0,0,0,0.7)',
			'border-radius' : '0.05rem',
			'min-height' : '0.18rem',
			'font-size' : '0.16rem',
			'color' : '#fff'
		}
	},
	getTarget : function(){
		var conf = this.conf;
		if(conf.target === 'screen'){
			return $(window);
		}else{
			return $(conf.target);
		}
	},
	setStyles : function(styles){
		var conf = this.conf;
		styles = styles || {};
		if(conf.target === 'screen'){
			styles.position = 'fixed';
		}else{
			styles.position = 'absolute';
		}
		this.role('root').css(styles);
	},
	//tip浮层一般显示在容器底部
	setPosition : function(){
		var conf = this.conf;
		var target = this.getTarget();
		this.visiblePos = this.role('root').height() + 20;
		$position.pin({
			element : this.role('root'),
			x : '50%',
			y : '50%'
		}, {
			element : conf.target === 'screen' ? $position.VIEWPORT : target,
			x : '50%',
			y : '100% + ' + 20 + 'px'
		});
	},
	checkVisible : function(){
		var self = this;
		var conf = this.conf;
		var model = self.model;
		var root = self.role('root');
		if(model.get('visible')){
			if(root.css('display') === 'none'){
				root.show();
			}
			this.trigger('show');
			setTimeout(function(){
				var visiblePos = conf.visiblePos || self.visiblePos || 100;
				visiblePos = visiblePos / 100;
				if(model.get('visible')){
					root.transit({
						'translateY' : 0 - visiblePos + 'rem'
					}, 300, 'ease-out');
				}
			});
		}else{
			root.transit({
				'translateY' : 0
			}, 300, 'ease-in', function(){
				if(!model.get('visible')){
					root.hide();
				}
			});
			this.trigger('hide');
		}
	}
});

module.exports = Tip;



