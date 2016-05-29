/**
 * Created by piec on 4/8/2016.
 */

class AccountController {

    constructor($scope, $log, $state, $stateParams, UserService, loader) {
        let self = this;
		self.$state = $state;
		self.$stateParams = $stateParams;
		self.UserService = UserService;
        self.$scope = $scope;
        self.$l = $log;
		self.loader = loader;
		self.setWatches();
		self.setDefaultValues();


    }

	setWatches(){
		let self = this;
		self.$scope.$watch(()=> {
			return self.eventInfo;
		}, (newValue)=> {
		}, true);
	}


	setDefaultValues() {
		let self = this;
		self.isOwnPage = false;
		self.userInfo = {};
		self.userName = self.$stateParams.userName;
		if(self.userName == "")  {self.$state.go("app.home"); return;}

		//checking if that page is ours or somebody's else
		self.UserService.isOwnPage(self.userName).then((resp) => {
			if(resp) {
				self.isOwnPage = true;

				let index = self.$stateParams.indexName;
				switch (index) {
					case "profile":
						self.$scope.selectedIndex = 0;
						break;
					case "settings":
						self.$scope.selectedIndex = 1;
						break;
					case "observed":
						self.$scope.selectedIndex = 2;
						break;
					case "mail":
						self.$scope.selectedIndex = 3;
						break;
					case "search":
						self.$scope.selectedIndex = 4;
						break;
					default:
						self.$scope.selectedIndex = 0;
				}
			}else  self.$scope.selectedIndex = 0;
			self.$l.debug("self.UserService.user.login: ",self.UserService.user.login);
			self.getDataFromServer();
		});

	}

	getDataFromServer(){
		let self = this;
		self.loader.show();
		self.UserService.findUserInfoByLogin(self.userName, self.isOwnPage).then((resp)=> {
			if (resp == "error") {
				self.loader.hide();
				self.$state.go("introduction");
				return;
			}
			if (resp.data.docs[0] === undefined) {
				self.loader.hide();
				self.$state.go("login");
				return;
			}
			self.userInfo = resp.data.docs[0];
			self.$l.debug("Informacje na temat użytkownika: ",self.userInfo);
			self.$scope.$evalAsync();
			self.loader.hide();
		}).catch((err) => {
			self.loader.hide();
			self.$state.go("introduction");
		});






	}
	
	
}


export default AccountController;
