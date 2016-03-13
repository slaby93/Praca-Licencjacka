/**
 * Created by piec on 13.03.16.
 */

function topNavBar() {
    return {
        restrict: 'E',
        templateUrl: 'modules/directives/topNavBar/topNavBar.html',
        controller: TopNavBarController,
        controllerAs: "topNavBarCtrl"
    };
}

class TopNavBarController {
    constructor() {
        let self = this;
        self.options = [
            {
                placeholder: "Login",
                click: function () {
                    //userService.openLoginRegister();
                }
            }
        ];
    }


}

export default topNavBar;