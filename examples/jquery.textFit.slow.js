// jQuery.textFit v1.0
// 9/2012 by STRML (strml.github.com)
// MIT License
// Adapted from jquery.boxfit(https://github.com/michikono/boxfit)
// To use: $('#target-div').textFit()
// Will make the *text* content inside a container scale to fit the container
// The container is required to have a set width and height
// Uses binary search, min size, max size

(function($) {
    $.fn.textFit = function(options) {
        return this.each(function(){
            var innerSpan, originalHeight, originalText, originalWidth, settings;
            var low, mid, high;
            if (this.length === 0) {
                return $(this);
            }
            settings = {
                alignVert: false, // if true, textFit will align vertically using css tables
                alignHoriz: false, // if true, textFit will set text-align: center
                multiLine: false, // if true, textFit will not set white-space: no-wrap
                detectMultiLine: true, // disable to turn off automatic multi-line sensing
                minFontSize: 6,
                maxFontSize: 80,
                reProcess: false, // if true, textFit will re-process already-fit nodes. Leave to 'false' for better performance
                widthOnly: false // if true, textFit will fit text to element width, regardless of text height
            };
            $.extend(settings, options);
            originalText = $(this).html();
            $(this).html("");
            originalWidth = $(this).width();
            originalHeight = $(this).height();

            // Don't process if we can't find box dimensions
            if (!originalWidth || (!settings.widthOnly && !originalHeight)) {
                if (window.console != null) {
                    if(!settings.widthOnly)
                        console.info('Set a static height and width on the target element' + this.outerHTML +
                            ' before using textFit!');
                    else
                        console.info('Set a static width on the target element' + this.outerHTML +
                            ' before using textFit!');
                }
                return $(this).html(originalText);
            } else {

                // Add textfitted span
                if (originalText.indexOf('textfitted') === -1) {
                    innerSpan = $("<span></span>").addClass("textfitted").html(originalText);
                    $(this).html(innerSpan);
                } else {
                    if(options.reprocess === false) return;
                    $(this).html(originalText);
                    innerSpan = $(originalText).find('span.textfitted');
                }

                // Prepare & set alignment
                if (settings.alignVert) {
                    $(this).css("display", "table");
                    innerSpan.css("display", "table-cell");
                    innerSpan.css("vertical-align", "middle");
                }
                if (settings.alignHoriz) {
                    $(this).css("text-align", "center");
                    innerSpan.css("text-align", "center");
                }

                // Check if this string is multiple lines
                // Not guaranteed to always work if you use wonky line-heights
                if (!settings.multiLine && settings.detectMultiLine &&
                      innerSpan.height() >= parseInt(innerSpan.css('font-size'), 10) * 2){
                    settings.multiLine = true;
                }
                if (!settings.multiLine) {
                    $(this).css('white-space', 'nowrap');
                }

                low = settings.minFontSize;
                high = settings.maxFontSize;

                // Binary search for best fit
                var fitInterval = setInterval(fitText, 500);
                function fitText(){
                    mid = parseInt((low + high) / 2, 10);
                    innerSpan.css('font-size', mid);
                    if(innerSpan.width() <= originalWidth && (settings.widthOnly || innerSpan.height() <= originalHeight)){
                        low = mid + 1;
                    } else {
                        high = mid - 1;
                    }
                    if(low > high) clearInterval(fitInterval);
                }
                // Sub 1 if we ended up high
                if(innerSpan.width() > originalWidth && (settings.widthOnly || innerSpan.height() > originalHeight)){
                    innerSpan.css('font-size', mid - 1);
                }
            }
        });
    };
})(jQuery);
