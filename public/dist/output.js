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

function userService($http, $state, localStorageService, $q, $rootScope) {
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
        user = null, token = null, localStorageService.remove("token");
    }, this.getUser = function() {
        return user ? user : null;
    }, this.fetchAllUsers = function() {
        var odroczenie = $q.defer();
        return $rootScope.$evalAsync(function() {
            $http.post("/user/all").then(function(allUsers) {
                odroczenie.resolve(allUsers.data);
            }, function(err) {
                odroczenie.reject(err);
            });
        }), odroczenie.promise;
    }, this.loginByToken = function(token) {
        if (token) {
            var odroczenie = $q.defer();
            return $rootScope.$applyAsync(function() {
                $http.post("/user/token", {
                    token: token
                }).then(function(data) {
                    user = data.data, odroczenie.resolve(user);
                }, function(err) {
                    localStorageService.remove("token"), odroczenie.resolve(err);
                });
            }), odroczenie.promise;
        }
    }, this.editUser = function(user, callback) {
        $http.post("/user/update", {
            user: user
        }).then(function(message) {
            callback();
        }, function(error) {
            console.error(error), swal({
                title: "Błąd",
                text: "Podczas komunikacji z serwerem wystąpił błąd.",
                type: "warning",
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Zamknij"
            }, function() {
                callback();
            });
        });
    }, this.removeUser = function(user, callback) {
        $http.post("/user/remove", {
            user: user
        }).then(function(message) {
            callback && callback(message);
        }, function(error) {
            console.log(error), callback && callback(error);
        });
    };
}

function userEditCtrl($scope, $uibModalInstance, user, userService) {
    $scope.copiedUser = angular.copy(user), $scope.ok = function() {
        var changes = {};
        Object.keys(user).forEach(function(key) {
            $scope.copiedUser[key] !== user[key] && (changes[key] = $scope.copiedUser[key]);
        }), changes.login = user.login, delete changes.groups, delete changes.$$hashKey, 
        userService.editUser(changes, function() {
            $uibModalInstance.close("PSAJDAK");
        });
    }, $scope.reset = function() {
        $scope.copiedUser = angular.copy(user);
    }, $scope.cancel = function() {
        $uibModalInstance.dismiss("cancel");
    };
}

function headerCtrl($scope, adminTemplateService, $state, userService) {
    function init() {}
    var me = this;
    me.user = userService.getUser(), me.logout = function() {
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
        userService.getUser() ? $rootScope.$evalAsync(function() {
            initAdminLTE();
        }) : $state.go("login");
    }
    $rootScope.$on("$stateChangeSuccess", function() {
        console.log("SPRAWDZAM TOKENA"), userService.getUser() ? $scope.user = userService.getUser() : $state.go("login");
    }), init();
}

function loginCtrl($scope, userService, testService, $state, localStorageService) {
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
        };
        var token = localStorageService.get("token");
        token ? userService.loginByToken(token).then(function(message) {
            console.log(message), $state.go("cms");
        }, function(message) {
            console.log(message.data), localStorageService.remove("token");
        }, function(message) {
            console.log(message);
        }) : console.log("Token is empty!");
    }
    $scope.loguj = function() {
        userService.login($scope.user), clearForm();
    }, init();
}

function registerCtrl($scope, userService, testService) {
    function init() {
        clearForm();
    }
    function clearForm() {
        $scope.user = {
            login: "",
            password: "",
            name: "",
            surname: "",
            retypedPassword: ""
        };
    }
    $scope.register = function() {
        userService.register($scope.user), clearForm();
    }, init();
}

function sideMenuCtrl($scope, adminTemplateService, $state, userService) {
    function init() {
        adminTemplateService.getCmsConfig(function(data) {
            me.tabs = data.tabList;
        }), me.user = userService.getUser();
    }
    var me = this;
    init();
}

function userManagementCtrl($scope, adminTemplateService, $state, userService, $uibModal) {
    function getAllUsers() {
        userService.fetchAllUsers().then(function(data) {
            $scope.$evalAsync(function() {
                $scope.allUsers = data;
            });
        }, function(msg) {
            console.error(msg);
        });
    }
    function init() {
        getAllUsers();
    }
    $scope.users = [], $scope.open = function(user) {
        var modalInstance = $uibModal.open({
            templateUrl: "modules/cms/views/userEditView.html",
            controller: "userEditCtrl",
            backdrop: "static",
            resolve: {
                user: function() {
                    return user;
                }
            }
        });
        modalInstance.result.then(function(fromModalOnExit) {
            getAllUsers();
        }, function() {});
    }, $scope.remove = function(user) {
        swal({
            title: "Usuwanie użytkownika " + user.login,
            text: "Uwaga, jest to operacja nieodwracalna!",
            type: "warning",
            showCancelButton: !0,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Tak, usuń użytkownika",
            closeOnConfirm: !1
        }, function() {
            userService.removeUser(user, function() {
                getAllUsers(), swal("", "Usunięto", "success");
            });
        });
    }, init();
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
        }, {
            name: "Zarządzanie użytkownikami",
            url: "cms.userManagement"
        } ]
    };
    this.getCmsConfig = function(callback) {
        null === cmsConfig ? downloadConfigJson(function() {
            callback && callback(cmsConfig);
        }) : callback && callback(cmsConfig);
    };
}

angular.module("mainApp", [ "cmsModule", "userModule", "ui.router", "oc.lazyLoad", "LocalStorageModule", "ui.bootstrap" ]).config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/cms/main"), $stateProvider.state("app", {
        url: "/app",
        templateUrl: "modules/mainApp/views/mainView.html",
        controller: "mainAppCtrl"
    });
}), angular.module("userModule", [ "LocalStorageModule" ]).config(function(localStorageServiceProvider) {
    localStorageServiceProvider.setPrefix("myApp").setStorageType("localStorage").setNotify(!0, !0);
}), angular.module("cmsModule", [ "ui.router", "oc.lazyLoad", "angularFileUpload", "ui.bootstrap" ]).config(function($stateProvider, $urlRouterProvider) {
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
    }).state("cms.userManagement", {
        url: "/userManagement",
        templateUrl: "modules/cms/views/userManagementView.html",
        controller: "userManagementCtrl"
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
angular.module("userModule").service("userService", [ "$http", "$state", "localStorageService", "$q", "$rootScope", userService ]), 
angular.module("cmsModule").controller("userEditCtrl", [ "$scope", "$uibModalInstance", "user", "userService", userEditCtrl ]), 
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
angular.module("cmsModule").controller("loginCtrl", [ "$scope", "userService", "testService", "$state", "localStorageService", loginCtrl ]), 
angular.module("cmsModule").controller("registerCtrl", [ "$scope", "userService", "testService", registerCtrl ]), 
angular.module("cmsModule").controller("sideMenuCtrl", [ "$scope", "adminTemplateService", "$state", "userService", sideMenuCtrl ]), 
angular.module("cmsModule").controller("userManagementCtrl", [ "$scope", "adminTemplateService", "$state", "userService", "$uibModal", userManagementCtrl ]), 
angular.module("cmsModule").service("adminTemplateService", [ "$http", adminTemplateService ]);