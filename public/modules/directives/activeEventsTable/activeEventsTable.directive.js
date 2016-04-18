/**
 * Created by Dammic on 14.03.16.
 */

 
function activeEventsTable() {
    return {
        restrict: 'E',
        templateUrl: 'modules/directives/activeEventsTable/activeEventsTable.html',
        controller: ActiveEventsTableController,
        controllerAs: "activeEventsTableCtrl"
    };
}

class ActiveEventsTableController {
    constructor() {
        let self = this;

	}
	

}
		
export default activeEventsTable;