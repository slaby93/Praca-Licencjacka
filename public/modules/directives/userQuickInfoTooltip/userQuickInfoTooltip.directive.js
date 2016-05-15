/**
 * Created by Dammic on 14.03.16.
 */

 
function userQuickInfoTooltip() {
    return {
        restrict: 'E',
        templateUrl: 'modules/directives/userQuickInfoTooltip/userQuickInfoTooltip.html',
        controller: UserQuickInfoTooltipController,
        controllerAs: "userQuickInfoTooltipCtrl"
    };
}

class UserQuickInfoTooltipController {
    constructor() {
        let self = this;

	}
	

}
		
export default userQuickInfoTooltip;