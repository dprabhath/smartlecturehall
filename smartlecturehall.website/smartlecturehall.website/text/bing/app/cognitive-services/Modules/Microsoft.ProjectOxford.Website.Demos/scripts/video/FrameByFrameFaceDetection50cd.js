$(window).load(function () {
    //Init json content of the text 
    $("pre[data-name='code']", $("div[data-name='fbfFaceDetection']")).html("<table><tr><td>Time (sec)</td><td>Face ID</td><td>x, y</td><td>Width, Height</td></tr><tr><td>0</td><td>0</td><td>0.59, 0.23</td><td>0.09, 0.16</td></tr><tr><td>0</td><td>1</td><td>0.38, 0.15</td><td>0.07, 0.12</td></tr><tr><td>1</td><td>0</td><td>0.54, 0.25</td><td>0.09, 0.15</td></tr><tr><td>1</td><td>1</td><td>0.23, 0.18</td><td>0.07, 0.12</td></tr><tr><td>2</td><td>0</td><td>0.68, 0.23</td><td>0.08, 0.15</td></tr><tr><td>2</td><td>1</td><td>0.41, 0.15</td><td>0.07, 0.12</td></tr><tr><td>3</td><td>0</td><td>0.59, 0.25</td><td>0.08, 0.14</td></tr><tr><td>3</td><td>1</td><td>0.32, 0.17</td><td>0.07, 0.13</td></tr><tr><td>4</td><td>0</td><td>0.46, 0.20</td><td>0.08, 0.14</td></tr><tr><td>4</td><td>1</td><td>0.08, 0.14</td><td>0.08, 0.14</td></tr><tr><td>5</td><td>0</td><td>0.61, 0.21</td><td>0.08, 0.15</td></tr><tr><td>5</td><td>1</td><td>0.25, 0.15</td><td>0.07, 0.13</td></tr><tr><td>6</td><td>0</td><td>0.65, 0.22</td><td>0.08, 0.14</td></tr><tr><td>6</td><td>1</td><td>0.39, 0.15</td><td>0.08, 0.13</td></tr><tr><td>7</td><td>0</td><td>0.50, 0.20</td><td>0.08, 0.14</td></tr><tr><td>7</td><td>1</td><td>0.15, 0.14</td><td>0.07, 0.13</td></tr><tr><td>8</td><td>0</td><td>0.60, 0.21</td><td>0.08, 0.15</td></tr><tr><td>8</td><td>1</td><td>0.19, 0.16</td><td>0.08, 0.14</td></tr><tr><td>9</td><td>0</td><td>0.68, 0.19</td><td>0.08, 0.14</td></tr><tr><td>9</td><td>1</td><td>0.39, 0.13</td><td>0.08, 0.14</td></tr><tr><td>10</td><td>0</td><td>0.69, 0.27</td><td>0.08, 0.14</td></tr><tr><td>10</td><td>1</td><td>0.41, 0.19</td><td>0.08, 0.13</td></tr><tr><td>11</td><td>0</td><td>0.60, 0.22</td><td>0.08, 0.14</td></tr><tr><td>11</td><td>1</td><td>0.31, 0.20</td><td>0.07, 0.13</td></tr><tr><td>12</td><td>0</td><td>0.60, 0.26</td><td>0.07, 0.12</td></tr><tr><td>12</td><td>1</td><td>0.37, 0.20</td><td>0.07, 0.12</td></tr><tr><td>13</td><td>0</td><td>0.57, 0.28</td><td>0.07, 0.12</td></tr><tr><td>13</td><td>1</td><td>0.31, 0.23</td><td>0.06, 0.11</td></tr><tr><td>14</td><td>0</td><td>0.60, 0.26</td><td>0.06, 0.11</td></tr><tr><td>14</td><td>1</td><td>0.32, 0.23</td><td>0.06, 0.11</td></tr><tr><td>15</td><td>0</td><td>0.58, 0.29</td><td>0.07, 0.12</td></tr><tr><td>15</td><td>1</td><td>0.32, 0.28</td><td>0.06, 0.11</td></tr><tr><td>16</td><td>0</td><td>0.55, 0.33</td><td>0.07, 0.12</td></tr><tr><td>16</td><td>1</td><td>0.24, 0.24</td><td>0.06, 0.11</td></tr><tr><td>17</td><td>0</td><td>0.53, 0.38</td><td>0.07, 0.12</td></tr><tr><td>17</td><td>1</td><td>N/A</td><td>N/A</td></tr><tr><td>18</td><td>0</td><td>0.54, 0.44</td><td>0.06, 0.11</td></tr><tr><td>18</td><td>1</td><td>0.09, 0.37</td><td>0.06, 0.11</td></tr><tr><td>19</td><td>0</td><td>N/A</td><td>N/A</td></tr><tr><td>19</td><td>1</td><td>0.12, 0.38</td><td>0.06, 0.11</td></tr><tr><td>20</td><td>0</td><td>N/A</td><td>N/A</td></tr><tr><td>20</td><td>1</td><td>0.23, 0.28</td><td>0.06, 0.10</td></tr><tr><td>21</td><td>0</td><td>N/A</td><td>N/A</td></tr><tr><td>21</td><td>1</td><td>N/A</td><td>N/A</td></tr><tr><td>22</td><td>0</td><td>N/A</td><td>N/A</td></tr><tr><td>22</td><td>1</td><td>0.22, 0.27</td><td>0.04, 0.07</td></tr><tr><td>23</td><td>0</td><td>0.52, 0.36</td><td>0.07, 0.12</td></tr><tr><td>23</td><td>1</td><td>0.25, 0.30</td><td>0.06, 0.10</td></tr><tr><td>24</td><td>0</td><td>0.53, 0.37</td><td>0.07, 0.12</td></tr><tr><td>24</td><td>1</td><td>0.30, 0.36</td><td>0.06, 0.10</td></tr><tr><td>25</td><td>0</td><td>0.53, 0.35</td><td>0.07, 0.12</td></tr><tr><td>25</td><td>1</td><td>0.29, 0.27</td><td>0.06, 0.11</td></tr></table>");


    var video7 = $("video", $("div[data-name='fbfFaceDetection']")).get(0);
    if (!video7)
    {
        return;
    }
    video7.volume = 0;
    var volumeValue7 = $("div[data-name='volumeValue']", $("div[data-name='fbfFaceDetection']"));
    volumeValue7.css("height", video7.volume * 100 + "%");
    video7.addEventListener('playing', function () {
        $(this).show();
        $("div[data-name='ImgDiv']", $("div[data-name='fbfFaceDetection']")).addClass("displaynone")
        $("div[data-name='loading_icon']", $("div[data-name='fbfFaceDetection']")).addClass("displaynone")
    });
    video7.addEventListener('timeupdate', function () {
        var currentPos = video7.currentTime; //Get currenttime
        $(".currentTime", $("div[data-name='fbfFaceDetection']")).html(GetHMSFormat(currentPos));
        var maxduration = video7.duration; //Get video duration
        var percentage = currentPos / maxduration * 100; //in %
        $('.timeBar', $("div[data-name='fbfFaceDetection']")).css('width', percentage + '%');

        if (percentage >= 100) {
            $("div[data-name='PlayOrPause']", $("div[data-name='fbfFaceDetection']")).removeClass("Pause-Style");
            $("div[data-name='PlayOrPause']", $("div[data-name='fbfFaceDetection']")).addClass("Play-Style");
            video7.pause();
            video7.currentTime = 0;
            $('.timeBar', $("div[data-name='fbfFaceDetection']")).css('width', '0%');
        }
        else if (!video7.paused) {
            $("div[data-name='PlayOrPause']", $("div[data-name='fbfFaceDetection']")).removeClass("Play-Style");
            $("div[data-name='PlayOrPause']", $("div[data-name='fbfFaceDetection']")).addClass("Pause-Style");
        }
    });

    var timeDrag7 = false;   /* Drag status */
    $('.progressBar', $("div[data-name='fbfFaceDetection']")).mousedown(function (e) {
        timeDrag7 = true;
        updatebar7(e.pageX);
    });
    $('.progressBar', $("div[data-name='fbfFaceDetection']")).mouseup(function (e) {
        if (timeDrag7) {
            timeDrag7 = false;
            updatebar7(e.pageX);
        }
    });
    $('.progressBar', $("div[data-name='fbfFaceDetection']")).mousemove(function (e) {
        if (timeDrag7) {
            updatebar7(e.pageX);
        }
    });
    //update Progress Bar control
    var updatebar7 = function (x) {
        var progress = $('.progressBar', $("div[data-name='fbfFaceDetection']"));
        var maxduration = video7.duration; //Video duraiton
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
        $('.timeBar', $("div[data-name='fbfFaceDetection']")).css('width', percentage + '%');
        video7.currentTime = maxduration * percentage / 100;
    };

    var volumeDrag7 = false;
    $("div[data-name='volumeData']", $("div[data-name='fbfFaceDetection']")).mousedown(function (e) {
        volumeDrag7 = true;
        volumeBar7(e.pageY)
    });
    $("div[data-name='volumeData']", $("div[data-name='fbfFaceDetection']")).mouseup(function (e) {
        if (volumeDrag7) {
            volumeDrag7 = false;
            volumeBar7(e.pageY);
        }
    });
    $("div[data-name='volumeData']", $("div[data-name='fbfFaceDetection']")).mousemove(function (e) {
        if (volumeDrag7) {
            volumeBar7(e.pageY);
        }
    });
    var volumeBar7 = function (y) {
        var volumeData = $("div[data-name='volumeData']", $("div[data-name='fbfFaceDetection']"));
        var position = y - volumeData.offset().top;
        var maxHeight = volumeData.height();
        var percentage = (maxHeight - position) / maxHeight;
        if (percentage > 1) {
            percentage = 1;
        }
        if (percentage < 0.01) {
            percentage = 0;
        }
        video7.volume = percentage;
        $("div[data-name='volumeValue']", $("div[data-name='fbfFaceDetection']")).css('height', (percentage * 100).toFixed(0) + '%');
        if (percentage == 0) {
            $("div[data-name='volumeIcon']", $("div[data-name='fbfFaceDetection']")).css("background-image", "url(" + window.applicationRoot + "/Modules/Microsoft.ProjectOxford.Website.Demos/Images/video/Volume0.png)");
        }
        else if (percentage > 0 && percentage <= 0.33) {
            $("div[data-name='volumeIcon']", $("div[data-name='fbfFaceDetection']")).css("background-image", "url(" + window.applicationRoot + "/Modules/Microsoft.ProjectOxford.Website.Demos/Images/video/Volume1.png)");
        }
        else if (percentage > 0.33 && percentage <= 0.66) {
            $("div[data-name='volumeIcon']", $("div[data-name='fbfFaceDetection']")).css("background-image", "url(" + window.applicationRoot + "/Modules/Microsoft.ProjectOxford.Website.Demos/Images/video/Volume2.png)");
        }
        else {
            $("div[data-name='volumeIcon']", $("div[data-name='fbfFaceDetection']")).css("background-image", "url(" + window.applicationRoot + "/Modules/Microsoft.ProjectOxford.Website.Demos/Images/video/Volume3.png)");
        }
    };
});
