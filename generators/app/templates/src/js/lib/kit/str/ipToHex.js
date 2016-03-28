/**
@module lib/kit/str/ipToHex
@example
var $ipToHex = require('lib/kit/str/ipToHex');
$ipToHex('255.255.255.255'); //return 'ffffffff'
**/

/**
将驼峰格式变为连字符格式
@param {string} ip 十进制数字的IPV4地址
@return {string} 16进制数字IPV4地址
**/
module.exports = function(ip){
	return ip.replace(/(\d+)\.*/g, function(match, num) {
		num = parseInt(num, 10) || 0;
		num = num.toString(16);
		if (num.length < 2) {
			num = '0' + num;
		}
		return num;
	});
};
