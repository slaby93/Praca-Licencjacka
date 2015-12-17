angular.module("mainApp", ["cmsModule", "userModule", "ui.router", "oc.lazyLoad", "LocalStorageModule"])
    /**
     * @description Konfiguracja routera dla korzenia routera.
     * @param {type} $stateProvider
     * @param {type} $urlRouterProvider
     * @returns {undefined}
     */
    .config(function ($stateProvider, $urlRouterProvider) {
        //******************** Defaultowy stan aplikacji ***************************\\
        $urlRouterProvider.otherwise("/cms/main");
        //**************************************************************************\\

        $stateProvider.state('app', {
            url: "/app",
            templateUrl: "modules/mainApp/views/mainView.html",
            controller: "mainAppCtrl"
        });
    });