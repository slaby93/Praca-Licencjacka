angular.module("cmsModule", ["ui.router", "oc.lazyLoad", "angularFileUpload"])
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
                }
            }).state('login', {
            url: "/login",
            templateUrl: "modules/cms/views/loginView.html",
            controller: "loginCtrl"
        }).state('register', {
            url: "/register",
            templateUrl: "modules/cms/views/registerView.html",
            controller: "registerCtrl"
        }).state('cms.test', {
            url: "/test",
            templateUrl: "modules/cms/views/testView.html"
        }).state('cms.test2', {
            url: "/test2",
            template: "<h2>TEST2</h2>"
        }).state('cms.imageUpload', {
            url: "/imageUpload",
            controller: "imageUploadCtrl",
            templateUrl: "modules/cms/views/imageUploadView.html"
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
