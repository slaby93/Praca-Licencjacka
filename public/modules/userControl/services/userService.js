/* global CryptoJS */

angular.module("userModule").service("userService", ["$http", "$state",'$log',"localStorageService", "$q", "$rootScope", '$uibModal', userService]);
/**
 * @description Serwis odpowiedzialny za obsluge uzytkownika tj logowanie, wylogowanie, rejestracja, przechowywanie tokenu nadanego po logowaniu.
 * @param $http
 */
function userService($http, $state,$log, localStorageService, $q, $rootScope, $uibModal) {
    var self = this;
    self.$l= $log;
    var user = null;
    var token = null;

    self.login = function (passedUser) {
        var obietnica = $q.defer();
        $http.post("/user", passedUser).then(function (received) {
            obietnica.resolve(received);
            user = received.data.user;
            token = received.data.token;
            localStorageService.set("token", token);
            console.log(3);
        }, function (err) {
            obietnica.reject(err);
            /*sweetAlert("Logowanie nieudane!", err.data.message, "error");*/
        });
        return obietnica.promise;
    };

    self.openLoginRegister = function () {
        //self.$l.debug("TEST");
        var modalInstance = $uibModal.open(
            {
                templateUrl: 'modules/userControl/views/login_registerView.html',
                controller: 'login_registerCtrl',
                backdrop: "static"
            }
        );

        modalInstance.result.then(function (is) {
            $scope.isLogged = is;
        }, function () {
        });
    };

    self.register = function (passedUser) {

        var obietnica = $q.defer();
        $rootScope.$evalAsync(function () {
            $http.post("/user/register", passedUser).then(function (received) {
                obietnica.resolve(received);
            }, function (err) {
                obietnica.reject(err);
            });
        });
        return obietnica.promise;

    };
    self.logout = function () {
        console.log("logout");
        user = null;
        token = null;
        localStorageService.remove("token");
    };
    self.getUser = function () {
        if (user) {
            return user;
        } else {
            return null;
        }
    };

    self.fetchAllUsers = function () {
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


    self.loginByToken = function (tken) {
        if (!tken) {
            return;
        }
        var odroczenie = $q.defer();

        $rootScope.$applyAsync(function () {
            $http.post('/user/token', {"token": tken}).then(
                // SUCCESS
                function (data) {
                    user = data.data;
                    token = tken;
                    odroczenie.resolve(user);
                    // ERROR
                }, function (err) {
                    localStorageService.remove("token");
                    odroczenie.resolve(err);
                });
        });

        return odroczenie.promise;

    }

    self.editUser = function (user, callback) {
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

    self.removeUser = function (user, callback) {
        $http.post("/user/remove", {
            user: user
        }).then(function (message) {
            if (callback) {
                callback(message);
            }
        }, function (error) {
            console.error(error);
            if (callback) {
                callback(error);
            }
        });
    };

    self.getToken = function () {
        return token;
    };
}
