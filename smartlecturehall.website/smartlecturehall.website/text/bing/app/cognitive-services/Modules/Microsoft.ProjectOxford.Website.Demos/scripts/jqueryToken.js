﻿(function ($) {
    $.getAntiForgeryToken = function (tokenWindow, appPath) {
        // HtmlHelper.AntiForgeryToken() must be invoked to print the token.
        tokenWindow = tokenWindow && typeof tokenWindow === typeof window ? tokenWindow : window;

        appPath = appPath && typeof appPath === "string" ? "_" + appPath.toString() : "";
        // The name attribute is either __RequestVerificationToken,
        // or __RequestVerificationToken_{appPath}.
        var tokenName = "__RequestVerificationToken" + appPath;

        // Finds the <input type="hidden" name={tokenName} value="..." /> from the specified.
        // var inputElements = $("input[type='hidden'][name='__RequestVerificationToken" + appPath + "']");
        //var inputElements = tokenWindow.document.getElementsByTagName("input");
        //for (var i = 0; i < inputElements.length; i++) {
        //    var inputElement = inputElements[i];
        //    if (inputElement.type === "hidden" && inputElement.name === tokenName) {
        //        return {
        //            name: tokenName,
        //            value: inputElement.value
        //        };
        //    }
        //}

        return { name: tokenName, value: tokenWindow.antiForgeryToken };
    };

    $.appendAntiForgeryToken = function (data, token) {
        // Converts data if not already a string.
        if (data && typeof data !== "string") {
            data = $.param(data);
        }

        // Gets token from current window by default.
        token = token ? token : $.getAntiForgeryToken(); // $.getAntiForgeryToken(window).

        data = data ? data + "&" : "";
        // If token exists, appends {token.name}={token.value} to data.
        return token ? data + encodeURIComponent(token.name) + "=" + encodeURIComponent(token.value) : data;
    };

    // Wraps $.post(url, data, callback, type) for most common scenarios.
    $.postAntiForgery = function (url, data, callback, type) {
        return $.post(url, $.appendAntiForgeryToken(data), callback, type);
    };

    // Wraps $.ajax(settings).
    $.ajaxAntiForgery = function (settings) {
        // Supports more options than $.ajax(): 
        // settings.token, settings.tokenWindow, settings.appPath.
        if (typeof (reCaptchaSdk) != 'undefined' && reCaptchaSdk.isNeedVerify) {
            settings.headers ={};
            settings.headers.g_Recaptcha_Response = reCaptchaSdk.g_Recaptcha_Response;
            settings.headers.isNeedVerify = reCaptchaSdk.isNeedVerify;
        }       
        var token = settings.token ? settings.token : $.getAntiForgeryToken(settings.tokenWindow, settings.appPath);
        settings.data = $.appendAntiForgeryToken(settings.data, token);
        return $.ajax(settings);
    };
})(jQuery);