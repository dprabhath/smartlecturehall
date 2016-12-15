String.prototype.format = function () {
    if (!arguments || arguments.length == 0) {
        return this;
    }

    var str = this;
    var args = arguments;
    str = str.replace(/\{(\d+)\}/ig, function (m, p) {
        return args[p];
    });

    return str;
};

(function ($) {
    $.fn.extend({

        "unifyHeight": function () {
            var _ = this;

            $(window).resize(function () {
                _unifyHeight();
            });

            function _unifyHeight() {
                var maxHeight = 0;
                return _.each(function (index, element) {
                    var childHeight = $(element).children(":first").height();
                    maxHeight = maxHeight > childHeight ? maxHeight : childHeight;
                }).each(function (index, element) {
                    $(element).height(maxHeight);
                });
            };

            return _unifyHeight();
        }
    });
})(jQuery);