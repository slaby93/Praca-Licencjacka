"use strict";

angular.module("cmsModule").controller("registerCtrl", [
    "$scope",
    "userService",
    "testService",
    registerCtrl]);

function registerCtrl($scope, userService, testService) {


    function init() {
        clearForm();
    }

    function clearForm() {
        $scope.user = {
            "login": "",
            "password": "",
            "name": "",
            "surename": "",
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

    init();
}