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
		var currentDate = new Date();  var date = new Date(passedEvent.date);
		if(date <= currentDate){
			console.log("Blad podczas dodawania nowego eventu - nie mozna ustawic daty mniejszej niz dzisiejsza!");
			return;
		}
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
				console.log("Oto uczestnicy eventu: ");
				console.log(data.data.docs);
				console.log("Powinienes ich powiadomic o zamknieciu eventu!");
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
				console.log("Oto uczestnicy eventu: ");
				console.log(data.data.docs);
				console.log("Powinienes ich powiadomic o zamknieciu eventu!");
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
	
	
	isActive(id) {
        let self = this;
		var promise = self.$q.defer();
		self.$http.post('/event/isActive', {"id" : id}, {skipAuthorization: false}).then(
            // SUCCESS
            function (data) {
				console.log("Pomyślnie sprawdzono świeżość eventu, ma on status: ");
				console.log(data.data.isActive[0].isActive);
                promise.resolve(data.data.isActive[0].isActive);
            // ERROR
            }, function (err) {
                console.log("Porazka podczas usuwania starych, zakończonych eventów!");
                promise.resolve(err);
            });
        return promise.promise;
    };
	
	
	joinEvent(id, name){
		let self = this;
		var active = self.isActive(id);
		active.then(function(value){
			if(value == true) {
				var promise = self.$q.defer();
				self.$http.post('/event/joinEvent', {"id" : id, "name" : name}, {skipAuthorization: false}).then(
					// SUCCESS
					function (data) {
						console.log("Pomyślnie dołączono użytkownika: "+name+ " do wydarzenia o id: "+id);
						promise.resolve(data);
					// ERROR
					}, function (err) {
						console.log("Porazka podczas dodawania uzytkownika: "+name+ " do wydarzenia o id: "+id);
						promise.resolve(err);
					});
				return promise.promise;
			}else  console.log("Wystapil blad podczas dodawania uzytkownika! (Prawdopodobnie event jest nieaktywny lub nastapil blad podczas laczenia sie z baza danych)");			
		});	
	}
	
	
	kickUser(id,name){
		let self = this;
		var active = self.isActive(id);
		active.then(function(value){
			if(value == true) {
				var promise = self.$q.defer();
				self.$http.post('/event/kickUser', {"id" : id, "name" : name}, {skipAuthorization: false}).then(
					// SUCCESS
					function (data) {
						console.log("Pomyślnie wyrzucono użytkownika: "+name+ " z wydarzenia o id: "+id);
						promise.resolve(data);
					// ERROR
					}, function (err) {
						console.log("Porazka podczas usuwania uzytkownika: "+name+" z wydarzenia o id: "+id);
						promise.resolve(err);
					});
				return promise.promise;			
			}else  console.log("Wystapil blad podczas dodawania uzytkownika! (Prawdopodobnie event jest nieaktywny lub nastapil blad podczas laczenia sie z baza danych)");			
		}
	}
	
	
	remove(id){
		let self = this;
		var promise = self.$q.defer();
		self.$http.post('/event/remove', {"id": id}, {skipAuthorization: false}).then(
            // SUCCESS
            function (data) {
				console.log("Event o id: "+id+" został usuniety!");
				console.log("Oto uczestnicy eventu: ");
				console.log(data.data.docs);
				console.log("Powinienes ich powiadomic o usunieciu eventu!");
                promise.resolve(data);
            // ERROR
            }, function (err) {
                console.log("Porazka podczas deaktywacji eventu!");
                promise.resolve(err);
            });
        return promise.promise;
	}
	
	findByUser(name){
		let self = this;
		var promise = self.$q.defer();
		self.$http.post('/event/findByUser', {"name" : name}, {skipAuthorization: false}).then(
            // SUCCESS
            function (data) {
				console.log("Pomyślnie znaleziono eventy uzytkownika: "+name);
				console.log("Oto one: ");
				console.log(data.data.docs);
                promise.resolve(data);
            // ERROR
            }, function (err) {
                console.log("Porazka podczas wyszukiwania eventow uzytkownika: "+name);
                promise.resolve(err);
            });
        return promise.promise;
	}
	

}
export default EventService;