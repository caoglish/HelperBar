var MESSAGE_DIV='#status-message';
var jqob_msg;
$(loading);
function loading(){
	jqob_msg=$(MESSAGE_DIV);
}


module("Module A:Sring function");
test("String.strip()", function() {
   var testStringDot='.hello';
   var testStringHash='#hello';
   var testStringAnd='&hello';
   var testStringAt='@hello';
   
   equal( testStringDot.strip() ,'hello' , "strip . " );
   equal( testStringHash.strip() ,'hello' , "strip #" );
   equal( testStringAnd.strip() ,'&hello' , "not strip &" );
   equal( testStringAt.strip() ,'@hello' , "not strip @" );
});

module("Module B: Jquery function");

test('$.tag', function( ) {
  var testTag1=$.tag('div');
   var testTag2=$.tag('a',{id:'a',href:'#',text:'abc'});
   var testTag3=$.tag('div',{id:'div',class:'tag',text:'divdiv'});
   var testTag4=$.tag('div',{id:'div',href:'#',text:'divdiv'});
	
  deepEqual(testTag1['0'],document.createElement('div'),'only one parameter');
   deepEqual(testTag2,$('<a>',{id:'a',href:'#',text:'abc'}),'<a> with attributes' );
deepEqual(testTag3,$('<div>',{id:'div',class:'tag',text:'divdiv'}),'<div> with attributes'  );
   deepEqual(testTag4,$('<div>',{id:'div',href:'#',text:'divdiv'}),'<div> with attributes' );
});

module("Module C: Helper Bar Test");


function testBarMsg(expected,testMssage){
	equal( jqob_msg.html() , expected , testMssage );
}

test('bar.cls()', function(){
	bar.cls();
	testBarMsg( '' , "clear text on the bar" );
	
	bar.html('first');
	bar.append($.tag('tag').html(bar.html()));
	bar.append('second');
	ok(jqob_msg.html().toString().length>0,'message on the bar:'+bar.html());
	
	bar.cls();
	testBarMsg( '' , "clear text on the bar after bar.html() set a text" );
	
	
});

test('bar.html()', function(){
	bar.cls();
	var testval=bar.html();
	equal( testval , '' , "helperBar Message Empty." );
	
	bar.html($.tag('div').html('<p>test</p>'));
	var jqval=$('#status-message').html();
	testBarMsg( jqval , "bar.html should return text as same as jqob.html()" );
	testBarMsg( '<div><p>test</p></div>','[jquery object parameter]bar.html set html as expected');
	
	bar.html('<p>test</p>');
	testBarMsg( '<p>test</p>','[string parameter]bar.html set html as expected');
	
});


test('bar.append()', function(){
	bar.cls();
	bar.append('abc');
	
	testBarMsg('abc' , "append a string" );
	bar.append('abc');
	
	testBarMsg('abcabc',"append a string again");
});

