var myScrollLeft;
var InitImageData = '[{"scroll_image_url":"https://tse3.mm.bing.net/th?id=OIP.M7032491d74cbbd164aeecd58f3b35caaH1&pid=Api","main_image_url":"https://tse3.mm.bing.net/th?id=OIP.M7032491d74cbbd164aeecd58f3b35caaH1&pid=Api","origin_image_url":"https://tse3.mm.bing.net/th?id=OIP.M7032491d74cbbd164aeecd58f3b35caaH1&pid=Api","hostPageUrl":"https://tse3.mm.bing.net/th?id=OIP.M7032491d74cbbd164aeecd58f3b35caaH1&pid=Api"},{"scroll_image_url":"https://tse4.mm.bing.net/th?id=OIP.M7567c257275aeaacd5e4037a5c69ae7do1&pid=Api","main_image_url":"https://tse4.mm.bing.net/th?id=OIP.M7567c257275aeaacd5e4037a5c69ae7do1&pid=Api","origin_image_url":"https://tse4.mm.bing.net/th?id=OIP.M7567c257275aeaacd5e4037a5c69ae7do1&pid=Api","hostPageUrl":"https://tse4.mm.bing.net/th?id=OIP.M7567c257275aeaacd5e4037a5c69ae7do1&pid=Api"},{"scroll_image_url":"https://tse3.mm.bing.net/th?id=OIP.M9cfa7362b791260dbfbfbb2a5810a01eo2&pid=Api","main_image_url":"https://tse3.mm.bing.net/th?id=OIP.M9cfa7362b791260dbfbfbb2a5810a01eo2&pid=Api","origin_image_url":"https://tse3.mm.bing.net/th?id=OIP.M9cfa7362b791260dbfbfbb2a5810a01eo2&pid=Api","hostPageUrl":"https://tse3.mm.bing.net/th?id=OIP.M9cfa7362b791260dbfbfbb2a5810a01eo2&pid=Api"}]';
var InitResult = '{"requestId": "9db9db74-de37-4d9a-a6b6-c1b2ec2bdfb0","metadata": {"height": 533,"width": 800,"format": "Jpeg"},"result": {"celebrities": [{"name": "Satya Nadella","faceRectangle": {"width": 134,"height": 134,"left": 401,"top": 103},"confidence": 0.9576959}]}}';

$().ready(function () {
    HideLoadingIcon();

    $(".code ", $("#Celebrity")).html(JSON.stringify(JSON.parse(InitResult), null, 2));

    $("#searchImgO").empty().html("<div class='doc_bg'><div class='selectImg'id='OriginalselectImg'><div class='ScrollAreaWrapper'><div class='ScrollArea'></div></div></div></div><div class='selectBox'><a id='attributionId' class='imgAttribution' target='_blank' data-orig-url=''></a></div>");
    var jresponse = JSON.parse(InitImageData);
    var imageList, refresh;
    imageList = $(".ScrollArea");
    refresh = refreshL;
    myScrollLeft = "";
    if (jresponse != null && jresponse.length > 0) {
        imageList.html("");
        $.each(jresponse, function (index, element) {
            var image = '<p><img onload="fixBingImg(this)" src="' + element.scroll_image_url + '" data-orig-url="' + element.origin_image_url + '" data-url="' + element.main_image_url + '"data-orig-domain="' + urlTruncation(element.origin_image_url) + '"></p>';
            $(image).appendTo(imageList);
        });
        refresh(true);
    }
});

$("#maincontent").on("click", ".selectedbtnO", function () {
    checkImg();
});

function checkImg() {
    var selectimgUrl = $("#OriginalselectImg .selectedImage img").attr("src");
    if (selectimgUrl == null || selectimgUrl.length == 0) {
        return false;
    }
    var formData = {};
    formData.imageData = selectimgUrl;
    ShowLoadingIcon();
    $.ajaxAntiForgery({
        type: "POST",
        url: window.applicationRoot + "/Demo/VisionDemo/CelebrityRecognize",
        dataType: "json",
        data: formData,
        success: function (result) {
            reCaptchaSdk.RemoveReCaptcha();
            HideLoadingIcon();
            var response = JSON.parse(result);
            $(".code ", $("#Celebrity")).html(JSON.stringify(response, null, 2));
        },
        error: function (error) {
            reCaptchaSdk.ProcessReCaptchaStateCode(error, 'reCaptcha-VisionCelebrity-demo');
            HideLoadingIcon();
            if (error.status==500) {
                $(".code ", $("#Celebrity")).html("Your token expired, please refresh the page and try again.");
                return;
            }
            if (error.responseText == "Throttled") {
                $(".code ", $("#Celebrity")).html(error.responseText);
                return;
            }
            $(".code ", $("#Celebrity")).html("Intarnal service error.");
        }
    });
}

function loadIScroll(imageArea) {
    var images = $(imageArea).find(".ScrollArea p");
    var mleft = parseInt(images.css("margin-left").replace("px", "")) || 0;
    var mRight = parseInt(images.css("margin-right").replace("px", "")) || 0;
    var iWidth = 240;
    var totalWidth = (iWidth + mleft + mRight) * images.length;

    var scrollArea = $(imageArea).find(".ScrollArea");
    scrollArea.css("width", totalWidth + "px");
    var scrollAreaWrapper = $(imageArea).find(".ScrollAreaWrapper");

    var scrollObj = new IScroll(scrollAreaWrapper[0], {
        scrollX: true,
        scrollY: false,
        mouseWheel: true,
        snap: "p",
        momentum: true,
        tap: true,
        scrollbars: true,
        deceleration: .002,
        bounce: false
    });
    scrollObj.goToPage((images.length / 2).toFixed(0) - 1, 0, 0, false);

    $(images).on("tap", function () {
        if (scrollObj.currentPage.pageX !== $(this).index()) {
            $(scrollArea).find(".selectedImage").removeClass("selectedImage");
            scrollObj.goToPage($(this).index(), 0, 400);
        }
    });
    scrollObj.on("flick", function () {
        // this happens when someone flicks down, but it doesnt call scrollEnd
        if (this.x === this.startX) {
            updateSelectedImage(images, scrollObj);
        }
    });
    scrollObj.on('scrollStart', function () {
        $(scrollArea).find(".selectedImage").removeClass("selectedImage");
    });
    scrollObj.on('scrollEnd', function () {
        if (typeof (scrollArea) != 'undefined') {
            $(scrollArea).find(".selectedImage").removeClass("selectedImage");
            updateSelectedImage(images, scrollObj);
        }
    });

    //updateSelectedImage(images, scrollObj);

    return scrollObj;
}

var updateSelectedImage = function (images, curScroll) {
    var selectedImage = $(images)[curScroll.currentPage.pageX];
    if (selectedImage) {
        selectedImage.className = "selectedImage";
        var url = $(selectedImage).find("img").attr("data-orig-url");
        if (url.toLowerCase().indexOf('http://') < 0 || url.toLowerCase().indexOf('https://') < 0) {
            url = "http://" + url;
        }
        var dataOrigDomain = $(selectedImage).find("img").attr("data-orig-domain");
        $('#attributionId').attr('data-orig-url', url);
        $("#attributionId").attr("href", url).html(dataOrigDomain).css("display", "block");
    }
};

function refreshL(isscroll) {
    if (!myScrollLeft && isscroll == true)
        myScrollLeft = loadIScroll(document.getElementById("OriginalselectImg"));
    myScrollLeft.options.snap = myScrollLeft.scroller.querySelectorAll("p");

    var images = $('#OriginalselectImg .ScrollArea p');
    var mleft = parseInt(images.css("margin-left").replace("px", "")) || 0;
    var mRight = parseInt(images.css("margin-right").replace("px", "")) || 0;
    var iWidth = 240;
    var totalWidth = (iWidth + mleft + mRight) * images.length;
    $('#OriginalselectImg .ScrollArea').css("width", totalWidth + "px");
    myScrollLeft.refresh();
    myScrollLeft.goToPage((images.length / 2).toFixed(0) - 1, 0, 0, false);

    $('#OriginalselectImg .ScrollArea p').on('tap', function () {
        if (myScrollLeft.currentPage.pageX !== $(this).index()) {
            $('#OriginalselectImg .ScrollArea .selectedImage').removeClass('selectedImage');
            myScrollLeft.goToPage($(this).index(), 0, 400);
        }
    });
    myScrollLeft.on("flick", function () {
        // this happens when someone flicks down, but it doesnt call scrollEnd
        if (this.x === this.startX) {
            updateSelectedImage(images, myScrollLeft);
        }
    });
    myScrollLeft.on('scrollStart', function () {
        $(myScrollLeft).find(".selectedImage").removeClass("selectedImage");
    });
    myScrollLeft.on('scrollEnd', function () {
        if (typeof (scrollArea) != 'undefined') {
            $(scrollArea).find(".selectedImage").removeClass("selectedImage");

            updateSelectedImage(images, myScrollLeft);
        }
    });

    updateSelectedImage(images, myScrollLeft);
}

function searchImages() {
    var self = $("#searchformO");
    var query = $(self).find(".searchText").val();
    if (query == null || query.length === 0) {
        return false;
    }
    if ($("#maincontent").attr("data-selector-id") == "O")
        $("#searchText1").attr("value", $(".searchText").val());
    else
        $("#searchText2").attr("value", $(".searchText").val());
    $("#searchError").css("visibility", "hidden");
    var servicePath = window.applicationRoot + "/Demo/VisionDemo/BingImageSearch?query=" + encodeURIComponent(query);
    ShowLoadingIcon();
    $.ajaxAntiForgery({
        type: "POST",
        url: servicePath,
        data: {},
        dataType: "json",
        success: function (response) {
            reCaptchaSdk.RemoveReCaptcha();
            HideLoadingIcon();
            flag = true;
            $("#searchImgO").empty().html("<div class='doc_bg'><div class='selectImg'id='OriginalselectImg'><div class='ScrollAreaWrapper'><div class='ScrollArea'></div></div></div></div><div class='selectBox'><a id='attributionId' class='imgAttribution' target='_blank' data-orig-url=''></a></div>");
            var jresponse = JSON.parse(response);
            var imageList, refresh;
            imageList = $(".ScrollArea");
            refresh = refreshL;
            myScrollLeft = "";
            if (jresponse != null && jresponse.length > 0) {
                imageList.html("");
                $.each(jresponse, function (index, element) {
                    var image = '<p><img onload="fixBingImg(this)" src="' + element.scroll_image_url + '" data-orig-url="' + element.origin_image_url + '" data-url="' + element.main_image_url + '"data-orig-domain="' + urlTruncation(element.origin_image_url) + '"></p>';
                    $(image).appendTo(imageList);
                });
                refresh(true);
            }
        },
        error: function (xhr, status, error) {
            HideLoadingIcon();
            reCaptchaSdk.ProcessReCaptchaStateCode(xhr, 'reCaptcha-VisionCelebrity-demo');
            if (xhr.responseText == "Throttled") {
                $(".code ", $("#Celebrity")).html(xhr.responseText);
                return;
            }
            if (xhr.status === 404) {
                $(".code ", $("#Celebrity")).html("We did not find any results for " + query + ".");
            } else if (xhr.status == 403 && e.responseText!="")
            {
                $(".code ", $("#Celebrity")).html(e.responseText);
            } else {
                $(".code ", $("#Celebrity")).html("Oops, something went wrong. Please try searching again.");
            }
        }
    });
    return false;
}

function fixBingImg(img) {
    var theImage = new Image();
    theImage.onload = function () {
        var imageWidth = theImage.width;
        var imageHeight = theImage.height;
        if (imageWidth * imageHeight < 12500) {
            var h = 240;
            if (!IsPC()) h = 120;
            var str = "height:" + imageHeight / 2 + "px;margin-top:" + (h - imageHeight / 2) / 2 + "px";
            if (imageHeight > imageWidth)
                str = "width:" + imageWidth / 2 + "px;height:" + imageWidth / 2 / $(img).width() * $(img).height() + "px;margin-top:" + (h - imageWidth / 2 / $(img).width() * $(img).height()) / 2 + "px";
            $(img).attr("style", str);
        }
    }
    theImage.src = $(img).attr("data-url");
}

function IsPC() {
    var userAgentInfo = navigator.userAgent;
    var Agents = ["Android", "iPhone",
        "SymbianOS", "Windows Phone",
        "iPad", "iPod"];
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false;
            break;
        }
    }
    return flag;
}

function ShowLoadingIcon() {
    $("div[data-name='loading_icon']").show();
}

function HideLoadingIcon() {
    $("div[data-name='loading_icon']").hide();
}


function getUrlParam(name, url) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = url.match(reg);
    var link;
    if (r != null) {
        reg = new RegExp("(^(?:http://|www\.|https://)([^/]+))");
        link = (unescape(r[2]).match(reg))[2];
    }
    return link;
}

function urlTruncation(url) {
    var newUrl;
    if (url.length <= 10) {
        return url;
    }
    if (url.indexOf("http://") < 0 && url.indexOf("https://") < 0) {
        newUrl = url.substring(0, url.indexOf('/'));
    }
    else {
        newUrl = url.substring(0, url.indexOf('/', 8));
    }
    return newUrl;
}