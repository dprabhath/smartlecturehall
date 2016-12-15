function init() {
    var inputSelectionStart = 0;
    var inputSelectionEnd = 0;

    //pre-load text
    $("#Text").val("Ha vefun triingf owt theBin gspeller by typying a sentance or clcking teh sampels bellow");
    checkAll();

    // add click event for check text buttons
    $('#ButtonCheck').click(function () {
        clearResultUI();
        $(".sampleBtns").find(".demo-sample-btn").removeClass("demo-btn-selected");
        if ($('#mothodOptions').val() == "checkAll") {
            checkAll();
        }
        else {
            checkSelected();
        }

        restoreInputSelection();
    });

    $("#result-tabs").find("li").each(function () {
        $(this).click(function () {
            updateTabState($(this));

            //show/hide relative area
            var id = $(this).attr('id');
            if (id == "textNav") {
                $("#textTab").show();
                $("#codeTab").hide();
            }
            else if (id == "codeNav") {
                $("#textTab").hide();
                $("#codeTab").show();
            }
        });
    });

    // add click event for sample buttons whose result is preserved
    var samples = [
        { text: "their", preText: "he will be ", postText: " in 5 minutes" },
        { text: "A new service from micros oft!", preText: "", postText: "" },
        { text: "I am gona use this today!", preText: "", postText: "" },
        { text: "four", preText: "Our engineers developed this ", postText: " you!" },
        { text: "Stephen Spielberg should use this in the next", preText: "Director ", postText: " AI movie" },
        { text: "lyft for word processing!", preText: "Our service is like ", postText: "" },
    ];

    $(".sampleBtns").find(".demo-sample-btn").each(function () {
        $(this).click(function () {
            //change selected state
            $(this).addClass("demo-btn-selected");
            $(this).siblings().removeClass("demo-btn-selected");

            var index = parseInt($(this).data("index")) - 1;
            //change tab and text selected status
            if (samples[index].preText.length == 0 && samples[index].postText.length == 0) {
                $('#mothodOptions').val('checkAll');
                $('#Text').val(samples[index].text);

                clearResultUI();
                checkSpell(samples[index].text, "", "");
            }
            else {
                $('#mothodOptions').val('checkSelected');
                $('#Text').val(samples[index].preText.concat(samples[index].text, samples[index].postText));
                //set Selection Range
                inputSelectionStart = samples[index].preText.length;
                inputSelectionEnd = inputSelectionStart + samples[index].text.length;
                var input = $('#Text')[0];
                if (input.selectionStart != undefined) {
                    input.selectionStart = inputSelectionStart;
                    input.selectionEnd = inputSelectionEnd;
                    input.focus();
                }
                else {// Internet Explorer before version 9
                    var inputRange = input.createTextRange();
                    inputRange.moveStart("character", inputSelectionStart);
                    inputRange.collapse();
                    inputRange.moveEnd("character", samples[index].text.length);
                    inputRange.select();
                }

                clearResultUI();
                checkSpell(samples[index].text, samples[index].preText.trim(), samples[index].postText.trim());
            }
        });
    });

    //clear sample selected state when start edit 
    $("#Text").click(function () {
        $(".sampleBtns").find(".demo-sample-btn").removeClass("demo-btn-selected");
    });

    $("#Text").blur(function () {
        var input = $(this)[0];
        if (input.selectionStart != undefined) {
            inputSelectionStart = input.selectionStart;
            inputSelectionEnd = input.selectionEnd;
        }
    });

    function restoreInputSelection() {
        if ($('#mothodOptions').val() == "checkSelected") {
            var input = $('#Text')[0];
            if (input.selectionStart != undefined) {
                input.selectionStart = inputSelectionStart;
                input.selectionEnd = inputSelectionEnd;
                input.focus();
            }
        }
    }
}

function showResult(resultJson, resultCorrected, preText, postText) {
    var contextText = 'PreContextText:"'.concat(preText, '"<br/>', 'PostContextText:"', postText, '"<br/>JSON: <br/>');
    $('#jsonOutput').html(contextText.concat(resultJson));
    $('#correctedQuery').html(resultCorrected);
}

function updateTabState(element) {
    if (!element.hasClass("ui-nav-active")) {
        //change tab style
        element.addClass("ui-nav-active");
        element.siblings().removeClass("ui-nav-active");
    }
}

function clearResultUI() {
    $('#jsonOutput').html(null);
    $('#correctedQuery').html(null);
}

function checkSpell(text, preText, postText) {
    var spellCheckFormData = {};
    spellCheckFormData.text = text;
    spellCheckFormData.mode = $('#modeOptions').val();
    spellCheckFormData.preContextText = preText;
    spellCheckFormData.postContextText = postText;
    //loadingStart();
    $.ajaxAntiForgery({
        type: "POST",
        url: window.applicationRoot + "/Demo/SpellCheckDemo/GetSpellCheckResult",
        dataType: 'json',
        data: spellCheckFormData,
        success: function (result) {
            reCaptchaSdk.RemoveReCaptcha();
            if (result == null) {
                $('#jsonOutput').html("Internal Server Error");
                $('#correctedQuery').html("Internal Server Error");
            } else {
                showResult(result.rawJsonOutput, result.correctedQuery, preText, postText);
            }
        },
        error: function (e) {
            reCaptchaSdk.ProcessReCaptchaStateCode(e, 'reCaptcha-SpellCheck-demo');    
            $('#correctedQuery').html(e.responseText);
            $('#jsonOutput').html(e.responseText);

        },
        complete: function (result) {
            //loadingStop();
        }
    });
}

function checkAll() {
    clearResultUI();
    var allText = $('#Text').val();
    if (allText.length === 0 || !allText.trim()) {
        alert("Please enter the text to be checked.");
    }
    else {
        checkSpell($('#Text').val(), "", "");
    }
};

function checkSelected() {
    clearResultUI();
    var textElement = $('#Text')[0];
    if (textElement.selectionStart != undefined) {
        var startPos = textElement.selectionStart;
        var endPos = textElement.selectionEnd;
        var allText = textElement.value;
        var selectedText = allText.substring(startPos, endPos);
        if (allText.length === 0 || !allText.trim()) {
            if (document.documentElement.lang == "zh") {
                alert("请输入要检查的文本。");
            }
            else {
                alert("Please enter the text to be checked.");
            }
        }
        else if (selectedText.length === 0 || !selectedText.trim()) {
            if (document.documentElement.lang == "zh") {
                alert("请选择要检查的单词。");
            }
            else {
                alert("Please select the words to be checked.");
            }
        }
        else {
            checkSpell(selectedText, allText.substring(0, startPos).trim(), allText.substring(endPos, allText.length).trim());
        }
    }
};

function loadingStart() {
    //$(".floatingCirclesG").show();
}

function loadingStop() {
    //$(".floatingCirclesG").hide();
}

$(window).load(function () {
    init();
});
