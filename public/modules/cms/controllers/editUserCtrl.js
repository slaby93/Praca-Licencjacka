/**
 * Created by Slaby on 17.12.2015.
 */

angular.module("cmsModule").controller("userEditCtrl", ["$scope", "$uibModalInstance", "user", userEditCtrl]);

function userEditCtrl($scope, $uibModalInstance, user) {
    $scope.user = user;
    $scope.copiedUser = angular.copy(user);

    $scope.ok = function () {
        $uibModalInstance.close("PSAJDAK");
    };
    $scope.reset = function () {
        $scope.copiedUser = angular.copy(user);
    };
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
}