/**
 * Created by danielslaby on 23/05/16.
 */

class LoginController {
    constructor($log, $mdDialog, loader, $state, UserService, $window) {
        let self = this;
        self.$l = $log;
        self.$mdDialog = $mdDialog;
        self.loader = loader;
        self.$state = $state;
        self.$window = $window;
        self.UserService = UserService;
        self.defaultValues();
    }

    /**
     * Remove and initialize models for forms.
     */
    defaultValues() {
        self.userLogin = {
            login: "",
            password: ""
        };
        self.userRegister = {
            login: "",
            password: "",
            retypedPassword: ""
        };
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
        self.UserService.login(self.userLogin).then(
            // Success
            (data)=> {
                self.loader.hide();
                self.$state.go('app.home');
            },
            // Errors
            (err)=> {
                self.loader.hide();
                self.$l.debug(self.$window);
            });
    }
}

export default LoginController;