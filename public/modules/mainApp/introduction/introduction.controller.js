/**
 * Created by piec on 4/8/2016.
 */

class IntroductionController {
    constructor($log, $mdDialog, loader, UserService) {
        let self = this;
        self.$l = $log;
        self.UserService = UserService;
    }
}

export default IntroductionController;