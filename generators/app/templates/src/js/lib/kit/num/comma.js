/**
数字的千分位逗号分隔表示法
IE8 的 toLocalString 给出了小数点后2位: N.00

http://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript
**/

module.exports = function(num){
	var parts = num.toString().split('.');
	parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
	return parts.join('.');
};


