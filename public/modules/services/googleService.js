/**
 * Created by danielslaby on 23/04/16.
 */

class GoogleService {

    constructor($log, $q, UserService, $window, $rootScope) {
        let self = this;
        self.$l = $log;
        self.$q = $q;
        self.$rootScope = $rootScope;
        self.$window = $window;
        self.UserService = UserService;
        self.defaultValues();
        self.doWhenReady();
    }

    doWhenReady() {
        let self = this;
        let tmp = self.$rootScope.$watch(()=> {
            return self.ready
        }, (newValue)=> {
            if (newValue) {
                self.getUserLocation().then((position)=> {
                    self.UserService.addUserLocalization({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    });
                });
                tmp();
            }
        });
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

    getUserLocation() {
        let self = this;
        let promise = self.$q.defer();
        self.$window.navigator.geolocation.getCurrentPosition((position)=> {
            promise.resolve(position);
        });

        return promise.promise;
    }

}
export default GoogleService;