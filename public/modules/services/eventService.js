/**
 * Created by piec on 3/22/2016.
 */
import Event from 'Classes/Event';
import Moment from 'moment';

class EventService {

    constructor($log) {
        let self = this;
        self.$l = $log;
        self.defaultValues();
    }

    defaultValues() {
        let self = this;
        self.events = [];
    };


    get events() {
        return this._events;
    }

    set events(value) {
        this._events = value;
    }

}
export default EventService;