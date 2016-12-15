$().ready(function () {
    //Scroll event processing
    var demoPositions = [];
    var demos = $("div[data-demo-type]");
    for (var i = 0; i < demos.length; i++) {
        demoPositions[i] = $(demos[i]).offset().top;
    }
    //Detection options set
    $("div[data-demo-type='detection'],.mobile-image-list").each(function () {
        $(this).find(".eyebutton").show();
        $(this).find(".image-item").each(function () {
            $(this).mouseover(function () {           
                $(this).children("div").css("opacity", 0);         
            }).mouseout(function () {
                $(this).children("div").css("opacity", 1);
            }).click(function () {
                $(this).siblings().children("div").show();              
                $(this).children("div").hide();
                if (!$(this).next().is('div')) {
                    $(this).css("opacity", 1);
                    $(this).siblings().css("opacity", 0.5);
                }
                detectImageByUrl($(this).children("img").attr("data-large-src") || $(this).attr("data-large-src"), 0);
            });
        });
    });
    //Verification options set
    $("div[data-demo-type='verification']").each(function () {
        facesdk.resultProcess = function (containerIndex, validity) {
            if (containerIndex == 0) {
                return;
            }
            else {
                if (validity == false) {
                    selectedToVerify("", containerIndex);
                }
                else {
                    try {
                        if (facesdk.imageList[containerIndex].info.length > 1) {
                            VerifyResultShow("message", "More than one face detected. Please choose another image containing only one face.");
                        }
                        else {
                            selectedToVerify(facesdk.imageList[containerIndex].info[0].faceId, containerIndex);
                        }
                    }
                    catch (e) {
                        return false;
                    }

                }
            }
        }
        $(this).find(".eyebutton").show();
        $(this).find(".image-item").each(function () {
            $(this).mouseover(function () {
                $(this).children("div").css("opacity", 0);
            }).mouseout(function () {
                $(this).children("div").css("opacity", 1);
            }).click(function () {
                facesdk.imageList[1].info = {};
                facesdk.imageList[2].info = {};
                faceData.Face1 = "";
                faceData.Face2 = "";
                $(this).siblings().children("div").show();
                $(this).children("div").hide();
                detectImageByUrl($(this).children("img:eq(0)").attr("data-large-src"), 1);
                detectImageByUrl($(this).children("img:eq(1)").attr("data-large-src"), 2);
            });
        });
    });
});

var faceData = { Face1: "", Face2: "" };
var verificationInit = true;
function VerifyResultShow(result, message) {
    var style = "";
    if (result == "true") {
        message = "The two faces belong to the same person." + (typeof (message) != "undefined" ? "\nConfidence is " + message + "." : "");
    }
    else if (result == "false") {
        message = "The two faces belong to different persons." + (typeof (message) != "undefined" ? "\nConfidence is " + message + "." : "");
    }
    else if (result == "message") {
    }
    else if (result == "error") {

    }
    $("div[data-demo-type='verification']").find("pre").attr("style", style).html(message);
}
//Verify faces
function selectedToVerify(faceid, containerIndex) {
    faceData["Face" + containerIndex] = faceid;
    $("div[data-demo-type='verification']").find(".compareResult span:eq(1)").html("");
    if (faceData.Face1 == "LeftInvalidId" && verificationInit == false) {
        faceData.Face1 = "";
        detectImageByUrl($("div[data-type='InitImage']", $("#verification")).children("img:eq(0)").attr("data-large-src"), 1);
        return;
    }
    if (faceData.Face2 == "RightInvalidId" && verificationInit == false) {
        faceData.Face2 = "";
        detectImageByUrl($("div[data-type='InitImage']", $("#verification")).children("img:eq(1)").attr("data-large-src"), 2);
        return;
    }

    if (faceData.Face1 && faceData.Face2) {
        if (verificationInit == true) {
            verificationInit = false;
            verificationResultInit();
        }
        else {
            if (faceData.Face1 == "00000000-0000-0000-0000-000000000000") {
                facesdk.uploadImage("imageUrl", $("div[data-demo-type='verification']")
                    .find(".image-item[data-type='InitImage'] div").hide().siblings("img:eq(0)").attr("data-large-src"), 1);
                return;
            } else if (faceData.Face2 == "00000000-0000-0000-0000-000000000000") {
                facesdk.uploadImage("imageUrl", $("div[data-demo-type='verification']")
                    .find(".image-item[data-type='InitImage'] div").hide().siblings("img:eq(1)").attr("data-large-src"), 2);
                return;
            }
            faceData.random = Math.random();
            VerifyResultShow("message", "Verifying...");
            $.ajaxAntiForgery({
                type: "post",
                data: faceData,
                dataType: "json",
                url: window.applicationRoot + "/Demo/FaceVerificationDemo/Verify",
                success: function (result) {
                    var obj = JSON.parse(result);
                    if (obj.error) {
                        facesdk.error(obj.error, containerIndex, "noReplaceImage");
                    }
                    else {
                        if (obj.isIdentical) {
                            VerifyResultShow("true", Math.round(obj.confidence * 1000) / 1000);
                        }
                        else {
                            VerifyResultShow("false", Math.round(obj.confidence * 1000) / 1000);
                        }
                    }
                },
                error: function (e) {           
                    VerifyResultShow("error", e.responseText)
                }
            });
        }
    }
}