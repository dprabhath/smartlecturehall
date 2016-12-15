$(document).ready(function () {
    $("#ButtonBreak").on('click', function () {
        $("#sampleBtns").find(".demo-sample-btn").removeClass("demo-btn-selected");
        // send
        getResponse();
    })
    $(".demo-sample-btn").eq(0).click();
});

// Extract matches
function getMatchList(response) {
    var list = [];
    for (var i = 0; i < response.entities.length; i++) {
        var entity = response.entities[i];
        var id = entity.wikipediaId;
        for (var k = 0; k < entity.matches.length; k++) {
            var match = entity.matches[k];
            var textLength = match.text.length;
            for (var j = 0; j < match.entries.length; j++) {
                var entry = match.entries[j];
                //insertText(arr, entry.offset);
                var replace = {
                    offset: entry.offset,
                    textLength: textLength,
                    id: id
                }
                list.push(replace);
            }
        }
    }

    list.sort(function (a, b) { return a.offset - b.offset });
    return list;
}

// Find exactly word to wrap with span
function getHighlightHtml(originalText, matchList) {
    var startSpan = "<span class=\"mention\" title=\"";
    var closeSpan = "</span>";

    var arr = [];
    var offset = 0;
    for (var i = 0; i < matchList.length; i++) {
        var match = matchList[i];

        var prev = originalText.substr(offset, match.offset - offset);
        arr.push(prev);

        var curr = startSpan + match.id + "\">" + originalText.substr(match.offset, match.textLength) + closeSpan;
        arr.push(curr);
        offset = match.offset + match.textLength;
    }

    // Add last
    var last = originalText.substr(offset, originalText.length - offset);
    arr.push(last);

    return arr.join('');
}

function getResponse() {

    var WordsFormData = {};

    WordsFormData.Words = $("#Text").val()

    $.ajaxAntiForgery({
        type: "POST",
        url: window.applicationRoot + "/Demo/EntityLinkingDemo/GetLinking",
        dataType: 'json',
        data: WordsFormData,
        success: function (response) {
            reCaptchaSdk.RemoveReCaptcha();
            if (response == null) {
                $('#jsonOutput').html("Internal Server Error");
                $('#highlightContent').html("Internal Server Error");
            } else {
                $('#jsonOutput').html($.getFormatJsonStrFromString(JSON.stringify(response)));

                var list = getMatchList(response);
                var content = getHighlightHtml(WordsFormData.Words, list);

                $("#highlightContent").html(content);
            }
        },
        error: function (e) {
            reCaptchaSdk.ProcessReCaptchaStateCode(e, 'reCaptcha-EntityLinking-demo');
            if (e.status == 500) {
                $('#highlightContent').html('Your token expired, please refresh the page and try again.');
                $('#jsonOutput').html('Your token expired, please refresh the page and try again.');
                return;
            }
            $('#highlightContent').html(e.responseText);
            $('#jsonOutput').html(e.responseText);
        },
        complete: function (result) {
            //loadingStop();
        }
    });

    //$.ajaxAntiForgery({
    //    type: "POST",
    //    url: window.applicationRoot + "/Demo/EntityLinkingDemo/GetLinking",
    //    dataType: 'json',
    //    data: WordsFormData,
    //    beforeSend: function (xhr) {
    //        xhr.setRequestHeader("Content-type", "text/plain");
    //    },
    //    success: function (result) {
    //        var response = JSON.parse(response);
    //        var list = getMatchList(response);
    //        var content = getHighlightHtml(data, list);

    //        $("#highlightContent").html(content);
    //    },
    //    error: function (e) {
    //        $('#highlightContent').html("Internal Server Error");
    //        $('#jsonOutput').html("Internal Server Error");
    //    },
    //    complete: function (result) {
    //    }
    //});
}

// add click event for sample buttons whose result is preserved
var samples = [
    { text: "Mars is the fourth planet from the Sun and the second smallest planet in the Solar System, after Mercury. Named after the Roman god of war, it is often referred to as the \"Red Planet\" because the iron oxide prevalent on its surface gives it a reddish appearance." },
    { text: "For months, the four scientific instruments at the heart of the James Webb Space Telescope have been sealed in what looks like a huge pressure cooker. It's a test chamber that simulates the grueling operating conditions they will face after Webb is launched into orbit in 2018. But in fact, \"pressure cooker\" is an apt metaphor for the whole project. The infrared Webb observatory is the biggest, most complex, and most expensive science mission that NASA has ever attempted. Like that of its predecessor, the Hubble Space Telescope, Webb's construction has been plagued by redesigns, schedule slips, and cost overruns that have strained relationships with contractors, international partners, and supporters in the U.S. Congress. Lately the project has largely stuck to its schedule and its $8 billion budget. But plenty could still go wrong, and the stakes are high: Both the future of space-based astronomy and NASA's ability to build complex science missions depend on its success." },
    { text: "One of the pioneering polar explorers from the Golden Age of Exploration grew up as a poor orphan in Baltimore, and his achievements later in life were largely ignored because of his race.Matthew Henson was one of the era few African-American explorers, and he may have been the first man, black or white, to reach the North Pole. His grueling adventures alongside US Navy engineer Robert E. Peary are chronicled in these dramatic early photos.Henson was born in 1866. At age 13, as an orphan, he became a cabin boy on a ship, where the vessel captain taught him to read and write. Henson was working as a store clerk in Washington, D.C. in 1887 when he met Peary. Peary hired him as a valet, and the two began a long working relationship that spanned half a dozen epic voyages over two decades." }
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
        getResponse();
    });
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

function updateTabState(element) {
    if (!element.hasClass("ui-nav-active")) {
        //change tab style
        element.addClass("ui-nav-active");
        element.siblings().removeClass("ui-nav-active");
    }
}

function clearResultUI() {
    $('#jsonOutput').html(null);
    $('#highlightContent').html(null);
}