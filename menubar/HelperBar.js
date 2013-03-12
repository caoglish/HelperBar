//Development framework, add a useful and functional menu bar for GreaseMonkey Plugin.
//
//@version     0.4.2b
//
//Purpose: a quick way to generate a interactive menu bar for GreaseMonkey/Tamper plugin
//
//Created by: Caoglish

//##Description
//####1) This requires jQuery.
//####2) Core is a jQuery plugin.
//####3) Use only in GreaseMonkey/TamperMonkey
//####4) Currently test under jQuery 1.8.x

//##How to use
//###1) create a set of menu. (see right)
//addTree(title,func) to start a new column of the menubar
//
//addItem(title,func) add a menu item, 1st param is name of menu item, 2ns param is the event/function when user click the the button
/**
*menu builder 
*
*HelperBar.menu.addTree('root1',func)
*					.addItem('menu1-1',func)
*					.addItem('menu1-2',func)
*			.addTree('root2',func)
*					.addItem('menu2-2',func)
*					.addItem('menu2-2',func)
*/

//###2) build the menu and get the bar.
//use HelperBar.buildBar(options) to build a menu bar and return a bar object which will be used/called in the event/function of menu item.
//
//####to config/set the options, please see the options section below.

/**
*menu build
*
*bar=HelperBar.buildBar(options);
*/

//##Code Explain
//$.fn.menubar: a jquery plugin to create a menubar
//a core of generate Menu bar by passing a json structure.
;(function ($,window,undefined) {
    "use strict";
	
	//menubar element name define.
	//const keywork is working fine with firefox/chrome, plugin is not using in IE, so it's better use const here.
	
    var STATUS_BAR = '#menubar-7cad339b0b08db99561c640461d00a07';
    var STATUS_TITLE = '#menubar-title';
    var STATUS_MESSAGE = '#menubar-message';
	var STATUS_FOOTER = '#menubar-footer';
    var STATUS_MENU = '#menubar-menu';
    var LIST_MENU = "#menubar-list-menu";

    var settings;
    var cssManager;
 
    //(private level tool) specific for this plugin
    var _={
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
		}
	};
    
    
	
	//barBuilder object to manage the code to builer the menu bar.
	var barBuilder = {
		//convert a 'div' element to the Menu bar
		convert_status_bar:function($object) {
			$object.attr('id', _.cropFirstSymbol(STATUS_BAR)).css(cssManager.bar_basic_style); //create status bar//css: #helper-bar-nnnnnnnnnnnnnn
			var $div_status_title = _.tag('div', {
				id: _.cropFirstSymbol(STATUS_TITLE)
			}).css(cssManager.menu_basic_style).css(cssManager.font_style); //create status title area
			var $div_status_message = _.tag('div', {
				id: _.cropFirstSymbol(STATUS_MESSAGE)
			}).css(cssManager.menu_basic_style).css(cssManager.font_style); //create status message area
			var $div_status_footer = _.tag('div', {
				id: _.cropFirstSymbol(STATUS_FOOTER)
			}).css(cssManager.menu_basic_style).css(cssManager.font_style); //create status footer area
			if(settings.foot_size!=='none'){$div_status_footer.css('font-size',settings.foot_size);}
			$object.append($div_status_title).append($div_status_message).append($div_status_footer).append(this.create_status_menu());
		},
	//creating top menu level (root menu)
		create_status_menu:function() {
			var $div_status_menu = _.tag('div', {
				id: _.cropFirstSymbol(STATUS_MENU)
			}).css(cssManager.menu_basic_style); //create status menu
			var ul_list_menu = _.tag('ul', {
				id: _.cropFirstSymbol(LIST_MENU)
			}); //create menu list
			ul_list_menu.css({
				margin: 0,
				padding: 0
			}); //css: #status-menu ul
			$div_status_menu.append(ul_list_menu); //construct status bar
			return $div_status_menu;
		},
		//creating a single menu item for root level
		create_root_menu_item:function(id, title, callback) {
			var $tag_a = _.tag('a', {
				id: id,
				href: '#',
				text: title
			}).click(function (event) {
				event.preventDefault();
				if (callback) {
					callback.apply();
				}
			});
			$tag_a.css(cssManager.tag_a_css).css({
				background: settings.menu_bg_color
			}).hover(
				function () {
					$(this).css({
						background: settings.menu_hover_bg_color.hover_background_color
					});
				},
				function () {
					$(this).css({
						background: settings.menu_bg_color
					});
			}); //css:#status-menu ul li a
			
			var $root_menu_item = _.tag('li').css(cssManager.root_menu_style) //css:#status-menu ul li
			.append($tag_a);
			return $root_menu_item;
		},
		//creating a single menu item
		create_menu_item:function(id, title, callback) {
			var menu_item = _.tag('li');
			menu_item.css(cssManager.menu_style); //css:#status-menu ul li ul li
			var $tag_a = _.tag('a', {
				id: id,
				href: '#',
				text: title
			}).click(function (event) {
				event.preventDefault();
				if (callback) {
					callback.apply();
				}
			});

			$tag_a.css(cssManager.tag_a_css).css({
				background: settings.menu_bg_color
			}).css({
				'border-bottom': '1px solid '+settings.menu_separator_color
			}).hover(
				function () {
					$(this).css({
						background: settings.menu_hover_bg_color
					});
				},
				function () {
					$(this).css({
						background: settings.menu_bg_color
					});
			}); //css:#status-menu ul li ul li a
			menu_item.append($tag_a);
			return menu_item;
		},
		
		//construct a root menu item
		construct_root_menu:function(root_menu) {//root_menu must have attribute of id,title,click[function]
			return this.create_root_menu_item(root_menu.id, root_menu.title, root_menu.click);
		},
		//construct a menu tree except the root menu item
		construct_menu:function(menu_list) {
			var $tag_ul = _.tag('ul');
			$tag_ul.hide().css(cssManager.menu_ul_style); //css:#status-menu ul li ul
			for (var menu in menu_list) {
				var id = menu_list[menu].id;
				var title = menu_list[menu].title;
				var click = menu_list[menu].click;
				$tag_ul.append(this.create_menu_item(id, title, click));
			}
			return $tag_ul;
		},
		//construct one menu tree include root menu item and other menu item
		construct_one_menu_tree:function(menu_array) {
			var one_menu_tree = this.construct_root_menu(menu_array.root).append(this.construct_menu(menu_array.list));
			//hover to show and hide the menu items.
			one_menu_tree.hover(function () {
				$(this).find('ul').slideDown();
			}, function () {
				$(this).find('ul').slideUp();
			});
			return one_menu_tree;
		},
		//setting of hide mode
		//
		//hide mode selection: all, onBar, notOnBar,notOnMenu,noHide
		select_hide_mode:function($menubar) {
			if (settings.hide_mode === 'all') {
				$(document).dblclick(function () {
					$menubar.toggle();
				});
			} else if (settings.hide_mode === 'onBar') {
				$(document).dblclick(function (e) {
					var event_area = $(e.target).parents(STATUS_BAR);
					if (event_area[0] === $menubar[0]) {
						$menubar.hide();
					} else {
						$menubar.show();
					}
				});
			}else if (settings.hide_mode === 'notOnBar') {
				$(document).dblclick(function (e) {
					var event_area = $(e.target).parents(STATUS_BAR);
					if (event_area[0] !== $menubar[0]) {
						$menubar.toggle();
					}
				});
			}else if (settings.hide_mode === 'notOnMenu') {
				$(document).dblclick(function (e) {
					var event_area = $(e.target).parents(STATUS_BAR);
					if (!(event_area[0] === $menubar[0] && e.target.nodeName === 'A')) {
						$menubar.toggle();
					}
				});
			}else if (settings.hide_mode === 'noHide') {
			}else {
				$.error('Wrong Type of Hide Mode');
			}
		},
		//Initinalize entire menu bar
		//
		//1) init menubar with mneu_tree_list. 
		//
		//2) init functions and behaviors of menubar.
		init_status_bar:function($menubar,menu_tree_list) {
			var $status_menu = $menubar.find(STATUS_MENU);
			var $footer=$menubar.find(STATUS_FOOTER);
			//set the status menu will show on mouse over the statusbar, hide on mouse out
			$menubar.hover(function () {
				if(settings.foot_mode === 'hide' ) {$footer.show();}
				$status_menu.show();
			}, function () {
				if(settings.foot_mode === 'hide' ) {$footer.hide('slow');}
				$status_menu.hide('slow');
			});
			//construct entire menu tree for the menu bar
			for (var menu_tree in menu_tree_list) {
				this.construct_one_menu_tree(menu_tree_list[menu_tree]).appendTo($menubar.find(LIST_MENU));
			}
			//initalize the default appearance of the status bar
			$status_menu.hide();
			if(settings.foot_mode === 'hide' ) {$footer.hide();}
			$menubar.menubar('title', settings.bar_title);
			$menubar.menubar('foot', settings.bar_foot);
			this.select_hide_mode($menubar); //select hide mode
			
			
		},
		//manage the css for the menu bar. use for $().css()
		inital_cssManager:function (){
			cssManager={
				font_style:{'font-family':settings.font_family,
							'font-size':'100%'
				},
				bar_basic_style:{
					'position': 'fixed',
					'background-color': settings.bar_bg_color,
					'color': settings.bar_font_color,
					'bottom': '0',
					'right': '0',
					'opacity': settings.bar_opacity,
					'border-radius': '0px ' + settings.border_radius + ' 0px 0px',
					'padding':'0px',
					'padding-left': '2px',
					'margin-left': '1px',
					'width': '100%',
					'z-index': '99999',
					'line-height': 'normal',
					'box-shadow':settings.bar_shadow,
					'text-align': 'left'
				},//css: #helper-bar-nnnnnnnnnnnnnn
				menu_basic_style:{
					'padding':'0px',
					'background':'',
					'list-style': 'none',
					'margin': '0px'
				},//basic style for both menu and root menu
				menu_ul_style:{
					'margin': '0',
					'padding': '0',
					'position': 'fixed',
					'box-shadow':settings.menu_shadow,
					'bottom': '30px'
				},
				tag_a_css :{
						'font-size':'medium',
						'display': 'block',
						'padding': '5px 12px',
						'text-decoration': 'none',
						'width': settings.menu_width,
						'color': settings.menu_font_color,
						'white-space': 'nowrap'
					} //tag a style sheet.
			};
			cssManager.menu_style=$.extend({},cssManager.menu_basic_style,{	
								'display': 'inline'
							});//css:#status-menu ul li ul li
			cssManager.root_menu_style=$.extend({},cssManager.menu_basic_style,{	
								'float': 'left',
								'border-left':'1px solid '+settings.menu_separator_color
							});//css:#status-menu ul li
			cssManager.bar_basic_style=$.extend({},cssManager.bar_basic_style,cssManager.font_style);
		}
	};
	
	//Jquery Plugin structure to create $.fn.menubar plugin.
	var methods = {
		//initialize the options for the jquery pluin
		init: function (menu_tree_list, options) {
		//## Options and Default value
		
			settings = $.extend(true, {
			//###bar_title: (default:"Helper Bar")
			//the title of the bar 
				bar_title: 'Helper Bar',
			//###bar_foot: (default: empty string)
			//the footer of the bar 
				bar_foot:'',
			//###foot_mode: (default: 'hide')
			//the footer of the bar 
			//
			//1)'hide' display the footer only if mouse on the bar
			//
			//2)'show' always display footer
				foot_mode:'hide',
			//###foot_size: (default: '6px')
			//the footer size
				foot_size:'6px',
			//###safe_mode: (default: 'safe')
			//1) 'safe' mode: can not return the jQuery object of menubar and options
			//
			//2) 'unsafe' mode: allow return Menu bar jQuery object and options
				safe_mode: 'safe',
			//###hide_mode: (default:'notOnMenu')
			//all, onBar, notOnBar,notOnMenu,noHide
			//1)'all': double click on page everywhere to toggle the bar
			//
			//2)'onBar': double click on bar to hide, double click everywhere to show bar
			//
			//3)'notOnBar': double click everywhere except bar to toggle the bar
			//
			//4)'notOnMenu': double click everywhere except click on menu to toggle the bar. (default)
			//
			//5)'noHide': not hide bar at all.
				hide_mode: 'notOnMenu',
			//###warn_size(default:'50px')
			//###warn_color(default:'red')
			//###warn_mode(default:'append')
			//warn() text style is set by options, so it only need one parameter.
			//
			//warn_size is font-size for warn() API,
			//
			//warn_color is the color for warn() API,
			//
			//warn_mode set how warn() add message into the bar.
			//1)'append':append message without new line.(default)
			//
			//2)'log':append message in new line
			//
			//3)'clean':clean the message,only display one warning message.
				warn_size: '50px', 
				warn_color: 'red', 
				warn_mode: 'append', 
				border_radius: '56px',
				bar_bg_color: 'black',
				bar_opacity: '0.8',
				bar_font_color: 'white',
				menu_width: 'auto',
				menu_separator_color: 'black',
				menu_bg_color: '#111111',
				menu_hover_bg_color: '#333333',
				font_family: 'Arial,Helvetica,Sans-Serif',
				menu_font_color: '#EAFFED',
				menu_shadow:'0px 0px 6px 2px black',
				bar_shadow:'6px 0px 6px 2px black',
				msg_click:function(){},
				bar_click:function(){}
            }, options); //options 
			barBuilder.inital_cssManager();//manage all css stylesheet
           
            return this.each(function () {
				_.jqobClean($(this)); //clean this jquery object content and texts
				barBuilder.convert_status_bar($(this));
				barBuilder.init_status_bar($(this), menu_tree_list);
            });
        },
       title: function (title) {
            return this.each(function () {
                $(this).find(STATUS_TITLE).append(title);
            });
        },
        clsTitle: function () {
            return this.each(function () {
                $(this).find(STATUS_TITLE).empty();
            });
        },
		foot: function (text) {
            return this.each(function () {
                $(this).find(STATUS_FOOTER).append(text);
            });
        },
		getArea:function(area){
			var area_map={
				'foot':STATUS_FOOTER,
				'title':STATUS_TITLE,
				'msg':STATUS_MESSAGE,
				'menu':STATUS_MENU
			};
			return $(this).find(area_map[area]);
		},
        clsFoot: function () {
            return this.each(function () {
                $(this).find(STATUS_FOOTER).empty();
            });
        },
        html: function (html) {
            if (arguments.length === 0) {
                return this.find(STATUS_MESSAGE).html();
            } else {
                return this.each(function () {
                    $(this).find(STATUS_MESSAGE).html(html);
                });
            }
        },
        append: function (text) {
            return this.each(function () {
                $(this).find(STATUS_MESSAGE).append(text);
            });
        },
        getSettings: function () {
            return settings;
        }
    };
    // Method calling logic
    $.fn.menubar = function (method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exist on jQuery.menubar');
        }
    };
})(jQuery,window);

//create Helper Bar as Class for the page and provide API of Helper Bar
(function ($,window,undefined) {
    "use strict";
    var _menubar;
    var _settings;
//private method: create a style text for message.	
	var _={
		tag : function (tag, opts) {
			return $('<' + tag + '/>', opts);
		},
		makeTagMsg:function (tag,text,style){
		return style?_.tag(tag).html(text).css(style):_.tag(tag).html(text);
		},
		delUnsafeMethod:function(){
			delete HelperBar.prototype.getMenuBar;
			delete HelperBar.prototype.getSettings;
		},
		set_action_on_bar:function(){
			if($.isFunction(_settings.msg_click)) _menubar.menubar('getArea','msg').on('click',_settings.msg_click);
			if($.isFunction(_settings.bar_click)){
				_menubar.on('click',_settings.bar_click);
				_menubar.menubar('getArea','menu').children().on('click',function(e){
					e.stopPropagation();
				});
			}
		}
	};
	
    function HelperBar(menu_tree_list, options) {
        _menubar = _.tag('div').menubar(menu_tree_list, options);
        _settings = _menubar.menubar('getSettings');
		_.set_action_on_bar();
		if (_settings.safe_mode !== "unsafe") _.delUnsafeMethod();
//Check body is existed or not, if existed, append into body, if not existed, waiting for page fully loaded then append into body.		
		if($('body').size()>0){
			_menubar.appendTo('body');
		}else{
			$(function(){
				_menubar.appendTo('body');
			});
		}
   }
   
//## API of bar (The object of HelperBar)
// ### #API#bar.getMenuBar():		
// (return $object)get jQuery object of menu bar, only can be used in unsafe mode.
	HelperBar.prototype.getMenuBar = function () {
				return _menubar;
            };
// ### #API#bar.getSettings():		
// (return object)get setting/options of menu bar, only can be used in unsafe mode.	
	HelperBar.prototype.getSettings = function () {
				return _settings;
            };

// ### #API#bar.append(text):		
// (return bar) append a text/html in bar message area.		
    HelperBar.prototype.append = function (text) {
        _menubar.menubar('append', text);
        return this;
    };
// ### #API#bar.html(html):		
// (return bar or html code) display text/html in bar message area. previous message will be removed.
//#####msg could be a text, html or jQuery object.
// if parameter give html code, return bar. if no parameter, return the html code on bar.
    HelperBar.prototype.html = function (html) {
        if (arguments.length !== 0) {
            _menubar.menubar('html', html);
            return this;
        } else {
            return _menubar.menubar('html');
        }
    };
// ### #API#bar.addmsg(msg,style):		
// (return bar) add a message wrapped with span tag.
// #####msg could be a text, html or jQuery object.
// #####if style is string, set a 'css:color' to message
// #####if style is object , set a css style to message. this is according $.fn.css(object)
    HelperBar.prototype.addmsg = function (msg, style) {
        if (typeof style === 'string') {
            msg = _.makeTagMsg('span',msg,{color:style});
        } else if (typeof style === 'object') {
            msg = _.makeTagMsg('span',msg,style);
        }
        this.append(msg);
        return this;
    };
// ### #API#bar.msg(msg,style):		
// (return bar) show a message wrapped with span tag. previous message will be removed.
// #####message could be a text, html or jQuery object.
// #####if style is string, set a 'css:color' to message
// #####if style is object of jquery css, set a css style to message.
// if parameter give html/text code, return bar. if no parameter text, return a text of message on the bar
    HelperBar.prototype.msg = function (msg, style) {
        if (arguments.length !== 0) {
            this.cls();
            return this.addmsg(msg, style);
        } else {
            return $(this.html()).text();
        }
    };
	
// ### #API#bar.log(msg):		
// (return bar) append a message wrapped with div tag. 
// #####message could be a text, html or jQuery object.
    HelperBar.prototype.log = function (msg) {
		if(msg===undefined){
			msg='undefined' ;
		}else if(typeof msg !=='string'){
			msg=JSON.stringify(msg);
		}
		msg = _.makeTagMsg('div',msg);
        return this.append(msg);
    };
// ### #API#bar.warn(msg):		
// (return bar) warning a message
// #####message could be a text, html or jQuery object.
// #####pre-set the style in options of bar, so this api only need to pass single parameter
    HelperBar.prototype.warn = function (msg) {
        var style = {
            color: _settings.warn_color,
            'font-size': _settings.warn_size
        };
        if (_settings.warn_mode === 'append') {
            return this.addmsg(msg, style);
        } else if (_settings.warn_mode === 'log') {
            msg = _.makeTagMsg('div',msg,style);
            return this.append(msg);
        } else if (_settings.warn_mode === 'clean') {
			return this.msg(msg, style);
        } else {
            $.error('no this type of warning mode');
        }
    };
// ### #API#bar.clickClsMsg(msg, style,func):		
// (return bar) show a message wrapped with span div. previous message will be removed.
// #####message could be a text, html or jQuery object.
// #####if style is string, set a 'css:color' to message
// #####if style is object of jquery css, set a css style to message.
// if parameter give html/text code, return bar. if no parameter text, return a text of message on the bar	
// This provide a message which could be removed by click.
	HelperBar.prototype.clickClsMsg = function (msg, style,func) {
		if(typeof style  === 'function') func = style;
		
        var message=_.tag('div')
			.html(msg)
			.click(function(){
				$(this).remove();
				if(typeof func === "function") func.call(message);
			});
			
		if(typeof style  === 'number') {
			message.css({'font-size':style});
		}else if(typeof style  === 'string') {
			message.css({'color':style});
		}else if(typeof style  === 'object'){
			message.css(style);
		}else{
			message.css({'font-size':'100%'});
		}
		this.msg(message);
    };
// ### #API#bar.clickClsMsg():		
// (return bar) clean the bar message
    HelperBar.prototype.cls = function () {
        this.html('');
        return this;
    };
// ### #API# bar.title(text):		
// (return bar) append message to title
    HelperBar.prototype.title = function (text) {
		_menubar.menubar('title', text);
		return this;
    };
// ### #API#bar.clsTitle():		
// (return bar) clean title	which appended.
// ##### this will not clean the title
	HelperBar.prototype.clsTitle = function () {
        _menubar.menubar('clsTitle');
        this.title(_settings.bar_title);
        return this;
    };
// ### #API#bar.foot(text):	
// (return bar)	append text in footer 
	HelperBar.prototype.foot = function (text) {
        _menubar.menubar('foot', text);
        return this;
    };
// ### #API#bar.clsFoot(text):
// (return bar) clean text in footer
// #####this method will clean pre_set footer text
	HelperBar.prototype.clsFoot = function () {
        _menubar.menubar('clsFoot');
        return this;
    };
// ### #API#bar.open(url, mode):	
// (return bar) open a url. 
// open a link by give a url. 
//
// mode: new is open link in new window/tab, self is open in current window/tab.
// ##### the mode may not work which is depending on the browser setting.
    HelperBar.prototype.open = function (url, mode) {
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
    HelperBar.prototype.show = function (speed) {
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
    HelperBar.prototype.hide = function (speed) {
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
	HelperBar.prototype.data=function(key,value){
		if(typeof key !=='string') $.error('data() key must be string');
		if(value !== undefined ){////localStorage can save boolean value. need to save false value to storage, so not !!value.
			localStorage.setItem(key, JSON.stringify(value));
			if(this instanceof HelperBar) return this;
		}else{
			try	{
				return JSON.parse(localStorage.getItem(key));
			}
			catch(e)			{
				return localStorage.getItem(key);
			}
		}
	};
//### #API#bar.delData(key,value):		
//(return bar) remove the key with the value from localStorage
//
//#####HelperBar.delData(key,value) is the same, but will not return bar.
	HelperBar.prototype.delData=function(key){
		if(typeof key ==='string'){
			localStorage.removeItem(key);
			if(this instanceof HelperBar) return this;
		}else{
			$.error('delData() has not key or key is not string');
		}
	};

	//menu Builder, this will build a menu tree array which could use for $.fn.menubar.
	//#####this menuBuilder is for internal scope usage, exports(public) API please see HelperBar.menu section.
	var menuBuilder={
		menu_tree_list:[],
	//$.fn.menubar have a root menu item which is essential.
	//however, user can pass a no root menu tree which will transfer a menu item
	//from menu list to root.
		_rebuild_one_menu_tree:function(menu_array){
			var root;
			if(typeof menu_array.root=== 'object') {
				return menu_array;
			}else if(menu_array.root=='first'){
				root = menu_array.list.shift();
			}else if(menu_array.root=='last'||
					!menu_array.root){
				root = menu_array.list.pop();
			}else{
				$.error('no such root config');
			}
			menu_array.root=root;
		},
		//set a menuList for menu builder. 
		set:function(menuList){
			if(!this.hasMenu() ) this.menu_tree_list= $.merge([],menuList);
			else $.error('Menu have been created');
		},
		//reset(empty) menu tree of menu builder.
		reset:function(){
			this.menu_tree_list=[];
		},
		//merge menuList after menu tree list of the menu builder
		merge:function(menuList){	
			$.merge(this.menu_tree_list,menuList);
		},
		//merge menuList before menu tree lsit of the mneu builder
		mergeTo:function(menuList){
			this.menu_tree_list=$.merge($.merge([],menuList),this.menu_tree_list);
		},
		//add a root of the menu tree. this a start or next menu tree.
		addTree:function(title,click,id){
				if (!!title){
				var root = {"title":title,"click":click,"id":id};
				this.menu_tree_list.push({"root":root,"list":[]});
			}else { 
				this.menu_tree_list.push({"list":[]});
			}
		},
		// add menu item on the current tree, until use addTree() start a new menu tree.
		addItem:function(title,click,id){
			if (!!title){
				var item = {"title":title,"click":click,"id":id};
				if (!this.hasMenu()) $.error("no Menu Tree.");
				var list=this.menu_tree_list[this.menu_tree_list.length-1].list;
				list.push(item);
			}else {
				$.error("addMenuItem must pass the title at least");
			}
		},
		// get the menu tree list which did not built.
		get:function(){
			return $.extend(true, [], this.menu_tree_list);
		},
		//check is menu tree list have been ever existed.
		hasMenu:function(){
			return this.menu_tree_list.length >0 ? true:false;
		},
		//build menu array to fit $.menubar menu object,return a built menu tree list.
		build:function(menu_tree_list){
			var menu_tree;
			if(typeof menu_tree_list === 'object' ){
				menu_tree=$.extend(true,[], menu_tree_list);
			}else if(menu_tree_list===true){
				if(this.hasMenu) menu_tree= $.extend(true, [], this.menu_tree_list);
				else $.error('menu is empty');
			}else{
				$.error('build() no such argv.');
			}
	
			for (var menu_tree_index in menu_tree) {
				this._rebuild_one_menu_tree(menu_tree[menu_tree_index]);
			}
			return menu_tree;
		}
	};

    window.HelperBar = (function () {
        var instantiated;

        function init(menu_tree_list, options) {
			var menu_tree_list_for_menu_bar=menuBuilder.build(menu_tree_list);
            return new HelperBar(menu_tree_list_for_menu_bar, options);
        }
		var exports={
//###Helperbar.menu:		
//Helperbar.menu is the the menu builder toolkit,it's contains a set of toolkit to build the menu
			menu:{
//### #API# Helperbar.menu.set(menuList);
//(return Helperbar.menu) set a menu list object into the builder	
				set:function(menuList){
					menuBuilder.set(menuList);
					return this;
				},
//### #API# Helperbar.menu.addTree(title,click,id);
//(return Helperbar.menu) start add a new menu column(tree). if parameter have been give, create a root menu item. if parameter is empty, one of the item in the tree will be root menu item(default is the last item)
				addTree:function(title,click,id){
					menuBuilder.addTree(title,click,id);
					return this;
				},
//### #API# Helperbar.menu.addItem(title,click,id);
//(return Helperbar.menu) add a new menu item in the column(tree).
				
				addItem:function(title,click,id){
					menuBuilder.addItem(title,click,id);
					return this;
				},
//### #API# Helperbar.menu.reset();
//(return Helperbar.menu) clear/reset the menu.				
				reset:function(){
					menuBuilder.reset();
					return this;
				},
//### #API# Helperbar.menu.merge(menuList);
//(return Helperbar.menu) merge a menuList with menu builder's menu list.
//menuList will be appended.
				merge:function(menuList){
					menuBuilder.merge(menuList);
					return this;
				},
//### #API# Helperbar.menu.mergeTo(menuList);
//(return Helperbar.menu) merge a menuList with menu builder's menu list.
//menuList will be prepended.
				mergeTo:function(menuList){
					menuBuilder.mergeTo(menuList);
					return this;
				},
				
//### #API# Helperbar.menu.get();
//(return object) get a menu list object (the object is not built)		
				get:function(){
					return menuBuilder.get();
				},
//### #API# Helperbar.menu.build();
//(return object) get a menu list object (the object have been  built)						
				build:function(){
					return menuBuilder.build(true);
				}
			},
//### #API#Helperbar.getBar(menu_tree_list,options):		
//(return bar) build a entire Helperbar/menubar according the menu tree list object with given options
	
			getBar: function (menu_tree_list, options) {
                if (!instantiated) {
                    instantiated = init(menu_tree_list, options);
                }
                return instantiated;
            },
//### #API#Helperbar.buildBar(options):		
//(return bar) build a entire Helperbar/menubar with given options. this is according the menu setting by the menu builder.
			buildBar:function(options){
				if (!instantiated) {
                    instantiated = init(true, options);
                }
                return instantiated;
			},
//### #API#Helperbar.version():
//(return string) return the Helperbar version information	
            version: function () {
                return HelperBar.prototype.version();
            }
        };
		exports.getbar=exports.getBar;
		exports.data= HelperBar.prototype.data;
		exports.delData= HelperBar.prototype.delData;
		
		return exports;
    })();
	
//### #API#bar.version():
//(return string) return the Helperbar version information	
	HelperBar.prototype.version = function () {
        return '0.4.2b';
    };
})(jQuery,window);
