var serviceBasePath = window.applicationRoot + "/Demo/VisionDemo/";
var smartCropping = true;
var lastThumbnailIsfile = false;
var tmpFile = null;

var visionsdk = {
    newSample: false,
    fatherContainer: null,
    storedFormData: [],
    imageList: [],
    metadata: { "width": 1500, "height": 1155, "format": "jpeg" },
    demoTypeClass: '',

    processRequest: function (containerIndex, isFile, originData) {
        var tempContainer = visionsdk.fatherContainer;
        visionsdk.adjustJSONWindow(tempContainer);
        var formData = {};
        formData.smartCropping = smartCropping;

        $('#thumbnailContainer').show();
        $('#thumbnailErrorCode').remove();
        var servicePath;
        if (containerIndex == 1) {
            servicePath = serviceBasePath + 'Thumbnail';
            lastThumbnailIsfile = isFile;
            demoTypeClass = 'reCaptcha-VisionThumbnail-demo';
        } else {
            var img = new Image();
            img.onload = function () {
                visionsdk.metadata.width = img.naturalWidth;
                visionsdk.metadata.height = img.naturalHeight;
            }
            img.src = originData;

            analysisProcessRequestInit();
            servicePath = serviceBasePath + "Analysis";
            demoTypeClass = 'reCaptcha-VisionAnalysis-demo';
        }

        var data;
        var cType;
        if (isFile) {
            var dataURL = originData;
            var idx = dataURL.indexOf('base64,', 0);
            var typeIndex = dataURL.indexOf(';', 0);
            var dataPart = dataURL.substring(idx + 7, dataURL.length);
            formData.imageData = dataPart;
            formData.dataType = "data";

            data = new FormData();
            cType = false;
            var files = containerIndex == 0 ? $("#Analysis input[type=file]")[0].files : $("#Thumbnail input[type=file]")[0].files;

            //if no file was uploaded, we don't need to continue to send a request.
            if (files.length == 0) {
                return;
            }

            if (files[0].size > 4194304) {
                this.handleError(containerIndex, "Image size is too big.");
                return;
            }
            // Add the uploaded image content to the form data collection
            data.append("UploadedData", files[0]);
            visionsdk.newSample = true;
        } else {
            var imageUrl = containerIndex == 0 ? $('#Analysis input[type=text]').val() : $('#Thumbnail input[type=text]').val();

            // if the imageUrl is null or empty, we shouldn't continue to send a request.
            if (!imageUrl) {
                return;
            }
            formData.imageData = imageUrl;
            formData.dataType = "imageUrl";

            //remove the file from file control when we try to use the image url.
            visionsdk.removeFile(containerIndex);

            var json = {};
            cType = "application/json";
            json.Url = imageUrl;
            data = JSON.stringify(json);
            visionsdk.newSample = imageUrl.indexOf(azureCdnEndpoint) != 0;
        }
        if (containerIndex == 0) {
            $('#analysisError').hide();
            $('#featureTable').show();
        } else {
            $('#thumbnailError').hide();
            $('#thumbnailContainer').show();
        }

        loadingStart(containerIndex);
        visionsdk.storedFormData[containerIndex] = formData;

        //$.ajax({
        $.ajaxAntiForgery({
            type: "POST",
            url: servicePath,
            dataType: "json",
            data: formData,
            success: function (result) {
                reCaptchaSdk.RemoveReCaptcha();
                var response = JSON.parse(result);
                if (response.metadata != null) {
                    visionsdk.metadata = response.metadata;
                }
                if (containerIndex == 0) {
                    analysisProcessRequestEnd(response);
                } else {
                    renderThumbnailResult(response);
                }
            },

            error: function (error) {
                reCaptchaSdk.ProcessReCaptchaStateCode(error, demoTypeClass);
                loadingStop(containerIndex);
                var errorObject = $.parseJSON(error.responseText)
                var errorMessage = "Unknown error";
                if (errorObject) {
                    errorMessage = errorObject.message;
                }

                visionsdk.handleError(containerIndex, errorMessage);
            },

            complete: function (result) {
                loadingStop(containerIndex);
            }
        });
    },

    handleFileSelect: function (containerIndex, evt) {
        var files = evt.target.files; // FileList object

        // Loop through the FileList and render image files as thumbnails.
        for (var i = 0, f; f = files[i]; i++) {

            // Only process image files.
            if (!f.type.match('image.*')) {
                continue;
            }

            var reader = new FileReader();

            // Closure to capture the file information.
            reader.onload = (function (theFile) {
                return function (e) {

                    var image_delegate = new Image();
                    var Orientation = 1;
                    var format;
                    var typeIndex = e.target.result.indexOf(';', 0);
                    format = e.target.result.substr(5, typeIndex - 5);

                    image_delegate.onload = (function (e) {
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

                        //// TODO: Render thumbnail.
                        if (containerIndex == 0) {
                            var thumbnail = $('#Analysis .visionImage')[0];
                            thumbnail.setAttribute('src', base64);
                        }
                        else {
                            var thumbnail = $('#Thumbnail .visionImage')[0];
                            thumbnail.setAttribute('src', base64);
                        }

                        tmpFile = $(image_delegate).attr('src');

                        visionsdk.processRequest(containerIndex, true, base64);
                    });
                    $(image_delegate).attr('src', e.target.result);
                };
            })(f);

            // Read in the image file as a data URL.
            reader.readAsDataURL(f);
        }
    },

    analyzeUrl: function (containerIndex) {
        var imageUrl = "";
        if (containerIndex == 0) {
            imageUrl = $('#Analysis input[type=text]').val();
            if (imageUrl == "") {
                return;
            }
        }
        else {
            imageUrl = $('#Thumbnail input[type=text]').val();
            if (imageUrl == "") {
                return;
            }
        }

        format = "data:image/jpg;base64,";
        var formData = {};
        formData.Url = imageUrl;
        $.ajaxAntiForgery({
            type: "POST",
            data: formData,
            url: window.applicationRoot + "/Demo/DemoShared/RotateImage",
            dataType: "text",
            success: function (result) {
                var newData = format + result;

                if (containerIndex == 0) {
                    $('#Analysis .visionImage').attr('src', newData);
                    visionsdk.processRequest(0, false, imageUrl);
                }
                else {
                    $('#Thumbnail .visionImage').attr('src', newData);
                    visionsdk.processRequest(1, false, imageUrl);
                }

            },
            error: function (e) {
            }
        });
    },

    handleError: function (containerIndex, errorMessage) {
        if (containerIndex == 0) {
            $('#analysisError').show();
            $('#featureTable').hide();
            $('#analysisError').text(errorMessage);
        } else {
            $('#thumbnailError').show();
            $('#thumbnailContainer').hide();
            $('#thumbnailError').text(errorMessage);
        }
    },

    removeFile: function (containerIndex) {
        var fileControl = containerIndex == 0 ? $("#Analysis input[type=file]")[0] : $("#Thumbnail input[type=file]")[0];
        if (fileControl.files.length > 0) {
            $(fileControl).after($(fileControl).clone(true)).remove();
        }
    },

    shrinkJSONWindow: function (container) {
        $("#processedDiv", container).css({ "bottom": "32px" });
        $("#ocrTextTab", container).css({ "bottom": "32px" });
        $("#ocrCodeTab", container).css({ "bottom": "32px" });
        $(".vision-demo-result", container).css({ "bottom": "32px" });
    },
    adjustJSONWindow: function (container) {
        $("#processedDiv", container).css({ "bottom": "0px" });
        $("#ocrTextTab", container).css({ "bottom": "0px" });
        $("#ocrCodeTab", container).css({ "bottom": "0px" });
        $(".vision-demo-result", container).css({ "bottom": "0px" });
    },
};

$(window).load(function () {
    $(".image-item").each(function () {
        $(this).mouseover(function () {
            var selected = $(this).attr("data-selected")
            if (selected != "selected") {
                $(this).css('opacity', 1);
            }
        }).mouseout(function () {
            var selected = $(this).attr("data-selected")
            if (selected != "selected") {
                $(this).css('opacity', 0.5);
            }
        });
    });

    $('.visionImage').removeAttr('hidden');
    $('.visionfaces').removeAttr('hidden');

    for (var i = 0; i < $(".demo-content").length; i++) {
        var container = $($(".demo-content")[i]);
        var index = container.find("input[name='imageIndex']").val();

        visionsdk.imageList[index] = new Object();
        visionsdk.imageList[index].container = container.children("div[data-name='container']");
        visionsdk.imageList[index].scale = 0.0;
        visionsdk.imageList[index].offsetX = 0.000;
        visionsdk.imageList[index].offsetY = 0.000;
        visionsdk.imageList[index].info = new Object;
    }

    //Infomation button event bind
    $(".informationbutton").click(function () {
        if ($(this).children("input[name='infromationshowornot']").val() == 0) {
            $(this).children("input[name='infromationshowornot']").val(1);
            $(this).children("img").attr("src", window.applicationRoot + "/Modules/Microsoft.ProjectOxford.Website.Demos/Images/Information_icon_ON.PNG");
            $('.visionfaces .tooltip').show();
            $("#Analysis .visionInforamtion").show();
        }
        else {
            $(this).children("input[name='infromationshowornot']").val(0);
            $(this).children("img").attr("src", window.applicationRoot + "/Modules/Microsoft.ProjectOxford.Website.Demos/Images/Information_icon_OFF.PNG");
            $('.visionfaces .tooltip ').hide();
            $("#Analysis .visionInforamtion").hide();
        }
        $(this).children(".buttontooltip").hide();
        if ($(this).children("input[name='infromationshowornot']").val() == 0) {
            $(this).children("span[data-name='showinformation']").show();
        }
        else {
            $(this).children("span[data-name='hideinformation']").show();
        }
    }).mouseover(function () {
        $(this).children(".buttontooltip").hide();
        if ($(this).children("input[name='infromationshowornot']").val() == 0) {
            $(this).children("span[data-name='showinformation']").show();
        }
        else {
            $(this).children("span[data-name='hideinformation']").show();
        }
    }).mouseout(function () {
        $(this).children(".buttontooltip").hide();
    });

    //smartcropping button event bind
    $(".smartcroppingbutton").click(function () {
        $(".image-list-container", $(this).parents("div[class='detection-demo']")).show();
        if ($(this).children("input[name='smartcroppingOnorOff']").val() == 0) {
            $(this).children("input[name='smartcroppingOnorOff']").val(1);
            $(this).children("img").attr("src", window.applicationRoot + "/Modules/Microsoft.ProjectOxford.Website.Demos/Images/SmartCropping_ON.PNG");
            $(this).parents(".demo-content").find(".facepoint").show();

            smartCropping = true;
        }
        else {
            $(this).children("input[name='smartcroppingOnorOff']").val(0);
            $(this).children("img").attr("src", window.applicationRoot + "/Modules/Microsoft.ProjectOxford.Website.Demos/Images/SmartCropping_OFF.PNG");

            smartCropping = false;
        }

        $(this).children(".buttontooltip").hide();
        if ($(this).children("input[name='smartcroppingOnorOff']").val() == 0) {
            $(this).children("span[data-name='smartcroppingoff']").show();
        }
        else {
            $(this).children("span[data-name='smartcroppingon']").show();
        }

        if (!!tmpFile) {
            visionsdk.processRequest(1, true, tmpFile);
        }
        else
            visionsdk.processRequest(1, lastThumbnailIsfile);

    }).mouseover(function () {
        $(this).children(".buttontooltip").hide();
        if ($(this).children("input[name='smartcroppingOnorOff']").val() == 0) {
            $(this).children("span[data-name='smartcroppingoff']").show();
        }
        else {
            $(this).children("span[data-name='smartcroppingon']").show();
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

    $("input[name='localFile']").bind('change', function (evt) {
        if (evt.target.files.length > 0) {
            var container = $(this).parents(".demo-content").children("div[data-name='container']");
            var containerIndex = 0;
            containerIndex = container.find("input[name='imageIndex']").val();
            if (containerIndex == 2) {
                var length = evt.target.files.length;
                if (length > 0) {
                    loadingStart(2);
                    visionOCR.analyzeImageFile(containerIndex, evt.target.files[0]);
                }
                else {
                    visionOCR.handleError("No file was uploaded.");
                }
            }
            else {
                visionsdk.handleFileSelect(containerIndex, evt);
            }
        }
    });

    $('div[data-name="localFilebutton"]').click(function (e) {
        visionsdk.fatherContainer = $(this).parents("div[data-demo-type='detection']");
        e.preventDefault();
        $("input[name='localFile']", $(this).parent()).click();
        return false;
    });

    $("div[data-name='sumbitbutton']").click(function () {
        visionsdk.fatherContainer = $(this).parents("div[data-demo-type='detection']");
        var container = $(this).parents(".demo-content").children("div[data-name='container']");
        var containerIndex = 0;
        containerIndex = container.find("input[name='imageIndex']").val();
        if (containerIndex == 2) {
            visionOCR.analyzeImageUrl(containerIndex);
        }
        else {
            visionsdk.analyzeUrl(containerIndex);
        }
    });

    $(".imgUrl").focus(function () {
        $(this).val("");
        $(this).removeClass("defaultvalue");
    });

});

function loadingStart(containerIndex) {
    var img_drop = $(".img_drop", visionsdk.imageList[containerIndex].container);

    img_drop.removeClass("img_drop_background");
    $(".floatingCirclesG", visionsdk.imageList[containerIndex].container).show();
};
function loadingStop(containerIndex) {
    var img_drop = $(".img_drop", visionsdk.imageList[containerIndex].container);

    img_drop.removeClass("img_drop_background");
    $(".floatingCirclesG", visionsdk.imageList[containerIndex].container).hide();
};

