$(window).load(function () {
    var video6 = $("video", $("div[data-name='fbfTagging']")).get(0);
    if (!video6)
    {
        return;
    }
    video6.volume = 0;
    var volumeValue6 = $("div[data-name='volumeValue']", $("div[data-name='fbfTagging']"));
    volumeValue6.css("height", video6.volume * 100 + "%");
    video6.addEventListener('playing', function () {
        $(this).show();
        $("div[data-name='ImgDiv']", $("div[data-name='fbfTagging']")).addClass("displaynone")
        $("div[data-name='loading_icon']", $("div[data-name='fbfTagging']")).addClass("displaynone")
    });
    video6.addEventListener('timeupdate', function () {
        var currentPos = video6.currentTime; //Get currenttime
        $(".currentTime", $("div[data-name='fbfTagging']")).html(GetHMSFormat(currentPos));
        var maxduration = video6.duration; //Get video duration
        var percentage = currentPos / maxduration * 100; //in %
        $('.timeBar', $("div[data-name='fbfTagging']")).css('width', percentage + '%');

        if (percentage >= 100) {
            $("div[data-name='PlayOrPause']", $("div[data-name='fbfTagging']")).removeClass("Pause-Style");
            $("div[data-name='PlayOrPause']", $("div[data-name='fbfTagging']")).addClass("Play-Style");
            video6.pause();
            video6.currentTime = 0;
            $('.timeBar', $("div[data-name='fbfTagging']")).css('width', '0%');
        }
        else if (!video6.paused) {
            $("div[data-name='PlayOrPause']", $("div[data-name='fbfTagging']")).removeClass("Play-Style");
            $("div[data-name='PlayOrPause']", $("div[data-name='fbfTagging']")).addClass("Pause-Style");
        }
    });

    var timeDrag6 = false;   /* Drag status */
    $('.progressBar', $("div[data-name='fbfTagging']")).mousedown(function (e) {
        timeDrag6 = true;
        updatebar6(e.pageX);
    });
    $('.progressBar', $("div[data-name='fbfTagging']")).mouseup(function (e) {
        if (timeDrag6) {
            timeDrag6 = false;
            updatebar6(e.pageX);
        }
    });
    $('.progressBar', $("div[data-name='fbfTagging']")).mousemove(function (e) {
        if (timeDrag6) {
            updatebar6(e.pageX);
        }
    });
    //update Progress Bar control
    var updatebar6 = function (x) {
        var progress = $('.progressBar', $("div[data-name='fbfTagging']"));
        var maxduration = video6.duration; //Video duraiton
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
        $('.timeBar', $("div[data-name='fbfTagging']")).css('width', percentage + '%');
        video6.currentTime = maxduration * percentage / 100;
    };

    var volumeDrag6 = false;
    $("div[data-name='volumeData']", $("div[data-name='fbfTagging']")).mousedown(function (e) {
        volumeDrag6 = true;
        volumeBar6(e.pageY)
    });
    $("div[data-name='volumeData']", $("div[data-name='fbfTagging']")).mouseup(function (e) {
        if (volumeDrag6) {
            volumeDrag6 = false;
            volumeBar6(e.pageY);
        }
    });
    $("div[data-name='volumeData']", $("div[data-name='fbfTagging']")).mousemove(function (e) {
        if (volumeDrag6) {
            volumeBar6(e.pageY);
        }
    });
    var volumeBar6 = function (y) {
        var volumeData = $("div[data-name='volumeData']", $("div[data-name='fbfTagging']"));
        var position = y - volumeData.offset().top;
        var maxHeight = volumeData.height();
        var percentage = (maxHeight - position) / maxHeight;
        if (percentage > 1) {
            percentage = 1;
        }
        if (percentage < 0.01) {
            percentage = 0;
        }
        video6.volume = percentage;
        $("div[data-name='volumeValue']", $("div[data-name='fbfTagging']")).css('height', (percentage * 100).toFixed(0) + '%');
        if (percentage == 0) {
            $("div[data-name='volumeIcon']", $("div[data-name='fbfTagging']")).css("background-image", "url(" + window.applicationRoot + "/Modules/Microsoft.ProjectOxford.Website.Demos/Images/video/Volume0.png)");
        }
        else if (percentage > 0 && percentage <= 0.33) {
            $("div[data-name='volumeIcon']", $("div[data-name='fbfTagging']")).css("background-image", "url(" + window.applicationRoot + "/Modules/Microsoft.ProjectOxford.Website.Demos/Images/video/Volume1.png)");
        }
        else if (percentage > 0.33 && percentage <= 0.66) {
            $("div[data-name='volumeIcon']", $("div[data-name='fbfTagging']")).css("background-image", "url(" + window.applicationRoot + "/Modules/Microsoft.ProjectOxford.Website.Demos/Images/video/Volume2.png)");
        }
        else {
            $("div[data-name='volumeIcon']", $("div[data-name='fbfTagging']")).css("background-image", "url(" + window.applicationRoot + "/Modules/Microsoft.ProjectOxford.Website.Demos/Images/video/Volume3.png)");
        }
    };
});
