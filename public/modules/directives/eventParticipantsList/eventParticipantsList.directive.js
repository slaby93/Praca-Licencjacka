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
    constructor() {
        let self = this;

	}
	

}
		
export default eventParticipantsList;