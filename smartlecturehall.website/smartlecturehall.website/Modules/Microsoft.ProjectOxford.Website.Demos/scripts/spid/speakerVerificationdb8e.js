var ua = navigator.userAgent.toLowerCase();
var check = function (r) {
    "use strict";
    return r.test(ua);
};
var isOpera = check(/opera/);
var isChrome = check(/chrome/);
var isFF = check(/firefox/);
var isIE11 = !(window.ActiveXObject) && "ActiveXObject" in window;
var isIE = !isOpera && (isIE11 || check(/msie/));
var canWork = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
var DataSet = {};
DataSet.VerificationProfileId = "";
DataSet.Data = "";
DataSet.enrollmentStatus = "";
var DealStatus = 0;
var SuccessNum = 1;
var FailNum = 1;

var errorType = "";



$(window).load(function () {
    "use strict";
    if (!canWork || (!isChrome && !isFF && !isOpera)) {
        $("div[data-name='micBtn']").hide();
        $("div[data-name='guidingText']").hide();
        $("div[data-name='NotificationText']").text(SpidText.UploadFile);
    }

    $.ajaxAntiForgery({
        type: "POST",
        data: "",
        dataType: "json",
        url: window.applicationRoot + "/Demo/SPIDDemo/GetPhrases",
        success: function (result) {
            $("pre[data-name='code']", $("div[id='verification']")).html("");
            var response = JSON.parse(result);
            var innerHtml = "";

            if (response != undefined && response != null) {
                if (response.length > 0) {
                    $("div[data-name='selectedText']", $("div[data-demo-type='verification']")).html(response[0].phrase);
                    for (var i = 0; i < response.length; i++) {
                        innerHtml += " <option value=\"" + response[i].phrase + "\">" + response[i].phrase + "</option>";
                    }
                    $("select[data-name='selectItem']", $("div[data-demo-type='verification']")).append(innerHtml);
                }
            }
        },
        error: function (e) {
            if (e.status==500) {
                $("pre[data-name='code']", $("div[id='verification']")).html("Your token expired, please refresh the page and try again.");
                return;
            }
      
        }
    });
    //Select the phrase and init all info.
    $("select[data-name='selectItem']").change(function () {
        $("div[data-name='selectedText']").text($(this).val());
        if (!canWork || (!isChrome && !isFF && !isOpera)) {
            $("div[data-name='NotificationText']").text(SpidText.UploadFile);
        } else {
            $("div[data-name='NotificationText']").text(SpidText.ReadThephrase);
        }
        $("pre[data-name='code']", $("div[id='verification']")).html("");
        DataSet.enrollmentStatus = "";
        DataSet.Data = "";
        DataSet.VerificationProfileId = "";
        SuccessNum = 1;
        FailNum = 1;
    });

    //Start or stop record.
    $("div[data-name='micBtn']").click(function () {
        micOnClick();
    });

    //Upload an audio.
    $("div[data-name='upLoadBtn']", $("div[id='verification']")).click(function () {
        $("div[data-name='VerificationDialog']", $("div[id='verification']")).show();
    });

    //Select file.
    $("input[type='file']", $("div[id='verification']")).change(function (event) {
        if (event.target.files.length > 0) {
            var file = this.files[0];
            var fileName = $("input[type='file']", $("div[id='verification']")).val();
            var formatName = fileName.substr(fileName.length - 3, 3);

            $("input[data-name='upLoadAudioPath']", $("div[data-name='VerificationDialog']")).val(fileName);
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
                DataSet.Data = reader.result;
                if (DataSet.Data.length > 7000000) {
                    //$("pre[data-name='code']", $("div[id='verification']")).html("The demo does not support more than 5MB file, please choose again.");
                    errorType = "LARGESIZE";
                    DataSet.Data = "";
                    $(this).val("");
                }
            };
            reader.readAsDataURL(file);
        }
    });

    //Browse button.
    $("div[data-name='browse']", $("div[id='verification']")).click(function () {
        $("input[type='file']", $("div[id='verification']")).click();
    });
    //OK button.
    $("div[data-name='ok']", $("div[id='verification']")).click(function () {
        $(this).parents("div[data-name='VerificationDialog']").hide();
        $("input[data-name='upLoadAudioPath']", $("div[data-name='VerificationDialog']")).val("");

        if (DataSet.Data === "") {
            switch (errorType) {
                case "FORMATERROR":
                    $("pre[data-name='code']", $("div[id='verification']")).html(SpidText.WrongFileType);
                    break;
                case "LARGESIZE":
                    $("pre[data-name='code']", $("div[id='verification']")).html(SpidText.BigFile);
                    break;
                case "INVALID":
                    $("pre[data-name='code']", $("div[id='verification']")).html(SpidText.SmallFile);
                    break;
                default:
                    $("pre[data-name='code']", $("div[id='verification']")).html(SpidText.AudioFile);
                    break;
            }
            errorType = "";
            return;
        }
        if (DealStatus !== 0) {
            $("pre[data-name='code']", $("div[id='verification']")).html(SpidText.Waiting);
            DataSet.Data = "";
            return;
        }

        $("pre[data-name='code']", $("div[id='verification']")).html("");
        $("div[data-name='dealing']", $("div[id='verification']")).show();
        DealStatus = 1;
        $.ajaxAntiForgery({
            type: "POST",
            data: DataSet,
            dataType: "json",
            url: window.applicationRoot + "/Demo/SPIDDemo/VerificateSpeakerByFile",
            success: function (result) {
                reCaptchaSdk.RemoveReCaptcha();
                DealStatus = 0;
                $("input[type='file']", $("div[id='verification']")).val("");
                var obj = JSON.parse(result);
                if (obj !== null && obj.response !== null && obj.response !== undefined) {
                    $("pre[data-name='code']", $("div[id='verification']")).html(JSON.stringify(obj.response, null, 2));
                    if (obj.response.enrollmentStatus === "Enrolled") {
                        DataSet.enrollmentStatus = "Enrolled";
                        $("div[data-name='NotificationText']").text(SpidText.Congratulations);
                    }
                    if (SuccessNum === 1) {
                        $("div[data-name='NotificationText']").text(SpidText.Successful);
                        SuccessNum++;
                    } else if (SuccessNum > 1 && DataSet.enrollmentStatus !== "Enrolled") {
                        $("div[data-name='NotificationText']").text(SpidText.Cool);
                    }
                } else {
                    $("pre[data-name='code']", $("div[id='verification']")).html(JSON.stringify(obj, null, 2));
                    if (obj.error && DataSet.enrollmentStatus !== "Enrolled") {
                        if (FailNum === 1) {
                            $("div[data-name='NotificationText']").text(SpidText.Sorry);
                            FailNum++;
                        } else if (FailNum > 1) {
                            $("div[data-name='NotificationText']").text(SpidText.Ooops);
                        }
                    } else if (obj.error && DataSet.enrollmentStatus === "Enrolled") {
                        $("div[data-name='NotificationText']").text("Verification error!");
                    } else if (obj.result) {
                        if (DataSet.enrollmentStatus === "Enrolled" && obj.result === "Accept") {
                            $("div[data-name='NotificationText']").text("Verification accepted!");
                        } else if (DataSet.enrollmentStatus === "Enrolled" && obj.result === "Reject") {
                            $("div[data-name='NotificationText']").text("Verification rejected!");
                        }
                    }
                }

                if (obj !== null && !obj.error) {
                    if (!!obj.verificationId) {
                        DataSet.VerificationProfileId = obj.verificationId;
                    }
                }

                $("div[data-name='dealing']", $("div[id='verification']")).hide();
            },
            error: function (e) {
                reCaptchaSdk.ProcessReCaptchaStateCode(e, 'reCaptcha-SpeakerVerification-demo');
                DealStatus = 0;
                $("input[type='file']", $("div[id='verification']")).val("");
                $("pre[data-name='code']", $("div[id='verification']")).html("");
                $("div[data-name='dealing']", $("div[id='verification']")).hide();
                if (e.status==500) {
                    $("div[data-name='NotificationText']").text("Your token expired, please refresh the page and try again.");
                    return;
                }
                if (e.responseText == 'Throttled') {
                    $("div[data-name='NotificationText']").text(e.responseText);
                    return;
                }
                if (FailNum === 1) {
                    $("div[data-name='NotificationText']").text(SpidText.Sorry);
                    FailNum++;
                } else if (FailNum > 1) {
                    $("div[data-name='NotificationText']").text(SpidText.Ooops);
                }
            }
        });
        DataSet.Data = "";
    });
    //Cancel button
    $("div[data-name='cancel']", $("div[id='verification']")).click(function () {
        $(this).parents("div[data-name='VerificationDialog']").hide();
        $("input[data-name='upLoadAudioPath']", $("div[data-name='VerificationDialog']")).val("");
        $("input[type='file']", $("div[id='verification']")).val();
    });
});

function HideAllDialog() {
    $("div[data-demo-type='Dialog']").hide();
}

