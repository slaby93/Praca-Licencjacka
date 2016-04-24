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
        let dfr = self.$q.defer();
        self.getUserLocation().then((location)=> {
            self.$http({
                method: "POST",
                data: {
                    query: text,
                    location: [location.coords.latitude, location.coords.longitude]
                },
                url: `/user/autocomplete`
            }).then((successData)=> {
                dfr.resolve(successData);
            }, (err)=> {
                dfr.reject(err);
            });
        });
        return dfr.promise;
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