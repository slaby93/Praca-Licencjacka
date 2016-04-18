/**
 * Created by piec on 4/8/2016.
 */

class AccountController {

    constructor($scope, $log, $state, $stateParams, UserService) {
        let self = this;
		self.$state = $state;
		self.UserService = UserService;
		if(!self.UserService.hasRight(['user', 'admin']))  self.$state.go("introduction");
        self.$scope = $scope;
        self.$l = $log;
        self.$l.debug("Account CTRL");
		
		let index = $stateParams.indexName;
		switch(index) {
			case "profile":
				$scope.selectedIndex = 0;
				break;
			case "settings":
				$scope.selectedIndex = 1;
				break;
			case "observed":
				$scope.selectedIndex = 2;
				break;
			case "mail":
				$scope.selectedIndex = 3;
				break;
			case "search":
				$scope.selectedIndex = 4;
				break;
			default:
				$scope.selectedIndex = 0;
		}

    }
}

export default AccountController;
