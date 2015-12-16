"use strict";

angular.module("cmsModule").controller("registerCtrl", [
    "$scope",
    "userService",
    "testService",
    registerCtrl]);

function registerCtrl($scope, userService, testService) {
    $scope.user = {
        "login": "",
        "password": "",
        "retypedPassword": ""
    };

    function clearForm() {
        $scope.user = {
            "login": "",
            "password": "",
            "retypedPassword": ""
        };
    }

    /**
     * @description Funkcja wywolywana przy kliknieciu buttona zarejestruj.
     */
    $scope.register = function () {
        userService.register($scope.user);
        clearForm();

    };
}