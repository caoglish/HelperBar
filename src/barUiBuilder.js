 var Constant = require("./constant");
 var _ = require("./helper");
 var styleManager = require("./styleManager");
 var barUiHideMode = require("./barUiHideMode");

 //menubar element name define.
 var STATUS_BAR = Constant.STATUS_BAR;
 var STATUS_TITLE = Constant.STATUS_TITLE;
 var STATUS_MESSAGE = Constant.STATUS_MESSAGE;
 var STATUS_FOOTER = Constant.STATUS_FOOTER;
 var STATUS_MENU = Constant.STATUS_MENU;
 var LIST_MENU = Constant.LIST_MENU;
 var _settings;

 var cssManager;

 var bar_context;
 //barBuilder object to manage the code to builer the menu bar.;
 var barBuilder = {
     setEnv: function(vSettings, vBar_context) {
         _settings = vSettings;
         bar_context = vBar_context;
     },
     //convert a 'div' element to the Menu bar
     convert_status_bar: function($object) {
         $object.attr('id', _.cropFirstSymbol(STATUS_BAR)).css(cssManager.bar_basic_style); //create status bar//css: #helper-bar-nnnnnnnnnnnnnn
         var $div_status_title = _.tag('div', {
             id: _.cropFirstSymbol(STATUS_TITLE)
         }).css(cssManager.menu_basic_style).css(cssManager.font_style); //create status title area
         var $div_status_message = _.tag('div', {
             id: _.cropFirstSymbol(STATUS_MESSAGE)
         }).css(cssManager.menu_basic_style).css(cssManager.font_style); //create status message area
         var $div_status_footer = _.tag('div', {
             id: _.cropFirstSymbol(STATUS_FOOTER)
         }).css(cssManager.menu_basic_style).css(cssManager.font_style); //create status footer area
         if (_settings.foot_size !== 'none') {
             $div_status_footer.css('font-size', _settings.foot_size);
         }
         $object.append($div_status_title).append($div_status_message).append($div_status_footer).append(this.create_status_menu());
     },
     //creating top menu level (root menu)
     create_status_menu: function() {
         var $div_status_menu = _.tag('div', {
             id: _.cropFirstSymbol(STATUS_MENU)
         }).css(cssManager.menu_basic_style); //create status menu
         var ul_list_menu = _.tag('ul', {
             id: _.cropFirstSymbol(LIST_MENU)
         }); //create menu list
         ul_list_menu.css({
             margin: 0,
             padding: 0
         }); //css: #status-menu ul
         $div_status_menu.append(ul_list_menu); //construct status bar
         return $div_status_menu;
     },
     //creating a single menu item for root level
     create_root_menu_item: function(id, title, callback) {
         var $tag_a = _.tag('a', {
             id: id,
             href: '#',
             text: title
         }).click(function(event) {
             event.preventDefault();
             if ($.isFunction(callback)) {
                 callback.apply(bar_context);
             }
         });
         $tag_a.css(cssManager.tag_a_css).css({
             background: _settings.menu_bg_color
         }).hover(
             function() {
                 $(this).css({
                     background: _settings.menu_hover_bg_color.hover_background_color
                 });
             },
             function() {
                 $(this).css({
                     background: _settings.menu_bg_color
                 });
             }); //css:#status-menu ul li a

         var $root_menu_item = _.tag('li').css(cssManager.root_menu_style) //css:#status-menu ul li
             .append($tag_a);
         return $root_menu_item;
     },
     //creating a single menu item
     create_menu_item: function(id, title, callback) {
         var menu_item = _.tag('li');
         menu_item.css(cssManager.menu_style); //css:#status-menu ul li ul li
         var $tag_a = _.tag('a', {
             id: id,
             href: '#',
             text: title
         }).click(function(event) {
             event.preventDefault();
             if ($.isFunction(callback)) {
                 callback.apply(bar_context);
             }
         });

         $tag_a.css(cssManager.tag_a_css).css({
             background: _settings.menu_bg_color
         }).css({
             'border-bottom': '1px solid ' + _settings.menu_separator_color
         }).hover(
             function() {
                 $(this).css({
                     background: _settings.menu_hover_bg_color
                 });
             },
             function() {
                 $(this).css({
                     background: _settings.menu_bg_color
                 });
             }); //css:#status-menu ul li ul li a
         menu_item.append($tag_a);
         return menu_item;
     },

     //construct a root menu item
     construct_root_menu: function(root_menu) { //root_menu must have attribute of id,title,click[function]
         return this.create_root_menu_item(root_menu.id, root_menu.title, root_menu.click);
     },
     //construct a menu tree except the root menu item
     construct_menu: function(menu_list) {
         var $tag_ul = _.tag('ul');
         $tag_ul.hide().css(cssManager.menu_ul_style); //css:#status-menu ul li ul
         for (var menu in menu_list) {
             var id = menu_list[menu].id;
             var title = menu_list[menu].title;
             var click = menu_list[menu].click;

             $tag_ul.append(this.create_menu_item(id, title, click));
         }

         //menu column top  has the round corner.
         var first_menu_item_css = {
             'border-radius': '6px 6px 0px 0px'
         };
         $tag_ul
             .css(first_menu_item_css)
             .find('li a').eq(0)
             .css(first_menu_item_css);

         return $tag_ul;
     },
     //construct one menu tree include root menu item and other menu item
     construct_one_menu_tree: function(menu_array) {
         var one_menu_tree = this.construct_root_menu(menu_array.root).append(this.construct_menu(menu_array.list));
         //hover to show and hide the menu items.
         one_menu_tree.hover(function() {
             if (_settings.menu_show_effect === "slide") $(this).find('ul').slideDown();
             else $(this).find('ul').show();
         }, function() {
             if (_settings.menu_show_effect === "slide") $(this).find('ul').slideUp();
             else $(this).find('ul').hide();
         });
         return one_menu_tree;
     },
     //setting of hide mode
     //
     //hide mode selection: all, onBar, notOnBar,notOnMenu,noHide,rightClick,rightDblClick
     select_hide_mode: function($menubar) {
        barUiHideMode($menubar,_settings);
         
     },
     //Initinalize entire menu bar
     //
     //1) init menubar with menu_tree_list. 
     //
     //2) init functions and behaviors of menubar.
     init_status_bar: function($menubar, menu_tree_list) {
         var $status_menu = $menubar.find(STATUS_MENU);
         var $footer = $menubar.find(STATUS_FOOTER);
         //set the status menu will show on mouse over the statusbar, hide on mouse out
         $menubar.hover(function() {
             if (_settings.foot_mode === 'hide') {
                 $footer.show();
             }
             $status_menu.show();
         }, function() {
             if (_settings.foot_mode === 'hide') {
                 $footer.hide('slow');
             }
             $status_menu.hide('slow');
         });
         //construct entire menu tree for the menu bar
         for (var menu_tree in menu_tree_list) {
             this.construct_one_menu_tree(menu_tree_list[menu_tree]).appendTo($menubar.find(LIST_MENU));
         }
         //initalize the default appearance of the status bar
         $status_menu.hide();
         if (_settings.foot_mode === 'hide') {
             $footer.hide();
         }
         $menubar.helperbar('title', _settings.bar_title);
         $menubar.helperbar('foot', _settings.bar_foot);
         this.select_hide_mode($menubar); //select hide mode
     },
     //manage the css for the menu bar. use for $().css()
     inital_cssManager: function() {
         cssManager = styleManager.initCssManager(_settings);
     }
 };

 module.exports = barBuilder;