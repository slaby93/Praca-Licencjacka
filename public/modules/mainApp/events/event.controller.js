/**
 * Created by piec on 4/8/2016.
 */



/**
 * When we enter this controller, it checks if:
 * -the query element eventId from  event/:eventID/ is ObjectID type,
 * -the id exists
 * if one of those conditions is not meet, it redirects the user to introduction state
 * This controller also contains eventInfo object with the data of the event of this ID
 */


class EventController {

    constructor($scope, $log, $state, UserService, EventService, $stateParams) {
        let self = this;
        self.$scope = $scope;
        self.$l = $log;
        self.$state = $state;
        self.UserService = UserService;
        self.EventService = EventService;
        self.$stateParams = $stateParams;
        self.defaultValues();
    }

    defaultValues() {
        let self = this;

        self.eventID = self.$stateParams.eventID;

        // Checking, if the passed string is an ObjectID and can be passes as _id argument to db.find
        // in case it does not match, we send user to introduction state
        if (!self.eventID.match(/^[0-9a-fA-F]{24}$/))  {self.$state.go("introduction");  return;}

        self.EventService.findById(self.eventID).then((resp)=> {
            if (!resp) {
                alert("ERROR");
                return;
            }
            self.$scope.eventInfo = resp.data.docs[0];

            //in case we don't find an event in the database
            //(the _id is not present), we should redirect the user to to the error site or wherever else
            //placeholder:  redirect to introduction
            if(self.$scope.eventInfo === undefined)  {self.$state.go("introduction");  return;}
        });
    }
}

export default EventController;
