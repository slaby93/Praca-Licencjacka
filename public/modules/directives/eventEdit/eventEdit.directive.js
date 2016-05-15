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
            "centerController": "=",
            /**
             * To assign it eventEditController endpoint has to be different from false for example {}
             */
            "eventController": "="
        },
        controllerAs: "editCtrl",
        bindToController: true
    };
}

class EventEditController {
    constructor($log, $interval, $scope, $window, moment, $state) {
        let self = this;
        self.$l = $log;
        self.$scope = $scope;
        self.$state = $state;
        self.$window = $window;
        self.$interval = $interval;
        self.moment = moment;
        self.observeObjects();

        if (self.eventController) {
            self.eventController = self;
        }
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
        self.countRemaningTime(event.date);
    }

    /**
     * Redirect user to see page with full details of current event
     * @param event
     */
    goToEditEvent(event) {
        let self = this;
        self.$state.go(`app.event`, {eventID: event._id});
    }

    countRemaningTime(startDate) {
        let self = this;
        let start = self.moment(startDate);
        let currentDate = self.moment();
        let diff = start.diff(currentDate, 'seconds');

        if (diff > 0) {
            self.remainingTime = self.formatOutputDate(diff);
            self.interval = self.$interval(()=> {
                diff -= 1;
                if (diff > 0) {
                    self.remainingTime = self.formatOutputDate(diff);
                } else {
                    self.remainingTime = 'Zakonczono';
                    self.$interval.cancel(self.interval);
                }
            }, 1000);
        } else {
            self.remainingTime = 'Zakonczono';
        }


    }

    onExit() {
        let self = this;
        self.$l.log("EXIT");
        if (self.interval) {
            self.$interval.cancel(self.interval);
        }
    }

    formatOutputDate(remainingSeconds) {
        let self = this;
        let result = ``;
        let days = Math.floor(remainingSeconds / (86400));
        let hours = Math.floor(remainingSeconds / (3600)) % 24;
        let minutes = Math.floor(remainingSeconds / 60) % 60;
        let seconds = (remainingSeconds % 60) % 60;
        if (days > 0) {
            result = ` ${days} dni ${hours} godzin`;
        } else if (hours > 0) {
            result = `${hours} godziny ${minutes} miunt`;
        } else {
            result = ` ${minutes} minuty ${seconds} sekund `;
        }
        return result;
    }

}

export default eventEdit;