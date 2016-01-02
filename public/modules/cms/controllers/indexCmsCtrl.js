/**
 * Created by Slaby on 02.12.2015.
 */

angular.module("cmsModule").controller("indexCmsCtrl", ["$scope", "$ocLazyLoad", "$rootScope", "userService", "$state", indexCmsCtrl]);

function indexCmsCtrl($scope, $ocLazyLoad, $rootScope, userService, $state) {
    "use strict";


    function init() {
        try {
            $scope.user = userService.getUser();
            $rootScope.$evalAsync(function () {
                initAdminLTE();
            });
        } catch (e) {
            console.log("Error in indexCmsCtrl");
            console.error(e);
        }
    }

    init();
}