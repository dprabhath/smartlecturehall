$(window).load(function () {
    var video5 = $("video", $("div[data-name='fbfEmotion']")).get(0);
    if (!video5)
    {
        return;
    }
    video5.volume = 0;
    var volumeValue5 = $("div[data-name='volumeValue']", $("div[data-name='fbfEmotion']"));
    volumeValue5.css("height", video5.volume * 100 + "%");
    video5.addEventListener('playing', function () {
        $(this).show();
        $("div[data-name='ImgDiv']", $("div[data-name='fbfEmotion']")).addClass("displaynone")
        $("div[data-name='loading_icon']", $("div[data-name='fbfEmotion']")).addClass("displaynone")
    });
    video5.addEventListener('timeupdate', function () {
        var currentPos = video5.currentTime; //Get currenttime
        $(".currentTime", $("div[data-name='fbfEmotion']")).html(GetHMSFormat(currentPos));
        var maxduration = video5.duration; //Get video duration
        var percentage = currentPos / maxduration * 100; //in %
        $('.timeBar', $("div[data-name='fbfEmotion']")).css('width', percentage + '%');

        if (percentage >= 100) {
            $("div[data-name='PlayOrPause']", $("div[data-name='fbfEmotion']")).removeClass("Pause-Style");
            $("div[data-name='PlayOrPause']", $("div[data-name='fbfEmotion']")).addClass("Play-Style");
            video5.pause();
            video5.currentTime = 0;
            $('.timeBar', $("div[data-name='fbfEmotion']")).css('width', '0%');
        }
        else if (!video5.paused) {
            $("div[data-name='PlayOrPause']", $("div[data-name='fbfEmotion']")).removeClass("Play-Style");
            $("div[data-name='PlayOrPause']", $("div[data-name='fbfEmotion']")).addClass("Pause-Style");
        }
    });

    var timeDrag5 = false;   /* Drag status */
    $('.progressBar', $("div[data-name='fbfEmotion']")).mousedown(function (e) {
        timeDrag5 = true;
        updatebar5(e.pageX);
    });
    $('.progressBar', $("div[data-name='fbfEmotion']")).mouseup(function (e) {
        if (timeDrag5) {
            timeDrag5 = false;
            updatebar5(e.pageX);
        }
    });
    $('.progressBar', $("div[data-name='fbfEmotion']")).mousemove(function (e) {
        if (timeDrag5) {
            updatebar5(e.pageX);
        }
    });
    //update Progress Bar control
    var updatebar5 = function (x) {
        var progress = $('.progressBar', $("div[data-name='fbfEmotion']"));
        var maxduration = video5.duration; //Video duraiton
        var position = x - progress.offset().left; //Click pos
        var percentage = 100 * position / progress.width();

        //Check within range
        if (percentage > 100) {
            percentage = 100;
        }
        if (percentage < 0) {
            percentage = 0;
        }
        //Update progress bar and video currenttime
        $('.timeBar', $("div[data-name='fbfEmotion']")).css('width', percentage + '%');
        video5.currentTime = maxduration * percentage / 100;
    };

    var volumeDrag5 = false;
    $("div[data-name='volumeData']", $("div[data-name='fbfEmotion']")).mousedown(function (e) {
        volumeDrag5 = true;
        volumeBar5(e.pageY)
    });
    $("div[data-name='volumeData']", $("div[data-name='fbfEmotion']")).mouseup(function (e) {
        if (volumeDrag5) {
            volumeDrag5 = false;
            volumeBar5(e.pageY);
        }
    });
    $("div[data-name='volumeData']", $("div[data-name='fbfEmotion']")).mousemove(function (e) {
        if (volumeDrag5) {
            volumeBar5(e.pageY);
        }
    });
    var volumeBar5 = function (y) {
        var volumeData = $("div[data-name='volumeData']", $("div[data-name='fbfEmotion']"));
        var position = y - volumeData.offset().top;
        var maxHeight = volumeData.height();
        var percentage = (maxHeight - position) / maxHeight;
        if (percentage > 1) {
            percentage = 1;
        }
        if (percentage < 0.01) {
            percentage = 0;
        }
        video5.volume = percentage;
        $("div[data-name='volumeValue']", $("div[data-name='fbfEmotion']")).css('height', (percentage * 100).toFixed(0) + '%');
        if (percentage == 0) {
            $("div[data-name='volumeIcon']", $("div[data-name='fbfEmotion']")).css("background-image", "url(" + window.applicationRoot + "/Modules/Microsoft.ProjectOxford.Website.Demos/Images/video/Volume0.png)");
        }
        else if (percentage > 0 && percentage <= 0.33) {
            $("div[data-name='volumeIcon']", $("div[data-name='fbfEmotion']")).css("background-image", "url(" + window.applicationRoot + "/Modules/Microsoft.ProjectOxford.Website.Demos/Images/video/Volume1.png)");
        }
        else if (percentage > 0.33 && percentage <= 0.66) {
            $("div[data-name='volumeIcon']", $("div[data-name='fbfEmotion']")).css("background-image", "url(" + window.applicationRoot + "/Modules/Microsoft.ProjectOxford.Website.Demos/Images/video/Volume2.png)");
        }
        else {
            $("div[data-name='volumeIcon']", $("div[data-name='fbfEmotion']")).css("background-image", "url(" + window.applicationRoot + "/Modules/Microsoft.ProjectOxford.Website.Demos/Images/video/Volume3.png)");
        }
    };
});
