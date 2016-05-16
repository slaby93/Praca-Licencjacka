/**
 * Created by piec on 13.03.16.
 */
import User from 'Classes/User';
import SportEvent from 'Classes/SportEvent';

function infoBox() {
    return {
        restrict: 'E',
        templateUrl: 'modules/directives/infoBox/infoBox.html',
        controller: InfoBoxController,
        controllerAs: "infoBoxCtrl",
        scope: {
            "event": "="
        },
        bindToController: true
    };
}

class InfoBoxController {
    constructor($log, localStorageService, UserService, $scope, $state, moment) {
        let self = this;
        self.localStorageService = localStorageService;
        self.UserService = UserService;
        self.$l = $log;
        self.moment = moment;
        self.$scope = $scope;
        self.$state = $state;
    }

    observeObject() {
        let self = this;

        self.$scope.$watch(()=> {
            return self.event;
        }, (newVal, oldVal)=> {
            if (!JSON.stringify(newVal) === JSON.stringify(oldVal)) {
                if (!newVal) {
                    newVal = {};
                    self.event = {};
                }
            }
        });
    }

    /**
     * Handles click of go to button.
     */
    handleClick() {
        let self = this;
        self.goToEditEvent(self.event);
    }

    /**
     * Redirect user to see page with full details of current event
     * @param event
     */
    goToEditEvent(event) {
        let self = this;
        self.$state.go(`app.event`, {eventID: event._id});
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


}

export default infoBox;