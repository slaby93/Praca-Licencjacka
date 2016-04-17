/**
 * Created by Dammic on 14.03.16.
 */

 
function userSearch() {
    return {
        restrict: 'E',
        templateUrl: 'modules/directives/userSearch/userSearch.html',
        controller: UserSearchController,
        controllerAs: "userSearchCtrl"
    };
}

class UserSearchController {
    constructor() {
        let self = this;

	}
	

}
		
export default userSearch;