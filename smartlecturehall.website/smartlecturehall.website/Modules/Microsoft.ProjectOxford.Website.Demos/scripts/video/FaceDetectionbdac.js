$(window).load(function () {
    //Init json content of the text 
    $("pre[data-name='code']", $("div[data-name='FaceDetection']")).html("<table><tr><td>Time (sec)</td><td>Face ID</td><td>x, y</td><td>Width, Height</td></tr><tr><td>0</td><td>0</td><td>0.59, 0.23</td><td>0.09, 0.16</td></tr><tr><td>0</td><td>1</td><td>0.38, 0.15</td><td>0.07, 0.12</td></tr><tr><td>1</td><td>0</td><td>0.54, 0.25</td><td>0.09, 0.15</td></tr><tr><td>1</td><td>1</td><td>0.23, 0.18</td><td>0.07, 0.12</td></tr><tr><td>2</td><td>0</td><td>0.68, 0.23</td><td>0.08, 0.15</td></tr><tr><td>2</td><td>1</td><td>0.41, 0.15</td><td>0.07, 0.12</td></tr><tr><td>3</td><td>0</td><td>0.59, 0.25</td><td>0.08, 0.14</td></tr><tr><td>3</td><td>1</td><td>0.32, 0.17</td><td>0.07, 0.13</td></tr><tr><td>4</td><td>0</td><td>0.46, 0.20</td><td>0.08, 0.14</td></tr><tr><td>4</td><td>1</td><td>0.08, 0.14</td><td>0.08, 0.14</td></tr><tr><td>5</td><td>0</td><td>0.61, 0.21</td><td>0.08, 0.15</td></tr><tr><td>5</td><td>1</td><td>0.25, 0.15</td><td>0.07, 0.13</td></tr><tr><td>6</td><td>0</td><td>0.65, 0.22</td><td>0.08, 0.14</td></tr><tr><td>6</td><td>1</td><td>0.39, 0.15</td><td>0.08, 0.13</td></tr><tr><td>7</td><td>0</td><td>0.50, 0.20</td><td>0.08, 0.14</td></tr><tr><td>7</td><td>1</td><td>0.15, 0.14</td><td>0.07, 0.13</td></tr><tr><td>8</td><td>0</td><td>0.60, 0.21</td><td>0.08, 0.15</td></tr><tr><td>8</td><td>1</td><td>0.19, 0.16</td><td>0.08, 0.14</td></tr><tr><td>9</td><td>0</td><td>0.68, 0.19</td><td>0.08, 0.14</td></tr><tr><td>9</td><td>1</td><td>0.39, 0.13</td><td>0.08, 0.14</td></tr><tr><td>10</td><td>0</td><td>0.69, 0.27</td><td>0.08, 0.14</td></tr><tr><td>10</td><td>1</td><td>0.41, 0.19</td><td>0.08, 0.13</td></tr><tr><td>11</td><td>0</td><td>0.60, 0.22</td><td>0.08, 0.14</td></tr><tr><td>11</td><td>1</td><td>0.31, 0.20</td><td>0.07, 0.13</td></tr><tr><td>12</td><td>0</td><td>0.60, 0.26</td><td>0.07, 0.12</td></tr><tr><td>12</td><td>1</td><td>0.37, 0.20</td><td>0.07, 0.12</td></tr><tr><td>13</td><td>0</td><td>0.57, 0.28</td><td>0.07, 0.12</td></tr><tr><td>13</td><td>1</td><td>0.31, 0.23</td><td>0.06, 0.11</td></tr><tr><td>14</td><td>0</td><td>0.60, 0.26</td><td>0.06, 0.11</td></tr><tr><td>14</td><td>1</td><td>0.32, 0.23</td><td>0.06, 0.11</td></tr><tr><td>15</td><td>0</td><td>0.58, 0.29</td><td>0.07, 0.12</td></tr><tr><td>15</td><td>1</td><td>0.32, 0.28</td><td>0.06, 0.11</td></tr><tr><td>16</td><td>0</td><td>0.55, 0.33</td><td>0.07, 0.12</td></tr><tr><td>16</td><td>1</td><td>0.24, 0.24</td><td>0.06, 0.11</td></tr><tr><td>17</td><td>0</td><td>0.53, 0.38</td><td>0.07, 0.12</td></tr><tr><td>17</td><td>1</td><td>N/A</td><td>N/A</td></tr><tr><td>18</td><td>0</td><td>0.54, 0.44</td><td>0.06, 0.11</td></tr><tr><td>18</td><td>1</td><td>0.09, 0.37</td><td>0.06, 0.11</td></tr><tr><td>19</td><td>0</td><td>N/A</td><td>N/A</td></tr><tr><td>19</td><td>1</td><td>0.12, 0.38</td><td>0.06, 0.11</td></tr><tr><td>20</td><td>0</td><td>N/A</td><td>N/A</td></tr><tr><td>20</td><td>1</td><td>0.23, 0.28</td><td>0.06, 0.10</td></tr><tr><td>21</td><td>0</td><td>N/A</td><td>N/A</td></tr><tr><td>21</td><td>1</td><td>N/A</td><td>N/A</td></tr><tr><td>22</td><td>0</td><td>N/A</td><td>N/A</td></tr><tr><td>22</td><td>1</td><td>0.22, 0.27</td><td>0.04, 0.07</td></tr><tr><td>23</td><td>0</td><td>0.52, 0.36</td><td>0.07, 0.12</td></tr><tr><td>23</td><td>1</td><td>0.25, 0.30</td><td>0.06, 0.10</td></tr><tr><td>24</td><td>0</td><td>0.53, 0.37</td><td>0.07, 0.12</td></tr><tr><td>24</td><td>1</td><td>0.30, 0.36</td><td>0.06, 0.10</td></tr><tr><td>25</td><td>0</td><td>0.53, 0.35</td><td>0.07, 0.12</td></tr><tr><td>25</td><td>1</td><td>0.29, 0.27</td><td>0.06, 0.11</td></tr></table>");


    var video2 = $("video", $("div[data-name='FaceDetection']")).get(0);
    if (!video2)
    {
        return;
    }
    video2.volume = 0;
    var volumeValue2 = $("div[data-name='volumeValue']", $("div[data-name='FaceDetection']"));
    volumeValue2.css("height", video2.volume * 100 + "%");
    video2.addEventListener('playing', function () {
        $(this).show();
        $("div[data-name='ImgDiv']", $("div[data-name='FaceDetection']")).addClass("displaynone")
        $("div[data-name='loading_icon']", $("div[data-name='FaceDetection']")).addClass("displaynone")
    });
    video2.addEventListener('timeupdate', function () {
        var currentPos = video2.currentTime; //Get currenttime
        $(".currentTime", $("div[data-name='FaceDetection']")).html(GetHMSFormat(currentPos));
        var maxduration = video2.duration; //Get video duration
        var percentage = currentPos / maxduration * 100; //in %
        $('.timeBar', $("div[data-name='FaceDetection']")).css('width', percentage + '%');

        if (percentage >= 100) {
            $("div[data-name='PlayOrPause']", $("div[data-name='FaceDetection']")).removeClass("Pause-Style");
            $("div[data-name='PlayOrPause']", $("div[data-name='FaceDetection']")).addClass("Play-Style");
            video2.pause();
            video2.currentTime = 0;
            $('.timeBar', $("div[data-name='FaceDetection']")).css('width', '0%');
        }
        else if (!video2.paused) {
            $("div[data-name='PlayOrPause']", $("div[data-name='FaceDetection']")).removeClass("Play-Style");
            $("div[data-name='PlayOrPause']", $("div[data-name='FaceDetection']")).addClass("Pause-Style");
        }
    });

    var timeDrag2 = false;   /* Drag status */
    $('.progressBar', $("div[data-name='FaceDetection']")).mousedown(function (e) {
        timeDrag2 = true;
        updatebar2(e.pageX);
    });
    $('.progressBar', $("div[data-name='FaceDetection']")).mouseup(function (e) {
        if (timeDrag2) {
            timeDrag2 = false;
            updatebar2(e.pageX);
        }
    });
    $('.progressBar', $("div[data-name='FaceDetection']")).mousemove(function (e) {
        if (timeDrag2) {
            updatebar2(e.pageX);
        }
    });
    //update Progress Bar control
    var updatebar2 = function (x) {
        var progress = $('.progressBar', $("div[data-name='FaceDetection']"));
        var maxduration = video2.duration; //Video duraiton
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
        $('.timeBar', $("div[data-name='FaceDetection']")).css('width', percentage + '%');
        video2.currentTime = maxduration * percentage / 100;
    };

    var volumeDrag2 = false;
    $("div[data-name='volumeData']", $("div[data-name='FaceDetection']")).mousedown(function (e) {
        volumeDrag2 = true;
        volumeBar2(e.pageY)
    });
    $("div[data-name='volumeData']", $("div[data-name='FaceDetection']")).mouseup(function (e) {
        if (volumeDrag2) {
            volumeDrag2 = false;
            volumeBar2(e.pageY);
        }
    });
    $("div[data-name='volumeData']", $("div[data-name='FaceDetection']")).mousemove(function (e) {
        if (volumeDrag2) {
            volumeBar2(e.pageY);
        }
    });
    var volumeBar2 = function (y) {
        var volumeData = $("div[data-name='volumeData']", $("div[data-name='FaceDetection']"));
        var position = y - volumeData.offset().top;
        var maxHeight = volumeData.height();
        var percentage = (maxHeight - position) / maxHeight;
        if (percentage > 1) {
            percentage = 1;
        }
        if (percentage < 0.01) {
            percentage = 0;
        }
        video2.volume = percentage;
        $("div[data-name='volumeValue']", $("div[data-name='FaceDetection']")).css('height', (percentage * 100).toFixed(0) + '%');
        if (percentage == 0) {
            $("div[data-name='volumeIcon']", $("div[data-name='FaceDetection']")).css("background-image", "url(" + window.applicationRoot + "/Modules/Microsoft.ProjectOxford.Website.Demos/Images/video/Volume0.png)");
        }
        else if (percentage > 0 && percentage <= 0.33) {
            $("div[data-name='volumeIcon']", $("div[data-name='FaceDetection']")).css("background-image", "url(" + window.applicationRoot + "/Modules/Microsoft.ProjectOxford.Website.Demos/Images/video/Volume1.png)");
        }
        else if (percentage > 0.33 && percentage <= 0.66) {
            $("div[data-name='volumeIcon']", $("div[data-name='FaceDetection']")).css("background-image", "url(" + window.applicationRoot + "/Modules/Microsoft.ProjectOxford.Website.Demos/Images/video/Volume2.png)");
        }
        else {
            $("div[data-name='volumeIcon']", $("div[data-name='FaceDetection']")).css("background-image", "url(" + window.applicationRoot + "/Modules/Microsoft.ProjectOxford.Website.Demos/Images/video/Volume3.png)");
        }
    };
});
