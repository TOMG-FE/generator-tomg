/**
获取接口配置实例
**/

var $transmission = require('../../lib/core/transmission');

module.exports = function(){
	return new $transmission({
		verify : function(rs, conf, options){
			return !!rs;
		}
	});
};

