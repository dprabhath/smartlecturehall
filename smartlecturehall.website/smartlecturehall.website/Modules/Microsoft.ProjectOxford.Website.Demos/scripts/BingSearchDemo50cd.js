(function(){
    console.log("BingSearchDemo");

    var demoSelector = ".bing-search-demo";
    var previewTabSelector = ".tab-preview";
    var jsonTabSelector = ".tab-json";
    var jsonContentSelector = ".json-content";

    var previewTabBtnSelector = ".activate-tab-preview";
    var jsonTabBtnSelector = ".activate-tab-json";

    var typeToRenderFunction = {
        "Images": renderImageResponse,
        "Videos": renderVideoResponse,
        "News": renderNewsResponse,
        "SearchResponse": renderWebResponse,
        "Suggestions" : renderSuggestionsResponse
    };

    var entityMap = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': '&quot;',
        "'": '&#39;',
        "/": '&#x2F;'
    };

    function escapeHtml(string) {
        return String(string).replace(/[&<>"'\/]/g, function (s) {
            return entityMap[s];
        });
    }

    // for a given element, determines which data-demo-type it is inside
    // this allows us to isolate different data-demo-types so they can live on the same page
    function getDemoSelectorPrefixForElement(element) {
        var dataDemoType = $(element).closest("[data-demo-type]").attr("data-demo-type");
        return "div[data-demo-type='" + dataDemoType + "'] ";
    }

    function syntaxHighlight(json) {
        json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
            var cls = 'number';
            if (/^"/.test(match)) {
                if (/:$/.test(match)) {
                    cls = 'key';
                } else {
                    cls = 'string';
                }
            } else if (/true|false/.test(match)) {
                cls = 'boolean';
            } else if (/null/.test(match)) {
                cls = 'null';
            }
            return '<span class="' + cls + '">' + match + '</span>';
        });
    }

    function renderImageResponse(response, demoSelectorPrefix)
    {
        if (response.value && response.value.length > 0) {
            // add images to preview window
            $.each(response.value, function (index, image) {
                var thumbnailUrl = image.thumbnailUrl += "&c=1&h=168&w=168";

                // for anitmated GIFs we want to use the contentUrl so that it is animated
                if (image.encodingFormat && image.encodingFormat == "animatedgif" && image.contentUrl) {
                    thumbnailUrl = image.contentUrl;
                }

                $(demoSelectorPrefix + previewTabSelector).append("<a target='_blank' href='" + image.webSearchUrl + "'><img class='preview-thumbnail' src='" + thumbnailUrl + "' /></a>")
            });
        }
    }

    function renderVideoResponse(response, demoSelectorPrefix) {
        if (response.value && response.value.length > 0) {

            // add videos thumbnails to preview window
            $.each(response.value, function (index, video) {
                var thumbnailUrl = video.thumbnailUrl += "&c=1&h=168&w=300";
                var motionThumbnailUrl = video.motionThumbnailUrl;

                var videoElement = $("<div class='video-thumbnail-container'><a target='_blank' href='" + video.webSearchUrl + "'><img class='video-preview-thumbnail' motion-thumbnail='" + motionThumbnailUrl + "' static-thumbnail='" + thumbnailUrl + "' src='" + thumbnailUrl + "' /></a><div class='video-caption'>" + video.name + "</div></div>");
                videoElement.find('[motion-thumbnail]').mouseenter(function (event) {
                    if (event.target) {
                        var element = $(event.target);
                        var motionThumbnailUrl = element.attr("motion-thumbnail");
                        if (motionThumbnailUrl.length > 0) {

                            var motionThumbnailElement = $('<video muted class="video-preview-motion-thumbnail" controls="" autoplay="" name="media"><source src="' + motionThumbnailUrl + '" type="video/mp4"></video>');
                            motionThumbnailElement.mouseout(function (e) {

                                var siblings = $(e.target).siblings("img");
                                if (siblings.length > 0) {
                                    $(siblings[0]).removeClass("hidden");
                                }

                                // remove video element so it doesnt keep playing
                                $(e.target).remove();
                            });

                            element.after(motionThumbnailElement);
                        }
                    }
                });

                $(demoSelectorPrefix + previewTabSelector).append(videoElement);
            });
        }
    }

    function renderNewsResponse(response, demoSelectorPrefix) {
        if (response.value && response.value.length > 0) {
            // add videos thumbnails to preview window
            $.each(response.value, function (index, article) {
                if (article && article.image && article.image.thumbnail && article.image.thumbnail.contentUrl) {
                    $(demoSelectorPrefix + previewTabSelector).append("<img class='news-thumbnail' src='" + article.image.thumbnail.contentUrl + "' /><div class='news-snippet'><a target='_blank' href='" + article.url + "'><span>" + article.name + "</span></a><br><span>" + article.description + "</span></div><br class='clear'><br>")
                }
            });
        }
    }

    function renderSuggestionsResponse(response, demoSelectorPrefix) {
        if (response && response.suggestionGroups &&
            response.suggestionGroups.length > 0 &&
            response.suggestionGroups[0].name === "Web" &&
            response.suggestionGroups[0].searchSuggestions &&
            response.suggestionGroups[0].searchSuggestions.length > 0) {

            // add suggestions to preview window
            var suggestionsHtml = $("<div></div>");
            $.each(response.suggestionGroups[0].searchSuggestions, function (index, suggestion) {
                var suggestion = $("<a class='webpage-url' target='_blank' href='" + suggestion.url + "'><span>" + suggestion.displayText + "</span></a><br><br>");
                suggestionsHtml.append(suggestion);
            });

            $(demoSelectorPrefix + previewTabSelector).html(suggestionsHtml);
        }
    }

    function renderWebResponse(response, demoSelectorPrefix) {
        if (response.queryContext && response.queryContext.alteredQuery) {
            var requeryLink = "https://www.bing.com/search?q=" + encodeURIComponent(response.queryContext.alteredQuery);
            $(demoSelectorPrefix + previewTabSelector).append("<div><span>Showing results for <a target='_blank' href='" + requeryLink + "'>" + response.queryContext.alteredQuery + "</a></span</div><br><br>")
        }

        // add web results to preview window

        if (response.rankingResponse && response.rankingResponse.mainline && response.rankingResponse.mainline.items) {
            var items = response.rankingResponse.mainline.items
            if (response.rankingResponse.sidebar && response.rankingResponse.sidebar.items) {
                items = $.merge(items, response.rankingResponse.sidebar.items)
            }

            var query = $(demoSelectorPrefix + " .q").val();

            $(items).each(function (index, value) {
                if (value.answerType == "WebPages") {
                    if (response.webPages && response.webPages.value) {
                        var webPage = response.webPages.value[value.resultIndex];
                        $(demoSelectorPrefix + previewTabSelector).append("<a class='webpage-url' target='_blank' href='" + webPage.url + "'><span>" + webPage.name + "</span></a><br><span class='webpage-display-url'>" + webPage.displayUrl + "</span><br><span>" + webPage.snippet + "</span><br><br>");
                    }
                }

                if (value.answerType == "SpellSuggestions") {
                    if (response.spellSuggestions && response.spellSuggestions.value && response.spellSuggestions.value.length > 0) {
                        var spellSuggestion = response.spellSuggestions.value[0];
                        var requeryLink = "https://www.bing.com/search?q=" + encodeURIComponent(spellSuggestion.text);
                        $(demoSelectorPrefix + previewTabSelector).append("<div><span>Did you mean <a target='_blank' href='" + requeryLink + "'>" + spellSuggestion.displayText + "</a>?</span</div><br><br>");
                    }
                }

                if (value.answerType == "News") {
                    var newsRequery = "https://www.bing.com/news/search?q=" + encodeURIComponent(query);
                    $(demoSelectorPrefix + previewTabSelector).append("<div><h4>News about <a target='_blank' href='" + newsRequery + "' >" + escapeHtml(query) + "</a><h4></div>");
                    renderNewsResponse(response.news, demoSelectorPrefix);
                }

                if (value.answerType == "RelatedSearches") {
                    var requery = "https://www.bing.com/search?q=" + encodeURIComponent(query);
                    $(demoSelectorPrefix + previewTabSelector).append("<div><h4>Related searches for <a target='_blank' href='" + requery + "' >" +  escapeHtml(query) + "</a><h4></div>");
                    $(response.relatedSearches.value).each(function (index, value) {
                        $(demoSelectorPrefix + previewTabSelector).append("<div class='related-search'><a target='_blank' href='" + value.webSearchUrl + "' >" + value.displayText + "</a></div>");
                    });
                }

                if (value.answerType == "Videos") {
                    var requery = "https://www.bing.com/videos/search?q=" + encodeURIComponent(query);
                    $(demoSelectorPrefix + previewTabSelector).append("<div><h4>Videos of <a target='_blank' href='" + requery + "' >" +  escapeHtml(query) + "</a><h4></div>");

                    // only take first 4 videos
                    if (response.videos.value.length > 4) {
                        response.videos.value = $(response.videos.value).slice(0, 4);
                    }

                    renderVideoResponse(response.videos, demoSelectorPrefix);
                    $(demoSelectorPrefix + previewTabSelector).append("<div class='clear'></div><br>");
                }

                if (value.answerType == "Images") {
                    var requery = "https://www.bing.com/images/search?q=" + encodeURIComponent(query);
                    $(demoSelectorPrefix + previewTabSelector).append("<div><h4>Images of <a target='_blank' href='" + requery + "' >" +  escapeHtml(query) + "</a><h4></div>");

                    // only take first 4 images
                    if (response.images.value.length > 4) {
                        response.images.value = $(response.images.value).slice(0, 4);
                    }

                    renderImageResponse(response.images, demoSelectorPrefix);
                    $(demoSelectorPrefix + previewTabSelector).append("<div class='clear'></div><br>");
                }
            });
        }
    }

    function renderResults(demoSelectorPrefix) {
        // the demo widget specifies which path it requests
        var path = $(demoSelectorPrefix).attr("demo-path");
        var query = $(demoSelectorPrefix + ".q").val();

        var action = "SearchAsync";
        if (path && path.indexOf("suggestions") > -1) {
            action = "SuggestionsAsync";
        }

        var url = applicationRoot + "/Demo/BingApisDemo/" + action + "?path=" + path + "&q=" + encodeURIComponent(query) + "&textFormat=html&textdecorations=true";

        var additionalParamsQueryString = "";
        $(demoSelectorPrefix + ".param").each(function (index, element) {
            var queryParam = $(element).attr("data-qp");
            var value = $(element).val();
            if (queryParam && value) {
                // if the value is empty of 'unspecified' we dont want to add the param at all
                if (value !== "(unspecified)" && value !== ""){
                    additionalParamsQueryString += "&" + queryParam + "=" + value;
                }
            }
        });

        if (additionalParamsQueryString) {
            url += additionalParamsQueryString;
        }

        // clear previous preview
        $(demoSelectorPrefix + jsonContentSelector).html("");
        $(demoSelectorPrefix + previewTabSelector).html("");

        // add spinners, but not if there is already a spinner showing
        if ($(demoSelectorPrefix + ".loading-icon").length == 0 && $(demoSelectorPrefix + ".loading-icon").length == 0) {
            $(demoSelectorPrefix + previewTabSelector).append("<div class='loading-icon loader'></div>");
            $(demoSelectorPrefix + jsonTabSelector).append("<div class='loading-icon loader'></div>");
        }

        $.ajaxAntiForgery({
            url: url,
            method: "POST",
            data: {},
            success: function (response) {
                reCaptchaSdk.RemoveReCaptcha();

                $(demoSelectorPrefix + previewTabSelector).find(".loading-icon").remove();
                $(demoSelectorPrefix + jsonTabSelector).find(".loading-icon").remove();

                if (response) {
                    // add json response to json preview
                    $(demoSelectorPrefix + jsonContentSelector).append(syntaxHighlight(JSON.stringify(response, undefined, 2)));

                    if (response._type && typeToRenderFunction[response._type]) {
                        typeToRenderFunction[response._type](response, demoSelectorPrefix);
                    }
                    else {
                        console.log("could not find render function results.")
                    }
                }
            },
            error: function (e) {
                if (e && e.status === 429) {
                    reCaptchaSdk.ProcessReCaptchaStateCode(e);
                }

                $(demoSelectorPrefix + previewTabSelector).find(".loading-icon").remove();
                $(demoSelectorPrefix + jsonTabSelector).find(".loading-icon").remove();

                console.log("Error response from AJAX endpoint");
            }
        });
    }

    // allow buttons to switch back and forth between tabs
    $(".activate-tab-json").each(function (index, element) {
        // figure out which demo this tab is inside, and link click events to the tabs in that demo
        var prefix = getDemoSelectorPrefixForElement(element);
        $(element).click(function () {
            $(prefix + jsonTabSelector).removeClass("hidden");
            $(prefix + jsonTabBtnSelector).addClass("tab-active");

            $(prefix + previewTabSelector).addClass("hidden");
            $(prefix + previewTabBtnSelector).removeClass("tab-active");
        });
    });

    $(".activate-tab-preview").each(function (index, element) {
        // figure out which demo this tab is inside, and link click events to the tabs in that demo
        var prefix = getDemoSelectorPrefixForElement(element);
        $(element).click(function () {
            $(prefix + previewTabSelector).removeClass("hidden");
            $(prefix + previewTabBtnSelector).addClass("tab-active");

            $(prefix + jsonTabSelector).addClass("hidden");
            $(prefix + jsonTabBtnSelector).removeClass("tab-active");
        });
    });

    $(".search").each(function (index, element) {
        var prefix = getDemoSelectorPrefixForElement(element);
        $(element).click(function () {
            renderResults(prefix);
        });
    });

    $(".q").each(function (index, element) {
        var prefix = getDemoSelectorPrefixForElement(element);
        $(element).keypress(function (e) {
            if (e.which == '13') {
                renderResults(prefix);
            }
        });
    });

    $("[data-qp]").each(function (index, element) {
        var prefix = getDemoSelectorPrefixForElement(element);
        $(element).change(function (e) {
            renderResults(prefix);
        });
    });

    // AutoSuggest method by pausing after text is entered
    var typingTimer;                //timer identifier
    var doneTypingInterval = 150;  //time in ms, 5 second for example

    var autoSuggestInputSelector = "[data-demo-type='suggestions-search'] .q";

    // special handling of autosuggest box, we want to trigger 'render' on every key press
    function doneTyping() {
        var prefix = "[data-demo-type='suggestions-search'] ";
        renderResults(prefix);
    };

    //on keyup, start the countdown
    $(autoSuggestInputSelector).keyup(function () {
        clearTimeout(typingTimer);
        if ($(autoSuggestInputSelector).val) {
            typingTimer = setTimeout(doneTyping, doneTypingInterval);
        }
    });

    // register click handlers for 'also try' queries
    $(".also-try a").each(function (index, element) {
        var prefix = getDemoSelectorPrefixForElement(element);
        $(element).click(function () {
            // populate the search box
            $(prefix + ".q").val($(element).text());

            // trigger the search action
            $(prefix + ".search").trigger('click');
        });
    });
})();