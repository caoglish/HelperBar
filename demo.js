(function( $ ){
	 "use strict";
	var TXT_ABOUT_INFO='<strong>Helper Bar Framework[Version:'+HelperBar.version()+']<br/>Jquery[Version:'+$().jquery+']<br/>Designer: Caoglish</strong>';
	//Menu bar setup
	var menuTreeFunction={
		'root':{'id':'menu-function','title':'function'},
		'list':[
			{'id':'mi-gotop','title':'go top','click':go_top},
			{'id':'mi-gobottom','title':'go bottom','click':go_bottom},
			{'id':'mi-refresh','title':'page refresh','click':page_reload}
		]
	}
	var menuTreeDemo={
		'root':{'id':'menu-demo','title':'API Demo'},
		'list':[
			{'id':'mi-show-message-on-bar','title':'Show Message => bar.msg(text)','click':show_msg_demo},
			{'id':'mi-show-color-message-on-bar','title':'Show Color Message => bar.msg(text,color)','click':show_color_msg_demo},
			{'id':'mi-show-style-message-on-bar','title':'Show Style Message => bar.msg(text,style)','click':show_style_msg_demo},
			{'id':'mi-warning','title':'warning => bar.warn(text)','click':warning_demo},
			{'id':'mi-log','title':'log => bar.log(text)','click':log_demo},
			{'id':'mi-alert-demo','title':'get msg on the bar => bar.msg()','click':alert_demo},
			{'id':'mi-alert-html-demo','title':'get html on the bar => bar.html()','click':alert_html_demo},
			{'id':'mi-add-message','title':'add msg demo => bar.addmsg(text,style)','click':add_msg_demo},
			{'id':'mi-html','title':'html demo => bar.html(html)','click':html_demo},
			{'id':'mi-append','title':'append msg => bar.append(html)','click':append_demo},
			{'id':'mi-chaining','title':'chaining Demo','click':chaining_demo},
			{'id':'mi-title','title':'append title =>bar.title(text)','click':title_demo},
			{'id':'mi-cls-title','title':'clear title =>bar.clsTitle(text)','click':cls_title_demo},
			{'id':'mi-cls-message','title':'clear msg => bar.cls()','click':cls_msg_demo}
		]
	}
	var menuTreeAbout={
		'root':{'id':'mi-about','title':'about','click':about},
		'list':[]
	}
	var menuTreeList=[menuTreeFunction,menuTreeDemo,menuTreeAbout];

	var opts={
			bar_title:'Helper Bar Demo',
			menu_width:'230px',
			warning_size:'50px',
			warning_color:'red',
			warning_mode:'append',
			//hide_mode:'notOnBar',
			//safe_mode:'safe',
			menubar_style:{
				background_color:'black',
				opacity:'0.8',
				font_color:'white'
			},
			menubar_items_style:{
				background_color:'#111111' ,
				hover_background_color:'#333333',
				font_color:'#EAFFED'
		}};
	
	$(run);
	function run(){
		window.bar = HelperBar.getbar(menuTreeList,opts)//singleton start
		demo_interface();
		bar.title('abc');
		bar.clsTitle();
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
		bar.clsTitle().title(create_title('bar.msg(text)'));
		bar.msg('bar.msg(text): message demo');
	}

	function show_color_msg_demo(){
		bar.clsTitle().title(create_title('bar.msg(text,color)'));
		bar.msg('bar.msg(text,color):color message demo','green');
	}

	function show_style_msg_demo(){
		bar.clsTitle().title(create_title('bar.msg(text.style)'));
		bar.msg('bar.msg(text.style)style message demo',{color:'red','font-size':'50px'});
	}

	function log_demo(){
		bar.clsTitle().title(create_title('bar.log(text)'));
		bar.log('bar.log(text):log demo');
	}

	function warning_demo(){
		bar.clsTitle().title(create_title('bar.warn(text)'));
		bar.warn('!!bar.warn(text): warning demo!!');
	}

	function alert_demo(){
		bar.clsTitle().title(create_title('bar.msg()'));
		alert('bar.msg():get message on Bar: ' + bar.msg());
	}

	function alert_html_demo(){
		bar.clsTitle().title(create_title('bar.html()'));
		alert('bar.html():get message on Bar: ' + bar.html());
	}

	function cls_msg_demo(){
		bar.clsTitle().title(create_title('bar.cls()'));
		bar.cls();
	}

	function add_msg_demo(){
		bar.clsTitle().title(create_title('bar.addmsg(text)'));
		var msg='add msg demo<br/>';

		bar.addmsg('bar.msg(text):'+msg);
		bar.addmsg('bar.msg(text,color):'+msg,'yellow');
		bar.addmsg('bar.msg(text,style):'+msg,{color:'skyblue','font-size':'50px'});
	}

	function html_demo(){
		bar.clsTitle().title(create_title('bar.html(html)'));
		bar.html('<strong style="font-size:x-large;">bar.html(html):</strong> <span style="color:yellow;">html demo<span>');
	}

	function append_demo(){
		bar.clsTitle().title('[<span style="color:green"><b>bar.append(html)</b></span>]');
		bar.append('<div><strong style="color:skyblue;font-size:x-large;">bar.append(html):</strong> <span style="color:orange;">append demo<span></div>');
	}
	
	function chaining_demo(){
		bar.clsTitle().title('[<span style="color:green"><b>Chainging Style Demo</b></span>]').cls()
			.html('<span style="color:red;"><b>Chainging Style Like:</b></span>')
			.append('<strong style="font-size:x-large;">bar.cls().html(html).append(html).addmsg(text,style):</strong>')
			.append('<br/>').append('<br/>')
			.addmsg('<div><strong>chaining method: return <span style="color:red;font-size:x-large;"><b>bar</b></span> itself.</strong></div>','green')
			.append($.tag('h1').text('chaining methods:'))
			.append('<ul>')
			.addmsg('<li>html(html)</li>','green')
			.addmsg('<li>append(html)</li>','yellow')
			.addmsg('<li>warn(html)</li>','red')
			.log('<li>log(text)</li>')
			.addmsg('<li>msg(html,style)</li>',{'font-size':'30',color:'olive'})
			.addmsg('<li>addmsg(html,style)</li>','skyblue')
			.msg(bar.html()+'<li>title(text)</li>')
			.addmsg('<li>cls(html)</li>','orange')
			.append('</ul>')
			.title('')
			.warn('<br/> check the demo source code: chaining_demo() ');
			;
	}
	
	function cls_title_demo(){
		bar.clsTitle();
	}
	
	function title_demo(){
		bar.title(create_title('bar.title(text)'));
	}

	function about(){
		bar.clsTitle().cls().title(create_title('about'));
		var text=$.tag('div',{style:'color:white'})
			.html(TXT_ABOUT_INFO)
			.click(function(){
				$(this).remove();
				bar.cls().clsTitle();
			});;
		bar.msg(text);

	}
	
	function create_title(title){
		return '[<span style="color:green"><b>'+title+'</b></span>]';
	}
	
	function demo_interface(){
		$.tag('div',{id:'helperbar-demo'}).appendTo('body').html($.tag('h1').text('Helper Bar API Demo Button(no included in framework)').css('color','yellow')).css({opacity: '0.5',width:'100%',position:'fixed',top:0,background:'black'});
		$.tag('button').prependTo('#helperbar-demo').text('hide()').click(function(){
			bar.hide();
		});
		$.tag('button').prependTo('#helperbar-demo').text('show()').click(function(){
			bar.show();
		});
		$.tag('button').prependTo('#helperbar-demo').text('hide("slow")').click(function(){
			bar.hide('slow');
		});
		$.tag('button').prependTo('#helperbar-demo').text('show("slow")').click(function(){
			bar.show('slow');
		});
	}
})( jQuery );
