/**
 * Created by danielslaby on 23/04/16.
 */

class GoogleService {

    constructor($log) {
        let self = this;
        self.$l = $log;
        self.defaultValues();
    }

    defaultValues() {
        let self = this;
        self.ready = false;
    };

    get ready() {
        return this._ready;
    }

    set ready(value) {
        let self = this;
        this._ready = value;
    }

}
export default GoogleService;