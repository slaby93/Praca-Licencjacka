/**
 * Created by piec on 4/8/2016.
 */
class CenterController {
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
    }

    test() {
        let self = this;
        self.eventService.find(50, 20, 9999).then((resp)=> {
            self.$l.debug("RESP", resp);
        });

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
        let lat, lng;
        if (self.UserService.getLastLocation()) {
            lat = self.UserService.getLastLocation().latitude;
            lng = self.UserService.getLastLocation().longitude;
        } else {
            lat = 50;
            lng = 20;
        }
        let config = {
            center: {
                lat: lat,
                lng: lng
            },
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        self.map = new google.maps.Map($('#center_element .map')[0], config);
        self.map.setTilt(45);
        let mark = {
            lat: 50,
            lng: 20,
            title: "Testowy Event",
            draggable: false,
            event_id: 123456
        };
        self.addClickListenerToMarker(self.addMarker(mark), self.handleMarkerClick);
    }

    /**
     *
     * @param self Controller scope object
     * @param originalMarkerObject Marker with data
     * @param googleMapsClickEventObject
     */
    handleMarkerClick(self, originalMarkerObject, googleMapsClickEventObject) {
        self.$l.debug("MARKER", originalMarkerObject, googleMapsClickEventObject);
        self.setEditedEvent(originalMarkerObject);
    }

    addMarker(obj = {}) {
        let self = this;
        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(obj.lat, obj.lng),
            map: self.map,
            title: obj.title,
            draggable: obj.draggable,
        });
        marker.customData = {
            eventId: obj.event_id
        };
        self.$l.debug("ZWRACAM", marker);
        return marker;
    }

    /**
     *
     * @param tab Array of objects in format {Number:lat, Number:lng, String:title, Boolean:draggable}
     */
    addArrayOfMarkers(tab) {
        let self = this;
        let tmp = [];
        _.forEach(tab, (item)=> {
            tmp.push(self.addMarker(item));
        });
        return tmp;
    }

    /**
     *  Adds callback function to marker
     * @param marker Marker object
     * @param callback Function
     */
    addClickListenerToMarker(marker, callback) {
        let self = this;
        marker.addListener('click', (item)=> {
            // self.$l.debug("ITEM", item);
            callback(self, marker, item);
        });
    }

    /**
     *  Removes marker from map.
     * @param marker Marker object from addArrayOfMarkers or addMarker
     */
    removeMarker(marker) {
        marker.setMap(null);
    }

    handleResultClick(value) {
        let self = this;
        let geocoder = new google.maps.Geocoder();
        self.$scope.$evalAsync(()=> {
            self.resultList = [];
        });
        geocoder.geocode({address: value.description}, (result, status)=> {
            if (status === "OK") {
                self.$scope.$evalAsync(()=> {
                    self.map.setCenter(result[0].geometry.location);
                    // get all events in that area;
                    self.switchResults();
                    // self.switchEdit();
                });
            }
        });
    }

    switchEdit() {
        let self = this;
        self.editStatus = !self.editStatus;
    }

    switchResults() {
        let self = this;
        self.resultStatus = !self.resultStatus;
    }

    setEditedEvent(marker) {
        let self = this;
        self.$timeout(()=> {
            self.editStatus = true;
            // self.$l.debug("EDIT EVENT", marker);
            self.editedEvent = marker;
        });


    }


}

export default CenterController;