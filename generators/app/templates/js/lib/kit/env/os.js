/**
检测用户使用的是什么操作系统

- 仅提供操作系统信息，浏览器等其他信息由其他组件提供。
- 这个组件将结合UA检测和特性检测，力求获取更准确的匹配。

@module lib/kit/env/os
**/

var $ua = require('./ua');


/**
操作系统类型
@type {string}
**/
exports.type = '';

/**
操作系统版本号
@type {number}
**/
exports.version = 0;

