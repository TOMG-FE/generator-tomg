/**
@module lib/kit/obj/type
@example
var $type = require('lib/kit/obj/type');
console.info($type({}));	//function
console.info($type(undefined));		//undefined
**/

/**
确认数据类型
@param {mixed} 任何类型数据
@return {string} 对象类型
**/
module.exports = function(item){
	var type = Object.
		prototype.
		toString.
		call(item).
		toLowerCase().
		replace(/^\[object|\]$/gi, '');

	return type;
};
