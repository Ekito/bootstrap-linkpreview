(function($) {
    
    var LinkPreview = function(element, options) {

        if (options === null || options.url === null) {
            return;
        }

        this.$element = $(element);
        this.$previewContainer = $(options.previewContainer);

        this.url = options.url;

        this.init();
    };
    
    LinkPreview.prototype = {
        constructor: LinkPreview,

        url: null,

        $element: null,
        $previewContainer: null,

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
            data = data.replace(/<\/?[A-Z]+[\w\W]*?>/g, function (m) {
                return m.toLowerCase();
            });

            // parse data to jQuery DOM object
            var dom = document.implementation.createHTMLDocument('');
            dom.body.innerHTML = data;
            var $dom = $(dom);
            
            // get components
            var title = this.findTitleInDom($dom),
                description = this.findDescriptionInDom($dom),
                image = this.findImageInDom($dom);

            // build dom elements
            var $title = $("<h4></h4>").text(title),
                $description = $("<p></p>").text(description),
                $image = $("<img></img>").attr("src", image);

            // append information
            if (this.$previewContainer.length) {
                this.$previewContainer
                    .append($title)
                    .append($description)
                    .append($image);
            } else {
                $title.insertAfter(this.$element);
                $description.insertAfter($title);
                $image.insertAfter($description);
            }
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
            return $dom.find("meta[name=description]").attr("content");
        },

        findImageInDom: function($dom) {
            var imageSrc = $dom.find("meta[itemprop=image]").attr("content") ||
                $dom.find("link[rel=image_src]").attr("content") ||
                $dom.find("meta[itemprop=image]").attr("content") ||
                this.findFirstImageInBody($dom.find("body"));

            // maybe the returned url is relative
            if (imageSrc && !this.validateUrl(imageSrc)) {

                var a = document.createElement("a");
                a.href = this.url

                imageSrc = a.protocol + "//" + a.hostname + imageSrc;
            }

            return imageSrc;
        },

        findFirstImageInBody: function($body) {
            var result;

            var $images = $body.find("img[src]");

            var $img;
            $images.each(function() {
                $img = $(this);
                if ($img.attr("height") && $img.attr("width")) {
                    result = this.src;
                    return false;
                }
            });

            return result;
        },

        validateUrl: function(value) {
            return (/^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i).test(value);
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