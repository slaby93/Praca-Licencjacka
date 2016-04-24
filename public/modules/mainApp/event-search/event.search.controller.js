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
        self.UserService.saveUser();
    }

    initMap() {
        let self = this;
        let google = self.$window.google;
        let map = self.map;
        let config = {
            center: {lat: 36.964, lng: -122.015},
            zoom: 18,
            mapTypeId: google.maps.MapTypeId.SATELLITE
        };
        map = new google.maps.Map($('#event_search .map')[0], config);
        map.setTilt(45);
    }


}

export default EventSearchController;