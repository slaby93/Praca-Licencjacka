/**
 * Created by Slaby on 02.12.2015.
 */

angular.module("cmsModule").controller("indexCmsCtrl", ["$scope", "$ocLazyLoad", "$rootScope", "userService", "$state", indexCmsCtrl]);

function indexCmsCtrl($scope, $ocLazyLoad, $rootScope, userService, $state) {
    "use strict";
    var user;

    $rootScope.$on("$stateChangeSuccess", function () {
        if (!userService.getUser()) {
            $state.go("login");
        } else {
            console.log("INICJALIZACJA CMSa");
            setTimeout(function () {
                initAdminLTE();

            }, 3000);
            //$rootScope.$evalAsync(function () {
            //});
        }
    });

    function init() {
        // jezeli nie ma usera ( bo jeszcze go nie pobrano) to przekieruj na login
        if (!userService.getUser()) {
            $state.go("login");
        } else {
            $rootScope.$evalAsync(function () {
                initAdminLTE();
            });
        }
    }

    init();
}