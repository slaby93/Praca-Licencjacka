/**
 * Created by danielslaby on 01/05/16.
 */

function eventEdit() {
    return {
        restrict: 'E',
        templateUrl: 'modules/directives/eventEdit/eventEdit.html',
        controller: EventEditController,
        scope: {
            "editedEvent": "=",
            "centerController": "="
        },
        controllerAs: "editCtrl",
        bindToController: true
    };
}

class EventEditController {
    constructor($log, $timeout, $scope, $window, moment) {
        let self = this;
        self.$l = $log;
        self.$scope = $scope;
        self.$window = $window;
        self.moment = moment;
        self.observeObjects();

    }

    observeObjects() {
        let self = this;
        self.$scope.$watch(()=> {
            return self.editedEvent;
        }, (newVal)=> {
            if (newVal) {
                self.parseProcedure();
            }
        }, true);
    }

    parseProcedure() {
        let self = this;
        let event = self.editedEvent;
        self.$l.debug("EVENT", event);
        self.countRemaningTime(event.date);
    }

    countRemaningTime(startDate) {
        let self = this;
        let start = self.moment(startDate);
        self.$l.debug("START", start);
        let currentDate = self.moment();
        self.$l.debug("CURRENT DATE", currentDate);
        let diff = start.diff(currentDate, 'seconds');
        let result = ``;
        self.$l.debug("DIFF", diff);
        let years = 0;
        let months = 0;
        let days = 0;
        let hours = 0;
        let minutes = (diff % 3600);
        let seconds = (diff % 60);

        self.startsIn = `Years: ${years} months: ${months} days ${days} hours ${hours} minutes ${minutes} seconds ${seconds}`;
    }

}

export default eventEdit;