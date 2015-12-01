angular.module("cmsModule", ["ui.router"])
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
                templateUrl: "modules/cms/views/mainCmsView.html",
                controller: "mainCmsCtrl"
            }).state('cms.login', {
            url: "/login",
            templateUrl: "modules/cms/views/loginView.html",
            controller: "loginCtrl"
        }).state('cms.start', {
            url: "/start",
            views: {
                "": {
                    templateUrl: "modules/cms/views/AdminLte2/index.html"
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
                    templateUrl: "modules/cms/views/AdminLte2/sideMenu.html"
                }
            }
        });
    });
