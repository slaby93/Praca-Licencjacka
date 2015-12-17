/**
 * Created by Slaby on 02.12.2015.
 */

angular.module("cmsModule").controller("indexCmsCtrl", ["$scope", "$ocLazyLoad", "$rootScope", "userService", "$state", indexCmsCtrl]);

function indexCmsCtrl($scope, $ocLazyLoad, $rootScope, userService, $state) {
    "use strict";
    var user;

    // laduje inicjalizator calego AdminLte2
    $ocLazyLoad.load('modules/cms/lib/AdminLte2/app.js');

    $rootScope.$on("$stateChangeSuccess", function () {
        if (!userService.getUser()) {
            $state.go("login");
        }
    });

    function init() {
        user = userService.getUser();
            // jezeli uzytkownik nie jest zalogowany to wyprowadz go do logowania

        if (!user) {
            $state.go("login");
        }
    }
    init();
}