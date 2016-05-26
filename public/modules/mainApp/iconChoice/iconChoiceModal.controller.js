/**
 * Created by danielslaby on 14/03/16.
 */

class IconChoiceModalController {
    constructor($log, $mdDialog, loader, EventService) {
        let self = this;
        self.$l = $log;
        self.$mdDialog = $mdDialog;
        self.loader = loader;
        self.EventService = EventService;
    }

    /**
     * Remove modal from screen
     */
    closeModal() {
        let self = this;
        self.$mdDialog.hide()
    }
}
export default IconChoiceModalController;