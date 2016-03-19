/* global CryptoJS */

/**
 * @description Serwis odpowiedzialny za obsluge uzytkownika tj logowanie, wylogowanie, rejestracja, przechowywanie tokenu nadanego po logowaniu.
 * @param $http
 */
class UserService {
    constructor($log, $http, $state, localStorageService, $q, $rootScope, $mdDialog) {
        let self = this;
        self.$l = $log;
        self.$http = $http;
        self.$state = $state;
        self.$q = $q;
        self.localStorage = localStorageService;
        self.$rootScope = $rootScope;
        self.$mdDialog = $mdDialog;
    }

    /**
     * Login user by credentials. Return promise.
     * @param passedUser Promise
     * @returns {*}
     */
    login(passedUser) {
        let self = this;
        let promise = self.$q.defer();
        self.$http.post("/user", passedUser).then((received) => {
            promise.resolve(received);
            self.setUser(received.data.user);
            self.setToken(received.data.token);
        }, (err) => {
            promise.reject(err);
        });
        return promise.promise;
    };

    /**
     * Set token in local storage
     * @param token
     */
    setToken(token) {
        let self = this;
        self.localStorage.set("token", token);
    }

    /**
     * Remove token from local storage
     */
    removeToken() {
        let self = this;
        self.localStorageService.remove("token");
    }

    /**
     * Returns token from local storage
     * @returns {*|token|null}
     */
    getToken() {
        let self = this;
        return self.localStorage.get("token");
    }

    /**
     *  Set user object in service
     * @param user
     */
    setUser(user) {
        let self = this;
        self.user = user;
    }

    /**
     * Returns user object from service
     * @returns {*|modalInstance.resolve.user|modalInstance.resolve."user"|null}
     */
    getUser() {
        let self = this;
        return self.user;
    }

    /**
     * Register new user in server. Returns promise.
     * @param passedUser
     */
    register(passedUser) {
        let self = this;
        var promise = self.$q.defer();
        self.$rootScope.$evalAsync(() => {
            self.$http.post("/user/register", passedUser).then((received) => {
                promise.resolve(received);
                self.setToken(received.data.token);
            }, (err) => {
                promise.reject(err);
            });
        });
        return promise.promise;
    };

    logout() {
        let self = this;
        self.removeToken();
        self.localStorageService.remove("token");
    };


    fetchAllUsers() {
        var promise = $q.defer();
        $rootScope.$evalAsync(function () {
            $http.post("/user/all").then(function (allUsers) {
                promise.resolve(allUsers.data);
            }, function (err) {
                promise.reject(err);
            });
        });
        return promise.promise;
    };


    loginByToken(tken) {
        let self = this;
        self.$l.debug("Login by token");
        if (!tken) {
            return;
        }
        var promise = $q.defer();

        $rootScope.$applyAsync(function () {
            $http.post('/user/token', {"token": tken}).then(
                // SUCCESS
                function (data) {
                    user = data.data;
                    token = tken;
                    promise.resolve(user);
                    // ERROR
                }, function (err) {
                    localStorageService.remove("token");
                    promise.resolve(err);
                });
        });

        return odroczenie.promise;

    }

    editUser(user, callback) {
        let self = this;
        self.$l.debug("Edit user");
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
        let self = this;
        self.$l.debug("Remove user");
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

    /**
     * Pop up login/register modal on screen.
     */
    showLoginModal() {
        let self = this;
        let parentElement = angular.element(document.body);
        self.$mdDialog.show({
            parent: parentElement,
            templateUrl: 'modules/mainApp/views/loginModal.html',
            controller: 'LoginModalController',
            controllerAs: 'loginModalCtrl'
        });
    }

}
export default UserService;