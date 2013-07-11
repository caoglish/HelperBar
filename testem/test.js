var STATUS_BAR = '#menubar-7cad339b0b08db99561c640461d00a07';
var STATUS_TITLE = '#menubar-title';
var STATUS_MESSAGE = '#menubar-message';
var STATUS_FOOTER = '#menubar-footer';
var STATUS_MENU = '#menubar-menu';
var LIST_MENU = "#menubar-list-menu";

var tester={
	getMsgArea:function(){
			return $(STATUS_MESSAGE);
	},
	getTitleArea:function(){
			return $(STATUS_TITLE);
	},
	getFootArea:function(){
			return $(STATUS_FOOTER);
	}
};

$.tag = HelperBar.tag;


var init=function(){
	localStorage.clear();
}

init();

module("Helperbar Method");
test("Helperbar.version() is "+HelperBar.version(), function () {
	var expect=bar.version();
	var result=HelperBar.version();
	equal(result,expect,'version() is return right number');
});

test("HelperBar.data()", function () {
	var expect='data is ok';
	HelperBar.data('keystring','data is ok');
	var result=HelperBar.data('keystring');
	
	equal(result,expect,'save "string" to localStorage.keystring, and get from it');
	
	var expect=['array','is','ok'];
	HelperBar.data('keyarray',['array','is','ok']);
	deepEqual(HelperBar.data('keyarray'),expect,'save "array" to localStorage.keyarray, and get from it');
	
	var expect={'array':'array','is':'is','ok':'ok','num':1234567890};
	HelperBar.data('keyobject',{'array':'array','is':'is','ok':'ok','num':1234567890});
	deepEqual(HelperBar.data('keyobject'),expect,'save "object" to localStorage.keyobject, and get from it');
	
	var expect=false;
	HelperBar.data('keyfalse',false);
	deepEqual(HelperBar.data('keyfalse'),expect,'save boolean false to localStorage.keyfalse, and get from it');
	
	var expect=true;
	HelperBar.data('keytrue',true);
	deepEqual(HelperBar.data('keytrue'),expect,'save boolean true to localStorage.keytrue, and get from it');
	
});


test("Helperbar.delData()", function () {
	HelperBar.data('deldata','this will be delete');
	equal(HelperBar.data('deldata'),'this will be delete','check the key "deldata" is existed');
	HelperBar.delData('deldata');
	equal(HelperBar.data('deldata'),null,'check the  key "deldata"  have been deleted');
});

module("bar");


test("bar.getMenuBar() in unsafe mode", function () {
	bar.cls();
	bar.msg('abc').addmsg('+++---+++--asfadsf3342');
	var expect='abc+++---+++--asfadsf3342';
	var result=bar.getMenuBar().find(STATUS_MESSAGE).html();
	
	
	equal(result,expect,'bar.getMenuBar().find(STATUS_MESSAGE) contains whether same content with $(STATUS_MESSAGE)|message on the bar:'+expect);
	
	var expect1=STATUS_BAR;
	var result1=bar.getMenuBar().attr('id');
	ok(expect1.indexOf(result1)>-1,'get id of the bar by use getMenuBar().attr(id) [is the result inside expect]');
});

test("bar.title(text)", function () {
	var expect=bar.getSettings().bar_title+'abcded123456789';
	bar.clsTitle();
	bar.title('abcded123456789');
	var result=tester.getTitleArea().html();
	equal(result,expect,'bar.title("abc") will set title '+bar.getSettings().bar_title+"abcded123456789");
});

test("bar.clsTitle()", function () {
	var expect=bar.getSettings().bar_title;
	bar.clsTitle();
	bar.title('abcded123456789');
	bar.clsTitle();
	var result=tester.getTitleArea().html();
	equal(result,expect,'bar.clsTitle("abc") will only have title of the bar');
});

test("bar.foot(text)", function () {
	var expect='abc';
	bar.cls();
	bar.foot('abc');
	var result=tester.getFootArea().html();
	equal(result,expect,'bar.foot("abc") will set abc');
});


test("bar.clsFoot()", function () {
	var expect='abc';
	bar.cls();
	bar.clsFoot();
	bar.foot('abc');
	var result=tester.getFootArea().html();
	equal(result,expect,'bar.foot("abc") set foot is fine.expect:'+expect);
	
	expect='';
	bar.clsFoot();
	result=tester.getFootArea().html();
	equal(result,expect,'bar.clsFoot() will clean the foot:expect'+expect);
});


test("bar.html", function () {
	var expect='plain text';
	bar.html('plain text');
	var result=tester.getMsgArea().html();
	equal(result,expect,'html("plain text") add palin text message');
	
	var expect1='<div><span>caoglish</span></div>';
	bar.html('<div><span>caoglish</span></div>');
	var result1=tester.getMsgArea().html();
	equal(expect1,result1,'bar.html(<div><span>caoglish</span></div>) add html code as message');
	
	var expect2='<div><span>caoglish</span></div>';
	bar.html($.tag('div').html($.tag('span').text('caoglish')));
	var result2=tester.getMsgArea().html();
	equal(expect2,result2,'bar.html($object) add html code as message');
	
});

test("bar.append(text)", function () {
	var expect='abc + def + ghijk';
	bar.cls();
	bar.append('abc')
		. append(' + def')
		. append(' + ghijk');
	var result=tester.getMsgArea().html();
	equal(result,expect,'bar.append() will set text '+expect);
	
	bar.cls();
	expect='<span>abc</span><div>def</div><span>ghjk</span>';
	bar.append('<span>abc</span>')
		.append($('<div/>').text('def'))
		.append($('<span/>').text('ghjk'));
	result=tester.getMsgArea().html();
	equal(result,expect,'bar.append() will set text '+expect);
 });
 
 
test("bar.cls()", function () {
	var expect='';
	bar.cls();
	bar.append('abc')
		. append(' + def')
		. append(' + ghijk');
	bar.cls();
	var result=tester.getMsgArea().html();
	equal(result,expect,'bar.cls() will clean text');
	
	
	expect='';
	bar.cls();
	bar.append('<span>abc</span>')
		.append($('<div/>').text('def'))
		.append($('<span/>').text('ghjk'));
		
	bar.cls();
	result=tester.getMsgArea().html();
	equal(result,expect,'bar.cls() will clean text');
 });
 


test("bar.addmsg(text,sytle)", function () {
	var expect='<span style="color: yellow;">hello,world</span>';
	bar.cls();
	bar.addmsg('hello,world','yellow');
	var result=tester.getMsgArea().html();
	equal(result,expect,'bar.addmsg(text,sytle) {style is stirng}will only set this on the bar:'+expect);
	
	expect='<span style="font-size: 50px; margin-left: 20px;">hello,world</span>'
	bar.cls();
	bar.addmsg('hello,world',{'font-size':'50px','margin-left':'20px'});
	var result=tester.getMsgArea().html();
	equal(result,expect,'bar.addmsg(text,sytle) {style is object} will only set this on the bar:'+expect);
	
	expect='hello,codehello,code';
	bar.cls();
	bar.addmsg('hello,code').addmsg('hello,code');
	var result=tester.getMsgArea().html();
	equal(result,expect,'bar.addmsg("hello,code") will only set this on the bar:'+expect);
});

test("bar.addmsg(text,func)", function () {
	bar.cls();
	var expect1,expect2,expect3,
		result1,result2,result3;
	
	//case
	expect1='<span>abc</span>';
	expect2='<span style="color: yellow;">h,w</span>';
	bar.addmsg('abc',function($msg){
		$msg.on('click',function(){
			bar.msg('h,w','yellow');
		});
	});
	
	//before click this message.
	result=tester.getMsgArea().html();
	equal(result,expect1,'.expect:'+expect1);
	//after click this message.
	tester.getMsgArea().find('span').trigger('click');
	result=tester.getMsgArea().html();
	equal(result,expect2,'.expect:'+expect2);
	
	//case
	bar.cls();
	expect1='abc';
	expect2='abc';
	expect3={};
	bar.addmsg('abc',function($msg,msg,style){
		result1=$msg.text()==expect1&&$msg instanceof $;
		result2=msg;
		result3=style;
	});
	
	ok(result1,"$msg is message wrapped as jQuery object");
	equal(result2,expect2,"msg is the msg applied.");
	deepEqual(result3,expect3,"sytle is the style object applied on the message.which is empty {}");
	
	//case
	bar.cls();
	var _obj=$.tag('div').text('hello,world')
	expect1=$.tag('span').append(_obj.clone()).html();
	expect2=_obj;
	expect3={};
	bar.addmsg(_obj,function($msg,msg,style){
		result1=$msg.html();
		result2=msg;
		result3=style;
	});
	
	equal(result1,expect1,"$msg is message wrapped as jQuery object");
	equal(result2,expect2," msg is the msg applied.jQuery object and passing by reference");//the msg is the jQuery object itself(referenced)
	deepEqual(result3,expect3,"sytle is the style object applied on the message.which is empty {}");
});


test("bar.addmsg(text,style,func)", function () {
	bar.cls();
	var expect1,expect2,expect3,
		result1,result2,result3;
	
	//case
	expect1='<span style="font-size: 50px;">abc</span>';
	expect2='<span style="font-size: 50px;">h,w</span>';
	bar.addmsg('abc',{"font-size":'50px'},function($msg,msg,style){
		$msg.on('click',function(){
			bar.msg('h,w',style);
		});
	});
	
	//before click this message.
	result=tester.getMsgArea().html();
	equal(result,expect1,'.expect:'+expect1);
	//after click this message.
	tester.getMsgArea().find('span').trigger('click');
	result=tester.getMsgArea().html();
	equal(result,expect2,'.expect:'+expect2);
	
	//case
	bar.cls();
	expect1='abcdefg';
	expect2='abcdefg';
	expect3={"font-size":'72px'};
	bar.addmsg('abcdefg',{"font-size":'72px'},function($msg,msg,style){
		result1=$msg.text()==expect1&&$msg instanceof $;
		result2=msg;
		result3=style;
	});
	tester.getMsgArea().find('span').trigger('click');
	ok(result1,"$msg is message wrapped as jQuery object");
	equal(result2,expect2,"msg is the msg applied.");
	deepEqual(result3,expect3,"sytle is the style object applied on the message.expect:"+JSON.stringify(expect3));
	
	//case
	bar.cls();
	var _obj=$.tag('div').text('hello,world')
	expect1=$.tag('span').append(_obj.clone()).html();
	expect2=_obj;
	expect3={"color":"#abcdef"};
	bar.addmsg(_obj,'#abcdef',function($msg,msg,style){
		result1=$msg.html();
		result2=msg;
		result3=style;
	});
	tester.getMsgArea().find('span').trigger('click');
	equal(result1,expect1,"$msg is message wrapped as jQuery object");
	equal(result2,expect2," msg is the msg applied.jQuery object and passing by reference,expect:"+expect2.html());//the msg is the jQuery object itself(referenced)
	deepEqual(result3,expect3,"sytle is the style object applied on the message.expect:"+JSON.stringify(expect3));
});

test("bar.msg(text,sytle)", function () {
	bar.cls();
	bar.addmsg('mess up everythin first. this should not affect the result');
	
	var expect='<span style="color: yellow;">hello,world</span>';
	bar.msg('hello,world','yellow');
	var result=tester.getMsgArea().html();
	equal(result,expect,'bar.msg(text,sytle) {style is stirng}will only set this on the bar:'+expect);
	
	expect='<span style="font-size: 50px; margin-left: 20px;">hello,world</span>'
	bar.msg('hello,world',{'font-size':'50px','margin-left':'20px'});
	result=tester.getMsgArea().html();
	equal(result,expect,'bar.msg(text,sytle) {style is object} will only set this on the bar:'+expect);
	
	expect='hello,code';
	bar.msg('hddjdjgfjytjtyffhgfhfu').msg('hello,code');
	result=tester.getMsgArea().html();
	equal(result,expect,'bar.msg("hello,code") will only set this on the bar:'+expect);
	
	expect='hello,code';
	result=bar.msg();
	equal(result,expect,'bar.msg() return the message on the bar without html tag:'+expect);
	
	expect='hello,code';
	bar.msg('hello,code',{color:'red'});
	result=bar.msg();
	equal(result,expect,'bar.msg() return the message on the bar without html tag:'+expect);
	
});

test("bar.msg(text,func)", function () {
	bar.cls();
	var expect1,expect2,expect3,
		result1,result2,result3;
	
	//case
	expect1='<span>abc432</span>';
	expect2='<span style="color: yellow;">h,w11</span>';
	bar.msg('abc432',function($msg){
		$msg.on('click',function(){
			bar.msg('h,w11','yellow');
		});
	});
	
	//before click this message.
	result=tester.getMsgArea().html();
	equal(result,expect1,'.expect:'+expect1);
	//after click this message.
	tester.getMsgArea().find('span').trigger('click');
	result=tester.getMsgArea().html();
	equal(result,expect2,'.expect:'+expect2);
	
	//case
	bar.cls();
	expect1='abc';
	expect2='abc';
	expect3={};
	bar.msg('abc',function($msg,msg,style){
		result1=$msg.text()==expect1&&$msg instanceof $;
		result2=msg;
		result3=style;
	});
	
	ok(result1,"$msg is message wrapped as jQuery object");
	equal(result2,expect2,"msg is the msg applied.");
	deepEqual(result3,expect3,"sytle is the style object applied on the message.which is empty {}");
	
	//case
	bar.cls();
	var _obj=$.tag('div').text('hello,world')
	expect1=$.tag('span').append(_obj.clone()).html();
	expect2=_obj;
	expect3={};
	bar.msg(_obj,function($msg,msg,style){
		result1=$msg.html();
		result2=msg;
		result3=style;
	});
	
	equal(result1,expect1,"$msg is message wrapped as jQuery object");
	equal(result2,expect2," msg is the msg applied.jQuery object and passing by reference");//the msg is the jQuery object itself(referenced)
	deepEqual(result3,expect3,"sytle is the style object applied on the message.which is empty {}");
});

test("bar.msg(text,style,func)", function () {
	bar.cls();
	var expect1,expect2,expect3,
		result1,result2,result3;
	
	//case
	expect1='<span style="font-size: 50px;">abc1</span>';
	expect2='<span style="font-size: 50px;">h,w2</span>';
	bar.msg('abc1',{"font-size":'50px'},function($msg,msg,style){
		$msg.on('click',function(){
			bar.msg('h,w2',style);
		});
	});
	
	//before click this message.
	result=tester.getMsgArea().html();
	equal(result,expect1,'.expect:'+expect1);
	//after click this message.
	tester.getMsgArea().find('span').trigger('click');
	result=tester.getMsgArea().html();
	equal(result,expect2,'.expect:'+expect2);
	
	//case
	bar.cls();
	expect1='abcdefg2';
	expect2='abcdefg2';
	expect3={"font-size":'72px'};
	bar.msg('abcdefg2',{"font-size":'72px'},function($msg,msg,style){
		result1=$msg.text()==expect1&&$msg instanceof $;
		result2=msg;
		result3=style;
	});
	tester.getMsgArea().find('span').trigger('click');
	ok(result1,"$msg is message wrapped as jQuery object");
	equal(result2,expect2,"msg is the msg applied.");
	deepEqual(result3,expect3,"sytle is the style object applied on the message.expect:"+JSON.stringify(expect3));
	
	//case
	bar.cls();
	var _obj=$.tag('div').text('hello,world')
	expect1=$.tag('span').append(_obj.clone()).html();
	expect2=_obj;
	expect3={"color":"#abcdef"};
	bar.msg(_obj,'#abcdef',function($msg,msg,style){
		result1=$msg.html();
		result2=msg;
		result3=style;
	});
	tester.getMsgArea().find('span').trigger('click');
	equal(result1,expect1,"$msg is message wrapped as jQuery object");
	equal(result2,expect2," msg is the msg applied.jQuery object and passing by reference,expect:"+expect2.html());//the msg is the jQuery object itself(referenced)
	deepEqual(result3,expect3,"sytle is the style object applied on the message.expect:"+JSON.stringify(expect3));
});


test("bar.log(text)", function () {
	bar.cls();
	var expect='<div>hello,world</div>';
	bar.cls();
	bar.log('hello,world');
	var result=tester.getMsgArea().html();
	equal(result,expect,'bar.log(text) {text is stirng}will only set this on the bar:'+expect);
	
	expect='<div>undefined</div>';
	bar.cls();
	bar.log(undefined);
	result=tester.getMsgArea().html();
	equal(result,expect,'bar.log(undefined) {style is undefined} will only set this on the bar:'+expect);
		
	expect='<div>hello,code</div><div>hello,code</div>';
	bar.cls();
	bar.log('hello,code').log('hello,code');
	result=tester.getMsgArea().html();
	equal(result,expect,'bar.log("hello,code").log("hello,code") will only set this on the bar:'+expect);
	
	expect='<div>{"1":"qwer","a":"abc","accd":{"abc":"edd"}}</div><div>hello,code</div>';
	bar.cls();
	bar.log({"1":"qwer",a:"abc",accd:{abc:"edd"}}).log('hello,code');
	result=tester.getMsgArea().html();
	equal(result,expect,'bar.log({"1":"qwer",a:"abc",accd:{abc:"edd"}}).log("hello,code"),log the object will only set this on the bar:'+expect);
	bar.cls();
});

test("bar.cache()", function () {
	var expect='cache is ok';
	bar.cache('keystring','cache is ok');
	var result=bar.cache('keystring');
	
	equal(result,expect,'save "string" on bar , and get from it');
	
	var expect=['array','is','ok'];
	bar.cache('keyarray',['array','is','ok']);
	deepEqual(bar.cache('keyarray'),expect,'save "array" on bar, and get from it');
	
	var expect={'array':'array','is':'is','ok':'ok','num':1234567890};
	bar.cache('keyobject',{'array':'array','is':'is','ok':'ok','num':1234567890});
	deepEqual(bar.cache('keyobject'),expect,'save "object" on bar, and get from it');
	
	var expect=false;
	bar.cache('keyfalse',false);
	deepEqual(bar.cache('keyfalse'),expect,'save boolean false on bar, and get from it');
	
	var expect=true;
	bar.cache('keytrue',true);
	deepEqual(bar.cache('keytrue'),expect,'save boolean true on bar, and get from it');
	
});

test("bar.delCache()", function () {
	bar.cache('delCache','this will be delete');
	equal(bar.cache('delCache'),'this will be delete','check the key "delCache" is existed');
	bar.delCache('delCache');
	equal(bar.cache('delCache'),undefined,'check the  key "delCache"  have been deleted');
});

test("bar.warn()", function () {
	var expect;
	var result;
	bar.cls();
	bar.warn('test1');
	
	//default setting warn.
	expect='<span style="color: red; font-size: 50px;">test1</span>';
	result=tester.getMsgArea().html();
	equal(result,expect,'bar.warn("test1"):'+expect);
	
	bar.cls();
	bar.warn($.tag('div',{style:'font-size:20px'}).text('test2'));
	expect='<span style="color: red; font-size: 50px;"><div style="font-size:20px">test2</div></span>';
	result=tester.getMsgArea().html();
	equal(result,expect,'bar.warn($object):'+expect);
	
	
	bar.cls();
	bar.warn('test3').warn('test4');
	expect='<span style="color: red; font-size: 50px;">test3</span><span style="color: red; font-size: 50px;">test4</span>';
	result=tester.getMsgArea().html();
	equal(result,expect,'bar.warn("test1").warn("test4"):'+expect);
	bar.cls();
});
