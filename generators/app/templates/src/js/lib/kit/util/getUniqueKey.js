/**
获取唯一ID 
@module lib/kit/util/getUniqueKey
**/

var time = + new Date(), index = 1;

/**
生成一个不与之前重复的随机字符串
@return {string} 随机字符串
**/
module.exports = function() {
	return ( time + (index++) ).toString(16);
};

