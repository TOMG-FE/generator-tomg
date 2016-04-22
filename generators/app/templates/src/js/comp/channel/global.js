var $listener = require('../../lib/core/listener');

module.exports = new $listener([
	//需要登录时触发
	'need-login',
	//需要退出登录时触发
	'need-logout',
	//用户登录信息变更时触发
	'user-change'
]);


