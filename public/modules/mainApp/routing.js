/**
 * Created by piec on 13.03.16.
 */

/**
 * @description Konfiguracja routera dla korzenia routera.
 * @param {type} $stateProvider
 * @param {type} $urlRouterProvider
 * @returns {undefined}
 */
function routing($stateProvider, $urlRouterProvider) {
    //******************** Defaultowy stan aplikacji ***************************\\
    $urlRouterProvider.otherwise("/app/home");
    //**************************************************************************\\

    $stateProvider
        .state('app', {
            url: "/app",
            templateUrl: "modules/mainApp/views/application.html",
            controller: "ApplicationController",
            controllerAs: "appCtrl"
        })
        .state('app.home', {
            url: "/home",
            templateUrl: "modules/mainApp/views/home.html",
            controller: "HomeController",
            controllerAs: "homeCtrl"
        });
}

export default routing;