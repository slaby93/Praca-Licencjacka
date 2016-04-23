/**
 * Created by piec on 4/8/2016.
 */
class EventSearchController {
    constructor($log, $scope, GoogleService, $window) {
        let self = this;
        self.$l = $log;
        self.$scope = $scope;
        self.$window = $window;
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

    initMap() {
        let self = this;
        self.$l.debug("GOTOWE");
        self.map = new self.$window.google.maps.Map($('#event_search .map')[0], {
            center: {lat: -34.397, lng: 150.644},
            zoom: 5
        });

    }
}

export default EventSearchController;