/* global CryptoJS */

/**
 * @description Serwis odpowiedzialny za obsluge uzytkownika tj logowanie, wylogowanie, rejestracja, przechowywanie tokenu nadanego po logowaniu.
 * @param $http
 */
import User from 'Classes/User';
class UserService {

    constructor($log, $http, $state, localStorageService, $q, $rootScope, $mdDialog, $window) {
        let self = this;
        self.$l = $log;
        self.$http = $http;
        self.$state = $state;
        self.$q = $q;
        self.localStorage = localStorageService;
        self.$rootScope = $rootScope;
        self.$mdDialog = $mdDialog;
        self.$window = $window;
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
        self.$l.debug("LOGIN");
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
                    received.data.user.localization,
                    received.data.user.email
                ));
                console.log("RECEIVED", received)
                self.loginToNudget(received.data.user._id,
                    received.data.user.login, received.data.user.email);
                self.token = received.data.token;
            }, (err) => {
                reject(err);
            });
            if (self.$state.current.name == "introduction")  self.$state.go("center");
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
        self.reload();
    };

    reload() {
        let self = this;
        self.$window.location.reload();
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
                    self.loginToNudget(data.data._id, data.data.login, data.data.email);
                    resolve(data);
                    // ERROR
                }, function (err) {
                    self.token = undefined;
                    resolve(err);
                }
            );
        });

    }

    loginToNudget(id, login, email) {
        let self = this;
        self.$l.debug("LOGIN TO NUDGET", id, login, email);
        nudgespot.identify(email, {login: login, id: id, email: email}, (msg)=> {
            console.log("MSG", msg);
        }); //Just email as an identifier
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
     * Pop up avatar upload modal on screen.
     */
	showAvatarUploadModal() {
        let self = this;
        let parentElement = angular.element(document.body);
        self.$mdDialog.show({
            parent: parentElement,
            templateUrl: 'modules/mainApp/upload/avatarUploadModal.html',
            controller: 'UploadModalController',
            controllerAs: 'uploadModalCtrl'
        });
    }

    /**
     * Pop up photo upload modal on screen.
     */
	showPhotoUploadModal() {
        let self = this;
        let parentElement = angular.element(document.body);
        self.$mdDialog.show({
            parent: parentElement,
            templateUrl: 'modules/mainApp/upload/photoUploadModal.html',
            controller: 'UploadModalController',
            controllerAs: 'uploadModalCtrl'
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


    /**
     *
     * @param userName - the userName passed to  ../account/userName/..
     * @functionality: checks if the userName passed to the function is an owner of the page (if he is the same as the logged user)
     * @warning: currently is has timeout to let the data appear in UserService (otherwise it's undefined and the function
     *           always return false)
     * @returns {Promise<T>|Promise}
     * resolves to true if the user is the owner of the page, false if he's not
     */
    isOwnPage(userName){
        let self = this;
        return new Promise((resolve, reject)=> {
            self.$window.setTimeout(function(){
                if(userName == self.user.login)  resolve(true);
                else resolve(false);
            }, 2000);
        });
    }




    /**
     *
     * @param idArray - array of users' id we want to get basic Info about
     * @functionality:  it returns users' basic info
     * @returns {Promise<T>|Promise}
     *      the resolved data is an array of {_id, login, name, surname} of the found users.
     */
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





    /**
     *
     * @param isFull (boolean) - if true, we will search for full info, if not - just for the neutral
     * @param userName (String) - user name we want to get neutral Info about
     * @functionality:  it returns user's info
     * @returns {Promise<T>|Promise}
     *      In case of the neutral info (for all people looking on an user profile)
     *          the resolved data is an array of {"login", "groups", "joinDate", "settings.isPrivate", "settings.description", "settings.name", "settings.surname"} of the found users.
     *      In case of the full info for the logged user only looking on his profile:
     *          the resolved data is an array of {"login", "email", "groups", "joinDate", "blacklist", "settings", "mailBox"} of the found user.
     */
    findUserInfoByLogin(userName, isFull) {
        let self = this;
        return new Promise((resolve, reject)=> {
            self.$http({
                method: 'POST',
                url: '/user/findUserInfoByLogin',
                data: {userName: userName, isFull: isFull},
                headers: {skipAuthorization: false}
            }).then(
                // SUCCESS
                function (data) {
                    if (data.data.docs.length == 0) {
                        reject("Szukany użytkownik nie istnieje!");
                    } else {
                        self.$l.debug("Oto wyszukane dane szukanego uzytkownika: ", data.data.docs[0]);
                        resolve(data);
                    }
                    // ERROR
                }, function (err) {
                    reject("Porazka podczas wyszukiwania danych szukanego uzytkownika");
                }
            );
        });
    }








    /**
     *
     * @functionality:  it returns the radius setting of the UserService user
     * @returns {Promise<T>|Promise}
     *      the resolved data is the (int) radius that user set in the settings
     */
    getRadius() {
        let self = this;
        return new Promise((resolve, reject)=> {
            self.$http({
                method: 'POST',
                url: '/user/getRadiusById',
                data: {id: self.user.id}
            }).then(
                // SUCCESS
                function (data) {
                    if (data.data.docs.length == 0) {
                        self.$l.debug("Nie można pobrać radiusu - podany użytkownik nie istnieje!");
                        resolve("error");
                    } else {
                        self.$l.debug("Pobrano radius wynoszący ", data.data.docs[0].settings.radius);
                        resolve(data.data.docs[0].settings.radius);
                    }
                    // ERROR
                }, function (err) {
                    self.$l.debug("Porazka podczas pobierania radiusu");
                    resolve("error");
                }
            );
        });
    }


    /**
     *
     * @param  userID (String)- id of the user we want to check if it is on a blacklist of an author of an event
     * @param  authorID (String) - id of an author of an event we want to check the blacklist of
     * @functionality:  if checks of an userID is on the blacklist of an authorID
     *      If the user is on the blacklist of an author, he cannot join his event
     *      It checks of the passed ids can be converted to ObjectId, if not  - it rejects to "error"
     *      If the user is on the blacklist, it resolves to true
     *      If the user is not on the blacklist, it resolves to false
     *      In case of a database error, it rejects to err
     * @returns {Promise<T>|Promise}
     */
    isOnBlacklist(userID, authorID) {
        let self = this;
        return new Promise((resolve,reject)=> {
            if (userID.match(/^[0-9a-fA-F]{24}$/) && authorID.match(/^[0-9a-fA-F]{24}$/)) {
                self.$http({
                    method: 'POST',
                    url: '/user/isOnBlacklist',
                    data: {userID: userID, authorID: authorID}
                }).then(
                    // SUCCESS
                    function (data) {
                        if(!data.data.isOnBlacklist) {
                            self.$l.debug("Uzytkownik "+userID + " nie znajduje się na blackliście użytkownika "+authorID);
                            resolve(false);
                        }else {
                            self.$l.debug("Uzytkownik "+userID + " znajduje się na blackliście użytkownika "+authorID);
                            resolve(true);
                        }
                        // ERROR
                    }, function (err) {
                        self.$l.debug("Porazka podczas sprawdzania blacklisty użytkownika ",authorID);
                        reject(err);
                    }
                );
            }else{
                self.$l.debug("Blad! Nie mozna skonwertowac podanych id do ObjectID (niepoprawne ID)!");
                reject("error");
            }
        });
    }





    /**
     *
     * @param authorID - the id of an author, String
     * @param content - the content of a message, String
     * @param dateSent - the date the message has been sent, Date
     * @param topic - the topic of the message, String
     * @param recipientList - the array of the recipients (each object must contain at least labeled _id parameter, the rest is optional)
     * @functionality:  it adds two messages to the mailBox - first one to all of the recipients (it does not contain recipientsList),
     *                  has "isReceivedBox" set to true (it will be in a received box)
     *                  the second to the author only and it contains recipientsList as well as "isReceivedBox" set to false (will be in a sent box)
     *                  It checks if the author id can be converted to ObjectId, as well if all the recipientList elements are valid
     * @warning: messages from the system will be sent from a special ObjectId("000000000000000000000000")
     * @returns {Promise<T>|Promise}
     *      resolves to"ok" if it succedded, "error" if not
     * @todo: CHECK IF THE USER IS NOT ON THE BLACKLIST OF THE AUTHOR
     */
    sendMessage(authorID, content, dateSent, topic, recipientList) {
        let self = this;
        let message = {
            "authorID": authorID,
            "content": content,
            "dateSent": dateSent,
            "topic": topic
        };
        return new Promise((resolve, reject)=> {
            let matchPassed = true;
            _.forEach(recipientList, (value, key) => {
                if (!recipientList[key].match(/^[0-9a-fA-F]{24}$/)) {
                    matchPassed = false;
                }
            });
            if (matchPassed && message.authorID != "system" && !message.authorID.match(/^[0-9a-fA-F]{24}$/))  matchPassed = false;

            if (matchPassed) {
                self.$http({
                    method: 'POST',
                    url: '/user/sendMessage',
                    data: {message: message, recipientList: recipientList}
                }).then(
                    // SUCCESS
                    function (data) {
                        self.$l.debug("Pomyślnie przesłano wiadomość od użytkownika o id: " + message.authorID + " do użytkowników ", recipientList);
                        resolve("ok");
                        // ERROR
                    }, function (err) {
                        self.$l.debug("Porazka podczas przesyłania Wiadomości od użytkownika o id: " + message.authorID + " do użytkowników ", recipientList);
                        reject(err);
                    }
                );
            } else {
                self.$l.debug("Blad! Nie mozna skonwertowac podanych id do ObjectID (niepoprawne ID)");
                reject("error");
            }
        });
    }


    /**
     *
     * @param content - the content of a message, String
     * @param dateSent - the date the message has been sent, Date
     * @param topic - the topic of the message, String
     * @param recipientList - the array of the recipients (each object must contain at least labeled _id parameter, the rest is optional)
     * @functionality:  it adds two messages to the mailBox - first one to all of the recipients (it does not contain recipientsList),
     *                  has "isReceivedBox" set to true (it will be in a received box)
     *                  the second to the author only and it contains recipientsList as well as "isReceivedBox" set to false (will be in a sent box)
     *                  It checks if all the recipientList elements are valid
     *                  It does not take authorID, as the message will be sent from a special ID of an user "system"
     *                  It is made private as we don't want normal users abusing that
     *                  If an admin wants to sent a message, consider using the function "sendMessageFromSystem"
     * @returns {Promise<T>|Promise}
     *      resolves to"ok" if it succedded, "error" if not
     */


    sendMessageFromSystem(content, dateSent, topic, recipientList, toAll) {
        let self = this;
        return new Promise((resolve, reject)=> {
            if (self.hasRight(["admin"])) {
                self._sendSystemMessage(content, dateSent, topic, recipientList, toAll).then((resp) => {
                    resolve(resp);
                });
            } else {
                self.$l.debug("Brak uprawnień do wysyłania wiadomości!");
                reject("error");
            }
        });
    }





    /**
     * For functionality, check sendMessageFromSystem function above
     * @returns {Promise|Promise<T>}
     * @private
     */
    //pseudo-private
    //@todo: MAKE THIS FUNCTION PRIVATE!!!!!!!!!!!!!!!!!
    _sendSystemMessage(content, dateSent, topic, recipientList, toAll) {
        let self = this;
        let message = {
            "authorID": "000000000000000000000000",
            "content": content,
            "dateSent": dateSent,
            "topic": topic
        };
        return new Promise((resolve, reject)=> {
            let matchPassed = true;
            if (!toAll) {
                _.forEach(recipientList, (value, key) => {
                    if (!recipientList[key].match(/^[0-9a-fA-F]{24}$/)) {
                        matchPassed = false;
                    }
                });
            } else recipientList = [];
            if (matchPassed) {
                self.$http({
                    method: 'POST',
                    url: '/user/sendMessage',
                    data: {message: message, recipientList: recipientList, toAll: toAll}
                }).then(
                    // SUCCESS
                    function (data) {
                        if (toAll)  self.$l.debug("Pomyślnie przesłano wiadomość systemową od użytkownika o id: " + message.authorID + " do wszystkich uzytkownikow!");
                        else  self.$l.debug("Pomyślnie przesłano wiadomość systemową od użytkownika o id: " + message.authorID + " do użytkowników ", recipientList);
                        resolve("ok");
                        // ERROR
                    }, function (err) {
                        if (toAll)  self.$l.debug("Porazka podczas przesyłania wiadomości systemowej od użytkownika o id: " + message.authorID + " do wszystkich użytkowników!");
                        else  self.$l.debug("Porazka podczas przesyłania wiadomości systemowej od użytkownika o id: " + message.authorID + " do użytkowników ", recipientList);
                        reject("error");
                    }
                );
            } else {
                self.$l.debug("Blad! Nie mozna skonwertowac podanych id do ObjectID (niepoprawne ID)");
                reject("error");
            }
        });
    }


    /**
     *
     * @param messageID - an id of the message wa want to delete
     * @functionality: it removes a message with messageID _id, from the currently logged in user.
     *      In case the message does not exist, it resolves to "nochange", in case of a success - to "ok" ,
     *      in case of database failure - to err, in case of id uncovertability - to "error"
     * @returns {Promise|Promise<T>}
     */
    removeMessage(messageID) {
        let self = this;
        return new Promise((resolve, reject)=> {

            if (messageID.match(/^[0-9a-fA-F]{24}$/)) {
                self.$http({
                    method: 'POST',
                    url: '/user/removeMessage',
                    data: {messageID: messageID, userID: self.user.id}
                }).then(
                    // SUCCESS
                    function (data) {
                        if (data.data == "nochange") {
                            self.$l.debug("Nie udało się (wiadomość nie istnieje) usunąć wiadomości o id ", messageID);
                            resolve("nochange");
                        } else {
                            self.$l.debug("Pomyślnie usunięto wiadomość o id ", messageID);
                            resolve("ok");
                        }
                        // ERROR
                    }, function (err) {
                        self.$l.debug("Błąd podczas usuwania wiadomości o id ", messageID);
                        reject(err);
                    }
                );
            } else {
                self.$l.debug("Blad! Nie mozna skonwertowac podanych id do ObjectID (niepoprawne ID)");
                reject("error");
            }
        });
    }





    /**
     *
     * @param  userID (String)- id of the user we want to add to blacklist
     * @functionality:  it adds the userID to the blacklist of the currently logged in user
     *      If the user is already on the blacklist, he cannot be added again
     *      It checks of the passed ids can be converted to ObjectId, if not  - it rejects to "error"
     *      If the user has been successfully added to the blacklist, it resolves to "ok",
     *      if the blacklisting user does not exist or or the user is already on the blacklist, it resolves to "nochange"
     *      In case of a database error, it rejects to err
     * @returns {Promise<T>|Promise}
     */
    addUserToBlacklist(userID) {
        let self = this;
        return new Promise((resolve,reject)=>{
            if (userID.match(/^[0-9a-fA-F]{24}$/) && userID != self.user.id) {
                self.$http({
                    method: 'POST',
                    url: '/user/addUserToBlacklist',
                    data: {userID: userID, authorID: self.user.id}
                }).then(
                    // SUCCESS
                    function (data) {
                        if (data.data == "nochange") {
                            self.$l.debug("Uzytkownik o id: " + userID + "nie zostal dodany do blacklity uzytkownika o id: " + self.user.id +
                                " ||użytkownik nie istnieje, autor nie istnieje bądź użytkownik znajduje się już na blackliście");
                            resolve("nochange");
                        } else {
                            self.$l.debug("Pomyślnie dołączono użytkownika: " + userID + " do blacklisty użytkownika o id: " + self.user.id);
                            resolve("ok");
                        }
                        // ERROR
                    }, function (err) {
                        self.$l.debug("Porazka podczas dodawania uzytkownika: " + userID + " do blacklisty użytkownika o id: " + self.user.id);
                        reject(err);
                    }
                );
            }else{
                self.$l.debug("Blad! Nie mozna skonwertowac podanego id do ObjectID (niepoprawne ID), bądź blacklistowany użytkownik jest blacklistującym!");
                reject("error");
            }
        });
    }





    /**
     *
     * @param userID (String) - the id of the banned user
     * @param days (int)- the time in days of the ban
     * @functionality: bans the user by switching it's unbanDate to currentDate + days
     *      If the user has not been found, resolves to "nochange", if the user has been banned - to "ok"
     *      In case of a database error, it rejects to err
     *      In case of the inconvertablity of the id, rejects to "error"
     * @returns {Promise<T>|Promise}
     */
    //@todo: it should also delete this user token from the storage! Check if the number is int and not float!
    banUser(userID, days) {
        let self = this;
        return new Promise((resolve,reject)=>{

            let date = new Date();
            date.setDate(date.getDate() + days);

            if (userID.match(/^[0-9a-fA-F]{24}$/)) {
                self.$http({
                    method: 'POST',
                    url: '/user/changeBanStatus',
                    data: {userID: userID, date: date}
                }).then(
                    // SUCCESS
                    function (data) {
                        if (data.data == "nochange") {
                            self.$l.debug("Nie znaleziono uzytkownika o id: " + userID);
                            resolve("nochange");
                        } else {
                            self.$l.debug("Uzytkownik o id: " + userID + " został zbanowany!");
                            resolve("ok");
                        }
                        // ERROR
                    }, function (err) {
                        self.$l.debug("Porażka podczas banowania uzytkownika o id: " + userID);
                        reject(err);
                    }
                );
            }else{
                self.$l.debug("Blad! Nie mozna skonwertowac podanego id do ObjectID (niepoprawne ID), bądź ilość dni jest niepoprawna");
                reject("error");
            }
        });
    }





    /**
     *
     * @param userID (String) - the id of the unbanned user
     * @functionality: unbans the user by switching it's unbanDate to currentDate
     *      If the user has not been found, resolves to "nochange", if the user has been banned - to "ok"
     *      In case of a database error, it rejects to err
     *      In case of the inconvertablity of the id, rejects to "error"
     * @returns {Promise<T>|Promise}
     */
    unbanUser(userID) {
        let self = this;
        return new Promise((resolve,reject)=>{
            let date = new Date();

            if (userID.match(/^[0-9a-fA-F]{24}$/)) {
                self.$http({
                    method: 'POST',
                    url: '/user/changeBanStatus',
                    data: {userID: userID, date: date}
                }).then(
                    // SUCCESS
                    function (data) {
                        if (data.data == "nochange") {
                            self.$l.debug("Nie znaleziono uzytkownik o id: " + userID);
                            resolve("nochange");
                        } else {
                            self.$l.debug("Uzytkownik o id: " + userID + " został odbanowany!");
                            resolve("ok");
                        }
                        // ERROR
                    }, function (err) {
                        self.$l.debug("Porażka podczas odbanowywania uzytkownika o id: " + userID);
                        reject(err);
                    }
                );
            }else{
                self.$l.debug("Blad! Nie mozna skonwertowac podanego id do ObjectID (niepoprawne ID), bądź ilość dni jest niepoprawna");
                reject("error");
            }
        });
    }




}
export default UserService;