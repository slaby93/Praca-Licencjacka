/**
 * Created by Slaby on 17.12.2015.
 */

angular.module("cmsModule").controller("userEditCtrl", ["$scope", "$uibModalInstance", "user", "userService", userEditCtrl]);

function userEditCtrl($scope, $uibModalInstance, user, userService) {

    //nie operujemy na pobranym uzytkowniku aby zredukowac ilosc tripow do bazy.
    $scope.copiedUser = angular.copy(user);

    /**
     * @description Funkcja wywolywana przy zatwierdzeniu edycji uzytkownika (po walidacji przez HTML).
     */
    $scope.ok = function () {
        var changes = {};
        Object.keys(user).forEach(function (key) {
            if ($scope.copiedUser[key] !== user[key]) {
                changes[key] = $scope.copiedUser[key];
            }
        });
        changes._id = user._id;
        delete changes.$$hashKey;
        console.log(changes);
        userService.editUser(changes, function () {
            $uibModalInstance.close("...");
        });
    };
    /**
     * @description Przywrocenie uzytkownika pobranego z bazy danych
     */
    $scope.reset = function () {
        $scope.copiedUser = angular.copy(user);
    };
    /**
     * @description Anulowanie edycji uzytkownika
     */
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
}