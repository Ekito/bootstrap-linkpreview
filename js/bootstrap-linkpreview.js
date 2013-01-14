(function($) {
    
    var LinkPreview = function(element, options) {

        if (options === null || options.url === null) {
            return;
        }

        this.element = $(element);
        this.url = options.url;

        this.init();        
    };
    
    LinkPreview.prototype = {
        constructor: LinkPreview,

        init: function() {
            this.getSource(this.url, this.renderPreview, this.renderError);
        },

        getSource: function(url, onSuccess, onError) {
            $.ajax({
                url: url,
                type: "GET",
                success: onSuccess,
                error: onError
            });
        },

        renderPreview: function(data) {
            console.log("SUCCESS");
            console.log(data);
        },

        renderError: function(data) {
            console.log("ERROR");
            console.log(data);
        }
    };

    $.fn.linkpreview = function (option) {
        return this.each(function () {
            var $this = $(this),
                data = $this.data('linkpreview'),
                options = typeof option === 'object' && option;
            if (!data) {
                $this.data('linkpreview', (data = new LinkPreview(this, $.extend({}, $.fn.linkpreview.defaults, options))));
            }
            if (typeof option === 'string') {
                data[option]();
            }
        });
    };

    $.fn.linkpreview.defaults = {};
    
    $.fn.linkpreview.Constructor = LinkPreview;

})(window.jQuery);