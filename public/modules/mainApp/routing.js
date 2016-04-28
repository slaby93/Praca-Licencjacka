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
    $urlRouterProvider.otherwise("/introduction");
    //**************************************************************************\\

    $stateProvider
        .state('app', {
            url: "/app",
            templateUrl: "modules/mainApp/application/application.html",
            controller: "ApplicationController",
            controllerAs: "appCtrl"
        })
        .state('app.home', {
            url: "/home",
            templateUrl: "modules/mainApp/home/home.html",
            controller: "HomeController",
            controllerAs: "homeCtrl"
        })
        .state('app.account', {
            url: "/account/:userName/:indexName",
            templateUrl: "modules/mainApp/account/account.html",
            controller: "AccountController",
            controllerAs: "accountCtrl"
        })
        .state('app.event', {
            url: "/event",
            templateUrl: "modules/mainApp/events/event.html",
            controller: "EventController",
            controllerAs: "eventCtrl"
        })
        .state('app.event.add', {
            url: "/add",
            templateUrl: "modules/mainApp/event-add/event_add.html",
            controller: "EventAddController",
            controllerAs: "eventAddCtrl"
        })
        .state('app.event.edit', {
            url: "/edit",
            templateUrl: "modules/mainApp/event-edit/event_edit.html",
            controller: "EventEditController",
            controllerAs: "eventEditCtrl"
        })
        .state('center', {
            url: "/center",
            templateUrl: "modules/mainApp/center/center.html",
            controller: "CenterController",
            controllerAs: "centerCtrl"
        })
        .state('introduction', {
            url: "/introduction",
            templateUrl: "modules/mainApp/introduction/introduction.html",
            controller: "introductionController",
            controllerAs: "introCtrl"
        })
        .state('test', {
            url: "/test",
            templateUrl: "modules/mainApp/test/test.html",
            controller: "TestController",
            controllerAs: "homeCtrl"
        })
    ;
}

export default routing;