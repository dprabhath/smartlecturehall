/// <reference path="jquery-1.10.2.min.js" />
var page = page || {};

page.options = {
    datasize: 10,
    key: '',
    sort: 'SDK'
};
page.load = function () {

}

page.request = function (opt) {
    options = $.extend(opt);
    $.AntifogryAjax(opt, function (result) {
        page.render(result);
    });
}

page.render = function (result, renderPlatformfunc) {
    var tmpEle = $(".grid-row").first();

    tmpEle.siblings().remove();

    for (var i in result.Data) {
        page.render.datagrid(tmpEle, result.Data[i], renderPlatformfunc);
    }
    //tmpEle.remove();

    //page.render.pager(result.Count);
}

function renderelement(ele, data) {
    switch (ele[0].tagName) {
        case "DIV":
        default:
            ele.text(data);
            break;
        case "INPUT":
            ele.val(data);
            break;
        case "IMG":
            ele.attr('src', data);
            break;
        case "A":
            ele.attr('href', data);
            break;
    }
}

page.render.datagrid = function (e, l, f) {
    var ele = $(e).clone();
    for (var i in l) {
        if (Array.isArray(l[i])) {
            var targets = ele.find('[data-model="' + i + '"]');
            for (var j in l[i]) { 
                if (targets.length > 0) {
                    for (var ti = 0; ti < targets.length; ti++) {
                        var t = $(targets[ti]).clone();
                        if (t.length < 1) continue;
                        if (i == 'Platforms') {
                            renderelement(t, f(l[i][j]));
                        } else
                            if (!!l[i][j]) {
                                renderelement(t, l[i][j]);
                            }
                            else {
                                t.hide();
                            }
                        $(targets[ti]).parent().append(t);
                    } 
                }  
            }
            targets.remove(); 
        } else {
            var t = ele.find('[data-model="' + i + '"]');
            if (t.length < 1) continue;
            if (i == 'Platforms') {
                renderelement(t, f(l[i]));
            } else
                if (!!l[i]) {
                    renderelement(t, l[i]);
                }
                else {
                    t.hide();
                }
        }
    }
    $(e).parent().append(ele.removeClass("hide"));
}

page.render.pager = function (l, c) {
    $("page-list").empty();
    for (var i = 0; i < l; i++) {
        $("page-list").append($('<div class="page-index" data-page-index="' + i + '">' + i + '</div>'));
    }
}