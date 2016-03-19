/**
 * Created by danielslaby on 14/03/16.
 */

class LoginModalController {
    constructor($log, $mdDialog) {
        let self = this;
        self.$l = $log;
        self.$mdDialog = $mdDialog;
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

    closeModal() {
        let self = this;
        self.$mdDialog.hide()
    }

    login() {
        let self = this;
        self.$l.debug("login credentials", self.userLogin.login, self.userLogin.password);
    }

    register(login, password, retypedPassword) {
        let self = this;
        self.$l.debug("register credentials", self.userRegister.login, self.userRegister.password, self.userRegister.retypedPassword);
    }
}

export default LoginModalController;