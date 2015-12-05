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

function imageUploadCtrl($scope, FileUploader) {
    $scope.uploader = new FileUploader();
}

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

function sideMenuCtrl($scope, adminTemplateService) {
    function init() {
        adminTemplateService.getCmsConfig(function(data) {
            me.tabs = data.tabList;
        });
    }
    var me = this;
    init();
}

function adminTemplateService($http) {
    function downloadConfigJson(callback) {
        $http.get("/cms").success(function(data) {
            cmsConfig = data, callback && callback();
        });
    }
    var cmsConfig = {
        tabList: [ {
            name: "Zarzadzanie CMS",
            urlList: [ {
                name: "Zakladki",
                url: "cms.test"
            }, {
                name: "Upload Zdjec",
                url: "cms.imageUpload"
            } ]
        } ]
    };
    this.getCmsConfig = function(callback) {
        null === cmsConfig ? downloadConfigJson(function() {
            callback && callback(cmsConfig);
        }) : callback && callback(cmsConfig);
    };
}

angular.module("mainApp", [ "cmsModule", "userModule", "ui.router", "oc.lazyLoad" ]).config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/cms/main"), $stateProvider.state("app", {
        url: "/app",
        templateUrl: "modules/mainApp/views/mainView.html",
        controller: "mainAppCtrl"
    });
}), angular.module("userModule", []), angular.module("cmsModule", [ "ui.router", "oc.lazyLoad", "angularFileUpload" ]).config(function($stateProvider, $urlRouterProvider) {
    $stateProvider.state("cms", {
        url: "/cms",
        views: {
            "": {
                templateUrl: "modules/cms/views/AdminLte2/index.html",
                controller: "indexCmsCtrl"
            },
            "header@cms": {
                templateUrl: "modules/cms/views/AdminLte2/header.html"
            },
            "footer@cms": {
                templateUrl: "modules/cms/views/AdminLte2/footer.html"
            },
            "content@cms": {
                templateUrl: "modules/cms/views/AdminLte2/content.html"
            },
            "sideMenu@cms": {
                templateUrl: "modules/cms/views/AdminLte2/sideMenu.html",
                controller: "sideMenuCtrl as sideMenuCtrl"
            }
        }
    }).state("cms.login", {
        url: "/login",
        templateUrl: "modules/cms/views/loginView.html",
        controller: "loginCtrl"
    }).state("cms.main", {
        url: "/main",
        templateUrl: "modules/cms/views/mainCmsView.html"
    }).state("cms.test", {
        url: "/test",
        templateUrl: "modules/cms/views/testView.html"
    }).state("cms.test2", {
        url: "/test2",
        template: "<h2>TEST2</h2>"
    }).state("cms.imageUpload", {
        url: "/imageUpload",
        controller: "imageUploadCtrl",
        templateUrl: "modules/cms/views/imageUploadView.html"
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
}), angular.module("mainApp").service("testService", [ "$http", testService ]), 
angular.module("mainApp").controller("mainAppCtrl", [ "$scope", mainAppCtrl ]), 
angular.module("mainApp").controller("testCtrl", [ "$scope", "testService", testCtrl ]), 
angular.module("userModule").service("userService", [ "$http", userService ]), angular.module("cmsModule").controller("imageUploadCtrl", [ "$scope", "FileUploader", imageUploadCtrl ]), 
angular.module("cmsModule").controller("indexCmsCtrl", [ "$scope", "$ocLazyLoad", indexCmsCtrl ]), 
angular.module("cmsModule").controller("loginCtrl", [ "$scope", "userService", "testService", loginCtrl ]), 
angular.module("cmsModule").controller("mainCmsCtrl", [ "$scope", mainCmsCtrl ]), 
angular.module("cmsModule").controller("sideMenuCtrl", [ "$scope", "adminTemplateService", "$state", sideMenuCtrl ]), 
angular.module("cmsModule").service("adminTemplateService", [ "$http", adminTemplateService ]);