
exports.mixTo = function($){
	$.extend($, {
		noop : function(){},
		hyphenate : function(str){
			return str.replace(/[A-Z]/g, function($0){
				return '-' + $0.toLowerCase();
			});
		}
	});

	$.extend($.fn, {
		reflow : function(){
			var reflow = this.size() && this.get(0).clientLeft;
			return this;
		}
	});
};


