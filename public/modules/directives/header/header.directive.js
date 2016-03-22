/**
 * Created by piec on 13.03.16.
 */
import User from 'Classes/User';

function header() {
    return {
        restrict: 'E',
        templateUrl: 'modules/directives/header/header.html',
        controller: HeaderController,
        controllerAs: "headerCtrl"
    };
}

class HeaderController {
    constructor($log, localStorageService, UserService, $scope,EventService) {
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
                placeholder: "Jak to działa?",
                click: () => {

                },
                visibility: ["guest", "user"]
            },
            {
                placeholder: "Dodaj wydarzenie",
                click: () => {

                },
                visibility: ["user"]
            },
            {
                placeholder: "Ustawienia konta",
                click: () => {

                },
                visibility: ["user"]
            },
            {
                placeholder: "CMS",
                click: () => {

                },
                visibility: ["admin"]
            },
            {
                placeholder: "Wyloguj",
                click: () => {
                    let self = this;
                    self.UserService.logout();
                },
                visibility: ["user"]
            }
        ];
    }


}

export default header;