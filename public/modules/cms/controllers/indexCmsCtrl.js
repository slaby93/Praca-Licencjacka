/**
 * Created by Slaby on 02.12.2015.
 */

angular.module("cmsModule").controller("indexCmsCtrl", ["$scope", "$ocLazyLoad", "$rootScope", "userService", "$state", indexCmsCtrl]);

function indexCmsCtrl($scope, $ocLazyLoad, $rootScope, userService, $state) {
    "use strict";
    // laduje inicjalizator calego AdminLte2
    $ocLazyLoad.load('modules/cms/lib/AdminLte2/app.js');

    $rootScope.$on("$stateChangeSuccess", function () {
        if (!userService.getUser()) {
            $state.go("login");
        }
    });
}