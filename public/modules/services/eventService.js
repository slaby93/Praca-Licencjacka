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
     * In case of an 'eventDate' < 'currentDate', it logs to console and resolves to '-1'
     * In case of a success, it logs to console and resolves to data (which has a form: {"id": id}}
     **    where id is the string representation of the added document's id
     **    It also redirects the user to the newly added event's page like:  /#/app/event/[id]/
     * In case of a failure, it logs to console and resolves to err
     * @returns {Promise}
     */
    addEvent(passedEvent) {
        let self = this;
        return new Promise((resolve,reject)=> {
            if ((new Date(passedEvent.date)) <= (new Date())) {
                self.$l.debug("Blad podczas dodawania nowego eventu - nie mozna ustawic daty mniejszej niz dzisiejsza!");
                resolve(-1);
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
                        resolve(data);
                        // ERROR
                    }, function (err) {
                        self.$l.debug("Porazka podczas dodawania nowego eventu!"+ $(err));
                        reject(err);
                    }
                );
            }
        });
    };





    /**
     *
     * @param id - in form of a String, it represents the id of an event to deactivate
     **     The string has to be convertable to ObjectId!
     * @functionality checks if the id is convertable to ObjectID
     *      and sends a http request to server in order to deactivate an event (make it not active) and also
     *      sets it's event date to currentDate to avoid situations when an user sets an event to 2099 and then disables it
     *      and then it would not be removed with >1yr old closed events.
     * In case of a success, it logs to console and resolves to data (which has a form: {"id": id}}
     * In case the id is structurally wrong (not convertable to ObjectID), it logs to console and resolves to -1
     * In case of a failure, it logs to console and resolves to err
     * @returns {Promise}
     * @userWhen  We want to forcefully deactivate an event (when closing an event by the creator or the admin).
     */
    deactivateById(id) {
        let self = this;
        return new Promise((resolve,reject)=> {
            if (id.match(/^[0-9a-fA-F]{24}$/)) {
                self.$http({
                    method: 'POST',
                    url: '/event/deactivateById',
                    data: {id: id}
                }).then(
                    // SUCCESS
                    function (data) {
                        self.$l.debug("Event o id: " + id + " został zdeaktywowany (o ile istniał)! Oto jego uczestnicy: ", data.data.docs);
                        self.$l.debug("Powinienes ich powiadomic o zamknieciu eventu!");
                        resolve(data);
                        // ERROR
                    }, function (err) {
                        self.$1.debug("Porazka podczas deaktywacji eventu!");
                        reject(err);
                    }
                );
            }else{
                self.$l.debug("Blad! Nie mozna skonwertowac podanego id do ObjectID (niepoprawne ID)!");
                resolve(-1);
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
                    self.$l.debug("Kontrola świeżości eventów zakończona pozytywnie! Oto uczestnicy eventow: ", data.data.docs);
                    self.$l.debug("Powinienes ich powiadomic o zamknieciu eventow!");
                    resolve(data);
                    // ERROR
                }, function (err) {
                    self.$l.debug("Porazka podczas kontroli świeżości eventów");
                    reject(err);
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
     * @todo: SHOULD NOTIFY ALL PARTICIPANTS ABOUT THE DELETION OF AN EVENT
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
                        resolve([]);
                    } else {
                        self.$l.debug("Usunięto stare, zakończone eventy. Ich dokumenty to: ", data.data.docs);
                        resolve(data);
                    }
                    // ERROR
                }, function (err) {
                    self.$l.debug("Porazka podczas usuwania starych, zakończonych eventów!");
                    reject(err);
                }
            );
        });
    };





    /**
     * @params  id - id in form of String, represents an id of an event
     * @functionality checks if the isActive parameter of an event is true (if the event is active)
     * In case of a success, it logs to console and resolves to data (in the form of: {"isActive" : isActive}
     * In case of a failure, it logs to console and resolves to err
     * In case the event does not exist in database, it logs to console and resolves to -1
     * In case the id is not convertable to ObjectId, it logs to console and resolves to -1
     * @returns {Promise}
     */
    isActive(id) {
        let self = this;
        return new Promise((resolve,reject)=> {
            if (id.match(/^[0-9a-fA-F]{24}$/)) {
                self.$http({
                    method: 'POST',
                    url: '/event/isActive',
                    data: {id: id}
                }).then(
                    // SUCCESS
                    function (data) {
                        if (data.data.isActive[0] == null) {
                            self.$l.debug("Event o podanym id nie istnieje!");
                            resolve(-1);
                        } else {
                            self.$l.debug("Pomyślnie sprawdzono świeżość eventu, ma on status: "+ data.data.isActive[0].isActive );
                            resolve(data.data.isActive[0].isActive);
                        }
                        // ERROR
                    }, function (err) {
                        self.$l.debug("Porazka podczas sprawdzania świeżości eventu");
                        reject(err);
                    }
                );
            }else{
                self.$l.debug("Blad! Nie mozna skonwertowac podanego id do ObjectID (niepoprawne ID)!");
                resolve(-1);
            }
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
     * @todo: CHECK IF THE USER IS NOT ON THE BLACKLIST OF THE AUTHOR
     */
    joinEvent(id, author, userID) {
        let self = this;
        return new Promise((resolve,reject)=>{
            if (id.match(/^[0-9a-fA-F]{24}$/) && userID.match(/^[0-9a-fA-F]{24}$/) && author != self.UserService.user.login) {
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
                        reject(err);
                    }
                );
            }else{
                self.$l.debug("Blad! Nie mozna skonwertowac podanych id do ObjectID (niepoprawne ID), bądź dodawany użytkownik jest autorem wydarzenia!");
                resolve(-1);
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
     */
    kickUser(id, userID) {
        let self = this;
        return new Promise((resolve,reject)=> {
            if (id.match(/^[0-9a-fA-F]{24}$/) && userID.match(/^[0-9a-fA-F]{24}$/)) {
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
                            self.$l.debug("ok");
                        }
                        // ERROR
                    }, function (err) {
                        self.$l.debug("Porazka podczas usuwania uzytkownika: " + userID + " z wydarzenia o id: " + id);
                        reject(err);
                    }
                );
            }else{
                self.$l.debug("Blad! Nie mozna skonwertowac podanych id do ObjectID (niepoprawne ID)!");
                resolve(-1);
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
     * @todo: notify all users of the deleted event about that fact
     * @usedWhen:  only for admin, should be used in special circumstances (e.g. when the event offends the law or people)
     */
    remove(id) {
        let self = this;
        return new Promise((resolve,reject)=> {
            if (id.match(/^[0-9a-fA-F]{24}$/)) {
                self.$http({
                    method: 'POST',
                    url: '/event/remove',
                    data: {id: id}
                }).then(
                    // SUCCESS
                    function (data) {
                        self.$l.debug("Event o id: " + id + " został usuniety (o ile istnieje!)! Oto uczestnicy eventu: ", data.data.docs);
                        self.$l.debug("Powinienes ich powiadomic o usunieciu eventu!");
                        resolve(data);
                        // ERROR
                    }, function (err) {
                        self.$l.debug("Porazka podczas deaktywacji eventu!");
                        reject(err);
                    }
                );
            }else{
                self.$l.debug("Blad! Nie mozna skonwertowac podanego id do ObjectID (niepoprawne ID)!");
                resolve(-1);
            }
        });
    }





    /**
     * @params  (String) name - login of an user
     * @functionality finds all events organized by the passed user name
     * In case of a success, it logs to console and resolves to array of events, sorted by date in an ascending order
     * In case of a failure, it logs to console and resolves to err
     * @returns {Promise}
     */
    findByUser(name) {
        let self = this;
        return new Promise((resolve,reject)=> {
            self.$http({
                method: 'POST',
                url: '/event/findByUser',
                data: {name: name}
            }).then(
                // SUCCESS
                function (data) {
                    self.$l.debug("Znaleziono eventy uzytkownika: " + name + " Oto one: ", data.data.docs);
                    resolve(data);
                    // ERROR
                }, function (err) {
                    self.$l.debug("Porazka podczas wyszukiwania eventow uzytkownika: " + name);
                    reject(err);
                }
            );
        });
    }





    /**
     * @params  (String) id - id of the event we want to find
     * @functionality  gets the full information about an event
     * It checks if the id is valid
     * In case of a success, it logs to console and resolves to full data about event
     * In case of a failure, it logs to console and resolves to err
     * @returns {Promise}
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
                        self.$l.debug("Znaleziono event o id: " + id + " Oto on: ", data.data.docs);
                        resolve(data);
                        // ERROR
                    }, function (err) {
                        self.$l.debug("Porazka podczas wyszukiwania eventu o id: " + id);
                        reject(err);
                    }
                );
            }else{
                self.$l.debug("Blad! Nie mozna skonwertowac podanego id do ObjectID (niepoprawne ID)!");
                resolve(-1);
            }
        });
    }





    /**
     * @params  (SportEvent) passedEvent - full SportEvent object, id - id of an event that is to be updated
     * @functionality updates the event in a database
     * It checks if the id is valid
     * Inside mongodb, it checks if the event is active
     * You cannot edit an inactive event
     * In case of a success, it logs to console and resolves to full event data
     * In case of a failure, it logs to console and resolves to err
     * @returns {Promise}
     */
    update(passedEvent, id) {
        let self = this;
        return new Promise((resolve,reject)=> {
            if ((new Date(passedEvent.date)) <= (new Date())) {
                self.$l.debug("Blad podczas update'owania eventu - nie mozna ustawic daty mniejszej niz dzisiejsza!");
                promise.resolve(-1);
            }else if (id.match(/^[0-9a-fA-F]{24}$/)) {
                self.$http({
                    method: 'POST',
                    url: '/event/update',
                    data: {passedEvent: passedEvent}
                }).then(
                    // SUCCESS
                    function (data) {
                        self.$l.debug("Pomyślnie zedytowano event o id: " + id);
                        resolve(data);
                        // ERROR
                    }, function (err) {
                        self.$l.debug("Porazka podczas edytowania eventu o id: " + id);
                        resolve(err);
                    }
                );
            }else{
                self.$l.debug("Blad! Nie mozna skonwertowac podanego id do ObjectID (niepoprawne ID)!");
                resolve(-1);
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
}
export default EventService;