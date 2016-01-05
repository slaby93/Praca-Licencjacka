/**
 * Created by Slaby on 02.12.2015.
 */

angular.module("cmsModule").controller("indexCmsCtrl", ["$scope", "$ocLazyLoad", "$rootScope", "userService", "$state", indexCmsCtrl]);

function indexCmsCtrl($scope, $ocLazyLoad, $rootScope, userService, $state) {
    "use strict";

    $scope.$on("UserImageChaned",function(){
        $scope.userImage = "gallery/"+$scope.user._id+"/avatar?" + new Date().getTime();
    });
    function init() {
        try {
            $scope.user = userService.getUser();
            $scope.userImage = "gallery/"+$scope.user._id+"/avatar";
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