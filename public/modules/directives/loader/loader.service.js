/**
 * Created by danielslaby on 19/03/16.
 */

class LoaderService {
    constructor($log) {
        let self = this;
        self.$l = $log;
        self.$l.debug("Test Spinner");
    }

    show() {
        let self = this;
        $('loader').css('display', 'initial');
    }

    hide() {
        let self = this;
        self.$l.debug("Hide Loader");
        $('loader').css('display', 'none');
    }
}

export default LoaderService;