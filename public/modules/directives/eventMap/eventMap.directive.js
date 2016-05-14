/**
 * Created by Dammic on 14.03.16.
 */


function eventMap() {
    return {
        restrict: 'E',
        templateUrl: 'modules/directives/eventMap/eventMap.html',
        controller: EventMapController,
        controllerAs: "eventMapCtrl"
    };
}

class EventMapController {
    constructor($log, $scope, $q, GoogleService, $timeout, $window, UserService, loader, EventService) {
        let self = this;
        self.$l = $log;
        self.$scope = $scope;
        self.$window = $window;
        self.$q = $q;
        self.$timeout = $timeout;
        self.loader = loader;
        self.UserService = UserService;
        self.GoogleService = GoogleService;
        self.eventService = EventService;
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
        self.editStatus = false;
        self.resultStatus = false;
        self.eventInfo = null;
        self.marker = null;
        self.$scope.$on('event:filled', function(event,data) {
            // you could inspect the data to see if what you care about changed, or just update your own scope
            self.marker = self.addMarker({"lat": data.localization.latitude, "lng": data.localization.longitude})
            self.setMapCenter(data.localization.latitude,data.localization.longitude);
        });
    }


    initMap() {
        let self = this;
        let google = self.$window.google;
        let lat = 50, lng = 20;
        let config = {
            center: {
                lat: lat,
                lng: lng
            },
            zoom: 10,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        self.map = new google.maps.Map(document.getElementById("view-map"), config);
        self.map.setTilt(45);
    }


    addMarker(obj = {}) {
        let self = this;
        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(obj.lat, obj.lng),
            map: self.map,
            draggable: false
        });
        self.marker = marker;

        return marker;
    }

    /**
     *  Removes marker from map.
     * @param marker Marker object from addArrayOfMarkers or addMarker
     */
    removeMarker(marker) {
        marker.setMap(null);
    }

    setMapCenter(lat = 50, lng = 20) {
        let self = this;
        self.$l.debug("LAT LNG", lat, lng);
        self.map.setCenter({
            lat: lat,
            lng: lng
        });
    }

}

export default eventMap;