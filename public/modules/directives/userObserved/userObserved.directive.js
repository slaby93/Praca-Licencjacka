/**
 * Created by Dammic on 14.03.16.
 */

 
function userObserved() {
    return {
        restrict: 'E',
        templateUrl: 'modules/directives/userObserved/userObserved.html',
        controller: UserObservedController,
        controllerAs: "userObservedCtrl"
    };
}

class UserObservedController {
    constructor() {
        let self = this;

	}
	

}
		
export default userObserved;