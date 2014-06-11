var _ = require("./helper");

//menu Builder, this will build a menu tree array which could use for $.fn.helperbar.
//#####this menuBuilder is for internal scope usage, exports(public) API please see HelperBar.menu section.
module.exports = {
	menu_tree_list: [],
	//$.fn.helperbar have a root menu item which is essential.
	//however, user can pass a no root menu tree which will transfer a menu item
	//from menu list to root.
	_rebuild_one_menu_tree: function(menu_array) {
		var root;
		if (typeof menu_array.root === 'object') {
			return menu_array;
		} else if (menu_array.root == 'first') {
			root = menu_array.list.shift();
		} else if (menu_array.root == 'last' ||
			!menu_array.root) {
			root = menu_array.list.pop();
		} else {
			$.error('no such root config');
		}
		menu_array.root = root;
	},
	//set a menuList for menu builder. 
	set: function(menuList) {
		if (!this.hasMenu()) this.menu_tree_list = $.merge([], menuList);
		else $.error('Menu have been created');
	},
	//reset(empty) menu tree of menu builder.
	reset: function() {
		this.menu_tree_list = [];
	},
	//merge menuList after menu tree list of the menu builder
	merge: function(menuList) {
		$.merge(this.menu_tree_list, menuList);
	},
	//merge menuList before menu tree lsit of the mneu builder
	mergeTo: function(menuList) {
		this.menu_tree_list = $.merge($.merge([], menuList), this.menu_tree_list);
	},
	//add a root of the menu tree. this a start or next menu tree.
	addTree: function(title, click, id) {
		if (!!title) {
			var root = {
				"title": title,
				"click": $.isFunction(click) ? click : _.empty_func,
				"id": id
			};
			this.menu_tree_list.push({
				"root": root,
				"list": []
			});
		} else {
			this.menu_tree_list.push({
				"list": []
			});
		}
	},
	// add menu item on the current tree, until use addTree() start a new menu tree.
	addItem: function(title, click, id) {
		if (!!title) {
			var item = {
				"title": title,
				"click": $.isFunction(click) ? click : _.empty_func,
				"id": id
			};
			if (!this.hasMenu()) $.error("no Menu Tree.");
			var list = this.menu_tree_list[this.menu_tree_list.length - 1].list;
			list.push(item);
		} else {
			$.error("addMenuItem must pass the title at least");
		}
	},
	// get the menu tree list which did not built.
	get: function() {
		return $.extend(true, [], this.menu_tree_list);
	},
	//check is menu tree list have been ever existed.
	hasMenu: function() {
		return this.menu_tree_list.length > 0 ? true : false;
	},
	//build menu array to fit $.helperbar menu object,return a built menu tree list.
	build: function(menu_tree_list) {
		var menu_tree;
		if (typeof menu_tree_list === 'object') {
			menu_tree = $.extend(true, [], menu_tree_list);
		} else if (menu_tree_list === true) {
			if (this.hasMenu) menu_tree = $.extend(true, [], this.menu_tree_list);
			else $.error('menu is empty');
		} else {
			$.error('build() no such argv.');
		}

		for (var menu_tree_index in menu_tree) {
			this._rebuild_one_menu_tree(menu_tree[menu_tree_index]);
		}
		return menu_tree;
	}
};