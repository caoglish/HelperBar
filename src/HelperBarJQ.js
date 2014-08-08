var _ = require("./helper");
var Constant = require("./constant");
var _default_settings = require("./defaultSetting");
var barBuilder = require('./BarUiBuilder');

var STATUS_BAR = Constant.STATUS_BAR;
var STATUS_TITLE = Constant.STATUS_TITLE;
var STATUS_MESSAGE = Constant.STATUS_MESSAGE;
var STATUS_FOOTER = Constant.STATUS_FOOTER;
var STATUS_MENU = Constant.STATUS_MENU;
var LIST_MENU = Constant.LIST_MENU;

var _settings;

//Jquery Plugin structure to create $.fn.helperbar plugin.
var methods = {
	init: function(menu_tree_list, options, context) {
		_settings = $.extend(true, _default_settings, options); //options 
		barBuilder.setEnv(_settings, context);
		barBuilder.inital_cssManager(); //manage all css stylesheet

		return this.each(function() {
			_.jqobClean($(this)); //clean this jquery object content and texts
			barBuilder.convert_status_bar($(this));
			barBuilder.init_status_bar($(this), menu_tree_list);
		});
	},
	title: function(title) {
		return this.each(function() {
			$(this).find(STATUS_TITLE).append(title);
		});
	},
	clsTitle: function() {
		return this.each(function() {
			$(this).find(STATUS_TITLE).empty();
		});
	},
	foot: function(text) {
		return this.each(function() {
			$(this).find(STATUS_FOOTER).append(text);
		});
	},
	getArea: function(area) {
		var area_map = {
			'foot': STATUS_FOOTER,
			'title': STATUS_TITLE,
			'msg': STATUS_MESSAGE,
			'menu': STATUS_MENU
		};
		return $(this).find(area_map[area]);
	},
	clsFoot: function() {
		return this.each(function() {
			$(this).find(STATUS_FOOTER).empty();
		});
	},
	html: function(html) {
		if (arguments.length === 0) {
			return this.find(STATUS_MESSAGE).html();
		} else {
			return this.each(function() {
				$(this).find(STATUS_MESSAGE).html(html);
			});
		}
	},
	append: function(text) {
		return this.each(function() {
			$(this).find(STATUS_MESSAGE).append(text);
		});
	},
	getSettings: function() {
		return _settings;
	}
};
// Method calling logic
module.exports = $.fn.helperbar = function(method) {
	if (methods[method]) {
		return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
	} else if (typeof method === 'object' || !method) {
		return methods.init.apply(this, arguments);
	} else {
		$.error('Method ' + method + ' does not exist on jQuery.helperbar');
	}
};