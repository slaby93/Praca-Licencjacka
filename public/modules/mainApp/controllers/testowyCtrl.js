angular.module("mainApp").controller("testCtrl",
        ["$scope",
            "testService",
            testCtrl]);

function testCtrl($scope, testService) {

    $scope.testUnit = function(){
        "use strict";
        return 2;

    };



}