/**
 * Created by piec on 4/8/2016.
 */
class CenterController {
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
        self.editStatus = false;
        self.resultStatus = false;
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
        let lat, lng;
        if (self.UserService.getLastLocation()) {
            lat = self.UserService.getLastLocation().latitude;
            lng = self.UserService.getLastLocation().longitude;
        } else {
            self.$l.log("NIEMA");
            lat = 50;
            lng = 18;
        }
        let service;
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
    }

    handleResultClick(value) {
        let self = this;
        let geocoder = new google.maps.Geocoder();
        self.$scope.$evalAsync(()=> {
            self.resultList = [];
        });
        geocoder.geocode({address: value.description}, (result, status)=> {
            if (status === "OK") {
                self.map.setCenter(result[0].geometry.location);
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


}

export default CenterController;