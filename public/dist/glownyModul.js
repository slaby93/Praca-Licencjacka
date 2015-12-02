function testService($http) {
    this.testRestow = function(callback) {
        $http.get("/testowo").success(function(data) {
            callback && callback(data);
        });
    }, this.test = function() {
        "use strict";
        return 2;
    };
}

function mainAppCtrl($scope) {}

function testCtrl($scope, testService) {
    $scope.testUnit = function() {
        "use strict";
        return 2;
    };
}

function userService($http) {
    var bcrypt = dcodeIO.bcrypt;
    this.login = function(login, password) {
        bcrypt.hash(password, 12, function(err, hash) {
            $http.post("/user/", {
                hash: hash
            }).success(function(answer) {
                console.log(answer);
            });
        });
    };
}

angular.module("mainApp", [ "cmsModule", "userModule", "ui.router", "oc.lazyLoad" ]).config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/app"), $stateProvider.state("app", {
        url: "/app",
        templateUrl: "modules/mainApp/views/mainView.html",
        controller: "mainAppCtrl"
    });
}), angular.module("userModule", []), angular.module("mainApp").service("testService", [ "$http", testService ]), 
angular.module("mainApp").controller("mainAppCtrl", [ "$scope", mainAppCtrl ]), 
angular.module("mainApp").controller("testCtrl", [ "$scope", "testService", testCtrl ]), 
angular.module("userModule").service("userService", [ "$http", userService ]);