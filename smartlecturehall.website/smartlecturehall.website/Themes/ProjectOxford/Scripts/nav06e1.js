/// <reference path="https://code.jquery.com/jquery-2.2.1.min.js" />
(function () {
    'use strict';
    $(".dropdown-toggle>a").on("click", function (e) {
        //slide toggle sub mebu
        $(this).siblings(".dropdown-menu").slideToggle(200).children().eq(0).children().eq(0).slideDown();
        //hide sibling menu
        $(this).parent().toggleClass("open1").siblings().removeClass("open1").children(".dropdown-menu").slideUp(200);
    });

    //Hide navigation when user click elsewhere
    $("#layout-main-container,#layout-header,#layout-footer").click(function () {
        $(".tier-1").slideUp().parent().removeClass("open1");
    });

    $("#content").click(function () {
        $("#navbar-collapse-1").animate({
            height: 0
        }, 300, function () {
            $(this).removeClass("in");
        });
    });

    // second menuitem click event
    $(".dropdown-menu li[role='menuitem']").on('click', function (event) {
        if (window.innerWidth <= 992) {
            $(this)
                .parents(".col-md-2")
                .siblings()
                .find("[role='menuitem']")
                .removeClass("open1")
                .siblings(".sub-menuitem")
                .hide("200");
            $(this)
                .toggleClass("open1")
                .siblings(".sub-menuitem")
                .slideToggle("200");
        }
    })

    //When resize recaculate layout
    function ResponseSize() {
        if (window.innerWidth <= 992) {
            // collapse all third level menu item
            $(".sub-menuitem").hide();
        } else {
            $(".sub-menuitem").show();
        }
    }

    var windowInnerwidth = window.innerWidth;

    window.onresize = function () {
        if (windowInnerwidth !== window.innerWidth) {
            ResponseSize();
            $("#layout-header").stop().slideDown(350);
            if (window.innerWidth > 992) {
                if (windowInnerwidth > window.innerWidth) {
                    MoveMainMenu('up');
                }
                else {
                    MoveMainMenu('down');
                }
            }
            else {
                MoveMainMenu('up');
            }
            windowInnerwidth = window.innerWidth
        }
    }

    ResponseSize();

    //move signin widget to mobil nav-bar
    function MoveSinginWidget() {
        var newSigninWidget = $("#loginWidget").clone();

        var newSigninWidgetPc = $("#loginWidget").clone();
        //pc layout
        $("#navbar-collapse-1").append(newSigninWidgetPc.attr("id", "newLoginWidgetScroll").css({
            "margin-top": "9px",
            "position": " absolute",
            "display": "none",
            "right": "-20px"
        }));

        //mobile layout
        $("#newWidgetContainer").append(newSigninWidget.attr("id", "newLoginWidgetMobile"));

        $("#newWidgetContainer span").remove();
    }

    MoveSinginWidget();
     
    //Remove click '#' href, scroll target anchor
    $(".dropdown-toggle a[href='#']").click(function (e) {
        e.preventDefault();
    });
      
    //Window scroll slideup navigation
    $(window).scroll(function () {
        if (window.innerWidth > 768) {
            if ($(window).scrollTop() > 0) {
                $("#layout-header").stop().slideUp(350);
                $("#loginWidget").hide(10, function () {
                    $("#newLoginWidgetScroll").fadeIn(350);
                });
                MoveMainMenu('up');
            }
            else {
                $("#layout-header").stop().slideDown(350);
                $("#newLoginWidgetScroll").hide(10, function () {
                    $("#loginWidget").fadeIn(350)
                });
                MoveMainMenu('down');
            }
        }
        else {
            $("#newLoginWidgetScroll").hide();
        }  
    });

    $("body").ready(function () {
        if ($(this).scrollTop() > 350) {
            $("#layout-header").stop().slideUp(350);
            $("#loginWidget").hide(10, function () {
                $("#newLoginWidgetScroll").fadeIn(350);
            });
            MoveMainMenu('up');
        }
    });

    var layoutHeader = $("#layout-header").outerHeight();

    //caculate navigation layout
    function MoveMainMenu(flag) {

        var consValue = $("#translatorwidget").outerHeight();

        var moveHeight = $('#translatorwidget').length > 0 ? ($("#translatorwidget").css('display') !== 'none' ? consValue : 0) : 0;

        var offsetLayoutMarginTop = 0;

        var offsetpadingtop = 48;

        offsetLayoutMarginTop = moveHeight;

        switch (flag) {
            case "up":
                moveHeight = moveHeight;
                break;
            case "down":
                moveHeight = layoutHeader + moveHeight;
                offsetpadingtop = 0;
                break;
        }

        $("#layout-header").css('margin-top', offsetLayoutMarginTop);

        $("#layout-navigation").stop().animate({
            'margin-top': moveHeight
        }, 300);

        $(".hero-banner-container,.mini-hero-banner-container").css('margin-top', moveHeight + $("#layout-navigation").outerHeight() - offsetpadingtop);

        $(".tier-1").stop().animate({
            'top': moveHeight + 50
        }, 300);
    }

})();