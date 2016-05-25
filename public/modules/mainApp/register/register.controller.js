/**
 * Created by danielslaby on 23/05/16.
 */
import * as ngMessages  from 'angular-messages';

class RegisterController {
    constructor($log, $timeout, $mdDialog, loader, $state, UserService) {
        let self = this;
        self.$l = $log;
        self.$timeout = $timeout;
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
        let self = this;
        self.userRegister = {
            login: "",
            password: "",
            retypedPassword: ""
        };
        if (self.registerForm) {
            self.$timeout(()=> {
                self.registerForm.$setUntouched();
            });

        }
    }


    /**
     * Register new user to system
     *
     */
    register() {
        let self = this;
        self.loader.show();
        let copy = angular.copy(self.userRegister);
        self.defaultValues();
        self.UserService.register(copy).then(
            // Success
            ()=> {
                self.loader.hide();
                self.$state.go('app.home');
            }).catch(
            // Errors
            (err)=> {
                self.loader.hide();
                self.$l.debug("Err", err);
                let msg;
                switch (err.status) {
                    case 400:
                        msg = err.data.message;
                        break;
                    case 500:
                        msg = 'Błąd serwera';
                        break;
                    default:
                        msg = 'Nieznany błąd serwera';
                        break;
                }
                notie.alert(3, msg, 3);
            });
    }

    /**
     * Checks if data in inputs (password and retypedPassword) are valid and identical.
     */
    checkPasswordValidity() {
        let self = this;
        if (self.userRegister.password === self.userRegister.retypedPassword) {
            self.registerForm.retypedPassword.$setValidity('notMatchingPassword', true);
            return;
        }
        self.registerForm.retypedPassword.$setValidity('notMatchingPassword', false);
    }
}

export default RegisterController ;