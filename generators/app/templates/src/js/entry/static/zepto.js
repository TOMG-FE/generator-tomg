var Zepto = require('../../vendor/zepto/zepto');
require('../../vendor/zepto/ajax');
require('../../vendor/zepto/event');
require('../../vendor/zepto/form');
require('../../vendor/zepto/ie');

var $extra = require('../../plugin/extra');
var $prefixfree = require('../../plugin/prefixfree');
var $transit = require('../../plugin/transit');
var $transform = require('../../plugin/transform');

$extra .mixTo(Zepto);
$prefixfree.mixTo(Zepto);
$transit.mixTo(Zepto);
$transform.mixTo(Zepto);

module.exports = Zepto;