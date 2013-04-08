(function (window,undefined) {
    "use strict";
    window.optSetter = (function () {
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
})(window);

(function( $,undefined ){
	"use strict";
	
	var bar; 
	$.tag = HelperBar.tag;
	var TXT_ABOUT_INFO='<strong>Helper Bar Framework[Version:'+HelperBar.version()+']<br/>Jquery[Version:'+$().jquery+']<br/>Designer: Caoglish</strong>';

	//Menu bar setup
	HelperBar.menu.addTree()
						.addItem('go top',go_top)
						.addItem('go bottom',go_bottom)
						.addItem('mouse position',mouse_position)
						.addItem('page refresh',page_reload)
						.addItem('function')
					.addTree('API Demo')
						.addItem('Show Message => bar.msg(text)',show_msg_demo)
						.addItem('Show Color Message => bar.msg(text,color)',show_color_msg_demo)
						.addItem('Show Style Message => bar.msg(text,style)',show_style_msg_demo)
						.addItem('warning => bar.warn(text)',warning_demo)
						.addItem('log => bar.log(text)',log_demo)
						.addItem('get msg on the bar => bar.msg()',alert_demo)
						.addItem('get html on the bar => bar.html()',alert_html_demo)
						.addItem('add msg demo => bar.addmsg(text,style)',add_msg_demo)
						.addItem('html demo => bar.html(html)',html_demo)
						.addItem('append msg => bar.append(html)',append_demo)
						.addItem('open url =>bar.open(url)',open_url_demo)
						.addItem('chaining Demo',chaining_demo)
						.addItem('append title =>bar.title(text)',title_demo)
						.addItem('append foot =>bar.foot(text)',foot_demo)
						.addItem('clear title =>bar.clsTitle(text)',cls_title_demo)
						.addItem('clear foot =>bar.clsFoot(text)',cls_foot_demo)
						.addItem('clear msg => bar.cls()',cls_msg_demo)
					.addTree()
						.addItem('default(no custom options)',opt_default_demo)
						.addItem('custom(black)',opt_customize_black_demo)
						.addItem('custom(pink)',opt_customize_pink_demo)
						.addItem('custom(blue)',opt_customize_blue_demo)
						.addItem('custom options demo')
					.addTree('about',about)
	
	var menuTreeAbout={
		'root':{'title':'about','click':about}
	};
	
	var optsDefault={};
	var opts1={
				bar_title:'Helper Bar Demo(black)',
				bar_foot:'verions:'+HelperBar.version(),
				foot_mode:'show',
				foot_size:'8px',
                safe_mode: 'unsafe',
                hide_mode: 'rightClick',
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
		optSetter.set(0);
		location.reload();
	}
	
	function opt_customize_black_demo(){
		optSetter.set(1);
		location.reload();
	}
	
	function opt_customize_pink_demo(){
		optSetter.set(2);
		location.reload();
	}
	
	function opt_customize_blue_demo(){
		optSetter.set(3);
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
		var $helperbar_demo=$.tag('div',{id:'helperbar-demo'}).appendTo('body').html($.tag('h1').text('Helper Bar API Demo Button(no included in framework)').css('color','yellow')).css({opacity: '0.5',width:'100%',position:'fixed',top:0,background:'black'});
		
		var addbutton=function(text,func){
			$.tag('button').prependTo($helperbar_demo).text(text).click(func);
		
		};
		
		addbutton('hide()',function(){
			bar.hide();
		});
		
		addbutton('show()',function(){
			bar.show();
		});
		
		addbutton('hide("slow")',function(){
			bar.hide(100);
		});
		
		addbutton('show("slow")',function(){
				bar.show(100);
		});
		

	}

	function run(){
			
		if(!optSetter.get()){
			optSetter.init(1);
		}
		//bar = HelperBar.getbar(Menu_Tree_array,optionsList[optSetter.get()]);//singleton start
		//bar = HelperBar.getbar(menuTreeList,optionsList[optSetter.get()]);//singleton start
		bar = HelperBar.buildBar(optionsList[optSetter.get()]);//singleton start
		demo_interface();
	}
})( jQuery );