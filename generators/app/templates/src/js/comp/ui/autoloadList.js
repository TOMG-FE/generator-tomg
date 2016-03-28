var $ = require('../../lib');
var $view = require('../../lib/mvc/view');
var $tplLoading = require('../tpl/loading.tpl');
var $tplLoaded = require('../tpl/loaded.tpl');

var AutoloadList = $view.extend({
	defaults : {
		node : null,
		role : {
			list : 'ul',
			loading : '.loading'
		}
	},
	build : function(){
		this.curPage = 1;
		this.loadedAll = false;
		this.setLoading();
		this.checkScroll();
	},
	setEvents : function(){
		$(window).on('scroll', this.proxy('checkScroll'));
	},
	loadNextPage : function(){
		var nextPage = this.curPage + 1;
		this.request(nextPage);
	},
	request : function(page){
		//请求分页数据
	},
	//在列表中追加请求到的单页数据
	append : function(pageData){
		pageData = pageData || {};
		var page = parseInt(pageData.page, 10) || 0;
		if(page === this.curPage + 1){
			var appendNodes = $(this.render(pageData));
			appendNodes.appendTo(this.role('list'));
			this.curPage++;
		}
	},
	render : function(pageData){
		//渲染单页数据
	},
	setLoadedAll : function(){
		this.loadedAll = true;
		var loadingNode = this.role('loading');
		loadingNode.html($($tplLoaded).html());
	},
	setLoading : function(){
		if(!this.role('loading').length){
			var loadingNode = $($tplLoading).insertAfter(this.role('list'));
			this.role('loading', loadingNode);
		}else{
			this.role('loading').html($($tplLoading).html());
		}
	},
	checkScroll : function(){
		if(this.loadedAll){return;}
		var loadingNode = this.role('loading');
		var offset = loadingNode.offset();
		if(offset.top < window.innerHeight + $(window).scrollTop()){
			this.loadNextPage();
		}
	}
});

module.exports = AutoloadList;
