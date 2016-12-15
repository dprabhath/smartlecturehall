$(window).ready(function () {
    if ($('.feature-item-content__demo').length > 0) {
        $('body').addClass('mobile-compatible');
    }
});

var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var $carousel;

var playerList = [];

function renderYoutube(data, i) {
    return '<div class="carousel-cell">'
     + '    <div class="cover" style="background-image:url(\'' + encodeURI(data.poster) + '\')">'
     + '        <button type="button" onclick="play(\'player' + i + '\', this)"><img src=\"../Modules/Microsoft.ProjectOxford.Website.Content/Images/play.png\"/></button>'
     + '        <div class="videoTitle">' + data.title + '</div>'
     + '    </div>'
     + '    <div class="btnclose" onclick="pause(\'player' + i + '\', this)"><img src=\"../Modules/Microsoft.ProjectOxford.Website.Content/Images/close.png\"/></div>'
     + '    <div id="video' + i + '"></div>'
     + '</div>'
}

function renderMp4(data, i) {
    return '<div class="carousel-cell">'
            + '<div class="cover" style="background-image:url(\'' + encodeURI(data.poster) + '\')">'
            + '<button onclick="javascript: video' + i + '.play(); $(this).parent().hide();"><img src=\"../Modules/Microsoft.ProjectOxford.Website.Content/Images/play.png\"/></button>'
            + '<div class="videoTitle">' + data.title + '</div>'
            + '</div>'
            + '<div class="btnclose" onclick="javascript: video' + i + '.pause(); $(this).siblings(\'.cover\').show();"><img src=\"../Modules/Microsoft.ProjectOxford.Website.Content/Images/close.png\"/></div>'
                + '<video id="video' + i + '">'
                + '<source src="' + data.mp4url + '" type="video/mp4">'
                + 'Your browser does not support HTML5 video.'
                + '</video>'
        + '</div>';
}

function createYoutube(data, i) {
    $('.carousel').append($(renderYoutube(data, i)));
    window['player' + i] = new YT.Player('video' + i, {
        height: '425',
        width: '100%',
        videoId: data.vurl,
        playerVars: { 'controls': 0, 'showinfo': 0 }
    });
    playerList.push(window['player' + i]);
}

function createMp4(data, i) {
    $('.carousel').append($(renderMp4(data, i)));
    playerList.push('video' + i);
}

function startRenderVideoCarousel(carouselJson) {
    for (var i = 0; i < carouselJson.length; i++) {
        if (!!carouselJson[i].vurl) {
            createYoutube(carouselJson[i], i);
        }
        else if (!!carouselJson[i].mp4url) {
            createMp4(carouselJson[i], i);
        }
    }

    $carousel = $('.carousel').flickity({ "wrapAround": true });

    $carousel.flickity("select", 1);

    $carousel.on('select.flickity', function () {
        move();
    })
}

function play(target, e) {
    if (!!e)
        $(e).parent().hide();
    if (!!window[target])
        window[target].playVideo();
}

function pause(target, e) {
    if (!!e) {
        $(e).siblings('.cover').show();
    }
    if (!!window[target] && !!window[target].pauseVideo)
        window[target].pauseVideo();
}

function move() {
    $('.cover').show();
    if (playerList.length > 0)
        for (var i in playerList) {
            if (!!playerList[i]) {
                if (!!window[playerList[i]] && !!window[playerList[i]].pause) {
                    window[playerList[i]].pause();
                }
                else if (!!playerList[i] && !!playerList[i].pauseVideo) {
                    playerList[i].pauseVideo();
                }
            }
        }
}