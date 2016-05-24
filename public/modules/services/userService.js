/* global CryptoJS */

/**
 * @description Serwis odpowiedzialny za obsluge uzytkownika tj logowanie, wylogowanie, rejestracja, przechowywanie tokenu nadanego po logowaniu.
 * @param $http
 */
import User from 'Classes/User';
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
        self.user = new User();
        self.watchUserObject();
    }

    watchUserObject() {
        let self = this;
        self.$rootScope.$watch(()=> {
            return self.user;
        }, (newValue)=> {

        }, true);
    }

    /**
     * Login user by credentials. Return promise.
     * @param passedUser Promise
     * @returns {*}
     */
    login(passedUser) {
        let self = this;
        return new Promise((resolve, reject)=> {
            self.$http({
                method: 'POST',
                url: '/user',
                data: {passedUser: passedUser},
                headers: {skipAuthorization: true}
            }).then((received) => {
                resolve(received);
                self.setUser(new User(
                    received.data.user._id,
                    received.data.user.login,
                    received.data.user.groups,
                    received.data.user.localization));
                self.token = received.data.token;
            }, (err) => {
                reject(err);
            });
            if (self.$state.current.name == "introduction")  self.$state.go("app.home");
        });
    };

    /**
     * Returns token
     * @returns {*}
     */
    get token() {
        let self = this;
        if (!self._token) {
            self._token = self.localStorage.get('token');
        }
        return self._token;
    }

    /**
     * Saves token to service variable and localStorage.
     * If value is evaluated to false removes token from localStorage.
     * @param token
     */
    set token(token) {
        let self = this;
        self._token = token;
        if (token) {
            self.localStorage.add('token', token);
        } else {
            self.localStorage.remove('token', token);
        }

    }


    setUser(user) {
        let self = this;
        if (user.isLogged() && !self.user.isLogged()) {
            // login
            _.forEach(self.user.localization, (item)=> {
                user.localization.push(item);
            });
            self.user = user;
            self.saveUser();
        } else if (!user.isLogged() && self.user.isLogged()) {
            // logout
            user.localization = [_.last(self.user.localization)];
            self.user = user;
        }


    }

    addUserLocalization(object) {
        let self = this;
        self.user.localization.push(object);
        // if user is logged save new data to database
        if (self.user.isLogged()) {
            self.saveUser();
        }
    }

    getLastLocation() {
        let self = this;
        return _.last(self.user.localization);
    }

    /**
     * Register new user in server. Returns promise.
     * @param passedUser
     */
    register(passedUser) {
        let self = this;
        return new Promise((resolve, reject)=> {
            self.$rootScope.$evalAsync(() => {
                self.$http({
                    method: 'POST',
                    url: '/user/register',
                    data: {passedUser: passedUser},
                    headers: {skipAuthorization: true}
                }).then((received) => {
                    resolve(received);
                    self.setUser(new User(received.data.user._id, received.data.user.login, received.data.user.groups));
                    self.token = received.data.token;
                }, (err) => {
                    reject(err);
                });
            });
        });
    };

    logout() {
        let self = this;
        self.setUser(new User());
        self.token = undefined;
        self.$state.go("login");
    };

    loginByToken() {
        let self = this;
        return new Promise((resolve, reject)=> {
            self.$http({
                method: 'POST',
                url: '/user/token',
                data: {token: self.token},
                headers: {skipAuthorization: true}
            }).then(
                // SUCCESS
                function (data) {
                    self.setUser(new User(data.data._id, data.data.login, data.data.groups, data.data.localization));
                    resolve(data);
                    // ERROR
                }, function (err) {
                    self.token = undefined;
                    resolve(err);
                }
            );
        });

    }

    /**
     * Pop up login/register modal on screen.
     */
    showLoginModal() {
        let self = this;
        let parentElement = angular.element(document.body);
        self.$mdDialog.show({
            parent: parentElement,
            templateUrl: 'modules/mainApp/login/loginModal.html',
            controller: 'LoginModalController',
            controllerAs: 'loginModalCtrl'
        });
    }

    /**
     *  Checks if user has passed right
     * @param rightsToCheck
     * for arrays declared like:  visibility: ["user", "admin"]  pass visibility[0], for all other just pass the ["user","admin"]
     */
    hasRight(rightsToCheck) {
        let self = this;
        let hasRight = false;
        for (let i = 0; i < rightsToCheck.length; i++) {
            if (self.user.groups.indexOf(rightsToCheck[i]) !== -1) {
                hasRight = true;
                break;
            }
        }
        return hasRight;
    }

    /**
     * Saves to databse new user inforamtions eg new localization etc
     */
    saveUser() {
        let self = this;
        self.$http({
            method: "POST",
            url: "/user/updateBasic",
            data: {user: self.user}
        });
    }

    refreshUser() {

    }


    findBasicUserInfoById(idArray) {
        let self = this;
        return new Promise((resolve, reject)=> {
            self.$http({
                method: 'POST',
                url: '/user/findBasicUserInfoById',
                data: {idArray: idArray},
                headers: {skipAuthorization: false}
            }).then(
                // SUCCESS
                function (data) {
                    self.$l.debug("Oto wyszukane podstawowe dane szukanych uzytkownikow: ", data.data.docs);
                    resolve(data);
                    // ERROR
                }, function (err) {
                    self.$l.debug("Porazka podczas wyszukiwania podstawowych danych szukanych uzytkownikow");
                    reject(err);
                }
            );
        });
    }


    getRadiusById(id){
        let self = this;
        return new Promise((resolve,reject)=> {
           if (id.match(/^[0-9a-fA-F]{24}$/)) {
                self.$http({
                    method: 'POST',
                    url: '/user/getRadiusById',
                    data: {id : id}
                }).then(
                    // SUCCESS
                    function (data) {
                        if (data.data.docs.length == 0){
                            self.$l.debug("Nie można pobrać radiusu - podany użytkownik nie istnieje!");
                            resolve("error");
                        } else {
                            self.$l.debug("Pobrano radius wynoszący ",data.data.docs[0].settings.radius);
                            resolve(data.data.docs[0].settings.radius);
                        }
                        // ERROR
                    }, function (err) {
                        self.$l.debug("Porazka podczas pobierania radiusu");
                        resolve("error");
                    }
                );
            }else{
                self.$l.debug("Blad! Nie mozna skonwertowac podanego id do ObjectID (niepoprawne ID)!");
                reject("error");
            }
        });




    }

}
export default UserService;