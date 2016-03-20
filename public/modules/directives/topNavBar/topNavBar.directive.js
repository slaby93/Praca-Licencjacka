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
    constructor($log, localStorageService, UserService, $scope) {
        let self = this;
        self.localStorageService = localStorageService;
        self.UserService = UserService;
        self.$l = $log;
        self.$scope = $scope;
        self.setDefaultValues();
        self.setWatchers();
    }

    setWatchers() {
        let self = this;
        // watch for user object change
        self.$scope.$on('userObjectChange', (event, newUser)=> {
            self.user = newUser;
        });
    }

    setDefaultValues() {
        let self = this;
        self.options = [
            {
                placeholder: "Login",
                click: () => {
                    self.UserService.showLoginModal();
                },
                visibility: "guest"
            },
            {
                placeholder: "Dodaj wydarzenie",
                click: () => {

                },
                visibility: "user"
            },
            {
                placeholder: "Ustawienia konta",
                click: () => {

                },
                visibility: "user"
            },
            {
                placeholder: "CMS",
                click: () => {

                },
                visibility: "admin"
            },
            {
                placeholder: "Wyloguj",
                click: () => {
                    let self = this;
                    self.logout();
                },
                visibility: "user"
            }
        ];
    }
    
    

}

export default topNavBar;