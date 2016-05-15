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
    constructor(UserService, EventService, $scope, $mdDialog) {
        let self = this;
        
        self.UserService = UserService;
        self.EventService = EventService;
        self.$scope = $scope;
        self.$mdDialog = $mdDialog;
        self.setDefaultValues();
	}   
    
    
    setDefaultValues(){
        let self = this;

        self.participants = [];
        self.$scope.$watch()
        self.$scope.$on('event:filled', function(event,data) {
            self.participants = data.participants;
            console.log(self.participants);
        });
        
    }


    showUserModal(id) {
        let self = this;
        let parentElement = angular.element(document.body);
        console.log(parentElement);
        self.$mdDialog.show({
            templateUrl: 'modules/mainApp/userQuickInfoTooltip/userQuickInfoTooltip.html',
            controller: 'UserQuickInfoTooltipController',
            controllerAs: 'userQuickInfoTooltipCtrl',
            clickOutsideToClose : true,
            resolve: {
                getId: function () {
                    return id;
                }
            }
        });
    }

}
		
export default eventParticipantsList;