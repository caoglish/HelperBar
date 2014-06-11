 var Constant = require("./constant");
 var _default_settings = require("./defaultSetting");

 var STATUS_BAR = Constant.STATUS_BAR;

 var $document = $(document);

 var documentDblClick = function(func, context) {
 	$document.on('dblclick', function(e) {
 		context = context || this;
 		func.apply(context, [e]);
 	});
 };

 var getEffectFunc = function($menubar, _settings) {
 	//setting.hide_effect
 	var hide_effect;

 	var hide_effect_func = {
 		'none': {
 			'toggle': function() {
 				$menubar.toggle();
 			},
 			'hide': function() {
 				$menubar.hide();
 			},
 			'show': function() {
 				$menubar.show();
 			}
 		},
 		'slide': {
 			'toggle': function() {
 				$menubar.slideToggle();
 			},
 			'hide': function() {
 				$menubar.slideUp();
 			},
 			'show': function() {
 				$menubar.slideDown();
 			}
 		}
 	};

 	if (hide_effect_func[_settings.hide_effect]) hide_effect = _settings.hide_effect;
 	else hide_effect = _default_settings.hide_effect;

 	return hide_effect_func[hide_effect];

 }

 module.exports = function($menubar, _settings) {

 	var real_hide_effect_func = getEffectFunc($menubar, _settings);

 	var modeMap = {
 		all: function() {
 			documentDblClick(function(e) {
 				real_hide_effect_func.toggle();
 			});
 		},
 		onBar: function() {
 			documentDblClick(function(e) {
 				var event_area = $(e.target).parents(STATUS_BAR);
 				if (event_area[0] === $menubar[0]) {
 					real_hide_effect_func.hide();
 				} else {
 					real_hide_effect_func.show();
 				}
 			});

 		},
 		notOnBar: function() {
 			documentDblClick(function(e) {
 				var event_area = $(e.target).parents(STATUS_BAR);
 				if (event_area[0] !== $menubar[0]) {
 					real_hide_effect_func.toggle();
 				}
 			});
 		},
 		notOnMenu: function() {
 			documentDblClick(function(e) {
 				var event_area = $(e.target).parents(STATUS_BAR);
 				if (!(event_area[0] === $menubar[0] && e.target.nodeName === 'A')) {
 					real_hide_effect_func.toggle();
 				}
 			});
 		},
 		rightClick: function() {
 			$document.on('contextmenu', function(e) {
 				real_hide_effect_func.toggle();
 			});
 		},
 		rightDblClick: function() {
 			documentDblClick(function(e) {
 				if (e.which === 3) real_hide_effect_func.toggle();
 			});
 		},
 		noHide: function() {},
 	};

 	if (  $.isFunction(modeMap[_settings.hide_mode]) ) {
 		modeMap[_settings.hide_mode].call();
 	} else {
 		$.error('Wrong Type of Hide Mode');
 	}



 }