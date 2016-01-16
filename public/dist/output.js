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
        "use strict";
        return 2;
    };
}

function login_registerCtrl($scope, $uibModalInstance, $state, userService, localStorageService, isLogged) {
    function clearFormLogin() {
        $scope.userLogin = {
            login: "",
            password: ""
        };
    }
    function initRegister() {
        clearFormRegister();
    }
    function clearFormRegister() {
        $scope.user = {
            login: "",
            password: "",
            name: "",
            surname: "",
            retypedPassword: ""
        };
    }
    $scope.is_register_shown = !1, $scope.is_login_clicked = !1, $scope.is_register_clicked = !1, 
    $scope.feedback = "", $scope.showRegister = function() {
        $scope.is_register_shown = !0, $scope.feedback = "";
    }, $scope.showLogin = function() {
        $scope.is_register_shown = !1, $scope.feedback = "";
    }, $scope.cancel = function() {
        $uibModalInstance.dismiss("cancel");
    }, $scope.hasWhiteSpace = function(s) {
        return !1;
    }, $scope.loguj = function() {
        $scope.is_login_clicked = !0, $scope.feedback = "", userService.login($scope.userLogin).then(function(message) {
            null != userService.getUser($scope.userLogin) && (clearFormLogin(), isLogged = !0, 
            $uibModalInstance.close(!0));
        }, function(err) {
            $scope.feedback = "Błąd podczas logowania!", $scope.is_login_clicked = !1;
        }, function(update) {
            $scope.is_login_clicked = !1;
        });
    }, $scope.register = function() {
        $scope.is_register_clicked = !0, $scope.feedback = "", userService.register($scope.user).then(function(message) {
            $scope.feedback = "Pomyślnie zarejestrowano użytkownika!", $scope.userLogin = {
                login: $scope.user.login,
                password: $scope.user.password
            }, $scope.loguj(), clearFormRegister();
        }, function(err) {
            $scope.feedback = "Wystąpił błąd podczas rejestracji!", clearFormRegister(), $scope.is_register_clicked = !1;
        }, function(update) {
            $scope.is_register_clicked = !1;
        });
    }, initRegister();
}

function mainAppCtrl($scope, socketService, userService, $state, $uibModal, localStorageService) {
    function initLogin() {
        $scope.userLogin = {
            login: "",
            password: ""
        };
        var token = localStorageService.get("token");
        token ? userService.loginByToken(token).then(function(message) {
            $scope.isLogged = !0;
        }, function(message) {
            console.log(message.data), $scope.isLogged = !1, localStorageService.remove("token");
        }, function(message) {
            $scope.isLogged = !1, console.log(message);
        }) : ($scope.isLogged = !1, console.log("Token is empty!"));
    }
    $scope.x = 10, $scope.testowyLogout = function() {
        console.log("TEST");
    }, $scope.logout = function() {
        userService.logout(), $scope.isLogged = !1;
    }, $scope.openLoginRegister = function() {
        var modalInstance = $uibModal.open({
            templateUrl: "modules/mainApp/views/login_registerView.html",
            controller: "login_registerCtrl",
            backdrop: "static",
            resolve: {
                isLogged: function() {
                    return $scope.isLogged;
                }
            }
        });
        modalInstance.result.then(function(is) {
            $scope.isLogged = is;
        }, function() {});
    }, initLogin();
}

function testCtrl($scope, testService) {
    $scope.testUnit = function() {
        "use strict";
        return 2;
    };
}

function userService($http, $state, localStorageService, $q, $rootScope) {
    var user = null, token = null;
    this.login = function(passedUser) {
        var obietnica = $q.defer();
        return $http.post("/user", passedUser).then(function(received) {
            obietnica.resolve(received), user = received.data.user, token = received.data.token, 
            localStorageService.set("token", token), console.log(3);
        }, function(err) {
            obietnica.reject(err);
        }), obietnica.promise;
    }, this.register = function(passedUser) {
        var obietnica = $q.defer();
        return $rootScope.$evalAsync(function() {
            $http.post("/user/register", passedUser).then(function(received) {
                obietnica.resolve(received);
            }, function(err) {
                obietnica.reject(err);
            });
        }), obietnica.promise;
    }, this.logout = function() {
        console.log("logout"), user = null, token = null, localStorageService.remove("token");
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
    }, this.loginByToken = function(tken) {
        if (tken) {
            var odroczenie = $q.defer();
            return $rootScope.$applyAsync(function() {
                $http.post("/user/token", {
                    token: tken
                }).then(function(data) {
                    user = data.data, token = tken, odroczenie.resolve(user);
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
            console.error(error), callback && callback(error);
        });
    }, this.getToken = function() {
        return token;
    };
}

function userEditCtrl($scope, $uibModalInstance, user, userService) {
    function convertGruops(groups) {
        var temp = {};
        return groups.forEach(function(key) {
            temp[key] = !0;
        }), console.log(temp), temp;
    }
    function converToArray(map) {
        var temp = [];
        return Object.keys(map).forEach(function(key) {
            map[key] === !0 && temp.push(key);
        }), temp;
    }
    $scope.copiedUser = angular.copy(user), $scope.copiedUser.groups = convertGruops(user.groups), 
    $scope.ok = function() {
        var changes = {};
        Object.keys(user).forEach(function(key) {
            $scope.copiedUser[key] !== user[key] && (changes[key] = $scope.copiedUser[key]);
        }), changes._id = user._id, changes.groups = converToArray(changes.groups), delete changes.$$hashKey, 
        console.log(changes), userService.editUser(changes, function() {
            $uibModalInstance.close("PSAJDAK");
        });
    }, $scope.reset = function() {
        $scope.copiedUser = angular.copy(user);
    }, $scope.cancel = function() {
        $uibModalInstance.dismiss("cancel");
    };
}

function headerCtrl($scope, adminTemplateService, $state, userService) {
    "use strict";
    function init() {}
    $scope.logout = function() {
        userService.logout(), $state.go("app");
    }, init();
}

function imageUploadCtrl($scope, FileUploader, userService) {
    $scope.uploader = new FileUploader({
        url: "upload",
        removeAfterUpload: !0,
        formData: [ {
            token: userService.getToken()
        } ]
    }), $scope.maxFileSize = 2097152, $scope.uploader.filters.push({
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
    }), $scope.uploader.onCompleteAll = function() {
        $scope.$emit("UserImageChaned");
    };
}

function indexCmsCtrl($scope, $ocLazyLoad, $rootScope, userService, $state) {
    "use strict";
    function init() {
        try {
            $scope.user = userService.getUser(), $scope.userImage = "gallery/" + $scope.user._id + "/avatar", 
            $scope.fallbackImage = "gallery/default.gif", $rootScope.$evalAsync(function() {
                initAdminLTE();
            });
        } catch (e) {
            console.log("Error in indexCmsCtrl"), console.error(e);
        }
    }
    $scope.$on("UserImageChaned", function() {
        $scope.userImage = "gallery/" + $scope.user._id + "/avatar?" + new Date().getTime();
    }), init();
}

function sideMenuCtrl($scope, adminTemplateService, $state, userService) {
    "use strict";
    function init() {
        adminTemplateService.getCmsConfig(function(data) {
            $scope.tabs = data.tabList;
        }), $scope.user = userService.getUser(), null == $scope.user && $state.go("app");
    }
    init();
}

function userManagementCtrl($scope, adminTemplateService, $state, userService, $uibModal) {
    function getAllUsers() {
        userService.fetchAllUsers().then(function(data) {
            for (var i = 0; i < data.length; i++) if (data[i]._id === $scope.user._id) {
                data.splice(i, 1);
                break;
            }
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
    $scope.open = function(user) {
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
            name: "Zarządzanie użytkownikami",
            url: "cms.userManagement"
        }, {
            name: "Wgrywanie Zdjęć",
            url: "cms.imageUpload"
        } ]
    };
    this.getCmsConfig = function(callback) {
        null === cmsConfig ? downloadConfigJson(function() {
            callback && callback(cmsConfig);
        }) : callback && callback(cmsConfig);
    };
}

angular.module("mainApp", [ "cmsModule", "userModule", "ui.router", "oc.lazyLoad", "LocalStorageModule", "ui.bootstrap", "dcbImgFallback" ]).config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/app"), $stateProvider.state("app", {
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
        },
        onEnter: function(userService, $state) {
            try {
                var user = userService.getUser();
                (void 0 === user || null === user) && $state.go("login"), user.groups.indexOf("admin") < 0 && $state.go("contentForbiden");
            } catch (e) {
                console.log("ERROR");
            }
        }
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
    }).state("contentForbiden", {
        url: "/403",
        templateUrl: "modules/cms/views/forbidenView.html"
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
angular.module("mainApp").service("testService", [ "$http", testService ]), angular.module("mainApp").controller("login_registerCtrl", [ "$scope", "$uibModalInstance", "$state", "userService", "localStorageService", "isLogged", login_registerCtrl ]), 
angular.module("mainApp").controller("mainAppCtrl", [ "$scope", "socketService", "userService", "$state", "$uibModal", "localStorageService", mainAppCtrl ]), 
angular.module("mainApp").controller("testCtrl", [ "$scope", "testService", testCtrl ]), 
angular.module("userModule").service("userService", [ "$http", "$state", "localStorageService", "$q", "$rootScope", userService ]), 
angular.module("cmsModule").controller("userEditCtrl", [ "$scope", "$uibModalInstance", "user", "userService", userEditCtrl ]), 
angular.module("cmsModule").controller("headerCtrl", [ "$scope", "adminTemplateService", "$state", "userService", headerCtrl ]), 
angular.module("cmsModule").controller("imageUploadCtrl", [ "$scope", "FileUploader", "userService", imageUploadCtrl ]).directive("ngThumb", [ "$window", function($window) {
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
angular.module("cmsModule").controller("sideMenuCtrl", [ "$scope", "adminTemplateService", "$state", "userService", sideMenuCtrl ]), 
angular.module("cmsModule").controller("userManagementCtrl", [ "$scope", "adminTemplateService", "$state", "userService", "$uibModal", userManagementCtrl ]), 
angular.module("cmsModule").service("adminTemplateService", [ "$http", adminTemplateService ]);