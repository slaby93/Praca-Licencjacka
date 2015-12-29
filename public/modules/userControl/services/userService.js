/* global CryptoJS */

angular.module("userModule").service("userService", ["$http", "$state", "localStorageService", "$q", "$rootScope", userService]);
/**
 * @description Serwis odpowiedzialny za obsluge uzytkownika tj logowanie, wylogowanie, rejestracja, przechowywanie tokenu nadanego po logowaniu.
 * @param $http
 */
function userService($http, $state, localStorageService, $q, $rootScope) {

    var user = null;
    var token = null;

    this.login = function (passedUser) {
        $http.post("/user", passedUser).then(function (received) {
            user = received.data.user;
            token = received.data.token;
            //przekierowanie do cms po pomyslnym zalogowaniu
            localStorageService.set("token", token);
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
        localStorageService.remove("token");
    };
    this.getUser = function () {
        if (user) {
            return user;
        } else {
            return null;
        }
    };

    this.fetchAllUsers = function () {
        var odroczenie = $q.defer();
        $rootScope.$evalAsync(function () {
            $http.post("/user/all").then(function (allUsers) {
                odroczenie.resolve(allUsers.data);
            }, function (err) {
                odroczenie.reject(err);
            });
        });
        return odroczenie.promise;
    };


    this.loginByToken = function (token) {
        if (!token) {
            return;
        }
        var odroczenie = $q.defer();

        $rootScope.$applyAsync(function () {
            $http.post('/user/token', {"token": token}).then(
                // SUCCESS
                function (data) {
                    user = data.data;
                    odroczenie.resolve(user);
                    // ERROR
                }, function (err) {
                    localStorageService.remove("token");
                    odroczenie.resolve(err);
                });
        });

        return odroczenie.promise;

    }

    this.editUser = function (user, callback) {
        $http.post("/user/update", {user: user}).then(
            function (message) {
                callback();
                return;
            },
            function (error) {
                console.error(error);
                swal({
                    title: "Błąd",
                    text: "Podczas komunikacji z serwerem wystąpił błąd.",
                    type: "warning",
                    //showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "Zamknij",
                }, function () {
                    callback();
                });

            }
        )
    };

    this.removeUser = function (user, callback) {
        $http.post("/user/remove", {
            user: user
        }).then(function (message) {
            if (callback) {
                callback(message);
            }
        }, function (error) {
            console.log(error);
            if (callback) {
                callback(error);
            }
        });
    };
}
