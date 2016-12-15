(function($){
    function ed_tool(){};
    ed_tool.prototype.unifyHeight = function(selector){
        if (selector == null) {
            return;
        }
            
        $(window).bind("resize", function(){
            var objs = $(selector);
            var maxHeight = 0;
            objs.each(function(index, element){
                var p = $(element);
                var h = p[0].scrollHeight;
                if (h > maxHeight) {
                    maxHeight = h;
                }
            });
            objs.height(maxHeight);
        }).resize();
        
        $(window).trigger("resize");
    };
    
    ed_tool.prototype.referHeight = function (source, aid) {
        if (aid == null
            || source == null) {
            return;
        }

        $(window).bind("resize", function () {
            var aidHeight = $(aid).height();
            $(source).each(function (index, element) {
                $(element).height(aidHeight);
            });
        }).resize();
        
        $(window).trigger("resize");
    };

    ed_tool.prototype.centerImg = function (img) {
        if (img == null) {
            return;
        }

        function _centerImg(){
            var $img = $(img),
                $c = $img.parent(),
                _imgW = parseFloat($img.width()),
                _imgH = parseFloat($img.height()),
                _cW = parseFloat($c.width()),
                _cH = parseFloat($c.height());
        
            var _left = (_cW - _imgW) / 2,
                _top = (_cH - _imgH) / 2;

            $img.css({ left: _left, top: _top });
        }

        $(img).load(_centerImg);
        $(window).bind("resize", _centerImg).resize();
    };

    ed_tool.prototype.getHostNameByUrl = function (url) {
        if (url && typeof (url) == "string") {
            url = decodeURIComponent(url);
            var regHostName = /^(http|https):\/\/(.*?)[\/$]/;
            var m = url.match(regHostName);
            if (m && m.length > 1) {
                return m[2];
            }
        }

        return "";
    };

    window.ed_tool = new ed_tool();
})(jQuery);

(function ($) {
    $.extend({
        "getFormatJsonStrFromString": function (jsonStr) {
            var res = "";
            for (var i = 0, j = 0, k = 0, ii, ele; i < jsonStr.length; i++) {
                ele = jsonStr.charAt(i);
                if (j % 2 == 0 && ele == "}") {
                    k--;
                    for (ii = 0; ii < k; ii++) ele = "    " + ele;
                    ele = "\n" + ele;
                }
                else if (j % 2 == 0 && ele == "{") {
                    ele += "\n";
                    k++;
                    for (ii = 0; ii < k; ii++) ele += "    ";
                }
                else if (j % 2 == 0 && ele == ",") {
                    ele += "\n";
                    for (ii = 0; ii < k; ii++) ele += "    ";
                }
                else if (ele == "\"") j++;
                res += ele;
            }
            return res;
        }
    });
    function telemetry() { };

    //track demo telemetry.
    //module: face, vision, speech...
    //demoName: the demo name, eg. detection, verification...
    //behavior: the behavior, eg. submit...
    //getData: the data will be given as url.
    telemetry.prototype.trackDemo = function (module, demoName, behavior, getData) {
        if (module == null
            || demoName == null
            || behavior == null) {
            return;
        }

        var url = getUrl("/Telemetry/Demo", module, demoName, behavior);
        if (getData) {
            var connector;
            if (url.indexOf("?") > 0) {
                connector = "&";
            } else {
                connector = "?";
            }

            for (var key in getData) {
                url = url.concat(connector, encodeURIComponent(key), "=", encodeURIComponent(getData[key]));
                connector = "&";
            }
        }

        callTelemetry(url);
    };

    //get url by arguments.
    var getUrl = function () {
        if (!arguments || arguments.length == 0) {
            return "";
        }

        var url = arguments[0]; // base url
        for (var i = 1; i < arguments.length; i++) {
            url = url.concat("/", encodeURIComponent(arguments[i]));
        }

        return url;
    };

    //call telemetry method.
    //url: the method url.
    var callTelemetry = function (url) {
        var iframe = $(".telemetry-iframe");
        if (iframe.length == 0) {
            iframe = $("<iframe></iframe>")
                        .css({ height: 0, width: 0, display: "none" })
                        .addClass("telemetry-iframe")
                        .appendTo($("body"));
        }

        iframe.attr("src", url);
    };

    window.telemetry = new telemetry();
})(jQuery);