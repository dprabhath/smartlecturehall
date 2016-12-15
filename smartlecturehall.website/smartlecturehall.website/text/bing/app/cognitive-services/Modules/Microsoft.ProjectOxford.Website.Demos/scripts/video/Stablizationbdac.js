/// <reference path="Stablization.js" />
//$().ready(function () {
$(window).load(function () {


    var video1 = $("video", $("div[data-name='Stabilization']")).get(0);
    if (!video1) {
        return;
    }
    video1.volume = 0;
    var volumeValue1 = $("div[data-name='volumeValue']", $("div[data-name='Stabilization']"));
    volumeValue1.css("height", video1.volume * 100 + "%");
    video1.addEventListener('playing', function () {
        $(this).show();
        $("div[data-name='ImgDiv']", $("div[data-name='Stabilization']")).addClass("displaynone")
        $("div[data-name='loading_icon']", $("div[data-name='Stabilization']")).addClass("displaynone")
    });
    video1.addEventListener('timeupdate', function () {
        var currentPos = video1.currentTime; //Get currenttime      
        $(".currentTime", $("div[data-name='Stabilization']")).html(GetHMSFormat(currentPos));
        var maxduration = video1.duration; //Get video duration
        var percentage = currentPos / maxduration * 100; //in %
        $('.timeBar', $("div[data-name='Stabilization']")).css('width', percentage + '%');

        if (percentage >= 100) {
            $("div[data-name='PlayOrPause']", $("div[data-name='Stabilization']")).removeClass("Pause-Style");
            $("div[data-name='PlayOrPause']", $("div[data-name='Stabilization']")).addClass("Play-Style");
            video1.pause();
            video1.currentTime = 0;
            $('.timeBar', $("div[data-name='Stabilization']")).css('width', '0%');
        }
        else if (!video1.paused) {
            $("div[data-name='PlayOrPause']", $("div[data-name='Stabilization']")).removeClass("Play-Style");
            $("div[data-name='PlayOrPause']", $("div[data-name='Stabilization']")).addClass("Pause-Style");
        }
    });

    var timeDrag1 = false;   /* Drag status */
    $('.progressBar', $("div[data-name='Stabilization']")).mousedown(function (e) {
        timeDrag1 = true;
        updatebar1(e.pageX);
    });
    $('.progressBar', $("div[data-name='Stabilization']")).mouseup(function (e) {
        if (timeDrag1) {
            timeDrag1 = false;
            updatebar1(e.pageX);
        }
    });
    $('.progressBar', $("div[data-name='Stabilization']")).mousemove(function (e) {
        if (timeDrag1) {
            updatebar1(e.pageX);
        }
    });
    //update Progress Bar control
    var updatebar1 = function (x) {
        var progress = $('.progressBar', $("div[data-name='Stabilization']"));
        var maxduration = video1.duration; //Video duraiton
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
        $('.timeBar', $("div[data-name='Stabilization']")).css('width', percentage + '%');
        video1.currentTime = maxduration * percentage / 100;
    };

    var volumeDrag1 = false;
    $("div[data-name='volumeData']", $("div[data-name='Stabilization']")).mousedown(function (e) {
        volumeDrag1 = true;
        volumeBar1(e.pageY)
    });
    $("div[data-name='volumeData']", $("div[data-name='Stabilization']")).mouseup(function (e) {
        if (volumeDrag1) {
            volumeDrag1 = false;
            volumeBar1(e.pageY);
        }
    });
    $("div[data-name='volumeData']", $("div[data-name='Stabilization']")).mousemove(function (e) {
        if (volumeDrag1) {
            volumeBar1(e.pageY);
        }
    });
    var volumeBar1 = function (y) {
        var volumeData = $("div[data-name='volumeData']", $("div[data-name='Stabilization']"));
        var position = y - volumeData.offset().top;
        var maxHeight = volumeData.height();
        var percentage = (maxHeight - position) / maxHeight;
        if (percentage > 1) {
            percentage = 1;
        }
        if (percentage < 0.01) {
            percentage = 0;
        }
        video1.volume = percentage;
        $("div[data-name='volumeValue']", $("div[data-name='Stabilization']")).css('height', (percentage * 100).toFixed(0) + '%');
        if (percentage == 0) {
            $("div[data-name='volumeIcon']", $("div[data-name='Stabilization']")).css("background-image", "url(" + window.applicationRoot + "/Modules/Microsoft.ProjectOxford.Website.Demos/Images/video/Volume0.png)");
        }
        else if (percentage > 0 && percentage <= 0.33) {
            $("div[data-name='volumeIcon']", $("div[data-name='Stabilization']")).css("background-image", "url(" + window.applicationRoot + "/Modules/Microsoft.ProjectOxford.Website.Demos/Images/video/Volume1.png)");
        }
        else if (percentage > 0.33 && percentage <= 0.66) {
            $("div[data-name='volumeIcon']", $("div[data-name='Stabilization']")).css("background-image", "url(" + window.applicationRoot + "/Modules/Microsoft.ProjectOxford.Website.Demos/Images/video/Volume2.png)");
        }
        else {
            $("div[data-name='volumeIcon']", $("div[data-name='Stabilization']")).css("background-image", "url(" + window.applicationRoot + "/Modules/Microsoft.ProjectOxford.Website.Demos/Images/video/Volume3.png)");
        }
    };

});

