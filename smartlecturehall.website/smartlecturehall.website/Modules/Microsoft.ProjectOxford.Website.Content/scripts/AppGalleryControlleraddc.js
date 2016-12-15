projectOxfordApp.controller('appGalleryController', [
    '$scope', '$log', function ($scope, $log) {
        $scope.viewType = "List";

        $scope.submitMyApp = function () {
            var body = "For better presentation, Please provide these information about your APP. Thanks!%0D%0A%0D%0A" +
            "Name:%0D%0A" +
            "Description:%0D%0A" +
            "APP Link:%0D%0A" +
            "Publisher:%0D%0A" +
            "Platform:%0D%0A" +
            "API Used:%0D%0A" +
            "Developer Email:%0D%0A" +
            "Icon(280px*280px .PNG):%0D%0A" +
            "ScreenShot(.PNG):%0D%0A";
            var link = "mailto:oxfordsignup@microsoft.com?subject=Apps Recruiting&body=" + body;

            window.location.href = link;
        }

        $scope.sortApps = function (apps) {
            if (apps != null && apps.length > 0) {
                var containerDiv = $(apps[0]).parents("div.appdetail-item-div")[0].parentNode;
                $(containerDiv).empty();
                for (var i = 0 ; i <= apps.length - 1; i++) {
                    $(containerDiv).append($(apps[i]).parents("div.appdetail-item-div")[0]);
                }
            }
        }

        $scope.appGalleryOrderbyClick = function (type, val) {
            $scope.appGalleryOrderby = val;

            if (type == "Most popular") {
                var apps = $("input.appdetail-list-rank");
                if (apps != null && apps.length > 0) {
                    apps.each(function () { if (this.value == "") this.value = 100; })
                    apps.sort(function (a, b) { return b.value - a.value; });
                    $scope.sortApps(apps);
                }

                apps = $("input.appdetail-gallery-rank");
                if (apps != null && apps.length > 0) {
                    apps.each(function () { if (this.value == "") this.value = 100; })
                    apps.sort(function (a, b) { return b.value - a.value; });
                    $scope.sortApps(apps);
                }
            }
            else {
                var apps = $("input.appdetail-list-datepublished");
                if (apps != null && apps.length > 0) {
                    apps.sort(function (a, b) { return new Date(b.value).getTime() - new Date(a.value).getTime(); });
                    $scope.sortApps(apps);
                }

                apps = $("input.appdetail-gallery-datepublished");
                if (apps != null && apps.length > 0) {
                    apps.sort(function (a, b) { return new Date(b.value).getTime() - new Date(a.value).getTime(); });
                    $scope.sortApps(apps);
                }
            }
        }

        $scope.appGalleryViewClick = function (control, viewtype) {
            $(".appgallery-view-item-selected").removeClass("appgallery-view-item-selected");
            $(control).addClass("appgallery-view-item-selected");
            $scope.viewType = viewtype;
        }
    }]);

