var helper = require("../../src/helper.js");

QUnit.module("helper");
test("helper.cropFirstSymbol", function() {
	var expect = "divId";
	var result = helper.cropFirstSymbol("#divId");
	equal(result, expect, 'remove #');

	expect = "divClass";
	result = helper.cropFirstSymbol(".divClass");
	equal(result, expect, 'remove .');

	expect = "$special";
	result = helper.cropFirstSymbol("$special");
	equal(result, expect, 'no remove');

	expect = "word";
	result = helper.cropFirstSymbol("word");
	equal(result, expect, 'no remove');
});



test("helper.jqobClean", function() {
	var $target=$("<div id='test' class='test' style='color:red'>test</div>");

	var targetId=$target.attr('id');
	var targetClass=$target.attr('class');
	var targetStyle=$target.attr('style');
	var targetText=$target.text();

	helper.jqobClean($target);



	notEqual($target.attr('id'),targetId,"id will not equal its value before clean:"+targetId);
	notEqual($target.attr('class'),targetClass,"class will not equal its value before clean:"+targetClass);
	notEqual($target.attr('style'),targetStyle,"style will not equal its value before clean:"+targetStyle);
	notEqual($target.text(),targetText,"text will not equal its value before clean:"+targetText);

	equal($target.attr('id'),undefined,"id should be empty");
	equal($target.attr('class'),undefined,"class should be empty");
	equal($target.attr('style'),undefined,"style should be empty");
	equal($target.text(),"","text should be empty");	

});


test("helper.tag", function() {
	var $result=helper.tag("div",{class:"test"});
	var $expect=$('<div></div',{class:"test"});
	
	deepEqual($result,$expect);
});

test("helper.makeTagMsg", function() {
	
	var $expect=helper.tag("div").html("hello");
	var $result=helper.makeTagMsg("div","hello");

	$expect=helper.tag("div").html("hello").css({color:"red"});
	$result=helper.makeTagMsg("div","hello",{color:"red"});

	console.log($result);
	deepEqual($result,$expect);
});

test("helper.empty_func", function() {
	"use strict";
	var result=helper.empty_func;
	var expect=function(){};
	
	deepEqual(result.toString(),expect.toString());
});

