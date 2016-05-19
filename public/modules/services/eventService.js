/**
 * Created by piec on 3/22/2016.
 */
import SportEvent from 'Classes/SportEvent';
import Moment from 'moment';

class EventService {

    constructor($log, $http, $state, $q) {
        let self = this;
        self.$l = $log;
        self.$http = $http;
        self.$state = $state;
        self.$q = $q;

        self.defaultValues();
    }

    defaultValues() {
        let self = this;
    };


    addEvent(passedEvent) {
        let self = this;
        return new Promise((resolve,reject)=> {
            if ((new Date(passedEvent.date)) <= (new Date())) {
                console.log("Blad podczas dodawania nowego eventu - nie mozna ustawic daty mniejszej niz dzisiejsza!");
                promise.resolve(-1);
            }else{
                self.$http.post('/event/addEvent', {"event": passedEvent}, {skipAuthorization: false}).then(
                    // SUCCESS
                    function (data) {
                        console.log("Dodawanie nowego eventu powiodło się! Oto jego id: " + data.data.id);
                        //tutaj mozna zrobic przekierowanie do strony nowoutworzonego eventu poprzez jego id
                        resolve(data);
                        // ERROR
                    }, function (err) {
                        console.log("Porazka podczas dodawania nowego eventu!", err);
                        reject(err);
                    }
                );
            }
        });
    };


    deactivateById(id) {
        let self = this;
        return new Promise((resolve,reject)=> {
            self.$http.post('/event/deactivateById', {"id": id}, {skipAuthorization: false}).then(
                // SUCCESS
                function (data) {
                    console.log("Event o id: " + id + " został zdeaktywowany (o ile istniał)!");
                    console.log("Oto uczestnicy eventu: ");
                    console.log(data.data.docs);
                    console.log("Powinienes ich powiadomic o zamknieciu eventu!");
                    resolve(data);
                    // ERROR
                }, function (err) {
                    console.log("Porazka podczas deaktywacji eventu!");
                    reject(err);
                }
            );
        });
    };


    //should be run at 24:00 everyday to ensure all events that are supposed to be closed,
    //are, in fact, closed. It iterates through all events and check if they have been finished or not
    checkForEventsToDeactivate() {
        let self = this;
        return new Promise((resolve,reject)=> {
            self.$http.post('/event/checkForEventsToDeactivate', {}, {skipAuthorization: false}).then(
                // SUCCESS
                function (data) {
                    console.log("Kontrola świeżości eventów zakończona pozytywnie! ");
                    console.log("Oto uczestnicy eventow: ");
                    console.log(data.data.docs);
                    console.log("Powinienes ich powiadomic o zamknieciu eventow!");
                    resolve(data);
                    // ERROR
                }, function (err) {
                    console.log("Porazka podczas kontroli świeżości eventów");
                    reject(err);
                }
            );
        });
    };


    cleanOld() {
        let self = this;
        return new Promise((resolve,reject)=> {
            self.$http.post('/event/cleanOld', {}, {skipAuthorization: false}).then(
                // SUCCESS
                function (data) {
                    if (data.data.docs.length == 0) {
                        console.log("Nie znaleziono eventów do usunięcia!");
                        resolve(data);
                    } else {
                        console.log("Usunięto stare, zakończone eventy. Ich dokumenty to: ");
                        console.log(data.data.docs);
                        resolve(data);
                    }
                    // ERROR
                }, function (err) {
                    console.log("Porazka podczas usuwania starych, zakończonych eventów!");
                    reject(err);
                }
            );
        });
    };


    isActive(id) {
        let self = this;
        return new Promise((resolve,reject)=> {
            self.$http.post('/event/isActive', {"id": id}, {skipAuthorization: false}).then(
                // SUCCESS
                function (data) {
                    if (data.data.isActive[0] == null) {
                        console.log("Event o podanym id nie istnieje!");
                        resolve(-1);
                    } else {
                        console.log("Pomyślnie sprawdzono świeżość eventu, ma on status: ");
                        console.log(data.data.isActive[0].isActive);
                        resolve(data.data.isActive[0].isActive);
                    }
                    // ERROR
                }, function (err) {
                    console.log("Porazka podczas sprawdzania świeżości eventu");
                    reject(err);
                }
            );
        });
    };


//:todo:  check if the user isn't on the blacklist of the event author (one additional parameter - author and function isBlacklisted) //
    joinEvent(id, author, userID) {
        let self = this;
        return new Promise((resolve,reject)=>{
            self.isActive(id).then(function (value) {
                if (value == true) {
                    self.$http.post('/event/joinEvent', {
                        "id": id,
                        "userID": userID
                    }, {skipAuthorization: false}).then(
                        // SUCCESS
                        function (data) {
                            if(data.data == "nochange"){
                                console.log("Uzytkownik o id: " + userID + " nie zostal dodany do wydarzenia o id: " + id +
                                    " ||wydarzenie nie istnieje/jest zakonczone/jest przepelnione");
                                resolve(data);
                            }else {
                                console.log("Pomyślnie dołączono użytkownika: " + userID + " do wydarzenia o id: " + id);
                                resolve(data);
                            }
                            // ERROR
                        }, function (err) {
                            console.log("Porazka podczas dodawania uzytkownika: " + userID + " do wydarzenia o id: " + id);
                            reject(err);
                        });
                } else  console.log("Wystapil blad podczas dodawania uzytkownika! (Prawdopodobnie event jest nieaktywny lub nastapil blad podczas laczenia sie z baza danych)");
            });
        });
    }


    kickUser(id, userID) {
        let self = this;
        return new Promise((resolve,reject)=> {
            self.isActive(id).then(function (value) {
                if (value == true) {
                    self.$http.post('/event/kickUser', {"id": id, "userID": userID}, {skipAuthorization: false}).then(
                        // SUCCESS
                        function (data) {
                            console.log("Pomyślnie wyrzucono użytkownika: " + userID + " z wydarzenia o id: " + id);
                            resolve(data);
                            // ERROR
                        }, function (err) {
                            console.log("Porazka podczas usuwania uzytkownika: " + userID + " z wydarzenia o id: " + id);
                            reject(err);
                        }
                    );
                } else  console.log("Wystapil blad podczas usuwania uzytkownika! (Prawdopodobnie event jest nieaktywny lub nastapil blad podczas laczenia sie z baza danych)");
            });
        });
    }


    remove(id) {
        let self = this;
        return new Promise((resolve,reject)=> {
            self.$http.post('/event/remove', {"id": id}, {skipAuthorization: false}).then(
                // SUCCESS
                function (data) {
                    console.log("Event o id: " + id + " został usuniety (o ile istnieje!)!");
                    console.log("Oto uczestnicy eventu: ");
                    console.log(data.data.docs);
                    console.log("Powinienes ich powiadomic o usunieciu eventu!");
                    resolve(data);
                    // ERROR
                }, function (err) {
                    console.log("Porazka podczas deaktywacji eventu!");
                    reject(err);
                }
            );
        });
    }

    findByUser(name) {
        let self = this;
        return new Promise((resolve,reject)=> {
            self.$http.post('/event/findByUser', {"name": name}, {skipAuthorization: false}).then(
                // SUCCESS
                function (data) {
                    console.log("Znaleziono eventy uzytkownika: " + name);
                    console.log("Oto one: ");
                    console.log(data.data.docs);
                    resolve(data);
                    // ERROR
                }, function (err) {
                    console.log("Porazka podczas wyszukiwania eventow uzytkownika: " + name);
                    reject(err);
                }
            );
        });
    }

    findById(id) {
        let self = this;
        return new Promise((resolve,reject)=> {
            self.$http.post('/event/findById', {"id": id}, {skipAuthorization: false}).then(
                // SUCCESS
                function (data) {
                    console.log("Znaleziono event o id: " + id);
                    console.log("Oto on: ");
                    console.log(data.data.docs);
                    resolve(data);
                    // ERROR
                }, function (err) {
                    console.log("Porazka podczas wyszukiwania eventu o id: " + id);
                    reject(err);
                }
            );
        });
    }

    update(passedEvent) {
        let self = this;
        return new Promise((resolve,reject)=> {
            if ((new Date(passedEvent.date)) <= (new Date())) {
                console.log("Blad podczas update'owania eventu - nie mozna ustawic daty mniejszej niz dzisiejsza!");
                promise.resolve(-1);
            }else{
                var active = self.isActive(passedEvent._id);
                active.then(function (value) {
                    if (value == true) {
                        self.$http.post('/event/update', {"passedEvent": passedEvent}, {skipAuthorization: false}).then(
                            // SUCCESS
                            function (data) {
                                console.log("Pomyślnie zedytowano event o id: " + passedEvent._id);
                                resolve(data);
                                // ERROR
                            }, function (err) {
                                console.log("Porazka podczas edytowania eventu o id: " + passedEvent._id);
                                resolve(err);
                            }
                        );
                    } else  console.log("Wystapil blad podczas edytowania eventu! (Prawdopodobnie event jest nieaktywny lub nastapil blad podczas laczenia sie z baza danych)");
                });
            }
        });
    }


    //radius in geo hours and minutes
    find(latitude, longitude, radius) {
        let self = this;
        return new Promise((resolve,reject)=> {
            self.$http.post('/event/find', {
                "latitude": latitude,
                "longitude": longitude,
                "radius": radius
            }, {skipAuthorization: false}).then(
                // SUCCESS
                function (data) {
                    console.log("Pomyślnie znaleziono eventy w zasiegu: " + radius);
                    console.log("Liczba eventow: ", data.data.docs.length);
                    resolve(data);
                    // ERROR
                }, function (err) {
                    console.log("Porazka podczas wyszukiwania eventow w zasiegu: " + radius);
                    reject(err);
                }
            );
        });
    }
}
export default EventService;