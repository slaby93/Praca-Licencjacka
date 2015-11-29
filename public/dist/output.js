"use strict";

function testService($http) {
    this.testRestow = function(callback) {
        $http.get("/testowo").success(function(data) {
            callback && callback(data);
        });
    }, this.test = function() {
        return 2;
    };
}

function mainAppCtrl($scope) {}

function testCtrl($scope, testService) {
    $scope.testUnit = function() {
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

function loginCtrl($scope, userService, testService) {
    function clearLoginForm() {
        $scope.user = {
            login: "",
            password: ""
        }, $scope.formaLogowania.login.$setUntouched(), $scope.formaLogowania.password.$setUntouched();
    }
    $scope.user = {
        login: "",
        password: ""
    }, $scope.loguj = function() {
        userService.login($scope.user.login, $scope.user.password), clearLoginForm();
    };
}

function mainCmsCtrl($scope) {}

angular.module("mainApp", [ "cmsModule", "userModule", "ui.router" ]).config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/app"), $stateProvider.state("app", {
        url: "/app",
        templateUrl: "modules/mainApp/views/mainView.html",
        controller: "mainAppCtrl"
    });
}), angular.module("userModule", []), angular.module("cmsModule", [ "ui.router" ]).config(function($stateProvider, $urlRouterProvider) {
    $stateProvider.state("cms", {
        url: "/cms",
        templateUrl: "modules/cms/views/mainCmsView.html",
        controller: "mainCmsCtrl"
    }).state("cms.login", {
        url: "/login",
        templateUrl: "modules/cms/views/loginView.html",
        controller: "loginCtrl"
    });
}), angular.module("mainApp").service("testService", [ "$http", testService ]), 
angular.module("mainApp").controller("mainAppCtrl", [ "$scope", mainAppCtrl ]), 
angular.module("mainApp").controller("testCtrl", [ "$scope", "testService", testCtrl ]), 
angular.module("userModule").service("userService", [ "$http", userService ]), angular.module("cmsModule").controller("loginCtrl", [ "$scope", "userService", "testService", loginCtrl ]), 
angular.module("cmsModule").controller("mainCmsCtrl", [ "$scope", mainCmsCtrl ]);