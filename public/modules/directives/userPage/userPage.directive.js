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
    constructor($scope, UserService, $stateParams) {
        let self = this;
		self.UserService = UserService;
		self.user = self.getUserInfo($stateParams.userName);
	}
	
	
	getUserInfo(){
		return {
			accountCreated: "11.03.2001",
			lastSeen: "13.11.2008",
			city: "Warszawa",
			age: "32",
			description: "Lubie placki Kocham firmę adidas!"
		};
	}

}
		
export default userPage;