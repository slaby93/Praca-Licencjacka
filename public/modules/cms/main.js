angular.module("cmsModule", ["ui.router", "oc.lazyLoad", "angularFileUpload", "ui.bootstrap"])
    /**
     * @description Routowanie po CMSie
     * @param {type} $stateProvider
     * @param {type} $urlRouterProvider
     * @returns {undefined}
     */
    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('cms', {
                url: "/cms",
                // definiuje sobie podstany
                views: {
                    "": {
                        templateUrl: "modules/cms/views/AdminLte2/index.html",
                        controller: "indexCmsCtrl"
                    },
                    "header@cms": {
                        templateUrl: "modules/cms/views/AdminLte2/header.html",
                        controller: "headerCtrl"
                    },
                    "footer@cms": {
                        templateUrl: "modules/cms/views/AdminLte2/footer.html"
                    },
                    "content@cms": {
                        templateUrl: "modules/cms/views/AdminLte2/content.html"
                    },
                    "sideMenu@cms": {
                        templateUrl: "modules/cms/views/AdminLte2/sideMenu.html",
                        controller: "sideMenuCtrl"
                    }
                },
                // sprawdza przy probie otworzenia /cms czy uzytkownik jest juz zalogowany
                onEnter: function (userService, $state) {
                    try {
                        var user = userService.getUser();
                        if (user === undefined || user === null) {
                            $state.go("login");
                            return;
                        }
                        // sprawdzam uprawnienia uzytkownika
                        if (user.groups.indexOf("admin") < 0) {
                            // uzytkownik nie ma uprawnien do wejscia do CMSa. Nalezy go przekierowac do strony bledu.
                            $state.go("contentForbiden");
                        }


                    } catch (e) {
                        console.log("ERROR");
                        console.log(e);
                    }
                }
            }).state('login', {
            url: "/login",
            templateUrl: "modules/cms/views/loginView.html",
            controller: "loginCtrl"
        }).state('register', {
            url: "/register",
            templateUrl: "modules/cms/views/registerView.html",
            controller: "registerCtrl"
        }).state('cms.userManagement', {
            url: "/userManagement",
            templateUrl: "modules/cms/views/userManagementView.html",
            controller: "userManagementCtrl"
        }).state('cms.test2', {
            url: "/test2",
            template: "<h2>TEST2</h2>"
        }).state('cms.imageUpload', {
            url: "/imageUpload",
            controller: "imageUploadCtrl",
            templateUrl: "modules/cms/views/imageUploadView.html"
        }).state('contentForbiden', {
            url: "/403",
            templateUrl: "modules/cms/views/403-Content-Forbiden.html"
        });
    })
    /**
     * @description Dyrektywa ta zapobiega przechodziu po kliknieciu na <a href="" / href="#" ></a>
     */
    .directive("a", function () {
        return {
            restrict: 'E',
            link: function (scope, elem, attrs) {
                if (attrs.ngClick || attrs.href === '' || attrs.href === '#') {
                    elem.on('click', function (e) {
                        e.preventDefault();
                    });
                }
            }
        }
    });
