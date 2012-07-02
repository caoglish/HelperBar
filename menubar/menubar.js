/*
**data strcture for the menu tree
var menu_tree_1={
	'root':{'id':'menu-function','title':'function','click':function(){}},
	'list':[
		{'id':'mi-gotop','title':'go top','click':go_top},
		{'id':'mi-gobottom','title':'go bottom','click':go_bottom},
		{'id':'mi-refresh','title':'page refresh','click':page_reload}
	]
}
var menu_tree_list1=[menu_tree_1];

** api: 
*1. $.showMessage(msg);
*2. $.tag(tag,options)
*3.
*/



(function( $ ){ 
	var STATUS_BAR='#status-bar';
	var STATUS_MENU='#status-menu';
	var LIST_MENU="#list-menu";
	var STATUS_MESSAGE='#status-message';
	
	//string methods 
	String.prototype.strip= function(){
		var patt=/^#|^\./;
		return this.replace(patt,'');
	}
	
	$.tag=function(tag,opts){
		return  $('<'+tag+'/>',opts);
	}
	
	$.addStyle=function(style){
		var style_area=$('style','head');
		if(style_area.size()>0){
			
			style_area.last().append(style);;
		
		}else{
			console.log(style_area.size());
			style_area=$.tag('style',{type:"text/css"}).appendTo('head');
			style_area.last().append(style);
		}
	}

	$.addMenuBarStylesheet=function (){
		$.addStyle('#status-menu ul{margin: 0;	padding: 0}');
		$.addStyle('#status-menu ul li{float: left;list-style: none;font: 12px Tahoma, Arial;z-index:9;}');
		$.addStyle('#status-menu ul li a{display: block;background:#333333;padding: 5px 12px;text-decoration: none;	;width: 70px;color: #EAFFED;white-space: nowrap}');
		$.addStyle('#status-menu ul li > a:hover{	background: #111111;}');
		$.addStyle('#status-menu ul li ul{margin: 0;padding: 0;position: absolute;bottom:23px;display:none;;z-index:8;}');
		$.addStyle('#status-menu ul li ul li{float: none;display: inline;margin:0px;}');
		$.addStyle('#status-menu ul li ul li a{width: auto;background: #444444;width: 70px;border-bottom: 1px solid white;}');
		$.addStyle('#status-menu ul li ul li a:hover{background: #111111}');
	}
	
	$.createRootMenuItem=function(id,title,callback){
		var tag_a=$.tag('a',{id:id,href:'#',text:title}).click(function(event){
			event.preventDefault();
			if(callback) callback.apply();
		});

		var root_menu_item=$.tag('li').append(tag_a);
		return root_menu_item;
	}

	$.createMenuItem=function(id,title,callback){
		var menu_item=$.tag('li');
		var tag_a=$.tag('a',{id:id,href:'#',text:title}).click(function(event){
			event.preventDefault();
			if(callback) callback.apply();
		});
		menu_item.append(tag_a);
		return menu_item;
	}

	//status bar
	$.statusBar = function () {
		var div_status_bar=$.tag('div',{id:STATUS_BAR.strip()}).css({
				'position':'fixed',
				'background-color':'black',
				'color':'white',
				'bottom':'0',
				'right':'0',
				'opacity':'0.8',
				'border-radius':'8px',
				'padding-left':'2px',
				'margin-left':'1px',
				'width':'100%'
				});;//create status bar

		var div_status_message=$.tag('div',{id:STATUS_MESSAGE.strip()}); //create status message area
		div_status_bar.append(div_status_message).append($.statusMenu());//construct status bar
		return div_status_bar;
	}

	//status menu
	$.statusMenu = function () {
		var div_status_menu=$.tag('div',{id:STATUS_MENU.strip()});//create status menu
		var ul_list_menu=$.tag('ul',{id:LIST_MENU.strip()});//create menu list
		div_status_menu.append(ul_list_menu);//construct status bar
		return div_status_menu;
	}

	$.constructRootMenu = function (root_menu){
		return $.createRootMenuItem(root_menu.id,root_menu.title,root_menu.click);
	}

	$.constructionMenu= function(menu_list)
	{
		var tag_ul=$.tag('ul');
		for(menu in menu_list)		{
			var id=menu_list[menu].id;
			var title=menu_list[menu].title;
			var click=menu_list[menu].click;
			tag_ul.append($.createMenuItem(id,title,click));
		}
		return tag_ul;
	}

	$.constructOneMenuTree=function (menu_array)	{
		var one_menu_tree=$.constructRootMenu(menu_array.root).append($.constructionMenu(menu_array.list));
		//hover to show and hide the menu items.
		one_menu_tree.hover(function(){
					$(this).find('ul').slideDown();
			},	function(){
					$(this).find('ul').slideUp();
			});
		return one_menu_tree;
	}

	 $.init_status_bar=function(menu_tree_list){
		 $.addMenuBarStylesheet();//create the style sheets
		//generate status bar on document.
		//set the status menu will show on mouse over the statusbar, hide on mouse out
		$.statusBar().appendTo('body')
				.hover(function(){
						$(STATUS_MENU).show();
					},function(){
						$(STATUS_MENU).hide('slow');
					});
		for(menu_tree in menu_tree_list){
			$.constructOneMenuTree(menu_tree_list[menu_tree]).appendTo(LIST_MENU);;
		}
		//initalize the default appearance of the status bar
		$(STATUS_MENU).hide();
		$.showMessage('Menu bar');
		$(document).dblclick(function(){
			$(STATUS_BAR).toggle();
		});
	}
	
	$.menubar=function(menu_tree_list){
		$.init_status_bar(menu_tree_list);
	}
	
	$.showMessage=function(msg){
		return $(STATUS_MESSAGE).append(msg);
	}

})( jQuery );


