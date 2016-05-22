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

    constructor($scope, $log, $state, UserService, EventService, $stateParams, $window) {
        let self = this;
        self.$scope = $scope;
        self.$l = $log;
        self.$state = $state;
        self.UserService = UserService;
        self.EventService = EventService;
        self.$stateParams = $stateParams;
        self.notie = $window.notie;
        self.defaultValues();
        self.setScopeListeners();
    }

    setScopeListeners(){
        let self = this;
        self.$scope.$on('event:joined', function(event,data) {
            self.EventService.joinEvent(self.eventInfo._id, self.eventInfo.author, self.UserService.user.id).then((resp) => {
                if(resp == "ok") {
                    self.eventInfo.participants.unshift({'_id': self.UserService.user.id});
                    self.$scope.$broadcast('event:filled', self.eventInfo);
                    self.notie.alert(1, 'Pomyślnie dołączono do eventu!');
                }else  self.notie.alert(1, 'Nie można dołączyć do eventu!');
            });
        });
        self.$scope.$on('event:left', function(event,data){
            self.EventService.kickUser(self.eventInfo._id, self.UserService.user.id).then((resp) => {
                if(resp == "ok"){
                    _.remove(self.eventInfo.participants, (value) => {
                        return value._id == self.UserService.user.id;
                    });
                    self.$scope.$broadcast('event:filled',self.eventInfo);
                    self.notie.alert(1, 'Pomyślnie opuszczono wydarzenie!');
                }else  self.notie.alert(1, 'Nie można opuścić wydarzenia!');

            });






        });


    }

    defaultValues() {

        let self = this;
        self.eventInfo = {};
        self.eventID = self.$stateParams.eventID;

        // Checking, if the passed string is an ObjectID and can be passes as _id argument to db.find
        // in case it does not match, we send user to introduction state
        if (!self.eventID.match(/^[0-9a-fA-F]{24}$/))  {self.$state.go("introduction");  return;}

        self.EventService.findById(self.eventID).then((resp)=> {
            if (!resp) {
                alert("ERROR");
                return;
            }
            //in case we don't find an event in the database
            //(the _id is not present), we should redirect the user to to the error site or wherever else

            if(resp.data.docs[0] === undefined)  {self.$state.go("introduction");  return;}
            self.eventInfo = resp.data.docs[0];
            self.$scope.$broadcast('event:filled',resp.data.docs[0]);
        });
    }
}

export default EventController;
