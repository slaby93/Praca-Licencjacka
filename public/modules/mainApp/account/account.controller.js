/**
 * Created by piec on 4/8/2016.
 */

class AccountController {

    constructor($scope, $log) {
        let self = this;
        self.$scope = $scope;
        self.$l = $log;
        self.$l.debug("Account CTRL");
    }
}

export default AccountController;
