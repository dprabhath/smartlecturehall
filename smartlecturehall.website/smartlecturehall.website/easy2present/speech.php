
<script>
function startTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    document.getElementById('txt').innerHTML =
    h + ":" + m + ":" + s;
    var t = setTimeout(startTime, 500);
}
function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}
</script>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta charset="utf-8">
    <title>Easy2Present</title> 
	<center><H1>Easy2Present</H1>

<h2><a href="https://smartlecturehall.website/easy2present">SMART LECTURE HALL</a> </h2>

</center>





<body>
















    <link data-timestamped="true" href="../Modules/Microsoft.ProjectOxford.Website.Content/Styles/ApiDetail7c34.css?v=636141902423279305" rel="stylesheet" type="text/css">
<link data-timestamped="true" href="../Modules/Microsoft.ProjectOxford.Website.Demos/Styles/DemoBase7c34.css?v=636141902423279305" rel="stylesheet" type="text/css">
<link data-timestamped="true" href="../Modules/Microsoft.ProjectOxford.Website.Demos/Styles/Demos7c34.css?v=636141902423279305" rel="stylesheet" type="text/css">
<link data-timestamped="true" href="../Modules/Microsoft.ProjectOxford.Website.Demos/Styles/speech495f.css?v=636141902549081147" rel="stylesheet" type="text/css">
<link data-timestamped="true" href="../Modules/Microsoft.ProjectOxford.Website.Demos/Styles/TextToSpeechDemo495f.css?v=636141902549081147" rel="stylesheet" type="text/css">
<link data-timestamped="true" href="../Themes/ProjectOxford/Bootstrap/css/bootstrap.min7c34.css?v=636141902423279305" rel="stylesheet" type="text/css">
<link data-timestamped="true" href="../Themes/ProjectOxford/Bootstrap/css/bootstrap-theme.min7c34.css?v=636141902423279305" rel="stylesheet" type="text/css">
<link data-timestamped="true" href="../Themes/ProjectOxford/Styles/site.minc7c8.css?v=636141902423462979" rel="stylesheet" type="text/css">
<link data-timestamped="true" href="../Themes/ProjectOxford/Styles/main-navigationc7c8.css?v=636141902423462979" rel="stylesheet" type="text/css">
<script type="text/javascript" async="" src="../../../widget.uservoice.com/6hW5Um5EzZ19G4o8yxeEw.js"></script><script async="" src="../../../www.google-analytics.com/analytics.js"></script><script src="https://www.youtube.com/iframe_api"></script><script async="" src="https://ad.atdmt.com/m/a.js;m=11087206420460;cache=0.29220725594780483"></script><script type="text/javascript" id="www-widgetapi-script" src="https://s.ytimg.com/yts/jsbin/www-widgetapi-vfllcOhKV/www-widgetapi.js" async=""></script><script type="text/javascript" async="" src="../../../widget.uservoice.com/6hW5Um5EzZ19G4o8yxeEw.js"></script><script type="text/javascript" id="www-widgetapi-script" src="https://s.ytimg.com/yts/jsbin/www-widgetapi-vfllcOhKV/www-widgetapi.js" async=""></script><script async="" src="../../../www.google-analytics.com/analytics.js"></script><script src="https://www.youtube.com/iframe_api"></script><style type="text/css" media="screen">.uv-icon{-moz-box-sizing:border-box;-webkit-box-sizing:border-box;box-sizing:border-box;display:inline-block;cursor:pointer;position:relative;-moz-transition:all 300ms;-o-transition:all 300ms;-webkit-transition:all 300ms;transition:all 300ms;width:39px;height:39px;position:fixed;z-index:100002;opacity:0.8;-moz-transition:opacity 100ms;-o-transition:opacity 100ms;-webkit-transition:opacity 100ms;transition:opacity 100ms}.uv-icon.uv-bottom-right{bottom:10px;right:12px}.uv-icon.uv-top-right{top:10px;right:12px}.uv-icon.uv-bottom-left{bottom:10px;left:12px}.uv-icon.uv-top-left{top:10px;left:12px}.uv-icon.uv-is-selected{opacity:1}.uv-icon svg{width:39px;height:39px}.uv-popover{font-family:sans-serif;font-weight:100;font-size:13px;color:black;position:fixed;z-index:100001}.uv-popover-content{-moz-border-radius:5px;-webkit-border-radius:5px;border-radius:5px;background:white;position:relative;width:325px;height:325px;-moz-transition:background 200ms;-o-transition:background 200ms;-webkit-transition:background 200ms;transition:background 200ms}.uv-bottom .uv-popover-content{-moz-box-shadow:rgba(0,0,0,0.3) 0 -10px 60px,rgba(0,0,0,0.1) 0 0 20px;-webkit-box-shadow:rgba(0,0,0,0.3) 0 -10px 60px,rgba(0,0,0,0.1) 0 0 20px;box-shadow:rgba(0,0,0,0.3) 0 -10px 60px,rgba(0,0,0,0.1) 0 0 20px}.uv-top .uv-popover-content{-moz-box-shadow:rgba(0,0,0,0.3) 0 10px 60px,rgba(0,0,0,0.1) 0 0 20px;-webkit-box-shadow:rgba(0,0,0,0.3) 0 10px 60px,rgba(0,0,0,0.1) 0 0 20px;box-shadow:rgba(0,0,0,0.3) 0 10px 60px,rgba(0,0,0,0.1) 0 0 20px}.uv-left .uv-popover-content{-moz-box-shadow:rgba(0,0,0,0.3) 10px 0 60px,rgba(0,0,0,0.1) 0 0 20px;-webkit-box-shadow:rgba(0,0,0,0.3) 10px 0 60px,rgba(0,0,0,0.1) 0 0 20px;box-shadow:rgba(0,0,0,0.3) 10px 0 60px,rgba(0,0,0,0.1) 0 0 20px}.uv-right .uv-popover-content{-moz-box-shadow:rgba(0,0,0,0.3) -10px 0 60px,rgba(0,0,0,0.1) 0 0 20px;-webkit-box-shadow:rgba(0,0,0,0.3) -10px 0 60px,rgba(0,0,0,0.1) 0 0 20px;box-shadow:rgba(0,0,0,0.3) -10px 0 60px,rgba(0,0,0,0.1) 0 0 20px}.uv-ie8 .uv-popover-content{position:relative}.uv-ie8 .uv-popover-content .uv-popover-content-shadow{display:block;background:black;content:'';position:absolute;left:-15px;top:-15px;width:100%;height:100%;filter:progid:DXImageTransform.Microsoft.Blur(PixelRadius=15,MakeShadow=true,ShadowOpacity=0.30);z-index:-1}.uv-popover-tail{border:9px solid transparent;width:0;z-index:10;position:absolute;-moz-transition:border-top-color 200ms;-o-transition:border-top-color 200ms;-webkit-transition:border-top-color 200ms;transition:border-top-color 200ms}.uv-top .uv-popover-tail{bottom:-20px;border-top:11px solid white}.uv-bottom .uv-popover-tail{top:-20px;border-bottom:11px solid white}.uv-left .uv-popover-tail{right:-20px;border-left:11px solid white}.uv-right .uv-popover-tail{left:-20px;border-right:11px solid white}.uv-popover-loading{background:white;-moz-border-radius:5px;-webkit-border-radius:5px;border-radius:5px;position:absolute;width:100%;height:100%;left:0;top:0}.uv-popover-loading-text{position:absolute;top:50%;margin-top:-0.5em;width:100%;text-align:center}.uv-popover-iframe-container{height:100%}.uv-popover-iframe{-moz-border-radius:5px;-webkit-border-radius:5px;border-radius:5px;overflow:hidden}.uv-is-hidden{display:none}.uv-is-invisible{display:block !important;visibility:hidden !important}.uv-is-transitioning{display:block !important}.uv-no-transition{-moz-transition:none !important;-webkit-transition:none !important;-o-transition:color 0 ease-in !important;transition:none !important}.uv-fade{opacity:1;-moz-transition:opacity 200ms ease-out;-o-transition:opacity 200ms ease-out;-webkit-transition:opacity 200ms ease-out;transition:opacity 200ms ease-out}.uv-fade.uv-is-hidden{opacity:0}.uv-scale-top,.uv-scale-top-left,.uv-scale-top-right,.uv-scale-bottom,.uv-scale-bottom-left,.uv-scale-bottom-right,.uv-scale-right,.uv-scale-right-top,.uv-scale-right-bottom,.uv-scale-left,.uv-scale-left-top,.uv-scale-left-bottom,.uv-slide-top,.uv-slide-bottom,.uv-slide-left,.uv-slide-right{opacity:1;-moz-transition:all 80ms ease-out;-o-transition:all 80ms ease-out;-webkit-transition:all 80ms ease-out;transition:all 80ms ease-out}.uv-scale-top.uv-is-hidden{opacity:0;-moz-transform:scale(0.8) translateY(-15%);-ms-transform:scale(0.8) translateY(-15%);-webkit-transform:scale(0.8) translateY(-15%);transform:scale(0.8) translateY(-15%)}.uv-scale-top-left.uv-is-hidden{opacity:0;-moz-transform:scale(0.8) translateY(-15%) translateX(-10%);-ms-transform:scale(0.8) translateY(-15%) translateX(-10%);-webkit-transform:scale(0.8) translateY(-15%) translateX(-10%);transform:scale(0.8) translateY(-15%) translateX(-10%)}.uv-scale-top-right.uv-is-hidden{opacity:0;-moz-transform:scale(0.8) translateY(-15%) translateX(10%);-ms-transform:scale(0.8) translateY(-15%) translateX(10%);-webkit-transform:scale(0.8) translateY(-15%) translateX(10%);transform:scale(0.8) translateY(-15%) translateX(10%)}.uv-scale-bottom.uv-is-hidden{opacity:0;-moz-transform:scale(0.8) translateY(15%);-ms-transform:scale(0.8) translateY(15%);-webkit-transform:scale(0.8) translateY(15%);transform:scale(0.8) translateY(15%)}.uv-scale-bottom-left.uv-is-hidden{opacity:0;-moz-transform:scale(0.8) translateY(15%) translateX(-10%);-ms-transform:scale(0.8) translateY(15%) translateX(-10%);-webkit-transform:scale(0.8) translateY(15%) translateX(-10%);transform:scale(0.8) translateY(15%) translateX(-10%)}.uv-scale-bottom-right.uv-is-hidden{opacity:0;-moz-transform:scale(0.8) translateY(15%) translateX(10%);-ms-transform:scale(0.8) translateY(15%) translateX(10%);-webkit-transform:scale(0.8) translateY(15%) translateX(10%);transform:scale(0.8) translateY(15%) translateX(10%)}.uv-scale-right.uv-is-hidden{opacity:0;-moz-transform:scale(0.8) translateX(15%);-ms-transform:scale(0.8) translateX(15%);-webkit-transform:scale(0.8) translateX(15%);transform:scale(0.8) translateX(15%)}.uv-scale-right-top.uv-is-hidden{opacity:0;-moz-transform:scale(0.8) translateX(15%) translateY(-10%);-ms-transform:scale(0.8) translateX(15%) translateY(-10%);-webkit-transform:scale(0.8) translateX(15%) translateY(-10%);transform:scale(0.8) translateX(15%) translateY(-10%)}.uv-scale-right-bottom.uv-is-hidden{opacity:0;-moz-transform:scale(0.8) translateX(15%) translateY(10%);-ms-transform:scale(0.8) translateX(15%) translateY(10%);-webkit-transform:scale(0.8) translateX(15%) translateY(10%);transform:scale(0.8) translateX(15%) translateY(10%)}.uv-scale-left.uv-is-hidden{opacity:0;-moz-transform:scale(0.8) translateX(-15%);-ms-transform:scale(0.8) translateX(-15%);-webkit-transform:scale(0.8) translateX(-15%);transform:scale(0.8) translateX(-15%)}.uv-scale-left-top.uv-is-hidden{opacity:0;-moz-transform:scale(0.8) translateX(-15%) translateY(-10%);-ms-transform:scale(0.8) translateX(-15%) translateY(-10%);-webkit-transform:scale(0.8) translateX(-15%) translateY(-10%);transform:scale(0.8) translateX(-15%) translateY(-10%)}.uv-scale-left-bottom.uv-is-hidden{opacity:0;-moz-transform:scale(0.8) translateX(-15%) translateY(10%);-ms-transform:scale(0.8) translateX(-15%) translateY(10%);-webkit-transform:scale(0.8) translateX(-15%) translateY(10%);transform:scale(0.8) translateX(-15%) translateY(10%)}.uv-slide-top.uv-is-hidden{-moz-transform:translateY(-100%);-ms-transform:translateY(-100%);-webkit-transform:translateY(-100%);transform:translateY(-100%)}.uv-slide-bottom.uv-is-hidden{-moz-transform:translateY(100%);-ms-transform:translateY(100%);-webkit-transform:translateY(100%);transform:translateY(100%)}.uv-slide-left.uv-is-hidden{-moz-transform:translateX(-100%);-ms-transform:translateX(-100%);-webkit-transform:translateX(-100%);transform:translateX(-100%)}.uv-slide-right.uv-is-hidden{-moz-transform:translateX(100%);-ms-transform:translateX(100%);-webkit-transform:translateX(100%);transform:translateX(100%)}
</style><script async="" src="https://ad.atdmt.com/m/a.js;m=11087206420460;cache=0.748057453222535"></script><script src="../Modules/Orchard.jQuery/scripts/jquery-1.11.1.min.js" type="text/javascript"></script>
<script data-timestamped="true" src="../Modules/Orchard.jQuery/Scripts/jquery.cookie.minfb61.js?v=636141902424695845" type="text/javascript"></script>
<script data-timestamped="true" src="../Themes/ProjectOxford/Bootstrap/js/bootstrap.min3832.js?v=636141902425175830" type="text/javascript"></script>
<script data-timestamped="true" src="../Themes/ProjectOxford/Scripts/angular.minec96.js?v=636141902425310581" type="text/javascript"></script>
<script data-timestamped="true" src="../Themes/ProjectOxford/Scripts/angular-contenteditableec96.js?v=636141902425310581" type="text/javascript"></script>
<script data-timestamped="true" src="../Themes/ProjectOxford/Scripts/appec96.js?v=636141902425310581" type="text/javascript"></script>
<script data-timestamped="true" src="../Themes/ProjectOxford/Scripts/siteec96.js?v=636141902425310581" type="text/javascript"></script>
<!--[if lt IE 9]>
<script src="/cognitive-services/Core/Shapes/scripts/html5.js" type="text/javascript"></script>
<![endif]-->
<meta content="Orchard" name="generator">
<meta content="Convert audio to text, understand intent, and convert text back to speech for natural responsiveness." name="description">
<meta content="Microsoft,cognitive services,project oxford,API,SDK,free,Azure,speech api,speech to text, speak text,text to speech,text to talk,text to audio,read text,text speaker,voice interface,speech recognition,natural language processing" name="keywords">
<meta content="IE=edge,chrome=1" https-equiv="X-UA-Compatible">
<meta content="width=device-width" name="viewport">
<link href="https://www.microsoft.com/cognitive-services/modules/orchard.themes/Content/orchard.ico" rel="shortcut icon" type="image/x-icon">
    <script type="text/javascript">
        var antiForgeryToken = 'HCmIJsBiySCyNj4dD1MBLG_ppz1yeOMDghLO1KLw5nVmeLV4-qJUpZegX7-kT5hUHggpKp04b40jGhz19Iiaacd6-LNhWZN9DjzT7Q8kq7Y1';
        var applicationRoot = '/cognitive-services';
        if(applicationRoot=='https://www.microsoft.com/')
        {
            applicationRoot = '';
        }

    </script>

    <script type="text/javascript">
        var antiForgeryToken = '6VXnamzONydwsJQEYBnwDNLG1Xwz6RvRXqOei_rkYijVQxMZcUb9UQ0HymIt51rVBWz8tTx7RTSJvycqC0Rrj3dLOtD2wemG-FebxwiiVhY1';
        var applicationRoot = '/cognitive-services';
        if (applicationRoot == 'https://www.microsoft.com/') {
            applicationRoot = '';
        }

    </script>

    <script src="../../../cdn.optimizely.com/js/6213472562.js"></script>
    <script>
        var e = document.createElement("script");
        e.async = true;
        e.src = "https://ad.atdmt.com/m/a.js;m=11087206420460;cache=" + Math.random();
        var s = document.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(e, s);
    </script>
    <noscript>
        &amp;lt;iframe style="display:none;"
                src="https://ad.atdmt.com/m/a.html;m=11087206420460;noscript=1"&amp;gt;&amp;lt;/iframe&amp;gt;
    </noscript>


    <script>(function(d){d.className="dyn"+d.className.substring(6,d.className.length);})(document.documentElement);</script> 
    <script>window.isRTL = false;</script>
<style type="text/css" media="screen">.uv-icon{-moz-box-sizing:border-box;-webkit-box-sizing:border-box;box-sizing:border-box;display:inline-block;cursor:pointer;position:relative;-moz-transition:all 300ms;-o-transition:all 300ms;-webkit-transition:all 300ms;transition:all 300ms;width:39px;height:39px;position:fixed;z-index:100002;opacity:0.8;-moz-transition:opacity 100ms;-o-transition:opacity 100ms;-webkit-transition:opacity 100ms;transition:opacity 100ms}.uv-icon.uv-bottom-right{bottom:10px;right:12px}.uv-icon.uv-top-right{top:10px;right:12px}.uv-icon.uv-bottom-left{bottom:10px;left:12px}.uv-icon.uv-top-left{top:10px;left:12px}.uv-icon.uv-is-selected{opacity:1}.uv-icon svg{width:39px;height:39px}.uv-popover{font-family:sans-serif;font-weight:100;font-size:13px;color:black;position:fixed;z-index:100001}.uv-popover-content{-moz-border-radius:5px;-webkit-border-radius:5px;border-radius:5px;background:white;position:relative;width:325px;height:325px;-moz-transition:background 200ms;-o-transition:background 200ms;-webkit-transition:background 200ms;transition:background 200ms}.uv-bottom .uv-popover-content{-moz-box-shadow:rgba(0,0,0,0.3) 0 -10px 60px,rgba(0,0,0,0.1) 0 0 20px;-webkit-box-shadow:rgba(0,0,0,0.3) 0 -10px 60px,rgba(0,0,0,0.1) 0 0 20px;box-shadow:rgba(0,0,0,0.3) 0 -10px 60px,rgba(0,0,0,0.1) 0 0 20px}.uv-top .uv-popover-content{-moz-box-shadow:rgba(0,0,0,0.3) 0 10px 60px,rgba(0,0,0,0.1) 0 0 20px;-webkit-box-shadow:rgba(0,0,0,0.3) 0 10px 60px,rgba(0,0,0,0.1) 0 0 20px;box-shadow:rgba(0,0,0,0.3) 0 10px 60px,rgba(0,0,0,0.1) 0 0 20px}.uv-left .uv-popover-content{-moz-box-shadow:rgba(0,0,0,0.3) 10px 0 60px,rgba(0,0,0,0.1) 0 0 20px;-webkit-box-shadow:rgba(0,0,0,0.3) 10px 0 60px,rgba(0,0,0,0.1) 0 0 20px;box-shadow:rgba(0,0,0,0.3) 10px 0 60px,rgba(0,0,0,0.1) 0 0 20px}.uv-right .uv-popover-content{-moz-box-shadow:rgba(0,0,0,0.3) -10px 0 60px,rgba(0,0,0,0.1) 0 0 20px;-webkit-box-shadow:rgba(0,0,0,0.3) -10px 0 60px,rgba(0,0,0,0.1) 0 0 20px;box-shadow:rgba(0,0,0,0.3) -10px 0 60px,rgba(0,0,0,0.1) 0 0 20px}.uv-ie8 .uv-popover-content{position:relative}.uv-ie8 .uv-popover-content .uv-popover-content-shadow{display:block;background:black;content:'';position:absolute;left:-15px;top:-15px;width:100%;height:100%;filter:progid:DXImageTransform.Microsoft.Blur(PixelRadius=15,MakeShadow=true,ShadowOpacity=0.30);z-index:-1}.uv-popover-tail{border:9px solid transparent;width:0;z-index:10;position:absolute;-moz-transition:border-top-color 200ms;-o-transition:border-top-color 200ms;-webkit-transition:border-top-color 200ms;transition:border-top-color 200ms}.uv-top .uv-popover-tail{bottom:-20px;border-top:11px solid white}.uv-bottom .uv-popover-tail{top:-20px;border-bottom:11px solid white}.uv-left .uv-popover-tail{right:-20px;border-left:11px solid white}.uv-right .uv-popover-tail{left:-20px;border-right:11px solid white}.uv-popover-loading{background:white;-moz-border-radius:5px;-webkit-border-radius:5px;border-radius:5px;position:absolute;width:100%;height:100%;left:0;top:0}.uv-popover-loading-text{position:absolute;top:50%;margin-top:-0.5em;width:100%;text-align:center}.uv-popover-iframe-container{height:100%}.uv-popover-iframe{-moz-border-radius:5px;-webkit-border-radius:5px;border-radius:5px;overflow:hidden}.uv-is-hidden{display:none}.uv-is-invisible{display:block !important;visibility:hidden !important}.uv-is-transitioning{display:block !important}.uv-no-transition{-moz-transition:none !important;-webkit-transition:none !important;-o-transition:color 0 ease-in !important;transition:none !important}.uv-fade{opacity:1;-moz-transition:opacity 200ms ease-out;-o-transition:opacity 200ms ease-out;-webkit-transition:opacity 200ms ease-out;transition:opacity 200ms ease-out}.uv-fade.uv-is-hidden{opacity:0}.uv-scale-top,.uv-scale-top-left,.uv-scale-top-right,.uv-scale-bottom,.uv-scale-bottom-left,.uv-scale-bottom-right,.uv-scale-right,.uv-scale-right-top,.uv-scale-right-bottom,.uv-scale-left,.uv-scale-left-top,.uv-scale-left-bottom,.uv-slide-top,.uv-slide-bottom,.uv-slide-left,.uv-slide-right{opacity:1;-moz-transition:all 80ms ease-out;-o-transition:all 80ms ease-out;-webkit-transition:all 80ms ease-out;transition:all 80ms ease-out}.uv-scale-top.uv-is-hidden{opacity:0;-moz-transform:scale(0.8) translateY(-15%);-ms-transform:scale(0.8) translateY(-15%);-webkit-transform:scale(0.8) translateY(-15%);transform:scale(0.8) translateY(-15%)}.uv-scale-top-left.uv-is-hidden{opacity:0;-moz-transform:scale(0.8) translateY(-15%) translateX(-10%);-ms-transform:scale(0.8) translateY(-15%) translateX(-10%);-webkit-transform:scale(0.8) translateY(-15%) translateX(-10%);transform:scale(0.8) translateY(-15%) translateX(-10%)}.uv-scale-top-right.uv-is-hidden{opacity:0;-moz-transform:scale(0.8) translateY(-15%) translateX(10%);-ms-transform:scale(0.8) translateY(-15%) translateX(10%);-webkit-transform:scale(0.8) translateY(-15%) translateX(10%);transform:scale(0.8) translateY(-15%) translateX(10%)}.uv-scale-bottom.uv-is-hidden{opacity:0;-moz-transform:scale(0.8) translateY(15%);-ms-transform:scale(0.8) translateY(15%);-webkit-transform:scale(0.8) translateY(15%);transform:scale(0.8) translateY(15%)}.uv-scale-bottom-left.uv-is-hidden{opacity:0;-moz-transform:scale(0.8) translateY(15%) translateX(-10%);-ms-transform:scale(0.8) translateY(15%) translateX(-10%);-webkit-transform:scale(0.8) translateY(15%) translateX(-10%);transform:scale(0.8) translateY(15%) translateX(-10%)}.uv-scale-bottom-right.uv-is-hidden{opacity:0;-moz-transform:scale(0.8) translateY(15%) translateX(10%);-ms-transform:scale(0.8) translateY(15%) translateX(10%);-webkit-transform:scale(0.8) translateY(15%) translateX(10%);transform:scale(0.8) translateY(15%) translateX(10%)}.uv-scale-right.uv-is-hidden{opacity:0;-moz-transform:scale(0.8) translateX(15%);-ms-transform:scale(0.8) translateX(15%);-webkit-transform:scale(0.8) translateX(15%);transform:scale(0.8) translateX(15%)}.uv-scale-right-top.uv-is-hidden{opacity:0;-moz-transform:scale(0.8) translateX(15%) translateY(-10%);-ms-transform:scale(0.8) translateX(15%) translateY(-10%);-webkit-transform:scale(0.8) translateX(15%) translateY(-10%);transform:scale(0.8) translateX(15%) translateY(-10%)}.uv-scale-right-bottom.uv-is-hidden{opacity:0;-moz-transform:scale(0.8) translateX(15%) translateY(10%);-ms-transform:scale(0.8) translateX(15%) translateY(10%);-webkit-transform:scale(0.8) translateX(15%) translateY(10%);transform:scale(0.8) translateX(15%) translateY(10%)}.uv-scale-left.uv-is-hidden{opacity:0;-moz-transform:scale(0.8) translateX(-15%);-ms-transform:scale(0.8) translateX(-15%);-webkit-transform:scale(0.8) translateX(-15%);transform:scale(0.8) translateX(-15%)}.uv-scale-left-top.uv-is-hidden{opacity:0;-moz-transform:scale(0.8) translateX(-15%) translateY(-10%);-ms-transform:scale(0.8) translateX(-15%) translateY(-10%);-webkit-transform:scale(0.8) translateX(-15%) translateY(-10%);transform:scale(0.8) translateX(-15%) translateY(-10%)}.uv-scale-left-bottom.uv-is-hidden{opacity:0;-moz-transform:scale(0.8) translateX(-15%) translateY(10%);-ms-transform:scale(0.8) translateX(-15%) translateY(10%);-webkit-transform:scale(0.8) translateX(-15%) translateY(10%);transform:scale(0.8) translateX(-15%) translateY(10%)}.uv-slide-top.uv-is-hidden{-moz-transform:translateY(-100%);-ms-transform:translateY(-100%);-webkit-transform:translateY(-100%);transform:translateY(-100%)}.uv-slide-bottom.uv-is-hidden{-moz-transform:translateY(100%);-ms-transform:translateY(100%);-webkit-transform:translateY(100%);transform:translateY(100%)}.uv-slide-left.uv-is-hidden{-moz-transform:translateX(-100%);-ms-transform:translateX(-100%);-webkit-transform:translateX(-100%);transform:translateX(-100%)}.uv-slide-right.uv-is-hidden{-moz-transform:translateX(100%);-ms-transform:translateX(100%);-webkit-transform:translateX(100%);transform:translateX(100%)}
</style><style type="text/css" media="print">#uvTab,.uv-tray,.uv-icon,.uv-popover,.uv-bubble{display:none!important}</style><script type="text/javascript" charset="utf-8" src="https://www.bing.com/widget/metrics.js"></script><script type="text/javascript" charset="utf-8" src="https://ssl.microsofttranslator.com/ajax/v3/community.aspx?fmt=js&amp;loc=en&amp;siteData=ueOIGRSKkd965FeEGM5JtQ**"></script><style type="text/css" media="screen">.uv-icon{-moz-box-sizing:border-box;-webkit-box-sizing:border-box;box-sizing:border-box;display:inline-block;cursor:pointer;position:relative;-moz-transition:all 300ms;-o-transition:all 300ms;-webkit-transition:all 300ms;transition:all 300ms;width:39px;height:39px;position:fixed;z-index:100002;opacity:0.8;-moz-transition:opacity 100ms;-o-transition:opacity 100ms;-webkit-transition:opacity 100ms;transition:opacity 100ms}.uv-icon.uv-bottom-right{bottom:10px;right:12px}.uv-icon.uv-top-right{top:10px;right:12px}.uv-icon.uv-bottom-left{bottom:10px;left:12px}.uv-icon.uv-top-left{top:10px;left:12px}.uv-icon.uv-is-selected{opacity:1}.uv-icon svg{width:39px;height:39px}.uv-popover{font-family:sans-serif;font-weight:100;font-size:13px;color:black;position:fixed;z-index:100001}.uv-popover-content{-moz-border-radius:5px;-webkit-border-radius:5px;border-radius:5px;background:white;position:relative;width:325px;height:325px;-moz-transition:background 200ms;-o-transition:background 200ms;-webkit-transition:background 200ms;transition:background 200ms}.uv-bottom .uv-popover-content{-moz-box-shadow:rgba(0,0,0,0.3) 0 -10px 60px,rgba(0,0,0,0.1) 0 0 20px;-webkit-box-shadow:rgba(0,0,0,0.3) 0 -10px 60px,rgba(0,0,0,0.1) 0 0 20px;box-shadow:rgba(0,0,0,0.3) 0 -10px 60px,rgba(0,0,0,0.1) 0 0 20px}.uv-top .uv-popover-content{-moz-box-shadow:rgba(0,0,0,0.3) 0 10px 60px,rgba(0,0,0,0.1) 0 0 20px;-webkit-box-shadow:rgba(0,0,0,0.3) 0 10px 60px,rgba(0,0,0,0.1) 0 0 20px;box-shadow:rgba(0,0,0,0.3) 0 10px 60px,rgba(0,0,0,0.1) 0 0 20px}.uv-left .uv-popover-content{-moz-box-shadow:rgba(0,0,0,0.3) 10px 0 60px,rgba(0,0,0,0.1) 0 0 20px;-webkit-box-shadow:rgba(0,0,0,0.3) 10px 0 60px,rgba(0,0,0,0.1) 0 0 20px;box-shadow:rgba(0,0,0,0.3) 10px 0 60px,rgba(0,0,0,0.1) 0 0 20px}.uv-right .uv-popover-content{-moz-box-shadow:rgba(0,0,0,0.3) -10px 0 60px,rgba(0,0,0,0.1) 0 0 20px;-webkit-box-shadow:rgba(0,0,0,0.3) -10px 0 60px,rgba(0,0,0,0.1) 0 0 20px;box-shadow:rgba(0,0,0,0.3) -10px 0 60px,rgba(0,0,0,0.1) 0 0 20px}.uv-ie8 .uv-popover-content{position:relative}.uv-ie8 .uv-popover-content .uv-popover-content-shadow{display:block;background:black;content:'';position:absolute;left:-15px;top:-15px;width:100%;height:100%;filter:progid:DXImageTransform.Microsoft.Blur(PixelRadius=15,MakeShadow=true,ShadowOpacity=0.30);z-index:-1}.uv-popover-tail{border:9px solid transparent;width:0;z-index:10;position:absolute;-moz-transition:border-top-color 200ms;-o-transition:border-top-color 200ms;-webkit-transition:border-top-color 200ms;transition:border-top-color 200ms}.uv-top .uv-popover-tail{bottom:-20px;border-top:11px solid white}.uv-bottom .uv-popover-tail{top:-20px;border-bottom:11px solid white}.uv-left .uv-popover-tail{right:-20px;border-left:11px solid white}.uv-right .uv-popover-tail{left:-20px;border-right:11px solid white}.uv-popover-loading{background:white;-moz-border-radius:5px;-webkit-border-radius:5px;border-radius:5px;position:absolute;width:100%;height:100%;left:0;top:0}.uv-popover-loading-text{position:absolute;top:50%;margin-top:-0.5em;width:100%;text-align:center}.uv-popover-iframe-container{height:100%}.uv-popover-iframe{-moz-border-radius:5px;-webkit-border-radius:5px;border-radius:5px;overflow:hidden}.uv-is-hidden{display:none}.uv-is-invisible{display:block !important;visibility:hidden !important}.uv-is-transitioning{display:block !important}.uv-no-transition{-moz-transition:none !important;-webkit-transition:none !important;-o-transition:color 0 ease-in !important;transition:none !important}.uv-fade{opacity:1;-moz-transition:opacity 200ms ease-out;-o-transition:opacity 200ms ease-out;-webkit-transition:opacity 200ms ease-out;transition:opacity 200ms ease-out}.uv-fade.uv-is-hidden{opacity:0}.uv-scale-top,.uv-scale-top-left,.uv-scale-top-right,.uv-scale-bottom,.uv-scale-bottom-left,.uv-scale-bottom-right,.uv-scale-right,.uv-scale-right-top,.uv-scale-right-bottom,.uv-scale-left,.uv-scale-left-top,.uv-scale-left-bottom,.uv-slide-top,.uv-slide-bottom,.uv-slide-left,.uv-slide-right{opacity:1;-moz-transition:all 80ms ease-out;-o-transition:all 80ms ease-out;-webkit-transition:all 80ms ease-out;transition:all 80ms ease-out}.uv-scale-top.uv-is-hidden{opacity:0;-moz-transform:scale(0.8) translateY(-15%);-ms-transform:scale(0.8) translateY(-15%);-webkit-transform:scale(0.8) translateY(-15%);transform:scale(0.8) translateY(-15%)}.uv-scale-top-left.uv-is-hidden{opacity:0;-moz-transform:scale(0.8) translateY(-15%) translateX(-10%);-ms-transform:scale(0.8) translateY(-15%) translateX(-10%);-webkit-transform:scale(0.8) translateY(-15%) translateX(-10%);transform:scale(0.8) translateY(-15%) translateX(-10%)}.uv-scale-top-right.uv-is-hidden{opacity:0;-moz-transform:scale(0.8) translateY(-15%) translateX(10%);-ms-transform:scale(0.8) translateY(-15%) translateX(10%);-webkit-transform:scale(0.8) translateY(-15%) translateX(10%);transform:scale(0.8) translateY(-15%) translateX(10%)}.uv-scale-bottom.uv-is-hidden{opacity:0;-moz-transform:scale(0.8) translateY(15%);-ms-transform:scale(0.8) translateY(15%);-webkit-transform:scale(0.8) translateY(15%);transform:scale(0.8) translateY(15%)}.uv-scale-bottom-left.uv-is-hidden{opacity:0;-moz-transform:scale(0.8) translateY(15%) translateX(-10%);-ms-transform:scale(0.8) translateY(15%) translateX(-10%);-webkit-transform:scale(0.8) translateY(15%) translateX(-10%);transform:scale(0.8) translateY(15%) translateX(-10%)}.uv-scale-bottom-right.uv-is-hidden{opacity:0;-moz-transform:scale(0.8) translateY(15%) translateX(10%);-ms-transform:scale(0.8) translateY(15%) translateX(10%);-webkit-transform:scale(0.8) translateY(15%) translateX(10%);transform:scale(0.8) translateY(15%) translateX(10%)}.uv-scale-right.uv-is-hidden{opacity:0;-moz-transform:scale(0.8) translateX(15%);-ms-transform:scale(0.8) translateX(15%);-webkit-transform:scale(0.8) translateX(15%);transform:scale(0.8) translateX(15%)}.uv-scale-right-top.uv-is-hidden{opacity:0;-moz-transform:scale(0.8) translateX(15%) translateY(-10%);-ms-transform:scale(0.8) translateX(15%) translateY(-10%);-webkit-transform:scale(0.8) translateX(15%) translateY(-10%);transform:scale(0.8) translateX(15%) translateY(-10%)}.uv-scale-right-bottom.uv-is-hidden{opacity:0;-moz-transform:scale(0.8) translateX(15%) translateY(10%);-ms-transform:scale(0.8) translateX(15%) translateY(10%);-webkit-transform:scale(0.8) translateX(15%) translateY(10%);transform:scale(0.8) translateX(15%) translateY(10%)}.uv-scale-left.uv-is-hidden{opacity:0;-moz-transform:scale(0.8) translateX(-15%);-ms-transform:scale(0.8) translateX(-15%);-webkit-transform:scale(0.8) translateX(-15%);transform:scale(0.8) translateX(-15%)}.uv-scale-left-top.uv-is-hidden{opacity:0;-moz-transform:scale(0.8) translateX(-15%) translateY(-10%);-ms-transform:scale(0.8) translateX(-15%) translateY(-10%);-webkit-transform:scale(0.8) translateX(-15%) translateY(-10%);transform:scale(0.8) translateX(-15%) translateY(-10%)}.uv-scale-left-bottom.uv-is-hidden{opacity:0;-moz-transform:scale(0.8) translateX(-15%) translateY(10%);-ms-transform:scale(0.8) translateX(-15%) translateY(10%);-webkit-transform:scale(0.8) translateX(-15%) translateY(10%);transform:scale(0.8) translateX(-15%) translateY(10%)}.uv-slide-top.uv-is-hidden{-moz-transform:translateY(-100%);-ms-transform:translateY(-100%);-webkit-transform:translateY(-100%);transform:translateY(-100%)}.uv-slide-bottom.uv-is-hidden{-moz-transform:translateY(100%);-ms-transform:translateY(100%);-webkit-transform:translateY(100%);transform:translateY(100%)}.uv-slide-left.uv-is-hidden{-moz-transform:translateX(-100%);-ms-transform:translateX(-100%);-webkit-transform:translateX(-100%);transform:translateX(-100%)}.uv-slide-right.uv-is-hidden{-moz-transform:translateX(100%);-ms-transform:translateX(100%);-webkit-transform:translateX(100%);transform:translateX(100%)}
</style><script type="text/javascript" charset="utf-8" src="https://www.bing.com/widget/metrics.js"></script><script type="text/javascript" charset="utf-8" src="https://ssl.microsofttranslator.com/ajax/v3/community.aspx?fmt=js&amp;loc=en&amp;siteData=ueOIGRSKkd965FeEGM5JtQ**"></script></head> 
<body class="mobile-compatible"><div id="MicrosoftTranslatorCommunity" style="display: none;"></div>

    <link rel="stylesheet" href="../../../maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">


<div ng-app="projectOxfordApp" class="ng-scope">
    <div id="layout-wrapper">
        
            
        <div id="layout-main-container" role="main">
        <div id="layout-main">
            <div id="layout-content">
                
                    <div id="content" class="clearfix">
                        <div class="page-content-container">
                            <div class="zone zone-content">
<article class="api-detail-page content-item">
    <header>
        
    </header>
    
<link rel="stylesheet" href="../../../npmcdn.com/flickity%402.0.5/dist/flickity.min.css">

<!--hero area-->


<!--resources cta bar-->
<div class="api-detail-cta-bar row">
    
</div>

<!--features with demos-->
        <div class="feature-item-container row">
                    <div class="feature-item-content container">
                                <div class="feature-item-content__details text--centered">
                                        

                                        
                                </div>


                            <div class="feature-item-content__demo col-xs-12">
                                

<div>
    <div class="demoArea reCaptcha-demo reCaptcha-Speech2Text-demo" style="position: relative;">
        <p class="warnInfo">
            
        </p>
        <div class="firstRow">
            <div class="select-parent sel_wrap text--semilight" style="visibility: hidden">
                <select id="languageoptions">
                    <option value="zh-CN">Chinese - CN</option>
                    <option value="en-GB">English - GB</option>
                    <option value="en-US" selected="selected">English - US</option>
                    <option value="fr-FR">French - FR</option>
                    <option value="de-DE">German - DE</option>
                    <option value="it-IT">Italian - IT</option>
                    <option value="es-ES">Spanish - ES</option>
                </select>
            </div>
            <div><button class="mic demo_btn demo_btn_circle demo_btn_mic"></button></div>
<center>

    
    
    <?php
      $service = $_POST["service"];
$url = $_POST['url'];

echo "<iframe align='center' src='$url' width='1026px' height='500px' frameborder='0'> </iframe>";
?>
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    

</center>


            <!-- <div id="microphoneText">
                






            </div> -->

<style>
            .textarea
            {
                font-family:    Arial, Helvetica, sans-serif;
                font-size:      30px;
                font-weight:    bold;
                maxlength="5";
            }

body {
        font-family: 'Lato', Calibri, Arial, sans-serif;
	color: #000000;
	background: #E96D65;
	font-weight: 300;
	overflow-x: hidden;

}
        </style>
        </div>
        <div class="textarea" id="messages"></div>

        <div class="buttonArea">
            
            
        </div>
    <div class="maskLayer">  <div class="googleReCaptcha-normal googleReCaptcha"> </div></div><div style="clear:both"></div><div class="maskLayer">  <div class="googleReCaptcha-normal googleReCaptcha"> </div></div><div style="clear:both"></div></div>
    <div id="hidden">
        <audio preload="auto" autobuffer="" controls="" src="https://www.microsoft.com/cognitive-services/Modules/Microsoft.ProjectOxford.Website.Demos/Audios/en-us-1.mp3" class="sample sample1" data-index="1"></audio>
        <audio preload="auto" autobuffer="" controls="" src="https://www.microsoft.com/cognitive-services/Modules/Microsoft.ProjectOxford.Website.Demos/Audios/en-us-2.mp3" class="sample sample2" data-index="2"></audio>
    </div>
    <br>
</div>

                            </div>
                    </div>

        </div>
        
        




    
    




    
    


</article></div>
                        </div>
                    </div>
            </div>
        </div>
    </div>
        <footer id="layout-footer">
            <div class="zone zone-footer">
<div id="translatorwidget_tmp" translate="no" style="display:none;">
    <div class="row">
        <div class="col-md-3 text-right translate-widget">
            <img class="text--xs" src="../Themes/ProjectOxford/Images/footer/translate-icon.jpg">
            <span class="text--xs text--white translated">
                Translated to
            </span>
            <a href="javascript:showtransbox();" class="translateresult text--xs text--black" style="text-decoration:underline !important;">English</a>
            <span class="text--xs" id="dropdonwicon">
                <i class="glyphicon glyphicon-menu-down" style="font-size: 12px;"></i>
            </span>
        </div>
        <div class="col-md-3 translated-by">
            <span style="color:white;" class="text--xs">by</span>
            <span class="text--black text--xs">
                <a href="https://www.microsoft.com/translator" target="_blank">Microsoft Translator</a>
            </span>
        </div>
        <div class="col-md-6 show-original">
            <div class="close">×</div>
            <button class="text--xs" id="showOrigin" type="button" onclick="tranlateto('en','English')">Show original</button>
        </div>
    </div>
</div>
<div id="translator_box" translate="no" tabindex="1"><a href='javascript:tranlateto("af","Afrikaans");'>Afrikaans</a><a href='javascript:tranlateto("ar","???????");'>???????</a><a href='javascript:tranlateto("bs-Latn","Bosanski (latinica)");'>Bosanski (latinica)</a><a href='javascript:tranlateto("bg","?????????");'>?????????</a><a href='javascript:tranlateto("ca","Català");'>Català</a><a href='javascript:tranlateto("zh-CHS","????");'>????</a><a href='javascript:tranlateto("zh-CHT","????");'>????</a><a href='javascript:tranlateto("yue","Cantonese (Traditional)");'>Cantonese (Traditional)</a><a href='javascript:tranlateto("hr","Hrvatski");'>Hrvatski</a><a href='javascript:tranlateto("cs","Ceština");'>Ceština</a><a href='javascript:tranlateto("da","Dansk");'>Dansk</a><a href='javascript:tranlateto("nl","Nederlands");'>Nederlands</a><a href='javascript:tranlateto("en","English");'>English</a><a href='javascript:tranlateto("et","Eesti");'>Eesti</a><a href='javascript:tranlateto("fj","Fijian");'>Fijian</a><a href='javascript:tranlateto("fil","Filipino");'>Filipino</a><a href='javascript:tranlateto("fi","Suomi");'>Suomi</a><a href='javascript:tranlateto("fr","Français");'>Français</a><a href='javascript:tranlateto("de","Deutsch");'>Deutsch</a><a href='javascript:tranlateto("el","????????");'>????????</a><a href='javascript:tranlateto("ht","Haitian Creole");'>Haitian Creole</a><a href='javascript:tranlateto("he","?????");'>?????</a><a href='javascript:tranlateto("hi","?????");'>?????</a><a href='javascript:tranlateto("mww","Hmong Daw");'>Hmong Daw</a><a href='javascript:tranlateto("hu","Magyar");'>Magyar</a><a href='javascript:tranlateto("id","Indonesia");'>Indonesia</a><a href='javascript:tranlateto("it","Italiano");'>Italiano</a><a href='javascript:tranlateto("ja","???");'>???</a><a href='javascript:tranlateto("sw","Kiswahili");'>Kiswahili</a><a href='javascript:tranlateto("tlh","Klingon");'>Klingon</a><a href='javascript:tranlateto("ko","???");'>???</a><a href='javascript:tranlateto("lv","Latviešu");'>Latviešu</a><a href='javascript:tranlateto("lt","Lietuviu");'>Lietuviu</a><a href='javascript:tranlateto("mg","Malagasy");'>Malagasy</a><a href='javascript:tranlateto("ms","Melayu");'>Melayu</a><a href='javascript:tranlateto("mt","Il-Malti");'>Il-Malti</a><a href='javascript:tranlateto("yua","Yucatec Maya");'>Yucatec Maya</a><a href='javascript:tranlateto("no","Norsk");'>Norsk</a><a href='javascript:tranlateto("otq","Querétaro Otomi");'>Querétaro Otomi</a><a href='javascript:tranlateto("fa","Persian");'>Persian</a><a href='javascript:tranlateto("pl","Polski");'>Polski</a><a href='javascript:tranlateto("pt","Português");'>Português</a><a href='javascript:tranlateto("ro","Româna");'>Româna</a><a href='javascript:tranlateto("ru","???????");'>???????</a><a href='javascript:tranlateto("sm","Samoan");'>Samoan</a><a href='javascript:tranlateto("sr-Cyrl","Srpski (cirilica)");'>Srpski (cirilica)</a><a href='javascript:tranlateto("sr-Latn","Srpski (latinica)");'>Srpski (latinica)</a><a href='javascript:tranlateto("sk","Slovencina");'>Slovencina</a><a href='javascript:tranlateto("sl","Slovenšcina");'>Slovenšcina</a><a href='javascript:tranlateto("es","Español");'>Español</a><a href='javascript:tranlateto("sv","Svenska");'>Svenska</a><a href='javascript:tranlateto("ty","Tahitian");'>Tahitian</a><a href='javascript:tranlateto("th","???");'>???</a><a href='javascript:tranlateto("to","Tongan");'>Tongan</a><a href='javascript:tranlateto("tr","Türkçe");'>Türkçe</a><a href='javascript:tranlateto("uk","??????????");'>??????????</a><a href='javascript:tranlateto("ur","????");'>????</a><a href='javascript:tranlateto("vi","Tiê´ng Viê?t");'>Tiê´ng Viê?t</a><a href='javascript:tranlateto("cy","Welsh");'>Welsh</a></div>


</div>
        </footer>
    </div>
</div>

<script data-timestamped="true" src="../Modules/Microsoft.ProjectOxford.Website.Content/scripts/flickity.pkgd489f.js?v=636141902458904552" type="text/javascript"></script>
<script data-timestamped="true" src="../Modules/Microsoft.ProjectOxford.Website.Content/scripts/ApiDetailPart489f.js?v=636141902458904552" type="text/javascript"></script>
<script src="../Modules/Microsoft.ProjectOxford.Website.Demos/scripts/jqueryToken.js" type="text/javascript"></script>
<script data-timestamped="true" src="../Modules/Microsoft.ProjectOxford.Website.Demos/scripts/extension489f.js?v=636141902458904552" type="text/javascript"></script>
<script data-timestamped="true" src="../Modules/Microsoft.ProjectOxford.Website.Demos/scripts/Demosf1f6.js?v=636141902459066948" type="text/javascript"></script>
<script data-timestamped="true" src="../Modules/Microsoft.ProjectOxford.Website.Demos/scripts/speech/recorder4830.js?v=636141902549237136" type="text/javascript"></script>
<script data-timestamped="true" src="../Modules/Microsoft.ProjectOxford.Website.Demos/scripts/speech/main4830.js?v=636141902549237136" type="text/javascript"></script>
<script data-timestamped="true" src="../Modules/Microsoft.ProjectOxford.Website.Demos/scripts/speech/ws4830.js?v=636141902549237136" type="text/javascript"></script>
<script data-timestamped="true" src="../Modules/Microsoft.ProjectOxford.Website.Demos/scripts/speech/index4830.js?v=636141902549237136" type="text/javascript"></script>
<script data-timestamped="true" src="../Modules/Microsoft.ProjectOxford.Website.Demos/scripts/Recaptchaf1f6.js?v=636141902459066948" type="text/javascript"></script>
<script data-timestamped="true" src="../Themes/ProjectOxford/scripts/headroomf1f6.js?v=636141902459066948" type="text/javascript"></script>
<script data-timestamped="true" src="../Themes/ProjectOxford/scripts/jquery.headroomf1f6.js?v=636141902459066948" type="text/javascript"></script>
<script data-timestamped="true" src="../Themes/ProjectOxford/scripts/navf1f6.js?v=636141902459066948" type="text/javascript"></script>
    <script type="text/JavaScript">
        var varAutoFirePV = 1;
        var varClickTracking = 1;
        var varCustomerTracking = 1;
        if ("en-us" == "zh-cn") {
            var Route = "62584";
        }
        else {
            var Route = "20049";
        }
        var Ctrl = " ";
        document.write("<script type='text/javascript' src='" + (window.location.protocol) + "//c.microsoft.com/ms.js'" + "'><\/script>");
        // code for google analytics.
        (function (i, s, o, g, r, a, m) {
            i['GoogleAnalyticsObject'] = r; i[r] = i[r] || function () {
                (i[r].q = i[r].q || []).push(arguments)
            }, i[r].l = 1 * new Date(); a = s.createElement(o),
            m = s.getElementsByTagName(o)[0]; a.async = 1; a.src = g; m.parentNode.insertBefore(a, m)
        })(window, document, 'script', '../../../www.google-analytics.com/analytics.js', 'ga');

        var trackOutboundLink = function (url) {
            ga('send', 'event', 'outbound', 'click', url);
        }

        if ("en-us" == "zh-cn") {
            ga('create', 'UA-72171728-3', 'auto');
        }
        else {
            ga('create', 'UA-72171728-1', 'auto');
        }

        // Optimizely Universal Analytics Integration
        window.optimizely = window.optimizely || [];
        window.optimizely.push("activateUniversalAnalytics");
        // End Optimizely Code

        ga('require', 'linkid');
        ga('send', 'pageview');
    </script><script type="text/javascript" src="file://c.microsoft.com/ms.js" '=""></script><script type="text/javascript" src="file://c.microsoft.com/ms.js" '=""></script>

    <script src="https://www.microsofttranslator.com/ajax/v3/WidgetV3.ashx?siteData=ueOIGRSKkd965FeEGM5JtQ**" type="text/javascript"></script>
    <script type="text/javascript">
        // Include the UserVoice JavaScript SDK (only needed once on a page)
        UserVoice = window.UserVoice || [];
        (function () {
            var uv = document.createElement('script');
            uv.type = 'text/javascript';
            uv.async = true;
            uv.src = '../../../widget.uservoice.com/6hW5Um5EzZ19G4o8yxeEw.js';
            var s = document.getElementsByTagName('script')[0];
            s.parentNode.insertBefore(uv, s)
        })();

        UserVoice.push(['set', {
            // Options can also be set on specific widgets instead of globally
            target: 'self', // 'none' for toaster popups, #id for a specific element on the page
            accent_color: '#004b50', // Widget accent color
            locale: 'en', // Defaults to your account’s localization
        }]);

        UserVoice.push(['addTrigger', '#general-inquiry-link', {
            mode: 'contact',
            position: 'top',
            // Customize widget text
            // (see documentation for all options)
            strings: {
                // Contact form
                contact_title: 'General inquiry',
                contact_message_placeholder: 'Give feedback or ask for help',
                contact_skip_instant_answers_button: 'Skip and send message',
                contact_details_title: 'Additional details',
                contact_submit_button: 'Send message',
                contact_success_title: 'Message sent!',
                contact_success_body: 'We’ll be in touch.'
            }
        }]);

        UserVoice.push(['addTrigger', '#report-abuse-link', {
            mode: 'contact',
            ticket_custom_fields: {
                'Custom Widget': 'Abuse'
            },

            // Customize widget text
            // (see documentation for all options)
            strings: {
                // Contact form
                contact_title: 'Report abuse',
                contact_message_placeholder: 'Whats going on?',
                contact_skip_instant_answers_button: 'Skip and send message',
                contact_details_title: 'Additional details',
                contact_submit_button: 'Send message',
                contact_success_title: 'Message sent!',
                contact_success_body: 'We’ll be in touch.'
            }
        }]);

        function fillList(listOfLanguages) {
            var ddlLangs = document.getElementById('langs');
            var box = document.getElementById("translator_box");
            for (var key in listOfLanguages) {
                $(ddlLangs).append('<li value="' + listOfLanguages[key].Code + '">' + listOfLanguages[key].Name + '</li>');
                $(box).append("<a href='javascript:tranlateto(\"" + listOfLanguages[key].Code + "\",\"" + listOfLanguages[key].Name + "\");'>" + listOfLanguages[key].Name + "</a>");
            }
        }

        var isfirst = true;

        var layoutHeader = $("#layout-header").outerHeight();

        function getlayoutheaderheight() {
            if (window.innerWidth < 768) {
                return 0;
            }
            return $("#layout-header").css('display') !== 'none' ? layoutHeader : 0;
        }


        function tranlateto(lang, text) {
            $("#dropdonwicon").removeClass('select');

            $('#translator_box').hide();

            if ('en' === lang) {
                $('#showOrigin').hide();
            }
            else {
                $('#showOrigin').show();
            }

            if (isfirst) {
                $("#layout-wrapper").prepend($("#translatorwidget_tmp").clone().prop('id', 'translatorwidget').show());
                isfirst = false;
            } else {
                $("#translatorwidget").show();
            }

            var consValue = $("#translatorwidget").outerHeight();

            var moveHeight = $('#translatorwidget').length > 0 ? ($("#translatorwidget").css('display') !== 'none' ? consValue : 0) : 0;

            if (window.scrollY >= 350) {
                $("#layout-header").hide();
            }

            $("#layout-header").css("margin-top", moveHeight);
            $("#layout-navigation").css("margin-top", consValue + getlayoutheaderheight());
            $(".hero-banner-container").css('margin-top', consValue + getlayoutheaderheight() + $("#layout-navigation").outerHeight() - 48);

            Microsoft.Translator.Widget.Translate('en', lang,
                function (value) {

                },
                function (err) {
                    tranlateto(lang, text);
                },
                function (result) {
                    $("#translatorwidget").attr('dir', 'ltr');
                },
                function (revert) {

                }, 30000);

            $(".translateresult").text(text);

        }

        function showtransbox() {
            $('#translator_box').toggle();
            $("#dropdonwicon").addClass('select');
            $("#translator_box").focus();
        }

        function showcontainer() {
            $(".transwidgetcontainer").show().focus();
        }

        $(document).ready(function () {
            fillList(Microsoft.Translator.Widget.GetLanguagesForTranslateLocalized());

            $("#langs").on('click', 'li', function (e) {
                e.stopPropagation(); $(".transwidgetcontainer").hide();
                tranlateto($(this).attr('value'), $(this).text());
            });

            $(".transwidgetcontainer").blur(function () {
                $(this).hide();
            });

            $("#translator_box").blur(function () {
                setTimeout(function () {
                    $("#translator_box").hide();
                    $("#dropdonwicon").removeClass('select');
                }, 200);
            });
            $("#layout-wrapper").on('click', '.close', function () {
                tranlateto('en', 'English');
                $("#translatorwidget").hide();
                $('#translator_box').hide();
                if (window.scrollY >= 350) {
                    $("#layout-header").hide();
                    $("#layout-navigation").css("margin-top", "0px");
                }
                else {
                    $("#layout-header").css("margin-top", "0px");
                    $("#layout-navigation").css("margin-top", $("#layout-header").outerHeight());
                    $(".dropdown-menu").css("top", "150px");
                }
                $(".hero-banner-container").css('margin-top', getlayoutheaderheight() + $("#layout-navigation").outerHeight() - 48);

            });
        });
    </script>
</body>


