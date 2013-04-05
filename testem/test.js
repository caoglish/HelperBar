var STATUS_BAR = '#menubar-7cad339b0b08db99561c640461d00a07';
var STATUS_TITLE = '#menubar-title';
var STATUS_MESSAGE = '#menubar-message';
var STATUS_FOOTER = '#menubar-footer';
var STATUS_MENU = '#menubar-menu';
var LIST_MENU = "#menubar-list-menu";

var tester={
	//version:'0.4.1b',
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

$.tag = function (tag, opts) {
			return $('<' + tag + '/>', opts);
		};


var init=function(){
	localStorage.clear();
}

init();

module("Helperbar Method");
test("Helperbar.version()", function () {
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

test("bar.foot(text)", function () {
	var expect='abc';
	bar.cls();
	bar.foot('abc');
	var result=tester.getFootArea().html();
	equal(result,expect,'bar.foot("abc") will set abc');
});

test("bar.title(text)", function () {
	var expect=bar.getSettings().bar_title+'abcded123456789';
	bar.clsTitle();
	bar.title('abcded123456789');
	var result=tester.getTitleArea().html();
	equal(result,expect,'bar.title("abc") will set title '+bar.getSettings().bar_title+"abcded123456789");
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
 
test("bar.clsTitle()", function () {
	var expect=bar.getSettings().bar_title;
	bar.clsTitle();
	bar.title('abcded123456789');
	bar.clsTitle();
	var result=tester.getTitleArea().html();
	equal(result,expect,'bar.clsTitle("abc") will only have title of the bar');
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
	
	expect='<div>{"a":"abc","accd":{"abc":"edd"},"1":"qwer"}</div><div>hello,code</div>';
	bar.cls();
	bar.log({a:"abc",accd:{abc:"edd"},"1":"qwer"}).log('hello,code');
	result=tester.getMsgArea().html();
	equal(result,expect,'bar.log({a:"abc",accd:{abc:"edd"},"1":"qwer"}).log("hello,code"),log the object will only set this on the bar:'+expect);
	bar.cls();
});
