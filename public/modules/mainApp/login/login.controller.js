/**
 * Created by danielslaby on 23/05/16.
 */

class LoginController {
    constructor($log, $mdDialog, $timeout, loader, $state, UserService, $window) {
        let self = this;
        self.$l = $log;
        self.$mdDialog = $mdDialog;
        self.loader = loader;
        self.$state = $state;
        self.$window = $window;
        self.$timeout = $timeout;
        self.notie = self.$window.notie;
        self.UserService = UserService;
        self.defaultValues();
    }

    /**
     * Remove and initialize models for forms.
     */
    defaultValues() {
        let self = this;
        if (self.loginForm) {
            self.loginForm.$setUntouched();
        }
        self.$timeout(()=> {
            self.userLogin = {
                login: "",
                password: ""
            }
        });


    }

    goToRegister() {
        let self = this;
        self.$state.go('register');
    }

    /**
     * Login user by credentials.
     */
    login() {
        let self = this;
        self.loader.show();
        /**
         * I copy this data to have ability to clear form before request come back
         * @type {*|{login: string, password: string}}
         */
        let copied = angular.copy(self.userLogin);
        self.defaultValues();
        self.UserService.login(copied).then(
            // Success
            (data)=> {
                self.loader.hide();
                self.$state.go('center');
                self.notie.alert(1, 'Success!', 1);
            },
            // Errors
            (err)=> {
                self.loader.hide();
                let msg;
                switch (err.status) {
                    case 500:
                        msg = 'Błąd serwera ;('
                        break;
                    case 404:
                        msg = 'Nie znaleziono zasobu'
                        break;
                    case 400:
                        msg = 'Podane dane są nieprawidłowe'
                        break;
                    default:
                        msg = `Niepoprawne dane`;
                        break;
                }
                notie.alert(3, msg, 3);
                $('#loginField').focus();

            });
    }
}

export default LoginController;