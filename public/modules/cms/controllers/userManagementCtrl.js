/**
 * Created by Slaby on 17.12.2015.
 */
/**
 * Created by Slaby on 01.12.2015.
 */
angular.module("cmsModule").controller("userManagementCtrl", ["$scope", "adminTemplateService", '$state', "userService", "$uibModal", userManagementCtrl]);

function userManagementCtrl($scope, adminTemplateService, $state, userService, $uibModal) {

    $scope.open = function (user) {
        var modalInstance = $uibModal.open(
            {
                templateUrl: 'modules/cms/views/userEditView.html',
                controller: 'userEditCtrl',
                backdrop: "static",
                resolve: {
                    "user": function () {
                        return user;
                    }
                }
            }
        );

        modalInstance.result.then(function (fromModalOnExit) {
            getAllUsers();
        }, function () {

        });
    };

    $scope.remove = function (user) {
        swal({
                title: "Usuwanie użytkownika " + user.login,
                text: "Uwaga, jest to operacja nieodwracalna!",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Tak, usuń użytkownika",
                closeOnConfirm: false
            }, function () {
                userService.removeUser(user, function () {
                    getAllUsers();
                    swal("", "Usunięto", "success")

                });
            }
        );
    };

    function getAllUsers() {
        userService.fetchAllUsers().then(function (data) {

            // usuwam siebie (zalogowanego uzytkownika)
            for (var i = 0; i < data.length; i++) {
                if (data[i]._id === $scope.user._id) {
                    data.splice(i, 1);
                    break;
                }
            }

            $scope.$evalAsync(function () {
                $scope.allUsers = data;
            });
        }, function (msg) {
            console.error(msg);
        });
    }

    function init() {
        getAllUsers();
    }

    init();
}