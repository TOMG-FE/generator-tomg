/**
用户模型
@see platform.server.com/ptlogin/index.html
**/

var $ = require('../../lib');
var $cookie = require('../../lib/kit/util/cookie');
var $getUniqueKey = require('../../lib/kit/util/getUniqueKey');
var $listener = require('../channel/global');
var $loginLayer = require('../ui/loginLayer');


//避免调试环境报错
if (document.domain.indexOf('qq.com') >= 0) {
	document.domain = 'qq.com';
}

var PROTOCOL_CONFIG = document.location.protocol || 'http:';

var defalutOpt = {
	'appid': 638009104,
	// 跨域中转的着陆页
	'proxy_url': '/proxy.html',
	// s_url ptlogin登录成功后跳转的地址 默认ajax请求
	's_url': '/index.php?mod=user&act=login',
	// 弹窗展现样式 20（622 ＊ 368） | 21 (490 * 328) | 32 (422 * 320) | 33 (374 * 320)
	'style': 20,
	'domain': 'qq.com',
	// target: s_url 打开方式，top 当前浏览器窗口但前页面打开 ｜ self  弹窗打开  ｜ parent 父窗口打开
	'target': 'self',
	'hide_border': 1,
	'border_radius': 0
};

/**
 * 用户弹窗调用父页面的方法
 * close: 关闭登录框
 * resize: 重绘登录框大小
 */
if (typeof window.postMessage !== 'undefined') {
	// 支持 postmessage 的浏览器
	window.onmessage = function(event) {
		var msg = event || window.event;
		var data = JSON.parse(msg.data);

		switch (data.action) {
			case 'close':
				$loginLayer.closeLayer();
				break;
			case 'resize':
				$loginLayer.resizeLayer(data.width, data.height);
				break;
			default:
				break;
		}
	};
} else {
	// 不支持postMessage的IE6，7 hack方法
	navigator.ptlogin_callback = function(msg) {
		var data = JSON.parse(msg.data);
		switch (data.action) {
			case 'close':
				$loginLayer.closeLayer();
				break;
			case 'resize':
				$loginLayer.resizeLayer(data.width, data.height);
				break;
			default:
				break;
		}
	};
}

function openLoginLayer(opt) {

	var conf = $.extend({}, defalutOpt, opt);

	var tmpArr = [];
	for (var key in conf) {
		if (conf.hasOwnProperty(key)) {
			tmpArr.push(key + '=' + encodeURIComponent(conf[key]));
		}
	}
	var loginURL = PROTOCOL_CONFIG + '//xui.ptlogin2.qq.com/cgi-bin/xlogin?' + tmpArr.join('&');

	$loginLayer.initLayer({
		url: loginURL
	});
}

// 获取回调函数名
var CBNamePrefix = 'cb_' + $getUniqueKey();
function getCBFunName(CBNameSuffix) {
	return CBNamePrefix + CBNameSuffix;
}

/**
 * loginFun、logout 参数 opt
 * jump : true 当前页面刷新， false 当前接口ajax请求， str 跳转页面的url
 */
var loginFun = (function() {

	var conf = {
		// 判断登录后是否需要跳转
		jump: true
	};

	// 登录成功后的回调函数
	var loginCBName = getCBFunName('login');

	window[loginCBName] = function() {
		// 关闭对话框
		$loginLayer.closeLayer();
		// 发起登录成功广播
		$listener.trigger('user-change');
	};

	return function(opt) {

		$.extend(conf, {
			jump: true
		}, opt);

		var needConf = {};
		if (conf.jump) {
			needConf.s_url = conf.jump === true ? window.location.href : conf.jump;
			needConf.target = 'top';
		} else {
			needConf.s_url = defalutOpt.s_url + '&callback=' + loginCBName;
		}

		openLoginLayer(needConf);
	};
})();

var logoutFun = function(opt) {

	var conf = $.extend({
		jump: true
	}, opt);

	// 登出成功后的回调函数
	var logoutCB = function(ret) {

		if(ret === 0) {
			return;
		}
		if (conf.jump === true) {
			window.location.reload();
		} else if ($.type(conf.jump) === 'string') {
			window.location.href = conf.jump;
		} else {
			$listener.trigger('user-change');
		}
	};

	if(window.pt_logout && $.type(window.pt_logout.logout) === 'function') {
		window.pt_logout.logout(logoutCB);
	} else {
		var logoutScript = 'http://imgcache.qq.com/ptlogin/ac/v9/js/ptloginout.js';

		if(PROTOCOL_CONFIG === 'https:') {
			logoutScript = 'https://ui.ptlogin2.qq.com/js/ptloginout.js';
		}

		$.getScript(logoutScript, function() {
			window.pt_logout.logout(logoutCB);
		});
	}

};

// 对外接口
var User = {

	isLogin: function() {
		// 验证用户是否登录
		return !!$cookie.get('uin');
	},

	getUserInfo: function() {

		var userinfo = {};

		if (User.isLogin()) {
			userinfo.qq = $cookie.get('ptui_loginuin');
		}
		return userinfo;
	}
};

$listener.on('need-login', loginFun);
$listener.on('need-logout', logoutFun);

module.exports = User;

