/**
 * Created by Slaby on 17.12.2015.
 */

angular.module("cmsModule").controller("userEditCtrl", ["$scope", "$uibModalInstance", "user", "userService", userEditCtrl]);

function userEditCtrl($scope, $uibModalInstance, user, userService) {

    $scope.copiedUser = angular.copy(user);
    $scope.copiedUser.groups = convertGruops(user.groups);

    function convertGruops(groups) {
        var temp = {};
        groups.forEach(function (key) {
            temp[key] = true;
        });
        console.log(temp);
        return temp;
    }

    function converToArray(map) {
        var temp = [];
        Object.keys(map).forEach(function (key) {
            if (map[key] === true) {
                temp.push(key);
            }
        });
        return temp;
    }

    $scope.ok = function () {
        var changes = {};
        Object.keys(user).forEach(function (key) {
            if ($scope.copiedUser[key] !== user[key]) {
                changes[key] = $scope.copiedUser[key];
            }
        });
        changes._id = user._id;
        changes.groups = converToArray(changes.groups);
        delete changes.$$hashKey;
        console.log(changes);
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