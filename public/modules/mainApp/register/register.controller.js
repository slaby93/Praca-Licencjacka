/**
 * Created by danielslaby on 23/05/16.
 */

class RegisterController {
    constructor($log, $mdDialog, loader, $state, UserService) {
        let self = this;
        self.$l = $log;
        self.$mdDialog = $mdDialog;
        self.loader = loader;
        self.$state = $state;
        self.UserService = UserService;
        self.defaultValues();
    }

    goToLogin() {
        let self = this;
        self.$state.go('login');
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

    /**
     * Login user by credentials.
     */
    login() {
        let self = this;
        self.loader.show();
        self.$l.debug("Login");
        self.UserService.login(self.userLogin).then(
            // Success
            (data)=> {
                self.loader.hide();
                self.$l.debug("Data", data);
                self.$state.go('app.home');
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
            ()=> {
                self.loader.hide();
                self.closeModal();
            },
            // Errors
            (err)=> {
                self.loader.hide();
            });
    }

    handleRegisterBtn() {
        let self = this;
        self.$l.debug("Register Btn");
    }
}

export default RegisterController ;