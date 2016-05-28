/**
 * Created by danielslaby on 01/05/16.
 */

function resultPanel() {
    return {
        restrict: 'E',
        templateUrl: 'modules/directives/resultPanel/resultPanel.html',
        controller: ResultPanelController,
        scope: {
            "centerController": "=",
            /**
             * To assign it eventEditController endpoint has to be different from false for example {}
             */
            "resultController": "="
        },
        controllerAs: "resultCtrl",
        bindToController: true
    };
}

class ResultPanelController {
    constructor($log, $interval, $scope, $window, moment, $state) {
        let self = this;
        self.$l = $log;
        self.$scope = $scope;
        self.$window = $window;
        self.$interval = $interval;
        self.moment = moment;
        self._ = _;
        self.$state = $state;
        self.setDefaultValues();
        self.observeObjects();
    }

    setDefaultValues() {
        let self = this;
        /**
         * viewMode can take:
         *  rows
         *  grid
         *  It is used to use proper ng-class for icons
         * @type {string}
         */
        self.viewMode = 'rows';
    }

    isFree(event) {
        return (event.eventInfo.payment > 0) ? false : true;
    }

    formatDate(event) {
        let self = this;
        let date = event.date;
        if (date) {
            date = self.moment(event.date).format("DD.MM.YYYY HH:mm");
        } else {
            date = "Error";
        }

        return date;
    }

    /**
     * Redirect user to see page with full details of current event
     * @param event
     */
    goToEditEvent(event) {
        let self = this;
        self.$state.go(`app.event`, {eventID: event._id});
    }

    observeObjects() {
        let self = this;
    }

    setViewMode(arg) {
        let self = this;
        self.viewMode = arg;
    }

    handleResultClick(result) {
        let self = this;
        let marker = self.centerController.getMarker(result._id);
        self.centerController.setMapCenter(result.localization.latitude, result.localization.longitude);
        self.centerController.handleMarkerClick(self.centerController, marker);
        self.$l.debug("RESULT", marker);
    }

    getViewMode() {
        let self = this;
        return self.viewMode;
    }

    isData() {
        let self = this;
        if (self.centerController.eventsPool && self.centerController.eventsPool.length > 0) {
            return true;
        }
        return false;
    }

}

export default resultPanel;