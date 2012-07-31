var TXT_ABOUT_INFO='<strong>Helper Bar Framework.<br/> Version:'+HelperBar.prototype.version()+'<br/>Designer: Caoglish</strong>';
//Menu bar setup
var menu_tree_1={
	'root':{'id':'menu-function','title':'function','click':function(){}},
	'list':[
		{'id':'mi-gotop','title':'go top','click':go_top},
		{'id':'mi-gobottom','title':'go bottom','click':go_bottom},
		{'id':'mi-refresh','title':'page refresh','click':page_reload}
	]
}
var menu_tree_2={
	'root':{'id':'menu-demo','title':'demo','click':function(){}},
	'list':[
		{'id':'mi-show-message-on-bar','title':'Show Message','click':show_msg_demo},
		{'id':'mi-show-color-message-on-bar','title':'Show Color Message','click':show_color_msg_demo},
		{'id':'mi-show-style-message-on-bar','title':'Show Style Message','click':show_style_msg_demo},
		{'id':'mi-warning','title':'warning','click':warning_demo},
		{'id':'mi-log','title':'log','click':log_demo},
		{'id':'mi-alert-demo','title':'get current msg on the bar','click':alert_demo},
		{'id':'mi-add-message','title':'add msg demo','click':add_msg_demo},
		{'id':'mi-cls-message','title':'clear msg','click':cls_msg_demo},
	]
}
var menu_tree_3={
	'root':{'id':'mi-about','title':'about','click':about},
	'list':[]
}
var menu_tree_list=[menu_tree_1,menu_tree_2,menu_tree_3];

opts={
		bar_title:'Helper Bar Demo',
		menu_width:'140px',
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
	}};


var bar;
$(run);
function run(){
	bar = new HelperBar(menu_tree_list,opts);
}

function go_top(){
		$('html, body').animate({ scrollTop: 0 }, 'slow');
	};
function go_bottom(){
		
		$('html, body').animate({ scrollTop: $(document).height() }, 'slow');
	};
function page_reload(){
	location.reload();
};

//demo
function show_msg_demo(){
	bar.msg('message demo');
}

function show_color_msg_demo(){
	bar.msg('color message demo','green');
}

function show_style_msg_demo(){
	bar.msg('style message demo',{color:'red','font-size':'50px'});
}

function log_demo(){
	bar.log('log demo');
}

function alert_demo(){
	alert('get message on Bar: ' + bar.msg());
}

function cls_msg_demo(){
	bar.cls();
}

function add_msg_demo(){
	var msg='<div>add msg demo</div>';
	bar.addmsg(msg);
	bar.addmsg(msg,'yellow');
	bar.addmsg(msg,{color:'skyblue','font-size':'50px'});
}

function about(){
	var text=$.tag('div',{style:'color:white'}).html(TXT_ABOUT_INFO);
	bar.msg(text);
	opts={bar_title:'Helper Bar Recreating'};
	bar =new HelperBar(menu_tree_list,opts);
	
}

function warning_demo(){
	bar.warn('!!warning demo!!');
}

