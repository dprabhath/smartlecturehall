
$().ready(function () {

    var playStatus = 0;
    var dealStatus = 0;

    var selectedTab = "Result";
    var textResult = "";
    var jsonResult = "";

    var formData = {};
    formData.selectedProfield = "";
    formData.Data = "";

    $('.ui-corner-top').click(function () {
        if ($(this).hasClass('ui-corner-top-a-white')) {
            $(this).removeClass('ui-corner-top-a-white');
            $(this).siblings().addClass('ui-corner-top-a-white');
        }
    });
    //Chose an audio sample.
    $("div[class='audioItem']").click(function () {
        var currentAudio = $("audio", $(this)).get(0);
        var audioStatus = currentAudio.paused || currentAudio.ended;

        InitAllAudio();

        if (audioStatus) {    //Start --> Stop
            currentAudio.play();
            playStatus = 1;
            $("div[data-name='audioPlay']", $(this)).removeClass("audioStart");
            $("div[data-name='audioPlay']", $(this)).addClass("audioStop");
        } else {    //Stop --> Start
            currentAudio.pause();
            playStatus = 0;
            $("div[data-name='audioPlay']", $(this)).removeClass("audioStop");
            $("div[data-name='audioPlay']", $(this)).addClass("audioStart");
        }
        if (playStatus === 1) {
            //Clear the Json result.
            $("pre[data-name='code']", $("div[id='identification']")).html("");
            $("div[id='highLight']", $("div[id='identification']")).show();
            $("div[class='speakerInfo']", $("div[id='identification']")).hide();
            textResult = "";
            jsonResult = "";

            if (dealStatus !== 0) {
                //$("a", $("div[id='identification']")).removeClass("a_focused");
                //$("a", $("div[id='identification']")).addClass("a_losefocus");
                //$("a[id='Result']", $("div[id='identification']")).removeClass("a_losefocus");
                //$("a[id='Result']", $("div[id='identification']")).addClass("a_focused");
                $("li", $("div[id='identification']")).removeClass("ui-nav-active");
                $("a[id='Result']", $("div[id='identification']")).parents("li").addClass("ui-nav-active");

                $("pre[data-name='code']", $("div[id='identification']")).html("Please wait a moment...");
                return;
            }

            formData.selectedProfield = $("input[data-name='profield']", $(this)).val()
            dealStatus = 1;
            //Show the loading icon.
            $("div[data-name='dealing']", $("div[id='identification']")).show();
            $.ajaxAntiForgery({
                type: "POST",
                data: formData,
                dataType: "json",
                url: window.applicationRoot + "/Demo/SPIDDemo/IdentifySpeaker",
                success: function (result) {
                    reCaptchaSdk.RemoveReCaptcha();
                    $("div[data-name='dealing']", $("div[id='identification']")).hide();
                    dealStatus = 0;
                    var obj = JSON.parse(result);
                    //$("pre[data-name='code']", $("div[id='identification']")).html("Result:\n" + JSON.stringify(obj, null, 2));
                    jsonResult = JSON.stringify(obj, null, 2);

                    if (!!obj && !!obj.processingResult && !!obj.processingResult.identifiedProfileId) {
                        var ProfileId = obj.processingResult.identifiedProfileId;
                        var presidentName = getPresidentName(ProfileId);
                        $("div[id='highLight']", $("input[value='" + ProfileId + "']").parents("div[class='image-item']")).hide();
                        $("div[class='speakerInfo']", $("input[value='" + ProfileId + "']").parents("div[class='image-item']")).show();
                        if (presidentName !== "") {
                            textResult = "President <span style='font-size:20px;font-weight:700;color:#F6921E;padding-left:5px;padding-right:5px;' >" + presidentName + "</span> is the one identified speaking in the selected audio.";
                        } else {
                            textResult = "No president is identified speaking in the uploaded audio.";
                        }
                    } else {
                        textResult = "No president is identified speaking in the uploaded audio.";
                    }

                    //$("a", $("div[id='identification']")).removeClass("a_focused");
                    //$("a", $("div[id='identification']")).addClass("a_losefocus");
                    //$("a[id='Result']", $("div[id='identification']")).removeClass("a_losefocus");
                    //$("a[id='Result']", $("div[id='identification']")).addClass("a_focused");
                    $("li", $("div[id='identification']")).removeClass("ui-nav-active");
                    $("a[id='Result']", $("div[id='identification']")).parents("li").addClass("ui-nav-active");
                    $("pre[data-name='code']", $("div[id='identification']")).html(textResult);
                },
                error: function (e) {
                    reCaptchaSdk.ProcessReCaptchaStateCode(e, 'reCaptcha-SpeakerIdentification-demo');
                    dealStatus = 0;
                    $("div[data-name='dealing']", $("div[id='identification']")).hide(); 
                    textResult = "No president is identified speaking in the uploaded audio."; 
                    if (e.status == 403 && e.responseText != "") {
                        textResult = 'Your token expired, please refresh the page and try again.';
                    } 
                    jsonResult = "Internal Server Error";

                    //$("a", $("div[id='identification']")).removeClass("a_focused");
                    //$("a", $("div[id='identification']")).addClass("a_losefocus");
                    //$("a[id='Result']", $("div[id='identification']")).removeClass("a_losefocus");
                    //$("a[id='Result']", $("div[id='identification']")).addClass("a_focused");
                    $("li", $("div[id='identification']")).removeClass("ui-nav-active");
                    $("a[id='Result']", $("div[id='identification']")).parents("li").addClass("ui-nav-active");
                    if (e.responseText == 'Throttled') {
                        textResult = e.responseText;
                    }
                    $("pre[data-name='code']", $("div[id='identification']")).html(textResult);
                }
            });
            formData.Data = "";
        }
    });

    $("input[type='file']", $("div[id='identification']")).change(function (event) {
        if (event.target.files.length > 0) {
            var file = this.files[0];
            var fileName = $("input[type='file']", $("div[id='identification']")).val();
            var formatName = fileName.substr(fileName.length - 3, 3);

            $("input[data-name='upLoadAudioPath']", $("div[data-name='IdentificationDialog']")).val(fileName);
            errorType = "";
            if (formatName.toLowerCase() !== "wav") {
                errorType = "FORMATERROR";
                return;
            }
            var reader = new window.FileReader();
            reader.onload = function (e) {
                if (reader.result == null) {
                    errorType = "INVALID";
                    return;
                }
                formData.Data = reader.result;
                if (formData.Data.length > 7000000) {
                    //$("a", $("div[id='identification']")).removeClass("a_focused");
                    //$("a", $("div[id='identification']")).addClass("a_losefocus");
                    //$("a[id='Result']", $("div[id='identification']")).removeClass("a_losefocus");
                    //$("a[id='Result']", $("div[id='identification']")).addClass("a_focused");
                    $("li", $("div[id='identification']")).removeClass("ui-nav-active");
                    $("a[id='Result']", $("div[id='identification']")).parents("li").addClass("ui-nav-active");
                    //$("pre[data-name='code']", $("div[id='identification']")).html("The demo does not support more than 5MB file, please upload again.");
                    errorType = "LARGESIZE";
                    formData.Data = "";
                    $(this).val("");
                }
            };
            reader.readAsDataURL(file);
        }
    });

    var audios = $("audio", $("div[class='image-list']"));
    for (var i = 0; i < audios.length; i++) {
        audios[i].addEventListener("timeupdate", function () {
            var ended = false;
            var percent = this.currentTime / this.duration;
            if (percent >= 1) {
                ended = true;
            }
            if (ended) {
                var start_stop = $("div[data-name='start_stop']", $(this).parents("div[class='image-item']"));
                start_stop.removeClass("pause2");
                start_stop.addClass("play2");
                this.pause();
                this.currentTime = 0;
            }
        });
    }

    var audioList = $("audio", $("div[class='audioList']"));
    for (var i = 0; i < audios.length; i++) {
        audioList[i].addEventListener("timeupdate", function () {
            var ended = false;
            var percent = this.currentTime / this.duration;
            if (percent >= 1) {
                ended = true;
            }
            if (ended) {
                var audioPlay = $("div[data-name='audioPlay']", $(this).parents("div[class='audioList']"));
                audioPlay.removeClass("audioStop");
                audioPlay.addClass("audioStart");
                this.pause();
                this.currentTime = 0;
            }
        });
    }

    $("div[data-name='start_stop']").click(function () {
        var currentAudio = $("audio", $(this).parents("div[class='image-item']")).get(0);
        var audioStatus = currentAudio.paused || currentAudio.ended;

        InitAllAudio();

        if (audioStatus) {
            //Start --> Stop
            currentAudio.play();
            $(this).removeClass("play2");
            $(this).addClass("pause2");
        } else {
            //Stop --> Start
            currentAudio.pause();
            $(this).removeClass("pause2");
            $(this).addClass("play2");
        }
    });

    //Upload Audio button
    $("div[data-name='upLoadBtn']", $("div[id='identification']")).click(function () {
        $("div[data-name='IdentificationDialog']").show();
    });

    //Browse button
    $("div[data-name='browse']", $("div[id='identification']")).click(function () {
        $("input[type='file']", $("div[id='identification']")).click();

    });
    //OK button
    $("div[data-name='ok']", $("div[id='identification']")).click(function () {
        $(this).parents("div[data-name='IdentificationDialog']").hide();

        $("input[data-name='upLoadAudioPath']", $("div[data-name='IdentificationDialog']")).val("");

        //Clear the Json result.
        $("pre[data-name='code']", $("div[id='identification']")).html("");
        textResult = "";
        jsonResult = "";
        //Clear the file's value
        $("input[type='file']", $("div[id='identification']")).val("");
        //Hide the highLight item.
        $("div[id='highLight']", $("div[id='identification']")).show();
        $("div[class='speakerInfo']", $("div[id='identification']")).hide();

        if (dealStatus !== 0) {
            //$("a", $("div[id='identification']")).removeClass("a_focused");
            //$("a", $("div[id='identification']")).addClass("a_losefocus");
            //$("a[id='Result']", $("div[id='identification']")).removeClass("a_losefocus");
            //$("a[id='Result']", $("div[id='identification']")).addClass("a_focused");
            $("li", $("div[id='identification']")).removeClass("ui-nav-active");
            $("a[id='Result']", $("div[id='identification']")).parents("li").addClass("ui-nav-active");

            textResult = "Please wait a moment...";
            jsonResult = "";
            $("pre[data-name='code']", $("div[id='identification']")).html(textResult);
            return;
        }

        if (formData.Data === "") {
            //$("a", $("div[id='identification']")).removeClass("a_focused");
            //$("a", $("div[id='identification']")).addClass("a_losefocus");
            //$("a[id='Result']", $("div[id='identification']")).removeClass("a_losefocus");
            //$("a[id='Result']", $("div[id='identification']")).addClass("a_focused");
            $("li", $("div[id='identification']")).removeClass("ui-nav-active");
            $("a[id='Result']", $("div[id='identification']")).parents("li").addClass("ui-nav-active");

            switch (errorType) {
                case "FORMATERROR":
                    textResult = "Wrong File Type. It should be .wav.";
                    break;
                case "LARGESIZE":
                    textResult = "The demo does not support more than 5MB file, please upload again.";
                    break;
                case "INVALID":
                    textResult = "The audio file is too small or invalid.";
                    break;
                default:
                    textResult = "Please upload an audio or choose an audio sample.";
                    break;
            }
            errorType = "";
            jsonResult = "";
            $("pre[data-name='code']", $("div[id='identification']")).html(textResult);

            return;
        }

        dealStatus = 1;
        //Show the loading icon.
        $("div[data-name='dealing']", $("div[id='identification']")).show();
        $.ajaxAntiForgery({
            type: "POST",
            data: formData,
            dataType: "json",
            url: window.applicationRoot + "/Demo/SPIDDemo/IdentifySpeaker",
            success: function (result) {
                reCaptchaSdk.RemoveReCaptcha();
                $("div[data-name='dealing']", $("div[id='identification']")).hide();
                dealStatus = 0;
                var obj = JSON.parse(result);
                jsonResult = JSON.stringify(obj, null, 2);

                if (!!obj && !!obj.processingResult && !!obj.processingResult.identifiedProfileId) {
                    var ProfileId = obj.processingResult.identifiedProfileId;
                    var presidentName = getPresidentName(ProfileId);
                    $("div[id='highLight']", $("input[value='" + ProfileId + "']").parents("div[class='image-item']")).hide();
                    $("div[class='speakerInfo']", $("input[value='" + ProfileId + "']").parents("div[class='image-item']")).show();
                    if (presidentName !== "") {
                        textResult = "President <span style='font-size:24px;font-weight:700;color:#F6921E;padding-left:10px;padding:right:10px;' >" + presidentName + "</span> is the one identified speaking in the selected audio.";
                    } else {
                        textResult = "No president is identified speaking in the uploaded audio.";
                    }
                } else {
                    textResult = "No president is identified speaking in the uploaded audio.";
                }
                //$("a", $("div[id='identification']")).removeClass("a_focused");
                //$("a", $("div[id='identification']")).addClass("a_losefocus");
                //$("a[id='Result']", $("div[id='identification']")).removeClass("a_losefocus");
                //$("a[id='Result']", $("div[id='identification']")).addClass("a_focused");
                $("li", $("div[id='identification']")).removeClass("ui-nav-active");
                $("a[id='Result']", $("div[id='identification']")).parents("li").addClass("ui-nav-active");
                $("pre[data-name='code']", $("div[id='identification']")).html(textResult);
            },
            error: function (e) {
                reCaptchaSdk.ProcessReCaptchaStateCode(e, 'reCaptcha-SpeakerIdentification-demo');
                dealStatus = 0;
                $("div[data-name='dealing']", $("div[id='identification']")).hide();
                textResult = "No president is identified speaking in the uploaded audio.";
                if (e.status == 403 && e.responseText!="") {
                    textResult = e.responseText;
                }
                jsonResult = "Internal Server Error";

                //$("a", $("div[id='identification']")).removeClass("a_focused");
                //$("a", $("div[id='identification']")).addClass("a_losefocus");
                //$("a[id='Result']", $("div[id='identification']")).removeClass("a_losefocus");
                //$("a[id='Result']", $("div[id='identification']")).addClass("a_focused");
                $("li", $("div[id='identification']")).removeClass("ui-nav-active");
                $("a[id='Result']", $("div[id='identification']")).parents("li").addClass("ui-nav-active");
                $("pre[data-name='code']", $("div[id='identification']")).html(textResult);
            }
        });

        formData.Data = "";
    });
    //Cancel button
    $("div[data-name='cancel']", $("div[id='identification']")).click(function () {
        $(this).parents("div[data-name='IdentificationDialog']").hide();
        $("input[data-name='upLoadAudioPath']", $("div[data-name='IdentificationDialog']")).val("");
        $("input[type='file']", $("div[id='identification']")).val("");
    });

    $("a[data-name='tabItem']").click(function () {
        //$("a", $(this).parents("ul")).removeClass("a_focused");
        //$("a", $(this).parents("ul")).addClass("a_losefocus");
        //$(this).removeClass("a_losefocus");
        //$(this).addClass("a_focused");

        $("li", $(this).parents("ul")).removeClass("ui-nav-active");                
        $(this).parents("li").addClass("ui-nav-active");

        if ($(this).get(0).id === "Result") {
            selectedTab = "Result";
            $("pre[data-name='code']", $("div[id='identification']")).html(textResult);
        } else if ($(this).get(0).id === "JSON") {
            selectedTab = "JSON";
            $("pre[data-name='code']", $("div[id='identification']")).html(jsonResult);
        }
    });
});

function InitAllAudio() {
    var audios = $("audio");
    for (var i = 0; i < audios.length; i++) {
        audios[i].pause();
        if (audios[i].currentTime > 0)
            audios[i].currentTime = 0;
    }

    $("div[data-name='start_stop']").removeClass("pause2");
    $("div[data-name='start_stop']").addClass("play2");

    $("div[data-name='audioPlay']").removeClass("audioStop");
    $("div[data-name='audioPlay']").addClass("audioStart");
}

function HideAllDialog() {
    $("div[data-demo-type='Dialog']").hide();
}

function getPresidentName(profileId) {
    var presidentName = "";

    switch (profileId) {
        case "bf058f39-538d-4145-bf56-3bb9ec8fa662":
            presidentName = "Barack Obama";
            break;
        case "f6af5ac0-1333-43f8-b0eb-307821567b2c":
            presidentName = "George W Bush";
            break;
        case "a435a5dc-ed25-49ef-a2d2-ccd4b2e9d65b":
            presidentName = "William J Clinton";
            break;
        case "d6cdb1c5-6e1f-401e-a627-adc068fdc0a3":
            presidentName = "George H W Bush";
            break;
        case "b4421a6b-70e9-45c0-b300-81557a371925":
            presidentName = "Ronald Reagan";
            break;
        default:
            presidentName = "";
            break;
    }
    return presidentName;
}