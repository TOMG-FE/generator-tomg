var $ = require('../../lib');
require('../../plugin/jquery.validate');

//统一验证规则

$.extend($.validator.messages, {
	required: '&nbsp;',
	maxlength: '&nbsp;',
	minlength: '&nbsp;',
	number: '&nbsp;'
});

$.validator.addMethod('isTelCode', function(value, element) {
	var tel = /^[0-9]{11}$/;
	return this.optional(element) || (tel.test(value));
}, '&nbsp;');