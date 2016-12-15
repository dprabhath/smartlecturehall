(function () {
    $('[data-toggle="tooltip"]').tooltip()
    var luisDemoRoot = window.applicationRoot + "/Demo/LuisActionsDemo";
    var officeSuggestionsAction = luisDemoRoot + "/GetOfficeSuggestions";
    var weatherSuggestionsAction = luisDemoRoot + "/GetWeatherSuggestions";
    var officeSamplesAction = luisDemoRoot + "/GetOfficeSamples";
    var weatherSamplesAction = luisDemoRoot + "/GetWeatherSamples";
    var triggerAction = luisDemoRoot + "/Trigger";
    var isOffice = true;
    var getSuggestionsInFlight = false;
    var luisRequestsInFlight = 0;
    var lastConversation = undefined;
     
    window.addEventListener("resize", function () {
        if (window.innerWidth > 768) {
            officeHeadline.click();
        } else {
            $(".demobtn").eq(0).click();
        }
    });

    var getSuggestions = function (cue) {
        if (!getSuggestionsInFlight) {
            getSuggestionsInFlight = true;
            var suggestionsAction;
            if (isOffice) {
                suggestionsAction = officeSuggestionsAction;
            } else {
                suggestionsAction = weatherSuggestionsAction;
            }

            $.postAntiForgery(suggestionsAction, { cue: cue }, function (success) {
                if (!$("#phrase").attr("disabled")) {
                    var select = $("#suggestions");
                    select.empty();
                    if (success.length === 0) {
                        select.hide();
                    } else {
                        select.show();

                        // If the select has 1 option and a size of 1, the change event isn't firing.
                        select.attr("size", Math.max(Math.min(5, success.length), 2));
                        success.map(function (suggestion, i) {
                            select.append($("<option></option>").attr("value", i).text(suggestion));
                        });
                    }
                }
                getSuggestionsInFlight = false;
            });
        }
    };

    var getDomainSuggestions = function (domainSuggestionsAction) {
        $.postAntiForgery(domainSuggestionsAction, undefined, function (success) {
            var suggestionsDiv = $("#domainSuggestions");
            suggestionsDiv.empty();
            success.map(function (suggestion, i) {
                var button = $("<button type='button' class='btn btn--suggestion text--reg text--sm'></button>").text(suggestion);
                button.click(function () {
                    $("#phrase").val(suggestion);
                    submit();
                });
                suggestionsDiv.append(button);
            });
        });
    };
    getDomainSuggestions(officeSamplesAction);

    var switchToOffice = function () {
        $("#officeHeadline").addClass("headline-button-selected");
        $("#weatherHeadline").removeClass("headline-button-selected");
        $("#officeHeadline").addClass("text--semibold");
        $("#weatherHeadline").removeClass("text--semibold");

        $("#officeHeadline").removeClass("headline-button");
        $("#weatherHeadline").addClass("headline-button");
        $("#officeHeadline").removeClass("text--semilight");
        $("#weatherHeadline").addClass("text--semilight");
        getDomainSuggestions(officeSamplesAction);
        $("#luisResponse").empty();
        isOffice = true;
    };

    var switchToWeather = function () {
        $("#officeHeadline").removeClass("headline-button-selected");
        $("#weatherHeadline").addClass("headline-button-selected");
        $("#officeHeadline").removeClass("text--semibold");
        $("#weatherHeadline").addClass("text--semibold");

        $("#officeHeadline").addClass("headline-button");
        $("#weatherHeadline").removeClass("headline-button");
        $("#officeHeadline").addClass("text--semilight");
        $("#weatherHeadline").removeClass("text--semilight");
        getDomainSuggestions(weatherSamplesAction);
        $("#luisResponse").empty();
        $("#report").empty();
        isOffice = false;
    }

    $(".demobtn").click(function () {
        var demottype = $(this).data("demotype");
        $(this).parent().removeClass("selecting").siblings().removeClass("selected");
        $(".behavior-selected-title").text($(this).text());
        switch (demottype) {
            case "office":
                getDomainSuggestions(officeSamplesAction);
                $("#lamp1Image").attr("src", window.lamp1DefaultPath);
                $("#lamp2Image").attr("src", window.lamp2DefaultPath);
                $("#office").show();
                $("#weather").hide();
                $("#none").hide();
                $("#phrase").val(window.officePlaceholderText);
                break;
            case "weather":
                getDomainSuggestions(weatherSamplesAction);
                $("#weatherImage").attr("src", window.questionImagePath);
                $("#weather").show();
                $("#office").hide();
                $("#none").hide();
                $("#phrase").val(window.weatherPlaceholderText);
                break;
        }
        submit();

    });

    $("#weatherHeadline").click(function () {
        switchToWeather();

        $("#weatherImage").attr("src", window.questionImagePath);
        $("#weather").show();
        $("#office").hide();
        $("#none").hide();

        $("#phrase").val(window.weatherPlaceholderText);
        submit();
    });

    $("#officeHeadline").click(function () {
        switchToOffice();

        $("#lamp1Image").attr("src", window.lamp1DefaultPath);
        $("#lamp2Image").attr("src", window.lamp2DefaultPath);
        $("#office").show();
        $("#weather").hide();
        $("#none").hide();

        $("#phrase").val(window.officePlaceholderText);
        submit();
    });

    $("#phrase").keyup(function () {
        getSuggestions($("#phrase").val());
    });

    $("#suggestions").change(function () {
        $("#phrase").val($("#suggestions option:selected").text());
        submit();
    });

    var submit = function () {
        $("#submitButton").attr("disabled", "disabled");
        $("#phrase").attr("disabled", "disabled");
        $("#suggestions").hide();
        luisRequestsInFlight++

        var model = {
            lamp1Image: $("#lamp1Image").attr("src"),
            lamp2Image: $("#lamp2Image").attr("src"),
            luisResponse: $("#luisResponse").text(),
            phrase: $("#phrase").val(),
        }

        $.postAntiForgery(triggerAction, model, function (success) {
            luisRequestsInFlight--;
            if (luisRequestsInFlight > 0) {
                return;
            }

            var response = JSON.parse(success.luisResponse || success.LuisResponse);
            var dialog;
            if (response) {
                dialog = response.dialog || response.Dialog;
            }

            if (success.lamp1Image || success.Lamp1Image) {
                if (isOffice === false) {
                    switchToOffice();
                }

                if (!dialog || dialog.status === "Finished") {
                    getDomainSuggestions(officeSamplesAction);
                }

                if (dialog && dialog.status !== "Finished") {
                    $("#weatherImage").attr("src", window.questionImagePath);
                    $("#report").empty();
                    $("#report").text(dialog.prompt);

                    $("#office").hide();
                    $("#weather").show();
                    $("#none").hide();
                }
                else {
                    $("#lamp1Image").attr("src", success.lamp1Image || success.Lamp1Image);
                    $("#lamp2Image").attr("src", success.lamp2Image || success.Lamp2Image);

                    $("#office").show();
                    $("#weather").hide();
                    $("#none").hide();
                }
            } else if (success.weather || success.Weather) {
                if (isOffice === true) {
                    switchToWeather();
                }
                var reportDiv = $("#report");
                if (!dialog || dialog.status === "Finished") {
                    getDomainSuggestions(weatherSamplesAction);
                }

                if (!lastConversation || !dialog || dialog.contextId !== lastConversation) {
                    $("#report").empty();
                }

                if (dialog) {
                    lastConversation = dialog.contextId;
                }

                var list = success.weather || success.Weather;

                var divs = [];
                list.map(function (entry, i) {
                    var div;
                    if (i % 2 !== 0) {
                        var innerDiv = $("<div class='col-md-offset-2 text--reg text--sm'></div>").text(entry);
                        div = $("<div class='row'></div>").append(innerDiv);
                    } else {
                        div = $("<div class='row  text--reg text--sm'></div>").text(entry);
                    }
                    divs[i] = div;
                });

                var children = reportDiv.children();
                reportDiv.empty();
                reportDiv.append(divs);
                reportDiv.append(children);

                var weatherImage = success.weatherImage || success.WeatherImage;
                if (weatherImage) {
                    $("#weatherImage").attr("src", weatherImage);
                }

                $("#weather").show();
                $("#office").hide();
                $("#none").hide();
            } else {
                $("#office").hide();
                $("#weather").hide();
                $("#none").show();
            }

            $("#luisResponse").text(success.luisResponse || success.LuisResponse);
            $("#luisResponseContainer").show();

            if (!dialog || dialog.status.toUpperCase() === "FINISHED") {
                getSuggestions();
            } else {
                $("#phrase").val("");
            }

            $("#submitButton").removeAttr("disabled");
            $("#phrase").removeAttr("disabled");
        });
    };

    $("#phrase").val(window.officePlaceholderText);
    submit();

    $("#triggerActionForm").submit(submit);

    $(".behavior-selected").click(function () {
        $(this).toggleClass("selected").siblings(".behavior-options").toggleClass("selecting");
    });
})();