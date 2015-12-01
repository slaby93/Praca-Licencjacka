/**
 * Created by Slaby on 01.12.2015.
 */
angular.module("cmsModule").controller("sideMenuCtrl", ["$scope", sideMenuCtrl]);

function sideMenuCtrl($scope) {
    "use strict";
    this.zakladki = [{"nazwa":"zakladka1","url":"stronka"},{"nazwa":"zakladka2","url":"stronka"}];
}