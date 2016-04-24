/**
 * Created by piec on 4/8/2016.
 */
class EventSearchController {
    constructor($log, $scope, $q, GoogleService, $window, UserService, loader) {
        let self = this;
        self.$l = $log;
        self.$scope = $scope;
        self.$window = $window;
        self.$q = $q;
        self.loader = loader;
        self.UserService = UserService;
        self.GoogleService = GoogleService;
        self.setDefaultValues();
        self.observeObjects();
    }

    observeObjects() {
        let self = this;
        let tmp = self.$scope.$watch(()=> {
            return self.GoogleService.ready;
        }, (value)=> {
            if (value) {
                self.initMap();
                tmp();
            }
        });
    };

    setDefaultValues() {
        let self = this;
    }

    test() {
        let self = this;
    }

    changeOfQueryString() {
        let self = this;
        self.loader.show();
        self.resultList = [];
        self.GoogleService.googleAutocompleteRequest(self.queryString).then((dane)=> {
            self.resultList = dane.data.predictions;
            self.loader.hide();
        }, (err)=> {
            self.loader.hide();
            throw err;
        });
    }

    initMap() {
        let self = this;
        let google = self.$window.google;
        let map = self.map;
        let lat = self.UserService.getLastLocation().latitude;
        let lng = self.UserService.getLastLocation().longitude;
        let service;
        let config = {
            center: {
                lat: lat,
                lng: lng
            },
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        self.map = new google.maps.Map($('#event_search .map')[0], config);
        self.map.setTilt(45);
    }

    handleResultClick(value) {
        let self = this;
        let geocoder = new google.maps.Geocoder();
        geocoder.geocode({address: value.description}, (result, status)=> {
            if (status === "OK") {
                self.map.setCenter(result[0].geometry.location);
            }

        });
    }


}

export default EventSearchController;