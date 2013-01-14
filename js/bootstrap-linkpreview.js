(function($) {
    
    var LinkPreview = function(element, options) {

        if (options === null || options.url === null) {
            return;
        }

        this.$element = $(element);
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
                context: this,
                success: onSuccess,
                error: onError
            });
        },

        renderPreview: function(data) {
            //console.log("SUCCESS");
            console.log(data);
            
            // html to lower case
            data = data.replace(/<\/?[A-Z]+.*?>/g, function (m) { 
                return m.toLowerCase(); 
            });
            
            // parse data to jQuery DOM object
            var parser = new DOMParser(),
                dom = parser.parseFromString(data, "text/xml"),
                $dom = $(dom);
            
            // get components
            var title = this.findTitleInDom($dom),
                description = this.findDescriptionInDom($dom);

            // build dom elements
            var $title = $("<p></p>").addClass("lead").text(title),
                $description = $("<p></p>").text(description);

            // append information
            $title.insertAfter(this.$element);
            $description.insertAfter($title);
        },

        renderError: function(data) {
            console.log("ERROR");
            console.log(data);
        },

        findTitleInDom: function($dom) {
            return $dom.find("title").text() ||
                $dom.find("meta[name=title]").attr("content");
        },

        findDescriptionInDom: function($dom) {
            return  $dom.find("meta[name=description]").attr("content");
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