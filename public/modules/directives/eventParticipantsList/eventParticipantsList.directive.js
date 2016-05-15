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
    constructor(UserService, EventService, $scope) {
        let self = this;
        
        self.UserService = UserService;
        self.EventService = EventService;
        self.$scope = $scope;
        self.setDefaultValues();
	}   
    
    
    setDefaultValues(){
        let self = this;

        self.participants = [];
        self.$scope.$on('event:filled', function(event,data) {
            self.participants = data.participants;
        });
        
    }

}
		
export default eventParticipantsList;