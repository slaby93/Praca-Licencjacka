/* global CryptoJS */

angular.module("userModule").service("userService", ["$http", userService]);
/**
 * @description Serwis odpowiedzialny za obsluge uzytkownika tj logowanie, wylogowanie, rejestracja, przechowywanie tokenu nadanego po logowaniu.
 * @param $http
 */
function userService($http) {
    var user;

    this.register = function(passedUser) {
        $http.post("/user/register", passedUser).then(function(data) {
            swal("Rejestracja pomyślna!", "Użytkownik " + data.login + " zarejestrowany.", "success")
        }, function(err) {
            console.log(err);
            sweetAlert("Rejestracja nieudana!", err.data.message, "error");
        });
    }

}