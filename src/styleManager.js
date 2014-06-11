module.exports={
	initCssManager:function(settings){
		
		var root_menu_height = '30px';
    		cssManager = {
    			font_style: {
    				'font-family': settings.font_family,
    				'font-size': '100%'
    			},
    			bar_basic_style: {
    				'position': 'fixed',
    				'background-color': settings.bar_bg_color,
    				'color': settings.bar_font_color,
    				'bottom': '0',
    				'right': '0',
    				'opacity': settings.bar_opacity,
    				'border-radius': '0px ' + settings.border_radius + ' 0px 0px',
    				'padding': '0px',
    				'padding-left': '2px',
    				'margin-left': '1px',
    				'width': '100%',
    				'z-index': '99999',
    				'line-height': 'normal',
    				'box-shadow': settings.bar_shadow,
    				'text-align': 'left'
    			}, //css: #helper-bar-nnnnnnnnnnnnnn
    			menu_basic_style: {
    				'padding': '0px',
    				'background': '',
    				'list-style': 'none',
    				'margin': '0px'
    			}, //basic style for both menu and root menu
    			menu_ul_style: {
    				'margin': '0',
    				'padding': '0',
    				'position': 'fixed',
    				'box-shadow': settings.menu_shadow,
    				'bottom': root_menu_height
    			},
    			tag_a_css: {
    				'font-size': 'medium',
    				'display': 'block',
    				'padding': '5px 12px',
    				'text-decoration': 'none',
    				'width': settings.menu_width,
    				'color': settings.menu_font_color,
    				'white-space': 'nowrap'
    			} //tag a style sheet.
    		};
    		cssManager.menu_style = $.extend({}, cssManager.menu_basic_style, {
    			'display': 'inline'
    		}); //css:#status-menu ul li ul li
    		cssManager.root_menu_style = $.extend({}, cssManager.menu_basic_style, {
    			'height': root_menu_height,
    			'float': 'left',
    			'border-left': '1px solid ' + settings.menu_separator_color
    		}); //css:#status-menu ul li
    		cssManager.bar_basic_style = $.extend({}, cssManager.bar_basic_style, cssManager.font_style);

    		return cssManager;
	}
};