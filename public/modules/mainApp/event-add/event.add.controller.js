/**
 * Created by piec on 4/18/2016.
 */
import User from 'Classes/User';

class EventAddController {
    constructor($log) {
        let self = this;
        self.$l = $log;
        self.setDefaultValues();
    }

    setDefaultValues() {
        let self = this;
        self.event = {};
    }
}

export default EventAddController;