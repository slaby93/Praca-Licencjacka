/* global CryptoJS */

angular.module("userModule").service("userService", ["$http", "$state", userService]);
/**
 * @description Serwis odpowiedzialny za obsluge uzytkownika tj logowanie, wylogowanie, rejestracja, przechowywanie tokenu nadanego po logowaniu.
 * @param $http
 */
function userService($http, $state) {
    var user = null;
    var token = null;

    this.login = function (passedUser) {
        $http.post("/user", passedUser).then(function (received) {
            user = received.data.user;
            token = received.data.token;
            //TODO: storowanie tokena
            //przekierowanie do cms po pomyslnym zalogowaniu
            $state.go("cms");
        }, function (err) {
            sweetAlert("Logowanie nieudane!", err.data.message, "error");
        });
    };

    this.register = function (passedUser) {
        $http.post("/user/register", passedUser).then(function (received) {
            swal("Rejestracja pomyślna!", "Użytkownik " + received.data.login + " zarejestrowany.", "success")
        }, function (err) {
            sweetAlert("Rejestracja nieudana!", err.data.message, "error");
        });
    };
    this.logout = function () {
        user = null;
        token = null;
        // TODO: usun token z local storage
    };
    this.getUser = function () {
        if (user) {
            return user;
        } else {
            return null;
        }
    }

}
