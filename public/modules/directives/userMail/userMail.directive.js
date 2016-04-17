/**
 * Created by Dammic on 14.03.16.
 */

 
function userMail() {
    return {
        restrict: 'E',
        templateUrl: 'modules/directives/userMail/userMail.html',
        controller: UserMailController,
        controllerAs: "userMailCtrl"
    };
}

class UserMailController {
    constructor() {
        let self = this;

	}
	

}
		
export default userMail;