/**
 * Created by Slaby on 17.12.2015.
 */
angular.module("cmsModule").controller("headerCtrl", ["$scope", "adminTemplateService", '$state', "userService", headerCtrl]);

function headerCtrl($scope, adminTemplateService, $state, userService) {
    "use strict";
    /************************** DEKLARACJA ZMIENNYCH **************************/
    /**
     * @description Zmienna przypisuje ten kontroler do nazwy. Pozwala odwolywac sie w zwyklych funkcjach do zmiennych kontrolera
     * @type {sideMenuCtrl}
     */

    $scope.logout = function () {
        // usuwamy zapisanego uzytkownika
        userService.logout();
        // przekieruj do strony logowania
        $state.go("login");
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