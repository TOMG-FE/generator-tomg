/**
接口管理器
**/

var $getTransmission = require('./getTransmission');

var trans = $getTransmission();

// 接口说明
// 参数名称 参数说明
trans.register('接口名称', {
	url: '/接口地址'
});


module.exports = trans;
