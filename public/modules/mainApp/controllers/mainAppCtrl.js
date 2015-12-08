angular.module("mainApp").controller("mainAppCtrl", ["$scope","socketService", mainAppCtrl]);
/**
 * @description Glowny, najbardziej zewnetrzny kontroler. Kod z tego pliku wykona sie na kazdej podstronie.
 * @param {type} $scope
 * @returns {undefined}
 */
function mainAppCtrl($scope, socketService) {

    socketService.init();
}
