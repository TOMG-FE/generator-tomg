/**
检测用户使用的是什么设备

- 仅提供设备信息，操作系统等其他信息由其他组件提供。
- 这个组件将结合UA检测和特性检测，力求获取更准确的匹配。

@module lib/kit/env/device
**/

var $ua = require('./ua');

/**
设备类型
@type {string}
**/
exports.type = '';

/**
设备版本号
@type {number}
**/
exports.version = 0;


