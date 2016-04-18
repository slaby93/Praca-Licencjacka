/**
 * Created by piec on 4/8/2016.
 */

class AccountController {

    constructor($scope, $log, $state, $stateParams, UserService) {
        let self = this;
		self.$state = $state;
		self.UserService = UserService;
        self.$scope = $scope;
        self.$l = $log;
        self.$l.debug("Account CTRL");
		console.log($stateParams.userName);
		if($stateParams.userName == "")  self.$state.go("app.home");
		$scope.user = self.getUserInfo($stateParams.userName);
		
		
		
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
	
	
	getUserInfo(){
		return {
			avatar: "gallery/default.jpg",
			userImage: "gallery/defaultImg.jpg",
			name: "Krzysztof",
			surname: "Krawczyk",
			nickname: "Beton",
			rank: "Weteran",
		};
	}
	
	
}


export default AccountController;
