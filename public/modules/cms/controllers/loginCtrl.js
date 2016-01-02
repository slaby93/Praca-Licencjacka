"use strict";

angular.module("cmsModule").controller("loginCtrl", [
    "$scope",
    "userService",
    "testService",
    "$state",
    "localStorageService",
    loginCtrl]);

function loginCtrl($scope, userService, testService, $state, localStorageService) {
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
        var token = localStorageService.get("token");
        if (token) {
            userService.loginByToken(token).then(
                // SUCCESS
                function (message) {
                    $state.go("cms");
                    // ERROR
                }, function (message) {
                    console.log(message.data);
                    // usuwamy niepoprawny token
                    localStorageService.remove("token");
                    // MESSAGE
                }, function (message) {
                    console.log(message);
                });
        } else {
            console.log("Token is empty!");
        }
    }

    init();
}