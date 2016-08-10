/**
 * Created by piec on 4/8/2016.
 */

class AccountController {

    constructor($scope, $log, $state, $stateParams, UserService, loader) {
		this.$state = $state;
		this.$stateParams = $stateParams;
		this.UserService = UserService;
        this.$scope = $scope;
        this.$l = $log;

        $('.tabular.menu .item').tab();
		this.loader = loader;
		this.setWatches();
		this.setDefaultValues();
    }

	setWatches(){
		this.$scope.$watch(() => this.eventInfo, (newValue)=> {}, true);
	}


	setDefaultValues() {
		this.isOwnPage = false;
		this.userInfo = {};
		this.userName = this.$stateParams.userName;
		if(this.userName == "")  {this.$state.go("app.home"); return;}

		//checking if that page is ours or somebody's else
		this.UserService.isOwnPage(this.userName).then((resp) => {
			if(resp) {
				this.isOwnPage = true;

				let index = this.$stateParams.indexName;
				switch (index) {
					case "profile":
						this.$scope.selectedIndex = 0;
						break;
					case "settings":
						this.$scope.selectedIndex = 1;
						break;
					case "observed":
						this.$scope.selectedIndex = 2;
						break;
					case "mail":
						this.$scope.selectedIndex = 3;
						break;
					case "search":
						this.$scope.selectedIndex = 4;
						break;
					default:
						this.$scope.selectedIndex = 0;
				}
			}else  this.$scope.selectedIndex = 0;
			this.$l.debug("this.UserService.user.login: ",this.UserService.user.login);
			this.getDataFromServer();
		});

	}

	getDataFromServer(){
		this.loader.show();
		this.UserService.findUserInfoByLogin(this.userName, this.isOwnPage).then((resp)=> {
			if (resp.data.docs[0] === undefined) {
				this.loader.hide();
				this.$state.go("login");
				return;
			}
			this.userInfo = resp.data.docs[0];
			this.$l.debug("Informacje na temat użytkownika: ",this.userInfo);
			this.$scope.$evalAsync();
            this.$scope.$broadcast("userInfo:updated", {"data" : this.userInfo});
			this.loader.hide();
		}).catch((err) => {
            this.$l.debug("Error: ", err);
			this.loader.hide();
			this.$state.go("introduction");
		});
	}
}


export default AccountController;
