/* global CryptoJS */

angular.module("userModule").service("userService", ["$http", userService]);

function userService($http) {

    var bcrypt = dcodeIO.bcrypt;

    // token ktory otrzymany jest po zalogowaniu się
    var token = null;

    /**
     * Trzeba tutaj dodać bcrypta
     * @param {type} login
     * @param {type} password
     * @returns {undefined}
     */
    this.login = function (login, password) {
        bcrypt.hash(password, 12, function (err, hash) {
            $http.post("/user/", {
                "hash": hash,
            }).success(
                function (answer) {
                    console.log(answer);
                });
        });
    };
}