/**
 * Created by danielslaby on 14/03/16.
 */

class LoginModalController {
    constructor($log, $mdDialog) {
        let self = this;
        self.$l = $log;
        self.$mdDialog = $mdDialog;
        self.user = {
            login: "",
            password: ""
        }
    }

    closeModal() {
        let self = this;
        self.$mdDialog.hide()
    }
}

export default LoginModalController;