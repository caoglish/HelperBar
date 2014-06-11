    "use strict";

    var helper={
		//_.cropFirstSymbol(string) crop the first string if first string is # or .
		//sync the element name which are in both html and javascript
		cropFirstSymbol:function (str) {
			var patt = /^#|^\./;
			return str.replace(patt, '');
		},
		//_.jqobClean($object) clean all the style and attribute and text.
		jqobClean:function($object){
			$object.empty().removeAttr('id').removeAttr('class').removeAttr('style');
		},
		//_.tag(tag, opts)jquery tag maker
		//
		//too lazy to type < />
		tag : function (tag, opts) {
			return $('<' + tag + '/>', opts);
		},
		empty_func:function(){},
		makeTagMsg:function (tag,text,style){
			return style?this.tag(tag).html(text).css(style):this.tag(tag).html(text);
		},

	};

	

    


    module.exports =  helper;
