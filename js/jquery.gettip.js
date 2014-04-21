/*
 * jQuery GetTit Plugin v1.0
 *
 * Author: Genett Design
 * Email: genettdesign@gmail.com
 *
 * Copyright (c) 2014 Genett Design
 * Free to use under the MIT license.
 */
(function($) {
    
    var tooltip = null, methods = {
        
        init : function(option) {
            
            // Default options
            var defaults = {
                "offset" : 8, // Offset tooltip (in pixels)
                "pos" : "top", // Position where the tooltip should appear ("left", "top", "right", "bottom")
                "on" : "hover", // Event used to trigger tooltip ("hover", "click", "focus")
                "delay" : 0, // Delay before showing a tooltip (in milliseconds)
                "duration" : 200, // Duration of animation events (in milliseconds)
            };
            
            // Create tooltips container
            $("body").append("<div class='tooltips'></div>");
            
            return this.each(function(unit) {
                
                // Options attribute
                var opts = $.extend({}, defaults, option);
                if($(this).data("tooltip")) {
                    opts = $.extend({}, opts, utils.options($(this).data("tooltip")));
                }
                
				// Ready for take-off
				tooltip = new ToolTip(this, unit, opts);
			});
        }
    };
    
    // TOOLTIP CLASS
    var ToolTip = function(elem, unit, opts) {
        
        // Remove an attribute: "title"
        $(elem).data("title", $(elem).attr("title")).removeAttr("title");

        var org = $(elem),
            tip_timer,
            tip;

        // Function show
        function show() {
            
            // Remove timer
            if (tip_timer) clearTimeout(tip_timer);
            
            tip = $('<div/>').prop("id", "tooltip-"+unit);
            
            // Create the tooltip
            $(".tooltips").append(tip);
            tip.html(org.data("title")).addClass("tooltip");
            
            /* Default vars */
            var org_pos = org.offset(),
                org_width = org.outerWidth(),
                org_height = org.outerHeight(),
                
                tip_width = tip.outerWidth(),
                tip_height = tip.outerHeight(),
                
                css = {
                    "top" : org_pos.top,
                    "left" : org_pos.left,
                    "display" : "none",
                };
            
            // Option: POS
            if(opts.pos == "left") {
                tip.addClass("tooltip-left");
                css.top += org_height / 2 - tip_height / 2;
                css.left -= tip_width + opts.offset;
            }
            else if(opts.pos == "top") {
                tip.addClass("tooltip-top");
                css.top -= tip_height + opts.offset;
                css.left += org_width / 2 - tip_width / 2;
            }
            else if(opts.pos == "right") {
                tip.addClass("tooltip-right");
                css.top += org_height / 2 - tip_height / 2;
                css.left += org_width + opts.offset;
            }
            else if(opts.pos == "bottom") {
                tip.addClass("tooltip-bottom");
                css.top += org_height + opts.offset;
                css.left += org_width / 2 - tip_width / 2;
            }
            
            // Apply the final CSS
            tip.css(css);
            
            // Create timer
            tip_timer = setTimeout(function() {
                // Show tip
                tip.fadeIn(opts.duration);
            }, parseInt(opts.delay));
        }
        
        // Function hide
        function hide() {
            // Remove timer
            if (tip_timer) clearTimeout(tip_timer);
            // Hide tip
            tip.fadeOut(opts.duration, function() { tip.remove(); });
        }
        
        // The main event
        switch (opts.on) {
            case "hover" : $(elem).hover(show, hide); break;
            case "focus" : $(elem).focus(show).blur(hide); break;
            case "click" : $(elem).click(function() { show(); $("body").mousedown(hide); }); break;
        }
    };
    
    // Utilities
    var utils = {
        options : function(string) {
            if ($.isPlainObject(string)) return string;
            var start = (string ? string.indexOf("{") : -1), options = {};
            if (start != -1) {
                try {
                    options = (new Function("", "var json = " + string.substr(start) + "; return JSON.parse(JSON.stringify(json));"))();
                } catch (e) {}
            }
            return options;
        },
    };
    
    // PLUGIN
    $.fn.getTip = function(options) { return methods.init.apply(this, arguments); };
    
}(jQuery));