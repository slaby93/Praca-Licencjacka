/**
 * Created by piec on 3/22/2016.
 */
import Event from 'Classes/Event';
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
		console.log("lol");
        let self = this;
		
		let passedEvent1 = {
			"author" : "slaby",
			"city" : "krakow",
			"createdDate" : new Date(2016, 3, 17, 0, 0),
			"date" : new Date(2016, 3, 19, 0, 0),
			"defaultEventIcon" : true,
			"defaultEventImage" : true,
			"eventInfo" : {
				"description" : "To wydarzenie bedzie wspaniale!",
				"payment" : 30,
				"ownEquipment" : false,
				"experienced" : true,
				"usersLimit" : 20
			},
			"isActive" : false,
			"localization" : {
				"latitude" : 50.0543231,
				"longitude" : 50.0543231
			},
			"participants" : [ 
				{
					"name" : "test"
				}
			],
			"region" : "malopolskie"
		};
        let promise = self.$q.defer();
        self.$http.post("/addEvent", passedEvent1, {skipAuthorization: true}).then((received) => {
            promise.resolve(received);
        }, (err) => {
            promise.reject(err);
        });
        return promise.promise;
    };

}
export default EventService;