/**
 * Created by Dammic on 14.03.16.
 */

 
function userCommentsTable() {
    return {
        restrict: 'E',
        templateUrl: 'modules/directives/userCommentsTable/userCommentsTable.html',
        controller: UserCommentsTableController,
        controllerAs: "userCommentsTableCtrl"
    };
}

class UserCommentsTableController {
    constructor() {
        let self = this;

	}
	

}
		
export default userCommentsTable;