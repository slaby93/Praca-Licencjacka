/**
 * Created by piec on 4/8/2016.
 */
/**
 * Explenation of variables:
 *      * resultList -> holds results from google API when user input search query.
 *          It will be destroyed as soon as user choose something from menu.
 *      * eventsPool -> array of currently displayed events
 */
class CenterController {
    constructor($log, $scope, $q, GoogleService, moment, $timeout, $window, UserService, loader, EventService, $state, $compile) {
        let self = this;
        self.$l = $log;
        self.$scope = $scope;
        self.$window = $window;
        self.$q = $q;
        self.moment = moment;
        self.$compile = $compile;
        self.$state = $state;
        self.$timeout = $timeout;
        self.loader = loader;
        self.UserService = UserService;
        self.GoogleService = GoogleService;
        self.eventService = EventService;
        self.setDefaultValues();
        self.debounceFunctions();
        self.observeObjects();
    }

    debounceFunctions() {
        let self = this;
        self.calculatePosition = _.debounce(self.calculatePosition, 100);
    }

    observeObjects() {
        let self = this;
        $(window).resize(()=> {
            self.calculatePosition()
        });

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
        self.radius = '';
        self.eventsPool = [];
        self.markers = [];
        self.eventEditCtrl = {};
        self.infoBox = {
            isCompiled: false
        };
        self.$timeout(() => {
            self.calculatePosition()
        });

        self.menuOptions = [
            {
                id: 0,
                icon: 'refresh-left-arrow.svg',
                description: 'Odśwież',
                enabled: false,
                onClick: (item)=> {

                }
            },
            {
                id: 1,
                icon: 'settings.svg',
                description: 'Opcje',
                enabled: false,
                onClick: (item)=> {

                }
            },
            {
                id: 2,
                icon: 'door-exit.svg',
                description: 'Wyloguj',
                enabled: false,
                onClick: (item)=> {
                    self.UserService.logout();
                }
            },
        ];
        self.menuVisible = false;
        $('#menuDropdown').dropdown();
    }

    calculatePosition() {
        let self = this;
        self.$timeout(()=> {
            let elem = $('.slidingMenuDropdown');
            elem.css('left', -elem.width() + 50);
        });
    }

    test() {
        let self = this;
        self.calculatePosition();

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

    removeAllMarkers() {
        let self = this;
        _.forEach(self.markers, (marker)=> {
            self.removeMarker(marker);
        })
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
        self.UserService.getRadius().then((resp) => {
            if (resp == "error")  self.radius = 200;  //default value
            else  self.radius = resp;
            self.requestForEvents(lat, lng);
            self.map.setTilt(45);
        });
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

    requestForEvents(lat, lng) {
        let self = this;
        self.$l.debug("requestForEvents", lat, lng, self.radius);
        self.eventService.find(lat, lng, self.radius).then((resp)=> {
            self.eventsPool = resp.data.docs;
            self.showReceivedEvents(self.eventsPool);
        }, (err)=> {

            if (err.status === 401) {
                self.$l.debug("Uzytkownik nie jest zalogowany", err);
                notie.alert(3, 'Zostałeś wylogowany', 3);
                self.$state.go("login");
            }
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

        let event = self.getEvent(originalMarkerObject.customData.eventId);
        let contentString = `
          <div id="infoBoxMainHolder">
            <info-box event="centerCtrl.editedEvent"></info-box>
          </div>
          
        `;
        let google = self.$window.google;
        if (!self.infoBox.reference) {
            self.infoBox.reference = new google.maps.InfoWindow({
                content: ""
            });
        }

        self.infoBox.reference.setContent(contentString);
        self.infoBox.reference.open(self.map, originalMarkerObject);
        /**
         * Should compile template jsut once
         * @type {boolean}
         */
        if (!self.infoBox.isListenerSet) {
            google.maps.event.addListener(self.infoBox.reference, 'domready', function () {
                self.$compile($("#infoBoxMainHolder"))(self.$scope);
                self.infoBox.isListenerSet = true;
            });
        }
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
        self.markers.push(marker);

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

    getMarker(eventId) {
        let self = this;
        if (!eventId) {
            return;
        }
        let result;
        _.forEach(self.markers, (item)=> {
            if (item.customData.eventId === eventId) {
                result = item;
            }
        });
        return result;
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

    setMapCenter(lat = 50, lng = 20) {
        let self = this;
        self.$l.debug("LAT LNG", lat, lng);
        self.map.setCenter({
            lat: lat,
            lng: lng
        });
    }

    /**
     * Handle click on result after user input desired location ( this is for search input).
     * @param value
     */
    handleResultClick(value) {
        let self = this;
        let geocoder = new google.maps.Geocoder();
        self.$scope.$evalAsync(()=> {
            self.resultList = [];
        });
        geocoder.geocode({address: value.description}, (result, status)=> {
            if (status === "OK") {
                self.$scope.$evalAsync(()=> {
                    self.removeAllMarkers();
                    self.map.setCenter(result[0].geometry.location);
                    // get all events in that area;
                    self.requestForEvents(result[0].geometry.location.lat(), result[0].geometry.location.lng(), self.radius);
                    if (!self.resultStatus) {
                        self.switchResults();
                    }
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
        if (self.editStatus === false) {
            // self.eventEditCtrl.onExit();
        }
    }

    switchResults() {
        let self = this;
        self.resultStatus = !self.resultStatus;
    }

    setEditedEvent(marker) {
        let self = this;
        self.$timeout(()=> {
            // self.eventEditCtrl.onExit();
            let foundedEvent = self.getEvent(marker.customData.eventId);
            self.editedEvent = foundedEvent;
        });


    }


}

export default CenterController;