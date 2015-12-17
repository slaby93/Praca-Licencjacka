"use strict";

angular.module("cmsModule").controller("loginCtrl", [
    "$scope",
    "userService",
    "testService",
    "$state",
    loginCtrl]);

function loginCtrl($scope, userService, testService, $state) {
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

    /**
     * @description Funkcja inicjalizujaca i ew. przekierowujaca do cms, gdy uzytkownik jest juz zalogowany.
     */
    function init() {
        $scope.user = {
            "login": "",
            "password": ""
        };
        userService.init(function (status) {
            if (status) {
                $state.go("cms");
            }
        });
    }

    init();
}