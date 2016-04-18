/**
 * Created by Dammic on 14.03.16.
 */

 
function archiveEventsTable() {
    return {
        restrict: 'E',
        templateUrl: 'modules/directives/archiveEventsTable/archiveEventsTable.html',
        controller: ArchiveEventsTableController,
        controllerAs: "archiveEventsTableCtrl"
    };
}

class ArchiveEventsTableController {
    constructor() {
        let self = this;

	}
	

}
		
export default archiveEventsTable;