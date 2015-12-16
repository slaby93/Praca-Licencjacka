"use strict";

angular.module("cmsModule").controller("loginCtrl", [
    "$scope",
    "userService",
    "testService",
    loginCtrl]);

function loginCtrl($scope, userService, testService) {
    /**
     * @description Dane wprowadzone w formatce logowania
     * @type {{login: string, password: string}}
     */
    $scope.user = {
        "login": "",
        "password": ""
    };

    /**
     * @description Czysci formatke logowania oraz zmienne.
     */
    function clearForm() {
        $scope.user = {
            "login": "",
            "password": ""
        };
        $scope.formaLogowania.login.$setUntouched();
        $scope.formaLogowania.password.$setUntouched();
    }

    /**
     * @description Funkcja wywolywana przy kliknieciu buttona loguj.
     */
    $scope.loguj = function () {
        userService.login($scope.user);
        clearForm();
    };
}