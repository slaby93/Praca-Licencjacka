/**
 * Created by Slaby on 17.12.2015.
 */
angular.module("cmsModule").controller("headerCtrl", ["$scope", "adminTemplateService", '$state', "userService", headerCtrl]);

function headerCtrl($scope, adminTemplateService, $state, userService) {
    "use strict";

    $scope.logout = function () {
        // usuwamy zapisanego uzytkownika
        userService.logout();
        // przekieruj do strony logowania
        $state.go("app");
    };

}