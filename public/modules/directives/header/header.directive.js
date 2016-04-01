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
    constructor($log, localStorageService, UserService, $scope, EventService) {
        let self = this;
        self.localStorageService = localStorageService;
        self.UserService = UserService;
        self.$l = $log;
        self.$scope = $scope;
        self.test = 'dupa';
        self.scrollPosition = 0;
        $(document).on('scroll', ()=> {
            let actualScrollPosition = $(document).scrollTop();
            let maximumScrollPosition = parseInt($(document).height()) - parseInt($(window).height());
            let percent = ((actualScrollPosition / maximumScrollPosition) * 100).toFixed(0);
            self.$scope.$evalAsync(()=> {
                self.scrollPosition = actualScrollPosition;
            });
        });

        self.setDefaultValues();
        self.setWatchers();
    }

    setWatchers() {
        let self = this;
        self.userWatch = self.$scope.$watch('headerCtrl.UserService.user', (newUser)=> {
            self.user = newUser;
        }, true);
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