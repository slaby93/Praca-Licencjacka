/**
 * Created by Slaby on 17.12.2015.
 */

angular.module("cmsModule").controller("userEditCtrl", ["$scope", "$uibModalInstance", "user", userEditCtrl]);

function userEditCtrl($scope, $uibModalInstance, user) {
    console.log(user);
    $scope.user = user;

    $scope.ok = function () {
        $uibModalInstance.close("PSAJDAK");
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
}