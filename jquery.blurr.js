;
(function($, window, document, undefined) {


    // Create the defaults once
    var pluginName = "blurr",
            defaults = {
                offsetX: 0,
                offsetY: 0,
                sharpness: 40
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
        this.tpl = '<svg><defs><filter id="blrIMG"><feGaussianBlur id="filter_1" stdDeviation="{{sharpness}}" data-filterid="1"></feGaussianBlur><feComponentTransfer><feFuncR type="linear" slope="0.4"></feFuncR><feFuncG type="linear" slope="0.4"></feFuncG><feFuncB type="linear" slope="0.4"></feFuncB></feComponentTransfer></filter></defs><image x="{{offsetX}}" y="{{offsetY}}" width="100%" height="100%" xlink:href="{{href}}" filter="url(#blrIMG)" preserveAspectRatio="xMidYMid slice"></image></svg>';
        
        // Initialise the plugin
        this.init();
        
    }

    // Avoid Plugin.prototype conflicts
    $.extend(Blurr.prototype, {
        init: function() {
                        
            // Import options from the data-attributes of the element
            
            if(this.$el.data('image')) {
                this.settings.href = this.$el.data('image');
            }
            
            if(this.$el.data('href')) {
                this.settings.href = this.$el.data('href');
            }
            
            if(this.$el.data('offsetx')) {
                this.settings.offsetX = this.$el.data('offsetx');
            }
            
            if(this.$el.data('offsety')) {
                this.settings.offsetY = this.$el.data('offsety');
            }
            
            if(this.$el.data('sharpness')) {
                this.settings.sharpness = this.$el.data('sharpness');
            }
            
            // Normalise the options
            if(typeof this.settings.offsetX === 'undefined') {
                this.settings.offsetX  = 0;
            }

            if(typeof this.settings.offsetY === 'undefined') {
                this.settings.offsetY = 0;
            }
            
            if(typeof this.settings.sharpness === 'undefined' || this.settings.sharpness.length === 0 || this.settings.sharpness < 0 || this.settings.sharpness > 100) {
                this.settings.sharpness = (this.settings.sharpness > 100 ? 100 : 40);
            }
            else {
                this.settings.sharpness = 100 - this.settings.sharpness;
            }
            
            this.renderSVG();

        },
        renderSVG: function() {
            
           var _tpl = this.tpl;
            _tpl = _tpl.replace('{{href}}', this.settings.href);
            _tpl = _tpl.replace('{{offsetX}}', this.settings.offsetX);
            _tpl = _tpl.replace('{{offsetY}}', this.settings.offsetY);
            _tpl = _tpl.replace('{{sharpness}}', this.settings.sharpness);

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
            
        }
    });

    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn[ pluginName ] = function(options) {
        this.each(function() {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName, new Blurr(this, options));
            }
        });

        // chain jQuery functions
        return this;
    };

})(jQuery, window, document);