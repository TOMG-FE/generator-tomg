/**
网络环境检测
@module lib/kit/env/network
**/

var supportOnlineCheck = 'onLine' in window.navigator;

module.exports = {
	/**
	判断是否联网
	@return {boolean} true/false
	**/
	onLine : function(){
		return supportOnlineCheck ? window.navigator.onLine : true;
	}
};

