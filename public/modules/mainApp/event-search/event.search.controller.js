/**
 * Created by piec on 4/8/2016.
 */
class EventSearchController {
    constructor($log, $scope, $q, GoogleService, $window, UserService) {
        let self = this;
        self.$l = $log;
        self.$scope = $scope;
        self.$window = $window;
        self.$q = $q;
        self.UserService = UserService;
        self.GoogleService = GoogleService;
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

    test() {
        let self = this;
        self.$l.debug("TEST FUNCTION");
        self.GoogleService.googleAutocompleteRequest("Kr");
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
            mapTypeId: google.maps.MapTypeId.SATELLITE
        };
        map = new google.maps.Map($('#event_search .map')[0], config);
        service = new google.maps.places.PlacesService(map);
        service.nearbySearch({
            location: new google.maps.LatLng(lat, lng),
            radius: '50000',
            types: ['atm']
        }, (data)=> {
            self.$l.debug("Google response", data);
        });
        map.setTilt(45);
    }


}

export default EventSearchController;