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
		var promise = self.$q.defer();
		self.$http.post('/event/addEvent', {"event": passedEvent}, {skipAuthorization: false}).then(
            // SUCCESS
            function (data) {
				console.log("Dodawanie nowego eventu powiodło się! Oto jego id: "+ data.data.id);
				//tutaj mozna zrobic przekierowanie do strony nowoutworzonego eventu poprzez jego id
                promise.resolve(data);
            // ERROR
            }, function (err) {
                console.log("Porazka podczas dodawania nowego eventu!");
                promise.resolve(err);
            });
        return promise.promise;
    };
	
	
	
	deactivateById(id) {
        let self = this;
		var promise = self.$q.defer();
		self.$http.post('/event/deactivateById', {"id": id}, {skipAuthorization: false}).then(
            // SUCCESS
            function (data) {
				console.log("Event o id: "+id+" został zdeaktywowany!");
                promise.resolve(data);
            // ERROR
            }, function (err) {
                console.log("Porazka podczas deaktywacji eventu!");
                promise.resolve(err);
            });
        return promise.promise;
    };
	
	
	
	//should be run at 24:00 everyday to ensure all events that are supposed to be closed,
	//are, in fact, closed. It iterates through all events and check if they have been finished or not
	checkForEventsToDeactivate() {
        let self = this;
		var promise = self.$q.defer();
		self.$http.post('/event/checkForEventsToDeactivate', {}, {skipAuthorization: false}).then(
            // SUCCESS
            function (data) {
				console.log("Kontrola świeżości eventów zakończona pozytywnie!");
                promise.resolve(data);
            // ERROR
            }, function (err) {
                console.log("Porazka podczas kontroli świeżości eventów");
                promise.resolve(err);
            });
        return promise.promise;
    };
	
	cleanOld() {
        let self = this;
		var promise = self.$q.defer();
		self.$http.post('/event/cleanOld', {}, {skipAuthorization: false}).then(
            // SUCCESS
            function (data) {
				console.log("Usunięto stare, zakończone eventy. Ich dokumenty to: ");
				console.log(data.data.docs);
                promise.resolve(data);
            // ERROR
            }, function (err) {
                console.log("Porazka podczas usuwania starych, zakończonych eventów!");
                promise.resolve(err);
            });
        return promise.promise;
    };

}
export default EventService;