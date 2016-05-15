/**
 * Created by Dammic on 14.03.16.
 */


class UserQuickInfoTooltipController {
    constructor(getId, $mdDialog, $scope) {
        let self = this;
        self.$scope = $scope;
        self.$mdDialog = $mdDialog;
        self.$scope.id = getId;
	}
	

}
		
export default UserQuickInfoTooltipController;