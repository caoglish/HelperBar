var STATUS_BAR = '#menubar-7cad339b0b08db99561c640461d00a07';
var STATUS_TITLE = '#menubar-title';
var STATUS_MESSAGE = '#menubar-message';
var STATUS_FOOTER = '#menubar-footer';
var STATUS_MENU = '#menubar-menu';
var LIST_MENU = "#menubar-list-menu";

var tester={
	version:'0.4.1b',
	getMsgArea:function(){
			return bar.getMenuBar().find(STATUS_MESSAGE);
	}
};



var init=function(){
	localStorage.clear();
}

init();

module("Helperbar Method");
test("Helperbar.version()", function () {
	var expect=tester.version;
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
	var expect=$(STATUS_MESSAGE).html();
	var result=bar.getMenuBar().find(STATUS_MESSAGE).html();
	
	
	equal(result,expect,'bar.getMenuBar().find(STATUS_MESSAGE) contains whether same content with $(STATUS_MESSAGE)|message on the bar:'+expect);
	
	var expect1=STATUS_BAR;
	var result1=bar.getMenuBar().attr('id');
	ok(expect1.indexOf(result1)>-1,'get id of the bar by use getMenuBar().attr(id) [is the result inside expect]');
});

