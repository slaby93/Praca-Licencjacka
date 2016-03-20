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
    // $urlRouterProvider.otherwise("/app");
    //**************************************************************************\\
    //
    $stateProvider.state('app', {
        url: "/app",
        templateUrl: "modules/mainApp/views/mainView.html",
        controller: "MainController",
        controllerAs: "mainAppCtrl"
    });
}

export default routing;