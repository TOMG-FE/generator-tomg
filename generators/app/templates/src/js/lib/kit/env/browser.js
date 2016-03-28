/**
检测用户使用的是什么浏览器

- 仅提供浏览器信息，操作系统等其他信息由其他组件提供。
- 这个组件将结合UA检测和特性检测，力求获取更准确的匹配。

@module lib/kit/env/browser
**/

var $ua = require('./ua');

/**
浏览器类型
@type {string}
**/
exports.type = '';

/**
浏览器版本号
@type {number}
**/
exports.version = 0;



