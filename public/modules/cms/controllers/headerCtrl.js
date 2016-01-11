/**
 * Created by Slaby on 17.12.2015.
 */
angular.module("cmsModule").controller("headerCtrl", ["$scope", "adminTemplateService", '$state', "userService", headerCtrl]);

function headerCtrl($scope, adminTemplateService, $state, userService) {
    "use strict";
    /************************** DEKLARACJA ZMIENNYCH **************************/

    $scope.logout = function () {
        // usuwamy zapisanego uzytkownika
        userService.logout();
        // przekieruj do strony logowania
        $state.go("app");
    };
    /************************** DEKLARACJA FUNKCJI   **************************/
    /**
     * @description Funkcja inicjalizujaca kontroler.
     */
    function init() {

    }

    /************************** WYWOLANIE FUNKCJI    **************************/
    init();


}