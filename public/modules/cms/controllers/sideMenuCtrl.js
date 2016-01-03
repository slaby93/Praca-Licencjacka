/**
 * Created by Slaby on 01.12.2015.
 */
angular.module("cmsModule").controller("sideMenuCtrl", ["$scope", "adminTemplateService", '$state',"userService", sideMenuCtrl]);

function sideMenuCtrl($scope, adminTemplateService,$state,userService) {
    "use strict";
    /************************** DEKLARACJA ZMIENNYCH **************************/
    /**
     * @description Zmienna przypisuje ten kontroler do nazwy. Pozwala odwolywac sie w zwyklych funkcjach do zmiennych kontrolera
     * @type {sideMenuCtrl}
     */

    /************************** DEKLARACJA FUNKCJI   **************************/
    /**
     * @description Funkcja inicjalizujaca kontroler.
     */
    function init() {
        // pobieramy z bazy liste zakladek do wyswietlenia
        adminTemplateService.getCmsConfig(function (data) {
            // przypisuje liste zakladek do wyswietlenia na templatce
            $scope.tabs = data.tabList;
        });
        $scope.user = userService.getUser();
    }

    /************************** WYWOLANIE FUNKCJI    **************************/
    init();


}