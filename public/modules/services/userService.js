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
        self.setUser(undefined);
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
        self.localStorage.remove("token");
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
        if (user) {
            self.user = user;
        } else {
            self.user = {
                groups: ['guest']
            };
        }
        self.$rootScope.$broadcast('userObjectChange', user);
        self.$rootScope.$emit('userObjectChange', user);
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
                self.$l.debug(received);
                self.setUser(received.data.user);
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
        self.setUser(undefined);
    };


    fetchAllUsers() {
        var promise = $q.defer();
        $rootScope.$evalAsync(function () {
            self.$http.post("/user/all").then(function (allUsers) {
                promise.resolve(allUsers.data);
            }, function (err) {
                promise.reject(err);
            });
        });
        return promise.promise;
    };


    loginByToken(token) {
        let self = this;
        self.$l.debug("Login by token");
        var promise = self.$q.defer();
        self.$http.post('/user/token', {"token": token}).then(
            // SUCCESS
            function (data) {
                self.setUser(data.data);
                promise.resolve(data);
                // ERROR
            }, function (err) {
                self.removeToken();
                promise.resolve(err);
            });

        return promise.promise;

    }

    editUser(user, callback) {
        let self = this;
        self.$l.debug("Edit user");
        self.$http.post("/user/update", {user: user}).then(
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
        self.$http.post("/user/remove", {
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

    /**
     *  Checks if user has passed right
     * @param rightsToCheck
     */
    hasRight(rightsToCheck) {
        let self = this;
        let hasRight = true;

        self.$l.debug("Rights To Chrck");

        for (let i = 0; i < rightsToCheck.length; i++) {
            let item = rightsToCheck[i];
            if (self.user.groups.indexOf(item) === -1) {
                hasRight = false;
                break;
            }
        }
        return hasRight;
    }

}
export default UserService;