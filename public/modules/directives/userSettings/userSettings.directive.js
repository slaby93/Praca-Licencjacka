/**
 * Created by Dammic on 14.03.16.
 */

 
function userSettings() {
    return {
        restrict: 'E',
        templateUrl: 'modules/directives/userSettings/userSettings.html',
        controller: UserSettingsController,
        controllerAs: "userSettingsCtrl"
    };
}

class UserSettingsController {
    constructor() {
        let self = this;

	}
	

}
		
export default userSettings;