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
    constructor(localStorageService, UserService) {
        let self = this;
        self.localStorageService = localStorageService;
        self.UserService = UserService;
        self.setDefaultValues();
        self.initLogin();
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

    logout() {
        let self = this;
        console.log("logout");
        self.UserService.user = null;
        self.UserService.token = null;
        self.UserService.logout();
    }

    openLoginRegister() {
        console.log("lol");
        let self = this;
        let modalInstance = $uibModal.open(
            {
                templateUrl: 'modules/mainApp/views/login_registerView.html',
                controller: 'login_registerCtrl',
                backdrop: "static",
                resolve: {
                    isLogged: () => {
                        return self.isLogged;
                    }
                }
            }
        );

        modalInstance.result.then((is) => {
            self.isLogged = is;
        }, () => {
        });
    }

    ///**
    // * @description Funkcja inicjalizujaca i ew. przekierowujaca do cms, gdy uzytkownik jest juz zalogowany.
    // */

    initLogin() {
        let self = this;
        self.userLogin = {
            "login": "",
            "password": ""
        };
        let token = self.localStorageService.get("token");
        if (token) {
            userService.loginByToken(token).then(
                // SUCCESS
                (message) => {
                    self.$evalAsync(() => {
                        self.isLogged = true;
                        self.user = userService.getUser();
                    });
                    /*$state.go("cms");*/
                    // ERROR
                }, (message) => {
                    console.log(message.data);
                    self.isLogged = false;
                    // usuwamy niepoprawny token
                    self.localStorageService.remove("token");
                    // MESSAGE
                }, (message) => {
                    self.isLogged = false;
                    console.log(message);
                });
        } else {
            self.isLogged = false;
            console.log("Token is empty!");
        }
    }
}

export default topNavBar;