/*
* Vision Analysis Demo script
*/

$(window).load(function () {
    $('#Analysis .informationbutton').css('display', 'block');

    window.ed_tool.centerImg($("#Analysis .visionImage"));
    $(window).resize(drawFaceRects);

    var initImagePath = $('#initImageUrl').val();
    var visionDemoType = $('#visionDemoType').val();

    // set the default image url for Analysis
    if (initImagePath && visionDemoType == 'Analysis') {
        // remove all data-selected class
        $('#Analysis .image-item').css('opacity', 0.5);
        $('#Analysis .image-item').removeAttr('data-selected');

        $('#Analysis input[type=text]').val(initImagePath);
        visionsdk.analyzeUrl(0);
    }
    else {
        initAnalysis();
    }

    // Add click event for Analysisimage list
    $('#Analysis .image-list,#Analysis .mobile-image-list').find(".image-item").each(function () {
        $(this).click(function () {
            visionsdk.fatherContainer = $(this).parents("div[data-demo-type='detection']");
            $('#Analysis .image-item').css('opacity', 0.5);
            $('#Analysis .image-item').removeAttr('data-selected');
            $(this).attr('data-selected', 'selected');
            $(this).css('opacity', 1);

            var largeImageUrl = $(this).children("img").attr("data-large-src") || $(this).attr("data-large-src");    
            $('#Analysis input[type=text]').val(largeImageUrl);
            visionsdk.analyzeUrl(0);
        });
    });
});

// draw rect
var current_features = {};

function drawFaceRects(isAdjust) {
    removeFaceRects();
    var image = $('#Analysis .visionImage')[0];
    if (!image) {
        return;
    }

    var left = 0;
    var top = 0;
    // get the image left and top
    if (isAdjust) {
        left = $(image).css('left') == 'auto' ? 0 : parseFloat($(image).css('left'));
        top = $(image).css('top') == 'auto' ? 0 : parseFloat($(image).css('top'));
    }

    if (current_features != null && current_features.faces != null) {
        var faces = current_features.faces;

        var heightRatio = image.height / visionsdk.metadata.height;
        var widthRatio = image.width / visionsdk.metadata.width;

        $.each(faces, function (index, element) {
            var rectangle = element.faceRectangle;
            var age = element.age;
            var gender = element.gender;
            var rect = {};
            rect.top = Math.round(heightRatio * rectangle.top) + top;
            rect.height = Math.round(heightRatio * rectangle.height);
            rect.left = Math.round(widthRatio * rectangle.left) + left;
            rect.width = Math.round(widthRatio * rectangle.width);
            var $container = $('#Analysis .visionfaces')[0];
            if (document.documentElement.lang == 'zh') {
                gender = gender.toLowerCase() == 'male' ? '男' : '女';
            }
            add_rect(rect, age, gender, index, $container);

        });

        if ($("#Analysis input[name='infromationshowornot']").val() == 0) {
            $('.visionfaces .tooltip ').hide();
        }
        else {
            $('.visionfaces .tooltip ').show();
        }
    }

    if ($("#Analysis input[name='infromationshowornot']").val() == 0) {
        $("#Analysis .visionInforamtion").hide();
    }
    else {
        $("#Analysis .visionInforamtion").show();
    }
}

function analysisProcessRequestInit() {
    current_features = {};
    removeFaceRects();
    removeVisionInfo();
    clearAnalysisFeatures();
}

function clearAnalysisFeatures() {
    $("#imgFormat").text("");
    $("#imgDim").text("");
    $("#clipArtType").text("");
    $("#lineDrawingType").text("");
    $("#isBWImg").text("");
    $("#adultScore").text("");
    $("#racyScore").text("");
    $("#adultContent").text("");
    $("#racyContent").text("");
    $("#facesDetails").text("");
    $("#categories").text("");
    $(".colorRect").css('display', 'none');
    $("#accentColorValue").text("");
    $("#imgTags").text("");
    $("#imgDescription").text("");
}

function analysisProcessRequestEnd(features) {
    current_features = features;
    if (features == null) {
        return;
    }

    $("#imgFormat").text(visionsdk.metadata == null ? "" : visionsdk.metadata.format);
    $("#imgDim").text(visionsdk.metadata == null ? "" : visionsdk.metadata.width + " x " + visionsdk.metadata.height);
    var clipArtType = "Unknown";
    var lineDrawingType = "Unknown";
    if (features.imageType != null) {
        switch (features.imageType.clipArtType) {
            case 0:
                clipArtType = "0 Non-clipart"
                break;
            case 1:
                clipArtType = "1 ambiguous"
                break;
            case 2:
                clipArtType = "2 normal-clipart"
                break;
            case 3:
                clipArtType = "3 good-clipart"
                break;
            default:
                clipArtType = "Unknown"
        }

        switch (features.imageType.lineDrawingType) {
            case 0:
                lineDrawingType = "0 Non-LineDrawing"
                break;
            case 1:
                lineDrawingType = "1 LineDrawing"
                break;
            default:
                lineDrawingType = "Unknown"
        }
    }
    $("#clipArtType").text(clipArtType);
    $("#lineDrawingType").text(lineDrawingType)

    var isRacyContent = "Unknown";
    var isAdultContent = "Unknown";
    if (features.adult != null) {
        if (features.adult.isRacyContent === true) {
            isRacyContent = "True";
        } else if (features.adult.isRacyContent === false) {
            isRacyContent = "False";
        }

        if (features.adult.isAdultContent === true) {
            isAdultContent = "True";
        } else if (features.adult.isAdultContent === false) {
            isAdultContent = "False";
        }

        $("#adultScore").text(features.adult.adultScore);
        $("#racyScore").text(features.adult.racyScore);
    }

    $("#adultContent").text(isAdultContent);
    $("#racyContent").text(isRacyContent);

    var isBWImg = "Unknown";
    if (features.color != null) {
        if (features.color.isBWImg === true) {
            isBWImg = "True";
        } else if (features.color.isBWImg === false) {
            isBWImg = "False";
        }
        $(".colorRect").css('display', 'block');
        $("#backgroundColor").css('background-color', features.color.dominantColorBackground);
        $("#foregroundColor").css('background-color', features.color.dominantColorForeground);

        $("#dominantClr").empty();
        for (var color in features.color.dominantColors) {
            $("#dominantClr").append('<div class="colorRect" style="background-color:' + features.color.dominantColors[color] + '"></div>');
        }
        $("#dominantClr .colorRect").css('display', 'block');
        $("#accentColor").css('background-color', "#" + features.color.accentColor);
        $("#accentColorValue").text("#" + features.color.accentColor);
    }
    $("#isBWImg").text(isBWImg);

    $("#facesDetails").text(features == null ? "" : JSON.stringify(features.faces, null, 2));
    $("#categories").text(features == null ? "" : JSON.stringify(features.categories, null, 2));

    $("#imgTags").text(features == null ? "" : JSON.stringify(features.tags, null, 2));
    $("#imgDescription").text(features == null ? "" : JSON.stringify(features.description, null, 2));

    drawFaceRects(true);

    var category = "No";
    if (features.categories != null && features.categories.length > 0) {
        category = features.categories[0].name;
    }

    drawInformationRects(isAdultContent, category);
    if ($("#Analysis input[name='infromationshowornot']").val() == 0) {
        $("#Analysis .visionInforamtion").hide();
    }
    else {
        $("#Analysis .visionInforamtion").show();
    }
};

function drawInformationRects(adultContent, category) {
    var image = $('#Analysis .visionImage')[0];

    // get the image left and top
    var left = $(image).css('left') == 'auto' ? 0 : parseFloat($(image).css('left'));
    var top = $(image).css('top') == 'auto' ? 0 : parseFloat($(image).css('top'));

    $("#Analysis .visionInforamtion").css({ bottom: top, left: left });
    $("#Analysis .vision-isAdultContent").text("Is Adult Content: " + adultContent);
    $("#Analysis .vision-categories").text("Categories: " + category);
}

function hideInformationRects() {
    $("#Analysis .visionInforamtion").Hide();
}

function removeFaceRects() {
    $("#Analysis .visionfaces").html("<div></div>");
}

function removeVisionInfo() {
    $("#Analysis .visionInforamtion").hide();
    $("#Analysis .vision-isAdultContent").text("Is Adult Content: Unknown");
    $("#Analysis .vision-categories").text("Categories: Unknown");
}

var add_rect = function (rect, age, gender, index, parent) {
    var id = 'rect' + Math.round(Math.random() * 10000);
    var tooltip = null;
    if (age != null) {
        tooltip = (document.documentElement.lang == 'zh' ? '年龄:&nbsp&nbsp' : 'Age:&nbsp&nbsp') + age;
    }
    if (tooltip != null && gender != null && gender !== "Unknown") {
        tooltip += '<br/>';
    }
    if (gender != null && gender !== "Unknown") {
        tooltip += (document.documentElement.lang == 'zh' ? '性别:&nbsp&nbsp' : 'Gender:&nbsp&nbsp') + gender;
    }

    var div = '<div data-html="true" class="child" title="' + tooltip + '" id="' + id + '"/>';
    //var div = "'<div class="child" title="aaa"/>';
    $(div)
        .appendTo(parent)
        .css("left", rect.left + "px")
        .css("top", rect.top + "px")
        .css("width", (rect.width) + "px")
        .css("height", (rect.height) + "px")
        .css("border", "2px solid " + "green")
        .css("position", "absolute");

    if (tooltip != null) {
        var placement = index % 2 === 0 ? 'bottom' : 'top';
        $('#' + id).tooltip({
            trigger: 'manual',
            'show': true,
            'placement': placement,
            'title': tooltip
        });

        $('#' + id).tooltip('show');
    }

};

function initAnalysis() {

    var defaultFeatures0 = {
        "categories": [{ "name": "people_swimming", "score": 0.98046875 }],
        "adult": {
            "isAdultContent": false, "isRacyContent": false,
            "adultScore": 0.14916780591011047, "racyScore": 0.12426207214593887
        }, "requestId": "451ce8a8-a5f1-4c14-b424-a2729f50edf3",
        "faces": [{ "age": 28, "gender": "Male", "faceRectangle": { "left": 744, "top": 338, "width": 305, "height": 305 } }],
        "color": {
            "dominantColorForeground": "Grey",
            "dominantColorBackground": "White", "dominantColors": ["White"], "accentColor": "19A4B2", "isBWImg": false
        }, "imageType": { "clipArtType": 0, "lineDrawingType": 0 },
        "tags": [{ "name": "water", "confidence": 0.99964427947998047 },
            { "name": "sport", "confidence": 0.95049923658370972 },
            { "name": "swimming", "confidence": 0.90628182888031006, "hint": "sport" },
            { "name": "pool", "confidence": 0.87875884771347046 },
            { "name": "water sport", "confidence": 0.631849467754364, "hint": "sport" }],
        "description": {
            "type": 0, "captions": [{
                "text": "a man swimming in a pool of water", "confidence": 0.7850108693093019
            }]
        }
    };
    var imageBasePath = $('#imagesBasePath').val();
    var initAnalysisImagePath = $('#Analysis .image-item[data-selected="selected"] img').attr('data-large-src');
    $('#Analysis input[type=text]').val(initAnalysisImagePath);
    $('#Analysis .visionImage').attr('src', initAnalysisImagePath);

    analysisProcessRequestInit();
    current_features = defaultFeatures0;
    analysisProcessRequestEnd(defaultFeatures0);

    $("#Analysis .visionImage").load(function () {
        drawFaceRects(false);
    });

    if ($("#Analysis input[name='infromationshowornot']").val() == 0) {
        $("#Analysis .visionInforamtion").hide();
    }
    else {
        $("#Analysis .visionInforamtion").show();
    }
    $("#Analysis .visionInforamtion").css({ bottom: "0px", left: "0px" });
}

