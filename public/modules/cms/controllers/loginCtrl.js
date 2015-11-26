"use strict";

angular.module("cmsModule").controller("loginCtrl", [
    "$scope",
    "userService",
    "testService",
    loginCtrl]);

function loginCtrl($scope, userService, testService) {

    function clearLoginForm() {
        $scope.user = {
            "login": "",
            "password": ""
        };
        $scope.formaLogowania.login.$setUntouched();
        $scope.formaLogowania.password.$setUntouched();
    }

    $scope.user = {
        "login": "",
        "password": ""
    };
    $scope.loguj = function () {
        userService.login($scope.user.login,$scope.user.password);
        clearLoginForm();

    };
    $scope.createUser = function () {

    };
}