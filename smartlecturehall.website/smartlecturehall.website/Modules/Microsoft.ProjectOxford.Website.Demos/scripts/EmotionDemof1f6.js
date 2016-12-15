var emotionsdk = {
    acceptedTypes: {
        'image/png': true,
        'image/jpeg': true,
        'image/bmp': true,
        'image/gif': true
    },

    imageList: [],
    storedFormData: [],
    newSample: false,
    verifySampleLeft: false,
    verifySampleRight: false,
    //upload dataurl to get image info
    uploadImage: function (dataType, data, containerIndex) {
        var formData = {};
        if (dataType == "dataUrl") {
            var dataURL = data;
            var idx = dataURL.indexOf('base64,', 0);
            var typeIndex = dataURL.indexOf(';', 0);
            var format = dataURL.substr(5, typeIndex - 5);
            var dataPart = dataURL.substring(idx + 7, dataURL.length);
            formData.imageData = dataPart;
            formData.dataType = "data";
            formData.Time = Date();
            if (emotionsdk.acceptedTypes[format] === true) {
                //emotionsdk.loadingStart(containerIndex);

            } else {
                emotionsdk.error("Type error.", containerIndex);
                return;
            }
        }
        else if (dataType == "imageUrl") {
            //formData.Data = encodeURIComponent(data);
            formData.imageData = data;
            formData.dataType = "imageUrl";
            formData.Time = Date();
        }

        emotionsdk.newSample = data.indexOf(azureCdnEndpoint) != 0;

        emotionsdk.storedFormData[containerIndex] = formData;
        emotionsdk.imageList[containerIndex].container.parents("div[data-demo-type]").find(".code").html("Detecting...");
        $.ajaxAntiForgery({
            type: "POST",
            data: formData,
            dataType: "json",
            url: window.applicationRoot + "/Demo/EmotionDemo/RecognizeEmotion",
            success: function (result) {
                reCaptchaSdk.RemoveReCaptcha();
                var obj = JSON.parse(result);
                if (obj.error) {
                    emotionsdk.error(obj.error, containerIndex);
                }
                else {
                    emotionsdk.preview(dataType, data, obj, containerIndex);
                }
            },
            error: function (e) {
                reCaptchaSdk.ProcessReCaptchaStateCode(e, 'reCaptcha-Emotion-demo');
                $(".floatingCirclesG", emotionsdk.imageList[containerIndex].container).hide();           
                emotionsdk.error(e.responseText, containerIndex);
            },
            complete: function () {
                if (dataType == "dataUrl") {
                    emotionsdk.removeFile(containerIndex);
                }
            }
        });
    },
    shrinkJSONWindow: function () {
        $(".demo-codes.detection-demo-codes").css({ "margin-bottom": "32px" });
    },
    adjustJSONWindow: function () {
        $(".demo-codes.detection-demo-codes").css({ "margin-bottom": "0px" });
    },
    //detect image file
    detect: function (file, containerIndex) {
        if (file.size > 4194304) {
            emotionsdk.error(Message.ImageSizeImproper, containerIndex);
            emotionsdk.removeFile(containerIndex);
            return;
        }
        var reader = new FileReader();
        $(reader).load(function (event) {
            if (event.target.result) {
                emotionsdk.loadingStart(containerIndex);
                emotionsdk.uploadImage("dataUrl", event.target.result, containerIndex);
            }
            else {
                emotionsdk.error("Data error.", containerIndex);
            }
        });
        reader.readAsDataURL(file);
    },
    //show image and render detection results
    preview: function (dataType, data, imgInfo, containerIndex) {
        var image_delegate = new Image();
        image_delegate.onload = (function (e) {
            var demoSize = {};
            demoSize.Width = emotionsdk.imageList[containerIndex].container.width();
            demoSize.Height = emotionsdk.imageList[containerIndex].container.height();

            var showSize = getSize(demoSize, { Width: image_delegate.naturalWidth, Height: image_delegate.naturalHeight }, containerIndex);
            //remove others which covered canvas
            var img_drop = $(".img_drop", emotionsdk.imageList[containerIndex].container);
            img_drop.removeClass("img_drop_background");
            $(".floatingCirclesG", emotionsdk.imageList[containerIndex].container).hide();
            img_drop.html("<img src='" + $(image_delegate).attr('src') + "' style='"
                + (demoSize.Width / demoSize.Height < image_delegate.naturalWidth / image_delegate.naturalHeight
                ? "width:100%;left:0px;top:" + emotionsdk.imageList[containerIndex].offsetY + "%"
                : "height:100%;top:0px;left:" + emotionsdk.imageList[containerIndex].offsetX + "%") + "'  />");
            emotionsdk.renderDetectionResults(imgInfo, containerIndex);
        });
        $(image_delegate).attr('src', data);
    },
    //render detection results
    renderDetectionResults: function (imgInfo, containerIndex) {
        $(".labelbox", emotionsdk.imageList[containerIndex].container).remove();
        $(".facepoint", emotionsdk.imageList[containerIndex].container).remove();
        //$(".faceEmotion", emotionsdk.imageList[containerIndex].container).remove();

        emotionsdk.imageList[containerIndex].info = imgInfo;
        if (!imgInfo || imgInfo.length <= 0) {
            if (typeof (emotionsdk.resultProcess) != "undefined") {
                emotionsdk.resultProcess(containerIndex, false);
            }
            emotionsdk.error("0 face detected", containerIndex);
            return;
        }
        var facecountstring = "";
        if (imgInfo.length == 1) {
            imgInfo.length + " face detected\n\n";
        }
        else {
            facecountstring = imgInfo.length + " faces detected\n\n";
        }

        var imageContainer = emotionsdk.imageList[containerIndex];

        //Draw faces' rectangle
        for (var i = 0; i < imgInfo.length; i++) {
            var f = imgInfo[i];
            var top = imageContainer.offsetY
                + f.faceRectangle.top * imageContainer.scale * 100 / imageContainer.container.height();
            var left = imageContainer.offsetX
                + f.faceRectangle.left * imageContainer.scale * 100 / imageContainer.container.width();
            var width = f.faceRectangle.width * imageContainer.scale * 100 / imageContainer.container.width();
            var height = f.faceRectangle.height * imageContainer.scale * 100 / imageContainer.container.height();

            var style = 'top:' + top + '%;left:' + left
                + '%;width:' + width + '%;height:' + height + '%;';  //z-index:98;
            var hoverEvent = (containerIndex == 0 ? 'onmouseover="showFaceInfo(' + i + ',this,' + containerIndex
                + ')" onmouseout="hideImginfo(this)"' : '');
            $(".floatingCirclesG", imageContainer.container).before('<div ' + hoverEvent + ' bw="5" faceid="' + f.faceId
               + '" class="labelbox  labelpointer" style="' + style + '" ><div class="'
                 + "malelabelboxborder" + '"></div></div>');
        }
        imageContainer.container.parents("div[data-demo-type]").find("pre[data-name='code']").html(facecountstring + "JSON:\n" + JSON.stringify(imgInfo, null, 2));

        if (typeof (emotionsdk.resultProcess) != "undefined") {
            emotionsdk.resultProcess(containerIndex, true);
        }
    },
    resultProcess: function (containerIndex, validity) {
    },
    loadingStart: function (containerIndex) {
        $(".floatingCirclesG", emotionsdk.imageList[containerIndex].container).show();
    },
    error: function (message, containerIndex, type) {
        var container = emotionsdk.imageList[containerIndex].container;
        if (message.RequestId && message.RequestId == "00000000-0000-0000-0000-000000000000") {
            delete message.RequestId;
        }
        message = "Error:" + JSON.stringify(message, null, 2) || message;
        if (container.parents("div[data-demo-type]").find(".code").length > 0) {
            container.parents("div[data-demo-type]").find(".code").html(message);
        }
        else {
            alert(message);
        }
        $(".floatingCirclesG", container).hide();
        if (!type || type != "noReplaceImage") {
            var img_drop = $(".img_drop", container).removeClass("img_drop_background")
                .addClass("img_drop_background").children("img").remove();
            $(".labelbox", container).remove();
            $(".facepoint", container).remove();
        }
    },
    removeFile: function (containerIndex) {
        var fileControl = $("input[name='imageIndex'][value='" + containerIndex + "']").parents(".demo-content").find("input[type='file']")[0];
        $(fileControl).after($(fileControl).clone(true)).remove();
    },
    uuid: function uid() {
        var result = '';
        for (var i = 0; i < 32; i++)
            result += Math.floor(Math.random() * 16).toString(16).toUpperCase
            ();
        return result
    },
};

function allowDrop(ev) {
    ev.preventDefault();
}

//Drop a image into container
function drop(ev) {
    ev.preventDefault();
    if (ev.dataTransfer.files.length > 0) {
        var eventDropContainer = $(ev.target).parents('div[data-name="container"]') || $(ev.target);
        emotionsdk.detect(ev.dataTransfer.files[0], eventDropContainer.find("input[name='imageIndex']").val());
    }
}
//update image by url
function getImageInfoByUrl(container) {
    var imgUrl = $(".imgUrl", container).val();
    if (imgUrl && imgUrl != $(".imgUrl", container).attr("data-defultvalue")) {
        var containerIndex = 0;
        containerIndex = container.find("input[name='imageIndex']").val();
        detectImageByUrl(imgUrl, containerIndex);
    }
}
function detectImageByUrl(imgUrl, containerIndex) {
    emotionsdk.loadingStart(containerIndex);
    emotionsdk.uploadImage("imageUrl", imgUrl, containerIndex);
}
$().ready(function () {
    //initialize all demo-base controls
    for (var i = 0; i < $(".demo-content").length; i++) {
        var container = $($(".demo-content")[i]);
        var index = container.find("input[name='imageIndex']").val();
        if ($("input[name='pointshowornot']", container).val() == 0) {
            $(".markercontrol", container).attr("src", window.applicationRoot + "/Modules/Microsoft.ProjectOxford.Website.Demos/Images/eye_close.png");
        }
        else {
            $(".markercontrol", container).attr("src", window.applicationRoot + "/Modules/Microsoft.ProjectOxford.Website.Demos/Images/eye_open.png");
        }
        emotionsdk.imageList[index] = new Object();
        emotionsdk.imageList[index].container = container.children("div[data-name='container']");
        emotionsdk.imageList[index].scale = 0.0;
        emotionsdk.imageList[index].offsetX = 0.000;
        emotionsdk.imageList[index].offsetY = 0.000;
        emotionsdk.imageList[index].info = new Object;
    }
    //Eye button event bind
    $(".eyebutton").click(function () {
        if ($(this).children("input[name='pointshowornot']").val() == 0) {
            $(this).children("input[name='pointshowornot']").val(1);
            $(this).children("img").attr("src", window.applicationRoot + "/Modules/Microsoft.ProjectOxford.Website.Demos/Images/eye_open.png");
            $(this).parents(".demo-content").find(".facepoint").show();
        }
        else {
            $(this).children("input[name='pointshowornot']").val(0);
            $(this).children("img").attr("src", window.applicationRoot + "/Modules/Microsoft.ProjectOxford.Website.Demos/Images/eye_close.png");
            $(this).parents(".demo-content").find(".facepoint").hide();
        }
        $(this).children(".buttontooltip").hide();
        if ($(this).children("input[name='pointshowornot']").val() == 0) {
            $(this).children("span[data-name='showpoint']").show();
        }
        else {
            $(this).children("span[data-name='hidepoint']").show();
        }
    }).mouseover(function () {
        $(this).children(".buttontooltip").hide();
        if ($(this).children("input[name='pointshowornot']").val() == 0) {
            $(this).children("span[data-name='showpoint']").show();
        }
        else {
            $(this).children("span[data-name='hidepoint']").show();
        }
    }).mouseout(function () {
        $(this).children(".buttontooltip").hide();
    });
    $(".demo-bar-button").children().mouseover(function () {
        $(this).children("div.buttonMask").attr("class", "buttonMask hoverMask");
        if ($(this).children(".buttontooltip").length == 1) {
            $(this).children(".buttontooltip").show();
        }
    }).mouseout(function () {
        $(this).children("div.buttonMask").attr("class", "buttonMask");
        if ($(this).children(".buttontooltip").length == 1) {
            $(this).children(".buttontooltip").hide();
        }
    }).mousedown(function () {
        $(this).children("div.buttonMask").attr("class", "buttonMask pressMask");
    }).mouseup(function () {
        $(this).children("div.buttonMask").attr("class", "buttonMask hoverMask");
    });
    //detect file from input_file
    $("input[name='localFile']").bind('change', function (evt) {
        if (evt.target.files.length > 0) {
            var container = $(this).parents(".demo-content").children("div[data-name='container']");
            var containerIndex = 0;
            containerIndex = container.find("input[name='imageIndex']").val();
            emotionsdk.loadingStart(containerIndex);
            emotionsdk.detect(evt.target.files[0], containerIndex);
        }
    });
    $('div[data-name="localFilebutton"]').click(function (e) {
        e.preventDefault();
        $("input[name='localFile']", $(this).parent()).click();
        return false;
    });
    $(".imgUrl").focus(function () {
        if ($(this).val() == $(this).attr("data-defultvalue")) {
            $(this).val("");
            $(this).removeClass("defaultvalue");
        }
    }).blur(function () {
        if ($(this).val() == "") {
            $(this).val($(this).attr("data-defultvalue"));
            $(this).addClass("defaultvalue");
        }
    });
    $("div[data-name='sumbitbutton']").click(function () {
        getImageInfoByUrl($(this).parents(".demo-content"));
    });
});
//show a face's data when mouse hover on it
function showFaceInfo(index, con, containerIndex) {
    var Scores = emotionsdk.imageList[containerIndex].info[index].scores;
    var html = '<p><span>Anger</span>' + Scores.anger.toFixed(5) + '</p>';
    html += '<p><span>Contempt</span>' + Scores.contempt.toFixed(5) + '</p>';
    html += '<p><span>Disgust</span>' + Scores.disgust.toFixed(5) + '</p>';
    html += '<p><span>Fear</span>' + Scores.fear.toFixed(5) + '</p>';
    html += '<p><span>Happiness</span>' + Scores.happiness.toFixed(5) + '</p>';
    html += '<p><span>Neutral</span>' + Scores.neutral.toFixed(5) + '</p>';
    html += '<p><span>Sadness</span>' + Scores.sadness.toFixed(5) + '</p>';
    html += '<p><span>Surprise</span>' + Scores.surprise.toFixed(5) + '</p>';
    var markDiv = $(".labelbox:eq(" + index + ")", $(con).parents("div[data-name='container']"));
    var width = markDiv.width();
    var top = markDiv.position().top;
    var left = markDiv.position().left;
    var height = markDiv.height();

    var faceinfobox = $(".faceinfo", $(con).parents("div[data-name='container']"));
    faceinfobox.children(".facecode").html(html);
    var faceinfoboxHeight = faceinfobox.height();
    //Set faceinfo box position
    if (Number(left)
        / ($(con).parents("div[data-name='container']").width() - (Number(width) + Number(left))) < 1) {
        faceinfobox.css("top", Number(top) + height / 2 - faceinfoboxHeight / 2 - 10 + "px")
            .css("left", Number(width) + Number(left) + 10 + "px");
        faceinfobox.children("span[data-type='tiparrow']").attr("class", "tiparrowleft").css("top", faceinfoboxHeight / 2 + "px");
    }
    else {
        faceinfobox.css("top", Number(top) + height / 2 - faceinfoboxHeight / 2 - 10 + "px")
            .css("left", Number(left) - Number(faceinfobox.width()) - 30 + "px");
        faceinfobox.children("span[data-type='tiparrow']").attr("class", "tiparrowright").css("top", faceinfoboxHeight / 2 + "px");
    }
    faceinfobox.show();
}
function hideImginfo(con) {
    $(".faceinfo", $(con).parents("div[data-name='container']")).hide();
}

//get new size by container's size and image's size
function getSize(ContainerSize, ImageSize, containerIndex) {
    var showSize = {};
    if (ImageSize.Width * ContainerSize.Height < ImageSize.Height * ContainerSize.Width) {
        emotionsdk.imageList[containerIndex].scale = ContainerSize.Height / ImageSize.Height;
        showSize.Height = ContainerSize.Height;
        showSize.Width = emotionsdk.imageList[containerIndex].scale * ImageSize.Width;
    }
    else {
        emotionsdk.imageList[containerIndex].scale = ContainerSize.Width / ImageSize.Width;
        showSize.Width = ContainerSize.Width;
        showSize.Height = emotionsdk.imageList[containerIndex].scale * ImageSize.Height;

    }
    //percentage
    emotionsdk.imageList[containerIndex].offsetX = (ContainerSize.Width - showSize.Width) * 50 / ContainerSize.Width;
    emotionsdk.imageList[containerIndex].offsetY = (ContainerSize.Height - showSize.Height) * 50 / ContainerSize.Height;
    return showSize;
}

