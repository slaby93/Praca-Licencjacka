"use strict";

angular.module("cmsModule").controller("registerCtrl", [
    "$scope",
    "userService",
    "testService",
    "$state",
    registerCtrl]);

function registerCtrl($scope, userService, testService, $state) {


    function init() {
        clearForm();
    }

    function clearForm() {
        $scope.user = {
            "login": "",
            "password": "",
            "name": "",
            "surname": "",
            "retypedPassword": ""
        };
    }

    /**
     * @description Funkcja wywolywana przy kliknieciu buttona zarejestruj.
     */
    $scope.register = function () {
        //userService.register($scope.user,function(){
        //
        //});
        userService.register($scope.user).then(function (message) {
            swal({
                title: "Sukces",
                text: "Pomyślnie zarejestrowano użytkownika.",
                type: "success",
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Ok",
            }, function () {
                $state.go("cms");
            });
        }, function (err) {
            swal({
                title: "Błąd",
                text: "Wystąpił błąd podczas procedury rejestracji.",
                type: "warning",
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Ok",
                closeOnConfirm: true
            });
        }, function (update) {

        });
        clearForm();
    };

    init();
}