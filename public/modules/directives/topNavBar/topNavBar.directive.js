/**
 * Created by piec on 13.03.16.
 */
angular.module("mainApp")
    .directive('topNavBar', function () {
        return {
            restrict: 'E',
            templateUrl: 'modules/directives/topNavBar/topNavBar.html',
            controller: "topNavBarCtrl",
            controllerAs: "topNavBarCtrl"
        };
    })
    .controller("topNavBarCtrl", ["$scope",'userService', topNavBarCtrl]);


function topNavBarCtrl($scope,userService) {
    var self = this;
    self.options = [
        {
            placeholder: "Login",
            click: function () {
                userService.openLoginRegister();
            }
        }
    ];

}