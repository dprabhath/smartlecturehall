/*
* Vision Thumbnail Demo script
*/


$(window).load(function () {
    $('#Thumbnail .smartcroppingbutton').css('display', 'block');

    window.ed_tool.centerImg($("#Thumbnail .visionImage"));
    centerThumbnailDiv();
    $(window).resize(centerThumbnailDiv);

    var initImagePath = $('#initImageUrl').val();
    var visionDemoType = $('#visionDemoType').val();
  
    // set the default image url for Thumbnail
    if (initImagePath && visionDemoType == 'Thumbnail') {
        // remove all data-selected class
        $('#Thumbnail .image-item').css('opacity', 0.5);
        $('#Thumbnail .image-item').removeAttr('data-selected');

        $('#Thumbnail input[type=text]').val(initImagePath);
        visionsdk.analyzeUrl(1);
    }
    else {
        var thumbnailDefaultImageUrl = $('#Thumbnail .image-item[data-selected="selected"] img').attr('data-large-src');
        $('#Thumbnail input[type=text]').val(thumbnailDefaultImageUrl);
        $('#Thumbnail .visionImage').attr('src', thumbnailDefaultImageUrl);
    }
  
    // Add click event for Analysisimage list
    $('#Thumbnail .image-list,#Thumbnail .mobile-image-list').find(".image-item").each(function () {
        $(this).click(function () {
            visionsdk.fatherContainer = $(this).parents("div[data-demo-type='detection']");
            $('#Thumbnail .image-item').css('opacity', 0.5);
            $('#Thumbnail .image-item').removeAttr('data-selected');
            $(this).css('opacity', 1);
            $(this).attr('data-selected', 'selected');

            var largeImageUrl = $(this).children("img").attr("data-large-src") || $(this).attr("data-large-src");
            $('#Thumbnail input[type=text]').val(largeImageUrl);
            visionsdk.analyzeUrl(1);
        });
    });  
});

// thumnbail
function renderThumbnailResult(response) {

    if (response.error!=null) {
        $('#thumbnailContainer').hide();
        $('#thumbnailContainer').parent().append('<div style="color:red" id="thumbnailErrorCode">' + response.error.message + '</div>');
        return;
    }
    var thumb0 = document.getElementById('thum0');
    var croppingSrc = 'data:image/jpeg;base64,' + response[0];
    thumb0.setAttribute('src', croppingSrc);

    var thumb1 = document.getElementById('thum1');
    croppingSrc = 'data:image/jpeg;base64,' + response[1];
    thumb1.setAttribute('src', croppingSrc);

    var thumb2 = document.getElementById('thum2');
    croppingSrc = 'data:image/jpeg;base64,' + response[2];
    thumb2.setAttribute('src', croppingSrc);


    var thumb3 = document.getElementById('thum3');
    croppingSrc = 'data:image/jpeg;base64,' + response[3];
    thumb3.setAttribute('src', croppingSrc);


    var thumb4 = document.getElementById('thum4');
    croppingSrc = 'data:image/jpeg;base64,' + response[4];
    thumb4.setAttribute('src', croppingSrc);

    var thumb5 = document.getElementById('thum5');
    croppingSrc = 'data:image/jpeg;base64,' + response[5];
    thumb5.setAttribute('src', croppingSrc);

}

function centerThumbnailDiv() {
    var $div = $("#Thumbnail .thumbnail-image-container"),
        $c = $div.parent(),
        _divW = parseFloat($div.width()),
        _divH = parseFloat($div.height()),
        _cW = parseFloat($c.width()),
        _cH = parseFloat($c.height());

    var _left = _divW - _cW >=0 ?0:(_cW - _divW) / 2,
        _top = _divH - _cH >=0 ?0:(_cH - _divH) / 2;

    $div.css({ left: _left, top: _top });
}

