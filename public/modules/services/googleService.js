/**
 * Created by danielslaby on 23/04/16.
 */

class GoogleService {
    // API KEY AIzaSyCdp3QzFm-6Xp1qULwW4JPMJiYX0lydf-o
    constructor($log, $q, UserService, $window, $rootScope, $http) {
        let self = this;
        self.$l = $log;
        self.$q = $q;
        self.$http = $http;
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
        self.apiKey = 'AIzaSyCdp3QzFm-6Xp1qULwW4JPMJiYX0lydf-o';
    };

    googleAutocompleteRequest(text) {
        let self = this;
        let config = {};
        self.$http({
            method: "GET",
            // url: `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${text}&key=${self.apiKey}`
            url: `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=Vict&types=geocode&language=fr&key=AIzaSyCdp3QzFm-6Xp1qULwW4JPMJiYX0lydf-o`
        }).then((successData)=> {
            self.$l.debug("Success",successData);
        }, (err)=> {
            self.$l.debug("ERROR", err);
        }, (err)=> {
            self.$l.debug("ERROR", err);
        });
    }

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