/**
 * Created by danielslaby on 14/03/16.
 */

class LoginModalController {
    constructor($log, $mdDialog, loader, UserService) {
        let self = this;
        self.$l = $log;
        self.$mdDialog = $mdDialog;
        self.loader = loader;
        self.UserService = UserService;
        self.clearForms();
    }

    /**
     * Remove and initialize models for forms.
     */
    clearForms() {
        self.userLogin = {
            login: "",
            password: ""
        }
        self.userRegister = {
            login: "",
            password: "",
            retypedPassword: ""
        }
    }

    /**
     * Remove modal from screen
     */
    closeModal() {
        let self = this;
        self.$mdDialog.hide()
    }

    /**
     * Login user by credentials.
     */
    login() {
        let self = this;
        self.loader.show();
        self.$l.debug("login credentials", self.userLogin.login, self.userLogin.password);
        self.UserService.login(self.userLogin).then(
            // Success
            (data)=> {
                self.loader.hide();
                self.closeModal();
            },
            // Errors
            (err)=> {
                self.loader.hide();
            });

    }

    /**
     * Register new user to system
     *
     */
    register() {
        let self = this;
        self.loader.show();
        self.UserService.register(self.userRegister).then(
            // Success
            (data)=> {
                self.loader.hide();
                self.closeModal();
            },
            // Errors
            (err)=> {
                self.loader.hide();
            });
    }
}

export default LoginModalController;