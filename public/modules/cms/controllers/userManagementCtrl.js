/**
 * Created by Slaby on 17.12.2015.
 */
/**
 * Created by Slaby on 01.12.2015.
 */
angular.module("cmsModule").controller("userManagementCtrl", ["$scope", "adminTemplateService", '$state', "userService", userManagementCtrl]);

function userManagementCtrl($scope, adminTemplateService, $state, userService) {

    $scope.users = [];
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