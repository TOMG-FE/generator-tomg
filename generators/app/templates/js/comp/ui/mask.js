/**
遮罩
**/

var $ = require('../../lib');
var $position = require('../../lib/more/position');
var $overlay = require('./overlay');

var Mask = $overlay.extend({
	defaults : {
		template : '<div class="ui-mask"></div>',
		target : 'screen',
		parent : null,
		bgColor : 'rgba(0,0,0,0.5)',
		fxInterval : 300,
		styles : {
			'z-index' : 10,
			'position' : 'absolute',
			'background-color' : 'rgba(0,0,0,0)',
			'display' : 'none'
		}
	},
	events : {
		'touchstart' : 'preventDefault',
		'touchmove' : 'preventDefault'
	},
	setEvents : function(action){
		this.supr(action);
		$(window)[action]('resize', this.proxy('onResize'));
	},
	preventDefault : function(evt){
		evt.preventDefault();
	},
	setStyles : function(styles){
		var conf = this.conf;
		styles = styles || {};

		if(conf.target === 'screen'){
			styles.position = 'fixed';
			styles.width = '100%';
			styles.height = '100%';
		}else{
			var target = this.getTarget();
			styles.position = 'absolute';
			styles.width = target.width() + 'px';
			styles.height = target.height() + 'px';
		}
		this.role('root').css(styles);
	},
	getTarget : function(){
		var conf = this.conf;
		if(conf.target === 'screen'){
			return $(window);
		}else{
			return $(conf.target);
		}
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
		var model = self.model;
		var root = self.role('root');
		var bgColor = conf.bgColor || 'rgba(0,0,0,0.5)';
		if(model.get('visible')){
			if(root.css('display') === 'none'){
				root.show();
			}
			this.trigger('show');
			setTimeout(function(){
				if(model.get('visible')){
					root.transit({
						'background-color' : bgColor
					}, conf.fxInterval, 'ease-out');
				}
			});
		}else{
			root.transit({
				'background-color' : 'rgba(0,0,0,0)'
			}, conf.fxInterval, 'ease-in', function(){
				if(!model.get('visible')){
					root.hide();
				}
			});
			this.trigger('hide');
		}
	},
	onResize : function(){
		this.update();
	}
});

module.exports = Mask;



