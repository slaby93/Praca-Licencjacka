/**
 * Created by Slaby on 02.12.2015.
 */

angular.module("cmsModule").controller("indexCmsCtrl", ["$scope", "$ocLazyLoad", "$rootScope", "userService", "$state", indexCmsCtrl]);

function indexCmsCtrl($scope, $ocLazyLoad, $rootScope, userService, $state) {
    "use strict";
    /**
     * @description Po zmianie avatara uzytkownika odswiezamy go
     */
    $scope.$on("UserImageChanged", function () {
        // dajemy czas raspberry na zapisanie zdjecia na dysku
        setTimeout(function () {
            $scope.$evalAsync(function () {
                $scope.userImage = "gallery/" + $scope.user._id + "/avatar?" + new Date().getTime();
            });
        }, 300);

    });

    function init() {
        try {
            $scope.user = userService.getUser();
            $scope.userImage = "gallery/" + $scope.user._id + "/avatar";
            $scope.fallbackImage = "gallery/default.gif";
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