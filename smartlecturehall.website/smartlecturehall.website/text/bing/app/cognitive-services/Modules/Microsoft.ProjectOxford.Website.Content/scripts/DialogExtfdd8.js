angular.module('projectOxfordApp', ['ui.bootstrap', 'dialogs.main', 'pascalprecht.translate', 'dialogs.default-translations'])
	.controller('salesDialog', function ($scope, $rootScope, $timeout, $translate, dialogs) {

	    //-- Variables --//

	    var _progress = 33;

	    $scope.name = '';
	    $scope.confirmed = 'No confirmation yet!';

	    $scope.custom = {
	        val: 'Initial Value'
	    };

	    //-- Listeners & Watchers --//

	    $scope.$watch('lang', function (val, old) {
	        switch (val) {
	            case 'en-US':
	                $scope.language = 'English';
	                break;
	            case 'zh-CN':
	                $scope.setLanguage(val);
	                break;
	            case 'es':
	                $scope.language = 'Spanish';
	                break;
	        }
	    });

	    //-- Methods --//

	    $scope.setLanguage = function (lang) {
	        $scope.lang = lang;
	        $translate.use(lang);
	    };

	    $scope.launch = function (which) {
	        switch (which) {
	            case 'error':
	                dialogs.error();
	                break;
	            case 'wait':
	                var dlg = dialogs.wait(undefined, undefined, _progress);
	                _fakeWaitProgress();
	                break;
	            case 'customwait':
	                var dlg = dialogs.wait('Custom Wait Header', 'Custom Wait Message', _progress);
	                _fakeWaitProgress();
	                break;
	            case 'notify':
	                dialogs.notify();
	                break;
	            case 'confirm':
	                var dlg = dialogs.confirm();
	                dlg.result.then(function (btn) {
	                    $scope.confirmed = 'You confirmed "Yes."';
	                }, function (btn) {
	                    $scope.confirmed = 'You confirmed "No."';
	                });
	                break;
	            case 'sales':
	                var dlg = dialogs.create('/cognitive-services/modules/microsoft.projectoxford.website.content/scripts/dialogs/salesdialog.html', 'salesController', $scope.custom, { size: 'lg' });
	                break;
	        }
	    }; // end launch

	    var _fakeWaitProgress = function () {
	        $timeout(function () {
	            if (_progress < 100) {
	                _progress += 33;
	                $rootScope.$broadcast('dialogs.wait.progress', { 'progress': _progress });
	                _fakeWaitProgress();
	            } else {
	                $rootScope.$broadcast('dialogs.wait.complete');
	                _progress = 0;
	            }
	        }, 1000);
	    };
	})

    .controller('salesController', function ($scope, $uibModalInstance, data) {
        $scope.mode = "filling";
        $scope.data = data;
        var uvSubdomain = "cognitive";
        var uvKey = "ndHOUchP4v8qhYUCuYZ6AQ";
        //-- Methods --//
        $scope.submit = function () {
            $scope.mode = "confirming";

            var message = "Name:\t" + $scope.data.name
                + "\nCompany Name:\t" + $scope.data.companyName
                + "\nCountry:\t" + $scope.data.address
                + "\nEmail:\t" + $scope.data.email
                + "\nApp and scenario:\t" + $scope.data.appDesc
                + "\nWhat API(s) are you interested in?\t" + $scope.data.apiName
                + "\nWhat is your expected total monthly calls of the API for each service?\t" + $scope.data.monthlyCalls
                + "\nWhat is the expected maximum simultaneous API calls per second for each service?\t" + $scope.data.callsPerSecond
                + "\nWhat was the email used to register if applicable?\t" + $scope.data.registeredEmail
                + "\nAdditional comments:\n" + $scope.data.notes;

            $.jsonp({
                url: 'https://' + uvSubdomain + '.uservoice.com/api/v1/tickets/create_via_jsonp.json?callback=?',
                data: {
                    client: uvKey,
                    ticket: {
                        message: message,
                        subject: "Contact sales",
                        custom_field_values: {
                            "Custom Widget": "sales2"
                        }
                    },
                    name: $scope.data.name,
                    email: $scope.data.email
                },
                success: function (data) {
                    // Nothing to do.
                },
                error: function (d, msg) {
                    alert("Oops, looks like something went wrong. Please send an email to oxfordsup@microsoft.com instead while we take a look.");
                }
            });
        };

        $scope.done = function () {
            $uibModalInstance.close($scope.data);
        }; // end done

        $scope.hitEnter = function (evt) {
            if (angular.equals(evt.keyCode, 13) && !(angular.equals($scope.user.name, null) || angular.equals($scope.user.name, '')))
                $scope.done();
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('canceled');
        };
    })