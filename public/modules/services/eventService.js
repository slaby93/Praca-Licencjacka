/**
 * Created by piec on 3/22/2016.
 */
import SportEvent from 'Classes/SportEvent';
import Moment from 'moment';

class EventService {

    constructor($log, $http, $state, $q, UserService) {
        let self = this;
        self.$l = $log;
        self.$http = $http;
        self.$state = $state;
        self.$q = $q;
        self.UserService = UserService;

        self.defaultValues();
    }

    defaultValues() {
        let self = this;
    };




    /**
     *
     * @param passedEvent - in form of a filled SportEvent class object
     * @functionality sends a http request to server in order to add an user to the database
     * In case of an 'eventDate' < 'currentDate', it logs to console and resolves to 'error'
     * It checks if the authorID is convertable to ObjectID, and in case it is not, it resolves to "error"
     * In case of a success, it logs to console and resolves to data (which has a form: {"id": id}}
     **    where id is the string representation of the added document's id
     **    It also redirects the user to the newly added event's page like:  /#/app/event/[id]/
     * In case of a failure, it logs to console and resolves to err
     * @returns {Promise}
     *      resolves to "ok" if it succeeded, "error" if not
     */
    addEvent(passedEvent) {
        let self = this;
        return new Promise((resolve,reject)=> {
            if ((new Date(passedEvent.date)) <= (new Date())) {
                self.$l.debug("Blad podczas dodawania nowego eventu - nie mozna ustawic daty mniejszej niz dzisiejsza!");
                reject("error");
            }else if (!passedEvent.authorID.match(/^[0-9a-fA-F]{24}$/)) {
                self.$l.debug("Blad podczas dodawania nowego eventu - nie mozna skonwertowac ID autora do ObjectID!");
                reject("error");
            }else{
                self.$http({
                    method: 'POST',
                    url: '/event/addEvent',
                    data: {event: passedEvent}
                }).then(
                    // SUCCESS
                    function (data) {
                        self.$l.debug("Dodawanie nowego eventu powiodło się! Oto jego id: " + data.data.id);
                        self.$state.go(`app.event`, {eventID: data.data.id});
                        resolve("ok");
                        // ERROR
                    }, function (err) {
                        self.$l.debug("Porazka podczas dodawania nowego eventu!"+ $(err));
                        reject("error");
                    }
                );
            }
        });
    };





    /**
     *
     * @param id - in form of a String, it represents the id of an event to deactivate
     **     The string has to be convertable to ObjectId!
     *        date - in form of a Date object, it represents the current date
     * @functionality checks if the id is convertable to ObjectID
     *      and sends a http request to server in order to deactivate an event (make it not active) and also
     *      sets it's event date to currentDate to avoid situations when an user sets an event to 2099 and then disables it
     *      and then it would not be removed with >1yr old closed events.
     * In case of a success, it logs to console and resolves to data (which has a form: {"id": id}}
     * In case the id is structurally wrong (not convertable to ObjectID), it logs to console and resolves to "error"
     * In case of a failure, it logs to console and resolves to err
     * @returns {Promise}
     *      "ok" if it succeeded, "nochange" if the event does not exist or it has been already deactivated, "error" in case of an error
     * @userWhen  We want to forcefully deactivate an event (when closing an event by the creator or the admin).
     */
    deactivateById(id, authorID, date) {
        let self = this;
        return new Promise((resolve,reject)=> {
            if (id.match(/^[0-9a-fA-F]{24}$/) && authorID.match(/^[0-9a-fA-F]{24}$/)) {
                self.$http({
                    method: 'POST',
                    url: '/event/deactivateById',
                    data: {id: id, date: date}
                }).then(
                    // SUCCESS
                    function (data) {
                        if(data.data.docs.length > 0) {
                            self.$l.debug("Event o id: " + id + " został zdeaktywowany! Oto jego uczestnicy: ", data.data.docs);
                            self.$l.debug("Powinienes ich powiadomic o zamknieciu eventu!");
                            resolve("ok");
                        }else{
                            self.$l.debug("Event o id: " + id + " nie istnieje!");
                            resolve("nochange");
                        }
                        // ERROR
                    }, function (err) {
                        self.$1.debug("Porazka podczas deaktywacji eventu!");
                        reject("error");
                    }
                );
            }else{
                self.$l.debug("Blad! Nie mozna skonwertowac podanych id do ObjectID (niepoprawne ID)!");
                reject("error");
            }
        });
    };





    /**
     *
     * @functionality goes through database and checks if there are events, whose 'currentDate' > 'eventDate'
     *      and sets it's isActive to false
     * In case of a success, it logs to console and resolves to data (which has a form of an array: {"_id": id, "participants": participants}}
     **      where _id is an id of the deactivated event and the participants is an array of it's participants (having a form: {_id : id}
     **      where _id is an id of an user
     * In case of a failure, it logs to console and resolves to err
     * @returns {Promise}
     *      "ok" if it succeeded, "nochange" if there were no events to deactivate, "error" in case of an error
     * @todo: SHOULD NOTIFY ALL PARTICIPANTS ABOUT THE DEACTIVATION OF AN EVENT
     * @usedWhen it should fire every minute to ensure that the events in the database are as precise as possible
     */
    checkForEventsToDeactivate() {
        let self = this;
        return new Promise((resolve,reject)=> {
            self.$http({
                method: 'POST',
                url: '/event/checkForEventsToDeactivate',
                data: {}
            }).then(
                // SUCCESS
                function (data) {
                    if(data.data.docs.length > 0) {
                        self.$l.debug("Kontrola świeżości eventów zakończona pozytywnie! Oto uczestnicy eventow: ", data.data.docs.participants);
                        self.$l.debug("Powinienes ich powiadomic o zamknieciu eventow!");
                        self.$l.debug("Tak samo powiadom autora!: ",data.data.docs.authorID);
                        resolve("ok");
                    }else{
                        self.$l.debug("Kontrola świeżości eventów zakończona pozytywnie! Nie znaleziono żadnych eventów do deaktywacji!");
                        resolve("nochange");
                    }
                    // ERROR
                }, function (err) {
                    self.$l.debug("Porazka podczas kontroli świeżości eventów");
                    reject("error");
                }
            );
        });
    };





    /**
     *
     * @functionality goes through database and checks if there are events, whose are older than a year after an inactivation
     * In case of a success, it logs to console and resolves to data (which has a form of an array: {"_id": id, "participants": participants}}
     **      where _id is an id of the removed event and the participants is an array of it's participants (having a form: {_id : id}
     **      where _id is an id of an user
     * In case there were no deleted documents, it logs to console and resolves []
     * In case of a failure, it logs to console and resolves to err
     * @returns {Promise}
     *      "ok" if it succeeded, "nochange" if there were no events to remove, "error" in case of an error
     * @todo: SHOULD NOTIFY THE AUTHOR ABOUT DELETION OF AN EVENT
     * @usedWhen it should fire everyday to ensure that the archive events do not take too much space
     */
    cleanOld() {
        let self = this;
        return new Promise((resolve,reject)=> {
            self.$http({
                method: 'POST',
                url: '/event/cleanOld',
                data: {}
            }).then(
                // SUCCESS
                function (data) {
                    if (data.data.docs.length == 0) {
                        self.$l.debug("Nie znaleziono eventów do usunięcia!");
                        resolve("nochange");
                    } else {
                        self.$l.debug("Usunięto stare, zakończone eventy. Ich dokumenty to: ", data.data.docs);
                        resolve("ok");
                    }
                    // ERROR
                }, function (err) {
                    self.$l.debug("Porazka podczas usuwania starych, zakończonych eventów!");
                    reject("error");
                }
            );
        });
    };





    /**
     * @params  (String) id - id of an event we add the user into
     *          (String) author - login of an author to check if we aren't on it's blacklist
     *          (String) userID - id of an user we add to the event
     * @functionality tries to add an user into the event's participants
     *      It checks if the passed ids are correct
     *      An user cannot be added to inactive event (it is checked inside mongodb)
     *      An user cannot be added to full event (it is checked inside mongodb)
     *      An user cannot be added if it's the author of the event (it is checked inside function)
     * In case of a success, it logs to console and resolves to data "ok"
     * In case the query does not modify anything (event does not exist/is inactive/is full/user is registered) it logs to console and resolves to "nochange"
     * In case of a failure, it logs to console and resolves to err
     * @returns {Promise}
     *      "ok" if it succeeded, "nochange" if the event does not exist, is not active, is full, the user is already registerd,
     *      "error" in case of an error
     * @todo: CHECK IF THE USER IS NOT ON THE BLACKLIST OF THE AUTHOR
     */
    joinEvent(id, authorID, userID) {
        let self = this;
        return new Promise((resolve,reject)=>{
            if (id.match(/^[0-9a-fA-F]{24}$/) && userID.match(/^[0-9a-fA-F]{24}$/) && authorID != self.UserService.user.id && authorID.match(/^[0-9a-fA-F]{24}$/)) {
                self.$http({
                    method: 'POST',
                    url: '/event/joinEvent',
                    data: {id: id, userID: userID}
                }).then(
                    // SUCCESS
                    function (data) {
                        if (data.data == "nochange") {
                            self.$l.debug("Uzytkownik o id: " + userID + " nie zostal dodany do wydarzenia o id: " + id +
                                " ||wydarzenie nie istnieje/jest zakonczone/jest przepelnione/uzytkownik jest juz zapisany");
                            resolve("nochange");
                        } else {
                            self.$l.debug("Pomyślnie dołączono użytkownika: " + userID + " do wydarzenia o id: " + id);
                            resolve("ok");
                        }
                        // ERROR
                    }, function (err) {
                        self.$l.debug("Porazka podczas dodawania uzytkownika: " + userID + " do wydarzenia o id: " + id);
                        reject("error");
                    }
                );
            }else{
                self.$l.debug("Blad! Nie mozna skonwertowac podanych id do ObjectID (niepoprawne ID), bądź dodawany użytkownik jest autorem wydarzenia!");
                reject("error");
            }
        });
    }





    /**
     * @params  (String) id - id of an event we add the user into
     *          (String) userID - id of an user we remove from the event
     * @functionality tries to remove from user from the event's participants
     *      An user cannot be removed from inactive event (it is checked inside mongodb)
     *      It checks if the passed ids are correct
     * In case of a success, it logs to console and resolves to data "ok"
     * In case the query does not modify anything (event does not exist/is inactive) it logs to console and resolves to "nochange"
     * In case of a failure, it logs to console and resolves to err
     * @returns {Promise}
     *      "ok" if it succeeded, "nochange" if the event does not exist or is not active, "error" in case of an error
     */
    kickUser(id, authorID, userID) {
        let self = this;
        return new Promise((resolve,reject)=> {
            if (id.match(/^[0-9a-fA-F]{24}$/) && userID.match(/^[0-9a-fA-F]{24}$/) && authorID.match(/^[0-9a-fA-F]{24}$/)) {
                self.$http({
                    method: 'POST',
                    url: '/event/kickUser',
                    data: {id: id, userID: userID}
                }).then(
                    // SUCCESS
                    function (data) {
                        if (data.data == "nochange") {
                            self.$l.debug("Uzytkownik o id: " + userID + " nie zostal wyrzucony z wydarzenia o id: " + id +
                                " ||wydarzenie nie istnieje/jest zakonczone");
                            resolve("nochange");
                        } else {
                            self.$l.debug("Pomyślnie wyrzucono użytkownika: " + userID + " z wydarzenia o id: " + id);
                            resolve("ok");
                        }
                        // ERROR
                    }, function (err) {
                        self.$l.debug("Porazka podczas usuwania uzytkownika: " + userID + " z wydarzenia o id: " + id);
                        reject("error");
                    }
                );
            }else{
                self.$l.debug("Blad! Nie mozna skonwertowac podanych id do ObjectID (niepoprawne ID)!");
                reject("error");
            }
        });
    }





    /**
     * @params  (String) id - id of an event we want to remove
     * @functionality tries to forcefully remove an event
     * It checks if the id is valid
     * In case of a success, it logs to console and resolves to {"_id" : id, "participants" : participants}
     *      where _id is an id of the deleted event and participants is an array of participants of a format {"_id" : id}
     *      where _id is an id of the user participating in an event
     * In case of a success, it logs to console and resolves to data
     * In case of a failure, it logs to console and resolves to err
     * @returns {Promise}
     *      "ok" if it succeeded, "nochange" if there were no events to remove, "error" in case of an error
     * @todo: notify all users of the deleted event about that fact, as well as the author
     * @usedWhen:  only for admin, should be used in special circumstances (e.g. when the event offends the law or people)
     */
    remove(id, authorID) {
        let self = this;
        return new Promise((resolve,reject)=> {
            if (id.match(/^[0-9a-fA-F]{24}$/) && authorID.match(/^[0-9a-fA-F]{24}$/)) {
                self.$http({
                    method: 'POST',
                    url: '/event/remove',
                    data: {id: id}
                }).then(
                    // SUCCESS
                    function (data) {
                        if(data.data.docs.length > 0) {
                            self.$l.debug("Event o id: " + id + " został usuniety. Oto uczestnicy eventu: ", data.data.docs);
                            self.$l.debug("Powinienes ich powiadomic o usunieciu eventu!");
                            self.$l.debug("Tak samo autora!");
                            resolve("ok");
                        }else{
                            self.$l.debug("Event o id: " + id + " nie istnieje!");
                            resolve("nochange");
                        }
                        // ERROR
                    }, function (err) {
                        self.$l.debug("Porazka podczas usuwania eventu!");
                        reject(err);
                    }
                );
            }else{
                self.$l.debug("Blad! Nie mozna skonwertowac podanego id do ObjectID (niepoprawne ID)!");
                reject("error");
            }
        });
    }





    /**
     * @params  (String) userID - id of an user
     * @params  (boolean) isActive - determines if we want to search for active or inactive events (current or archival)
     * @functionality finds all events organized by the passed user name, active or inactive
     * In case of a success, it logs to console and resolves to array of events, sorted by date in an ascending order
     * In case of a failure, it logs to console and resolves to err
     * @returns {Promise}
     *      full event Info array of event organized by an user if it succeeded, err in case of an error
     */
    findByUser(userID, isActive) {
        let self = this;
        return new Promise((resolve,reject)=> {
            if (userID.match(/^[0-9a-fA-F]{24}$/)) {
                self.$http({
                    method: 'POST',
                    url: '/event/findByUser',
                    data: {userID: userID, isActive: isActive}
                }).then(
                    // SUCCESS
                    function (data) {
                        if(data.data.docs.length == 0) {
                            self.$l.debug("Nie znaleziono żadnych wydarzeń użytkownika: " + userID);
                            reject("error");
                        }else {
                            self.$l.debug("Znaleziono eventy uzytkownika: " + userID + " Oto one: ", data.data.docs);
                            resolve(data);
                        }
                    // ERROR
                    }, function (err) {
                        self.$l.debug("Porazka podczas wyszukiwania eventow uzytkownika: " + userID);
                        reject(err);
                    }
                );
            }else{
                self.$l.debug("Blad! Nie mozna skonwertowac podanego id do ObjectID (niepoprawne ID)!");
                reject("error");
            }
        });
    }





    /**
     * @params  (String) id - id of the event we want to find
     * @functionality  gets the full information about an event
     * It checks if the id is valid
     * In case of a success, it logs to console and resolves to full data about event
     * In case of a failure, it logs to console and resolves to err
     * @returns {Promise}
     *      full event Info of the event we want to find if it succeeded, err or "error" in case of an error
     * */
    findById(id) {
        let self = this;
        return new Promise((resolve,reject)=> {
            if (id.match(/^[0-9a-fA-F]{24}$/)) {
                self.$http({
                    method: 'POST',
                    url: '/event/findById',
                    data: {id: id}
                }).then(
                    // SUCCESS
                    function (data) {
                        if(data.data.docs.length == 0) {
                            self.$l.debug("Nie znaleziono eventu o id: " + id);
                            resolve("error");
                        }else{
                            self.$l.debug("Znaleziono event o id: " + id + " Oto on: ", data.data.docs);
                            resolve(data);
                        }
                        // ERROR
                    }, function (err) {
                        self.$l.debug("Porazka podczas wyszukiwania eventu o id: " + id);
                        resolve("error");
                    }
                );
            }else{
                self.$l.debug("Blad! Nie mozna skonwertowac podanego id do ObjectID (niepoprawne ID)!");
                resolve("error");
            }
        });
    }





    /**
     * @params  (SportEvent) passedEvent - full SportEvent object, id - id of an event that is to be updated
     * @functionality updates the event in a database
     * It checks if the id is valid
     * Inside mongodb, it checks if the event is active
     * You cannot edit an inactive event
     * You can change usersLimit, but it checks if the new value is not lower than participants.length
     * In case of a success, it logs to console and resolves to full event data
     * In case of a failure, it logs to console and resolves to err
     * @returns {Promise}
     *      "ok" if it succeeded, "nochange" if the event is inactive, "error" in case of an error
     */
    update(passedEvent, id) {
        let self = this;
        return new Promise((resolve,reject)=> {
            if ((new Date(passedEvent.date)) <= (new Date())) {
                self.$l.debug("Blad podczas update'owania eventu - nie mozna ustawic daty mniejszej niz dzisiejsza!");
                resolve("error");
            }else if (id.match(/^[0-9a-fA-F]{24}$/)) {
                self.$http({
                    method: 'POST',
                    url: '/event/update',
                    data: {passedEvent: passedEvent, id : id}
                }).then(
                    // SUCCESS
                    function (data) {
                        if (data.data == "nochange") {
                            self.$l.debug("Nie można zaaktualizować wydarzenia - jest ono prawdopodobnie nieaktywne bądz" +
                                " próbowano ustawić maksymalną liczbę użytkowników mniejszą niż liczba uczestników wydarzenia!");
                            resolve("nochange");
                        } else {
                            self.$l.debug("Pomyślnie zedytowano event o id: " + id);
                            resolve("ok");
                        }
                        resolve("ok");
                        // ERROR
                    }, function (err) {
                        self.$l.debug("Porazka podczas edytowania eventu o id: " + id);
                        resolve("error");
                    }
                );
            }else{
                self.$l.debug("Blad! Nie mozna skonwertowac podanego id do ObjectID (niepoprawne ID)!");
                reject("error");
            }
        });
    }





    /**
     * @params  (double) latitude - current latitude of the user,
     *          (double) longitude - current longitude of the user,
     *          (double) radius - in km, the radius in which the search will take place
     * @functionality searches for event in a specific radius from the (latitude, longitude) point on a map
     * In case of a success, it logs to console and resolves array of full events data + distance added to each event
     * In case of a failure, it logs to console and resolves to err
     * @returns {Promise}
     *      full event Info array of events found in a radius +distance to each in case it succeeds, err in case of an error
     */
    find(latitude, longitude, radius) {
        let self = this;
        return new Promise((resolve,reject)=> {
            self.$http({
                method: 'POST',
                url: '/event/find',
                data: {latitude: latitude, longitude: longitude, radius: radius}
            }).then(
                // SUCCESS
                function (data) {
                    self.$l.debug("Pomyślnie znaleziono eventy w zasiegu: " + radius + " Liczba eventow: ", data.data.docs.length);
                    resolve(data);
                    // ERROR
                }, function (err) {
                    self.$l.debug("Porazka podczas wyszukiwania eventow w zasiegu: " + radius);
                    reject(err);
                }
            );
        });
    }


    /**
     * @params  (string) author - login of an author of an event
     * @functionality
     *      resolves to true if the currently logged user is an author of an event, otherwise resolves to false
     * @returns {Promise}
     */
    isOwnPage(author) {
        let self = this;
        return (author == self.UserService.user.login || self.UserService.hasRight(['admin']) ? true : false);
    }

    /**
     * @functionality
     *      resolves to to list of icons urls stored inside resources/iconList.json file
     * @returns {Promise}
     *      list of icons {"url":} if it succeeded, err in case of an error
     */
    getDefaultIcons(){
        let self = this;
        return new Promise((resolve,reject)=> {
            self.$http({
                method: 'GET',
                url: 'resources/iconList.json'
            }).then(
                // SUCCESS
                function (data) {
                    self.$l.debug("Pomyślnie wczytano liste ikon, oto ona: ", data.data);
                    resolve(data);
                    // ERROR
                }, function (err) {
                    self.$l.debug("Nie udalo sie wczytac listy ikon!");
                    reject(err);
                }
            );
        });
    }


    /**
     *
     * @param eventID (String) - the id of an event we comment about
     * @param userID (String) - it's an id of the participant of an event
     * @param isAuthor (boolean) -
     *      true for author -> participant oommenting (switch the hasBeenCommentedOn),
     *      false for participant -> author commenting (switch the hasCommentedOnEvent)
     *      (who is doing the commenting thing)
     * @functionality: it switches the proper flag to "true" to indicate the user has been commented on/ has commented on an event
     *      (to prevent multi commenting on the same thing)
     * @returns {Promise<T>|Promise}
     *      resolves to "ok" if it succeeded, rejects to "error" in case of id inconvertability to ObjectId, err in case of db error
     */
    setCommented(eventID, userID, isAuthor) {
        let self = this;
        return new Promise((resolve,reject)=> {
            if (eventID.match(/^[0-9a-fA-F]{24}$/) && userID.match(/^[0-9a-fA-F]{24}$/)) {
                let query = {};
                if(isAuthor)  query = {"participants.$.hasBeenCommentedOn": true};
                 else  query = {"participants.$.hasCommentedOnEvent": true};
                self.$http({
                    method: 'POST',
                    url: '/event/setCommented',
                    data: {eventID: eventID, userID : userID, query : query}
                }).then(
                    // SUCCESS
                    function (data) {
                        self.$l.debug("Pomyslnie przestawiono flage komentarza na true!");
                        resolve("ok");
                        // ERROR
                    }, function (err) {
                        self.$l.debug("Porazka podczas przestawiania flagi komentarza na true!");
                        reject(err);
                    }
                );
            }else{
                self.$l.debug("Blad! Nie mozna skonwertowac podanego id do ObjectID (niepoprawne ID)!");
                reject("error");
            }
        });
    }


}


export default EventService;