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

}
export default EventService;