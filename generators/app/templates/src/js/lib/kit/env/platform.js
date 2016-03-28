/**
检测用户使用的是什么平台的设备

- 仅提供平台信息，浏览器等其他信息由其他组件提供。
- 这个组件将结合UA检测和特性检测，力求获取更准确的匹配。

@module lib/kit/env/platform
**/

var $ua = require('./ua');

var platform = $ua.platform;

/**
平台类型
@type {string}
**/
module.exports = platform;


