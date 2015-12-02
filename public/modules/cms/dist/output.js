"use strict";

function indexCmsCtrl($scope, $ocLazyLoad) {
    $ocLazyLoad.load("modules/cms/lib/AdminLte2/app.js");
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

function sideMenuCtrl($scope) {
    this.zakladki = [ {
        nazwa: "zakladka1",
        url: "stronka"
    }, {
        nazwa: "zakladka2",
        url: "stronka"
    } ];
}

angular.module("cmsModule", [ "ui.router", "oc.lazyLoad" ]).config(function($stateProvider, $urlRouterProvider) {
    $stateProvider.state("cms", {
        url: "/cms",
        templateUrl: "modules/cms/views/mainCmsView.html",
        controller: "mainCmsCtrl"
    }).state("cms.login", {
        url: "/login",
        templateUrl: "modules/cms/views/loginView.html",
        controller: "loginCtrl"
    }).state("cms.start", {
        url: "/start",
        views: {
            "": {
                templateUrl: "modules/cms/views/AdminLte2/index.html",
                controller: "indexCmsCtrl"
            },
            "header@cms.start": {
                templateUrl: "modules/cms/views/AdminLte2/header.html"
            },
            "footer@cms.start": {
                templateUrl: "modules/cms/views/AdminLte2/footer.html"
            },
            "content@cms.start": {
                templateUrl: "modules/cms/views/AdminLte2/content.html"
            },
            "sideMenu@cms.start": {
                templateUrl: "modules/cms/views/AdminLte2/sideMenu.html",
                controller: "sideMenuCtrl as sideMenuCtrl"
            }
        }
    });
}).directive("a", function() {
    return {
        restrict: "E",
        link: function(scope, elem, attrs) {
            (attrs.ngClick || "" === attrs.href || "#" === attrs.href) && elem.on("click", function(e) {
                e.preventDefault();
            });
        }
    };
}), angular.module("cmsModule").controller("indexCmsCtrl", [ "$scope", "$ocLazyLoad", indexCmsCtrl ]), 
angular.module("cmsModule").controller("loginCtrl", [ "$scope", "userService", "testService", loginCtrl ]), 
angular.module("cmsModule").controller("mainCmsCtrl", [ "$scope", mainCmsCtrl ]), 
angular.module("cmsModule").controller("sideMenuCtrl", [ "$scope", sideMenuCtrl ]);