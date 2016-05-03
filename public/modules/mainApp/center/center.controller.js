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
        self.eventsPool = [];
        self.radius = 100;
    }

    test() {
        let self = this;
        self.eventService.find(50, 20, 9999).then((resp)=> {
            self.$l.debug("RESP", resp.data.docs);
        });

    }

    changeOfQueryString() {
        let self = this;
        self.loader.show();
        self.resultList = [];
        let filtredQuery = self.filterQuery(self.queryString);
        self.GoogleService.googleAutocompleteRequest(filtredQuery).then((dane)=> {
            self.resultList = dane.data.predictions;
            self.loader.hide();
        }, (err)=> {
            self.loader.hide();
            throw err;
        });
    }

    filterQuery(query) {
        return _.deburr(query);
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
            zoom: 10,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        self.map = new google.maps.Map($('#center_element .map')[0], config);
        self.requestForEvents(lat, lng, self.radius);
        self.map.setTilt(45);
    }

    test_mocked_marker() {
        let self = this;
        let mark = {
            lat: 50,
            lng: 20,
            title: "Testowy Event",
            draggable: false,
            event_id: 123456
        };
        self.addClickListenerToMarker(self.addMarker(mark), self.handleMarkerClick);
    }

    requestForEvents(lat, lng, radius) {
        let self = this;
        self.$l.debug("requestForEvents", lat, lng, radius);
        self.eventService.find(lat, lng, radius).then((resp)=> {
            if (!resp) {
                alert("ERROR");
                return;
            }
            self.eventsPool = resp.data.docs;
            self.showReceivedEvents(self.eventsPool);
        });
    }

    showReceivedEvents(events) {
        let self = this;
        let tab = [];
        _.forEach(events, (item)=> {
            tab.push({
                lat: item.localization.latitude,
                lng: item.localization.longitude,
                title: item.eventInfo.title,
                draggable: false,
                event_id: item._id
            });
        });
        self.addArrayOfMarkers(tab);
    }

    /**
     *
     * @param self Controller scope object
     * @param originalMarkerObject Marker with data
     * @param googleMapsClickEventObject
     */
    handleMarkerClick(self, originalMarkerObject, googleMapsClickEventObject) {
        if (!self.editStatus) {
            self.switchEdit();
        }
        self.setEditedEvent(originalMarkerObject);
    }

    addMarker(obj = {}) {
        let self = this;
        self.$l.debug("Marker", obj);
        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(obj.lat, obj.lng),
            map: self.map,
            title: obj.title,
            draggable: obj.draggable,
        });
        marker.customData = {
            eventId: obj.event_id
        };

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
        if (!index) {
            return undefined;
        } else {
            return self.eventsPool[index];
        }
    }

    /**
     *
     * @param tab Array of objects in format {Number:lat, Number:lng, String:title, Boolean:draggable}
     */
    addArrayOfMarkers(tab) {
        let self = this;
        _.forEach(tab, (item)=> {
            self.addClickListenerToMarker(self.addMarker(item), self.handleMarkerClick);
        });
    }

    /**
     *  Adds callback function to marker
     * @param marker Marker object
     * @param callback Function
     */
    addClickListenerToMarker(marker, callback) {
        let self = this;
        marker.addListener('click', (item)=> {
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
                    self.requestForEvents(result[0].geometry.location.lat(), result[0].geometry.location.lng(), self.radius);
                    self.switchResults();
                });
            }
        });
    }

    switchEdit() {
        let self = this;
        self.editStatus = !self.editStatus;
        if (!self.editedEvent) {
            self.editedEvent = undefined;
        }
    }

    switchResults() {
        let self = this;
        self.resultStatus = !self.resultStatus;
    }

    setEditedEvent(marker) {
        let self = this;
        self.$timeout(()=> {
            self.$l.debug(marker);
            self.editedEvent = self.getEvent(marker.customData.eventId);
        });


    }


}

export default CenterController;