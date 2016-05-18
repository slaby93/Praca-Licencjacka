/**
 * Created by Dammic on 14.03.16.
 */

 
function eventBasicInfo() {
    return {
        restrict: 'E',
        templateUrl: 'modules/directives/eventBasicInfo/eventBasicInfo.html',
        controller: EventBasicInfoController,
        controllerAs: "eventBasicInfoCtrl"
    };
}

class EventBasicInfoController {
    constructor(UserService, EventService, $scope, $state) {
        let self = this;
        self.UserService = UserService;
        self.EventService = EventService;
        self.$scope = $scope;
        self.$state = $state;
        self.setDefaultValues();
	}


    setDefaultValues(){
        let self = this;
        self.number = 3;
        self.eventInfo = {};

        self.$scope.$on('event:filled', function(event,data) {
            self.eventInfo = data;
        });

    }
	

}
		
export default eventBasicInfo;