/**
 * Created by Slaby on 17.12.2015.
 */

angular.module("cmsModule").controller("userEditCtrl", ["$scope", "$uibModalInstance", "user", "userService", userEditCtrl]);

function userEditCtrl($scope, $uibModalInstance, user, userService) {

    $scope.copiedUser = angular.copy(user);

    $scope.ok = function () {
        var changes = {};
        Object.keys(user).forEach(function (key) {
            if ($scope.copiedUser[key] !== user[key]) {
                changes[key] = $scope.copiedUser[key];
            }
        });
        console.log(user);
        changes._id = user._id;
        delete changes.groups;
        delete changes.$$hashKey;
        userService.editUser(changes, function () {
            $uibModalInstance.close("PSAJDAK");
        });
    };
    $scope.reset = function () {
        $scope.copiedUser = angular.copy(user);
    };
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
}