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

        //private function?
        var sendSystemMessage = function(content, dateSent, topic, recipientList, toAll) {
            let self = this;
            let message = {
                "authorID" :  "000000000000000000000000",
                "content" : content,
                "dateSent" : dateSent,
                "topic" : topic
            };
            return new Promise((resolve,reject)=>{
                let matchPassed = true;
                if(!toAll) {
                    _.forEach(recipientList, (value, key) => {
                        if (!recipientList[key].match(/^[0-9a-fA-F]{24}$/)) {
                            matchPassed = false;
                        }
                    });
                }
                if(matchPassed){
                    self.$http({
                        method: 'POST',
                        url: '/user/sendMessage',
                        data: {message: message, recipientList: recipientList, toAll: toAll}
                    }).then(
                        // SUCCESS
                        function (data) {
                            self.$l.debug("Pomyślnie przesłano wiadomość od użytkownika o id: " + message.authorID + " do użytkowników ", recipientList);
                            resolve("ok");
                            // ERROR
                        }, function (err) {
                            self.$l.debug("Porazka podczas przesyłania Wiadomości od użytkownika o id: " + message.authorID + " do użytkowników ", recipientList);
                            reject("error");
                        }
                    );
                }else{
                    self.$l.debug("Blad! Nie mozna skonwertowac podanych id do ObjectID (niepoprawne ID)");
                    reject("error");
                }
            });
        }


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
     * @functionality:  it returns the radius setting of the UserService user
     * @returns {Promise<T>|Promise}
     *      the resolved data is the (int) radius that user set in the settings
     */
    getRadius(){
        let self = this;
        return new Promise((resolve,reject)=> {
            self.$http({
                method: 'POST',
                url: '/user/getRadiusById',
                data: {id : self.user.id}
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
     */
    sendMessage(authorID, content, dateSent, topic, recipientList) {
        let self = this;
        let message = {
            "authorID" : authorID,
            "content" : content,
            "dateSent" : dateSent,
            "topic" : topic
        };
        return new Promise((resolve,reject)=>{
            let matchPassed = true;
            _.forEach(recipientList, (value, key) => {
                if(!recipientList[key].match(/^[0-9a-fA-F]{24}$/)){
                    matchPassed = false;
                }
            });
            if (matchPassed && message.authorID != "system" && !message.authorID.match(/^[0-9a-fA-F]{24}$/))  matchPassed = false;

            if(matchPassed){
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
                        reject("error");
                    }
                );
            }else{
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


    sendMessageFromSystem(content, dateSent, topic, recipientList, toAll){
        let self = this;
        return new Promise((resolve,reject)=>{
            if(self.hasRight(["admin"])){
                self.sendSystemMessage(content, dateSent, topic, recipientList, toAll).then((resp) => {
                    resolve(resp);
                });
            }else  {
                self.$l.debug("Brak uprawnień do wysyłania wiadomości!");
                reject("error");
            }
        });
    }



    removeMessage(messageID) {
        let self = this;
        return new Promise((resolve,reject)=>{

            if(messageID.match(/^[0-9a-fA-F]{24}$/)){
                self.$http({
                    method: 'POST',
                    url: '/user/removeMessage',
                    data: {messageID: messageID, userID : self.user.id}
                }).then(
                    // SUCCESS
                    function (data) {
                        if(data.data == "nochange"){
                            self.$l.debug("Nie udało się (wiadomość nie istnieje) usunąć wiadomości o id ", messageID);
                            resolve("nochange");
                        }else {
                            self.$l.debug("Pomyślnie usunięto wiadomość o id ", messageID);
                            resolve("ok");
                        }
                        // ERROR
                    }, function (err) {
                        self.$l.debug("Błąd podczas usuwania wiadomości o id ", messageID);
                        reject("error");
                    }
                );
            }else{
                self.$l.debug("Blad! Nie mozna skonwertowac podanych id do ObjectID (niepoprawne ID)");
                reject("error");
            }
        });
    }


}
export default UserService;