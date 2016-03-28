/**
通过UA获取设备信息

- 仅根据设备UA来进行检测，不考虑其他特征，如需获取更准确匹配，请使用其他组件。

@module lib/kit/env/ua
@see http://www.useragentstring.com/
@see module:lib/kit/env/platform
@see module:lib/kit/env/os
@see module:lib/kit/env/browser
@see module:lib/kit/env/device
@example
var $ua = require('lib/kit/env/ua');
console.info($ua.os, $ua.browser, $ua.device, $ua.platform);

var info = $ua.test('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/40.0.2214.115 Safari/537.36');
console.info(info.os);  //{type:'mac', version:10.10}
console.info(info.browser);  //{type:'chrome', version:40.0}
console.info(info.device);	//{type:'pc', version:0.00}
console.info(info.platform);  //mac
**/

/**
测试 UA 字符串，返回测试结果
@alias module:lib/kit/env/ua.test
@param {string} [ua=navigator.userAgent] UA字符串
@return {object} 测试结果对象
**/
var testUA = function(ua){
	var info = {};
	ua = ua || navigator.userAgent;

	info.platform = '';
	info.os = {
		type : '',
		version : 0
	};
	info.browser = {
		type : '',
		version : 0
	};
	info.device = {
		type : '',
		version : 0
	};
	return info;
};

var uainfo = testUA();

exports.test = testUA;

/**
平台信息
@type {string}
**/
exports.platform = uainfo.platform;

/**
操作系统信息
@type {object}
**/
exports.os = uainfo.os;

/**
浏览器信息
@type {object}
**/
exports.browser = uainfo.browser;

/**
设备信息
@type {object}
**/
exports.device = uainfo.device;

