/*
development framework, add a useful and functional menu bar in the page.
@version     0.2.4
*/

//$.fn.menubar jquery plugin, create a menubar 
(function( $ ){
	//core of menubar
	var STATUS_BAR='#status-bar';
	var STATUS_MENU='#status-menu';
	var LIST_MENU="#list-menu";
	var STATUS_MESSAGE='#status-message';
	var STATUS_TITLE='#status-title';
	
	//(start)Jquery plugin development framework.
	var settings;
	var tag_a_css;
	var methods = {
		init : function( menu_tree_list ,options ) {
		
			 settings= $.extend( true,{
								bar_title:'Menu Bar',
								menu_width:'100px',
								warning_size:'50px',
								warning_color:'red',
								menubar_style:{
									background_color:'black',
									opacity:'0.8',
									font_color:'white',
								},
								menubar_items_style:{
									background_color:'#111111' ,
									hover_background_color:'#333333',
									font_color:'#EAFFED',
							}}, options);//options 
							
			tag_a_css={display: 'block',
					padding: '5px 12px',
					'text-decoration': 'none',
					width: settings.menu_width,
					color: settings.menubar_items_style.font_color,
					'white-space': 'nowrap'};	//tag a style sheet.

			return this.each(function(){
					jqob_clean.call($(this));//clean this jquery object content and texts
					convert_status_bar.call($(this));
					init_status_bar.apply($(this),menu_tree_list);
			});
		},
		
		title:function(title){
			return this.each(function(){
					$(this).find(STATUS_TITLE).append(title);
			});
		},
		
		html:function(html){
			if( arguments.length == 0){
				return this.find(STATUS_MESSAGE).html();
			}else{
				return this.each(function(){
							$(this).find(STATUS_MESSAGE).html(html);
					});
			}
		},
		
		append:function(text){
			return this.each(function(){
					$(this).find(STATUS_MESSAGE).append(text);
			});
		},
		getSettings:function(){
			return settings;
		}
	};
	
	$.fn.menubar = function( method ) {
		 // Method calling logic
		if ( methods[method] ) {
		  return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else if ( typeof method === 'object' || ! method ) {
		  return methods.init.apply( this, arguments );
		} else {
		  $.error( 'Method ' +  method + ' does not exist on jQuery.menubar' );
		}    
	};
	//(end)Jquery plugin development framework.
	//----------------
	
	//string methods 
	String.prototype.strip= function(){
		var patt=/^#|^\./;
		return this.replace(patt,'');
	};
	
	//jquery tag maker
	$.tag=function(tag,opts){
		return  $('<'+tag+'/>',opts);
	};
	
	//Menubar ui Maker
	function jqob_clean()
	{
		jqob = this;
		jqob.html('')
			.text('')
			.attr('id','')
			.attr('class','')
			.attr('style','');
	}
	
	function convert_status_bar()
	{	
		this.attr('id',STATUS_BAR.strip())
			.css({
				'position':'fixed',
				'background-color':settings.menubar_style.background_color,
				'color':settings.menubar_style.font_color,
				'bottom':'0',
				'right':'0',
				'opacity':settings.menubar_style.opacity,
				'border-radius':'8px',
				'padding-left':'2px',
				'margin-left':'1px',
				'width':'100%',
				'text-align':'left'
				});//create status bar//css: #status-bar

		var div_status_title=$.tag('div',{id:STATUS_TITLE.strip()}); //create status title area
		var div_status_message=$.tag('div',{id:STATUS_MESSAGE.strip()}); //create status message area
		
		this.append(div_status_title)
			.append(div_status_message)
			.append(create_status_menu());
	}
	
	//status menu
	function create_status_menu(){
		var div_status_menu=$.tag('div',{id:STATUS_MENU.strip()});//create status menu
		var ul_list_menu=$.tag('ul',{id:LIST_MENU.strip()});//create menu list
		ul_list_menu.css({	margin: 0,
							padding: 0});//css: #status-menu ul
		div_status_menu.append(ul_list_menu);//construct status bar
		return div_status_menu;
	}
	
	function create_root_menu_item(id,title,callback){
		var tag_a=$.tag('a',{id:id,href:'#',text:title}).click(function(event){
			event.preventDefault();
			if(callback) callback.apply();
		});
		
		tag_a	.css(tag_a_css)
				.css({background:settings.menubar_items_style.background_color})
				.hover(	function(){$(this).css({background:settings.menubar_items_style.	hover_background_color})},
					function(){$(this).css({background:settings.menubar_items_style.background_color})});//css:#status-menu ul li a

		var root_menu_item=$.tag('li')
							.css({float: 'left',
									'list-style': 'none',
									font: '12px Tahoma, Arial',
									'z-index':'100'})//css:#status-menu ul li
							.append(tag_a);
		return root_menu_item;
	};
	
	function create_menu_item(id,title,callback){
		var menu_item=$.tag('li');
		 menu_item.css({float: 'none',display: 'inline',margin:'0px'});//css:#status-menu ul li ul li
		var tag_a=$.tag('a',{id:id,href:'#',text:title}).click(function(event){
			event.preventDefault();
			if(callback) callback.apply();
		});
		tag_a.css(tag_a_css)
				.css({background:settings.menubar_items_style.background_color})
				.css({'border-bottom': '1px solid white'})
				.hover(	function(){$(this).css({background:settings.menubar_items_style.	hover_background_color})},
					function(){$(this).css({background:settings.menubar_items_style.background_color})});//css:#status-menu ul li ul li a
			;//css
		menu_item.append(tag_a);
		return menu_item;
	};
	
	//root_menu must have attribute of id,title,click[function]
	function construct_root_menu(root_menu){
		return create_root_menu_item(root_menu.id,root_menu.title,root_menu.click);
	}

	function construction_menu(menu_list)
	{
		var tag_ul=$.tag('ul');
		tag_ul.hide().css({margin: '0',
					padding: '0',
					position: 'absolute',
					bottom:'23px',
					'z-index':'100'});//css:#status-menu ul li ul
		for(menu in menu_list)		{
			var id=menu_list[menu].id;
			var title=menu_list[menu].title;
			var click=menu_list[menu].click;
			tag_ul.append(create_menu_item(id,title,click));
		}
		return tag_ul;
	};
	
	function construct_one_menu_tree (menu_array)	{
		var one_menu_tree=construct_root_menu(menu_array.root).append(construction_menu(menu_array.list));
		//hover to show and hide the menu items.
		one_menu_tree.hover(function(){
					$(this).find('ul').slideDown();
			},	function(){
					$(this).find('ul').slideUp();
			});
		return one_menu_tree;
	};

	//have a parameter menu_tree_list
	function init_status_bar (){
		menu_tree_list=arguments;//get parameter
		jqob_menubar=this;
		//set the status menu will show on mouse over the statusbar, hide on mouse out
		jqob_status_menu=jqob_menubar.find(STATUS_MENU);
		jqob_menubar.hover(function(){
				jqob_status_menu.show();
			},function(){
				jqob_status_menu.hide('slow');
			});
		for(menu_tree in menu_tree_list){
			construct_one_menu_tree(menu_tree_list[menu_tree]).appendTo(this.find(LIST_MENU));
		}
		//initalize the default appearance of the status bar
		jqob_status_menu.hide();
		jqob_menubar.menubar('title',settings.bar_title);
		$(document).dblclick(function(){
			jqob_menubar.toggle();
		});
	};
})( jQuery );

//create Helper Bar as Class for the page
//provide API of Helper Bar
(function($){
	//menubar
	function HelperBar(menu_tree_list,options){
		this._menubar=$.tag('div').appendTo('body').menubar(menu_tree_list,options);
		this._settings=this._menubar.menubar('getSettings');
	};
	
	HelperBar.prototype.append = function(text){
		this._menubar.menubar('append',text);
	}
	
	HelperBar.prototype.html =function(html){
	    if(arguments.length != 0){
			this._menubar.menubar('html',html);
		}else{
			return this._menubar.menubar('html');
		}
	}
	
	HelperBar.prototype.addmsg=function(msg,style){
		if(typeof style === 'string'){
			msg=$.tag('span',{style:'color:'+style}).html(msg);
		}else if(typeof style === 'object'){
			msg=$.tag('span').css(style).html(msg);
		}
			this.append(msg);
	}
		
	HelperBar.prototype.msg=function(msg,style){
		if(arguments.length != 0)
		{
			this.cls();
			this.addmsg(msg,style);
		}else{
			return $(this.html()).text();
		}
	}
	
	HelperBar.prototype.log=function(msg){
		msg=$.tag('div').html(msg);;
		this.addmsg(msg);
	}
	
	HelperBar.prototype.warn=function(msg){
		var style={color:this._settings.warning_color,'font-size':this._settings.warning_size};
		this.addmsg(msg,style);
	}
	
	HelperBar.prototype.cls=function(){
		this.html('');
	}
		
	HelperBar.prototype.title=function(msg){
		this._menubar.menubar('title',msg);
	}
	
	HelperBar.prototype.version = function(){
		return '0.2.4';
	}
	
	window.HelperBar =(function(){
			var instantiated;
			function init(menu_tree_list,options){
				return new HelperBar(menu_tree_list,options);
			}
			
			return {
					getbar:function(menu_tree_list,options){
							if (!instantiated){
								instantiated = init(menu_tree_list,options);
							}
							return instantiated; 
						},
					version:function(){
						return HelperBar.prototype.version();
					}
			}
	})();;
})( jQuery );