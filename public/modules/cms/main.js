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
                // sprawdza przy probie otworzenia /cms czy uzytkownik jest juz zalogowany
                onEnter: function (userService, $state) {
                    try {
                        var user = userService.getUser();
                        if (user === null || user === undefined) {
                            $state.go("app");
                            return;
                        }      // sprawdzam uprawnienia uzytkownika
                        if (!user.groups["admin"]) {
                            // uzytkownik nie ma uprawnien do wejscia do CMSa. Nalezy go przekierowac do strony bledu.
                            $state.go("contentForbidden");
                        }
                    } catch (e) {
                        console.log("ERROR");
                        console.log(e);
                        $state.go("app");
                    }
                }
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
        }).state('contentForbidden', {
            url: "/403",
            templateUrl: "modules/cms/views/forbiddenView.html"
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
