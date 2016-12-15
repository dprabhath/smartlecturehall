var facesdk = {
    acceptedTypes: {
        'image/png': true,
        'image/jpeg': true,
        'image/bmp': true,
        'image/gif': true
    },

    imageList: [],
    storedFormData: [],
    detectionSample: false,
    verifySampleLeft: false,
    verifySampleRight: false,
    demoTypeClass: '',
    //upload dataurl to get image info
    uploadImage: function (dataType, data, containerIndex) {
        var formData = {};
        if (dataType == "dataUrl") {
            var dataURL = data;
            var idx = dataURL.indexOf('base64,', 0);
            var typeIndex = dataURL.indexOf(';', 0);
            var format = dataURL.substr(5, typeIndex - 5);
            var dataPart = dataURL.substring(idx + 7, dataURL.length);
            formData.Data = dataPart;
            formData.DataType = "data";
            formData.Time = Date();
            if (facesdk.acceptedTypes[format] === true) {
                //facesdk.loadingStart(containerIndex);

            } else {
                facesdk.error("Type error.", containerIndex);
                return;
            }
        }
        else if (dataType == "imageUrl") {
            formData.Data = encodeURIComponent(data);
            formData.DataType = "imageUrl";
            formData.Time = Date();
            //facesdk.loadingStart(containerIndex);
        }
        if (containerIndex == 0) {
            formData.ActionType = "detection";
            facesdk.detectionSample = data.indexOf(azureCdnEndpoint + "face/") != 0;
            demoTypeClass = 'reCaptcha-FaceDetection-demo';
        }
        else if (containerIndex == 1 || containerIndex == 2) {
            formData.ActionType = "verification";
            if (containerIndex == 1) {
                facesdk.verifySampleLeft = data.indexOf(azureCdnEndpoint + "face/") != 0;
            }
            else if (containerIndex == 2) {
                facesdk.verifySampleRight = data.indexOf(azureCdnEndpoint + "face/") != 0;
            }
            demoTypeClass = 'reCaptcha-FaceVerification-demo';
            formData.demoType = 'FaceVerification';
        }
        facesdk.storedFormData[containerIndex] = formData;
        facesdk.imageList[containerIndex].container.parents("div[data-demo-type]").find(".code").html("Detecting...");
        $.ajaxAntiForgery({
            type: "post",
            data: formData,
            dataType: "json",
            url: window.applicationRoot + "/Demo/FaceDetectionDemo/Detect",
            success: function (result, status, request) {
                if (request.getResponseHeader('Recaptcha-Verify') != 'ignore') {
                    reCaptchaSdk.RemoveReCaptcha();
                }
                var obj = JSON.parse(result);
                if (obj.error) {
                    facesdk.error(obj.error, containerIndex);
                }
                else {
                    facesdk.preview(dataType, data, obj, containerIndex);
                }
            },
            error: function (e) {   
                reCaptchaSdk.ProcessReCaptchaStateCode(e, demoTypeClass);
                facesdk.error(e.responseText, containerIndex);
            },
            complete: function () {
                if (dataType == "dataUrl") {
                    facesdk.removeFile(containerIndex);
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
            facesdk.error(Message.ImageSizeImproper, containerIndex);
            facesdk.removeFile(containerIndex);
            return;
        }
        var reader = new FileReader();
        $(reader).load(function (event) {
            if (event.target.result) {
                facesdk.loadingStart(containerIndex);
                facesdk.uploadImage("dataUrl", event.target.result, containerIndex);
            }
            else {
                facesdk.error("Data error.", containerIndex);
            }
        });
        reader.readAsDataURL(file);
    },
    //show image and render detection results
    preview: function (dataType, data, imgInfo, containerIndex) {
        if (data == undefined) return;
        var image_delegate = new Image();
        if (dataType == "imageUrl") {
            format = "data:image/" + data.substr(data.lastIndexOf('.') + 1) + ";base64,";
            var formData = {};
            formData.Url = data;
            $.ajaxAntiForgery({
                type: "POST",
                data: formData,
                url: window.applicationRoot + "/Demo/DemoShared/RotateImage",
                dataType: "text",
                success: function (result) {
                    var newData = format + result;
                    image_delegate.onload = (function (e) {
                        var demoSize = {};
                        demoSize.Width = facesdk.imageList[containerIndex].container.width();
                        demoSize.Height = facesdk.imageList[containerIndex].container.height();

                        var showSize = getSize(demoSize, { Width: image_delegate.naturalWidth, Height: image_delegate.naturalHeight }, containerIndex);
                        //remove others which covered canvas
                        var img_drop = $(".img_drop", facesdk.imageList[containerIndex].container);
                        img_drop.removeClass("img_drop_background");
                        $(".floatingCirclesG", facesdk.imageList[containerIndex].container).hide();
                        img_drop.html("<img src='" + $(image_delegate).attr('src') + "' style='"
                            + (demoSize.Width / demoSize.Height < image_delegate.naturalWidth / image_delegate.naturalHeight
                            ? "width:100%;left:0px;top:" + facesdk.imageList[containerIndex].offsetY + "%"
                            : "height:100%;top:0px;left:" + facesdk.imageList[containerIndex].offsetX + "%") + "'  />");
                        facesdk.renderDetectionResults(imgInfo, containerIndex);
                    });
                    $(image_delegate).attr('src', newData);
                },
                error: function (e) {
                }
            });
        } else {
            var Orientation = 1;
            var flag = true;
            var format;
            var typeIndex = data.indexOf(';', 0);
            format = data.substr(5, typeIndex - 5);

            image_delegate.onload = (function (e) {
                if (flag) {
                    EXIF.getData(this, function () {
                        Orientation = EXIF.getTag(this, 'Orientation');
                    });
                    var expectWidth = this.naturalWidth;
                    var expectHeight = this.naturalHeight;

                    var canvas = document.createElement("canvas");
                    var ctx = canvas.getContext("2d");
                    canvas.width = expectWidth;
                    canvas.height = expectHeight;

                    ctx.drawImage(this, 0, 0, expectWidth, expectHeight);

                    var base64 = null;

                    switch (Orientation) {
                        case 6:
                            rotateImg(this, 90, canvas);
                            break;
                        case 8:
                            rotateImg(this, 270, canvas);
                            break;
                        case 3:
                            rotateImg(this, 180, canvas);
                            break;
                    }
                    flag = false;
                    base64 = canvas.toDataURL(format, 0.8);
                    $(image_delegate).attr('src', base64);
                }
                else {
                    var demoSize = {};
                    demoSize.Width = facesdk.imageList[containerIndex].container.width();
                    demoSize.Height = facesdk.imageList[containerIndex].container.height();

                    var showSize = getSize(demoSize, { Width: image_delegate.naturalWidth, Height: image_delegate.naturalHeight }, containerIndex);
                    //remove others which covered canvas
                    var img_drop = $(".img_drop", facesdk.imageList[containerIndex].container);
                    img_drop.removeClass("img_drop_background");
                    $(".floatingCirclesG", facesdk.imageList[containerIndex].container).hide();
                    img_drop.html("<img src='" + $(image_delegate).attr('src') + "' style='"
                        + (demoSize.Width / demoSize.Height < image_delegate.naturalWidth / image_delegate.naturalHeight
                        ? "width:100%;left:0px;top:" + facesdk.imageList[containerIndex].offsetY + "%"
                        : "height:100%;top:0px;left:" + facesdk.imageList[containerIndex].offsetX + "%") + "'  />");
                    facesdk.renderDetectionResults(imgInfo, containerIndex);
                }
            });
            $(image_delegate).attr('src', data);
        }


    },
    //render detection results
    renderDetectionResults: function (imgInfo, containerIndex) {
        $(".labelbox", facesdk.imageList[containerIndex].container).remove();
        $(".facepoint", facesdk.imageList[containerIndex].container).remove();

        facesdk.imageList[containerIndex].info = imgInfo;
        if (!imgInfo || imgInfo.length <= 0) {
            if (typeof (facesdk.resultProcess) != "undefined") {
                facesdk.resultProcess(containerIndex, false);
            }
            facesdk.error("0 face detected", containerIndex);
            return;
        }
        var facecountstring = "";
        if (imgInfo.length == 1) {
            imgInfo.length + " face detected\n\n";
        }
        else {
            facecountstring = imgInfo.length + " faces detected\n\n";
        }

        //Draw faces' rectangle
        for (var i = 0; i < imgInfo.length; i++) {
            var f = imgInfo[i];
            if (f.faceLandmarks) {
                for (var key in f['faceLandmarks']) {
                    var p = f['faceLandmarks'][key];
                    p['x'] = parseFloat(p['x'].toFixed(1));
                    p['y'] = parseFloat(p['y'].toFixed(1));
                }
            }
            if (f.faceAttributes.headPose) {
                var headPose = f.faceAttributes.headPose;
                headPose.roll = parseFloat(headPose.roll.toFixed(1));
                headPose.yaw = parseFloat(headPose.yaw.toFixed(1));
                headPose.pitch = parseFloat(headPose.pitch.toFixed(1));
            }
            var imageContainer = facesdk.imageList[containerIndex];
            var top = imageContainer.offsetY
                + f.faceRectangle.top * imageContainer.scale * 100 / imageContainer.container.height();
            var left = imageContainer.offsetX
                + f.faceRectangle.left * imageContainer.scale * 100 / imageContainer.container.width();
            var width = f.faceRectangle.width * imageContainer.scale * 100 / imageContainer.container.width();
            var height = f.faceRectangle.height * imageContainer.scale * 100 / imageContainer.container.height();

            var style = 'top:' + top + '%;left:' + left
                + '%;width:' + width + '%;height:' + height + '%;';
            var hoverEvent = (containerIndex == 0 ? 'onmouseover="showFaceInfo(' + i + ',this,' + containerIndex
                + ')" onmouseout="hideImginfo(this)"' : '');
            $(".floatingCirclesG", imageContainer.container).before('<div ' + hoverEvent + ' bw="5" faceid="' + f.faceId
                + '" class="labelbox  labelpointer" style="' + style + '" ><div class="'
                + (f.faceAttributes.gender.toLowerCase() == "male" ? "malelabelboxborder" : "femalelabelboxborder") + '"></div></div>');
            //Draw faces' points
            facesdk.drawPoints(f, containerIndex);

        }
        if (containerIndex == 0) {
            imageContainer.container.parents("div[data-demo-type]").find("pre[data-name='code']").html(facecountstring + "JSON:\n" + JSON.stringify(imgInfo, null, 2));
        }

        if (typeof (facesdk.resultProcess) != "undefined") {
            facesdk.resultProcess(containerIndex, true);
        }
    },
    //Draw faces' points
    drawPoints: function (face, containerIndex) {

        var imageContainer = facesdk.imageList[containerIndex];
        var shoulddraw = $("input[name='pointshowornot']", imageContainer.container.parent(".demo-content")).val() == "1";
        if (face.faceLandmarks) {
            var i = 0
            for (var key in face['faceLandmarks']) {
                if (i >= 5) {
                    break;
                }
                var p = face['faceLandmarks'][key];
                var x = p['x'] * imageContainer.scale * 100 / imageContainer.container.width() + imageContainer.offsetX;
                var y = p['y'] * imageContainer.scale * 100 / imageContainer.container.height() + imageContainer.offsetY;
                $(".floatingCirclesG", imageContainer.container).before('<div class="facepoint '
                    + (face.faceAttributes.gender.toLowerCase() == "male" ? "malefacepoint" : "femalefacepoint")
                    + '" style="top:' + (y - 0.5) + '%;left:' + (x - 0.5) + '%;' + (shoulddraw ? "" : "display:none;") + '"' + '></div>');
                i++;
            }
        }
    },
    resultProcess: function (containerIndex, validity) { },
    loadingStart: function (containerIndex) {
        $(".floatingCirclesG", facesdk.imageList[containerIndex].container).show();
    },
    error: function (message, containerIndex, type) {
        var container = facesdk.imageList[containerIndex].container;
        if (message.requestId && message.requestId == "00000000-0000-0000-0000-000000000000") {
            delete message.requestId;
        }
        message = typeof message == 'string' ? message : message.error.message;
        if (container.parents("div[data-demo-type]").find(".code").length > 0) {
            var style = "";
            containerIndex = parseInt(containerIndex);
            switch (containerIndex) {
                case 0:
                    container.parents("div[data-demo-type]").find(".code").html('<div style="color:red">' + message + '</div>');
                    break;
                case 1:
                    $("div[data-demo-type='verification']").find("pre").attr("style", style).html("There's some detection error in the left picture.");
                    break;
                case 2:
                    $("div[data-demo-type='verification']").find("pre").attr("style", style).html("There's some detection error in the right picture.");
                    break;
            }
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
        facesdk.detect(ev.dataTransfer.files[0], eventDropContainer.find("input[name='imageIndex']").val());
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
    facesdk.loadingStart(containerIndex);
    facesdk.uploadImage("imageUrl", imgUrl, containerIndex);
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
        facesdk.imageList[index] = new Object();
        facesdk.imageList[index].container = container.children("div[data-name='container']");
        facesdk.imageList[index].scale = 0.0;
        facesdk.imageList[index].offsetX = 0.000;
        facesdk.imageList[index].offsetY = 0.000;
        facesdk.imageList[index].info = new Object;
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
            containerIndex = parseInt(container.find("input[name='imageIndex']").val());
            facesdk.loadingStart(containerIndex);
            facesdk.detect(evt.target.files[0], containerIndex);
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
    var attributes = facesdk.imageList[containerIndex].info[index].faceAttributes;
    var lang = document.documentElement.lang;
    if (lang.indexOf('en') >= 0) {
        var html = '<p><span>age</span>' + attributes.age.toFixed(1) + '</p>';
        html += '<p><span>gender</span>' + attributes.gender + '</p>';

        if (attributes.smile > 0.0) {
            html += '<p>smiling</p>';
        }

        if (attributes.facialHair && attributes.facialHair.beard > 0.3) {
            html += '<p>with beard</p>';
        }

        if (attributes.glasses) {
            html += '<p>' + attributes.glasses + '</p>';
        }
    }
    else {
        var html = '<p><span>年龄</span>' + attributes.age.toFixed(1) + '</p>';
        if (attributes.gender == 'male') {
            html += '<p><span>性别</span>' + '男' + '</p>';
        }
        else {
            html += '<p><span>性别</span>' + '女' + '</p>';
        }

        if (attributes.smile > 0.0) {
            html += '<p>微笑</p>';
        }

        if (attributes.facialHair && attributes.facialHair.beard > 0.3) {
            html += '<p>有胡须</p>';
        }

        if (attributes.glasses.toLowerCase() == 'sunglasses') {
            html += '<p>戴墨镜</p>';
        }
        else if (attributes.glasses.toLowerCase() == 'readingglasses') {
            html += '<p>戴眼镜</p>';
        }
        else if (attributes.glasses.toLowerCase() == 'swimminggoggles') {
            html += '<p>戴泳镜</p>';
        }
    }

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


////convert image to dataUrl
//function convertImgToBase64(url, callback, outputFormat) {
//    var canvas = document.createElement('CANVAS'),
//        ctx = canvas.getContext('2d'),
//        img = new Image;
//    img.crossOrigin = 'Anonymous';
//    img.onload = function () {
//        canvas.height = img.height;
//        canvas.width = img.width;
//        ctx.drawImage(img, 0, 0);
//        var dataURL = canvas.toDataURL(outputFormat || 'image/jpeg');
//        callback.call(this, dataURL);
//        canvas = null;
//        ctx = null;
//    };
//    img.src = url;
//}

//get new size by container's size and image's size
function getSize(ContainerSize, ImageSize, containerIndex) {
    var showSize = {};
    if (ImageSize.Width * ContainerSize.Height < ImageSize.Height * ContainerSize.Width) {
        facesdk.imageList[containerIndex].scale = ContainerSize.Height / ImageSize.Height;
        showSize.Height = ContainerSize.Height;
        showSize.Width = facesdk.imageList[containerIndex].scale * ImageSize.Width;
    }
    else {
        facesdk.imageList[containerIndex].scale = ContainerSize.Width / ImageSize.Width;
        showSize.Width = ContainerSize.Width;
        showSize.Height = facesdk.imageList[containerIndex].scale * ImageSize.Height;

    }
    //percentage
    facesdk.imageList[containerIndex].offsetX = (ContainerSize.Width - showSize.Width) * 50 / ContainerSize.Width;
    facesdk.imageList[containerIndex].offsetY = (ContainerSize.Height - showSize.Height) * 50 / ContainerSize.Height;
    return showSize;
}

