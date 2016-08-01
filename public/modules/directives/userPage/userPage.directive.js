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
		this.UserService = UserService;
		this.$stateParams = $stateParams;
		this.$scope = $scope;
		this.setTopScopeListeners();
	}
	
	
	
	setTopScopeListeners(){
		let userName = this.$stateParams.userName;
		this.$scope.$on('userInfo:updated', (event, data) => {
			this.userInfo = data.data;
			if(!this.userInfo.settings.city)  this.userInfo.settings.city = "nieokreślone";

			let age = this.calculateAge(this.userInfo.settings.birthDate);
			this.userInfo.age = (age === -1 ? "nieokreślony" : age+ " lat");  //if the passed age is empty

			let joinDate = new Date(this.userInfo.joinDate);
			this.userInfo.joinDate = (( "0" + joinDate.getDate()).slice(-2)) + "." + (( "0" + (joinDate.getMonth()+1)).slice(-2)) + "." + joinDate.getFullYear();

			this.$scope.$evalAsync();
		});
	}


	//returns -1 if the passed birthday is empty
	calculateAge(birthdate) { // birthday is a date
		if(birthdate) {
			birthdate = new Date(birthdate);
			var ageDifMs = Date.now() - birthdate.getTime();
			var ageDate = new Date(ageDifMs); // miliseconds from epoch
			return Math.abs(ageDate.getUTCFullYear() - 1970);
		}else return -1;
	}

}
		
export default userPage;