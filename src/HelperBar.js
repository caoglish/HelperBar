"use strict";
var _ = require("./helper");
var menuBuilder = require("./menuBuilder");

var VERSION='0.5.1';


var _menubar, _settings, _helperbar_fn = {};
//private method: create a style text for message.	


var set_action_on_bar = function(context) {
	if ($.isFunction(_settings.msg_click)) {
		_menubar
			.helperbar('getArea', 'msg')
			.on('click', function() {
				_settings.msg_click.call(context);
			});
	}

	if ($.isFunction(_settings.bar_click)) {
		_menubar
			.on('click', function() {
				_settings.bar_click.call(context);
			});
		_menubar.helperbar('getArea', 'menu').children().on('click', function(e) {
			e.stopPropagation();
		});
	}
};

var delUnsafeMethod = function() {
	delete HelperBar.prototype.getMenuBar;
};

var registerMethodToPrototype = function(force) {
	force = force || false;
	if (_helperbar_fn && _helperbar_fn.constructor === Object) {
		if (force) {
			$.extend(HelperBar.prototype, _helperbar_fn);
		} else {
			//if not force, only extend the functions which are not existedon HelperBar.
			for (var fn in _helperbar_fn) {
				if (!(fn in HelperBar.prototype)) HelperBar.prototype[fn] = _helperbar_fn[fn];
			}
		}
	} else {
		$.error('HelperBar.fn: HelperBar.fn is overwrited in wrong way.');
	}
};

function HelperBar(menu_tree_list, options) {
	_menubar = _.tag('div').helperbar(menu_tree_list, options, this);
	_settings = _menubar.helperbar('getSettings');
	set_action_on_bar(this);
	if (_settings.safe_mode !== "unsafe") delUnsafeMethod();
	registerMethodToPrototype(_settings.safe_mode === "unsafe"); //unsafe mode can overwrite orignial method.
	//Check body is existed or not, if existed, append into body, if not existed, waiting for page fully loaded then append into body.		
	if ($('body').size() > 0) {
		_menubar.appendTo('body');
	} else {
		$(function() {
			_menubar.appendTo('body');
		});
	}
}

//## API of bar (The object of HelperBar)
// ### #API#bar.getMenuBar():		
// (return $object)get jQuery object of menu bar, only can be used in unsafe mode.
HelperBar.prototype.getMenuBar = function() {
	return _menubar;
};
// ### #API#bar.getSettings():		
// (return object)get setting/options of menu bar
HelperBar.prototype.getSettings = function() {
	return $.extend(true, {}, _settings);
};

// ### #API#bar.append(text):		
// (return bar) append a text/html in bar message area.		
HelperBar.prototype.append = function(text) {
	_menubar.helperbar('append', text);
	return this;
};
// ### #API#bar.html(html):		
// (return bar or html code) display text/html in bar message area. previous message will be removed.
//#####msg could be a text, html or jQuery object.
// if parameter give html code, return bar. if no parameter, return the html code on bar.
HelperBar.prototype.html = function(html) {
	if (arguments.length !== 0) {
		_menubar.helperbar('html', html);
		return this;
	} else {
		return _menubar.helperbar('html');
	}
};
// ### #API#bar.addmsg(msg,style,func):		
// (return bar) add a message wrapped with span tag.
// #####msg could be a text, html or jQuery object.
// #####if style is string, set a 'css:color' to message
// #####if style is object , set a css style to message. this is according $.fn.css(object)
// #####if style is function, register a click event on the msg.
// #####func($msg,msg,style) is the eventHanlder on msg. $msg is jQuery object wrapped message. msg is the msg it self which is the parameter of the addmsg. style is the object of style applied on the $msg.
HelperBar.prototype.addmsg = function(msg, style, func) {
	if (arguments.length > 1) {
		var that = this;
		var $msg;
		//process func.
		if ($.isFunction(style)) {
			func = style;
			style = {};
		}

		//process style.
		if (typeof style === 'string') {
			style = {
				"color": style
			};
		} else if (typeof style === 'object' && !Array.isArray(style)) {} else {
			style = {};
		}

		$msg = _.makeTagMsg('span', msg, style);
		this.append($msg);
		//process callback.
		if ($.isFunction(func)) {
			func.apply(that, [$msg, msg, style]);
		}

		return this;
	} else if (style === undefined && func === undefined) {
		this.append(msg);
		return this;
	} else {
		$.error('addmsg() must has msg');
	}
};
// ### #API#bar.msg(msg,style,func):		
// (return bar) show a message wrapped with span tag. previous message will be removed.
// #####message could be a text, html or jQuery object.
// #####if style is string, set a 'css:color' to message
// #####if style is object of jquery css, set a css style to message.
// #####if style is function, register a click event on the msg.
// #####func($msg,msg,style) is the eventHanlder on msg. $msg is jQuery object wrapped message. msg is the msg it self which is the parameter of the addmsg. style is the object of style applied on the $msg.
// if parameter give html/text code, return bar. if no parameter text, return a text of message on the bar
HelperBar.prototype.msg = function(msg, style, func) {
	if (arguments.length !== 0) {
		this.cls();
		return this.addmsg.apply(this, arguments);
	} else {
		return _menubar.helperbar('getArea', 'msg').text();
	}
};

// ### #API#bar.log(msg):		
// (return bar) append a message wrapped with div tag. 
// #####message could be a text, html or jQuery object.
HelperBar.prototype.log = function(msg) {
	if (msg === undefined) {
		msg = 'undefined';
	} else if (typeof msg !== 'string') {
		msg = JSON.stringify(msg);
	}
	msg = _.makeTagMsg('div', msg);
	return this.append(msg);
};
// ### #API#bar.warn(msg):
// (return bar) warning a message
// #####message could be a text, html or jQuery object.
// #####pre-set the style in options of bar, so this api only need to pass single parameter
HelperBar.prototype.warn = function(msg) {
	var that = this;
	var style = {
		color: _settings.warn_color,
		'font-size': _settings.warn_size
	};
	var func;
	if ($.isFunction(_settings.warn_callback)) {
		func = function($msg, msg, style) {
			_settings.warn_callback.apply(that, arguments);
		};
	} else {
		func = _.empty_func;
	}
	if (_settings.warn_mode === 'append') {
		return this.addmsg(msg, style, func);
	} else if (_settings.warn_mode === 'log') {
		var $msg = _.makeTagMsg('div', msg, style);
		this.append($msg);
		func.apply(that, [$msg, msg, style]);
		return this;
	} else if (_settings.warn_mode === 'clean') {
		return this.msg(msg, style, func);
	} else {
		$.error('no this type of warning mode');
	}
};


// ### *Deprecated* #API#bar.clickClsMsg(msg, style,func):		
// (return bar) show a message wrapped with span div. previous message will be removed.
// #####message could be a text, html or jQuery object.
// #####if style is string, set a 'css:color' to message
// #####if style is object of jquery css, set a css style to message.
// if parameter give html/text code, return bar. if no parameter text, return a text of message on the bar	
// This provide a message which could be removed by click.
HelperBar.prototype.clickClsMsg = function(msg, style, func) {
	this.msg(msg, style, function($msg, msg, style) {
		$msg.on('click', function() {
			$(this).remove()
		});
		if ($.isFunction(func)) func.apply(this, [$msg, msg, style]);
	});
};
// ### #API#bar.cls():		
// (return bar) clean the bar message
HelperBar.prototype.cls = function() {
	this.html('');
	return this;
};
// ### #API# bar.title(text):		
// (return bar) append message to title
HelperBar.prototype.title = function(text) {
	_menubar.helperbar('title', text);
	return this;
};
// ### #API#bar.clsTitle():		
// (return bar) clean title	which appended.
// ##### this will not clean the title
HelperBar.prototype.clsTitle = function() {
	_menubar.helperbar('clsTitle');
	this.title(_settings.bar_title);
	return this;
};
// ### #API#bar.foot(text):	
// (return bar)	append text in footer 
HelperBar.prototype.foot = function(text) {
	_menubar.helperbar('foot', text);
	return this;
};
// ### #API#bar.clsFoot(text):
// (return bar) clean text in footer
// #####this method will clean pre_set footer text
HelperBar.prototype.clsFoot = function() {
	_menubar.helperbar('clsFoot');
	return this;
};
// ### #API#bar.open(url, mode):	
// (return bar) open a url. 
// open a link by give a url. 
//
// mode: new is open link in new window/tab, self is open in current window/tab.
// ##### the mode may not work which is depending on the browser setting.
HelperBar.prototype.open = function(url, mode) {
	mode = mode || 'self';
	if (mode === 'new') {
		window.open(url, '_blank');
	} else if (mode === 'self') {
		window.open(url, '_self');
	} else {
		window.open(url);
	}
	return this;
};
// ### #API# bar.show(speed):	
// (return bar) show the bar. 
// ##### speed is the speed according the one in $().hide(speed);
HelperBar.prototype.show = function(speed) {
	if (!speed) {
		_menubar.show();
	} else {
		_menubar.slideDown(speed);
	}
	return this;
};
// ### #API# bar.hide(speed):	
// (return bar) hide the bar. 
// ##### speed is the speed according the one in $().hide(speed);
HelperBar.prototype.hide = function(speed) {
	if (!speed) {
		_menubar.hide();
	} else {
		_menubar.slideUp(speed);
	}
	return this;
};
//### #API# bar.data(key,value):		
//setter: (return bar) if have value, return bar. store the value in the key in localStorage.
//
//getter: (return value) if only give key without value, will return  value.
//####The Data storage uses LocalStorage.
//	the value soppurts string, array, and object. 
//####HelperBar.data(key,value) is the same, but will not return bar.
HelperBar.prototype.data = function(key, value) {
	if (arguments.length > 1) {
		localStorage.setItem(key, JSON.stringify(value));
		if (this instanceof HelperBar) return this;
	} else if (arguments.length > 0) {
		if (typeof key !== 'string') $.error('data() key must be string');
		try {
			return JSON.parse(localStorage.getItem(key));
		} catch (e) {
			return localStorage.getItem(key);
		}
	} else {
		$.error('data() must has a key');
	}
};
//### #API#bar.delData(key):		
//(return bar) remove the key with the value from localStorage
//
//#####HelperBar.delData(key) is the same, but will not return bar.
HelperBar.prototype.delData = function(key) {
	if (typeof key === 'string') {
		localStorage.removeItem(key);
		if (this instanceof HelperBar) return this;
	} else {
		$.error('delData() has not key or key is not string');
	}
};

//### #API# bar.cache(key,value):	
//setter: (return bar) if have value, return bar. store the value in the key in bar.
//
//getter: (return value) if only give key without value, will return  value.
//#####since store data in jQuery element, when the bar is destroyed, the data will be destroyed with it.
HelperBar.prototype.cache = function(key, value) {
	if (arguments.length > 1) {
		_menubar.data(key, value);
		return this;
	} else if (arguments.length > 0) {
		if (typeof key !== 'string') $.error('cache() key must be string');
		return _menubar.data(key);
	} else {
		$.error('cache() must has a key');
	}
};
//### #API#bar.delCache(key):		
//(return bar) remove the key with the value from bar
HelperBar.prototype.delCache = function(key) {
	if (typeof key === 'string') {
		_menubar.removeData(key);
		return this;
	} else {
		$.error('delData() has not key or key is not string');
	}
};

//### #API#bar.version():
//(return string) return the Helperbar version information	
HelperBar.prototype.version = function() {
	return VERSION;
};



module.exports = (function() {
	var instantiated;

	function init(menu_tree_list, options) {
		var menu_tree_list_for_menu_bar = menuBuilder.build(menu_tree_list);
		return new HelperBar(menu_tree_list_for_menu_bar, options);
	}

	var destroy = function() {
		_menubar.remove();
		instantiated = undefined;
	};

	var exports = {
		//###Helperbar.menu:		
		//Helperbar.menu is the the menu builder toolkit,it's contains a set of toolkit to build the menu
		menu: {
			//### #API# Helperbar.menu.set(menuList);
			//(return Helperbar.menu) set a menu list object into the builder	
			set: function(menuList) {
				menuBuilder.set(menuList);
				return this;
			},
			//### #API# Helperbar.menu.addTree(title,click,id);
			//(return Helperbar.menu) start add a new menu column(tree). if parameter have been give, create a root menu item. if parameter is empty, one of the item in the tree will be root menu item(default is the last item)
			addTree: function(title, click, id) {
				menuBuilder.addTree(title, click, id);
				return this;
			},
			//### #API# Helperbar.menu.addItem(title,click,id);
			//(return Helperbar.menu) add a new menu item in the column(tree).

			addItem: function(title, click, id) {
				menuBuilder.addItem(title, click, id);
				return this;
			},
			//### #API# Helperbar.menu.reset();
			//(return Helperbar.menu) clear/reset the menu.				
			reset: function() {
				menuBuilder.reset();
				return this;
			},
			//### #API# Helperbar.menu.merge(menuList);
			//(return Helperbar.menu) merge a menuList with menu builder's menu list.
			//menuList will be appended.
			merge: function(menuList) {
				menuBuilder.merge(menuList);
				return this;
			},
			//### #API# Helperbar.menu.mergeTo(menuList);
			//(return Helperbar.menu) merge a menuList with menu builder's menu list.
			//menuList will be prepended.
			mergeTo: function(menuList) {
				menuBuilder.mergeTo(menuList);
				return this;
			},

			//### #API# Helperbar.menu.get();
			//(return object) get a menu list object (the object is not built)		
			get: function() {
				return menuBuilder.get();
			},
			//### #API# Helperbar.menu.build();
			//(return object) get a menu list object (the object have been  built)						
			build: function() {
				return menuBuilder.build(true);
			}
		},
		//### #API#Helperbar.getBar(menu_tree_list,options):		
		//(return bar) build a entire Helperbar/menubar according the menu tree list object with given options

		getBar: function(menu_tree_list, options) {
			if (!instantiated) {
				instantiated = init(menu_tree_list, options);
			}
			return instantiated;
		},
		//### #API#Helperbar.buildBar(options):		
		//(return bar) build a entire Helperbar/menubar with given options. this is according the menu setting by the menu builder.
		buildBar: function(options) {
			if (!instantiated) {
				instantiated = init(true, options);
			}
			return instantiated;
		},
		//### #API#Helperbar.version()
		//(return string) return the Helperbar version information	
		version: function() {
			return HelperBar.prototype.version();
		},
		//### #API#Helperbar.tag(tag,attribute)			
		//(return jQuery object),create a jQuery object with html tag and its attribute.
		//
		//tag:string
		//
		//attribute:object
		tag: _.tag
	};
	exports.getbar = exports.getBar;
	exports.data = HelperBar.prototype.data;
	exports.delData = HelperBar.prototype.delData;
	//### #API#Helperbar.destory()
	//### #API#bar.destory()
	//(no return) destory the Helperbar
	exports.destroy = HelperBar.prototype.destroy = destroy;

	//#How to extends HelperBar
	//HelperBar.fn.newMethod=function(){}
	//
	//
	//	HelperBar.fn.extend({
	//		newMethod1:function(){},
	//		newMethod2:function(){},
	//	})
	//
	//extend the helperbar.
	exports.fn = _helperbar_fn;
	exports.fn.extend = exports.extend = $.extend;
	return exports;
})();

