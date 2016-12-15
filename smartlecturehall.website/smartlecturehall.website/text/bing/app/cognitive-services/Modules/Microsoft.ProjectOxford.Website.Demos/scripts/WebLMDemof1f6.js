function init() {
    var inputSelectionStart = 0;
    var inputSelectionEnd = 0;

    $("#Text").val("Tryoutwordbreakingbytypingasetenceorclickingthesamplesbelow");
    breakIntoWords($("#Text").val());

    // add click event for check text buttons
    $('#ButtonBreak').click(function () {
        clearResultUI();
        $("#sampleBtns").find(".demo-sample-btn").removeClass("demo-btn-selected");
        var text = $('#Text').val();
        breakIntoWords(text);
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
        { text: "anewservicefrommicrosoft" },
        { text: "weblanguagemodel" },
        { text: "naturallanguageprocessing" }
    ];

    $("#sampleBtns").find(".demo-sample-btn").each(function () {
        $(this).click(function () {
            //change selected state
            $(this).addClass("demo-btn-selected");
            $(this).siblings().removeClass("demo-btn-selected");

            var index = parseInt($(this).data("index")) - 1;
            //change tab and text selected status

            $('#Text').val(samples[index].text);

            clearResultUI();
            breakIntoWords(samples[index].text);
        });
    });

    //clear sample selected state when start edit 
    $("#Text").click(function () {
        $("#sampleBtns").find(".demo-sample-btn").removeClass("demo-btn-selected");
    });

    $("#Text").blur(function () {
        var input = $(this)[0];
        if (input.selectionStart != undefined) {
            inputSelectionStart = input.selectionStart;
            inputSelectionEnd = input.selectionEnd;
        }
    });
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
    $('#bestCandidate').html(null);
}

function breakIntoWords(text) {
    if (text.length === 0 || !text.trim()) {
        alert(document.documentElement.lang == "zh-CN" ? "请输入英文文本进行断词。" : "Please enter the text to be broken.");
        return;
    }

    var wordBreakingFormData = {};
    wordBreakingFormData.text = text;
    wordBreakingFormData.model = $('#modeloptions').val();

    //loadingStart();

    $.ajaxAntiForgery({
        type: "POST",
        url: window.applicationRoot + "/Demo/WebLMDemo/BreakIntoWords",
        dataType: 'json',
        data: wordBreakingFormData,
        success: function (result) {
            reCaptchaSdk.RemoveReCaptcha();
            if (result == null) {
                $('#jsonOutput').html("Internal Server Error");
                $('#bestCandidate').html("Internal Server Error");
            } else {
                $('#jsonOutput').html(result.rawJsonOutput);
                $('#bestCandidate').html(result.bestCandidate);
            }
        },
        error: function (e) {
            reCaptchaSdk.ProcessReCaptchaStateCode(e, 'reCaptcha-WebLM-demo');    
            $('#bestCandidate').html(e.responseText);
            $('#jsonOutput').html(e.responseText);
        },
        complete: function (result) {
            //loadingStop();
        }
    });
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
