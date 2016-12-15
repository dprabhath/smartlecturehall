$(function () {
    var observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
            var uvprivacy = $(mutation.target).siblings('.uv-popover-privacy').fadeOut();
        });
    });

    var observerConfig = {
        attributes: true,
        attributeFilter: ["style"],
        attributeOldValue: true
    };

    $('.uv-btn-trigger').click(function () {
        observer.disconnect();
        setTimeout(function () {
            var uv = $('.uv-popover');
            if (uv.length > 0 && !uv.hasClass('.uv-is-hidden')) {
                uv.children('.uv-popover-privacy').detach();
                uv.append('<div class="uv-popover-privacy"><p class="powered-by">Powered by <a href="http://www.uservoice.com/powered-by?uv_company_name=Microsoft%20Cognitive%20Services&amp;uv_contact_url=cognitive.uservoice.com&amp;uv_experience=contact&amp;utm_campaign=widget_poweredby&amp;utm_medium=contact&amp;utm_source=cognitive.uservoice.com" target="_blank">UserVoice</a> | <a href="https://www.uservoice.com/privacy" target="_blank">Privacy Policy</a></p></div>');
                $('.uv-popover-content').each(function (ind, self) {
                    observer.observe($(self)[0], observerConfig);
                });
            }
        }, 1000);
    });
});