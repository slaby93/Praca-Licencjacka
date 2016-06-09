/**
 * Created by Tomek on 6/9/2016.
 */

import SportEvent from 'Classes/SportEvent';

class CreateController {
    constructor($scope, GoogleService, $window, UserService, loader, EventService) {
        let self = this;
        self.$scope = $scope;
        self.$window = $window;
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
        self.markers = [];
		self.clearForms();
    }

    initMap() {
        let self = this;
        let google = self.$window.google;
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
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            events: {
				click: function (originalEventArgs) {
					let self = this;
					console.log("boo");
					let e = originalEventArgs[0];
					let lat = e.latLng.lat();
					let lng = e.latLng.lng();
					self.addMarker(lat, lng);
				}
			}
        };
        self.map = new google.maps.Map($('#event_add .map')[0], config);
		self.map.setTilt(45);
		google.maps.event.addListener(self.map, 'click', function(event) {
			self.removeAllMarkers();
			self.addMarker(event.latLng.lat(), event.latLng.lng());
		});
    }

    addMarker(lat, lng) {
        let self = this;
        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(lat, lng),
            map: self.map,
            draggable: true,
        });
        self.markers.push(marker);
    }
	
	removeAllMarkers() {
        let self = this;
        _.forEach(self.markers, (marker)=> {
            self.removeMarker(marker);
        })
		self.markers = [];
    }

    /**
     *  Removes marker from map.
     * @param marker Marker object from addArrayOfMarkers or addMarker
     */
    removeMarker(marker) {
        marker.setMap(null);
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

    /**
     * Handle click on result after user input desired location (this is for search input).
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
                });
            }
        });
    }
	
	addEvent() {
		let self = this;
		let createDate = new Date();
		createDate.setHours(createDate.getHours() + 2);
		let date = new Date(self.event.date);
		date.setHours(date.getHours() + 2);
		let ownEquipment = self.event.ownEquipment === 'true';
		let experience = parseInt(self.event.experience, 10);
		let event = new SportEvent(self.UserService.user.id, createDate, date, "resources/icons/bell.svg",
            self.event.description, self.event.category, self.event.payment, ownEquipment, experience, self.event.usersLimit, 
			self.event.title, true, self.markers[0].position.lat(), self.markers[0].position.lng(), []);
		self.eventService.addEvent(event);
	}
	
	/**
     * Remove and initialize models for forms.
     */
    clearForms() {
		let self = this;
        self.event = {
            title: "",
            date: "",
			description: "",
			category: "",
			payment: "",
			ownEquipment: "",
			experience: "",
			usersLimit: ""
        };
    }

}

export default CreateController;