/*
* Vision OCR Demo script
*/

var visionOCR = {

    // The backend service path
    servicePath: window.applicationRoot + "/Demo/VisionDemo/Ocr",
    init: function () {
        var initImagePath = $('#initImageUrl').val();
        var visionDemoType = $('#visionDemoType').val();

        // set the default image url for OCR
        if (initImagePath && visionDemoType == 'OCR') {
            // remove all data-selected class
            $('#Ocr .image-item').css('opacity', 0.5);
            $('#Ocr .image-item').removeAttr('data-selected');

            $('#Ocr input[type=text]').val(initImagePath);
            visionOCR.analyzeImageUrl();
        } else {
            var result = {
                "language": "en", "textAngle": 0.0, "orientation": "Up", "regions": [{ "boundingBox": "791,118,592,838", "lines": [{ "boundingBox": "799,118,453,58", "words": [{ "boundingBox": "799,118,102,58", "text": "IF" }, { "boundingBox": "937,119,109,57", "text": "WE" }, { "boundingBox": "1087,118,165,58", "text": "DID" }] }, { "boundingBox": "792,184,512,176", "words": [{ "boundingBox": "792,184,512,176", "text": "ALL" }] }, { "boundingBox": "796,368,515,60", "words": [{ "boundingBox": "796,368,155,59", "text": "THE" }, { "boundingBox": "993,368,318,60", "text": "THINGS" }] }, { "boundingBox": "791,441,312,57", "words": [{ "boundingBox": "791,441,108,57", "text": "WE" }, { "boundingBox": "937,441,166,57", "text": "ARE" }] }, { "boundingBox": "797,508,586,87", "words": [{ "boundingBox": "797,508,586,87", "text": "CAPABLE" }] }, { "boundingBox": "795,607,452,72", "words": [{ "boundingBox": "795,607,106,59", "text": "OF" }, { "boundingBox": "941,607,306,72", "text": "DOING," }] }, { "boundingBox": "791,678,424,60", "words": [{ "boundingBox": "791,680,108,57", "text": "WE" }, { "boundingBox": "937,678,278,60", "text": "WOULD" }] }, { "boundingBox": "793,750,498,59", "words": [{ "boundingBox": "793,750,498,59", "text": "LITERALLY" }] }, { "boundingBox": "791,821,390,60", "words": [{ "boundingBox": "791,821,390,60", "text": "ASTOUND" }] }, { "boundingBox": "795,893,531,63", "words": [{ "boundingBox": "795,893,531,63", "text": "OURSELVES." }] }] }]
            };

            var ocfrDefaultImageUrl = $('#Ocr .image-item[data-selected="selected"] img').attr('data-large-src');
            $('#Ocr input[type=text]').val(ocfrDefaultImageUrl);
            $('#Ocr .visionImage').attr('src', ocfrDefaultImageUrl);

            this.showResult(result);
        }

        // bind change event for language select
        $("#Ocr .visionLanguages select").bind('change', function (evt) {
            var files = $("#Ocr input[type=file]")[0].files;

            var container = $(this).parents(".demo-content").children("div[data-name='container']");
            var containerIndex = 0;
            containerIndex = container.find("input[name='imageIndex']").val();

            //if no file was uploaded, we don't need to continue to send a request.
            if (files.length == 0) {
                visionOCR.analyzeImageUrl(containerIndex);
            }
            else {
                visionOCR.analyzeImageFile(containerIndex, files[0]);
            }
        });

        $("#ocrTextTab").show();
        // bind the click event for every nav li
        $(".ui-tabs-nav").find("li").each(function () {
            $(this).click(function () {
                if (!$(this).hasClass("ui-nav-active")) {
                    var id = $(this).attr('id');
                    if (id == "ocrTextNav") {
                        $("#ocrTextNav").addClass("ui-nav-active");
                        $("#ocrTextTab").show();

                        $("#ocrCodeNav").removeClass("ui-nav-active");
                        $("#ocrCodeTab").hide();
                    }
                    else {
                        $("#ocrTextNav").removeClass("ui-nav-active");
                        $("#ocrTextTab").hide();

                        $("#ocrCodeNav").addClass("ui-nav-active");
                        $("#ocrCodeTab").show();
                    }
                }
            });
        });
    },

    // Upload the image information to backend service
    uploadImageInfo: function (containerIndex, imageDataorUrl, isfile) {
        var tempContainer = visionsdk.fatherContainer;
        if ($(window).width()>920) {
            $(".image-list", visionsdk.fatherContainer).show();
        }
        else {
            $(".mobile-image-list", visionsdk.fatherContainer).show();
        }
        visionsdk.adjustJSONWindow(tempContainer);

        if (!imageDataorUrl) {
            return;
        }

        var formData = {};
        if (isfile) {
            var dataURL = imageDataorUrl;
            var idx = dataURL.indexOf('base64,', 0);
            var typeIndex = dataURL.indexOf(';', 0);
            var format = dataURL.substr(5, typeIndex - 5);
            var dataBody = dataURL.substring(idx + 7, dataURL.length);
            formData.imageData = dataBody;
            formData.dataType = "data";
            formData.Time = Date();
            formData.isUrl = false;
            visionsdk.newSample = true;
        }
        else {
            //formData.Data = encodeURIComponent(imageDataorUrl);
            formData.imageData = imageDataorUrl;
            formData.isUrl = true;
            formData.Time = Date();
            formData.dataType = "imageUrl";

            //remove the file from file control when we try to use the image url.
            visionOCR.removeFile();
            visionsdk.newSample = imageDataorUrl.indexOf(azureCdnEndpoint) != 0;
        }

        var language = $("#Ocr .visionLanguages select").find('option:selected').val();
        formData.languageCode = language;

        visionsdk.storedFormData[containerIndex] = formData;

        loadingStart(2);
        $.ajaxAntiForgery({
            type: "post",
            data: formData,
            dataType: "json",
            url: this.servicePath,
            success: function (result) {
                reCaptchaSdk.RemoveReCaptcha();
                var obj = JSON.parse(result);
                if (obj.error) {
                    var errorMessage = (obj.error.message || "Unknown error");
                    visionOCR.handleError(errorMessage);
                }
                else {
                    visionOCR.showResult(obj);
                }
            },
            error: function (e) {
                reCaptchaSdk.ProcessReCaptchaStateCode(e, 'reCaptcha-VisionOcr-demo');
                if (e.status==500) {
                    visionOCR.handleError('Your token expired, please refresh the page and try again.');
                    return;
                }
                visionOCR.handleError(e.responseText);
            },
            complete: function () {
                loadingStop(2);
            }
        });
    },

    analyzeImageFile: function (containerIndex, file) {
        // Only process image files.
        if (!file.type.match('image.*')) {
            //TODO:show error
            return;
        }

        var reader = new FileReader();

        $(reader).load(function (event) {
            if (event.target.result) {
                var image_delegate = new Image();
                var Orientation = 1;
                var format;
                var typeIndex = event.target.result.indexOf(';', 0);
                format = event.target.result.substr(5, typeIndex - 5);

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

                    $('#Ocr .visionImage').attr('src', base64);
                    if (file.size > 4194304) {
                        visionOCR.handleError("Image size is too big.");
                        loadingStop(2);
                    }
                    else {
                        visionOCR.uploadImageInfo(containerIndex, base64, true);
                    }
                });
                $(image_delegate).attr('src', event.target.result);
            }
            else {
                this.handleError("Data error.");
            }
        });

        reader.readAsDataURL(file);
    },

    analyzeImageUrl: function (containerIndex) {
        var imageUrl = $('#Ocr input[type=text]').val();
        if (!imageUrl) {
            this.handleError("Please input the image url.");
            return;
        }

        loadingStart(containerIndex);
        $('#Ocr .visionImage').attr('src', imageUrl);
        visionOCR.uploadImageInfo(containerIndex, imageUrl, false);

        //var format = "data:image/jpg;base64,";
        //var formData = {};
        //formData.Url = imageUrl;
        //loadingStart(containerIndex);
        //$.ajaxAntiForgery({
        //    type: "POST",
        //    data: formData,
        //    url: window.applicationRoot + "/Demo/DemoShared/RotateImage",
        //    dataType: "text",
        //    success: function (result) {
        //        var newData = format + result;
        //        var image_delegate = new Image();
        //        image_delegate.onload = (function (e) {
        //            $('#Ocr .visionImage').attr('src', newData);
        //            visionOCR.uploadImageInfo(containerIndex, imageUrl, false);
        //        });
        //        $(image_delegate).attr('src', newData);
        //    },
        //    error: function (e) {
        //    },
        //    complete: function (e) {
        //        loadingStop(containerIndex);
        //    }
        //});
    },

    showResult: function (ocrObject) {
        $('#ocrError').hide();
        if (ocrObject == null) {
            $('#ocrCode').html('No result.')
        }
        else {
            var plainText = "";
            if (ocrObject.regions != null) {
                for (var i = 0; i < ocrObject.regions.length; i++) {

                    for (var j = 0; j < ocrObject.regions[i].lines.length; j++) {
                        for (var k = 0; k < ocrObject.regions[i].lines[j].words.length; k++) {
                            plainText += ocrObject.regions[i].lines[j].words[k].text + " ";
                        }
                        plainText += "\n";
                    }
                    plainText += "\n";
                }
            }
            else {
                plainText += "empty.";
            }

            $('#ocrText').html(plainText);
            $('#ocrCode').html(JSON.stringify(ocrObject, null, 2));
        }
    },

    removeFile: function () {
        var fileControl = $("#Ocr input[type=file]")[0];
        if (fileControl.files.length > 0) {
            $(fileControl).after($(fileControl).clone(true)).remove();
        }
    },

    drop: function (event) {
    },

    handleError: function (errorMessage) {
        $('#ocrTextTab').show();
        $('#ocrTextNav').addClass("ui-nav-active");

        $('#ocrCodeTab').hide();
        $('#ocrCodeNav').removeClass("ui-nav-active");

        $('#ocrError').show();
        $('#ocrError').text(errorMessage);
        $('#ocrText').html("");
        $('#ocrCode').text("");
    }
};

$(window).load(function () {
    window.ed_tool.centerImg($("#Ocr .visionImage"));
    visionOCR.init();

    // Add click event for Ocr image list
    $('#Ocr .image-list,#Ocr .mobile-image-list').find(".image-item").each(function () {
        $(this).click(function () {
            visionsdk.fatherContainer = $(this).parents("div[data-demo-type='detection']");
            var container = visionsdk.fatherContainer;
            var containerIndex = 0;
            containerIndex = container.find("input[name='imageIndex']").val();

            $('#Ocr .image-item').css('opacity', 0.5);
            $('#Ocr .image-item').removeAttr('data-selected');

            $(this).css('opacity', 1);
            $(this).attr('data-selected', 'selected');

            var largeImageUrl = $(this).children("img").attr("data-large-src") || $(this).attr("data-large-src");
            $('#Ocr input[type=text]').val(largeImageUrl);
            visionOCR.analyzeImageUrl(containerIndex);
        });
    });
});