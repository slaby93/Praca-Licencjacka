/**
 * Created by Slaby on 02.12.2015.
 */

angular.module("cmsModule").controller("indexCmsCtrl", ["$scope", "$ocLazyLoad", "$rootScope", "userService", "$state", indexCmsCtrl]);

function indexCmsCtrl($scope, $ocLazyLoad, $rootScope, userService, $state) {
    "use strict";
    var user;

    // laduje inicjalizator calego AdminLte2

    $rootScope.$on("$stateChangeSuccess", function () {
        if (!userService.getUser()) {
            $state.go("login");
        }
    });

    function init() {
        userService.init(function (status) {
            console.log(status);
            // jezeli uzytkownik nie jest zalogowany to wyprowadz go do logowania
            if (status) {
                $state.go("cms");
                $scope.$evalAsync(function () {
                    initAdminLTE();
                });
                return;
            } else {
                $state.go("login");
            }
        });
    }

    init();
}