/**
 * Created by Slaby on 17.12.2015.
 */
/**
 * Created by Slaby on 01.12.2015.
 */
angular.module("cmsModule").controller("userManagementCtrl", ["$scope", "adminTemplateService", '$state', "userService", "$uibModal", userManagementCtrl]);

function userManagementCtrl($scope, adminTemplateService, $state, userService, $uibModal) {

    $scope.users = [];

    $scope.open = function (user) {
        console.log($uibModal);
        var modalInstance = $uibModal.open(
            {
                templateUrl: 'modules/cms/views/userEditView.html',
                controller: 'userEditCtrl',
                backdrop:"static",
                resolve: {
                    "user": function () {
                        return user;
                    }
                }
            }
        );

        modalInstance.result.then(function (selectedItem) {
            console.log(selectedItem);
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };


    function getAllUsers() {
        userService.fetchAllUsers().then(function (data) {
            $scope.allUsers = data;
        }, function (msg) {
            console.error(msg);
        });
    }

    function init() {
        getAllUsers();
    }

    init();
}