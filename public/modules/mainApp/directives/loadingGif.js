/**
 * Created by Slaby on 20.01.2016.
 */
angular.module('mainApp', [])
    .controller('Controller', ['$scope', function($scope) {
        $scope.customer = {
            name: 'Naomi',
            address: '1600 Amphitheatre'
        };
    }])
    .directive('loadingGif', function() {
        return {
            template: 'Name: {{customer.name}} Address: {{customer.address}}'
        };
    });