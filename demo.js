(function () {
    "use strict";
    window.optSet = (function () {
        var ITEM_OPTSET = 'HelperBar_optset';
        return {
            set: function (opt) {
                HelperBar.data(ITEM_OPTSET, opt);
            },
            init: function (opt) {
                HelperBar.data(ITEM_OPTSET);
                var value = opt || 0;
                this.set(value);
            },
            get: function () {
                return HelperBar.data(ITEM_OPTSET);
            }
        };
    })();
}());

(function( $ ){
	"use strict";
	
	var bar; 
	$.tag = function (tag, opts) {
			return $('<' + tag + '/>', opts);
		}
	var TXT_ABOUT_INFO='<strong>Helper Bar Framework[Version:'+HelperBar.version()+']<br/>Jquery[Version:'+$().jquery+']<br/>Designer: Caoglish</strong>';

	//Menu bar setup
	var menuTreeFunction={
		'root':'first',
		'list':[
			{'title':'function'},
			{'title':'go top','click':go_top},
			{'title':'go bottom','click':go_bottom},
			{'title':'mouse position','click':mouse_position},
			{'title':'page refresh','click':page_reload}
		]
	};
	var menuTreeDemo={
		'root':{'id':'mi-API-Demo','title':'API Demo'},
		'list':[
			{'title':'Show Message => bar.msg(text)','click':show_msg_demo},
			{'title':'Show Color Message => bar.msg(text,color)','click':show_color_msg_demo},
			{'title':'Show Style Message => bar.msg(text,style)','click':show_style_msg_demo},
			{'title':'warning => bar.warn(text)','click':warning_demo},
			{'title':'log => bar.log(text)','click':log_demo},
			{'title':'get msg on the bar => bar.msg()','click':alert_demo},
			{'title':'get html on the bar => bar.html()','click':alert_html_demo},
			{'title':'add msg demo => bar.addmsg(text,style)','click':add_msg_demo},
			{'title':'html demo => bar.html(html)','click':html_demo},
			{'title':'append msg => bar.append(html)','click':append_demo},
			{'title':'open url =>bar.open(url)','click':open_url_demo},
			{'title':'chaining Demo','click':chaining_demo},
			{'title':'append title =>bar.title(text)','click':title_demo},
			{'title':'append foot =>bar.foot(text)','click':foot_demo},
			{'title':'clear title =>bar.clsTitle(text)','click':cls_title_demo},
			{'title':'clear foot =>bar.clsFoot(text)','click':cls_foot_demo},
			{'title':'clear msg => bar.cls()','click':cls_msg_demo}
		]
	};
	
	var menuOptionsDemo={
		'list':[
			{'title':'default(no custom options)','click':opt_default_demo},
			{'title':'custom(black)','click':opt_customize_black_demo},
			{'title':'custom(pink)','click':opt_customize_pink_demo},
			{'title':'custom(blue)','click':opt_customize_blue_demo},
			{'title':'custom options demo'}
		]
	};
	
	var menuTreeAbout={
		'root':{'title':'about','click':about}
	};
	var menuTreeList=[menuTreeFunction,menuTreeDemo,menuOptionsDemo,menuTreeAbout];
	var Menu_Tree_array=HelperBar.menu
			.set(menuTreeList)
			.reset()
			.addTree()
			.addItem('1.1',function(){bar.log('addMenuItem1.1');})
			.addItem('1.2',function(){bar.log('addMenuItem1.2');})
			.addItem('1.3',function(){bar.log('addMenuItem1.3');})
			.addTree('root-addMenuTree(title,click)',function(){console.log('addMenuTree');})
			.addItem('2.1',function(){bar.log('addMenuItem2.1');})
			.addItem('2.2',function(){bar.log('addMenuItem2.2');})
			.addItem('2.3',function(){bar.log('addMenuItem2.3');})
			.merge(menuTreeList)
			.mergeTo(menuTreeList)
			.get();

	HelperBar.menu.get().shift();
	HelperBar.menu.get().shift();

	var optsDefault={};
	var opts1={
				bar_title:'Helper Bar Demo(black)',
				bar_foot:'verions:'+HelperBar.version(),
				foot_mode:'show',
				foot_size:'8px',
                safe_mode: 'unsafe',
                //hide_mode: 'notOnMenu',
                hide_mode: 'rightClick',
				//hide_mode: 'rightDblClick',
				hide_effect:'slide',
				border_radius: '86px',
                warn_size:'32px',
				warn_color:'yellow',
				warn_mode:'log',
                bar_bg_color: 'black',
                bar_opacity: '0.8',
                bar_font_color: 'white',
				menu_show_effect:'slide',
				menu_width:'auto',
                menu_bg_color: '#111111',
                menu_hover_bg_color: '#333333',
                menu_font_color: '#EAFFED',
				menu_separator_color: 'black',
				msg_click:function(){
					//console.log(this);
					this.cls().clsTitle();
				},
				warn_callback:function($msg,msg,style){
					this.addmsg('more....');
				}
		};
		
		var opts2={
				bar_title:'Helper Bar Demo(Pink)',
				bar_foot:'verions:'+HelperBar.version(),
				foot_mode:'show',
				foot_size:'8px',
                safe_mode: 'safe',
                hide_mode: 'notOnMenu',
				border_radius: '86px',
                warn_size:'32px',
				warn_color:'black',
				warn_mode:'log',
                bar_bg_color: 'pink',
                bar_opacity: '0.8',
                bar_font_color: '#005500',
				menu_width:'230px',
                menu_bg_color: '#ff00cc',
                menu_hover_bg_color: '#ff33cc',
                menu_font_color: 'yellow',
				menu_separator_color: 'yellow',
				font_family:'MuseoLight,Arial,Helvetica,Sans-Serif',
				bar_click:function(){this.cls().clsTitle();}
		};
		
		var opts3={
			bar_title:'Helper Bar Demo(blue)',
			bar_foot:'Blue Theme Demo',
			foot_size:'86px',
			foot_mode:'hide',
			menu_width:'260px',
			border_radius: '10px',
			bar_bg_color: 'blue',
			bar_font_color: 'gray',
			menu_bg_color: 'Navy',
			menu_font_color: 'yellow',
			menu_hover_bg_color: 'gray',
			menu_separator_color: 'green',
			warn_callback:function($msg,msg,style){
					this.addmsg('more....');
				}
		};
		var optionsList=[optsDefault,opts1,opts2,opts3];
	$(run);
	
	
	function go_top(){
			$('html, body').animate({ scrollTop: 0 }, 'slow');
		}
	function go_bottom(){
			$('html, body').animate({ scrollTop: $(document).height() }, 'slow');
		}
	function page_reload(){
		location.reload();
	}

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
	}
	
	function cls_title_demo(){
		bar.clsTitle();
	}
	
	function title_demo(){
		bar.title(create_title('bar.title(text)'));
	}
	
	function open_url_demo(){
		bar.clsTitle().title(create_title('bar.open(url,mode)'));
		bar.open('http://www.google.com','new');
	}
	
	function foot_demo(){
		bar.foot('footer:').foot(create_title('bar.foot(text)'));
	}
	
	function cls_foot_demo(){
		bar.clsFoot();
	}
	
	//options demo
	function opt_default_demo(){
		optSet.set(0);
		location.reload();
	}
	
	function opt_customize_black_demo(){
		optSet.set(1);
		location.reload();
	}
	
	function opt_customize_pink_demo(){
		optSet.set(2);
		location.reload();
	}
	
	function opt_customize_blue_demo(){
		optSet.set(3);
		location.reload();
	}
	//about 
	function about(){
		bar.clsTitle().cls().title(create_title('about'));
		bar.msg(TXT_ABOUT_INFO,{'font-size':'28px'},function($msg){
			$msg.on('click',function(){
				$msg.remove();
				bar.cls().clsTitle();
			});
		});
	}
	
	var mp_handler=function (e){ bar.clsFoot().foot("[X: " + e.pageX + "][Y: " + e.pageY+']');};
	function mouse_position(){
		var mouse_position_on = $.data(document,'toggle')||'0';
		if(mouse_position_on ==='1'){
			$(document).off('mousemove',mp_handler);
			$.data(document,'toggle','0');
			bar.clsFoot();
		}else{
			$(document).on('mousemove',mp_handler);
			$.data(document,'toggle','1');
		}
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

	function run(){
		HelperBar.fn.test=function(text){
			this.addmsg(text,'green',function($msg){
				$msg.hover(function(){
					$(this).css('color','yellow');
				},function(){
					$(this).css('color','blue');
				});
			});
		}
	
		if(optSet.get()===undefined||optSet.get()===null){
			optSet.init(1);
		}
		//bar = HelperBar.getbar(Menu_Tree_array,optionsList[optSet.get()]);//singleton start
		bar = HelperBar.getbar(menuTreeList,optionsList[optSet.get()]);//singleton start
		//bar = HelperBar.buildBar(optionsList[optSet.get()]);//singleton start
		demo_interface();
		//bar=undefined;
		//HelperBar.buildBar(optionsList[3]);
		//bar.destroy();
		//HelperBar.getbar(menuTreeList,optionsList[3]);//singleton start
		//bar.test();
		// bar.msg($.tag('div').text('hello,wolrd.'),'red',function($msg,msg,style){
			// console.log($msg);
			// console.log(msg);
			// console.log(style);
			// this.addmsg(msg.clone(),function($msg,msg){bar.addmsg($msg.clone())});
		// });
		bar.warn('hello,world');
		bar.msg('hellow,world',function(){
			this.addmsg('hahaha.....');
		});
		// bar.clickClsMsg('abc');
		// bar.addmsg('hello,world',function($msg){
			// $msg.css('color','red');
			
		// });
		
		// bar.test('click cls msg');
		//bar.cache('abc',{a:'hello,world',1:'ede'});
		//bar.cache('abc',null);
		//bar.log(bar.cache('abc'));
		
		// $('div').eq(1).data('abc',{a:'hello,world',1:'ede'});
		// $('div').eq(1).data('abc',null);
		// bar.log($('div').eq(1).data('abc'));
		
		// bar.destroy();
		// HelperBar.buildBar();
		// bar.log(bar.cache('abc'));
		
	}
})( jQuery );