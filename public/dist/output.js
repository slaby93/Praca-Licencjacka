"use strict";

function socketService($http) {
    function defineListeners() {
        socket.on("news", function(data) {
            console.log(data), socket.emit("my other event", {
                my: "data"
            });
        });
    }
    var socket = null;
    this.init = function() {
        socket = io(), defineListeners();
    };
}

function testService($http) {
    this.testRestow = function(callback) {
        $http.get("/testowo").success(function(data) {
            callback && callback(data);
        });
    }, this.test = function() {
        return 2;
    };
}

function mainAppCtrl($scope, socketService) {
    socketService.init();
}

function testCtrl($scope, testService) {
    $scope.testUnit = function() {
        return 2;
    };
}

function userService($http, $state, localStorageService) {
    function init() {
        token = localStorageService.get("token"), token && $http.post("/user/token", {
            token: token
        }).then(function(data) {
            console.log(JSON.stringify(data));
        }, function(err) {
            console.log(JSON.stringify(err));
        });
    }
    var user = null, token = null;
    this.login = function(passedUser) {
        $http.post("/user", passedUser).then(function(received) {
            user = received.data.user, token = received.data.token, localStorageService.set("token", token), 
            $state.go("cms");
        }, function(err) {
            sweetAlert("Logowanie nieudane!", err.data.message, "error");
        });
    }, this.register = function(passedUser) {
        $http.post("/user/register", passedUser).then(function(received) {
            swal("Rejestracja pomyślna!", "Użytkownik " + received.data.login + " zarejestrowany.", "success");
        }, function(err) {
            sweetAlert("Rejestracja nieudana!", err.data.message, "error");
        });
    }, this.logout = function() {
        user = null, token = null;
    }, this.getUser = function() {
        return user ? user : null;
    }, init();
}

function headerCtrl($scope, adminTemplateService, $state, userService) {
    function init() {}
    var me = this;
    me.logout = function() {
        userService.logout(), $state.go("login");
    }, init();
}

function imageUploadCtrl($scope, FileUploader) {
    $scope.uploader = new FileUploader({
        url: "upload",
        autoUpload: !0
    }), $scope.maxFileSize = 10485760, $scope.uploader.filters.push({
        name: "imageFilter",
        fn: function(item, options) {
            var type = "|" + item.type.slice(item.type.lastIndexOf("/") + 1) + "|";
            return -1 !== "|jpg|png|jpeg|bmp|gif|".indexOf(type);
        }
    }), $scope.uploader.filters.push({
        name: "sizeFilter",
        fn: function(item, options) {
            return item.size <= $scope.maxFileSize;
        }
    });
}

function indexCmsCtrl($scope, $ocLazyLoad, $rootScope, userService, $state) {
    function init() {
        return (user = userService.getUser()) ? void $scope.$evalAsync(function() {
            initAdminLTE();
        }) : void $state.go("login");
    }
    var user;
    $rootScope.$on("$stateChangeSuccess", function() {
        userService.getUser() || $state.go("login");
    }), init();
}

function loginCtrl($scope, userService, testService, $state) {
    function clearForm() {
        $scope.user = {
            login: "",
            password: ""
        }, $scope.formaLogowania.login.$setUntouched(), $scope.formaLogowania.password.$setUntouched();
    }
    function init() {
        $scope.user = {
            login: "",
            password: ""
        }, userService.getUser() && $state.go("cms");
    }
    $scope.loguj = function() {
        userService.login($scope.user), clearForm();
    }, init();
}

function registerCtrl($scope, userService, testService) {
    function clearForm() {
        $scope.user = {
            login: "",
            password: "",
            retypedPassword: ""
        };
    }
    $scope.user = {
        login: "",
        password: "",
        retypedPassword: ""
    }, $scope.register = function() {
        userService.register($scope.user), clearForm();
    };
}

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

angular.module("mainApp", [ "cmsModule", "userModule", "ui.router", "oc.lazyLoad", "LocalStorageModule" ]).config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/cms/main"), $stateProvider.state("app", {
        url: "/app",
        templateUrl: "modules/mainApp/views/mainView.html",
        controller: "mainAppCtrl"
    });
}), angular.module("userModule", [ "LocalStorageModule" ]).config(function(localStorageServiceProvider) {
    localStorageServiceProvider.setPrefix("myApp").setStorageType("localStorage").setNotify(!0, !0);
}), angular.module("cmsModule", [ "ui.router", "oc.lazyLoad", "angularFileUpload" ]).config(function($stateProvider, $urlRouterProvider) {
    $stateProvider.state("cms", {
        url: "/cms",
        views: {
            "": {
                templateUrl: "modules/cms/views/AdminLte2/index.html",
                controller: "indexCmsCtrl"
            },
            "header@cms": {
                templateUrl: "modules/cms/views/AdminLte2/header.html",
                controller: "headerCtrl as headerCtrl"
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
    }).state("login", {
        url: "/login",
        templateUrl: "modules/cms/views/loginView.html",
        controller: "loginCtrl"
    }).state("register", {
        url: "/register",
        templateUrl: "modules/cms/views/registerView.html",
        controller: "registerCtrl"
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
}), angular.module("mainApp").service("socketService", [ "$http", socketService ]), 
angular.module("mainApp").service("testService", [ "$http", testService ]), angular.module("mainApp").controller("mainAppCtrl", [ "$scope", "socketService", mainAppCtrl ]), 
angular.module("mainApp").controller("testCtrl", [ "$scope", "testService", testCtrl ]), 
angular.module("userModule").service("userService", [ "$http", "$state", "localStorageService", userService ]), 
angular.module("cmsModule").controller("headerCtrl", [ "$scope", "adminTemplateService", "$state", "userService", headerCtrl ]), 
angular.module("cmsModule").controller("imageUploadCtrl", [ "$scope", "FileUploader", imageUploadCtrl ]).directive("ngThumb", [ "$window", function($window) {
    var helper = {
        support: !(!$window.FileReader || !$window.CanvasRenderingContext2D),
        isFile: function(item) {
            return angular.isObject(item) && item instanceof $window.File;
        },
        isImage: function(file) {
            var type = "|" + file.type.slice(file.type.lastIndexOf("/") + 1) + "|";
            return -1 !== "|jpg|png|jpeg|bmp|gif|".indexOf(type);
        }
    };
    return {
        restrict: "A",
        template: "<canvas/>",
        link: function(scope, element, attributes) {
            function onLoadFile(event) {
                var img = new Image();
                img.onload = onLoadImage, img.src = event.target.result;
            }
            function onLoadImage() {
                var width = params.width || this.width / this.height * params.height, height = params.height || this.height / this.width * params.width;
                canvas.attr({
                    width: width,
                    height: height
                }), canvas[0].getContext("2d").drawImage(this, 0, 0, width, height);
            }
            if (helper.support) {
                var params = scope.$eval(attributes.ngThumb);
                if (helper.isFile(params.file) && helper.isImage(params.file)) {
                    var canvas = element.find("canvas"), reader = new FileReader();
                    reader.onload = onLoadFile, reader.readAsDataURL(params.file);
                }
            }
        }
    };
} ]), angular.module("cmsModule").controller("indexCmsCtrl", [ "$scope", "$ocLazyLoad", "$rootScope", "userService", "$state", indexCmsCtrl ]), 
angular.module("cmsModule").controller("loginCtrl", [ "$scope", "userService", "testService", "$state", loginCtrl ]), 
angular.module("cmsModule").controller("registerCtrl", [ "$scope", "userService", "testService", registerCtrl ]), 
angular.module("cmsModule").controller("sideMenuCtrl", [ "$scope", "adminTemplateService", "$state", sideMenuCtrl ]), 
angular.module("cmsModule").service("adminTemplateService", [ "$http", adminTemplateService ]);