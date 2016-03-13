/* global CryptoJS */

/**
 * @description Serwis odpowiedzialny za obsluge uzytkownika tj logowanie, wylogowanie, rejestracja, przechowywanie tokenu nadanego po logowaniu.
 * @param $http
 */
class UserService {
    constructor($log, $http, $state, localStorageService, $q, $rootScope) {
        let self = this;
        self.$l = $log;
        self.$http = $http;
        self.$state = $state;
        self.$q = $q;
        self.localStorage = localStorageService;
        self.$rootScope = $rootScope;

    }

    //

    login(passedUser) {
        let self = this;
        let obietnica = self.$q.defer();
        self.$http.post("/user", passedUser).then((received) => {
            obietnica.resolve(received);
            user = received.data.user;
            token = received.data.token;
            self.localStorage.set("token", token);
        }, (err) => {
            obietnica.reject(err);
            /*sweetAlert("Logowanie nieudane!", err.data.message, "error");*/
        });
        return obietnica.promise;
    };

    openLoginRegister() {
        let self = this;
    };

    register(passedUser) {
        let self = this;
        var obietnica = self.$q.defer();
        self.$rootScope.$evalAsync(() => {
            self.$http.post("/user/register", passedUser).then((received) => {
                obietnica.resolve(received);
            }, (err) => {
                obietnica.reject(err);
            });
        });
        return obietnica.promise;

    };

    logout() {
        let self = this;
        console.log("logout");
        user = null;
        token = null;
        self.localStorageService.remove("token");
    };

    getUser() {
        if (user) {
            return user;
        } else {
            return null;
        }
    };

    fetchAllUsers() {
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


    loginByToken(tken) {
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

    editUser(user, callback) {
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

    removeUser(user, callback) {
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

    getToken() {
        return token;
    };

}
export default UserService;