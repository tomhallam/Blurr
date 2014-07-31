;
(function($, window, document, undefined) {


    // Create the defaults once
    var pluginName = "blurr",
            defaults = {
                offsetX: 0,
                offsetY: 0, 
                sharpness: 40,
                callback: function() {}
            };

    // The actual plugin constructor
    function Blurr(element, options) {
        this.$el = $(element);
        // jQuery has an extend method which merges the contents of two or
        // more objects, storing the result in the first object. The first object
        // is generally empty as we don't want to alter the default options for
        // future instances of the plugin
        this.settings = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        
        // Store the template
        this.tpl = '<svg><defs><filter id="blrIMG{{i}}"><feGaussianBlur id="filter_1" stdDeviation="{{sharpness}}" data-filterid="1"></feGaussianBlur><feComponentTransfer><feFuncR type="linear" slope="0.4"></feFuncR><feFuncG type="linear" slope="0.4"></feFuncG><feFuncB type="linear" slope="0.4"></feFuncB></feComponentTransfer></filter></defs><image x="{{offsetX}}" y="{{offsetY}}" width="100%" height="100%" xlink:href="{{href}}" filter="url(#blrIMG{{i}})" preserveAspectRatio="xMidYMid slice"></image></svg>';
        
        // Element counter
        this.elementCount = 0;
        
        // Initialise the plugin
        this.init();
        
    }

    // Avoid Plugin.prototype conflicts
    $.extend(Blurr.prototype, {
        init: function() {
                        
            // Import options from the data-attributes of the element
            var href, offsetX, offsetY, sharpness, callback;
            
            // Assign from the options, if available - [data-] attributes override below
            href      = this.settings.href;
            offsetX   = this.settings.offsetX;
            offsetY   = this.settings.offsetY;
            sharpness = this.settings.sharpness;
            callback  = this.settings.callback;
            
            if(this.$el.data('image')) {
                href = this.$el.data('image');
            }
            
            if(this.$el.data('href')) {
                href = this.$el.data('href');
            }
            
            if(this.$el.data('offsetx')) {
                offsetX = this.$el.data('offsetx');
            }
            
            if(this.$el.data('offsety')) {
                offsetY = this.$el.data('offsety');
            }
            
            if(this.$el.data('sharpness')) {
                sharpness = this.$el.data('sharpness');
            }
            
            // Normalise the options
            if(typeof offsetX === 'undefined') {
                offsetX = 0;
            }

            if(typeof offsetY === 'undefined') {
                offsetY = 0;
            }
            
            if(typeof sharpness === 'undefined' || sharpness.length === 0 || sharpness < 0 || sharpness > 100) {
                sharpness = (sharpness > 100 ? 100 : 40);
            }
            else {
                sharpness = 100 - sharpness;
            }
                        
            // Add the blurstretch CSS class
            this.$el.addClass('has-blurr');
            
            // Parse, render and callback
            return this.renderSVG(href, offsetX, offsetY, sharpness, callback);

        },
        renderSVG: function(href, offsetX, offsetY, sharpness, callback) {
            
           var _tpl = this.tpl;
            _tpl = _tpl.replace('{{href}}', href);
            _tpl = _tpl.replace('{{offsetX}}', offsetX);
            _tpl = _tpl.replace('{{offsetY}}', offsetY);
            _tpl = _tpl.replace('{{sharpness}}', sharpness);
            _tpl = _tpl.replace(/{{i}}/g, this.elementCount);

            $(_tpl).appendTo(this.$el);
            
            this.$el.find('svg').css({
                'min-width': '110%',
                'min-height': '110%',
                '-webkit-transform': 'translate3d(-50px, 0px, 75px) scale(1.25)',
                'transform': 'translate3d(-50px, 0px, 75px) scale(1.25)',
                'position': 'relative',
                'right': 0,
                'left': 0
            });

            this.$el.find('div:first').css({
                'position': 'absolute',
                'left': 0,
                'right': 0,
                'z-index': 100
            });
            
            if(typeof callback === 'function') {
                callback.call(this, href, offsetX, offsetY, sharpness);
            }
            
        }
    });

    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn[ pluginName ] = function(options) {
        this.each(function() {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName, new Blurr(this, options));
            }
            this.elementCount++;
        });

        // chain jQuery functions
        return this;
    };

})(jQuery, window, document);