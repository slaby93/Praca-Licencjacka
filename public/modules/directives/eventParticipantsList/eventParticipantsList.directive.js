/**
 * Created by Dammic on 14.03.16.
 */


function eventParticipantsList() {
    return {
        restrict: 'E',
        templateUrl: 'modules/directives/eventParticipantsList/eventParticipantsList.html',
        controller: EventParticipantsListController,
        controllerAs: "eventParticipantsListCtrl"
    };
}

class EventParticipantsListController {
    constructor(UserService, EventService, $scope, $mdDialog, $rootScope) {
        let self = this;
        
        self.UserService = UserService;
        self.EventService = EventService;
        self.$scope = $scope;
        self.$mdDialog = $mdDialog;
        self.$rootScope = $rootScope;
        self.watchParticipants();
        self.setDefaultValues();
	}   

    watchParticipants(){
        let self = this;
        self.$rootScope.$watch(()=> {
            return self.participants;
        }, (newValue)=> {

        }, true);
    }
    
    setDefaultValues(){
        let self = this;
        self.user = {};


        self.participants = [];
        self.$scope.$watch();
        self.$scope.$on('event:filled', function(event,data) {
            self.participants = data.participants;
            _.forEach(self.participants, (value, key) => {
                self.participants[key].wasClicked = false;
            });
            self.UserService.findBasicUserInfoById(self.participants).then((resp)=> {
                _.merge(self.participants, resp.data.docs);
                console.log(self.participants);
            });


        });
        
    }

    showToolTip(participant){
        let self = this;
        _.forEach(self.participants, (value, key) => {
            self.participants[key].wasClicked = false;
        });

        participant.wasClicked = true;
    }


    

}
		
export default eventParticipantsList;