var intervalId; // Timer for analysis throbber animation

// Fight FOUC when processing noscript
$("html").addClass("hidden");

$(document).ready(function () {
    // Remove all elements with noscript class.
    $(".noscript").addClass("hidden");
    $("html").removeClass("hidden");

    // Handle tab selection
    $(".ui-tabs").find("li").click(function() {
        var $this = $(this);

        // Update styling
        if (!$this.hasClass("ui-nav-active")) {
            $this.addClass("ui-nav-active");
            $this.siblings().removeClass("ui-nav-active");
        }

        // Update tab content
        var tabs = $this.closest(".ui-tabs").children("div");
        tabs.filter("[name=\"" + $this.attr("name") + "\"]").show();
        tabs.filter("[name!=\"" + $this.attr("name") + "\"]").hide();
    });

    // Automatically select the first tab
    $(".ui-tabs").find("li").first().click();

    // Handle example selection
    $(".demo-btn-list .demo-btn").click(function() {
        var $this = $(this);
        $this.addClass("demo-btn-selected");
        $this.siblings().removeClass("demo-btn-selected");
    });

    // Automatically run the first example
    $(".demo-btn-list .demo-btn").first().click();
});

// Animate the analysis throbber
function ProgressBarIntervalHandler() {
    var analyze = $("#Analyze");

    var progressBarStr = analyze.data("waiting-dots");
    var substrings = progressBarStr.split(".");

    // Limit maximum dots in progress bar to 5.
    if (substrings.length === 6) {
        progressBarStr = ". ";
    } else {
        progressBarStr += ". ";
    }

    analyze.data("waiting-dots", progressBarStr);
    analyze.val(analyze.data("waiting-prefix") + progressBarStr);
}

// Prepare to receive new analysis results
function UpdateOnBegin() {
    $(".results").html("");

    $("#Analyze").data("waiting-dots", ". ");
    intervalId = window.setInterval("ProgressBarIntervalHandler()", 300);

    $("#Analyze, .demo-sample-btn").prop("disabled", true);
}

// Display new analysis results and hide the throbber
function UpdateOnSuccess() {
    $("#Analyze").val("Analyze!");
    window.clearInterval(intervalId);

    $("#Analyze, .demo-sample-btn").prop("disabled", false);
}

// Report analysis AJAX failure
function UpdateOnError(ajaxContext) {
    $("#Analyze").val($("#Analyze").data("value"));
    window.clearInterval(intervalId);
    $(".results").html("Unfortunately your request errored out [HTTP status code " + ajaxContext.status +
        "]. Please retry your request.");
    $("#Analyze, .demo-sample-btn").prop("disabled", false);
}

// Display new JSON results
function UpdateJsonTab(content) {
    var text = "Language detection:\n"
        + JSON.stringify(content["language"], null, 2) + "\n\n"
        + "Key phrases:\n"
        + JSON.stringify(content["keyPhrases"], null, 2) + "\n\n"
        + "Sentiment:\n"
        + JSON.stringify(content["sentiment"], null, 2);

    $('#AnalysisJsonResults').text(text);
}

// Populate the input field
function FillSampleText(sampleText) {
    $("#inputHelpBlock").val(sampleText);
    $("#Analyze").click();
}