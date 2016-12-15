var VideoInfo1 = JSON.parse('{"minlength":12,"length":722,"originurl":"https://channel9.msdn.com/events/Seth-on-the-Road/Codemash-2016/Amanda-Lange-on-Project-Oxford","intervals":[{"start":84.1567,"end":90.1567},{"start":97.8704,"end":103.87},{"start":220.66,"end":226.66},{"start":227.867,"end":233.867},{"start":387.193,"end":393.193}]}');
var VideoInfo2 = JSON.parse('{"minlength":30,"length":1770,"originurl":"https://channel9.msdn.com/Series/Microsoft-Research-Luminaries/Eric-Horvitz-on-the-new-era-of-Artificial-Intelligence","intervals":[{"start":17.4568,"end":23.4568},{"start":1108.65,"end":1114.65},{"start":1744.12,"end":1750.12}]}');
var VideoInfo3 = JSON.parse('{"minlength":3,"length":160,"originurl":"https://www.youtube.com/watch?v=L2oJw1a_qEM","intervals":[{"start":39.6279,"end":44.6279},{"start":66.6549,"end":71.6549},{"start":104.86,"end":109.86}]}');

var VideoInfo = VideoInfo1;
$(window).load(function () {

    BuildIntervalMark(VideoInfo);

    var video4 = $("video", $("div[data-name='Thumbnail']")).get(0);
    if (!video4) {
        return;
    }
    video4.volume = 0;
    var volumeValue4 = $("div[data-name='volumeValue']", $("div[data-name='Thumbnail']"));
    volumeValue4.css("height", video4.volume * 100 + "%");
    video4.addEventListener('playing', function () {
        $(this).show();
        $("div[data-name='ImgDiv']", $("div[data-name='Thumbnail']")).addClass("displaynone")
        $("div[data-name='loading_icon']", $("div[data-name='Thumbnail']")).addClass("displaynone")
    });
    video4.addEventListener('timeupdate', function () {
        var currentPos = video4.currentTime; //Get currenttime      
        $(".currentTime", $("div[data-name='Thumbnail']")).html(GetHMSFormat(currentPos));
        var maxduration = video4.duration; //Get video duration
        var percentage = currentPos / maxduration * 100; //in %
        $('.timeBar', $("div[data-name='Thumbnail']")).css('width', percentage + '%');

        if (percentage >= 100) {
            $("div[data-name='PlayOrPause']", $("div[data-name='Thumbnail']")).removeClass("Pause-Style");
            $("div[data-name='PlayOrPause']", $("div[data-name='Thumbnail']")).addClass("Play-Style");
            video4.pause();
            video4.currentTime = 0.3;
            $('.timeBar', $("div[data-name='Thumbnail']")).css('width', '0%');
        }
        else if (!video4.paused) {
            $("div[data-name='PlayOrPause']", $("div[data-name='Thumbnail']")).removeClass("Play-Style");
            $("div[data-name='PlayOrPause']", $("div[data-name='Thumbnail']")).addClass("Pause-Style");
        }
    });
    video4.addEventListener('loadedmetadata', function () {
        BuildIntervalMark(VideoInfo);
    });
    var timeDrag4 = false;   /* Drag status */
    $('.progressBar', $("div[data-name='Thumbnail']")).mousedown(function (e) {
        timeDrag4 = true;
        updatebar4(e.pageX);
    });
    $('.progressBar', $("div[data-name='Thumbnail']")).mouseup(function (e) {
        if (timeDrag4) {
            timeDrag4 = false;
            updatebar4(e.pageX);
        }
    });
    $('.progressBar', $("div[data-name='Thumbnail']")).mousemove(function (e) {
        if (timeDrag4) {
            updatebar4(e.pageX);
        }
    });
    //update Progress Bar control
    var updatebar4 = function (x) {
        var progress = $('.progressBar', $("div[data-name='Thumbnail']"));
        var maxduration = video4.duration; //Video duraiton
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
        $('.timeBar', $("div[data-name='Thumbnail']")).css('width', percentage + '%');
        video4.currentTime = maxduration * percentage / 100;
    };

    var volumeDrag4 = false;
    $("div[data-name='volumeData']", $("div[data-name='Thumbnail']")).mousedown(function (e) {
        volumeDrag4 = true;
        volumeBar4(e.pageY)
    });
    $("div[data-name='volumeData']", $("div[data-name='Thumbnail']")).mouseup(function (e) {
        if (volumeDrag4) {
            volumeDrag4 = false;
            volumeBar4(e.pageY);
        }
    });
    $("div[data-name='volumeData']", $("div[data-name='Thumbnail']")).mousemove(function (e) {
        if (volumeDrag4) {
            volumeBar4(e.pageY);
        }
    });
    var volumeBar4 = function (y) {
        var volumeData = $("div[data-name='volumeData']", $("div[data-name='Thumbnail']"));
        var position = y - volumeData.offset().top;
        var maxHeight = volumeData.height();
        var percentage = (maxHeight - position) / maxHeight;
        if (percentage > 1) {
            percentage = 1;
        }
        if (percentage < 0.01) {
            percentage = 0;
        }
        video4.volume = percentage;
        $("div[data-name='volumeValue']", $("div[data-name='Thumbnail']")).css('height', (percentage * 100).toFixed(0) + '%');
        if (percentage == 0) {
            $("div[data-name='volumeIcon']", $("div[data-name='Thumbnail']")).css("background-image", "url(" + window.applicationRoot + "/Modules/Microsoft.ProjectOxford.Website.Demos/Images/video/Volume0.png)");
        }
        else if (percentage > 0 && percentage <= 0.33) {
            $("div[data-name='volumeIcon']", $("div[data-name='Thumbnail']")).css("background-image", "url(" + window.applicationRoot + "/Modules/Microsoft.ProjectOxford.Website.Demos/Images/video/Volume1.png)");
        }
        else if (percentage > 0.33 && percentage <= 0.66) {
            $("div[data-name='volumeIcon']", $("div[data-name='Thumbnail']")).css("background-image", "url(" + window.applicationRoot + "/Modules/Microsoft.ProjectOxford.Website.Demos/Images/video/Volume2.png)");
        }
        else {
            $("div[data-name='volumeIcon']", $("div[data-name='Thumbnail']")).css("background-image", "url(" + window.applicationRoot + "/Modules/Microsoft.ProjectOxford.Website.Demos/Images/video/Volume3.png)");
        }
    };
});

function BuildIntervalMark(videoInfo) {
    if (videoInfo != undefined && videoInfo.intervals.length > 0) {
        var videoBar = $("div[data-name='videoBar']", $("div[data-name='Thumbnail']"));
        $("span[data-name='OriginalVideoLength']", $("div[data-name='Thumbnail']")).text(videoInfo.minlength);
        $("a[data-name='OriginalVideoUrl']", $("div[data-name='Thumbnail']")).attr("href", videoInfo.originurl);
        var left, width, innerhtml = "";
        for (var i = 0; i < videoInfo.intervals.length; i++) {
            var interval = videoInfo.intervals[i];
            left = (interval.start / videoInfo.length * 100).toFixed(3);
            width = ((interval.end - interval.start) / videoInfo.length * 100).toFixed(3);
            innerhtml += "<div style='position: absolute;top:0px;left:" + left + "%;width:" + width + "%;height:100%;background-color:#004b50;z-index:5;opacity:1;'></div>";
        }
        videoBar.html(innerhtml);
    }
}

