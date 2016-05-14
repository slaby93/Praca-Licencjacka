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
        //console.log("lol: ");
        //console.log(self.$scope.$parent);
        self.eventInfo = [];//self.$scope.$parent.eventInfo.value.data.docs[0];
        self.marker = null;
    }



    initMap() {
        let self = this;
        let google = self.$window.google;
        let map = self.map;
        let lat, lng;

        lat = 50;
        lng = 20;

        let config = {
            center: {
                lat: lat,
                lng: lng
            },
            zoom: 10,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        self.map = new google.maps.Map($('#center_element .map')[0], config);
        self.map.setTilt(45);
    }



    addMarker(obj = {}) {
        let self = this;
        var markerTmp = new google.maps.Marker({
            position: new google.maps.LatLng(obj.lat, obj.lng),
            map: self.map,
            draggable: false
        });
        marker.customData = {
            eventId: obj.event_id
        };
        self.marker = markerTmp;

        return marker;
    }

    /**
     * Returns event with specified eventID
     * @param event_id takes event_id. Usually it is created by mongodb in _id.
     * If no event was found returns undefined.
     * @returns Return event object
     */
    getEvent(event_id) {
        let self = this;
        let index = _.findIndex(self.eventsPool, (item)=> {
                return item._id === event_id;
    });
    return self.eventsPool[index];
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