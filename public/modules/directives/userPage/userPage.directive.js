/**
 * Created by Dammic on 14.03.16.
 */

 
function userPage() {
    return {
        restrict: 'E',
        templateUrl: 'modules/directives/userPage/userPage.html',
        controller: UserPageController,
        controllerAs: "userPageCtrl"
    };
}

class UserPageController {
    constructor() {
        let self = this;

	}
	

}
		
export default userPage;